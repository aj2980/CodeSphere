# CodeSphere Deployment Guide for Render

This guide will help you deploy your CodeSphere application on Render.

## Prerequisites

1. **MongoDB Database**: You'll need a MongoDB database. You can use:
   - MongoDB Atlas (recommended)
   - Render's MongoDB service
   - Any other MongoDB cloud provider

2. **Google Gemini API Key**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your code is pushed to a Git repository (GitHub, GitLab, etc.).

### 2. Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub/GitLab account
3. Verify your email

### 3. Deploy on Render

#### Option A: Using render.yaml (Recommended)

1. **Update the render.yaml file**:
   - Replace `your-app-name` with your actual app name
   - Update the `FRONTEND_URL` to match your Render URL

2. **Connect your repository**:
   - In Render dashboard, click "New +"
   - Select "Blueprint"
   - Connect your Git repository
   - Render will automatically detect the `render.yaml` file

#### Option B: Manual Setup

1. **Create a new Web Service**:
   - In Render dashboard, click "New +"
   - Select "Web Service"
   - Connect your Git repository

2. **Configure the service**:
   - **Name**: `codesphere-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Build Command**: 
     ```bash
     npm install
     cd frontend && npm install && npm run build
     cd ../backend && npm install
     ```
   - **Start Command**: `cd backend && npm start`

### 4. Set Environment Variables

In your Render service settings, add these environment variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `MONGODB_URI` | `your_mongodb_connection_string` | MongoDB connection string |
| `GEMINI_API_KEY` | `your_gemini_api_key` | Google Gemini API key |
| `FRONTEND_URL` | `https://your-app-name.onrender.com` | Your Render app URL |

### 5. MongoDB Setup

#### Using MongoDB Atlas (Recommended):

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` with your database password
5. Add it to `MONGODB_URI` environment variable

#### Using Render MongoDB:

1. In Render dashboard, create a new "MongoDB" service
2. Copy the connection string
3. Add it to `MONGODB_URI` environment variable

### 6. Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Wait for the build to complete (usually 5-10 minutes)

### 7. Verify Deployment

1. Check the deployment logs for any errors
2. Visit your app URL (provided by Render)
3. Test the functionality

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check if all dependencies are in `package.json`
   - Ensure Node.js version is compatible (>=18.0.0)
   - Check build logs for specific errors

2. **Database Connection Issues**:
   - Verify `MONGODB_URI` is correct
   - Ensure MongoDB is accessible from Render's servers
   - Check if IP whitelist is configured (if using Atlas)

3. **CORS Errors**:
   - Update `FRONTEND_URL` in environment variables
   - Check the CORS configuration in `backend/app.js`

4. **API Key Issues**:
   - Verify `GEMINI_API_KEY` is set correctly
   - Check if the API key has proper permissions

### Environment Variables Checklist:

- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI=your_mongodb_connection_string`
- [ ] `GEMINI_API_KEY=your_gemini_api_key`
- [ ] `FRONTEND_URL=https://your-app-name.onrender.com`

## Local Development

To run the application locally:

1. Copy `env.example` to `.env`
2. Fill in your local environment variables
3. Run `npm run install-all`
4. Run `npm run dev`

## Support

If you encounter issues:

1. Check the Render deployment logs
2. Verify all environment variables are set
3. Test the application locally first
4. Check the application logs in Render dashboard

## Security Notes

- Never commit `.env` files to version control
- Use strong, unique passwords for databases
- Regularly rotate API keys
- Enable HTTPS in production (Render handles this automatically)
