import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Moon, Sun, Heart, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/store/themeStore'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/campaigns', label: 'Stories' },
  { href: '/impact', label: 'Impact' },
  { href: '/transparency', label: 'Trust' },
  { href: '/volunteer', label: 'Help' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useThemeStore()
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 w-full bg-warm-cream/95 backdrop-blur-md border-b border-warm-orange/20 shadow-gentle">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with hand-drawn feel */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-warm-orange to-warm-green shadow-warm transform group-hover:rotate-12 transition-all duration-300">
                <Heart className="h-6 w-6 text-white animate-heart-beat" fill="currentColor" />
              </div>
              {/* Hand-drawn circle effect */}
              <div className="absolute inset-0 rounded-full border-2 border-warm-orange/30 transform rotate-3 scale-110"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-handwritten font-bold text-warm-charcoal transform -rotate-1">
                DilSe<span className="text-warm-orange">Daan</span>
              </span>
              <span className="text-xs text-warm-charcoal-light font-handwritten -mt-1">
                दिल से दान
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full relative group transform hover:-rotate-1',
                  location.pathname === item.href
                    ? 'text-warm-orange bg-warm-orange/10'
                    : 'text-warm-charcoal hover:text-warm-orange hover:bg-warm-orange/5'
                )}
              >
                {item.label}
                {location.pathname === item.href && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-warm-orange rounded-full"
                    layoutId="navbar-indicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {/* Hand-drawn underline effect on hover */}
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-warm-orange/50 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-full hover:bg-warm-orange/10 transform hover:rotate-12 transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 text-warm-orange" />
              ) : (
                <Moon className="h-4 w-4 text-warm-charcoal" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-warm-green/10 transform hover:rotate-12 transition-all duration-300"
            >
              <Globe className="h-4 w-4 text-warm-green" />
            </Button>

            <Button
              asChild
              variant="handmade"
              size="handmade"
              className="hidden md:inline-flex transform hover:scale-105"
            >
              <Link to="/donate">
                <Heart className="h-4 w-4 mr-2" fill="currentColor" />
                Donate Now
              </Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 rounded-full hover:bg-warm-orange/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5 text-warm-charcoal" />
              ) : (
                <Menu className="h-5 w-5 text-warm-charcoal" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-warm-orange/20 py-4 bg-warm-cream/95"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      'block px-4 py-2 text-sm font-medium transition-colors rounded-lg transform hover:translate-x-2',
                      location.pathname === item.href
                        ? 'text-warm-orange bg-warm-orange/10'
                        : 'text-warm-charcoal hover:text-warm-orange hover:bg-warm-orange/5'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pt-4"
              >
                <Button
                  asChild
                  variant="handmade"
                  size="handmade"
                  className="w-full"
                >
                  <Link to="/donate" onClick={() => setIsOpen(false)}>
                    <Heart className="h-4 w-4 mr-2" fill="currentColor" />
                    Donate with Love
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}