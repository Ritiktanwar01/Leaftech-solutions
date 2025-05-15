"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProjectCardProps {
  image: string
  title: string
  category: string
  description: string
}

export default function ProjectCard({ image, title, category, description }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden h-full border-0 shadow-lg">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-black text-white text-xs font-medium px-2 py-1 rounded">
            {category}
          </div>
        </div>
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-500">{description}</p>
        </CardContent>
        <CardFooter>
          <Link
            href={`/projects/${title.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-black font-medium inline-flex items-center hover:underline"
          >
            View Project <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
