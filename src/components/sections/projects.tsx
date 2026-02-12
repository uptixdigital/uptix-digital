"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-mono text-sm">// PORTFOLIO</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-mono">
            Explore our latest work and see how we have helped businesses 
            transform their digital presence.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group glass-card border-white/10 overflow-hidden relative">
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <Badge variant="gradient" className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Featured</span>
                    </Badge>
                  </div>
                )}

                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                  {/* Placeholder for actual images */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50">
                    <div className="text-6xl font-bold text-slate-700">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="glass" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center space-x-4">
                    <Link
                      href={project.github}
                      className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </Link>
                    <Link
                      href={project.demo}
                      className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
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
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/projects">
            <button className="glass-card px-8 py-3 rounded-lg text-white hover:bg-white/10 transition-all">
              View All Projects
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
