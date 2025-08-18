"use client"

import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/research", label: "Research" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">SafeGuard AI</span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  pathname === item.href ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="sm">
                <Link href="/detect">Try Demo</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </motion.div>
          </div>
        </nav>
      </div>
    </motion.header>
  )
}
