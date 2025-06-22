"use client"

import { useEffect, useRef } from "react"

export default function RequestsChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 300

    // Sample data
    const data = [
      { label: "Web Dev", value: 35, color: "#000000" },
      { label: "Mobile Apps", value: 25, color: "#374151" },
      { label: "CRM", value: 20, color: "#6b7280" },
      { label: "Other", value: 20, color: "#9ca3af" },
    ]

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Draw pie chart
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40

    let startAngle = 0

    data.forEach((item) => {
      // Calculate angles
      const sliceAngle = (item.value / total) * 2 * Math.PI
      const endAngle = startAngle + sliceAngle

      // Draw slice
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = item.color
      ctx.fill()

      // Draw slice border
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Calculate label position
      const labelAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + Math.cos(labelAngle) * labelRadius
      const labelY = centerY + Math.sin(labelAngle) * labelRadius

      // Draw percentage label
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${Math.round((item.value / total) * 100)}%`, labelX, labelY)

      startAngle = endAngle
    })

    // Draw legend
    const legendX = 20
    let legendY = canvas.height - 80

    data.forEach((item) => {
      // Draw color box
      ctx.fillStyle = item.color
      ctx.fillRect(legendX, legendY, 16, 16)

      // Draw label
      ctx.fillStyle = "#000000"
      ctx.font = "14px Arial"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(`${item.label} (${item.value}%)`, legendX + 24, legendY + 8)

      legendY += 24
    })

    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        // Redraw chart
        // This is simplified - in a real app, you'd want to debounce this
        // and extract the drawing logic to a reusable function
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-[300px]" style={{ maxWidth: "100%" }} />
}
