"use client"

import { useEffect, useRef, useCallback } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinklePhase: number
}

interface Meteor {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  angle: number
}

interface Heart {
  x: number
  y: number
  size: number
  opacity: number
  velocityX: number
  velocityY: number
  life: number
  maxLife: number
}

interface MouseTrail {
  x: number
  y: number
  opacity: number
  size: number
}

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const meteorsRef = useRef<Meteor[]>([])
  const heartsRef = useRef<Heart[]>([])
  const mouseTrailRef = useRef<MouseTrail[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>(0)

  const createStars = useCallback((width: number, height: number) => {
    const stars: Star[] = []
    const starCount = Math.floor((width * height) / 3000)
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      })
    }
    return stars
  }, [])

  const createMeteor = useCallback((width: number) => {
    return {
      x: Math.random() * width * 1.5,
      y: -50,
      length: Math.random() * 100 + 50,
      speed: Math.random() * 8 + 6,
      opacity: Math.random() * 0.7 + 0.3,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3
    }
  }, [])

  const createHeartExplosion = useCallback((x: number, y: number) => {
    const hearts: Heart[] = []
    const count = 12
    
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i
      const speed = Math.random() * 3 + 2
      hearts.push({
        x,
        y,
        size: Math.random() * 10 + 8,
        opacity: 1,
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed,
        life: 0,
        maxLife: 60 + Math.random() * 30
      })
    }
    return hearts
  }, [])

  const drawHeart = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath()
    const topCurveHeight = size * 0.3
    ctx.moveTo(x, y + topCurveHeight)
    ctx.bezierCurveTo(
      x, y, 
      x - size / 2, y, 
      x - size / 2, y + topCurveHeight
    )
    ctx.bezierCurveTo(
      x - size / 2, y + (size + topCurveHeight) / 2, 
      x, y + (size + topCurveHeight) / 2 + size * 0.2, 
      x, y + size
    )
    ctx.bezierCurveTo(
      x, y + (size + topCurveHeight) / 2 + size * 0.2, 
      x + size / 2, y + (size + topCurveHeight) / 2, 
      x + size / 2, y + topCurveHeight
    )
    ctx.bezierCurveTo(
      x + size / 2, y, 
      x, y, 
      x, y + topCurveHeight
    )
    ctx.closePath()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      starsRef.current = createStars(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      
      // Add mouse trail
      mouseTrailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        size: 4
      })
      
      if (mouseTrailRef.current.length > 30) {
        mouseTrailRef.current.shift()
      }
    }

    const handleClick = (e: MouseEvent) => {
      const newHearts = createHeartExplosion(e.clientX, e.clientY)
      heartsRef.current.push(...newHearts)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)

    let time = 0
    const animate = () => {
      time += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      )
      gradient.addColorStop(0, 'rgba(25, 15, 45, 1)')
      gradient.addColorStop(0.5, 'rgba(10, 5, 25, 1)')
      gradient.addColorStop(1, 'rgba(5, 2, 15, 1)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw nebula effect
      const nebulaGradient = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.4, 0,
        canvas.width * 0.3, canvas.height * 0.4, canvas.width * 0.4
      )
      nebulaGradient.addColorStop(0, 'rgba(100, 50, 150, 0.1)')
      nebulaGradient.addColorStop(0.5, 'rgba(50, 100, 150, 0.05)')
      nebulaGradient.addColorStop(1, 'transparent')
      ctx.fillStyle = nebulaGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars with twinkling
      starsRef.current.forEach(star => {
        star.twinklePhase += star.twinkleSpeed
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7
        const currentOpacity = star.opacity * twinkle

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        
        const starGradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 2
        )
        starGradient.addColorStop(0, `rgba(255, 255, 240, ${currentOpacity})`)
        starGradient.addColorStop(0.5, `rgba(200, 220, 255, ${currentOpacity * 0.5})`)
        starGradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = starGradient
        ctx.fill()
      })

      // Create meteors randomly
      if (Math.random() < 0.01) {
        meteorsRef.current.push(createMeteor(canvas.width))
      }

      // Draw and update meteors
      meteorsRef.current = meteorsRef.current.filter(meteor => {
        meteor.x += Math.cos(meteor.angle) * meteor.speed
        meteor.y += Math.sin(meteor.angle) * meteor.speed

        const gradient = ctx.createLinearGradient(
          meteor.x, meteor.y,
          meteor.x - Math.cos(meteor.angle) * meteor.length,
          meteor.y - Math.sin(meteor.angle) * meteor.length
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`)
        gradient.addColorStop(0.3, `rgba(150, 200, 255, ${meteor.opacity * 0.6})`)
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.moveTo(meteor.x, meteor.y)
        ctx.lineTo(
          meteor.x - Math.cos(meteor.angle) * meteor.length,
          meteor.y - Math.sin(meteor.angle) * meteor.length
        )
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()

        // Meteor glow
        ctx.beginPath()
        ctx.arc(meteor.x, meteor.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${meteor.opacity})`
        ctx.fill()

        return meteor.y < canvas.height + 100 && meteor.x < canvas.width + 100
      })

      // Draw mouse trail (star trail effect)
      mouseTrailRef.current.forEach((trail, index) => {
        trail.opacity -= 0.03
        trail.size *= 0.95

        if (trail.opacity > 0) {
          const gradient = ctx.createRadialGradient(
            trail.x, trail.y, 0,
            trail.x, trail.y, trail.size * 3
          )
          gradient.addColorStop(0, `rgba(180, 150, 255, ${trail.opacity})`)
          gradient.addColorStop(0.5, `rgba(100, 150, 255, ${trail.opacity * 0.5})`)
          gradient.addColorStop(1, 'transparent')
          
          ctx.beginPath()
          ctx.arc(trail.x, trail.y, trail.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()

          // Draw small star at each trail point
          ctx.beginPath()
          ctx.arc(trail.x, trail.y, trail.size * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${trail.opacity})`
          ctx.fill()
        }
      })

      mouseTrailRef.current = mouseTrailRef.current.filter(t => t.opacity > 0)

      // Draw and update hearts
      heartsRef.current = heartsRef.current.filter(heart => {
        heart.x += heart.velocityX
        heart.y += heart.velocityY
        heart.velocityY += 0.05 // gravity
        heart.life++
        heart.opacity = 1 - (heart.life / heart.maxLife)

        if (heart.opacity > 0) {
          ctx.save()
          ctx.translate(heart.x, heart.y)
          
          drawHeart(ctx, 0, 0, heart.size)
          
          const gradient = ctx.createRadialGradient(0, heart.size / 2, 0, 0, heart.size / 2, heart.size)
          gradient.addColorStop(0, `rgba(255, 100, 150, ${heart.opacity})`)
          gradient.addColorStop(1, `rgba(255, 50, 100, ${heart.opacity * 0.5})`)
          
          ctx.fillStyle = gradient
          ctx.fill()
          
          // Heart glow
          ctx.shadowColor = 'rgba(255, 100, 150, 0.8)'
          ctx.shadowBlur = 10
          ctx.fill()
          
          ctx.restore()
        }

        return heart.life < heart.maxLife
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [createStars, createMeteor, createHeartExplosion, drawHeart])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  )
}
