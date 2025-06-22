export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

"use server"
import { CheckCircle2 } from "lucide-react"


async function FetchData() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about`, {
    next: {
      revalidate: 60
    },
  })
  if (!req.ok) {
    throw new Error("Failed to fetch data")
  }
  return req.json()
}

export default async function AboutPage() {

  const data = await FetchData()

  return (
    <main className="pt-20 mt-20">

      <section className="py-20 bg-black text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{data.title}</h1>
            <p className="mt-6 text-lg text-gray-300">
              {
                data.subtitle
              }
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
                {
                  data.story
                }
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-black rounded-lg"></div>
              <img
                src="/lappy.png"
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

            {
              data.values.map((val: { title: string; icon: string; description: string }) => {
                return (
                  <div className="bg-white p-6 rounded-lg shadow-md" key={val.title}>
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white mb-4">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={val.icon }
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{val.title}</h3>
                    <p className="text-gray-600">
                      {
                        val.description
                      }
                    </p>
                  </div>
                )
              })
            }

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
           {
            data.team.map((member: { name: string; image: string; position: string; bio: string }) => {
              return (
                <div className="bg-white p-6 rounded-lg shadow-md" key={member.name}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                  <p className="mt-2 text-gray-500">{member.bio}</p>
                </div>
              )
            } )
           }
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
                src="/main.jpg"
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
