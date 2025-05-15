"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BarChart, MessageSquare, Package, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminHeader from "@/components/admin/header"
import VisitorChart from "@/components/admin/visitor-chart"
import RequestsChart from "@/components/admin/requests-chart"
import type { RootState } from "@/lib/redux/store"
import { fetchDashboardStats } from "@/lib/redux/slices/dashboardSlice"

export default function DashboardPage() {
  const dispatch = useDispatch()
  const { stats, loading } = useSelector((state: RootState) => state.dashboard)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    dispatch(fetchDashboardStats() as any)
  }, [dispatch])

  return (
    <div className="flex flex-col">
      <AdminHeader title="Dashboard" />
      <div className="p-6">
        <Tabs defaultValue="overview" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.visitors.total}</div>
                    <p className="text-xs text-muted-foreground">{stats.visitors.change} from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Enquiries</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.enquiries.total}</div>
                    <p className="text-xs text-muted-foreground">{stats.enquiries.change} from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Projects</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.projects.total}</div>
                    <p className="text-xs text-muted-foreground">{stats.projects.change} from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.conversionRate.rate}%</div>
                    <p className="text-xs text-muted-foreground">{stats.conversionRate.change} from last month</p>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Visitor Traffic</CardTitle>
                  <CardDescription>Daily website visitors over the past 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <VisitorChart data={stats.visitorData} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Enquiry Types</CardTitle>
                  <CardDescription>Distribution of enquiries by service type</CardDescription>
                </CardHeader>
                <CardContent>
                  <RequestsChart data={stats.enquiryTypes} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>In-depth analysis of website performance and user behavior</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Detailed analytics will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
