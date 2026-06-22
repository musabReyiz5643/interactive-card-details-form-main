$projectName = Read-Host "What is the name of your project?"
$fontFamilyName = Read-Host "What is the name of your font family? (e.g., 'Inter')"
$isInstallClsxCn = Read-Host "Do you want to install clsx and class-variance-authority? (yes/no)"
$isInstallReactHookForm = Read-Host "Do you want to install react-hook-form? (yes/no)"
# Vite oluştur (React + TS)
npm create vite@7 $projectName -- --template react-ts --yes


Set-Location -Path $projectName

# Paketleri yükle
npm install
npm install tailwindcss @tailwindcss/vite  @fontsource/$fontFamilyName

if ($isInstallClsxCn -eq "yes") {
	npm install clsx tailwind-merge
}

if ($isInstallReactHookForm -eq "yes") {
	npm install react-hook-form
}



# Dosyaları temizle
Remove-Item src/App.css, src/index.css, src/assets/react.svg -ErrorAction SilentlyContinue

# Klasörleri oluştur
New-Item -ItemType Directory -Path src/components, src/main, src/styles 
New-Item -ItemType File -Path src/styles/global.css ,src/styles/tailwind.css -Force


# Dosyaları taşı
Move-Item src/App.tsx src/main/
Move-Item src/main.tsx src/main/

$mainContent = @"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './../styles/global.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
"@

$appContent = @"
function App() {

  return (
    <>
		<h1 className="text-3xl font-bold text-red-500 underline">
			Hello world!
		</h1>
    </>
  )
}

export default App
"@

$mainContent | Out-File -FilePath src/main/main.tsx -Encoding utf8
$appContent | Out-File -FilePath src/main/App.tsx -Encoding utf8


$globalCssContent = @"
@import "tailwindcss";
@import "./tailwind.css";
"@

$globalCssContent | Out-File -FilePath src/styles/global.css -Encoding utf8

$viteConfigContent = @"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
"@

$viteConfigContent | Out-File -FilePath vite.config.ts -Encoding utf8

Move-Item -Path "../images"-Destination "public" -Force

(Get-Content index.html) -replace 'src/main.tsx', './src/main/main.tsx' | Set-Content index.html


Write-Host "Your  $projectName project is ready!" -ForegroundColor Green

npm run dev