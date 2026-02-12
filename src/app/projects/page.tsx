import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Uptix Digital",
  description: "Explore our portfolio of web applications, mobile apps, and digital solutions. See how we've helped businesses transform their digital presence.",
  openGraph: {
    title: "Projects | Uptix Digital",
    description: "Explore our portfolio of web applications, mobile apps, and digital solutions.",
    type: "website",
  },
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-400 font-mono text-sm">// PORTFOLIO</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            Our <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-mono">
            Explore our latest work and see how we have helped businesses 
            transform their digital presence.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "E-Commerce Platform",
              category: "Web Development",
              description: "Full-stack e-commerce solution with real-time inventory and payment processing.",
              tags: ["Next.js", "Prisma", "Stripe", "PostgreSQL"],
            },
            {
              title: "SaaS Dashboard",
              category: "Web Application",
              description: "Analytics dashboard with real-time data visualization and user management.",
              tags: ["React", "TypeScript", "D3.js", "Node.js"],
            },
            {
              title: "Mobile Banking App",
              category: "Mobile Development",
              description: "Secure mobile banking application with biometric authentication.",
              tags: ["React Native", "Node.js", "MongoDB", "AWS"],
            },
            {
              title: "AI Content Generator",
              category: "AI/ML",
              description: "AI-powered content creation platform with natural language processing.",
              tags: ["Python", "OpenAI", "FastAPI", "Redis"],
            },
          ].map((project, index) => (
            <div
              key={project.title}
              className="glass-card rounded-xl overflow-hidden border border-white/10 group hover:border-white/20 transition-all"
            >
              <div className="h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                <span className="text-6xl font-bold text-slate-700">
                  {project.title.charAt(0)}
                </span>
              </div>
              <div className="p-6">
                <div className="text-blue-400 text-sm font-mono mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs bg-white/5 text-slate-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
