#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting UniFeed Local Environment Setup..."

# 1. Install dependencies
echo "📦 Installing Node dependencies..."
npm install

# 2. Setup Environment Variables
echo "⚙️ Setting up .env file..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ Copied .env.example to .env. Please update the POSTGRES_URL inside if needed!"
else
  echo "✅ .env file already exists, skipping copy."
fi

# 3. Prisma Database Setup
echo "🗄️ Pushing Prisma schema to the database..."
npx prisma db push

echo "🎉 Setup Complete! You can now start the server with: npm run dev"
