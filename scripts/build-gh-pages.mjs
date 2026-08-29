import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();
const apiDir = path.join(rootDir, 'app', 'api');
const tempApiDir = path.join(rootDir, 'temp_api_backup');
const outDir = path.join(rootDir, 'out');
const noJekyllPath = path.join(rootDir, 'public', '.nojekyll');

try {
  console.log('🚀 Preparing Static Export for GitHub Pages...');

  // 1. Ensure public/.nojekyll exists
  if (!fs.existsSync(noJekyllPath)) {
    fs.writeFileSync(noJekyllPath, '# Bypass Jekyll\n');
  }

  // 2. Temporarily move API routes (since GitHub Pages does not support serverless Node runtime)
  let movedApi = false;
  if (fs.existsSync(apiDir)) {
    console.log('📦 Moving API routes temporarily during static export...');
    fs.renameSync(apiDir, tempApiDir);
    movedApi = true;
  }

  try {
    // 3. Run Next.js static export
    console.log('⚙️ Building static pages (output: export)...');
    execSync('STATIC_EXPORT=true GITHUB_ACTIONS=true npx next build', {
      stdio: 'inherit',
      env: {
        ...process.env,
        STATIC_EXPORT: 'true',
        GITHUB_ACTIONS: 'true'
      }
    });

    // 4. Ensure .nojekyll is in out folder
    if (fs.existsSync(outDir)) {
      fs.writeFileSync(path.join(outDir, '.nojekyll'), '# Bypass Jekyll\n');
      console.log('✅ Added .nojekyll to /out directory');
    }

    console.log('🎉 GitHub Pages static export completed successfully in /out !');
  } finally {
    // 5. Always restore API routes back to app/api
    if (movedApi && fs.existsSync(tempApiDir)) {
      console.log('🔄 Restoring API routes to app/api...');
      fs.renameSync(tempApiDir, apiDir);
      console.log('✅ Restored app/api successfully');
    }
  }
} catch (error) {
  console.error('❌ Build failed:', error);
  // Guarantee restore if failed
  if (fs.existsSync(tempApiDir) && !fs.existsSync(apiDir)) {
    fs.renameSync(tempApiDir, apiDir);
  }
  process.exit(1);
}
