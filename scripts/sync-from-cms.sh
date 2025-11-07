#!/bin/bash
set -e

echo "📥 Pulling latest from CMS..."
git pull origin claude/setup-nextjs-agency-boilerplate-011CUtJ9HCRqbFrXyMaVNBqZ

echo "📁 Syncing media to public folder..."
node scripts/copy-media.mjs

echo "📤 Checking for new public media files..."
if git status --porcelain | grep -q "site/public/media"; then
  git add site/public/media/
  git commit -m "chore: Sync media from CMS to public"
  git push origin claude/setup-nextjs-agency-boilerplate-011CUtJ9HCRqbFrXyMaVNBqZ
  echo "✅ Media synced and pushed!"
else
  echo "✅ No new media to sync"
fi
