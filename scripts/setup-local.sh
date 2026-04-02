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
  echo "✅ Copied .env.example to .env."
  
  # Interactive Prompt for Database URL
  # (Temporarily bypass 'set -e' for the read prompt in case of interruptions)
  set +e
  read -p "🎯 Enter your PostgreSQL Database URL (or press Enter to keep default): " DB_URL
  set -e

  if [ ! -z "$DB_URL" ]; then
    # Use sed to replace the dummy DATABASE_URL line with the user input
    sed -i -e "s|^DATABASE_URL=.*|DATABASE_URL=\"$DB_URL\"|" .env
    echo "✅ Injected custom Database URL into .env!"
  else
    echo "⏭️  Kept default Database URL."
  fi
  
else
  echo "✅ .env file already exists, skipping copy and prompt."
fi

# 3. Prisma Database Setup
echo "🗄️ Pushing Prisma schema to the database..."
npx prisma db push

echo "🎉 Setup Complete! You can now start the server with: npm run dev"
