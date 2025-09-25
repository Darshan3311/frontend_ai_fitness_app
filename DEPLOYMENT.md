# Deployment Guide for Render

## Prerequisites
- GitHub repository with your frontend code
- Render account

## Deployment Steps

### 1. Prepare Your Repository
Make sure your repository contains:
- `render.yaml` file (already created)
- `package.json` with build scripts
- All source code committed and pushed to GitHub

### 2. Connect to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file

### 3. Configure Environment Variables
In the Render dashboard, set the following environment variable:
- `VITE_API_BASE_URL`: Your backend API URL (e.g., `https://your-backend.onrender.com/api`)

### 4. Deploy
1. Click "Apply" to start the deployment
2. Render will automatically:
   - Install dependencies (`npm install`)
   - Build the project (`npm run build`)
   - Serve the static files from the `dist` folder

## Configuration Details

### render.yaml Explanation
- **Service Type**: `static` - for serving static React build files
- **Build Command**: `npm install && npm run build` - installs dependencies and builds the project
- **Static Publish Path**: `./dist` - Vite builds to the `dist` folder
- **Routes**: Configured for SPA routing (all routes redirect to `index.html`)
- **Security Headers**: Added security headers for production
- **Environment Variables**: Production environment configuration

### Important Notes
1. Make sure your backend API supports CORS for your frontend domain
2. Update the `VITE_API_BASE_URL` environment variable with your actual backend URL
3. The deployment will fail if the build command fails
4. Check Render logs if there are any deployment issues

## Troubleshooting
- If build fails, check the build logs in Render dashboard
- Ensure all dependencies are listed in `package.json`
- Verify environment variables are set correctly
- Check that your backend API is accessible from the frontend domain