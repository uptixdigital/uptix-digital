"use client"

import { motion } from "framer-motion"
import { ArrowRight, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-sm mb-6">
                Ready to start?
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Let&apos;s Build Something
                <br />
                <span className="gradient-text">Amazing Together</span>
              </h2>

              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto font-mono">
                Have a project in mind? We&apos;d love to hear about it. Get in touch 
                and let&apos;s discuss how we can help bring your vision to life.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="btn-glow bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0 px-8 py-6 text-lg group"
                  >
                    Start a Project
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="glass-card border-white/20 px-8 py-6 text-lg"
                  >
                    <MessageSquare className="mr-2 w-5 h-5" />
                    Schedule a Call
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-slate-500 text-sm mb-4 font-mono">
                  Trusted by innovative companies worldwide
                </p>
                <div className="flex items-center justify-center space-x-8 opacity-50">
                  {['Company 1', 'Company 2', 'Company 3', 'Company 4'].map((company, i) => (
                    <div key={i} className="text-slate-400 font-bold text-lg">
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
