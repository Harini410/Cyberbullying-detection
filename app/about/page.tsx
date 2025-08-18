"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Brain, Users, Award, Target, Zap } from "lucide-react"
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">About SafeGuard AI</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to create safer digital spaces through advanced AI technology that detects and prevents
              cyberbullying in real-time.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cyberbullying affects millions of people worldwide, causing lasting psychological harm and creating
                toxic online environments. Traditional moderation methods are slow, inconsistent, and often miss subtle
                forms of harassment.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                SafeGuard AI leverages cutting-edge machine learning models to provide instant, accurate detection of
                harmful content, empowering communities to take proactive action against cyberbullying.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 text-center"
            >
              <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">94% Accuracy</h3>
              <p className="text-muted-foreground">Our RoBERTa model achieves industry-leading detection rates</p>
            </motion.div>
          </motion.div>

          {/* Values Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "Accuracy First",
                  description: "We prioritize precision to minimize false positives while catching real threats.",
                },
                {
                  icon: Zap,
                  title: "Real-Time Protection",
                  description: "Instant analysis ensures harmful content is identified before it spreads.",
                },
                {
                  icon: Users,
                  title: "Community Focus",
                  description: "Built for educators, parents, and moderators who protect online communities.",
                },
              ].map((value, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }}>
                  <Card className="text-center p-6 h-full">
                    <CardContent className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technology Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground text-center">Our Technology</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <Brain className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Multiple AI Models</h3>
                  <p className="text-muted-foreground">
                    We deploy various machine learning approaches including RoBERTa transformers, LSTM networks, and
                    traditional algorithms to ensure comprehensive coverage.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <Award className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Continuous Learning</h3>
                  <p className="text-muted-foreground">
                    Our models are continuously updated with new data patterns to stay ahead of evolving cyberbullying
                    tactics and maintain high accuracy rates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
