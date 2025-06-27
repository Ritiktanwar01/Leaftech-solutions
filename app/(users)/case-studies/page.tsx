"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Users, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface CaseStudy {
  _id: string
  title: string
  client: string
  industry: string
  overview: string
  images: string[]
  timeline: string
  teamSize: number
  featured: boolean
  status: string
  createdAt: string
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>([])

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/case-studies`)
        if (response.ok) {
          const data = await response.json()
          setCaseStudies(data.filter((cs: CaseStudy) => cs.status === "published"))
        }
      } catch (error) {
        console.error("Error fetching case studies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCaseStudies()
  }, [])

  useEffect(() => {
    let filtered = caseStudies

    if (searchTerm) {
      filtered = filtered.filter(
        (cs) =>
          cs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cs.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cs.overview.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedIndustry !== "all") {
      filtered = filtered.filter((cs) => cs.industry.toLowerCase() === selectedIndustry.toLowerCase())
    }

    setFilteredCaseStudies(filtered)
  }, [caseStudies, searchTerm, selectedIndustry])

  const industries = Array.from(new Set(caseStudies.map((cs) => cs.industry)))
  const featuredCaseStudies = filteredCaseStudies.filter((cs) => cs.featured)
  const regularCaseStudies = filteredCaseStudies.filter((cs) => !cs.featured)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Case Studies</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our detailed case studies showcasing real-world solutions, challenges overcome, and measurable
            results achieved for our clients.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search case studies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry.toLowerCase()}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured Case Studies */}
        {featuredCaseStudies.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Case Studies</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCaseStudies.map((caseStudy) => (
                <Card key={caseStudy._id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={caseStudy.images?.[0] || "/placeholder.svg?height=400&width=600"}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black text-white">Featured</Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-2">{caseStudy.title}</h3>
                      <p className="text-sm opacity-90">
                        {caseStudy.client} • {caseStudy.industry}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-3">{caseStudy.overview}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {caseStudy.timeline}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {caseStudy.teamSize} people
                        </div>
                      </div>
                    </div>
                    <Button asChild className="w-full group">
                      <Link href={`/case-studies/${caseStudy._id}`}>
                        Read Case Study
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Case Studies */}
        {regularCaseStudies.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {featuredCaseStudies.length > 0 ? "More Case Studies" : "Case Studies"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularCaseStudies.map((caseStudy) => (
                <Card key={caseStudy._id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={caseStudy.images?.[0] || "/placeholder.svg?height=300&width=400"}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{caseStudy.title}</h3>
                      <p className="text-sm text-gray-600">
                        {caseStudy.client} • {caseStudy.industry}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{caseStudy.overview}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {caseStudy.timeline}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {caseStudy.teamSize} people
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(caseStudy.createdAt).getFullYear()}
                      </div>
                    </div>
                    <Button variant="outline" asChild className="w-full group bg-transparent">
                      <Link href={`/case-studies/${caseStudy._id}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredCaseStudies.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No case studies found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedIndustry !== "all"
                ? "Try adjusting your search criteria"
                : "We're working on adding case studies. Check back soon!"}
            </p>
            {(searchTerm || selectedIndustry !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedIndustry("all")
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
