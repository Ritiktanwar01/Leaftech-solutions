"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, ExternalLink, User, Tag, Globe, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface ProjectDetail {
  _id: string
  title: string
  category: string
  description: string
  detailedDescription: string
  images: string[]
  technologies: string[]
  projectUrl?: string
  clientName?: string
  status: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function ProjectDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.id}`)
        if (!response.ok) {
          throw new Error("Project not found")
        }
        const data = await response.json()
        setProject(data)
      } catch (error) {
        console.error("Error fetching project:", error)
        toast({
          title: "Error",
          description: "Failed to load project details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProject()
    }
  }, [params.id, toast])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.title,
          text: project?.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Project link has been copied to clipboard",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
            <Link href="/projects">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/projects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
          <Button onClick={handleShare} variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={
                      project.images?.[selectedImage] || project.images?.[0] || "/placeholder.svg?height=400&width=600"
                    }
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {project.images && project.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-video overflow-hidden rounded border-2 transition-colors ${
                      selectedImage === index ? "border-black" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg?height=100&width=150"}
                      alt={`${project.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                {project.featured && <Badge variant="secondary">Featured</Badge>}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  {project.category}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
                {project.clientName && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {project.clientName}
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-lg">{project.description}</p>
            </div>

            <Separator />

            {/* Detailed Description */}
            {project.detailedDescription && (
              <div>
                <h2 className="text-xl font-semibold mb-3">About This Project</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{project.detailedDescription}</p>
              </div>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Project Status */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Project Status</h2>
              <Badge
                variant={
                  project.status === "completed"
                    ? "default"
                    : project.status === "in-progress"
                      ? "secondary"
                      : "outline"
                }
              >
                {project.status?.charAt(0).toUpperCase() + project.status?.slice(1) || "Unknown"}
              </Badge>
            </div>

            {/* Project URL */}
            {project.projectUrl && (
              <div>
                <Button asChild className="w-full">
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2 h-4 w-4" />
                    View Live Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* This would be populated with related projects */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={`/placeholder.svg?height=200&width=300`}
                      alt="Related Project"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Related Project {i}</h3>
                    <p className="text-sm text-gray-600">Project description...</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
