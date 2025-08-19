"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Brain, Users, TrendingUp, Mail, Phone, Linkedin, ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
}

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                A Hybrid Privacy-Preserving <span className="text-primary">Cyberbullying Detection</span> Framework
                Using RoBERTa
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Advanced transformer-based machine learning framework with federated learning and differential privacy
                that identifies harmful content in real-time, helping create safer digital spaces.
              </p>
              <p className="text-lg text-muted-foreground font-medium">
                Research by <span className="text-primary font-semibold">Harini L</span>
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link href="/detect">Try Demo Now</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            {/* Hero Image Placeholder */}
            <motion.div variants={itemVariants} className="mt-16">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                src="/ai-cyberbullying-dashboard.png"
                alt="AI Cyberbullying Detection Dashboard"
                className="mx-auto rounded-lg shadow-2xl border border-border transition-transform duration-300"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Choose Our Research Framework?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our hybrid privacy-preserving framework combines RoBERTa with federated learning for accurate, secure
              detection.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Brain,
                title: "RoBERTa-Powered",
                description:
                  "Advanced transformer architecture with contextual embeddings and emotion-aware features for superior detection accuracy.",
              },
              {
                icon: Shield,
                title: "Privacy-Preserving",
                description:
                  "Federated learning with differential privacy ensures data protection while maintaining high performance.",
              },
              {
                icon: TrendingUp,
                title: "Hybrid Framework",
                description:
                  "Combines deep learning models (CNN, LSTM, BiLSTM, GRU) with traditional ML for comprehensive analysis.",
              },
              {
                icon: Users,
                title: "Scalable Architecture",
                description:
                  "Distributed training across multiple clients without exposing sensitive user data or compromising accuracy.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover">
                <Card className="text-center p-6 hover:shadow-lg transition-shadow h-full">
                  <CardContent className="space-y-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"
                    >
                      <feature.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Trusted by Communities Worldwide</h2>
            <p className="text-xl text-muted-foreground">
              Our AI technology has helped create safer digital environments across various platforms.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            {[
              { value: "94%", label: "RoBERTa Accuracy", sublabel: "F1-Score with emotion features" },
              { value: "47K+", label: "Dataset Samples", sublabel: "Balanced across 6 categories" },
              { value: "6", label: "Model Comparison", sublabel: "CNN, RNN, LSTM, BiLSTM, GRU" },
            ].map((stat, index) => (
              <motion.div key={index} variants={statsVariants} className="space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-4xl font-bold text-primary"
                >
                  {stat.value}
                </motion.div>
                <div className="text-lg font-semibold text-foreground">{stat.label}</div>
                <div className="text-muted-foreground">{stat.sublabel}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-primary text-primary-foreground"
      >
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Ready to Make Your Platform Safer?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl opacity-90 max-w-2xl mx-auto"
          >
            Start detecting cyberbullying with our advanced AI models. Try our demo to see the technology in action.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/detect">Try Framework Demo</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Details Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-muted/30"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Get in Touch</h2>
            <p className="text-xl text-muted-foreground">
              Connect with the researcher behind this cyberbullying detection framework
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <motion.a
                href="mailto:harini.lts8@gmail.com"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="block"
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                  <CardContent className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-sm text-muted-foreground">harini.lts8@gmail.com</p>
                  </CardContent>
                </Card>
              </motion.a>

              <motion.a
                href="tel:8884916059"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="block"
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                  <CardContent className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-sm text-muted-foreground">+91 8884916059</p>
                  </CardContent>
                </Card>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/harini-lakshmanan-04/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="block"
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                  <CardContent className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Linkedin className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">LinkedIn</h3>
                    <p className="text-sm text-muted-foreground">Professional Profile</p>
                  </CardContent>
                </Card>
              </motion.a>

              <motion.a
                href="https://port-folio-02-p4yp.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="block"
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                  <CardContent className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ExternalLink className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Portfolio</h3>
                    <p className="text-sm text-muted-foreground">View Other Projects</p>
                  </CardContent>
                </Card>
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center space-y-2 pt-8"
            >
              <p className="text-lg font-semibold text-foreground">Harini L</p>
              <p className="text-muted-foreground">Bengaluru, Karnataka, India</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 px-4 border-t border-border"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Explore More</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/about">About Framework</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/features">Features</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/research">Research</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">Contact</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">RoBERTa Cyberbullying Framework</span>
            </motion.div>
            <div className="text-muted-foreground text-sm">
              © 2024 Hybrid Privacy-Preserving Cyberbullying Detection Framework by Harini L. Research implementation
              with RoBERTa.
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
