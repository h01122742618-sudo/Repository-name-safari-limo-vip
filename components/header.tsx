'use client'

import Link from 'next/link'
import { useLanguage } from './language-provider'
import { LanguageSwitcher } from './language-switcher'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Header() {
  const { t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gold">Safari Limo</span>
            <span className="text-sm font-semibold text-white bg-gold/20 px-2 py-0.5 rounded">VIP</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-white hover:text-gold transition-colors">
              {t.nav.home}
            </Link>
            <Link href="#booking" className="text-white hover:text-gold transition-colors">
              {t.nav.booking}
            </Link>
            <Link href="#fleet" className="text-white hover:text-gold transition-colors">
              {t.nav.fleet}
            </Link>
            <Link href="/admin" className="text-white hover:text-gold transition-colors">
              {t.nav.admin}
            </Link>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gold/20">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-white hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link 
                href="#booking" 
                className="text-white hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.booking}
              </Link>
              <Link 
                href="#fleet" 
                className="text-white hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.fleet}
              </Link>
              <Link 
                href="/admin" 
                className="text-white hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.admin}
              </Link>
              <LanguageSwitcher />
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
