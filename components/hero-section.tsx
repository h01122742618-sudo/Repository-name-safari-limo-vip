'use client'

import { useLanguage } from './language-provider'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  const { t } = useLanguage()

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=1920&q=80"
          alt="Luxury limousine"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Gold accent line */}
          <div className="w-24 h-1 bg-gold mx-auto mb-8" />
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 text-balance">
            {t.hero.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gold font-light mb-6">
            {t.hero.subtitle}
          </p>
          
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto text-pretty">
            {t.hero.description}
          </p>

          <Button 
            onClick={scrollToBooking}
            size="lg"
            className="bg-gold hover:bg-gold/90 text-black font-semibold px-10 py-6 text-lg"
          >
            {t.hero.bookNow}
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-gold" />
        </div>
      </div>
    </section>
  )
}
