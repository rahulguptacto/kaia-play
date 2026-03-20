#!/bin/bash
# Kaia's World — GitHub Pages Setup
# Run this once: cd ~/KaiaPlay && bash setup.sh

REPO_NAME="kaia-play"

echo "🌸 Setting up Kaia's World on GitHub Pages..."

# Init git repo
cd ~/KaiaPlay
git init
git add index.html
git commit -m "🌸 Kaia's World v1 — interactive cartoon + learning modes"

# Create GitHub repo via CLI (requires gh CLI)
# If gh is not installed, we'll use the API directly
if command -v gh &> /dev/null; then
  gh repo create "$REPO_NAME" --public --source=. --push
  echo ""
  echo "✅ Repo created! Now enable GitHub Pages:"
  echo "   Go to: https://github.com/$(gh api user --jq '.login')/$REPO_NAME/settings/pages"
  echo "   Set Source: Deploy from a branch → main → / (root) → Save"
  echo ""
  echo "   Your URL will be: https://$(gh api user --jq '.login').github.io/$REPO_NAME/"
else
  echo ""
  echo "⚠️  GitHub CLI (gh) not found. Two options:"
  echo ""
  echo "Option 1 — Install gh and retry:"
  echo "   brew install gh"
  echo "   gh auth login"
  echo "   bash setup.sh"
  echo ""
  echo "Option 2 — Manual (2 minutes):"
  echo "   1. Go to https://github.com/new"
  echo "   2. Name: $REPO_NAME, Public, DON'T add README"
  echo "   3. Click Create Repository"
  echo "   4. Copy the SSH URL and run:"
  echo "      git remote add origin git@github.com:YOUR_USERNAME/$REPO_NAME.git"
  echo "      git branch -M main"
  echo "      git push -u origin main"
  echo "   5. Go to Settings → Pages → Source: main → Save"
fi

echo ""
echo "📱 After Pages is live, on iPad Safari:"
echo "   Open the URL → Share → Add to Home Screen → 'Kaia's World'"
echo ""
echo "🔄 To push updates later:"
echo "   cd ~/KaiaPlay"
echo "   git add -A && git commit -m 'update' && git push"
