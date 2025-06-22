export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Mail, MapPin, Phone } from "lucide-react"
import ContactForm from "@/components/contact-form"

async function fetchContactData() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
    next: { revalidate: 60 }
  })
  if (!res.ok) {
    throw new Error("Failed to fetch contact data")
  }
  return res.json()
}

type SocialLink = {
  url: string
  icon: string
  _id: string
}

type ContactData = {
  address: {
    street: string
    city: string
    country: string
  }
  email: {
    general: string
    support: string
    careers: string
  }
  phone: {
    main: string
    support: string
  }
  hours: string
  socialLinks: SocialLink[]
  mapEmbed: string
}

export default async function ContactPage() {
  const contactData: ContactData = await fetchContactData()
  return (
    <main className="pt-20 mt-20">
      {/* Hero Section */}
      <section className="py-20 bg-black text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Contact Us</h1>
            <p className="mt-6 text-lg text-gray-300">
              Have a question or want to discuss your project? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Whether you're looking to start a new project, need help with an existing one, or just want to learn
                more about our services, our team is here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-black rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      {contactData.address.street}
                      <br />
                      {contactData.address.city}
                      <br />
                      {contactData.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-black rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-600">
                      General Inquiries: {contactData.email.general}
                      <br />
                      Support: {contactData.email.support}
                      <br />
                      Careers: {contactData.email.careers}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-black rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                    <p className="text-gray-600">
                      Main Office: {contactData.phone.main}
                      <br />
                      Support: {contactData.phone.support}
                      <br />
                      Hours: {contactData.hours}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {
                    contactData.socialLinks.map((link) => (
                      <a key={link._id} href={link.url} className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={link.icon} />
                        </svg>
                      </a>
                    ))
                  }
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="bg-gray-200 rounded-lg overflow-hidden h-96">
            {/* This would be replaced with an actual map component in production */}
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <div dangerouslySetInnerHTML={{ __html: contactData.mapEmbed }} className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}