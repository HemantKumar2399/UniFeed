param()
$ErrorActionPreference = "Stop"
& node "$PSScriptRoot/start-database.mjs"
exit $LASTEXITCODE
