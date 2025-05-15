import Link from "next/link"
import { ArrowRight, CheckCircle2, Code, Database, Globe, Laptop, Server, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import ServiceCard from "../../components/service-card"
import Image from "next/image"

export default function ServicesPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-black text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Services</h1>
            <p className="mt-6 text-lg text-gray-300">
              We provide end-to-end technology solutions to help your business thrive in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
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
              icon={<Server className="h-10 w-10" />}
              title="Cloud Solutions"
              description="Secure, scalable, and reliable cloud infrastructure to support your business applications and data."
            />
          </div>
        </div>
      </section>

      {/* Web Development */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Web Development</h2>
              <p className="text-gray-600 mb-6">
                Our web development services focus on creating custom, high-performance websites and web applications
                that deliver exceptional user experiences and drive business results.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>Responsive website design and development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>E-commerce platforms with payment integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>Content management systems (CMS)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>Progressive Web Applications (PWAs)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>Web portals and dashboards</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>API development and integration</span>
                </li>
              </ul>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link href="/contact">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Web Development"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Applications */}
      <section className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Mobile Applications"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">Mobile Applications</h2>
              <p className="text-gray-600 mb-6">
                We develop intuitive, feature-rich mobile applications that engage users and help businesses extend
                their reach across multiple platforms.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>Native iOS app development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>Native Android app development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>Cross-platform app development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>Mobile app UI/UX design</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>App maintenance and support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>App store optimization and deployment</span>
                </li>
              </ul>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link href="/contact">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CRM Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Custom CRM Solutions</h2>
              <p className="text-gray-600 mb-6">
                Our custom CRM solutions help businesses manage customer relationships more effectively, streamline
                processes, and gain valuable insights from customer data.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>Customer database management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>Sales pipeline management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>Marketing automation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>Customer service and support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>Reporting and analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0" />
                  <span>Third-party integrations</span>
                </li>
              </ul>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link href="/contact">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Custom CRM Solutions"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold">Our Development Process</h2>
            <p className="mt-4 text-lg text-gray-600">
              We follow a structured approach to ensure successful project delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Discovery</h3>
              <p className="text-gray-600">
                We start by understanding your business goals, requirements, and challenges to define the project scope.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Planning</h3>
              <p className="text-gray-600">
                We create a detailed project plan, including timelines, milestones, and resource allocation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Development</h3>
              <p className="text-gray-600">
                Our team develops the solution using agile methodologies, with regular updates and feedback cycles.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Delivery</h3>
              <p className="text-gray-600">
                We deploy the solution, provide training, and offer ongoing support to ensure long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold">Technologies We Use</h2>
            <p className="mt-4 text-lg text-gray-600">
              We leverage the latest technologies to build robust, scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
              <Image src={"/django.png"} alt="Django is a pythoon based web framework" height={80} width={80} className="h-12" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
              <Image src={"/react.png"} alt="React is a poppular web libarary for robust UI" height={80} width={80} className="h-12" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
              <Image src={"/android.png"} alt="Android devlopment with react native" height={80} width={80} className="h-12" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
              <Image src={"/nextjs.png"} alt="Nextjs is a website framework which is used to create UI with SEO friendly structure" height={80} width={80} className="h-12" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
              <Image src={"/express-js.png"} alt="Express js is used to create robust backend solutions" height={80} width={80} className="h-12" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
              <Image src={"/ios.png"} alt="IOS devlopment with react native" height={80} width={80} className="h-12" />
            </div>
            {/* <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
              <Image src={"/ios.png"} alt="IOS devlopment with react native" height={80} width={80} className="h-12" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
              <img src="/placeholder.svg?height=80&width=80" alt="Google Cloud" className="h-12" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
              <img src="/placeholder.svg?height=80&width=80" alt="MongoDB" className="h-12" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
              <img src="/placeholder.svg?height=80&width=80" alt="MySQL" className="h-12" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
              <img src="/placeholder.svg?height=80&width=80" alt="PostgreSQL" className="h-12" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
              <img src="/placeholder.svg?height=80&width=80" alt="Docker" className="h-12" />
            </div> */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Contact us today to discuss your project requirements and how we can help you achieve your business goals.
            </p>
            <Button asChild className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">
              <Link href="/contact">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
