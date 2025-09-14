#!/bin/bash

echo "🚀 Deploying Awesome Coin to Vercel..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "🔐 Logging into Vercel..."
vercel login

# Deploy the project
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete! Your site is now live!"
echo "🌐 Check your Vercel dashboard for the live URL"
