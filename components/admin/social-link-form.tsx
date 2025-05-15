"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from "lucide-react"

interface SocialLinkFormProps {
  link: {
    platform: string
    url: string
  }
  index: number
  onChange: (index: number, field: string, value: string) => void
  onRemove: (index: number) => void
}

export default function SocialLinkForm({ link, index, onChange, onRemove }: SocialLinkFormProps) {
  const platforms = [
    { value: "facebook", label: "Facebook" },
    { value: "twitter", label: "Twitter" },
    { value: "instagram", label: "Instagram" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "youtube", label: "YouTube" },
    { value: "github", label: "GitHub" },
  ]

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
          <Label htmlFor={`platform-${index}`}>Platform</Label>
          <Select value={link.platform} onValueChange={(value) => onChange(index, "platform", value)}>
            <SelectTrigger id={`platform-${index}`}>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              {platforms.map((platform) => (
                <SelectItem key={platform.value} value={platform.value}>
                  {platform.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`url-${index}`}>URL</Label>
          <Input
            id={`url-${index}`}
            value={link.url}
            onChange={(e) => onChange(index, "url", e.target.value)}
            placeholder="https://facebook.com/yourcompany"
          />
        </div>
      </div>
    </div>
  )
}
