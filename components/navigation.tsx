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
    { href: "/detect", label: "Detect" },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 py-3.5">
        <nav className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold tracking-tight text-foreground">CyberSafe AI</span>
                  <span className="text-[10px] uppercase font-semibold bg-primary/15 text-primary px-1.5 py-0.2 rounded">Agentic</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono leading-none">Multi-Agent &bull; RoBERTa Active</span>
              </div>
            </Link>
          </motion.div>

          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors py-1 px-2 rounded-md ${
                  pathname === item.href
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="sm" className="font-semibold text-xs h-9 px-4">
                <Link href="/detect">Launch Detector</Link>
              </Button>
            </motion.div>
          </div>
        </nav>
      </div>
    </motion.header>
  )
}
