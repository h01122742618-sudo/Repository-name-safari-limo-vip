'use client'

import { useLanguage } from './language-provider'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="text-gold hover:text-gold/80 hover:bg-gold/10"
    >
      <Globe className="h-4 w-4 mr-2" />
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  )
}
