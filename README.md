# Uptix Digital Agency Website

A production-level Service Agency Website built with Next.js 14, TypeScript, and Tailwind CSS. Features a modern glassmorphism design, role-based authentication, client and admin dashboards, and a comprehensive project management system.

## 🚀 Features

### Public Website
- **Modern Glassmorphism Design** - Stunning UI with glass effects and gradient accents
- **Custom Cursor** - Interactive cursor with gradient light trail effect
- **Responsive Layout** - Fully responsive across all devices
- **SEO Optimized** - Built with Next.js App Router for optimal SEO
- **Services Showcase** - Detailed service pages with pricing
- **Project Portfolio** - Git-style project cards with previews
- **Blog System** - Full CMS for content management

### Client Dashboard
- **Order Management** - Create and track project orders
- **Real-time Messaging** - Chat system for project communication
- **File Upload** - Share project requirements and files
- **Payment Tracking** - View payment history and invoices
- **Project Status** - Track order progress in real-time

### Admin Dashboard
- **User Management** - Manage client accounts and permissions
- **Order Control** - Update order status and manage workflow
- **Blog CMS** - Create, edit, and publish blog posts
- **Project Management** - Manage store projects and listings
- **Analytics** - View platform statistics and metrics

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Payments**: Binance Pay (Stripe/PayPal ready)
- **Email**: Resend / Nodemailer
- **Real-time**: Socket.io (ready)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/uptix-digital.git
   cd uptix-digital
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Random string for JWT encryption
   - `NEXTAUTH_URL` - Your app URL
   - Email and payment provider API keys

4. **Setup the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## 🎨 Design Features

- **Glassmorphism Cards** - Translucent cards with backdrop blur
- **Gradient Accents** - Blue to purple to pink gradient highlights
- **Monospace Typography** - Coding-style fonts (JetBrains Mono, Fira Code)
- **Dark Theme** - Pure dark mode with colorful accents
- **Smooth Animations** - Framer Motion powered transitions
- **Custom Cursor** - Interactive cursor with light trail effect

## 📁 Project Structure

```
/src
  /app                 # Next.js app routes
    /admin            # Admin dashboard routes
    /api              # API routes
    /auth             # Authentication pages
    /client           # Client dashboard routes
    /public           # Public pages
  /components
    /auth             # Authentication components
    /contact          # Contact page components
    /dashboard        # Dashboard components
    /sections         # Home page sections
    /services         # Services components
    /shared           # Shared components
    /ui               # UI components
  /lib
    auth.ts           # NextAuth configuration
    prisma.ts         # Prisma client
    utils.ts          # Utility functions
  /types
    index.ts          # TypeScript types
  middleware.ts       # Next.js middleware
```

## 🔐 Authentication

The app uses NextAuth.js with credentials provider. Users can have two roles:
- **CLIENT** - Can create orders, view dashboard, and communicate
- **ADMIN** - Full access to manage orders, users, and content

## 💳 Payment Integration

Currently supports:
- Binance Pay (primary)
- Stripe (ready to implement)
- PayPal (ready to implement)

## 📧 Email System

Configured with Resend for:
- Welcome emails
- Order notifications
- Payment confirmations
- General communications

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Self-hosted

```bash
npm run build
npm start
```

## 📝 API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/orders` - Order management
- `/api/messages` - Messaging system
- `/api/payments` - Payment processing
- `/api/blog` - Blog posts
- `/api/projects` - Project store

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Credits

- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - UI component library
- **Framer Motion** - Animation library
- **Prisma** - Database ORM
- **NextAuth.js** - Authentication library

## 📞 Support

For support, email hello@uptixdigital.com or join our Slack channel.

---

Built with ❤️ by Uptix Digital
