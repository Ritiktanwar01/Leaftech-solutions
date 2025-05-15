"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import AdminHeader from "@/components/admin/header"
import TeamMemberForm from "@/components/admin/team-member-form"
import ValueCard from "@/components/admin/value-card"
import type { RootState } from "@/lib/redux/store"
import { fetchAboutContent, updateAboutContent } from "@/lib/redux/slices/aboutSlice"

export default function AboutPage() {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { content, loading, error } = useSelector((state: RootState) => state.about)
  const [activeTab, setActiveTab] = useState("company")
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    story: "",
    mission: "",
    vision: "",
    values: [],
    team: [],
  })

  useEffect(() => {
    dispatch(fetchAboutContent() as any)
  }, [dispatch])

  useEffect(() => {
    if (content) {
      setFormData(content)
    }
  }, [content])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleValueChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedValues = [...prev.values]
      updatedValues[index] = { ...updatedValues[index], [field]: value }
      return { ...prev, values: updatedValues }
    })
  }

  const handleTeamMemberChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedTeam = [...prev.team]
      updatedTeam[index] = { ...updatedTeam[index], [field]: value }
      return { ...prev, team: updatedTeam }
    })
  }

  const addTeamMember = () => {
    setFormData((prev) => ({
      ...prev,
      team: [...prev.team, { name: "", position: "", bio: "", image: "" }],
    }))
  }

  const removeTeamMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index),
    }))
  }

  const addValue = () => {
    setFormData((prev) => ({
      ...prev,
      values: [...prev.values, { title: "", description: "", icon: "" }],
    }))
  }

  const removeValue = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    try {
      await dispatch(updateAboutContent(formData) as any)
      toast({
        title: "Success",
        description: "About page content has been updated",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update about page content",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col">
        <AdminHeader title="About Page" />
        <div className="p-6">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="h-32 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <AdminHeader title="About Page" />
        <div className="p-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-red-500">Error loading about page content. Please try again.</p>
              <Button onClick={() => dispatch(fetchAboutContent() as any)} className="mt-4">
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
      <AdminHeader title="About Page">
        <Button onClick={handleSubmit} className="bg-black hover:bg-gray-800">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </AdminHeader>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="company">Company Info</TabsTrigger>
            <TabsTrigger value="values">Values</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Edit the main information about your company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="About TechSolutions"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    placeholder="We're a team of passionate technologists..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story">Our Story</Label>
                  <Textarea
                    id="story"
                    name="story"
                    value={formData.story}
                    onChange={handleInputChange}
                    placeholder="Founded in 2013, TechSolutions began with a simple mission..."
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mission">Our Mission</Label>
                  <Textarea
                    id="mission"
                    name="mission"
                    value={formData.mission}
                    onChange={handleInputChange}
                    placeholder="Our mission is to help businesses leverage technology..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vision">Our Vision</Label>
                  <Textarea
                    id="vision"
                    name="vision"
                    value={formData.vision}
                    onChange={handleInputChange}
                    placeholder="We envision a world where technology empowers every business..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="values" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Values</CardTitle>
                <CardDescription>Edit your company's core values</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.values.map((value, index) => (
                    <ValueCard
                      key={index}
                      value={value}
                      index={index}
                      onChange={handleValueChange}
                      onRemove={removeValue}
                    />
                  ))}

                  <Button type="button" variant="outline" className="w-full mt-4" onClick={addValue}>
                    Add Value
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Edit your team information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {formData.team.map((member, index) => (
                    <TeamMemberForm
                      key={index}
                      member={member}
                      index={index}
                      onChange={handleTeamMemberChange}
                      onRemove={removeTeamMember}
                    />
                  ))}

                  <Button type="button" variant="outline" className="w-full mt-4" onClick={addTeamMember}>
                    Add Team Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
