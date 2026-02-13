"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    image: "/projects/ecommerce.jpg",
    tags: ["Next.js", "Prisma", "Stripe", "PostgreSQL"],
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "SaaS Dashboard",
    description: "Analytics dashboard with real-time data visualization, user management, and reporting features.",
    image: "/projects/dashboard.jpg",
    tags: ["React", "TypeScript", "D3.js", "Node.js"],
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication and real-time transactions.",
    image: "/projects/banking.jpg",
    tags: ["React Native", "Node.js", "MongoDB", "AWS"],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    title: "AI Content Generator",
    description: "AI-powered content creation platform with natural language processing capabilities.",
    image: "/projects/ai.jpg",
    tags: ["Python", "OpenAI", "FastAPI", "Redis"],
    github: "#",
    demo: "#",
    featured: false,
  },
]

export default function ProjectsSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-purple-400 font-mono text-sm inline-block"
          >
            // PORTFOLIO
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-2xl mx-auto font-mono"
          >
            Explore our latest work and see how we have helped businesses 
            transform their digital presence.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card className="group glass-card border-white/10 overflow-hidden relative hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10">
                {/* Featured Badge */}
                {project.featured && (
                  <motion.div 
                    className="absolute top-4 right-4 z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Badge variant="gradient" className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Featured</span>
                    </Badge>
                  </motion.div>
                )}

                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 bg-slate-800" />
                  {/* Placeholder for actual images */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center bg-slate-800/50 group-hover:scale-110 transition-transform duration-700"
                  >
                    <div className="text-6xl font-bold text-slate-700 group-hover:text-slate-600 transition-colors">
                      {project.title.charAt(0)}
                    </div>
                  </motion.div>
                  
                  {/* Hover Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>

                <CardContent className="p-6 relative">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:via-blue-500/5 group-hover:to-pink-500/5 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300 relative z-10">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 group-hover:text-slate-300 transition-colors relative z-10">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.15 + tagIndex * 0.05 + 0.3 }}
                        viewport={{ once: true }}
                      >
                        <Badge variant="glass" className="text-xs group-hover:bg-white/10 transition-colors">
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center space-x-4 relative z-10">
                    <Link
                      href={project.github}
                      className="flex items-center space-x-1 text-slate-400 hover:text-white transition-all duration-300 text-sm group/link"
                    >
                      <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                      <span className="group-hover/link:underline">Code</span>
                    </Link>
                    <Link
                      href={project.demo}
                      className="flex items-center space-x-1 text-slate-400 hover:text-white transition-all duration-300 text-sm group/link"
                    >
                      <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                      <span className="group-hover/link:underline">Live Demo</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/projects">
              <button className="glass-card px-8 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden group">
                <span className="relative z-10">View All Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
