

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"


async function FetchProjects () {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
      credentials: "include",
      cache: "no-store",
    })
    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }
    const data = await res.json()
    return data
  }

export default async function ProjectsPage() {
  interface Project {
    id: string;
    image: string;
    title: string;
    category: string;
    description: string;
  }

  const projects = await FetchProjects()

  return (
    <main className="pt-20 mt-20">
      {/* Hero Section */}
      <section className="py-20 bg-black text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Projects</h1>
            <p className="mt-6 text-lg text-gray-300">
              Explore our portfolio of successful projects across various industries and technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              projects.map((project: Project) => (
                <ProjectCard
                  key={project.title}
                  image={project.image}
                  title={project.title}
                  category={project.category}
                  description={project.description}
                />
              ))
            }
            
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold">Featured Case Studies</h2>
            <p className="mt-4 text-lg text-gray-600">Dive deeper into some of our most impactful projects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="/tradeup.jfif"
                alt="E-commerce case study"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="text-sm font-medium text-black bg-gray-100 inline-block px-2 py-1 rounded mb-2">
                  E-Commerce
                </div>
                <h3 className="text-xl font-bold mb-2">How We Increased Sales by 200% for RetailPlus</h3>
                <p className="text-gray-600 mb-4">
                  Learn how our custom e-commerce solution helped RetailPlus overcome technical challenges and achieve
                  record-breaking sales.
                </p>
                <Button asChild variant="outline" className="border-black text-black hover:bg-gray-100">
                  <Link href="/case-studies/retail-plus">
                    Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="/DocSat.jfif"
                alt="Healthcare case study"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="text-sm font-medium text-black bg-gray-100 inline-block px-2 py-1 rounded mb-2">
                  Healthcare
                </div>
                <h3 className="text-xl font-bold mb-2">Streamlining Patient Care with MediConnect CRM</h3>
                <p className="text-gray-600 mb-4">
                  Discover how our custom CRM solution helped a healthcare provider improve patient satisfaction and
                  operational efficiency.
                </p>
                <Button asChild variant="outline" className="border-black text-black hover:bg-gray-100">
                  <Link href="/case-studies/mediconnect">
                    Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Clients Say</h2>
            <p className="mt-4 text-lg text-gray-600">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img src="/Balki.jpg" alt="Client" className="w-12 h-12 rounded-full" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Balakram Parashar</h3>
                  <p className="text-gray-500">President, HRSS</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Leaf Teach solutions transformed our Trust with their e-commerce platform. Their team was professional,
                responsive, and delivered exactly what we needed. Our online donations have increased by 200% since launch."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img src="/labOwner.jpg" alt="Client" className="w-12 h-12 rounded-full" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Dr. Girraj Sharma</h3>
                  <p className="text-gray-500">Owner, Laxmi Narayan Path Lab.</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The CRM system developed by Leaf Tech Solutions has revolutionized how we manage patient relationships. The
                team took the time to understand our unique challenges and delivered a solution that exceeded our
                expectations."
              </p>
            </div>

            {/* <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img src="/SchoolMan.jpg" alt="Client" className="w-12 h-12 rounded-full" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Pradeep Tanwar</h3>
                  <p className="text-gray-500">CEO, LogiTrack</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Working with Leaf Tech Solutions on our logistics mobile app was a game-changer. Their expertise in mobile
                development and understanding of our industry resulted in an app that has significantly improved our
                operational efficiency."
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Let's discuss how we can help you achieve your business goals with custom technology solutions.
            </p>
            <Button asChild className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">
              <Link href="/contact">
                Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
