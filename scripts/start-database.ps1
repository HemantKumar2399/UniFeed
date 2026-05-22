param()

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath ".env")) {
  throw "Missing .env file. Run scripts/setup-local.ps1 first."
}

$databaseLine = Get-Content -LiteralPath ".env" | Where-Object { $_ -match "^DATABASE_URL=" } | Select-Object -First 1
if (-not $databaseLine) {
  throw "DATABASE_URL is missing from .env."
}

$databaseUrl = ($databaseLine -replace '^DATABASE_URL="?([^"]*)"?$', '$1')
$uri = [System.Uri]$databaseUrl
$dbPassword = $uri.UserInfo.Split(":", 2)[1]
$dbPort = if ($uri.Port -gt 0) { $uri.Port } else { 5432 }
$dbName = $uri.AbsolutePath.TrimStart("/")
$containerName = "$dbName-postgres"

$dockerCommand = Get-Command docker -ErrorAction SilentlyContinue
$podmanCommand = Get-Command podman -ErrorAction SilentlyContinue

if (-not $dockerCommand -and -not $podmanCommand) {
  throw "Install Docker Desktop or Podman Desktop before starting the local database."
}

$containerRuntime = if ($dockerCommand) { "docker" } else { "podman" }

try {
  & $containerRuntime info | Out-Null
} catch {
  throw "$containerRuntime is installed but the daemon is not running."
}

$runningContainer = & $containerRuntime ps -q -f "name=$containerName"
if (-not [string]::IsNullOrWhiteSpace($runningContainer)) {
  Write-Host "Database container '$containerName' is already running." -ForegroundColor Green
  exit 0
}

$existingContainer = & $containerRuntime ps -q -a -f "name=$containerName"
if (-not [string]::IsNullOrWhiteSpace($existingContainer)) {
  & $containerRuntime start $containerName | Out-Null
  Write-Host "Started existing database container '$containerName'." -ForegroundColor Green
  exit 0
}

& $containerRuntime run -d `
  --name $containerName `
  -e POSTGRES_USER=postgres `
  -e POSTGRES_PASSWORD=$dbPassword `
  -e POSTGRES_DB=$dbName `
  -p "${dbPort}:5432" `
  docker.io/postgres | Out-Null

Write-Host "Database container '$containerName' was created successfully." -ForegroundColor Green
