$ErrorActionPreference = 'Stop'
$repoPath = 'C:\Users\tiago\OneDrive\Documents\GitHub\ux-presentation'
$bundlePath = Join-Path $PSScriptRoot 'ux-presentation-ilum.bundle'
git -C $repoPath fetch $bundlePath 'refs/heads/ilum:refs/heads/ilum'
if ($LASTEXITCODE -ne 0) { throw 'Nao foi possivel importar a branch. Nenhuma troca de branch foi realizada.' }
git -C $repoPath switch ilum
if ($LASTEXITCODE -ne 0) { throw 'A branch foi importada, mas o Git nao permitiu trocar o checkout. Verifique as alteracoes locais.' }
Write-Host 'Branch ilum pronta. Execute npm run dev no repositorio para abrir a apresentacao.'
