'use client'

import { LanguageProvider } from '@/components/language-provider'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { FleetSection } from '@/components/fleet-section'
import { BookingForm } from '@/components/booking-form'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black">
        <Header />
        <main>
          <HeroSection />
          <FleetSection />
          <BookingForm />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
