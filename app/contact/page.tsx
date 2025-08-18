"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Phone, MapPin, Linkedin, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Contact Harini L</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions about the Hybrid Privacy-Preserving Cyberbullying Detection Framework? Want to discuss the
              research or collaborate? I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Send me a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">First Name</label>
                        <Input placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Last Name</label>
                        <Input placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Organization</label>
                      <Input placeholder="Your school, company, or organization" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Subject</label>
                      <Input placeholder="How can I help you?" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Message</label>
                      <Textarea
                        placeholder="Tell me more about your questions or collaboration ideas..."
                        className="min-h-32"
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full">Send Message</Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Email</h3>
                      <p className="text-muted-foreground">harini.lts8@gmail.com</p>
                      <p className="text-sm text-muted-foreground">I'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Phone</h3>
                      <p className="text-muted-foreground">8884916059</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-6PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Location</h3>
                      <p className="text-muted-foreground">Bengaluru, Karnataka, India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Linkedin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">LinkedIn</h3>
                      <a
                        href="https://www.linkedin.com/in/harini-lakshmanan-04/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                      >
                        harini-lakshmanan-04
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <p className="text-sm text-muted-foreground">Connect professionally</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Portfolio</h3>
                      <a
                        href="https://port-folio-02.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                      >
                        View My Work
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <p className="text-sm text-muted-foreground">Explore my projects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Research Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Interested in collaborating on cyberbullying detection research or discussing the RoBERTa framework
                    implementation?
                  </p>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Schedule a Discussion
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
