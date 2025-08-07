#!/usr/bin/env node

// AppMate CLI v0.3.0
// Instant dev app bootstrapper (React + Vite + Firebase-ready)
// Powered by Nova — now with zero bloat

import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';

// ESM __dirname and __filename workaround
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  // Nova lines for each preset
  const novaLines = {
    'Vanilla + Vite': `Creamy? Bold choice. Let's roll.`,
    'React + Vite': `React, huh? Nova's watching.`,
    'Vue + Vite': `Vue it is. Spicy.`,
    'Astro': `To the stars we go.`,
    'Next.js': `Next.js? Modern moves.`
  };
  if (novaLines[preset]) {
    console.log(chalk.cyan(`\nNova: "${novaLines[preset]}"\n`));
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
  } else if (preset === 'Vanilla + Vite') {
    execSync(`npm create vite@latest ${appName} -- --template vanilla`, { stdio: 'inherit' });
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
  console.log(chalk.yellow(`\nCliNova: Go-Time Steps`));
  console.log(chalk.white(`cd ${appName}`));
  console.log(chalk.white(`npm run dev`));

  // Git push instructions
  console.log(chalk.yellow(`\nGit Push Commands:`));
  console.log(chalk.white(`git init`));
  console.log(chalk.white(`git add .`));
  console.log(chalk.white(`git commit -m \"🔥 AppMate CLI v0.3.0 — Initial release\"`));
  console.log(chalk.white(`git branch -M main`));
  console.log(chalk.white(`git remote add origin https://github.com/NUMBER2111111/nova-ultimate-.git`));
  console.log(chalk.white(`git push -u origin main`));
})();
