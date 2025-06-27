"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock, Share2, ArrowLeft, Building, Target, Lightbulb, TrendingUp, Quote } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

/**
 * @typedef {Object} CaseStudyDetail
 * @property {string} _id
 * @property {string} title
 * @property {string} client
 * @property {string} industry
 * @property {string} overview
 * @property {string} challenge
 * @property {string} solution
 * @property {string} results
 * @property {string=} testimonial
 * @property {string=} testimonialAuthor
 * @property {string=} testimonialRole
 * @property {string[]} images
 * @property {string[]} technologies
 * @property {string} timeline
 * @property {number} teamSize
 * @property {{label: string, value: string, description?: string}[]} metrics
 * @property {boolean} featured
 * @property {string} status
 * @property {string} createdAt
 */

export default function CaseStudyDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const [caseStudy, setCaseStudy] = useState<CaseStudyDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/case-studies/${params.id}`)
        if (!response.ok) {
          throw new Error("Case study not found")
        }
        const data = await response.json()
        setCaseStudy(data)
      } catch (error) {
        console.error("Error fetching case study:", error)
        toast({
          title: "Error",
          description: "Failed to load case study details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCaseStudy()
    }
  }, [params.id, toast])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: caseStudy?.title,
          text: caseStudy?.overview,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Case study link has been copied to clipboard",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-96 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
            <p className="text-gray-600 mb-8">The case study you're looking for doesn't exist.</p>
            <Link href="/case-studies">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case Studies
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
          <Link href="/case-studies">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Button>
          </Link>
          <Button onClick={handleShare} variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {caseStudy.featured && <Badge className="bg-black text-white">Featured</Badge>}
                <Badge variant="outline">{caseStudy.industry}</Badge>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{caseStudy.title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{caseStudy.overview}</p>
            </div>

            {/* Image Gallery */}
            {caseStudy.images && caseStudy.images.length > 0 && (
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img
                      src={caseStudy.images[selectedImage] || "/placeholder.svg?height=400&width=800"}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {caseStudy.images.length > 1 && (
                    <div className="p-4">
                      <div className="grid grid-cols-4 gap-2">
                        {caseStudy.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`aspect-video overflow-hidden rounded border-2 transition-colors ${
                              selectedImage === index ? "border-black" : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <img
                              src={image || "/placeholder.svg?height=100&width=150"}
                              alt={`${caseStudy.title} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Challenge */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">The Challenge</h2>
                </div>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{caseStudy.challenge}</p>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Our Solution</h2>
                </div>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{caseStudy.solution}</p>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Results & Impact</h2>
                </div>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{caseStudy.results}</p>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Metrics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {caseStudy.metrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold text-black mb-2">{metric.value}</div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">{metric.label}</div>
                        {metric.description && <div className="text-xs text-gray-600">{metric.description}</div>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Testimonial */}
            {caseStudy.testimonial && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Quote className="h-5 w-5 text-blue-500" />
                    <h2 className="text-2xl font-bold text-gray-900">Client Testimonial</h2>
                  </div>
                  <blockquote className="text-lg text-gray-600 italic mb-4 leading-relaxed">
                    "{caseStudy.testimonial}"
                  </blockquote>
                  {(caseStudy.testimonialAuthor || caseStudy.testimonialRole) && (
                    <div className="text-sm text-gray-500">
                      <strong>{caseStudy.testimonialAuthor}</strong>
                      {caseStudy.testimonialRole && <span>, {caseStudy.testimonialRole}</span>}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{caseStudy.client}</div>
                      <div className="text-xs text-gray-500">Client</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{caseStudy.timeline}</div>
                      <div className="text-xs text-gray-500">Timeline</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{caseStudy.teamSize} people</div>
                      <div className="text-xs text-gray-500">Team Size</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(caseStudy.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">Published</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technologies */}
            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Start Your Project?</h3>
                <p className="text-sm text-gray-600 mb-4">Let's discuss how we can help you achieve similar results.</p>
                <Button asChild className="w-full">
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
