'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type SubItem = { name: string; link: string }
type MenuItem = { name: string; link?: string; dropdown?: SubItem[] }

interface NavbarProps {
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

const menuItems: MenuItem[] = [
  { name: 'Home', link: '/' },
  {
    name: 'Shop',
    dropdown: [
      { name: 'All Products', link: '/products' },
      { name: 'New Arrivals', link: '/new-arrivals' },
      { name: 'Best Sellers', link: '/best-sellers' },
      { name: 'Flash Sale', link: '/flash-sale' },
      { name: 'Top Offers', link: '/offers' },
    ],
  },
  {
    name: 'Categories',
    dropdown: [
      { name: 'Men Fashion', link: '/category/men-fashion' },
      { name: 'Women Fashion', link: '/category/women-fashion' },
      { name: 'Kids & Baby', link: '/category/kids-baby' },
      { name: 'Electronics', link: '/category/electronics' },
      { name: 'Home & Living', link: '/category/home-living' },
      { name: 'Health & Beauty', link: '/category/health-beauty' },
    ],
  },
  { name: 'Brands', dropdown: [{ name: 'Nike', link: '/brand/nike' }, { name: 'Adidas', link: '/brand/adidas' }] },
  { name: 'Pages', dropdown: [{ name: 'About Us', link: '/about' }, { name: 'Contact', link: '/contact' }] },
  { name: 'Support', dropdown: [{ name: 'Help Center', link: '/help-center' }, { name: 'FAQ', link: '/faq' }] },
  { name: 'Blog', link: '/blog' },
]

export default function Navbar({ mobileOpen, setMobileOpen }: NavbarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <nav className="bg-white border-t xl:border-none shadow-md">
      {/* Desktop */}
      <ul className="hidden xl:flex justify-center items-center gap-8 font-medium text-gray-700 py-2">
        {menuItems.map((item, i) => {
          const isActive = item.link === pathname || item.dropdown?.some((d) => d.link === pathname)
          return (
            <li key={i} className="relative" onMouseEnter={() => setOpen(i)} onMouseLeave={() => setOpen(null)}>
              {item.link ? (
                <Link
                  href={item.link}
                  className={`px-3 py-2 rounded-md transition ${
                    isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  className={`px-3 py-2 rounded-md flex items-center gap-1 transition ${
                    isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  {item.name} <ChevronDown size={16} />
                </button>
              )}

              {/* Dropdown */}
              {item.dropdown && open === i && (
                <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-56 py-2 z-50">
                  {item.dropdown.map((sub) => (
                    <li key={sub.name}>
                      <Link
                        href={sub.link}
                        className="block px-3 py-2 hover:bg-blue-50 hover:text-blue-600 rounded-md transition"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t shadow-md px-4 py-2">
          <ul className="flex flex-col gap-2">
            {menuItems.map((item, i) => (
              <li key={i}>
                {item.link ? (
                  <Link
                    href={item.link}
                    className="block py-2 border-b hover:bg-blue-50 rounded-md px-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <button
                      className="w-full flex justify-between items-center py-2 px-2 border-b rounded-md hover:bg-blue-50"
                      onClick={() => setOpen(open === i ? null : i)}
                    >
                      {item.name} <ChevronDown size={16} />
                    </button>
                    {open === i && (
                      <ul className="pl-4 mt-1">
                        {item.dropdown?.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.link}
                              className="block py-1 px-2 rounded-md hover:bg-blue-50"
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
