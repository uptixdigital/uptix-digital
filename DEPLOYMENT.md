# 🚀 Deployment Guide - Uptix Digital

This guide will walk you through deploying the Uptix Digital website to production.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:
- [ ] All environment variables configured
- [ ] Database provisioned and migrated
- [ ] Email service configured (Resend)
- [ ] Payment providers set up (Binance Pay, Stripe, PayPal)
- [ ] Domain name purchased and configured
- [ ] SSL certificate ready

---

## 🌐 Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest platform for Next.js applications and offers excellent performance.

### Step 1: Prepare Your Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Uptix Digital v1.0"

# Create repository on GitHub and push
git remote add origin https://github.com/yourusername/uptix-digital.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure the following:

#### Build Settings
- **Framework Preset:** Next.js
- **Build Command:** `npm run build` or `next build`
- **Output Directory:** `.next`

#### Environment Variables
Add these environment variables in Vercel dashboard:

```
DATABASE_URL=your_production_database_url
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_super_secret_key_min_32_chars
RESEND_API_KEY=re_your_api_key
BINANCE_PAY_API_KEY=your_binance_key
BINANCE_PAY_SECRET_KEY=your_binance_secret
STRIPE_PUBLIC_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
PAYPAL_CLIENT_ID=your_paypal_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
```

### Step 3: Database Setup

#### Option A: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings > Database
4. Format: `postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres`
5. Add to Vercel environment variables

#### Option B: Railway
1. Go to [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL plugin
4. Get connection string
5. Add to Vercel environment variables

### Step 4: Deploy

1. Click "Deploy" in Vercel
2. Wait for build to complete (2-5 minutes)
3. Your app will be live at `https://your-project.vercel.app`

### Step 5: Configure Custom Domain

1. In Vercel dashboard, go to your project
2. Click "Settings" > "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for SSL certificate (usually automatic)

---

## 🖥️ Option 2: Self-Hosted (VPS/Dedicated Server)

### Server Requirements
- Node.js 18+ 
- PostgreSQL 13+
- Nginx (recommended)
- PM2 (process manager)
- 2GB+ RAM
- 20GB+ Storage

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

### Step 2: Database Setup

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database
CREATE DATABASE uptix_digital;

# Create user
CREATE USER uptix_user WITH ENCRYPTED PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE uptix_digital TO uptix_user;

# Exit
\q
```

### Step 3: Application Setup

```bash
# Create app directory
sudo mkdir -p /var/www/uptix-digital
cd /var/www/uptix-digital

# Clone repository
sudo git clone https://github.com/yourusername/uptix-digital.git .

# Install dependencies
npm install --legacy-peer-deps

# Set environment variables
sudo nano .env.local

# Add your environment variables:
# DATABASE_URL="postgresql://uptix_user:password@localhost:5432/uptix_digital"
# NEXTAUTH_URL="https://your-domain.com"
# NEXTAUTH_SECRET="your-secret"
# ... other variables

# Build application
npm run build

# Run database migrations
npx prisma migrate deploy
npx prisma generate

# Start with PM2
pm2 start npm --name "uptix-digital" -- start

# Save PM2 config
pm2 save
pm2 startup
```

### Step 4: Nginx Configuration

```bash
# Create nginx config
sudo nano /etc/nginx/sites-available/uptix-digital
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
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

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/uptix-digital /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### Step 5: SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## 🐳 Option 3: Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/uptix_digital
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-secret-key
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=uptix_digital
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Deploy with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Run migrations
docker-compose exec app npx prisma migrate deploy
```

---

## 🔧 Post-Deployment Tasks

### 1. Create Admin User

```bash
# On server
pm2 logs

# Or check application logs
cd /var/www/uptix-digital
npm run db:studio

# Register first user, then change role to ADMIN
```

### 2. Configure Webhooks

#### Binance Pay Webhook
1. Go to Binance Pay merchant dashboard
2. Add webhook URL: `https://your-domain.com/api/webhooks/binance-pay`
3. Verify webhook signature

#### Stripe Webhook
1. Go to Stripe Dashboard > Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`

### 3. Email Domain Verification

1. Go to Resend Dashboard
2. Add and verify your domain
3. Update DNS records as instructed
4. Test email sending

### 4. Performance Monitoring

#### Vercel Analytics
- Already included - check dashboard

#### Self-hosted
```bash
# Install monitoring tools
npm install @vercel/analytics

# Or use external services
# - New Relic
# - Datadog
# - Sentry (for error tracking)
```

---

## 🔄 Continuous Deployment

### GitHub Actions (Vercel)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Auto-deploy (Self-hosted)

```bash
# Create deploy script
sudo nano /usr/local/bin/deploy-app
```

```bash
#!/bin/bash
cd /var/www/uptix-digital
git pull origin main
npm install --legacy-peer-deps
npm run build
npx prisma migrate deploy
pm2 restart uptix-digital
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/deploy-app

# Setup webhook listener (optional)
# Use GitHub webhooks to trigger deployment
```

---

## 🛡️ Security Checklist

- [ ] Environment variables secured (not in repo)
- [ ] NEXTAUTH_SECRET is strong (32+ chars)
- [ ] Database password is strong
- [ ] API keys rotated regularly
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Input validation working
- [ ] SQL injection prevention (Prisma)
- [ ] XSS protection enabled

---

## 🐛 Troubleshooting

### Build Failures

```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install --legacy-peer-deps
npm run build
```

### Database Connection Issues

```bash
# Test connection
npx prisma db pull

# Check environment variables
echo $DATABASE_URL
```

### Socket.io Not Working (Vercel)

Vercel doesn't support WebSocket servers in serverless functions. For real-time chat:
- Use Vercel with serverless functions (polling mode)
- Or deploy to VPS/Railway/Render for full WebSocket support
- Or use Pusher/Ably for managed WebSocket service

### Email Not Sending

1. Check Resend API key
2. Verify domain is verified in Resend
3. Check spam folders
4. Review email templates

---

## 📊 Scaling Considerations

### Database
- Use connection pooling (PgBouncer)
- Consider read replicas
- Monitor query performance
- Regular backups

### Application
- Use CDN for static assets
- Enable caching headers
- Optimize images
- Use Redis for session storage

### Infrastructure
- Load balancer for multiple instances
- Auto-scaling groups
- Separate database server
- Redis cluster

---

## 📝 Maintenance Tasks

### Daily
- Monitor error logs
- Check application health
- Review failed payments

### Weekly
- Security updates
- Performance review
- Backup verification

### Monthly
- Dependency updates
- Security audit
- Cost review
- Analytics review

---

## 🆘 Emergency Procedures

### Application Down

```bash
# Check status
pm2 status
pm2 logs

# Restart
pm2 restart uptix-digital

# If still down
cd /var/www/uptix-digital
npm run build
pm2 restart uptix-digital
```

### Database Issues

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Restart
dudo systemctl restart postgresql

# Check logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

---

## 📞 Support Contacts

- **Vercel Support:** support@vercel.com
- **Supabase Support:** support@supabase.com
- **Resend Support:** support@resend.com
- **NextAuth Issues:** https://github.com/nextauthjs/next-auth/issues

---

## ✅ Deployment Verification

After deployment, verify:
- [ ] Homepage loads correctly
- [ ] Login works
- [ ] Registration works
- [ ] Dashboard loads
- [ ] Orders can be created
- [ ] Chat system works
- [ ] Payments process
- [ ] Emails send
- [ ] All pages have SSL
- [ ] Mobile responsive
- [ ] Performance is good (Lighthouse score >90)

---

**Your Uptix Digital website is now ready for production! 🚀**
