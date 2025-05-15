import { CheckCircle2 } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-black text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">About TechSolutions</h1>
            <p className="mt-6 text-lg text-gray-300">
              We're a team of passionate technologists dedicated to helping businesses transform through innovative
              digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2013, TechSolutions began with a simple mission: to help businesses leverage technology to
                achieve their goals. What started as a small team of three developers has grown into a full-service
                technology company with expertise across web development, mobile applications, custom software, and IT
                consulting.
              </p>
              <p className="text-gray-600 mb-4">
                Over the years, we've partnered with businesses of all sizes, from startups to Fortune 500 companies,
                helping them navigate the ever-changing technology landscape and implement solutions that drive real
                business value.
              </p>
              <p className="text-gray-600">
                Today, our team of 25+ technology experts continues to push the boundaries of what's possible, always
                staying at the forefront of emerging technologies and best practices to deliver exceptional results for
                our clients.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-black rounded-lg"></div>
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Our team"
                className="relative z-10 w-full h-auto rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-black rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="mt-4 text-lg text-gray-600">These core principles guide everything we do.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We're committed to delivering the highest quality solutions that exceed our clients' expectations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We constantly explore new technologies and approaches to solve complex problems in creative ways.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p className="text-gray-600">
                We work closely with our clients, treating their challenges as our own and building lasting
                partnerships.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Agility</h3>
              <p className="text-gray-600">
                We embrace change and adapt quickly to evolving requirements and emerging technologies.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We operate with transparency, honesty, and ethical standards in all our interactions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Results-Driven</h3>
              <p className="text-gray-600">
                We focus on delivering measurable business outcomes, not just technical solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold">Our Leadership Team</h2>
            <p className="mt-4 text-lg text-gray-600">Meet the experts who lead our company.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                <img src="/placeholder.svg?height=200&width=200" alt="CEO" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold">John Smith</h3>
              <p className="text-gray-500">CEO & Founder</p>
              <p className="mt-2 text-gray-600">
                15+ years of experience in software development and business leadership.
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                <img src="/placeholder.svg?height=200&width=200" alt="CTO" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold">Sarah Johnson</h3>
              <p className="text-gray-500">CTO</p>
              <p className="mt-2 text-gray-600">
                Expert in cloud architecture and emerging technologies with 12+ years of experience.
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                <img src="/placeholder.svg?height=200&width=200" alt="COO" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold">Michael Chen</h3>
              <p className="text-gray-500">COO</p>
              <p className="mt-2 text-gray-600">
                Specializes in operations and project management with 10+ years in the tech industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-black text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose TechSolutions?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-white mr-2 flex-shrink-0" />
                  <span>Proven track record with 150+ successful projects</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-white mr-2 flex-shrink-0" />
                  <span>Expert team with diverse technical skills and industry experience</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-white mr-2 flex-shrink-0" />
                  <span>Agile development methodology for faster time-to-market</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-white mr-2 flex-shrink-0" />
                  <span>Transparent communication and collaborative approach</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-white mr-2 flex-shrink-0" />
                  <span>Ongoing support and maintenance services</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-white mr-2 flex-shrink-0" />
                  <span>Commitment to delivering on time and within budget</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Our office"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
