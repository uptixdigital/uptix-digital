"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AvatarProps {
  className?: string
  children?: React.ReactNode
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
Avatar.displayName = "Avatar"

interface AvatarImageProps {
  className?: string
  src?: string
  alt?: string
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, ...props }, ref) => {
    const [error, setError] = React.useState(false)
    
    if (error || !src) return null
    
    return (
      <Image
        ref={ref}
        src={src}
        alt={alt || ""}
        fill
        className={cn("aspect-square h-full w-full object-cover", className)}
        onError={() => setError(true)}
        {...props}
      />
    )
  }
)
AvatarImage.displayName = "AvatarImage"

interface AvatarFallbackProps {
  className?: string
  children?: React.ReactNode
  delayMs?: number
}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, delayMs = 600, ...props }, ref) => {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      const timer = setTimeout(() => setMounted(true), delayMs)
      return () => clearTimeout(timer)
    }, [delayMs])

    if (!mounted) return null

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-slate-800",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
