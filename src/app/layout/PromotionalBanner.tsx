
'use client'

import Link from 'next/link'

export default function PromotionalBanner() {
  return (
    <div className="bg-blue-500 text-white text-center py-2 font-semibold">
      <Link href="#" className="hover:underline">
       Delivery Across Bangladesh — Dhaka: 60 Taka | Outside Dhaka: 99 Taka
      </Link>
    </div>
  )
}
