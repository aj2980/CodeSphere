#!/bin/bash

# CodeSphere Deployment Script for Render
echo "🚀 Starting CodeSphere deployment..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Build frontend
echo "🔨 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

echo "✅ Build completed successfully!"
echo "🎉 Your application is ready for deployment on Render!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to your Git repository"
echo "2. Connect your repository to Render"
echo "3. Set up environment variables in Render dashboard"
echo "4. Deploy!"
