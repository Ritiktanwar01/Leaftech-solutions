"use client"

import { useEffect, useRef } from "react"

interface VisitorChartProps {
  data: { date: string; count: number }[]
}

export default function VisitorChart({ data = [] }: VisitorChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || data.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 300

    // Chart configuration
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const maxValue = Math.max(...data.map((d) => d.count)) * 1.1 || 100

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.strokeStyle = "#e5e7eb"
    ctx.stroke()

    // Draw grid lines
    const gridLines = 5
    ctx.beginPath()
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)

      // Add y-axis labels
      ctx.fillStyle = "#9ca3af"
      ctx.font = "12px Arial"
      ctx.textAlign = "right"
      ctx.fillText(Math.round(maxValue - (maxValue / gridLines) * i).toString(), padding - 10, y + 4)
    }
    ctx.strokeStyle = "#f3f4f6"
    ctx.stroke()

    // Draw x-axis labels (every 5 days)
    ctx.fillStyle = "#9ca3af"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    for (let i = 0; i < data.length; i += Math.ceil(data.length / 6)) {
      const x = padding + (chartWidth / (data.length - 1)) * i
      const date = new Date(data[i].date)
      const label = `${date.getDate()}/${date.getMonth() + 1}`
      ctx.fillText(label, x, canvas.height - padding + 20)
    }

    // Draw line chart
    ctx.beginPath()
    data.forEach((point, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      const y = padding + chartHeight - (point.count / maxValue) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw area under the line
    ctx.lineTo(padding + chartWidth, canvas.height - padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.closePath()
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    ctx.fill()

    // Draw data points
    data.forEach((point, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      const y = padding + chartHeight - (point.count / maxValue) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#000000"
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()
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
        <p className="text-gray-500">No visitor data available</p>
      </div>
    )
  }

  return <canvas ref={canvasRef} className="w-full h-[300px]" style={{ maxWidth: "100%" }} />
}
