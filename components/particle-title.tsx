"use client"

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  targetX: number
  targetY: number
  size: number
  color: string
  speed: number
}

export function ParticleTitle() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      initParticles()
    }

    const initParticles = () => {
      const text = '我的世界 因你璀璨'
      const fontSize = Math.min(canvas.width / 10, 72)
      
      ctx.font = `bold ${fontSize}px "Noto Serif SC", serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'white'
      ctx.fillText(text, canvas.width / 2, canvas.height / 2)
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      
      particlesRef.current = []
      const gap = 4
      
      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const index = (y * canvas.width + x) * 4
          const alpha = pixels[index + 3]
          
          if (alpha > 128) {
            const colors = [
              'rgba(180, 150, 255, 0.9)',
              'rgba(150, 200, 255, 0.9)',
              'rgba(255, 200, 220, 0.9)',
              'rgba(255, 255, 255, 0.9)',
              'rgba(200, 180, 255, 0.9)'
            ]
            
            particlesRef.current.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              targetX: x,
              targetY: y,
              size: Math.random() * 2 + 1,
              color: colors[Math.floor(Math.random() * colors.length)],
              speed: Math.random() * 0.03 + 0.02
            })
          }
        }
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    let progress = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      progress = Math.min(progress + 0.008, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      particlesRef.current.forEach(particle => {
        particle.x += (particle.targetX - particle.x) * particle.speed
        particle.y += (particle.targetY - particle.y) * particle.speed

        const dx = particle.targetX - particle.x
        const dy = particle.targetY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Add sparkle effect
        const sparkle = Math.sin(Date.now() * 0.005 + particle.x * 0.1) * 0.3 + 0.7

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * sparkle, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Add glow when particles are close to target
        if (distance < 5) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          )
          gradient.addColorStop(0, particle.color)
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      // Add floating stars around text
      const time = Date.now() * 0.001
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i + time * 0.3
        const radius = 20 + Math.sin(time + i) * 10
        const x = canvas.width / 2 + Math.cos(angle) * (canvas.width * 0.4 + radius)
        const y = canvas.height / 2 + Math.sin(angle) * (50 + radius)
        
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(time * 2 + i) * 0.2})`
        ctx.fill()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isVisible])

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-32 md:h-40 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-3xl" />
        </div>
      </div>
    </div>
  )
}
