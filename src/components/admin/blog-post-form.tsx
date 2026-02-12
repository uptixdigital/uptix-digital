"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Save, Eye, EyeOff, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  coverImage: string | null
  tags: string[]
  metaTitle: string | null
  metaDesc: string | null
  published: boolean
}

interface BlogPostFormProps {
  blog?: Blog
}

export function BlogPostForm({ blog }: BlogPostFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    slug: blog?.slug || "",
    excerpt: blog?.excerpt || "",
    content: blog?.content || "",
    coverImage: blog?.coverImage || "",
    tags: blog?.tags?.join(", ") || "",
    metaTitle: blog?.metaTitle || "",
    metaDesc: blog?.metaDesc || "",
    published: blog?.published || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = blog 
        ? `/api/admin/blog/${blog.id}` 
        : "/api/admin/blog"
      
      const response = await fetch(url, {
        method: blog ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
        }),
      })

      if (response.ok) {
        router.push("/admin/blog")
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.message || "Failed to save blog post")
      }
    } catch (error) {
      console.error("Error saving blog post:", error)
      alert("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!blog) return
    
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/blog/${blog.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.push("/admin/blog")
        router.refresh()
      } else {
        alert("Failed to delete blog post")
      }
    } catch (error) {
      console.error("Error deleting blog post:", error)
      alert("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Post Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-300">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ 
                    ...formData, 
                    title: e.target.value,
                    slug: formData.slug || generateSlug(e.target.value)
                  })
                }}
                placeholder="Enter post title"
                required
                className="glass border-white/10 bg-white/5 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-slate-300">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="post-url-slug"
                required
                className="glass border-white/10 bg-white/5 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-slate-300">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary of the post"
                rows={2}
                className="glass border-white/10 bg-white/5 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-slate-300">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your blog post content here..."
                rows={15}
                required
                className="glass border-white/10 bg-white/5 text-white font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage" className="text-slate-300">Cover Image URL</Label>
              <Input
                id="coverImage"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="glass border-white/10 bg-white/5 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-slate-300">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="web development, react, tutorial"
                className="glass border-white/10 bg-white/5 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle" className="text-slate-300">Meta Title</Label>
              <Input
                id="metaTitle"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                placeholder="SEO title"
                className="glass border-white/10 bg-white/5 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDesc" className="text-slate-300">Meta Description</Label>
              <Textarea
                id="metaDesc"
                value={formData.metaDesc}
                onChange={(e) => setFormData({ ...formData, metaDesc: e.target.value })}
                placeholder="SEO description"
                rows={2}
                className="glass border-white/10 bg-white/5 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Publishing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
              />
              <Label htmlFor="published" className="text-slate-300 flex items-center cursor-pointer">
                {formData.published ? (
                  <><Eye className="w-4 h-4 mr-2" /> Published</>
                ) : (
                  <><EyeOff className="w-4 h-4 mr-2" /> Draft</>
                )}
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
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
            ) : (
              <><Save className="mr-2 h-4 w-4" /> {blog ? "Update Post" : "Create Post"}</>
            )}
          </Button>
          
          {blog && (
            <Button
              type="button"
              variant="outline"
              onClick={handleDelete}
              disabled={isLoading}
              className="border-red-500/20 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          )}
          
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/blog")}
            className="glass-card"
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
