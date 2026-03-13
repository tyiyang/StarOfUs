"use client"

import { Heart, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const milestones = [
  { date: '2023.06.18', event: '初次相遇', icon: Star },
  { date: '2023.08.14', event: '确定关系', icon: Heart },
  { date: '2023.12.25', event: '第一个圣诞', icon: Star },
  { date: '2024.02.14', event: '浪漫情人节', icon: Heart },
  { date: '2024.06.18', event: '一周年纪念', icon: Star },
]

export function LoveTimeline() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-center text-xl md:text-2xl font-serif text-white/80 mb-8">
        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          爱的足迹
        </span>
      </h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent" />
        
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon
          const isLeft = index % 2 === 0
          
          return (
            <div
              key={index}
              className={cn(
                "relative flex items-center mb-8 last:mb-0",
                isLeft ? "flex-row" : "flex-row-reverse"
              )}
            >
              {/* Content */}
              <div className={cn(
                "w-[calc(50%-20px)] p-4",
                isLeft ? "text-right pr-8" : "text-left pl-8"
              )}>
                <div
                  className={cn(
                    "inline-block p-3 md:p-4 rounded-xl",
                    "bg-white/5 backdrop-blur-md border border-white/10",
                    "transform transition-all duration-500 hover:scale-105",
                    "hover:bg-white/10 hover:border-primary/30",
                    "group cursor-default"
                  )}
                >
                  <p className="text-xs text-primary/80 mb-1 font-mono">{milestone.date}</p>
                  <p className="text-sm md:text-base text-white/90 font-serif">{milestone.event}</p>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
              
              {/* Center icon */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <div className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full",
                  "bg-gradient-to-br from-primary to-secondary",
                  "flex items-center justify-center",
                  "shadow-lg shadow-primary/30",
                  "animate-pulse"
                )}>
                  <Icon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
              </div>
              
              {/* Empty space for alignment */}
              <div className="w-[calc(50%-20px)]" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
