#!/usr/bin/env node

// AppMate CLI v0.3.0
// Instant dev app bootstrapper (React + Vite + Firebase-ready)
// Powered by Nova — now with zero bloat

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

(async () => {
  console.log(chalk.cyan(`\nAppMate CLI v0.3.0 — Your instant launch system`));

  const { appName, preset } = await inquirer.prompt([
    {
      type: 'input',
      name: 'appName',
      message: 'Name your app:',
      default: 'nova-app'
    },
    {
      type: 'list',
      name: 'preset',
      message: 'Select stack preset:',
      choices: ['React + Vite', 'Next.js', 'Vanilla + Vite'],
      default: 'React + Vite'
    }
  ]);

  const appDir = path.resolve(process.cwd(), appName);
  if (fs.existsSync(appDir)) {
    console.log(chalk.red(`\nFolder ${appName} already exists.`));
    process.exit(1);
  }

  console.log(chalk.green(`\nCreating ${preset} app at ${appDir}`));
  fs.mkdirSync(appDir);
  process.chdir(appDir);

  if (preset === 'React + Vite') {
    execSync(`npm create vite@latest . -- --template react`, { stdio: 'inherit' });
    execSync(`npm install`, { stdio: 'inherit' });
    execSync(`npm install firebase`, { stdio: 'inherit' });

    fs.writeFileSync(
      'vite.config.js',
      `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true, strictPort: true },
  resolve: { alias: { '@': '/src' } }
});`
    );
  }

  const firebaseConfig = `// Replace with your Firebase config
export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};`;
  fs.mkdirSync('src/firebase', { recursive: true });
  fs.writeFileSync('src/firebase/config.js', firebaseConfig);

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${appName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;
  fs.writeFileSync('index.html', html);

  const mainJsx = `import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => <h1>🚀 Welcome to ${appName}</h1>;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;
  fs.mkdirSync('src', { recursive: true });
  fs.writeFileSync('src/main.jsx', mainJsx);

  console.log(chalk.green(`\nSuccess. App ready.`));
  console.log(chalk.yellow(`\nNext steps:`));
  console.log(chalk.white(`   cd ${appName}`));
  console.log(chalk.white(`   npm run dev`));
})();
