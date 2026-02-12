"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProjectForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    techStack: "",
    previewUrl: "",
    repoUrl: "",
    images: "",
    featured: false,
    published: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          techStack: formData.techStack.split(",").map(tech => tech.trim()).filter(Boolean),
          images: formData.images.split("\n").map(url => url.trim()).filter(Boolean),
        }),
      })

      if (response.ok) {
        router.push("/admin/projects")
        router.refresh()
      } else {
        alert("Failed to create project")
      }
    } catch (error) {
      console.error("Error creating project:", error)
      alert("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-300">Project Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter project title"
                required
                className="glass border-white/10 bg-white/5 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-300">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the project..."
                rows={4}
                required
                className="glass border-white/10 bg-white/5 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-slate-300">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="99.99"
                  required
                  className="glass border-white/10 bg-white/5 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-300">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Web Development"
                  required
                  className="glass border-white/10 bg-white/5 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="techStack" className="text-slate-300">Tech Stack (comma-separated)</Label>
              <Input
                id="techStack"
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                placeholder="React, Node.js, PostgreSQL"
                className="glass border-white/10 bg-white/5 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="previewUrl" className="text-slate-300">Preview URL</Label>
                <Input
                  id="previewUrl"
                  value={formData.previewUrl}
                  onChange={(e) => setFormData({ ...formData, previewUrl: e.target.value })}
                  placeholder="https://demo.example.com"
                  className="glass border-white/10 bg-white/5 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repoUrl" className="text-slate-300">Repository URL</Label>
                <Input
                  id="repoUrl"
                  value={formData.repoUrl}
                  onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="glass border-white/10 bg-white/5 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images" className="text-slate-300">Image URLs (one per line)</Label>
              <Textarea
                id="images"
                value={formData.images}
                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                rows={3}
                className="glass border-white/10 bg-white/5 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500"
              />
              <Label htmlFor="featured" className="text-slate-300 cursor-pointer">
                Featured Project
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500"
              />
              <Label htmlFor="published" className="text-slate-300 cursor-pointer">
                Published
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-500"
          >
            {isLoading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</>
            ) : (
              <><Save className="mr-2 h-4 w-4" /> Create Project</>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/projects")}
            className="glass-card"
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
