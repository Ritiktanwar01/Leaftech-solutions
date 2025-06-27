"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import AdminHeader from "@/components/admin/header"
import { Save, Shield, BarChart3, Settings, User, Bell } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  // Analytics Settings
  const [analyticsSettings, setAnalyticsSettings] = useState({
    googleAnalytics: true,
    trackingId: "GA-XXXXXXXXX",
    heatmaps: false,
    userTracking: true,
    dataRetention: "12",
  })

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    cookieConsent: true,
    dataCollection: true,
    thirdPartySharing: false,
    anonymizeIPs: true,
    gdprCompliance: true,
  })

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "LapTech Solutions",
    siteDescription: "Professional web development and tech solutions",
    contactEmail: "contact@laptechsolutions.com",
    timezone: "UTC",
    language: "en",
    maintenanceMode: false,
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newEnquiries: true,
    projectUpdates: true,
    systemAlerts: true,
    weeklyReports: false,
  })

  const handleSaveSettings = async (section: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings Saved",
        description: `${section} settings have been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <AdminHeader title="Settings" />

      <div className="p-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your site's basic configuration and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={generalSettings.timezone}
                      onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={generalSettings.language}
                      onValueChange={(value) => setGeneralSettings({ ...generalSettings, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable maintenance mode to temporarily disable the site
                    </p>
                  </div>
                  <Switch
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, maintenanceMode: checked })}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSaveSettings("General")} disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Settings */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Settings</CardTitle>
                <CardDescription>Configure tracking and analytics for your website.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Google Analytics</Label>
                    <p className="text-sm text-muted-foreground">Enable Google Analytics tracking</p>
                  </div>
                  <Switch
                    checked={analyticsSettings.googleAnalytics}
                    onCheckedChange={(checked) =>
                      setAnalyticsSettings({ ...analyticsSettings, googleAnalytics: checked })
                    }
                  />
                </div>

                {analyticsSettings.googleAnalytics && (
                  <div className="space-y-2">
                    <Label htmlFor="trackingId">Google Analytics Tracking ID</Label>
                    <Input
                      id="trackingId"
                      value={analyticsSettings.trackingId}
                      onChange={(e) => setAnalyticsSettings({ ...analyticsSettings, trackingId: e.target.value })}
                      placeholder="GA-XXXXXXXXX"
                    />
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Heatmap Tracking</Label>
                    <p className="text-sm text-muted-foreground">Enable heatmap and user behavior tracking</p>
                  </div>
                  <Switch
                    checked={analyticsSettings.heatmaps}
                    onCheckedChange={(checked) => setAnalyticsSettings({ ...analyticsSettings, heatmaps: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>User Tracking</Label>
                    <p className="text-sm text-muted-foreground">Track individual user sessions and interactions</p>
                  </div>
                  <Switch
                    checked={analyticsSettings.userTracking}
                    onCheckedChange={(checked) => setAnalyticsSettings({ ...analyticsSettings, userTracking: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention (months)</Label>
                  <Select
                    value={analyticsSettings.dataRetention}
                    onValueChange={(value) => setAnalyticsSettings({ ...analyticsSettings, dataRetention: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSaveSettings("Analytics")} disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Manage privacy and data protection settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cookie Consent</Label>
                    <p className="text-sm text-muted-foreground">Show cookie consent banner to visitors</p>
                  </div>
                  <Switch
                    checked={privacySettings.cookieConsent}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, cookieConsent: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Collection</Label>
                    <p className="text-sm text-muted-foreground">Allow collection of user data for analytics</p>
                  </div>
                  <Switch
                    checked={privacySettings.dataCollection}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, dataCollection: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Third-party Sharing</Label>
                    <p className="text-sm text-muted-foreground">Share data with third-party services</p>
                  </div>
                  <Switch
                    checked={privacySettings.thirdPartySharing}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({ ...privacySettings, thirdPartySharing: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Anonymize IP Addresses</Label>
                    <p className="text-sm text-muted-foreground">Anonymize visitor IP addresses in analytics</p>
                  </div>
                  <Switch
                    checked={privacySettings.anonymizeIPs}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, anonymizeIPs: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>GDPR Compliance</Label>
                    <p className="text-sm text-muted-foreground">Enable GDPR compliance features</p>
                  </div>
                  <Switch
                    checked={privacySettings.gdprCompliance}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, gdprCompliance: checked })}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSaveSettings("Privacy")} disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how and when you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Enquiries</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new enquiries are received</p>
                  </div>
                  <Switch
                    checked={notificationSettings.newEnquiries}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, newEnquiries: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Project Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about project changes</p>
                  </div>
                  <Switch
                    checked={notificationSettings.projectUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, projectUpdates: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about system issues and updates</p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, systemAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly analytics and performance reports</p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                    }
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSaveSettings("Notifications")} disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account information and security settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Admin" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="User" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="admin@laptechsolutions.com" />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Update Password</Button>
                  <Button onClick={() => handleSaveSettings("Account")} disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
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
