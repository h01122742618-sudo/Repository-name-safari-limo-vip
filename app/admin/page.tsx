'use client'

import { useEffect, useState, useCallback } from 'react'
import { LanguageProvider, useLanguage } from '@/components/language-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RefreshCw, Car, Clock, MapPin, Phone, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Booking, BookingStatus } from '@/lib/types'

function AdminDashboard() {
  const { t } = useLanguage()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchBookings = useCallback(async () => {
    setIsLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setBookings(data as Booking[])
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const updateStatus = async (id: string, status: BookingStatus) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)

    if (!error) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
    }
  }

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
      case 'confirmed': return 'bg-blue-500/20 text-blue-500 border-blue-500/30'
      case 'completed': return 'bg-green-500/20 text-green-500 border-green-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-500 border-red-500/30'
    }
  }

  const getStatusLabel = (status: BookingStatus) => {
    switch (status) {
      case 'pending': return t.admin.pending
      case 'confirmed': return t.admin.confirmed
      case 'completed': return t.admin.completed
      case 'cancelled': return t.admin.cancelled
    }
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{t.admin.title}</h1>
            <p className="text-gray-400">{t.admin.subtitle}</p>
          </div>
          <Button
            onClick={fetchBookings}
            disabled={isLoading}
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-black"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {t.admin.refresh}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(['pending', 'confirmed', 'completed', 'cancelled'] as BookingStatus[]).map((status) => (
            <Card key={status} className="bg-zinc-900 border-gold/20">
              <CardContent className="p-4">
                <div className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getStatusColor(status)} mb-2`}>
                  {getStatusLabel(status)}
                </div>
                <p className="text-2xl font-bold text-white">
                  {bookings.filter(b => b.status === status).length}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bookings List */}
        <Card className="bg-zinc-900 border-gold/20">
          <CardHeader>
            <CardTitle className="text-white">{t.admin.bookings}</CardTitle>
            <CardDescription className="text-gray-400">
              {bookings.length} {t.admin.bookings.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <Car className="h-12 w-12 text-gold/50 mx-auto mb-4" />
                <p className="text-gray-400">{t.admin.noBookings}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-zinc-800 rounded-lg p-4 border border-gold/10"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Customer Info */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-gold text-sm">
                            <User className="h-4 w-4" />
                            {t.admin.customer}
                          </div>
                          <p className="text-white font-medium">{booking.customer_name}</p>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Phone className="h-3 w-3" />
                            {booking.phone}
                          </div>
                        </div>

                        {/* Route */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-gold text-sm">
                            <MapPin className="h-4 w-4" />
                            {t.admin.pickup} / {t.admin.destination}
                          </div>
                          <p className="text-white text-sm">{booking.pickup_location}</p>
                          <p className="text-gray-400 text-sm">{booking.destination}</p>
                        </div>

                        {/* Vehicle & DateTime */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-gold text-sm">
                            <Car className="h-4 w-4" />
                            {t.admin.vehicle}
                          </div>
                          <p className="text-white">{booking.car_type}</p>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Clock className="h-3 w-3" />
                            {new Date(booking.travel_date).toLocaleDateString()} at {booking.travel_time}
                          </div>
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                          <div className="text-gold text-sm">{t.admin.status}</div>
                          <Select
                            value={booking.status}
                            onValueChange={(value: BookingStatus) => updateStatus(booking.id, value)}
                          >
                            <SelectTrigger className={`w-full border ${getStatusColor(booking.status)} bg-transparent`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-gold/20">
                              <SelectItem value="pending" className="text-yellow-500">{t.admin.pending}</SelectItem>
                              <SelectItem value="confirmed" className="text-blue-500">{t.admin.confirmed}</SelectItem>
                              <SelectItem value="completed" className="text-green-500">{t.admin.completed}</SelectItem>
                              <SelectItem value="cancelled" className="text-red-500">{t.admin.cancelled}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black">
        <Header />
        <AdminDashboard />
        <Footer />
      </div>
    </LanguageProvider>
  )
}
