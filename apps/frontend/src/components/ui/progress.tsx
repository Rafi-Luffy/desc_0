import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    variant?: 'default' | 'handmade' | 'warm'
  }
>(({ className, value, variant = 'default', ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      variant === 'handmade' && "h-3 bg-warm-orange/20 border-2 border-warm-orange/30 rounded-full",
      variant === 'warm' && "h-4 bg-warm-green/20 border border-warm-green/30",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 transition-all duration-1000 ease-out",
        variant === 'default' && "bg-gradient-to-r from-warm-blue to-warm-green",
        variant === 'handmade' && "bg-gradient-to-r from-warm-orange to-warm-green rounded-full",
        variant === 'warm' && "bg-gradient-to-r from-warm-green to-warm-blue"
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    {variant === 'handmade' && (
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      </div>
    )}
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }