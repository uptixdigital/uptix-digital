"use client"

import { motion } from "framer-motion"
import { Search, Lightbulb, Code, Rocket, CheckCircle2 } from "lucide-react"

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    description: "We analyze your requirements, understand your goals, and define the project scope through detailed consultations.",
    color: "blue",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Strategy",
    description: "Our team creates a comprehensive roadmap with architecture design, tech stack selection, and timeline planning.",
    color: "purple",
  },
  {
    icon: Code,
    number: "03",
    title: "Development",
    description: "Agile development with regular sprints, code reviews, and continuous integration to ensure quality delivery.",
    color: "pink",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch",
    description: "Seamless deployment with performance optimization, security hardening, and ongoing support & maintenance.",
    color: "cyan",
  },
]

export default function ProcessSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">// PROCESS</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-mono">
            Our proven development process ensures transparent communication 
            and exceptional results.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass-card rounded-2xl p-6 h-full relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-6">
                    <span className="text-4xl font-bold text-slate-700 font-mono">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-${step.color}-500/10 flex items-center justify-center mb-4 mt-4`}>
                    <step.icon className={`w-8 h-8 text-${step.color}-400`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Checkmark */}
                  <div className="mt-4 flex items-center space-x-2">
                    <CheckCircle2 className={`w-5 h-5 text-${step.color}-400`} />
                    <span className="text-xs text-slate-500 font-mono">Phase Complete</span>
                  </div>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 z-20">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
