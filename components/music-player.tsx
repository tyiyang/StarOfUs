"use client"

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Music, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // A romantic ambient music URL (royalty-free)
  // const musicUrl = 'https://assets.mixkit.co/music/preview/mixkit-sleepy-cat-135.mp3'
  const musicUrl = '/mixkit-beautiful-dream-493.mp3'

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current.loop = true
    }
  }, [])

  const togglePlay = async () => {
    if (!hasInteracted) {
      setHasInteracted(true)
    }
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        try {
          await audioRef.current.play()
        } catch (error) {
          console.log('Audio playback failed:', error)
        }
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={musicUrl} preload="auto" />
      
      {/* Floating music controller */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "transition-all duration-500 ease-out"
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-3",
            "bg-black/30 backdrop-blur-xl rounded-full",
            "border border-white/10",
            "shadow-lg shadow-primary/20",
            "transition-all duration-500",
            isExpanded ? "pr-6" : ""
          )}
        >
          {/* Animated music icon */}
          <button
            onClick={togglePlay}
            className={cn(
              "relative w-10 h-10 rounded-full",
              "bg-gradient-to-br from-primary/80 to-secondary/80",
              "flex items-center justify-center",
              "transition-all duration-300",
              "hover:scale-110 active:scale-95",
              "group"
            )}
            aria-label={isPlaying ? "暂停音乐" : "播放音乐"}
          >
            {/* Ripple effect when playing */}
            {isPlaying && (
              <>
                <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
              </>
            )}
            
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white relative z-10" />
            ) : (
              <Play className="w-4 h-4 text-white relative z-10 ml-0.5" />
            )}
          </button>

          {/* Expanded controls */}
          <div
            className={cn(
              "flex items-center gap-3 overflow-hidden transition-all duration-500",
              isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"
            )}
          >
            {/* Music visualizer bars */}
            <div className="flex items-end gap-0.5 h-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1 bg-gradient-to-t from-primary to-secondary rounded-full",
                    "transition-all duration-300",
                    isPlaying && !isMuted
                      ? "animate-pulse"
                      : "h-1"
                  )}
                  style={{
                    height: isPlaying && !isMuted ? `${Math.random() * 16 + 8}px` : '4px',
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${0.5 + Math.random() * 0.3}s`
                  }}
                />
              ))}
            </div>

            {/* Song info */}
            <div className="whitespace-nowrap">
              <p className="text-xs text-white/80 font-medium">浪漫星空</p>
              <p className="text-xs text-white/50">轻音乐</p>
            </div>

            {/* Mute button */}
            <button
              onClick={toggleMute}
              className={cn(
                "w-8 h-8 rounded-full",
                "bg-white/10 hover:bg-white/20",
                "flex items-center justify-center",
                "transition-all duration-300",
                "hover:scale-110"
              )}
              aria-label={isMuted ? "取消静音" : "静音"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white/70" />
              ) : (
                <Volume2 className="w-4 h-4 text-white/70" />
              )}
            </button>
          </div>

          {/* Music note indicator when collapsed and playing */}
          {!isExpanded && isPlaying && (
            <div className="flex items-center">
              <Music className={cn(
                "w-4 h-4 text-white/60",
                isPlaying ? "animate-bounce" : ""
              )} />
            </div>
          )}
        </div>

        {/* Initial prompt bubble */}
        {!hasInteracted && (
          <div
            className={cn(
              "absolute -top-12 right-0",
              "bg-white/10 backdrop-blur-md rounded-lg px-3 py-1.5",
              "text-xs text-white/80",
              "border border-white/10",
              "animate-bounce"
            )}
          >
            点击播放音乐
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white/10 rotate-45 border-r border-b border-white/10" />
          </div>
        )}
      </div>
    </>
  )
}
