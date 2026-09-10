# Archi Deals React site — VS Code guide

## 1. Install Node.js

1. Open `https://nodejs.org`.
2. Download the **LTS** version for Windows.
3. Run the installer and keep the default options selected.
4. Close and reopen VS Code after installation.

Node.js includes `npm`, which downloads and runs the React project dependencies.

## 2. Open the project in VS Code

1. Download or clone this repository.
2. Open VS Code.
3. Select **File → Open Folder**.
4. Choose the `archi-deals` folder containing `package.json`.

Do not open only `index.html`, and do not use the Live Server extension. This is a Vite-powered React project.

## 3. Install and start the website

Open **Terminal → New Terminal**, then run:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local address displayed in the terminal.

## Before publishing

- Replace `YOUR_EMAIL@example.com` in `src/main.jsx`.
- Replace `YOUR_HANDLE` in `src/main.jsx`.
- Editorial photos load from Unsplash.

## Publishing and updates

GitHub Pages is configured in `.github/workflows/deploy-pages.yml`. Every push to `main` rebuilds and republishes the website.

```powershell
git add .
git commit -m "Update website"
git push
```
