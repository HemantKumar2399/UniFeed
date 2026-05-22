param()

$ErrorActionPreference = "Stop"

Write-Host "Starting UniFeed local environment setup..." -ForegroundColor Cyan

if (-not (Test-Path -LiteralPath ".env")) {
  Copy-Item -LiteralPath ".env.example" -Destination ".env"
  Write-Host "Copied .env.example to .env." -ForegroundColor Green
} else {
  Write-Host ".env already exists." -ForegroundColor Green
}

$dbPassword = Read-Host "Enter your local PostgreSQL password (press Enter to keep the current value)"
if (-not [string]::IsNullOrWhiteSpace($dbPassword)) {
  $envLines = Get-Content -LiteralPath ".env"
  $updatedLines = foreach ($line in $envLines) {
    if ($line -match "^DATABASE_URL=") {
      'DATABASE_URL="postgresql://postgres:' + $dbPassword + '@localhost:5432/Platform"'
    } else {
      $line
    }
  }
  Set-Content -LiteralPath ".env" -Value $updatedLines
  Write-Host "Updated DATABASE_URL in .env." -ForegroundColor Green
}

& powershell -ExecutionPolicy Bypass -File ".\scripts\start-database.ps1"

Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host "Generating Prisma client..." -ForegroundColor Cyan
npm run db:generate

Write-Host "Pushing Prisma schema..." -ForegroundColor Cyan
npm run db:push

Write-Host "Seeding the database..." -ForegroundColor Cyan
npm run db:seed

Write-Host ""
Write-Host "Setup complete. Start the app with npm run dev" -ForegroundColor Green
Write-Host "Seed login password: Test@1234" -ForegroundColor Yellow
