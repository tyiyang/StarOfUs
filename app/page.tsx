"use client"

import { useEffect, useState } from 'react'
import { StarryBackground } from '@/components/starry-background'
import { ParticleTitle } from '@/components/particle-title'
import { PhotoCarousel } from '@/components/photo-carousel'
import { MusicPlayer } from '@/components/music-player'
import { FloatingHearts } from '@/components/floating-hearts'
import { LoveTimeline } from '@/components/love-timeline'
import { Heart, Sparkles, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => setShowContent(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Starry background with all particle effects */}
      <StarryBackground />
      
      {/* Floating hearts decoration */}
      <FloatingHearts />
      
      {/* Music player */}
      <MusicPlayer />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
          {/* Decorative top elements */}
          <div 
            className={cn(
              "absolute top-8 left-1/2 -translate-x-1/2",
              "flex items-center gap-2",
              "transition-all duration-1000 delay-300",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            )}
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs md:text-sm text-white/50 font-serif tracking-widest">
              星空下的浪漫时光
            </span>
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </div>

          {/* Particle title */}
          <div 
            className={cn(
              "w-full max-w-4xl mb-8 md:mb-12",
              "transition-all duration-1000",
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <ParticleTitle />
          </div>

          {/* Subtitle */}
          <p 
            className={cn(
              "text-center text-white/60 text-sm md:text-lg font-serif mb-8 md:mb-12 max-w-md px-4",
              "transition-all duration-1000 delay-500",
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            每一张照片，都是我们爱情故事中最美的篇章
          </p>

          {/* Love counter */}
          <div 
            className={cn(
              "flex items-center gap-4 mb-12 md:mb-16",
              "transition-all duration-1000 delay-700",
              showContent ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                365+
              </div>
              <div className="text-xs text-white/50 mt-1">天</div>
            </div>
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-secondary fill-secondary animate-pulse" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                无数
              </div>
              <div className="text-xs text-white/50 mt-1">美好瞬间</div>
            </div>
          </div>

          {/* Photo carousel */}
          <div 
            className={cn(
              "w-full",
              "transition-all duration-1000 delay-900",
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            )}
          >
            <PhotoCarousel />
          </div>

          {/* Scroll indicator */}
          <div 
            className={cn(
              "absolute bottom-8 left-1/2 -translate-x-1/2",
              "flex flex-col items-center gap-2",
              "transition-all duration-1000 delay-1000",
              showContent ? "opacity-100" : "opacity-0"
            )}
          >
            <span className="text-xs text-white/40">向下滑动</span>
            <ArrowDown className="w-4 h-4 text-white/40 animate-bounce" />
          </div>
        </section>

        {/* Timeline Section */}
        <section 
          className={cn(
            "py-16 md:py-24",
            "bg-gradient-to-b from-transparent via-black/20 to-transparent"
          )}
        >
          <LoveTimeline />
        </section>

        {/* Footer message */}
        <section className="py-16 md:py-24 flex flex-col items-center justify-center px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl rounded-full" />
            <div className="relative text-center">
              <Heart className="w-12 h-12 md:w-16 md:h-16 text-secondary fill-secondary/50 mx-auto mb-4 animate-pulse" />
              <p className="text-lg md:text-2xl font-serif text-white/80 mb-2">
                愿我们的爱情
              </p>
              <p className="text-xl md:text-3xl font-serif bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                如星空般永恒璀璨
              </p>
              <p className="text-sm text-white/40 mt-6 font-mono">
                Forever & Always
              </p>
            </div>
          </div>

          {/* Interactive hint */}
          <div className="mt-12 text-center">
            <p className="text-xs text-white/30">
              点击任意位置释放爱心 · 移动鼠标留下星轨
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
