'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Search, Grid, LogOut, User, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'


export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading, signOut } = useAuth()

  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading1, setLoading] = useState(false)
  const [showAppsMenu, setShowAppsMenu] = useState(false);

  // Close menu when clicking outside
  const menuRef = useRef<HTMLDivElement | null>(null);
  const appsRef = useRef<HTMLDivElement | null>(null)


  // 🔹 Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false)
      }
      if (appsRef.current && !appsRef.current.contains(e.target as Node)) {
        setShowAppsMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    setShowMenu(false)
  }

  // ⭐ ACTIVE NAV LOGIC
  const isActive = (path: string) => pathname === path
  const isMoviesActive =
    pathname.startsWith("/movie") || pathname === "/allmovies"
  const isShowsActive = pathname.startsWith("/shows")

  const handleSelect = () => {
    setShowAppsMenu(false)       // CLOSE POPUP
    window.location.reload()

  }
  // ⭐ DEBOUNCE SEARCH
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length > 0) fetchResults(query)
      else setResults([])
    }, 300)

    return () => clearTimeout(delay)
  }, [query])

  // ⭐ API SEARCH
  const fetchResults = async (text: string) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/search?q=${encodeURIComponent(text)}`)
      const json = await res.json()
      setResults(json.searchResult || [])
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: any) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search?query=${encodeURIComponent(query)}`)
    setShowSearch(false)
  }

  return (
    <header className="sticky top-0 z-[60] bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 border-b border-surface">
      <nav className="relative px-4 py-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* ⭐ SEARCH PANEL */}
        {showSearch && (
          <div className="
            fixed left-0 right-0 top-[64px] 
            bg-background/80 backdrop-blur-xl 
            supports-[backdrop-filter]:bg-background/40 
            border-b border-surface shadow-lg 
            z-[70] pb-6
          ">

            {/* SEARCH BAR */}
            <form
              onSubmit={handleSearch}
              className="w-full max-w-4xl mx-auto px-6 mt-4"
            >
              <div className="
                flex items-center gap-4 
                bg-surface/80 backdrop-blur-xl 
                border border-surface-secondary 
                rounded-2xl px-5 py-4
              ">
                <Search size={22} className="text-foreground-muted" />

                <input
                  autoFocus
                  type="text"
                  placeholder="Search movies, shows..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-foreground text-lg"
                />

                <button
                  type="button"
                  onClick={() => { setShowSearch(false); setResults([]); }}
                >
                  <X size={22} className="text-foreground-muted hover:text-primary" />
                </button>
              </div>
            </form>

            {/* ⭐ SCROLLABLE RESULTS */}
            {results.length === 0 ? (
              <div></div>
            ) : (
              <div className="
                w-full max-w-4xl mx-auto px-6 mt-3 
                max-h-[70vh] overflow-y-auto 
                flex flex-col gap-4 pb-4
                bg-surface/80 backdrop-blur-xl
                rounded-2xl
                pt-4
              ">

                {loading1 && (
                  <p className="text-sm text-foreground-muted">Searching…</p>
                )}

                {!loading1 && results.length === 0 && query.length > 0 && (
                  <p className="text-sm text-foreground-muted">No results found</p>
                )}

                {results.map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      router.push(`/movie/${item.id}`)
                      setShowSearch(false)
                    }}
                    className="
                      flex items-center gap-4 
                      bg-surface/50 hover:bg-surface-secondary 
                      transition-smooth 
                      rounded-xl p-3
                    "
                  >
                    <img
                      src={`https://imgcdn.kim/pv/341/${item.id}.jpg`}
                      alt={item.t}
                      className="w-32 h-20 object-cover rounded-lg"
                    />

                    <div className="flex flex-col text-left">
                      <p className="text-foreground text-lg font-semibold">{item.t}</p>
                      <p className="text-foreground-muted text-sm">{item.y} {item.r}</p>
                    </div>
                  </button>
                ))}

              </div>
            )}
          </div>
        )}

        {/* ⭐ NAVBAR */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
            {/* <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">NM</span> */}
            {/* </div> */}
            {/* <img src="/logo.png" alt="" className=' h-10 rounded-lg'/> */}
            <img src="/namelogo.png" alt="" className=' h-8' />
            {/* <span className="font-bold text-lg hidden sm:inline text-foreground">NetMirror</span> */}
          </Link>

          {/* ⭐ NAV LINKS (ACTIVE COLOR FIXED) */}
          <div className="hidden sm:flex items-center gap-6">
            <Link
              href="/"
              className={`link-nav ${isActive("/") ? "text-primary font-semibold" : ""}`}
            >
              Home
            </Link>

            <Link
              href="/movies"
              className={`link-nav ${isMoviesActive ? "text-primary font-semibold" : ""}`}
            >
              Movies
            </Link>

            <Link
              href="/shows"
              className={`link-nav ${isShowsActive ? "text-primary font-semibold" : ""}`}
            >
              TV Shows
            </Link>

            <Link
              href="/watchlist"
              className={`link-nav ${isActive("/watchlist") ? "text-primary font-semibold" : ""}`}
            >
              Watch List
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Search Button */}
            <button
              onClick={() => setShowSearch(prev => !prev)}
              className="p-2 hover:bg-surface rounded-full transition-smooth"
            >
              <Search size={20} className="text-foreground-muted" />
            </button>

            {/* Grid Icon */}
            {/* <div className="hidden sm:block p-2 hover:bg-surface rounded-full transition-smooth cursor-pointer">
              <Grid size={20} className="text-foreground-muted" />
            </div> */}
            <div ref={appsRef} className="relative hidden sm:block">
              <div
                onClick={() => setShowAppsMenu(prev => !prev)}
                className="p-2 hover:bg-surface rounded-full cursor-pointer transition-smooth"
              >
                <Grid size={20} className="text-foreground-muted" />
              </div>

              {/* ⭐ STREAMING SERVICES MENU */}
              {showAppsMenu && (
                <div className=" absolute right-0 mt-5   bg-black/70 backdrop-blur-2xl rounded-2xl p-5 grid grid-cols-2 gap-4 shadow-2xl w-[380px] z-[200] animate-fadeIn">

                  <div onClick={handleSelect} className="bg-black rounded-xl h-24 w-40 flex items-center justify-center cursor-pointer hover:scale-105 transition">
                    <img src="/nf.webp" className="h-24 w-40 rounded-xl" alt="Netflix" />
                  </div>

                  <div onClick={handleSelect} className="bg-[#0F1C2E] rounded-xl h-24 w-40 flex items-center justify-center cursor-pointer hover:scale-105 transition">
                    <img src="/pv.webp" className="h-24 w-40 rounded-xl" alt="Prime Video" />
                  </div>

                  <div onClick={handleSelect} className="bg-[#001F2E] rounded-xl h-24 w-40 flex items-center justify-center cursor-pointer hover:scale-105 transition">
                    <img src="/lg.webp" className="h-24 w-40 rounded-xl" alt="Lionsgate Play" />
                  </div>

                  <div onClick={handleSelect} className="bg-[#001A66] rounded-xl w-40 h-24 flex items-center justify-center cursor-pointer hover:scale-105 transition">
                    <img src="/dp.webp" className="h-24  w-40 rounded-xl" alt="Disney+" />
                  </div>

                </div>
              )}
            </div>

            {/* User Menu */}
            {/* User Section */}
            {loading ? (
              // 🔥 SHOW SHIMMER WHILE AUTH IS CHECKING
              <div className="w-10 h-10 rounded-full bg-surface animate-pulse" />
            ) : user ? (
              // 🔥 SHOW USER MENU WHEN LOGGED IN
              <div className="relative" ref={menuRef}>
                {/* Profile Button */}
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-hover transition-all"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} className="w-10 h-10 rounded-full" />
                  ) : (
                    <User size={20} className="text-white" />
                  )}
                </button>

                {/* Dropdown UI */}
                {showMenu && (
                  <div className="absolute  right-0 mt-3 w-52 bg-background/50 backdrop-blur-3xl supports-[backdrop-filter]:bg-background/80 rounded-xl shadow-2xl border  p-6  z-50 animate-fadeIn">

                    {/* LEFT COLUMN */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 mb-3">YOUR ACCOUNT</h3>

                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
                          {/* <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                          🐱
                        </div> */}
                          <img src={user.photoURL || ""} alt="" className='w-8 h-8 rounded-full' />
                          <p className="text-sm text-white">{user.displayName}</p>
                        </div>
                        <hr />

                        <Link href="/profile" className="text-sm text-white hover:text-blue-400 text-left mt-1.5">
                          Manage profiles
                        </Link>

                        <Link href="/privacy" className="text-sm text-white hover:text-blue-400 mt-1.5  ">
                          Privacy Policy
                        </Link>

                        <button
                          onClick={() => handleSignOut()}
                          className="text-sm text-white hover:text-red-400 text-left "
                        >
                          {/* <LogOut size={14} className="inline mr-2" /> */}
                          Sign out
                        </button>
                      </div>
                    </div>


                  </div>
                )}
              </div>
            ) : (
              // 🔥 SHOW LOGIN / SIGNUP IF NO USER
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => router.push("/login")} className="btn-primary-small px-5">
                  Login
                </Button>
                <Button size="sm" onClick={() => router.push("/signup")} className="btn-primary-small">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>

      </nav>
    </header>
  )
}
