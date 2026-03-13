"use client"

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Photo {
  id: number
  url: string
  description: string
}

const photos: Photo[] = [
  {
    id: 1,
    // url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&h=800&fit=crop',
    url: '/photo/1.jpg',
    description: '初次相遇，星光闪烁的那一刻'
  },
  {
    id: 2,
    url: '/photo/2.jpg',
    description: '携手漫步，每一步都是幸福'
  },
  {
    id: 3,
    url: '/photo/3.jpg',
    description: '日落黄昏，你的侧脸最美'
  },
  {
    id: 4,
    url: '/photo/4.jpg',
    description: '笑容如阳光，温暖我的心房'
  },
  {
    id: 5,
    url: '/photo/5.jpg',
    description: '时光静好，与你共度每一天'
  },
  {
    id: 6,
    url: '/photo/6.jpg',
    description: '夜空下的约定，永远在一起'
  },
  {
    id: 7,
    url: '/photo/7.jpg',
    description: '手牵手，共度风雨'
  },
  {
    id: 8,
    url: '/photo/8.jpg',
    description: '浪漫的瞬间，定格永恒'
  },
  {
    id: 9,
    url: '/photo/9.jpg',
    description: '相濡以沫，相伴一生'
  },
  {
    id: 10,
    url: '/photo/10.jpg',
    description: '未来的日子，与你一起走过'
  },
  {
    id: 11,
    url: '/photo/11.jpg',
    description: '手牵手，共度风雨'
  },
  {
    id: 12,
    url: '/photo/12.jpg',
    description: '浪漫的瞬间，定格永恒'
  },
  {
    id: 13,
    url: '/photo/13.jpg',
    description: '相濡以沫，相伴一生'
  },
  {
    id: 14,
    url: '/photo/14.jpg',
    description: '未来的日子，与你一起走过'
  }
]

export function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showMeteorText, setShowMeteorText] = useState(false)

  const nextPhoto = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setShowMeteorText(false)
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length)
      setIsTransitioning(false)
      setTimeout(() => setShowMeteorText(true), 500)
    }, 600)
  }, [isTransitioning])

  const prevPhoto = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setShowMeteorText(false)
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
      setIsTransitioning(false)
      setTimeout(() => setShowMeteorText(true), 500)
    }, 600)
  }, [isTransitioning])

  useEffect(() => {
    const timer = setTimeout(() => setShowMeteorText(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextPhoto, 6000)
    return () => clearInterval(interval)
  }, [nextPhoto])

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      {/* Main photo container */}
      <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-2xl md:rounded-3xl">
        {/* Frosted glass background */}
        <div 
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${photos[currentIndex].url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(30px) brightness(0.4)',
          }}
        />
        
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm" />
        
        {/* Photo container */}
        <div className="absolute inset-4 md:inset-8 flex items-center justify-center">
          <div
            className={cn(
              "relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl",
              "transition-all duration-700 ease-out",
              isTransitioning ? "scale-95 opacity-0 blur-md" : "scale-100 opacity-100 blur-0"
            )}
          >
            <img
              src={photos[currentIndex].url}
              alt={photos[currentIndex].description}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
            
            {/* Soft light overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          </div>
        </div>
        
        {/* Meteor text effect for description */}
        <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center px-8">
          <div 
            className={cn(
              "relative max-w-lg text-center",
              "transition-all duration-1000 ease-out",
              showMeteorText 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-20"
            )}
          >
            {/* Meteor trail effect */}
            <div 
              className={cn(
                "absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-0.5",
                "bg-gradient-to-r from-transparent via-white to-accent",
                "transition-all duration-700 delay-300",
                showMeteorText ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              )}
            />
            
            <p className="text-white/90 text-base md:text-xl font-serif tracking-wider drop-shadow-lg">
              {photos[currentIndex].description}
            </p>
            
            {/* Sparkle decoration */}
            <div className="absolute -right-4 -top-2 w-2 h-2 bg-white rounded-full animate-pulse" />
            <div className="absolute -left-2 -bottom-1 w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-300" />
          </div>
        </div>
        
        {/* Navigation buttons */}
        <button
          onClick={prevPhoto}
          disabled={isTransitioning}
          className={cn(
            "absolute left-2 md:left-4 top-1/2 -translate-y-1/2",
            "w-10 h-10 md:w-12 md:h-12 rounded-full",
            "bg-white/10 backdrop-blur-md border border-white/20",
            "flex items-center justify-center",
            "text-white/80 hover:text-white hover:bg-white/20",
            "transition-all duration-300",
            "hover:scale-110 active:scale-95",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          aria-label="上一张"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        
        <button
          onClick={nextPhoto}
          disabled={isTransitioning}
          className={cn(
            "absolute right-2 md:right-4 top-1/2 -translate-y-1/2",
            "w-10 h-10 md:w-12 md:h-12 rounded-full",
            "bg-white/10 backdrop-blur-md border border-white/20",
            "flex items-center justify-center",
            "text-white/80 hover:text-white hover:bg-white/20",
            "transition-all duration-300",
            "hover:scale-110 active:scale-95",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          aria-label="下一张"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
      
      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning && index !== currentIndex) {
                setIsTransitioning(true)
                setShowMeteorText(false)
                setTimeout(() => {
                  setCurrentIndex(index)
                  setIsTransitioning(false)
                  setTimeout(() => setShowMeteorText(true), 500)
                }, 600)
              }
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-500",
              index === currentIndex 
                ? "w-8 bg-gradient-to-r from-primary to-secondary" 
                : "bg-white/30 hover:bg-white/50"
            )}
            aria-label={`查看第 ${index + 1} 张照片`}
          />
        ))}
      </div>
    </div>
  )
}
