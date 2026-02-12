"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { 
  Code2, 
  Smartphone, 
  Database, 
  Zap, 
  Terminal,
  Globe 
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Custom web applications built with Next.js, React, and modern technologies for optimal performance.",
    color: "blue",
    href: "/services/web-development",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.",
    color: "purple",
    href: "/services/mobile-apps",
  },
  {
    icon: Database,
    title: "API Development",
    description: "Robust RESTful and GraphQL APIs designed for scalability, security, and seamless integration.",
    color: "pink",
    href: "/services/api-development",
  },
  {
    icon: Terminal,
    title: "Python Applications",
    description: "Data-driven applications, automation scripts, and AI/ML solutions using Python ecosystem.",
    color: "cyan",
    href: "/services/python-applications",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed up your applications with advanced caching, optimization techniques, and best practices.",
    color: "yellow",
    href: "/services/performance",
  },
  {
    icon: Globe,
    title: "Full-Stack Solutions",
    description: "End-to-end development from database design to deployment with modern cloud infrastructure.",
    color: "green",
    href: "/services/full-stack",
  },
]

const colorClasses: Record<string, { bg: string; text: string; glow: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", glow: "shadow-blue-500/20" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", glow: "shadow-purple-500/20" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-400", glow: "shadow-pink-500/20" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", glow: "shadow-cyan-500/20" },
  yellow: { bg: "bg-yellow-500/10", text: "text-yellow-400", glow: "shadow-yellow-500/20" },
  green: { bg: "bg-green-500/10", text: "text-green-400", glow: "shadow-green-500/20" },
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const stepValue = value / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += stepValue
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function StatsSection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 150, suffix: "+", label: "Projects Delivered" },
            { value: 50, suffix: "+", label: "Happy Clients" },
            { value: 5, suffix: "+", label: "Years Experience" },
            { value: 99, suffix: "%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-slate-400 font-mono text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesSection() {
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
          <span className="text-blue-400 font-mono text-sm">// SERVICES</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            What We <span className="gradient-text">Build</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-mono">
            From concept to deployment, we deliver cutting-edge digital solutions 
            tailored to your business needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const colors = colorClasses[service.color]
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={service.href}>
                  <Card className="group glass-card border-white/10 hover:border-white/20 transition-all duration-300 h-full overflow-hidden relative">
                    {/* Hover Gradient */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${colors.bg}`} />
                    
                    <CardHeader className="relative z-10">
                      <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className={`w-7 h-7 ${colors.text}`} />
                      </div>
                      <CardTitle className="text-xl text-white group-hover:gradient-text transition-all">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
