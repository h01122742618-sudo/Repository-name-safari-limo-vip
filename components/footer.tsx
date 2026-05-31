'use client'

import { useLanguage } from './language-provider'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-black border-t border-gold/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-gold">Safari Limo</span>
              <span className="text-sm font-semibold text-white bg-gold/20 px-2 py-0.5 rounded">VIP</span>
            </div>
            <p className="text-gray-400">
              {t.hero.description}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold font-semibold mb-4">{t.footer.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="h-5 w-5 text-gold" />
                <span>01122742618</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="h-5 w-5 text-gold" />
                <span>h01122742618@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="h-5 w-5 text-gold" />
                <span>القاهره الشيخ ذايد, UAE</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-gold font-semibold mb-4">{t.footer.available}</h3>
            <p className="text-gray-400">24/7</p>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Safari Limo VIP. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
