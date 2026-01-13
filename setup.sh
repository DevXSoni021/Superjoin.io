#!/bin/bash

# SuperSync Setup Script

echo "🚀 Setting up SuperSync..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
DATABASE_URL=postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
PORT=3000
EOF
    echo "✅ .env file created!"
else
    echo "ℹ️  .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 Setup complete! You can now run:"
    echo "   npm start"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
