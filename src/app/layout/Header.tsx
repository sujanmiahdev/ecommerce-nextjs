'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface HeaderProps {
  brandLogo: string
  searchIcon: string
  cartIcon: string
  menuIcon: string
}

export default function Header({
  brandLogo,
  searchIcon,
  cartIcon,
  menuIcon,
}: HeaderProps) {
  const [search, setSearch] = useState('')

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">

        {/* Burger Menu - Mobile */}
        <button className="block xl:hidden p-2">
          <Image src={menuIcon} alt="menu" width={24} height={24} />
        </button>

        {/* Brand Logo */}
        <Link
          href="/"
          className="mx-auto xl:mx-0 relative w-20 h-20"
        >
          <Image
            src={brandLogo}
            alt="brand logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Search Box - Desktop */}
        <div className="flex-1 px-3 hidden xl:flex">
          <form className="w-full relative">
            <label
              htmlFor="search-box"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            >
              <Image src={searchIcon} alt="search" width={20} height={20} />
            </label>

            <input
              id="search-box"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full pl-10 pr-8 py-1 rounded-full border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-black-500"
            />
          </form>
        </div>

        {/* Cart + Login */}
        <div className="flex items-center gap-4 ml-auto">
          <Link href="/cart" className="relative">
            <Image src={cartIcon} alt="cart" width={28} height={28} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white
                             text-xs w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </Link>

          <Link
            href="/login"
            className="bg-pink-500 text-white px-4 py-1 rounded-full
                       hover:bg-pink-600 transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="xl:hidden px-4 py-2">
        <input
          type="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-1 rounded-full border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
    </header>
  )
}
