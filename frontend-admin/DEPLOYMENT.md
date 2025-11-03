# Deployment Guide - Admin Panel

## 📋 Prerequisites

- Node.js 20+ installed
- npm or yarn package manager
- Git for version control
- Production database credentials
- SSL certificate (for HTTPS)

## 🚀 Production Deployment

### 1. Environment Setup

Create `.env.production` file:

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://admin.yourdomain.com
NEXT_PUBLIC_APP_NAME="Admin Panel - 언니의 소개"

# API Configuration
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_API_TIMEOUT=30000

# Authentication
NEXT_PUBLIC_AUTH_ENABLED=true
NEXTAUTH_URL=https://admin.yourdomain.com
NEXTAUTH_SECRET=your-production-secret-key-here

# Database
DATABASE_URL=mysql://user:password@host:3306/pikmi

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_REALTIME=true

# Performance
NEXT_PUBLIC_ENABLE_SW=true
NEXT_PUBLIC_ENABLE_COMPRESSION=true

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_GA_TRACKING_ID=your-ga-id
```

### 2. Build Process

```bash
# Install dependencies
npm ci --production=false

# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build

# Test production build locally
npm start
```

### 3. Deployment Options

#### Option A: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Option B: Docker

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3001
ENV PORT 3001

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t admin-panel .
docker run -p 3001:3001 admin-panel
```

#### Option C: Traditional Server (PM2)

```bash
# Install PM2
npm install -g pm2

# Build the application
npm run build

# Start with PM2
pm2 start npm --name "admin-panel" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 4. Nginx Configuration

```nginx
server {
    listen 80;
    server_name admin.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name admin.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location /_next/static {
        proxy_pass http://localhost:3001;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /public {
        proxy_pass http://localhost:3001;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

## 🔒 Security Checklist

- [ ] Change all default credentials
- [ ] Use strong NEXTAUTH_SECRET
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Configure CSP (Content Security Policy)
- [ ] Set up firewall rules
- [ ] Enable database encryption
- [ ] Configure backup strategy
- [ ] Set up monitoring and alerts
- [ ] Enable audit logging

## 📊 Performance Optimization

### CDN Configuration

Use CDN for static assets:

```javascript
// next.config.js
module.exports = {
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://cdn.yourdomain.com' 
    : '',
}
```

### Database Optimization

- Enable connection pooling
- Set up read replicas
- Configure query caching
- Index frequently queried fields
- Regular database maintenance

### Caching Strategy

```javascript
// Redis caching example
import Redis from 'ioredis'

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASSWORD,
})

export async function getCachedData(key: string) {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)
  return null
}

export async function setCachedData(key: string, data: any, ttl = 3600) {
  await redis.setex(key, ttl, JSON.stringify(data))
}
```

## 🔍 Monitoring

### Health Check Endpoint

Create `pages/api/health.ts`:

```typescript
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check database connection
  // Check external services
  // Check memory usage
  
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  })
}
```

### Logging

- Use structured logging (Winston, Pino)
- Centralize logs (ELK Stack, CloudWatch)
- Set up log rotation
- Configure log levels per environment

### Metrics

- Track response times
- Monitor error rates
- Watch memory usage
- Track database query performance
- Monitor API endpoint usage

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy Admin Panel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Type check
        run: npm run type-check
        
      - name: Lint
        run: npm run lint
        
      - name: Build
        run: npm run build
        
      - name: Deploy to production
        run: |
          # Your deployment script here
```

## 🔧 Troubleshooting

### Common Issues

1. **Build fails**
   - Check Node.js version
   - Clear node_modules and reinstall
   - Verify environment variables

2. **Performance issues**
   - Enable production mode
   - Check database indexes
   - Review slow queries
   - Optimize bundle size

3. **Memory leaks**
   - Monitor with PM2
   - Check for unclosed connections
   - Review event listeners
   - Use memory profiling tools

## 📞 Support

For deployment issues:
- Check logs: `pm2 logs admin-panel`
- Monitor: `pm2 monit`
- Restart: `pm2 restart admin-panel`

---

Last updated: 2025-10-31



