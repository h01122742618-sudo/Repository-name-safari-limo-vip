'use client'

import { useLanguage } from './language-provider'
import { Card, CardContent } from '@/components/ui/card'
import { Users } from 'lucide-react'
import Image from 'next/image'

const vehicles = [
  {
    id: 'hiace',
    name: 'Toyota Hiace',
    passengers: 12,
    image: 'https://images.unsplash.com/photo-1570294646112-27ce4f174e3c?w=800&q=80',
    descKey: 'hiaceDesc' as const,
  },
  {
    id: 'yukon',
    name: 'GMC Yukon',
    passengers: 7,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    descKey: 'yukonDesc' as const,
  },
  {
    id: 'escalade',
    name: 'Cadillac Escalade',
    passengers: 7,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
    descKey: 'escaladeDesc' as const,
  },
]

export function FleetSection() {
  const { t } = useLanguage()

  return (
    <section id="fleet" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            {t.fleet.title}
          </h2>
          <p className="text-gray-400 text-lg">
            {t.fleet.subtitle}
          </p>
        </div>

        {/* Vehicles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <Card 
              key={vehicle.id}
              className="bg-zinc-900 border-gold/20 overflow-hidden group hover:border-gold/50 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">{vehicle.name}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-gold mb-4">
                  <Users className="h-5 w-5" />
                  <span>{vehicle.passengers} {t.fleet.passengers}</span>
                </div>
                <p className="text-gray-400">
                  {t.fleet[vehicle.descKey]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
