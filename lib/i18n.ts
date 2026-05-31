export type Language = 'en' | 'ar'

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      booking: 'Book Now',
      fleet: 'Our Fleet',
      admin: 'Admin',
    },
    // Hero
    hero: {
      title: 'Safari Limo VIP',
      subtitle: 'Luxury Airport Transfers & VIP Transportation',
      description: 'Experience the pinnacle of luxury travel with our premium fleet of vehicles and professional chauffeurs.',
      bookNow: 'Book Your Ride',
    },
    // Fleet
    fleet: {
      title: 'Our Premium Fleet',
      subtitle: 'Choose from our selection of luxury vehicles',
      passengers: 'passengers',
      hiaceDesc: 'Spacious and comfortable for group travel with ample luggage space.',
      yukonDesc: 'Premium SUV with executive comfort and powerful performance.',
      escaladeDesc: 'Ultimate luxury SUV for the most discerning travelers.',
    },
    // Booking Form
    booking: {
      title: 'VIP Airport Transfer Booking',
      subtitle: 'Fill in your details and we will confirm your booking',
      customerName: 'Full Name',
      customerNamePlaceholder: 'Enter your full name',
      phone: 'Phone Number',
      phonePlaceholder: '+971 50 XXX XXXX',
      pickup: 'Pickup Location',
      pickupPlaceholder: 'Airport, Hotel, Address...',
      destination: 'Destination',
      destinationPlaceholder: 'Where would you like to go?',
      carType: 'Select Vehicle',
      selectVehicle: 'Choose your vehicle',
      travelDate: 'Travel Date',
      travelTime: 'Travel Time',
      submit: 'Submit Booking',
      submitting: 'Submitting...',
      whatsappBook: 'Book via WhatsApp',
      success: 'Booking submitted successfully!',
      successDesc: 'We will contact you shortly to confirm your reservation.',
      error: 'Failed to submit booking',
    },
    // Footer
    footer: {
      rights: 'All rights reserved.',
      contact: 'Contact Us',
      available: 'Available 24/7',
    },
    // Admin
    admin: {
      title: 'Admin Dashboard',
      subtitle: 'Manage all bookings',
      bookings: 'Bookings',
      noBookings: 'No bookings yet',
      customer: 'Customer',
      phone: 'Phone',
      pickup: 'Pickup',
      destination: 'Destination',
      vehicle: 'Vehicle',
      dateTime: 'Date & Time',
      status: 'Status',
      pending: 'Pending',
      confirmed: 'Confirmed',
      completed: 'Completed',
      cancelled: 'Cancelled',
      refresh: 'Refresh',
    },
  },
  ar: {
    // Navigation
    nav: {
      home: 'الرئيسية',
      booking: 'احجز الآن',
      fleet: 'أسطولنا',
      admin: 'لوحة التحكم',
    },
    // Hero
    hero: {
      title: 'سفاري ليمو VIP',
      subtitle: 'نقل VIP وتوصيل المطار الفاخر',
      description: 'استمتع بقمة السفر الفاخر مع أسطولنا المميز من السيارات والسائقين المحترفين.',
      bookNow: 'احجز رحلتك',
    },
    // Fleet
    fleet: {
      title: 'أسطولنا الفاخر',
      subtitle: 'اختر من مجموعتنا من السيارات الفاخرة',
      passengers: 'راكب',
      hiaceDesc: 'فسيح ومريح للسفر الجماعي مع مساحة واسعة للأمتعة.',
      yukonDesc: 'سيارة SUV فاخرة مع راحة تنفيذية وأداء قوي.',
      escaladeDesc: 'أفخم سيارة SUV للمسافرين الأكثر تميزاً.',
    },
    // Booking Form
    booking: {
      title: 'حجز نقل VIP للمطار',
      subtitle: 'املأ بياناتك وسنؤكد حجزك',
      customerName: 'الاسم الكامل',
      customerNamePlaceholder: 'أدخل اسمك الكامل',
      phone: 'رقم الهاتف',
      phonePlaceholder: '+971 50 XXX XXXX',
      pickup: 'موقع الاستلام',
      pickupPlaceholder: 'المطار، الفندق، العنوان...',
      destination: 'الوجهة',
      destinationPlaceholder: 'إلى أين تريد الذهاب؟',
      carType: 'اختر السيارة',
      selectVehicle: 'اختر سيارتك',
      travelDate: 'تاريخ السفر',
      travelTime: 'وقت السفر',
      submit: 'إرسال الحجز',
      submitting: 'جاري الإرسال...',
      whatsappBook: 'احجز عبر واتساب',
      success: 'تم إرسال الحجز بنجاح!',
      successDesc: 'سنتصل بك قريباً لتأكيد حجزك.',
      error: 'فشل في إرسال الحجز',
    },
    // Footer
    footer: {
      rights: 'جميع الحقوق محفوظة.',
      contact: 'اتصل بنا',
      available: 'متاح على مدار الساعة',
    },
    // Admin
    admin: {
      title: 'لوحة التحكم',
      subtitle: 'إدارة جميع الحجوزات',
      bookings: 'الحجوزات',
      noBookings: 'لا توجد حجوزات بعد',
      customer: 'العميل',
      phone: 'الهاتف',
      pickup: 'الاستلام',
      destination: 'الوجهة',
      vehicle: 'السيارة',
      dateTime: 'التاريخ والوقت',
      status: 'الحالة',
      pending: 'قيد الانتظار',
      confirmed: 'مؤكد',
      completed: 'مكتمل',
      cancelled: 'ملغي',
      refresh: 'تحديث',
    },
  },
}

export function getTranslations(lang: Language) {
  return translations[lang]
}
