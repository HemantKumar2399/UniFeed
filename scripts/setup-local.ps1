param()
$ErrorActionPreference = "Stop"
& node "$PSScriptRoot/setup-local.mjs"
exit $LASTEXITCODE
