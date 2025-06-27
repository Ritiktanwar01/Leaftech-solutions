"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import AdminHeader from "@/components/admin/header"
import ProjectForm from "@/components/admin/project-form"
import type { RootState } from "@/lib/redux/store"
import { fetchProjects, updateProject, createProject, deleteProject } from "@/lib/redux/slices/projectsSlice"
import Link from "next/link"

export default function ProjectsPage() {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { projects, loading, error } = useSelector((state: RootState) => state.projects)
  const [editingProject, setEditingProject] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    category: "",
    description: "",
    detailedDescription: "",
    image: "",
    images: [],
    technologies: [],
    projectUrl: "",
    clientName: "",
    status: "completed",
    featured: false,
  })

  useEffect(() => {
    dispatch(fetchProjects() as any)
  }, [dispatch])

  const handleEditProject = (index: number) => {
    setEditingProject(index)
    setIsCreating(false)
  }

  const handleUpdateProject = async (index: number, updatedProject: any) => {
    try {
      await dispatch(updateProject({ id: projects[index]._id, project: updatedProject }) as any)
      setEditingProject(null)
      toast({
        title: "Success",
        description: "Project has been updated",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      })
    }
  }

  const handleCreateProject = async () => {
    try {
      await dispatch(createProject(newProject) as any)
      setIsCreating(false)
      setNewProject({
        title: "",
        category: "",
        description: "",
        detailedDescription: "",
        image: "",
        images: [],
        technologies: [],
        projectUrl: "",
        clientName: "",
        status: "completed",
        featured: false,
      })
      toast({
        title: "Success",
        description: "New project has been created",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await dispatch(deleteProject(id) as any)
        toast({
          title: "Success",
          description: "Project has been deleted",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete project",
          variant: "destructive",
        })
      }
    }
  }

  if (loading && projects.length === 0) {
    return (
      <div className="flex flex-col">
        <AdminHeader title="Projects" />
        <div className="p-6">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <AdminHeader title="Projects" />
        <div className="p-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-red-500">Error loading projects. Please try again.</p>
              <Button onClick={() => dispatch(fetchProjects() as any)} className="mt-4">
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
      <AdminHeader title="Projects">
        <Button
          onClick={() => {
            setIsCreating(true)
            setEditingProject(null)
          }}
          className="bg-black hover:bg-gray-800"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </AdminHeader>

      <div className="p-6">
        {isCreating ? (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Project</CardTitle>
              <CardDescription>Add a new project to your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectForm
                project={newProject}
                onChange={(field, value) => setNewProject({ ...newProject, [field]: value })}
                onSave={handleCreateProject}
                onCancel={() => setIsCreating(false)}
              />
            </CardContent>
          </Card>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card key={project._id}>
              {editingProject === index ? (
                <CardContent className="pt-6">
                  <ProjectForm
                    project={project}
                    onChange={(field, value) => {
                      const updatedProject = { ...project, [field]: value }
                      dispatch(updateProject({ id: project._id, project: updatedProject, index }) as any)
                    }}
                    onSave={() => handleUpdateProject(index, project)}
                    onCancel={() => setEditingProject(null)}
                  />
                </CardContent>
              ) : (
                <>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg?height=400&width=600"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {project.featured && (
                      <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.category}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">{project.description}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditProject(index)}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${project._id}`} target="_blank">
                          View
                        </Link>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project._id)}>
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
