import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();
const outDir = path.join(rootDir, 'out');

try {
  console.log('🚀 Building static pages for GitHub Pages...');
  execSync('node scripts/build-gh-pages.mjs', { stdio: 'inherit' });

  if (!fs.existsSync(outDir)) {
    throw new Error('Build failed: /out directory not found');
  }

  console.log('📦 Pushing /out to gh-pages branch via Git...');
  
  // Initialize git inside out
  execSync('git init', { cwd: outDir, stdio: 'inherit' });
  execSync('git config http.postBuffer 524288000', { cwd: outDir, stdio: 'inherit' });
  execSync('git config http.version HTTP/1.1', { cwd: outDir, stdio: 'inherit' });
  execSync('git add -A', { cwd: outDir, stdio: 'inherit' });
  execSync('git commit -m "deploy: static build to GitHub Pages" --allow-empty', { cwd: outDir, stdio: 'inherit' });
  
  const remoteUrl = execSync('git config --get remote.origin.url', { cwd: rootDir }).toString().trim();
  console.log(`📡 Pushing to ${remoteUrl} (branch: gh-pages)...`);
  execSync(`git push -f ${remoteUrl} HEAD:gh-pages`, { cwd: outDir, stdio: 'inherit' });

  console.log('🎉 Successfully deployed to gh-pages branch!');
  console.log('🌐 GitHub Pages URL: https://reddyprasadkv-sunsolv.github.io/sampathrani/');
} catch (error) {
  console.error('❌ Deployment error:', error);
  process.exit(1);
}
