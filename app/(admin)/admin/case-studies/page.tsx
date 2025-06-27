"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import AdminHeader from "@/components/admin/header"
import CaseStudyForm from "@/components/admin/case-study-form"
import type { RootState } from "@/lib/redux/store"
import {
  fetchCaseStudies,
  updateCaseStudy,
  createCaseStudy,
  deleteCaseStudy,
} from "@/lib/redux/slices/caseStudiesSlice"
import Link from "next/link"

export default function AdminCaseStudiesPage() {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { caseStudies, loading, error } = useSelector((state: RootState) => state.caseStudies)
  const [editingCaseStudy, setEditingCaseStudy] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newCaseStudy, setNewCaseStudy] = useState({
    title: "",
    client: "",
    industry: "",
    overview: "",
    challenge: "",
    solution: "",
    results: "",
    testimonial: "",
    testimonialAuthor: "",
    testimonialRole: "",
    images: [],
    technologies: [],
    timeline: "",
    teamSize: 0,
    metrics: [],
    featured: false,
    status: "published",
  })

  useEffect(() => {
    dispatch(fetchCaseStudies() as any)
  }, [dispatch])

  const handleEditCaseStudy = (index: number) => {
    setEditingCaseStudy(index)
    setIsCreating(false)
  }

  const handleUpdateCaseStudy = async (index: number, updatedCaseStudy: any) => {
    try {
      await dispatch(updateCaseStudy({ id: caseStudies[index]._id, caseStudy: updatedCaseStudy }) as any)
      setEditingCaseStudy(null)
      toast({
        title: "Success",
        description: "Case study has been updated",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update case study",
        variant: "destructive",
      })
    }
  }

  const handleCreateCaseStudy = async () => {
    try {
      await dispatch(createCaseStudy(newCaseStudy) as any)
      setIsCreating(false)
      setNewCaseStudy({
        title: "",
        client: "",
        industry: "",
        overview: "",
        challenge: "",
        solution: "",
        results: "",
        testimonial: "",
        testimonialAuthor: "",
        testimonialRole: "",
        images: [],
        technologies: [],
        timeline: "",
        teamSize: 0,
        metrics: [],
        featured: false,
        status: "published",
      })
      toast({
        title: "Success",
        description: "New case study has been created",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create case study",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCaseStudy = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this case study?")) {
      try {
        await dispatch(deleteCaseStudy(id) as any)
        toast({
          title: "Success",
          description: "Case study has been deleted",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete case study",
          variant: "destructive",
        })
      }
    }
  }

  if (loading && caseStudies.length === 0) {
    return (
      <div className="flex flex-col">
        <AdminHeader title="Case Studies" />
        <div className="p-6">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <AdminHeader title="Case Studies" />
        <div className="p-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-red-500">Error loading case studies. Please try again.</p>
              <Button onClick={() => dispatch(fetchCaseStudies() as any)} className="mt-4">
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <AdminHeader title="Case Studies">
        <Button
          onClick={() => {
            setIsCreating(true)
            setEditingCaseStudy(null)
          }}
          className="bg-black hover:bg-gray-800"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Case Study
        </Button>
      </AdminHeader>

      <div className="p-6">
        {isCreating ? (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Case Study</CardTitle>
              <CardDescription>Add a detailed case study to showcase your work</CardDescription>
            </CardHeader>
            <CardContent>
              <CaseStudyForm
                caseStudy={newCaseStudy}
                onChange={(field, value) => setNewCaseStudy({ ...newCaseStudy, [field]: value })}
                onSave={handleCreateCaseStudy}
                onCancel={() => setIsCreating(false)}
              />
            </CardContent>
          </Card>
        ) : null}

        {editingCaseStudy !== null ? (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Edit Case Study</CardTitle>
              <CardDescription>Update the case study details</CardDescription>
            </CardHeader>
            <CardContent>
              <CaseStudyForm
                caseStudy={caseStudies[editingCaseStudy]}
                onChange={(field, value) => {
                  const updatedCaseStudy = { ...caseStudies[editingCaseStudy], [field]: value }
                  dispatch(
                    updateCaseStudy({
                      id: caseStudies[editingCaseStudy]._id,
                      caseStudy: updatedCaseStudy,
                      index: editingCaseStudy,
                    }) as any,
                  )
                }}
                onSave={() => handleUpdateCaseStudy(editingCaseStudy, caseStudies[editingCaseStudy])}
                onCancel={() => setEditingCaseStudy(null)}
              />
            </CardContent>
          </Card>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((caseStudy, index) => (
            <Card key={caseStudy._id} className="group hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={caseStudy.images?.[0] || "/placeholder.svg?height=400&width=600"}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {caseStudy.featured && <Badge className="bg-black text-white">Featured</Badge>}
                  <Badge
                    variant={
                      caseStudy.status === "published"
                        ? "default"
                        : caseStudy.status === "draft"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {caseStudy.status}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{caseStudy.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center justify-between text-sm">
                    <span>{caseStudy.client}</span>
                    <span>{caseStudy.industry}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{caseStudy.overview}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Timeline: {caseStudy.timeline}</span>
                  <span>Team: {caseStudy.teamSize} people</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/case-studies/${caseStudy._id}`} target="_blank">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditCaseStudy(index)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteCaseStudy(caseStudy._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {caseStudies.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No case studies yet</h3>
            <p className="text-gray-600 mb-4">Create your first case study to showcase your work</p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Case Study
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
