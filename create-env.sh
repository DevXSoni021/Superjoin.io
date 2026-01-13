#!/bin/bash

# Create .env file with all required configuration
cat > .env << 'EOF'
DATABASE_URL=postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
PORT=3000
SPREADSHEET_ID=1DzVBnjlYbmZg8XyPXNAELjmxTNMVXhzsWb5n8OnmSPM
EOF

echo "✅ .env file created successfully!"
echo ""
echo "Contents:"
cat .env
