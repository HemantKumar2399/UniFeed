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
else
  echo "✅ .env file already exists."
fi

# Interactive Prompt for Database Password
# (Temporarily bypass 'set -e' for the read prompt in case of interruptions)
set +e
echo ""
echo "Current DATABASE_URL in .env will be used by default."
read -p "🎯 Enter your Local PostgreSQL Password (or press Enter to keep current): " DB_PASS
set -e

if [ ! -z "$DB_PASS" ]; then
  # Construct the full connection string
  DB_URL="postgresql://postgres:${DB_PASS}@localhost:5432/Platform"
  # Use sed to replace the dummy DATABASE_URL line with the dynamically built URL
  sed -i -e "s|^DATABASE_URL=.*|DATABASE_URL=\"$DB_URL\"|" .env
  echo "✅ Injected custom Database URL into .env!"
else
  echo "⏭️  Kept existing Database URL."
fi

# 3. Prisma Database Setup
echo "🗄️ Pushing Prisma schema to the database..."
npx prisma db push

echo "🎉 Setup Complete! You can now start the server with: npm run dev"
