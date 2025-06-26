import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Human-crafted button styles
        handmade: "bg-warm-orange text-white hover:bg-warm-orange-dark shadow-warm hover:shadow-handmade transform hover:-translate-y-1 transition-all duration-300 font-handwritten font-semibold border-2 border-warm-orange-light",
        warm: "bg-warm-green text-white hover:bg-warm-green-dark shadow-gentle hover:shadow-warm transform hover:scale-105 transition-all duration-300",
        golden: "bg-warm-golden text-warm-charcoal hover:bg-warm-golden-dark shadow-gentle hover:shadow-warm transform hover:rotate-1 transition-all duration-300",
        sage: "bg-warm-sage text-white hover:bg-warm-green shadow-gentle hover:shadow-warm",
        organic: "bg-gradient-to-r from-warm-orange to-warm-green text-white hover:from-warm-orange-dark hover:to-warm-green-dark shadow-warm hover:shadow-handmade transform hover:-translate-y-1 hover:rotate-1 transition-all duration-300 rounded-organic",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        handmade: "h-12 px-8 py-3 text-base rounded-full",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }