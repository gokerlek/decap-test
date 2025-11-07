#!/bin/bash
set -e

echo "📥 Pulling latest from CMS..."
git pull --rebase origin claude/setup-nextjs-agency-boilerplate-011CUtJ9HCRqbFrXyMaVNBqZ

echo "📁 Syncing media to public folder..."
node scripts/copy-media.mjs

echo "✅ Sync complete! Your media is up to date."
echo ""
echo "💡 Now refresh your browser to see the changes!"
