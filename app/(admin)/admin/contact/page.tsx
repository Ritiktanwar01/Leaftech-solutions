"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import AdminHeader from "@/components/admin/header"
import SocialLinkForm from "@/components/admin/social-link-form"
import type { RootState } from "@/lib/redux/store"
import { fetchContactInfo, updateContactInfo } from "@/lib/redux/slices/contactSlice"

export default function ContactPage() {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { contactInfo, loading, error } = useSelector((state: RootState) => state.contact)
  const [formData, setFormData] = useState({
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    phone: {
      main: "",
      support: "",
    },
    email: {
      general: "",
      support: "",
      careers: "",
    },
    hours: "",
    mapEmbed: "",
    socialLinks: [] as { platform: string; url: string }[],
  })

  useEffect(() => {
    dispatch(fetchContactInfo() as any)
  }, [dispatch])

  useEffect(() => {
    if (contactInfo) {
      setFormData(contactInfo)
    }
  }, [contactInfo])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Handle nested objects
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...((prev[parent as keyof typeof prev] || {}) as object),
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedLinks = [...prev.socialLinks]
      updatedLinks[index] = { ...updatedLinks[index], [field]: value }
      return { ...prev, socialLinks: updatedLinks }
    })
  }

  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "", url: "" }],
    }))
  }

  const removeSocialLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    try {
      await dispatch(updateContactInfo(formData) as any)
      toast({
        title: "Success",
        description: "Contact information has been updated",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update contact information",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col">
        <AdminHeader title="Contact Information" />
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
        <AdminHeader title="Contact Information" />
        <div className="p-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-red-500">Error loading contact information. Please try again.</p>
              <Button onClick={() => dispatch(fetchContactInfo() as any)} className="mt-4">
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
      <AdminHeader title="Contact Information">
        <Button onClick={handleSubmit} className="bg-black hover:bg-gray-800">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </AdminHeader>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>Edit your company's address details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address.street">Street</Label>
                <Input
                  id="address.street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  placeholder="123 Tech Street"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address.city">City</Label>
                  <Input
                    id="address.city"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    placeholder="Innovation City"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address.state">State/Province</Label>
                  <Input
                    id="address.state"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    placeholder="TC"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address.zip">ZIP/Postal Code</Label>
                  <Input
                    id="address.zip"
                    name="address.zip"
                    value={formData.address.zip}
                    onChange={handleInputChange}
                    placeholder="12345"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address.country">Country</Label>
                  <Input
                    id="address.country"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleInputChange}
                    placeholder="United States"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>Edit your company's contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone.main">Main Phone</Label>
                <Input
                  id="phone.main"
                  name="phone.main"
                  value={formData.phone.main}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone.support">Support Phone</Label>
                <Input
                  id="phone.support"
                  name="phone.support"
                  value={formData.phone.support}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 987-6543"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email.general">General Email</Label>
                <Input
                  id="email.general"
                  name="email.general"
                  value={formData.email.general}
                  onChange={handleInputChange}
                  placeholder="info@techsolutions.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email.support">Support Email</Label>
                <Input
                  id="email.support"
                  name="email.support"
                  value={formData.email.support}
                  onChange={handleInputChange}
                  placeholder="support@techsolutions.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email.careers">Careers Email</Label>
                <Input
                  id="email.careers"
                  name="email.careers"
                  value={formData.email.careers}
                  onChange={handleInputChange}
                  placeholder="careers@techsolutions.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Business Hours</Label>
                <Input
                  id="hours"
                  name="hours"
                  value={formData.hours}
                  onChange={handleInputChange}
                  placeholder="Monday-Friday, 9am-6pm EST"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Map Embed</CardTitle>
            <CardDescription>Add a Google Maps embed code for your location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="mapEmbed">Map Embed Code</Label>
              <Textarea
                id="mapEmbed"
                name="mapEmbed"
                value={formData.mapEmbed}
                onChange={handleInputChange}
                placeholder="<iframe src='https://www.google.com/maps/embed?...'></iframe>"
                rows={4}
              />
            </div>

            {formData.mapEmbed && (
              <div className="mt-4">
                <Label>Preview</Label>
                <div className="mt-2 border rounded-md p-2 h-64">
                  <div dangerouslySetInnerHTML={{ __html: formData.mapEmbed }} className="w-full h-full" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>Manage your social media profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.socialLinks.map((link, index) => (
                <SocialLinkForm
                  key={index}
                  link={link}
                  index={index}
                  onChange={handleSocialLinkChange}
                  onRemove={removeSocialLink}
                />
              ))}

              <Button type="button" variant="outline" className="w-full mt-4" onClick={addSocialLink}>
                Add Social Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
