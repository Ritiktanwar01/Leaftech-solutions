"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2 } from "lucide-react"

interface TeamMemberFormProps {
  member: {
    name: string
    position: string
    bio: string
    image: string
  }
  index: number
  onChange: (index: number, field: string, value: string) => void
  onRemove: (index: number) => void
}

export default function TeamMemberForm({ member, index, onChange, onRemove }: TeamMemberFormProps) {
  return (
    <div className="border rounded-lg p-4 relative">
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        onClick={() => onRemove(index)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`member-name-${index}`}>Name</Label>
          <Input
            id={`member-name-${index}`}
            value={member.name}
            onChange={(e) => onChange(index, "name", e.target.value)}
            placeholder="John Smith"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`member-position-${index}`}>Position</Label>
          <Input
            id={`member-position-${index}`}
            value={member.position}
            onChange={(e) => onChange(index, "position", e.target.value)}
            placeholder="CEO & Founder"
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Label htmlFor={`member-bio-${index}`}>Bio</Label>
        <Textarea
          id={`member-bio-${index}`}
          value={member.bio}
          onChange={(e) => onChange(index, "bio", e.target.value)}
          placeholder="15+ years of experience in software development..."
          rows={3}
        />
      </div>

      <div className="mt-4 space-y-2">
        <Label htmlFor={`member-image-${index}`}>Image URL</Label>
        <Input
          id={`member-image-${index}`}
          value={member.image}
          onChange={(e) => onChange(index, "image", e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {member.image && (
        <div className="mt-4">
          <Label>Image Preview</Label>
          <div className="mt-2 border rounded-md overflow-hidden h-24 w-24">
            <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </div>
  )
}
