import { Mail, MapPin, Phone } from "lucide-react"
import ContactForm from "../../components/contact-form"

export default function ContactPage() {
  return (
    <main className="pt-20">
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
                      123 Tech Street
                      <br />
                      Innovation City, TC 12345
                      <br />
                      United States
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
                      General Inquiries: info@techsolutions.com
                      <br />
                      Support: support@techsolutions.com
                      <br />
                      Careers: careers@techsolutions.com
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
                      Main Office: +1 (555) 123-4567
                      <br />
                      Support: +1 (555) 987-6543
                      <br />
                      Hours: Monday-Friday, 9am-6pm EST
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm4.215-11.906c-.175-.44-.42-.833-.735-1.163a3.97 3.97 0 00-1.163-.735 3.977 3.977 0 00-1.548-.288c-.54 0-1.055.096-1.546.288-.491.192-.928.45-1.163.735-.236.315-.56.723-.735 1.163a3.977 3.977 0 00-.288 1.548c0 .54.096 1.055.288 1.546.192.491.45.928.735 1.163.315.236.723.56 1.163.735a3.977 3.977 0 001.546.288c.54 0 1.055-.096 1.548-.288.491-.192.928-.45 1.163-.735.236-.315.56-.723.735-1.163a3.977 3.977 0 00.288-1.546c0-.54-.096-1.055-.288-1.548zm-1.023 2.945c-.125.318-.3.598-.523.84a2.47 2.47 0 01-.84.523 2.628 2.628 0 01-1.022.193c-.364 0-.705-.064-1.022-.193a2.47 2.47 0 01-.84-.523 2.47 2.47 0 01-.523-.84 2.628 2.628 0 01-.193-1.022c0-.364.064-.705.193-1.022.125-.318.3-.598.523-.84a2.47 2.47 0 01.84-.523 2.628 2.628 0 011.022-.193c.364 0 .705.064 1.022.193.318.125.598.3.84.523.223.242.398.522.523.84.129.317.193.658.193 1.022 0 .364-.064.705-.193 1.022z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.7 3H4.3C3.582 3 3 3.582 3 4.3v15.4c0 .718.582 1.3 1.3 1.3h15.4c.718 0 1.3-.582 1.3-1.3V4.3c0-.718-.582-1.3-1.3-1.3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" />
                    </svg>
                  </a>
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
              <p className="text-gray-600 font-medium">Interactive Map Would Be Displayed Here</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
