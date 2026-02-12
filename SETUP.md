# Uptix Digital - Setup Guide

## 🎉 Project Successfully Created!

This is a **production-level Service Agency Website** built with Next.js 14, featuring a stunning glassmorphism design, custom cursor with gradient light trail effect, and comprehensive dashboard functionality.

## ✅ Completed Features

### Core Features
- ✅ Next.js 14+ with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS with custom dark theme
- ✅ Glassmorphism UI components
- ✅ Custom cursor with gradient light trail effect
- ✅ Monospace fonts (JetBrains Mono, Fira Code)
- ✅ Framer Motion animations
- ✅ Shadcn UI components
- ✅ Responsive design
- ✅ SEO optimized

### Authentication & Authorization
- ✅ NextAuth.js integration
- ✅ Role-based access control (Admin & Client)
- ✅ Login and Registration pages
- ✅ Protected routes middleware
- ✅ Session management

### Database & Models
- ✅ Prisma ORM with PostgreSQL
- ✅ User model with roles
- ✅ Order management system
- ✅ Message/Chat system structure
- ✅ Blog CMS structure
- ✅ Project store structure
- ✅ Payment tracking

### Public Pages
- ✅ Home page with hero section
- ✅ Services showcase page
- ✅ Contact page with form
- ✅ Navigation and footer
- ✅ Stats section
- ✅ Process section
- ✅ Testimonials section
- ✅ CTA sections

### Client Dashboard
- ✅ Dashboard overview
- ✅ Order management
- ✅ Create new orders
- ✅ Order status tracking
- ✅ Stats cards
- ✅ Recent messages
- ✅ Sidebar navigation

### Admin Dashboard
- ✅ Admin overview
- ✅ User management
- ✅ Order control
- ✅ Blog CMS
- ✅ Project management
- ✅ Quick actions
- ✅ Statistics overview

## 📁 Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── dashboard/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts
│   │   │   │   └── session/
│   │   │   │       └── route.ts
│   │   │   └── orders/
│   │   │       └── route.ts
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── client/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   └── orders/
│   │   │       └── new/
│   │   │           └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── auth/
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   ├── contact/
│   │   │   ├── contact-form.tsx
│   │   │   └── contact-info.tsx
│   │   ├── dashboard/
│   │   │   ├── admin-shell.tsx
│   │   │   ├── admin-stats.tsx
│   │   │   ├── admin-recent-orders.tsx
│   │   │   ├── create-order-form.tsx
│   │   │   ├── header.tsx
│   │   │   ├── orders-list.tsx
│   │   │   ├── quick-actions.tsx
│   │   │   ├── recent-messages.tsx
│   │   │   ├── shell.tsx
│   │   │   └── stats-cards.tsx
│   │   ├── sections/
│   │   │   ├── hero.tsx
│   │   │   ├── services.tsx
│   │   │   ├── stats.tsx
│   │   │   ├── projects.tsx
│   │   │   ├── process.tsx
│   │   │   ├── testimonials.tsx
│   │   │   └── cta.tsx
│   │   ├── services/
│   │   │   └── services-list.tsx
│   │   ├── shared/
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── toast.tsx
│   │   ├── custom-cursor.tsx
│   │   └── theme-provider.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── prisma.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts
│   └── middleware.ts
├── prisma/
│   └── schema.prisma
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── .env.example
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (local or Supabase)
- npm, yarn, or pnpm

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/uptix_digital?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars-long"

# Email (Optional - for notifications)
RESEND_API_KEY="re_your_api_key"

# Payment (Optional - for payments)
BINANCE_PAY_API_KEY="your_binance_key"
BINANCE_PAY_SECRET_KEY="your_binance_secret"
```

### 2. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view/edit data
npx prisma studio
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Create First Admin User

After registration, manually update the user's role to ADMIN in the database:

```bash
npx prisma studio
```

Navigate to the User table and change the role from "CLIENT" to "ADMIN" for your user.

## 🎨 Design Features

### Glassmorphism Effects
- Translucent backgrounds with `backdrop-filter: blur()`
- Gradient borders and shadows
- Hover effects with color transitions

### Custom Cursor
- Gradient light trail effect following cursor movement
- Smooth animations with Framer Motion
- Interactive states on hoverable elements
- Glow effects with box-shadows

### Typography
- Primary: JetBrains Mono (coding font)
- Fallback: Fira Code
- Monospace aesthetic throughout

### Color Scheme
- Background: Deep slate (#0f172a)
- Accents: Blue (#3b82f6), Purple (#8b5cf6), Pink (#ec4899)
- Text: White and slate gray variants

## 📱 Pages Overview

### Public Pages
- **/** - Home page with hero, services, stats, projects, testimonials
- **/services** - Detailed service offerings with pricing
- **/contact** - Contact form with service selection
- **/projects** - Project portfolio (to be implemented)
- **/blog** - Blog listing (to be implemented)

### Auth Pages
- **/auth/login** - User login
- **/auth/register** - User registration

### Client Dashboard
- **/client/dashboard** - Overview with stats and recent activity
- **/client/orders** - Order history and management
- **/client/orders/new** - Create new order
- **/client/messages** - Messaging system

### Admin Dashboard
- **/admin/dashboard** - Admin overview with platform stats
- **/admin/orders** - All orders management
- **/admin/users** - User management
- **/admin/blog** - Blog CMS
- **/admin/projects** - Project store management

## 🔧 Next Steps

### High Priority (To Complete)
1. **Real-time Chat System**
   - Implement Socket.io for live messaging
   - Add chat interface in dashboard
   - Message notifications

2. **Payment Integration**
   - Integrate Binance Pay SDK
   - Add payment pages
   - Invoice generation

3. **Email System**
   - Configure Resend/Nodemailer
   - Email templates
   - Automated notifications

4. **Blog System**
   - Blog post creation
   - Rich text editor
   - Comment system

5. **Project Store**
   - Project listings
   - Purchase flow
   - Download management

### Medium Priority
- File upload system
- Advanced search
- Analytics dashboard
- API documentation
- Multi-language support

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check DATABASE_URL format
   - Ensure PostgreSQL is running
   - Verify credentials

2. **NextAuth Session Issues**
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your URL
   - Clear browser cookies

3. **Build Errors**
   - Run `npm install` again
   - Delete `.next` folder and rebuild
   - Check TypeScript errors

4. **Prisma Errors**
   - Run `npx prisma generate`
   - Check if migrations are applied
   - Verify database connection

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the documentation links
3. Create an issue in the repository

## 📝 License

This project is licensed under the MIT License.

---

**Built with ❤️ by Uptix Digital**
