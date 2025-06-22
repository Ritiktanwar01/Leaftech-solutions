export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import Link from "next/link"
import { ArrowRight, Code, Database, Globe, Laptop, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroSection from "../../components/hero-section"
import ServiceCard from "../../components/service-card"
import ProjectCard from "../../components/project-card"
import ContactForm from "../../components/contact-form"
import AnimatedCounter from "../../components/animated-counter"


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


  async function fetchContactData() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
    next: { revalidate: 60 }
  })
  if (!res.ok) {
    throw new Error("Failed to fetch contact data")
  }
  return res.json()
}


export default async function Home() {

  interface Project {
    id: string;
    image: string;
    title: string;
    category: string;
    description: string;
  }

  const contactData = await fetchContactData()

  const projects = await FetchProjects()
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Services</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              We provide cutting-edge technology solutions to help your business grow and succeed in the digital world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Globe className="h-10 w-10" />}
              title="Web Development"
              description="Custom websites built with the latest technologies to ensure performance, security, and scalability."
            />
            <ServiceCard
              icon={<Smartphone className="h-10 w-10" />}
              title="Mobile Applications"
              description="Native and cross-platform mobile applications for iOS and Android to reach your customers wherever they are."
            />
            <ServiceCard
              icon={<Database className="h-10 w-10" />}
              title="Custom CRM Solutions"
              description="Tailor-made CRM systems designed to streamline your business processes and improve customer relationships."
            />
            <ServiceCard
              icon={<Code className="h-10 w-10" />}
              title="Software Development"
              description="Bespoke software solutions developed to address your specific business challenges and requirements."
            />
            <ServiceCard
              icon={<Laptop className="h-10 w-10" />}
              title="IT Consulting"
              description="Expert advice on technology strategy, implementation, and optimization to maximize your ROI."
            />
            <ServiceCard
              icon={<Database className="h-10 w-10" />}
              title="Cloud Solutions"
              description="Secure, scalable, and reliable cloud infrastructure to support your business applications and data."
            />
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <AnimatedCounter end={50} duration={2} />
              <p className="mt-2 text-gray-400">Projects Completed</p>
            </div>
            <div>
              <AnimatedCounter end={40} duration={2} />
              <p className="mt-2 text-gray-400">Happy Clients</p>
            </div>
            <div>
              <AnimatedCounter end={5} duration={2} />
              <p className="mt-2 text-gray-400">Years Experience</p>
            </div>
            <div>
              <AnimatedCounter end={20} duration={2} />
              <p className="mt-2 text-gray-400">Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Featured Projects</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Take a look at some of our recent work and see how we've helped businesses transform their digital
              presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {
              projects.slice(0,3).map((project: Project) => (
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

          <div className="mt-12 text-center">
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Let's Discuss Your Project</h2>
              <p className="mt-4 text-lg text-gray-500">
                Ready to transform your business with custom technology solutions? Get in touch with our team to discuss
                your project requirements.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-black rounded-full p-2">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">Phone</p>
                    <p className="text-base text-gray-500">{contactData.phone.main}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-black rounded-full p-2">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">Email</p>
                    <p className="text-base text-gray-500">{contactData.email.general}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-black rounded-full p-2">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">Address</p>
                    <p className="text-base text-gray-500">{contactData.address.street}, {contactData.address.city}, {contactData.address.state} {contactData.address.zip} ({contactData.address.country})</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
