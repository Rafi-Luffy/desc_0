import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-warm-charcoal text-warm-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-warm-orange via-warm-golden to-warm-green"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-warm-orange to-warm-green shadow-warm">
                  <Heart className="h-6 w-6 text-white animate-heart-beat" fill="currentColor" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-warm-orange/30 transform rotate-3 scale-110"></div>
              </div>
              <div>
                <span className="text-xl font-handwritten font-bold text-white transform -rotate-1">
                  DilSe<span className="text-warm-orange">Daan</span>
                </span>
                <div className="text-sm font-handwritten text-warm-cream/80">दिल से दान</div>
              </div>
            </div>
            
            <p className="text-warm-cream/80 leading-relaxed">
              Made with ❤️ by young Indians who believe every act of kindness creates ripples of change. 
              Transparent donations, real impact, genuine care.
            </p>
            
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-warm-cream/60 hover:text-warm-orange cursor-pointer transition-colors transform hover:scale-110" />
              <Twitter className="h-6 w-6 text-warm-cream/60 hover:text-warm-orange cursor-pointer transition-colors transform hover:scale-110" />
              <Instagram className="h-6 w-6 text-warm-cream/60 hover:text-warm-orange cursor-pointer transition-colors transform hover:scale-110" />
              <Linkedin className="h-6 w-6 text-warm-cream/60 hover:text-warm-orange cursor-pointer transition-colors transform hover:scale-110" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-handwritten font-bold text-white mb-6 transform -rotate-1">
              Quick Links 🔗
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/campaigns" className="text-warm-cream/80 hover:text-warm-orange transition-colors font-handwritten transform hover:translate-x-1 inline-block">
                  Stories That Need You
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-warm-cream/80 hover:text-warm-orange transition-colors font-handwritten transform hover:translate-x-1 inline-block">
                  See Real Impact
                </Link>
              </li>
              <li>
                <Link to="/transparency" className="text-warm-cream/80 hover:text-warm-orange transition-colors font-handwritten transform hover:translate-x-1 inline-block">
                  Trust & Transparency
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-warm-cream/80 hover:text-warm-orange transition-colors font-handwritten transform hover:translate-x-1 inline-block">
                  Volunteer with Us
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-warm-cream/80 hover:text-warm-orange transition-colors font-handwritten transform hover:translate-x-1 inline-block">
                  Your Impact Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-handwritten font-bold text-white mb-6 transform rotate-1">
              Need Help? 🤗
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-warm-cream/80 hover:text-warm-orange transition-colors font-handwritten transform hover:translate-x-1 inline-block">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-warm-cream/80 hover:text-warm-orange transition-colors font-handwritten transform hover:translate-x-1 inline-block">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-warm-cream/80 hover:text-warm-orange transition-colors font-handwritten transform hover:translate-x-1 inline-block">
                  FAQ & Help
                </a>
              </li>
              <li>
                <a href="#" className="text-warm-cream/80 hover:text-warm-orange transition-colors font-handwritten transform hover:translate-x-1 inline-block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-warm-cream/80 hover:text-warm-orange transition-colors font-handwritten transform hover:translate-x-1 inline-block">
                  Terms of Love
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-handwritten font-bold text-white mb-6 transform -rotate-1">
              Reach Out 📞
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-warm-orange" />
                <span className="text-warm-cream/80 font-handwritten">hello@dilsedaan.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-warm-orange" />
                <span className="text-warm-cream/80 font-handwritten">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-warm-orange" />
                <span className="text-warm-cream/80 font-handwritten">Mumbai, Maharashtra, India</span>
              </div>
            </div>
            
            {/* Trust Badge */}
            <div className="mt-6 p-4 bg-warm-orange/10 rounded-xl border border-warm-orange/20">
              <div className="text-center">
                <div className="text-2xl mb-2">🔒</div>
                <div className="text-sm font-handwritten text-warm-cream/80">
                  Secured by Blockchain
                </div>
                <div className="text-xs text-warm-cream/60">
                  Every donation tracked transparently
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-warm-cream/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-warm-cream/60 font-handwritten text-center md:text-left">
              © 2024 DilSeDaan. Made with infinite love in India. All hearts reserved. ❤️
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-warm-cream/60 font-handwritten text-sm">Powered by kindness</span>
              <div className="w-3 h-3 bg-warm-green rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Inspirational Quote */}
          <div className="text-center mt-6 p-4 bg-warm-green/10 rounded-xl">
            <p className="text-warm-cream/80 font-handwritten italic">
              "The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}