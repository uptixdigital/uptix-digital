"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content: "Uptix Digital transformed our vision into reality. Their expertise in modern web technologies and attention to detail exceeded our expectations. The team's professionalism and communication throughout the project was exceptional.",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Founder, DataFlow Systems",
    content: "Working with Uptix was a game-changer for our business. They delivered a complex data analytics platform ahead of schedule and the performance optimizations they implemented were remarkable.",
    rating: 5,
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "CTO, InnovateLab",
    content: "The mobile app Uptix developed for us has received outstanding user feedback. Their understanding of user experience and technical excellence made them the perfect partner for our project.",
    rating: 5,
    avatar: "ER",
  },
]

export default function TestimonialsSection() {
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
          <span className="text-pink-400 font-mono text-sm">// TESTIMONIALS</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            Client <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-mono">
            Do not just take our word for it. Here is what our clients 
            have to say about working with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card border-white/10 h-full">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-blue-500/30 mb-4" />

                  {/* Rating */}
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
