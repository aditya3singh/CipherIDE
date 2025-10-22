# 🚀 CipherStudio Deployment Guide

## Frontend Deployment (Vercel)

### Option 1: GitHub Integration (Recommended)
1. Push code to GitHub: `https://github.com/aditya3singh/CipherIDE.git`
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variables:
   - `VITE_API_URL`: Your backend URL
7. Deploy!

### Option 2: Vercel CLI
```bash
cd frontend
npm install -g vercel
vercel --prod
```

## Backend Deployment (Render)

### Step 1: Prepare for Deployment
1. Ensure `backend/package.json` has start script
2. Create `render.yaml` (optional):

```yaml
services:
  - type: web
    name: cipherstudio-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

### Step 2: Deploy to Render
1. Go to [Render Dashboard](https://render.com/dashboard)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: cipherstudio-api
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret key
   - `PORT`: 5000 (or leave empty for auto-assign)
6. Deploy!

## Alternative Backend Deployment (Railway)

1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Root Directory**: `backend`
   - Add environment variables
5. Deploy!

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cipherstudio
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
```

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free tier available)
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get connection string
6. Replace `<username>`, `<password>`, and `<dbname>`

## Post-Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and responding
- [ ] Database connected successfully
- [ ] CORS configured for frontend domain
- [ ] Environment variables set correctly
- [ ] API endpoints working
- [ ] Authentication flow working
- [ ] File operations working
- [ ] Preview functionality working

## Troubleshooting

### Common Issues

**CORS Error**
```javascript
// In backend/server.js, update CORS config:
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.vercel.app'],
  credentials: true
}));
```

**MongoDB Connection Error**
- Check connection string format
- Verify database user credentials
- Ensure IP whitelist includes deployment server

**Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check for environment-specific code

## Performance Optimization

### Frontend
- Enable Vercel's Edge Network
- Configure caching headers
- Optimize bundle size

### Backend
- Enable MongoDB connection pooling
- Add request rate limiting
- Implement response caching

## Monitoring

### Vercel Analytics
- Enable in Vercel dashboard
- Monitor page views and performance

### Render Metrics
- Monitor CPU and memory usage
- Set up health checks
- Configure alerts

## Custom Domain (Optional)

### Vercel
1. Go to project settings
2. Add custom domain
3. Configure DNS records

### Render
1. Go to service settings
2. Add custom domain
3. Configure DNS records

---

🎉 **Your CipherStudio IDE is now live!**