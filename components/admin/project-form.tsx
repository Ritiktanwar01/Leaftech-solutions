"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProjectFormProps {
  project: {
    title: string
    category: string
    description: string
    detailedDescription?: string
    image: string
    images?: string[]
    technologies?: string[]
    projectUrl?: string
    clientName?: string
    status?: string
    featured?: boolean
  }
  onChange: (field: string, value: any) => void
  onSave: () => void
  onCancel: () => void
}

export default function ProjectForm({ project, onChange, onSave, onCancel }: ProjectFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          value={project.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="E-Commerce Platform"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={project.category}
          onChange={(e) => onChange("category", e.target.value)}
          placeholder="Web Development"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={project.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="A fully-featured e-commerce platform..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="detailedDescription">Detailed Description</Label>
        <Textarea
          id="detailedDescription"
          value={project.detailedDescription || ""}
          onChange={(e) => onChange("detailedDescription", e.target.value)}
          placeholder="Provide a detailed description of the project..."
          rows={6}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Additional Images (comma-separated URLs)</Label>
        <Textarea
          id="images"
          value={project.images?.join(", ") || ""}
          onChange={(e) =>
            onChange(
              "images",
              e.target.value
                .split(",")
                .map((url) => url.trim())
                .filter((url) => url),
            )
          }
          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="technologies">Technologies Used (comma-separated)</Label>
        <Input
          id="technologies"
          value={project.technologies?.join(", ") || ""}
          onChange={(e) =>
            onChange(
              "technologies",
              e.target.value
                .split(",")
                .map((tech) => tech.trim())
                .filter((tech) => tech),
            )
          }
          placeholder="React, Node.js, MongoDB, Tailwind CSS"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="projectUrl">Project URL</Label>
          <Input
            id="projectUrl"
            value={project.projectUrl || ""}
            onChange={(e) => onChange("projectUrl", e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            value={project.clientName || ""}
            onChange={(e) => onChange("clientName", e.target.value)}
            placeholder="Client or Company Name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Project Status</Label>
        <Select value={project.status || "completed"} onValueChange={(value) => onChange("status", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={project.image}
          onChange={(e) => onChange("image", e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="featured" checked={project.featured} onCheckedChange={(checked) => onChange("featured", checked)} />
        <Label htmlFor="featured">Featured Project</Label>
      </div>

      {project.image && (
        <div className="mt-4">
          <Label>Image Preview</Label>
          <div className="mt-2 border rounded-md overflow-hidden h-48">
            <img src={project.image || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave} className="bg-black hover:bg-gray-800">
          Save
        </Button>
      </div>
    </div>
  )
}
