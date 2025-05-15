"use client"

import { useEffect, useRef } from "react"

interface RequestsChartProps {
  data: { label: string; value: number; color?: string }[]
}

export default function RequestsChart({ data = [] }: RequestsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || data.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 300

    // Default colors if not provided
    const defaultColors = ["#000000", "#374151", "#6b7280", "#9ca3af", "#d1d5db"]

    // Ensure all data items have colors
    const chartData = data.map((item, index) => ({
      ...item,
      color: item.color || defaultColors[index % defaultColors.length],
    }))

    // Calculate total
    const total = chartData.reduce((sum, item) => sum + item.value, 0)

    // Draw pie chart
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40

    let startAngle = 0

    chartData.forEach((item) => {
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

    chartData.forEach((item) => {
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
  }, [data])

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-md">
        <p className="text-gray-500">No enquiry data available</p>
      </div>
    )
  }

  return <canvas ref={canvasRef} className="w-full h-[300px]" style={{ maxWidth: "100%" }} />
}
