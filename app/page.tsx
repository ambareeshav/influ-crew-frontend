"use client"

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Twitter, Linkedin, Users } from 'lucide-react'

export default function Home() {
  const whatIsRef = useRef<HTMLElement>(null)
  const whyChooseRef = useRef<HTMLElement>(null)
  const howItWorksRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const getStartedRef = useRef<HTMLElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 font-sans">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 md:p-6 bg-white/80 backdrop-blur-sm shadow-sm z-10"
      >
        <h1 className="text-xl md:text-2xl font-bold text-primary">Demo</h1>
        <nav className="space-x-4">
          <button onClick={() => scrollToSection(whatIsRef)} className="text-gray-600 hover:text-primary">What is Demo?</button>
          <button onClick={() => scrollToSection(whyChooseRef)} className="text-gray-600 hover:text-primary">Why Choose Demo?</button>
          <button onClick={() => scrollToSection(howItWorksRef)} className="text-gray-600 hover:text-primary">How It Works</button>
          <Link href="/crews" className="text-gray-600 hover:text-primary">Crews</Link>
          <Link href="/login">
            <Button variant="outline" className="hover:bg-primary hover:text-white">
              Login
            </Button>
          </Link>
        </nav>
      </motion.header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-8 text-center mt-20">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="min-h-screen flex flex-col items-center justify-center"
        >
          <motion.h2 variants={slideUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-primary">
            Get More Done, Faster - With Expert Crews at Your Side
          </motion.h2>
          <motion.p variants={slideUp} className="max-w-2xl mb-8 text-xl md:text-2xl text-gray-600">
            Supercharge your business by letting our specialized crews handle time-consuming tasks, so you can focus on what truly matters.
          </motion.p>
          <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-4">
            <Link href="/crews">
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 hover:bg-secondary/90 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Our Crews
              </Button>
            </Link>
          </motion.div>
        </motion.section>

        <motion.section
          ref={whatIsRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="min-h-screen flex flex-col items-center justify-center py-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">What is Demo?</h2>
          <Card className="w-full max-w-4xl">
            <CardContent className="p-6 text-left">
              <p className="text-lg">
                Demo is a platform where you can hire specialized crews to handle various tasks for your business, starting with Influencer Analysis. Whether you need data-driven insights or marketing support, our crews work seamlessly to deliver high-quality results.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          ref={whyChooseRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="min-h-screen flex flex-col items-center justify-center py-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">Why Choose Demo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            <motion.div variants={slideUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Expert Crews</CardTitle>
                </CardHeader>
                <CardContent>
                  Access specialized crews that can automate various business needs.
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={slideUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Smart Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  Our system pairs you with the perfect crew for your task.
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={slideUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Data-Driven Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  Make confident decisions with powerful analytics from every crew.
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={slideUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Seamless Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  Manage all your business needs and crews from one intuitive platform.
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          ref={howItWorksRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="min-h-screen flex flex-col items-center justify-center py-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            <motion.div variants={slideUp}>
              <Card>
                <CardHeader>
                  <CardTitle>1. Choose Your Crew</CardTitle>
                </CardHeader>
                <CardContent>
                  Browse our selection of specialized crews and select the one that fits your needs.
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={slideUp}>
              <Card>
                <CardHeader>
                  <CardTitle>2. Submit Your Details</CardTitle>
                </CardHeader>
                <CardContent>
                  Configure and provide the details of your task to your chosen crew.
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={slideUp}>
              <Card>
                <CardHeader>
                  <CardTitle>3. Receive Expert Results</CardTitle>
                </CardHeader>
                <CardContent>
                  Your crew delivers high-quality, actionable results tailored to your needs.
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          ref={testimonialsRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="min-h-screen flex flex-col items-center justify-center py-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">What Our Clients Say</h2>
          <Card className="w-full max-w-4xl">
            <CardContent className="p-6 text-left">
              <blockquote className="text-xl italic">
              &ldquo;Demo&apos;s crews have been game-changers for our business. Their expertise and efficiency have helped us achieve our goals faster than we ever thought possible.&rdquo;
              </blockquote>
              <p className="mt-4 font-semibold">— CEO, TechInnovate</p>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          ref={getStartedRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="min-h-screen flex flex-col items-center justify-center py-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">Ready to Supercharge Your Business?</h2>
          <Card className="w-full max-w-4xl">
            <CardContent className="p-6 text-left">
              <p className="text-lg mb-6">
              Let Demo&apos;s expert crews handle your specialized tasks and drive your business forward. Start with our available crews and stay tuned as we expand our offerings to meet more of your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
{/*                 <Button size="lg" className="w-full sm:w-auto">Start Your Free Trial</Button>
 */}                <Link href="/crews">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Users className="mr-2 h-4 w-4" /> Explore Our Crews
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-100 text-center py-8"
      >
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex justify-center space-x-4 mb-4">
            <Link href="/about" className="text-gray-600 hover:text-primary">About</Link>
            <Link href="/blog" className="text-gray-600 hover:text-primary">Blog</Link>
            <Link href="/careers" className="text-gray-600 hover:text-primary">Careers</Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary">Contact</Link>
          </nav>
          <div className="flex justify-center space-x-4 mb-4">
            <Link href="https://twitter.com" className="text-gray-600 hover:text-primary">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link href="https://linkedin.com" className="text-gray-600 hover:text-primary">
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
          <p className="text-gray-600">&copy; .</p>
        </div>
      </motion.footer>
    </div>
  )
}