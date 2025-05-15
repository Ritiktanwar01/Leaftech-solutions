"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2 } from "lucide-react"

interface ValueCardProps {
  value: {
    title: string
    description: string
    icon: string
  }
  index: number
  onChange: (index: number, field: string, value: string) => void
  onRemove: (index: number) => void
}

export default function ValueCard({ value, index, onChange, onRemove }: ValueCardProps) {
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

      <div className="space-y-2">
        <Label htmlFor={`value-title-${index}`}>Title</Label>
        <Input
          id={`value-title-${index}`}
          value={value.title}
          onChange={(e) => onChange(index, "title", e.target.value)}
          placeholder="Excellence"
        />
      </div>

      <div className="mt-4 space-y-2">
        <Label htmlFor={`value-description-${index}`}>Description</Label>
        <Textarea
          id={`value-description-${index}`}
          value={value.description}
          onChange={(e) => onChange(index, "description", e.target.value)}
          placeholder="We're committed to delivering the highest quality solutions..."
          rows={3}
        />
      </div>

      <div className="mt-4 space-y-2">
        <Label htmlFor={`value-icon-${index}`}>Icon Name</Label>
        <Input
          id={`value-icon-${index}`}
          value={value.icon}
          onChange={(e) => onChange(index, "icon", e.target.value)}
          placeholder="shield"
        />
        <p className="text-xs text-gray-500">
          Enter a Lucide icon name (e.g., shield, zap, users). See{" "}
          <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline">
            Lucide Icons
          </a>
        </p>
      </div>
    </div>
  )
}
