"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface EnquiryDetailsProps {
  enquiry: {
    _id: string
    name: string
    email: string
    subject: string
    message: string
    service: string
    status: string
    createdAt: string
    notes?: string
  }
  onClose: () => void
  onStatusChange: (id: string, status: string) => void
}

export default function EnquiryDetails({ enquiry, onClose, onStatusChange }: EnquiryDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card>
      <CardHeader className="relative">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
        <CardTitle>Enquiry Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-gray-500">Name</Label>
            <p className="font-medium">{enquiry.name}</p>
          </div>
          <div>
            <Label className="text-sm text-gray-500">Email</Label>
            <p className="font-medium">{enquiry.email}</p>
          </div>
        </div>

        <div>
          <Label className="text-sm text-gray-500">Subject</Label>
          <p className="font-medium">{enquiry.subject}</p>
        </div>

        <div>
          <Label className="text-sm text-gray-500">Service Interested In</Label>
          <p className="font-medium">{enquiry.service}</p>
        </div>

        <div>
          <Label className="text-sm text-gray-500">Message</Label>
          <div className="mt-1 p-3 bg-gray-50 rounded-md">
            <p className="whitespace-pre-wrap">{enquiry.message}</p>
          </div>
        </div>

        <div>
          <Label className="text-sm text-gray-500">Received On</Label>
          <p className="font-medium">{formatDate(enquiry.createdAt)}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={enquiry.status} onValueChange={(value) => onStatusChange(enquiry._id, value)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="spam">Spam</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add notes about this enquiry..."
            rows={4}
            defaultValue={enquiry.notes || ""}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button className="bg-black hover:bg-gray-800">Save Notes</Button>
      </CardFooter>
    </Card>
  )
}
