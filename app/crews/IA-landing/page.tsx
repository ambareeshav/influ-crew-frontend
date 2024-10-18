"use client"

import { useRef } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Home() {
  const howItWorksRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const router = useRouter()

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }
 
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 font-sans">
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 md:p-6 bg-white shadow-sm z-10">
      <Link href="/" passHref>
        <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => router.push('/')}>
          <h1 className="text-2xl font-bold text-primary">Demo</h1>
        </motion.div>
        </Link>
        <nav className="space-x-4">
          <button onClick={() => scrollToSection(howItWorksRef)} className="text-gray-600 hover:text-primary">How It Works</button>
          {/* <button onClick={() => scrollToSection(featuresRef)} className="text-gray-600 hover:text-primary">Features</button> */}
          <button onClick={() => scrollToSection(pricingRef)} className="text-gray-600 hover:text-primary">Pricing</button>
          <button onClick={() => scrollToSection(contactRef)} className="text-gray-600 hover:text-primary">Contact</button>
          <Link href="/login">
            <Button variant="outline" className="hover:bg-primary hover:text-white">
              Login
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-8 text-center mt-20">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="min-h-screen flex flex-col items-center justify-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[#1e0e4b]">
            Find the Right Creators. Fast.
          </h2>
          <p className="max-w-2xl mb-8 text-xl md:text-2xl text-gray-600">
            Analyze YouTube content and connect with influencers that fit your brand perfectly.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-4 bg-[#1e0e4b] hover:bg-[#1e0e4b]/90 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => router.push('/crews/IA-landing/IA')}
          >
            Get Started Now
          </Button>

          <motion.section variants={fadeInUp} className="mt-16 w-full">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-[#1e0e4b]">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Smart Matching",
                  content: "We analyze creators based on content, audience, channel metrics, potential impact and relevance."
                },
                {
                  title: "Data-Driven Insights",
                  content: "Make decisions backed by powerful analytics."
                },
                {
                  title: "Tailored Creator Analysis",
                  content: "Specialized assistants customized to your brand, providing in-depth analysis for selecting the perfect creators."
                }
              ].map((feature, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle className="text-[#1e0e4b]">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">{feature.content}</CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          <Button 
            size="lg" 
            className="mt-12 text-lg px-8 py-4 bg-[#1e0e4b] hover:bg-[#1e0e4b]/90 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => scrollToSection(pricingRef)}
          >
            Pricing
          </Button>
        </motion.section>

        <motion.section
          ref={howItWorksRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="min-h-screen flex flex-col items-center justify-center py-16 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#1e0e4b]">Find. Analyze. Collaborate.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              {
                title: "Step 1: Enter Your Brand",
                content: "Tell us about your company and what you're looking for in a creator."
              },
              {
                title: "Step 2: Discover Influencers",
                content: "Our crew analyzes YouTube creators who align with your values and audience."
              },
              {
                title: "Step 3: Get Instant Analysis",
                content: "Receive detailed analysis data instantly on Google Sheets, ready for you to take action and make informed decisions."
              }
            ].map((step, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-[#1e0e4b]">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">{step.content}</CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section
          ref={pricingRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="min-h-screen flex flex-col items-center justify-center py-16 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#1e0e4b]">Simple, Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              {
                title: "Basic Plan",
                description: "For startups and small businesses.",
                price: "$/month",
                features: ["a", "b"]
              },
              {
                title: "Pro Plan",
                description: "For growing brands.",
                price: "$/month",
                features: ["a", "b", "c"]
              },
              {
                title: "Enterprise Plan",
                description: "Custom solutions for large businesses.",
                price: "Contact us for pricing",
                features: []
              }
            ].map((plan, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-[#1e0e4b]">{plan.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div>
                    <p className="mb-4">{plan.description}</p>
                    <p className="text-2xl font-bold mb-4">{plan.price}</p>
                    <ul className="list-disc list-inside text-left">
                      {plan.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  {plan.title === "Enterprise Plan" && (
                    <Button className="mt-4 w-full bg-[#1e0e4b] hover:bg-[#1e0e4b]/90 text-white">Contact Sales</Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <Button size="lg" className="mt-12 text-lg px-8 py-4 bg-[#1e0e4b] hover:bg-[#1e0e4b]/90 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Choose Your Plan
          </Button>
        </motion.section>

        <motion.section
          ref={contactRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="min-h-screen flex flex-col items-center justify-center py-16 max-w-md mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#1e0e4b]">Get in Touch with Us</h2>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-[#1e0e4b]">Contact Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <Input id="name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Input id="email" type="email" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <Textarea id="message" required />
                </div>
                <Button type="submit" className="w-full bg-[#1e0e4b] hover:bg-[#1e0e4b]/90 text-white">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <footer className="bg-gray-100 text-center py-8">
        <p className="text-gray-600">&copy; .</p>
      </footer>
    </div>
  )
}