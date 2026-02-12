"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const serviceTypes = [
  { value: "WEB_DEVELOPMENT", label: "Web Development" },
  { value: "APP_DEVELOPMENT", label: "App Development" },
  { value: "API_DEVELOPMENT", label: "API Development" },
  { value: "PYTHON_APPLICATION", label: "Python Application" },
  { value: "MOBILE_APP", label: "Mobile App" },
  { value: "PERFORMANCE_OPTIMIZATION", label: "Performance Optimization" },
  { value: "CONSULTATION", label: "Consultation" },
]

export function CreateOrderForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      serviceType: formData.get("serviceType"),
      title: formData.get("title"),
      description: formData.get("description"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push("/client/dashboard")
        router.refresh()
      }
    } catch (error) {
      console.error("Error creating order:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="glass-card border-white/10 max-w-2xl">
        <CardContent className="p-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="serviceType" className="text-slate-300">Service Type</Label>
              <Select name="serviceType" required>
                <SelectTrigger className="glass border-white/10 bg-white/5 text-white">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="glass-card border-white/10">
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-300">Project Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., E-commerce Website"
                required
                className="glass border-white/10 bg-white/5 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-300">Project Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your project requirements..."
                required
                rows={5}
                className="glass border-white/10 bg-white/5 text-white placeholder:text-slate-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-slate-300">Budget (USD)</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  placeholder="5000"
                  className="glass border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline" className="text-slate-300">Timeline</Label>
                <Input
                  id="timeline"
                  name="timeline"
                  placeholder="e.g., 2 months"
                  className="glass border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Order...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Order
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
