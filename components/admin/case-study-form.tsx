"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface CaseStudyFormProps {
  caseStudy: {
    title: string
    client: string
    industry: string
    overview: string
    challenge: string
    solution: string
    results: string
    testimonial?: string
    testimonialAuthor?: string
    testimonialRole?: string
    images: string[]
    technologies: string[]
    timeline: string
    teamSize: number
    metrics: {
      label: string
      value: string
      description?: string
    }[]
    featured?: boolean
    status?: string
  }
  onChange: (field: string, value: any) => void
  onSave: () => void
  onCancel: () => void
}

export default function CaseStudyForm({ caseStudy, onChange, onSave, onCancel }: CaseStudyFormProps) {
  const addMetric = () => {
    const newMetrics = [...(caseStudy.metrics || []), { label: "", value: "", description: "" }]
    onChange("metrics", newMetrics)
  }

  const removeMetric = (index: number) => {
    const newMetrics = caseStudy.metrics?.filter((_, i) => i !== index) || []
    onChange("metrics", newMetrics)
  }

  const updateMetric = (index: number, field: string, value: string) => {
    const newMetrics = [...(caseStudy.metrics || [])]
    newMetrics[index] = { ...newMetrics[index], [field]: value }
    onChange("metrics", newMetrics)
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Case Study Title</Label>
              <Input
                id="title"
                value={caseStudy.title}
                onChange={(e) => onChange("title", e.target.value)}
                placeholder="E-Commerce Platform Redesign"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client Name</Label>
              <Input
                id="client"
                value={caseStudy.client}
                onChange={(e) => onChange("client", e.target.value)}
                placeholder="TechCorp Inc."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={caseStudy.industry}
                onChange={(e) => onChange("industry", e.target.value)}
                placeholder="E-commerce"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Input
                id="timeline"
                value={caseStudy.timeline}
                onChange={(e) => onChange("timeline", e.target.value)}
                placeholder="3 months"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input
                id="teamSize"
                type="number"
                value={caseStudy.teamSize}
                onChange={(e) => onChange("teamSize", Number.parseInt(e.target.value) || 0)}
                placeholder="5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Project Overview</Label>
            <Textarea
              id="overview"
              value={caseStudy.overview}
              onChange={(e) => onChange("overview", e.target.value)}
              placeholder="Brief overview of the project..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="challenge">Challenge</Label>
            <Textarea
              id="challenge"
              value={caseStudy.challenge}
              onChange={(e) => onChange("challenge", e.target.value)}
              placeholder="What challenges did the client face?"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solution">Solution</Label>
            <Textarea
              id="solution"
              value={caseStudy.solution}
              onChange={(e) => onChange("solution", e.target.value)}
              placeholder="How did you solve the problem?"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="results">Results</Label>
            <Textarea
              id="results"
              value={caseStudy.results}
              onChange={(e) => onChange("results", e.target.value)}
              placeholder="What were the outcomes and results?"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Testimonial */}
      <Card>
        <CardHeader>
          <CardTitle>Client Testimonial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="testimonial">Testimonial</Label>
            <Textarea
              id="testimonial"
              value={caseStudy.testimonial || ""}
              onChange={(e) => onChange("testimonial", e.target.value)}
              placeholder="Client's feedback about the project..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="testimonialAuthor">Author Name</Label>
              <Input
                id="testimonialAuthor"
                value={caseStudy.testimonialAuthor || ""}
                onChange={(e) => onChange("testimonialAuthor", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonialRole">Author Role</Label>
              <Input
                id="testimonialRole"
                value={caseStudy.testimonialRole || ""}
                onChange={(e) => onChange("testimonialRole", e.target.value)}
                placeholder="CEO, TechCorp Inc."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Key Metrics
            <Button type="button" onClick={addMetric} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Metric
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {caseStudy.metrics?.map((metric, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Metric Label</Label>
                <Input
                  value={metric.label}
                  onChange={(e) => updateMetric(index, "label", e.target.value)}
                  placeholder="Conversion Rate"
                />
              </div>
              <div className="space-y-2">
                <Label>Value</Label>
                <Input
                  value={metric.value}
                  onChange={(e) => updateMetric(index, "value", e.target.value)}
                  placeholder="25%"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={metric.description || ""}
                  onChange={(e) => updateMetric(index, "description", e.target.value)}
                  placeholder="Increase from baseline"
                />
              </div>
              <div className="flex items-end">
                <Button type="button" variant="destructive" size="sm" onClick={() => removeMetric(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Media & Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle>Media & Technical Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="images">Images (comma-separated URLs)</Label>
            <Textarea
              id="images"
              value={caseStudy.images?.join(", ") || ""}
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
              value={caseStudy.technologies?.join(", ") || ""}
              onChange={(e) =>
                onChange(
                  "technologies",
                  e.target.value
                    .split(",")
                    .map((tech) => tech.trim())
                    .filter((tech) => tech),
                )
              }
              placeholder="React, Node.js, MongoDB, AWS"
            />
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={caseStudy.status || "published"} onValueChange={(value) => onChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={caseStudy.featured}
              onCheckedChange={(checked) => onChange("featured", checked)}
            />
            <Label htmlFor="featured">Featured Case Study</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave} className="bg-black hover:bg-gray-800">
          Save Case Study
        </Button>
      </div>
    </div>
  )
}
