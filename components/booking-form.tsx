'use client'

import { useState } from 'react'
import { useLanguage } from './language-provider'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MessageCircle, Check, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { BookingFormData, CarType } from '@/lib/types'

const carTypes: CarType[] = ['Toyota Hiace', 'GMC Yukon', 'Cadillac Escalade']

export function BookingForm() {
  const { t, isRTL } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<BookingFormData>({
    customer_name: '',
    phone: '',
    pickup_location: '',
    destination: '',
    car_type: 'Toyota Hiace',
    travel_date: '',
    travel_time: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error: insertError } = await supabase
        .from('bookings')
        .insert([formData])

      if (insertError) throw insertError

      setIsSuccess(true)
      setFormData({
        customer_name: '',
        phone: '',
        pickup_location: '',
        destination: '',
        car_type: 'Toyota Hiace',
        travel_date: '',
        travel_time: '',
      })

      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      setError(t.booking.error)
      console.error('Booking error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateWhatsAppMessage = () => {
    const message = `
*Safari Limo VIP Booking Request*
------------------------
Name: ${formData.customer_name}
Phone: ${formData.phone}
Pickup: ${formData.pickup_location}
Destination: ${formData.destination}
Vehicle: ${formData.car_type}
Date: ${formData.travel_date}
Time: ${formData.travel_time}
------------------------
    `.trim()
    
    return `https://wa.me/01122742618?text=${encodeURIComponent(message)}`
  }

  return (
    <section id="booking" className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-zinc-900 border-gold/30">
            <CardHeader className="text-center">
              <div className="w-16 h-1 bg-gold mx-auto mb-4" />
              <CardTitle className="text-3xl text-white">{t.booking.title}</CardTitle>
              <CardDescription className="text-gray-400">{t.booking.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-green-500 font-semibold">{t.booking.success}</p>
                    <p className="text-green-400 text-sm">{t.booking.successDesc}</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-500">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Customer Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">{t.booking.customerName}</Label>
                    <Input
                      id="name"
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      placeholder={t.booking.customerNamePlaceholder}
                      required
                      className="bg-zinc-800 border-gold/20 text-white placeholder:text-gray-500 focus:border-gold"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">{t.booking.phone}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.booking.phonePlaceholder}
                      required
                      className="bg-zinc-800 border-gold/20 text-white placeholder:text-gray-500 focus:border-gold"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Pickup Location */}
                <div className="space-y-2">
                  <Label htmlFor="pickup" className="text-white">{t.booking.pickup}</Label>
                  <Input
                    id="pickup"
                    value={formData.pickup_location}
                    onChange={(e) => setFormData({ ...formData, pickup_location: e.target.value })}
                    placeholder={t.booking.pickupPlaceholder}
                    required
                    className="bg-zinc-800 border-gold/20 text-white placeholder:text-gray-500 focus:border-gold"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>

                {/* Destination */}
                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-white">{t.booking.destination}</Label>
                  <Input
                    id="destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder={t.booking.destinationPlaceholder}
                    required
                    className="bg-zinc-800 border-gold/20 text-white placeholder:text-gray-500 focus:border-gold"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>

                {/* Car Type */}
                <div className="space-y-2">
                  <Label className="text-white">{t.booking.carType}</Label>
                  <Select
                    value={formData.car_type}
                    onValueChange={(value: CarType) => setFormData({ ...formData, car_type: value })}
                  >
                    <SelectTrigger className="bg-zinc-800 border-gold/20 text-white focus:ring-gold">
                      <SelectValue placeholder={t.booking.selectVehicle} />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-gold/20">
                      {carTypes.map((car) => (
                        <SelectItem key={car} value={car} className="text-white hover:bg-gold/20">
                          {car}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Travel Date */}
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-white">{t.booking.travelDate}</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.travel_date}
                      onChange={(e) => setFormData({ ...formData, travel_date: e.target.value })}
                      required
                      className="bg-zinc-800 border-gold/20 text-white focus:border-gold"
                    />
                  </div>

                  {/* Travel Time */}
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-white">{t.booking.travelTime}</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.travel_time}
                      onChange={(e) => setFormData({ ...formData, travel_time: e.target.value })}
                      required
                      className="bg-zinc-800 border-gold/20 text-white focus:border-gold"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gold hover:bg-gold/90 text-black font-semibold py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.booking.submitting}
                      </>
                    ) : (
                      t.booking.submit
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="flex-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-white py-6"
                  >
                    <a href={generateWhatsAppMessage()} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {t.booking.whatsappBook}
                    </a>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
