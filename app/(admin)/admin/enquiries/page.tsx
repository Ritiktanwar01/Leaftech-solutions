"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Check, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import AdminHeader from "@/components/admin/header"
import EnquiryDetails from "@/components/admin/enquiry-details"
import type { RootState } from "@/lib/redux/store"
import { fetchEnquiries, updateEnquiryStatus } from "@/lib/redux/slices/enquiriesSlice"

export default function EnquiriesPage() {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { enquiries, loading, error } = useSelector((state: RootState) => state.enquiries)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedEnquiry, setSelectedEnquiry] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchEnquiries() as any)
  }, [dispatch])

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await dispatch(updateEnquiryStatus({ id, status }) as any)
      toast({
        title: "Success",
        description: `Enquiry status updated to ${status}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update enquiry status",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "spam":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading && enquiries.length === 0) {
    return (
      <div className="flex flex-col">
        <AdminHeader title="Enquiries" />
        <div className="p-6">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <AdminHeader title="Enquiries" />
        <div className="p-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-red-500">Error loading enquiries. Please try again.</p>
              <Button onClick={() => dispatch(fetchEnquiries() as any)} className="mt-4">
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
      <AdminHeader title="Enquiries" />

      <div className="p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Enquiries</CardTitle>
            <CardDescription>Manage and respond to customer enquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search enquiries..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="spam">Spam</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedEnquiry ? (
              <EnquiryDetails
                enquiry={enquiries.find((e) => e._id === selectedEnquiry)!}
                onClose={() => setSelectedEnquiry(null)}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEnquiries.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No enquiries found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEnquiries.map((enquiry) => (
                        <TableRow key={enquiry._id}>
                          <TableCell className="font-medium">{enquiry.name}</TableCell>
                          <TableCell>{enquiry.email}</TableCell>
                          <TableCell>{enquiry.subject}</TableCell>
                          <TableCell>{formatDate(enquiry.createdAt)}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                                enquiry.status,
                              )}`}
                            >
                              {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedEnquiry(enquiry._id)}>
                              View
                            </Button>
                            {enquiry.status === "new" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusChange(enquiry._id, "in-progress")}
                              >
                                <Check className="h-4 w-4 text-green-500" />
                              </Button>
                            )}
                            {enquiry.status !== "spam" && (
                              <Button variant="ghost" size="sm" onClick={() => handleStatusChange(enquiry._id, "spam")}>
                                <X className="h-4 w-4 text-red-500" />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
