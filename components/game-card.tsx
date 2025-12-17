'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Game } from '@/types/movie'

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  const [hovered, setHovered] = useState(false)
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setCardPosition({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width + 16
      })
    }
    setHovered(true)
  }

  const handleClick = (slug: string) => {
    window.location.href =
      `https://www.pikashowgames.com/game/${slug}?utm_source=NetFreeSource&utm_medium=NetfreeWebMedium&utm_campaign=Netfree`;
  }

  return (
    <div className="relative flex-shrink-0" ref={cardRef}>
      <div
        className="relative w-32 sm:w-40 md:w-48 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHovered(false)}
        onClick={() => handleClick(game.slug)}
      >
        <div className="relative aspect-video rounded-lg overflow-hidden bg-surface-secondary transform transition-all duration-300 hover:scale-110">
          <img
            src={game.image}
            alt={game.name}
            className="w-full h-full object-cover"
          />

          {hovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent rounded-lg" />
          )}
        </div>


      </div>
    </div>
  )
}
