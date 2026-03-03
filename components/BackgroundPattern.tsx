'use client'

import { usePathname } from 'next/navigation'

const BackgroundPattern = () => {
  const pathname = usePathname()
  
  // Make pattern more visible on home page, subtler on others
  const opacity = pathname === '/' ? '0.03' : '0.015'
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Primary "K" pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='40' y='110' font-family='Playfair Display, serif' font-size='100' font-weight='300' fill='%23C6A75E' fill-opacity='${opacity}'%3EK%3C/text%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px'
      }} />
      
      {/* Secondary pattern with rotated "K"s */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='30' y='70' font-family='Playfair Display, serif' font-size='50' font-weight='300' fill='%230F3D3E' fill-opacity='${Number(opacity) * 0.7}' transform='rotate(10 60 60)'%3EK%3C/text%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '120px 120px'
      }} />
    </div>
  )
}

export default BackgroundPattern