# Deployment Guide

This guide covers various deployment options for the SciViz Design System.

## Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

Access the app at:
- Frontend: http://localhost:3000
- API: http://localhost:5000

## Production Deployment Options

### 1. Traditional VPS/Server Deployment

**Requirements:**
- Node.js 18+
- PM2 (recommended for process management)
- Nginx (recommended for reverse proxy)

**Steps:**

1. **Build the application:**
```bash
npm run build
```

2. **Install PM2:**
```bash
npm install -g pm2
```

3. **Create PM2 ecosystem file:**
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'sciviz-design-system',
    script: 'dist/index.js',
    env: {
      NODE_ENV: 'production',
      PORT: 5000,
      DATABASE_URL: 'your-database-url'
    }
  }]
}
```

4. **Start with PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 2. Docker Deployment

**Build and run:**
```bash
docker build -t sciviz-design-system .
docker run -p 5000:5000 -e DATABASE_URL="your-db-url" sciviz-design-system
```

**With Docker Compose:**
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/sciviz
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=sciviz
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 3. Vercel Deployment

**For the frontend (static):**
1. Deploy the `client` folder to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist/public`

**For the API (serverless):**
1. Create `api` folder in root
2. Move server files to serverless functions
3. Configure `vercel.json`

### 4. Netlify Deployment

**Static site deployment:**
1. Build command: `npm run build`
2. Publish directory: `dist/public`
3. For API, use Netlify Functions

### 5. Railway/Render Deployment

**Railway:**
1. Connect your GitHub repository
2. Set environment variables
3. Railway will auto-deploy

**Render:**
1. Create new Web Service
2. Connect repository
3. Set build command: `npm run build`
4. Set start command: `npm start`

## Environment Variables

**Required for production:**
```bash
NODE_ENV=production
DATABASE_URL=your-database-connection-string
SESSION_SECRET=your-secure-session-secret
PORT=5000  # optional, defaults to 5000
```

## Database Setup

### PostgreSQL (Recommended for Production)

1. **Create database:**
```sql
CREATE DATABASE sciviz_design_system;
```

2. **Set DATABASE_URL:**
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/sciviz_design_system
```

3. **Run migrations:**
```bash
npm run db:push
```

### SQLite (Development Only)

SQLite is automatically used for local development when no DATABASE_URL is provided.

## Nginx Configuration (Optional)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL/HTTPS Setup

**With Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Monitoring and Logs

**With PM2:**
```bash
pm2 logs sciviz-design-system
pm2 monit
```

**Log files location:**
- PM2 logs: `~/.pm2/logs/`
- Application logs: Check your configured log directory

## Performance Optimization

1. **Enable gzip compression in Nginx**
2. **Use CDN for static assets**
3. **Configure caching headers**
4. **Monitor database performance**
5. **Use connection pooling for database**

## Troubleshooting

**Common issues:**

1. **Port already in use:**
```bash
lsof -ti:5000 | xargs kill -9
```

2. **Database connection issues:**
- Check DATABASE_URL format
- Verify database server is running
- Check firewall settings

3. **Build failures:**
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all environment variables are set

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure session secret
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Keep dependencies updated
- [ ] Configure proper database permissions
- [ ] Set up proper backup strategy