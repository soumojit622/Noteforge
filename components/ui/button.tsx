import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-blue-500/60",
  {
    variants: {
      variant: {
        default: `
          bg-gradient-to-br from-blue-500 to-blue-700 
          text-white shadow-md 
          hover:brightness-110 hover:shadow-lg hover:scale-[1.03] 
          active:scale-95`,
        destructive: `
          bg-gradient-to-br from-red-500 to-red-700 
          text-white shadow-lg 
          hover:brightness-110 hover:shadow-2xl hover:scale-[1.04] 
          active:scale-95 
          backdrop-blur-sm`,

        secondary: `
          bg-secondary text-secondary-foreground shadow 
          hover:bg-secondary/90 hover:shadow-md hover:scale-[1.03]`,

        outline: `
          border border-blue-500 text-blue-600 bg-transparent 
          hover:bg-blue-50 hover:shadow-md hover:scale-[1.03] 
          dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-900/30`,

        ghost: `
          text-blue-600 bg-transparent 
          hover:bg-blue-50 hover:text-blue-700 hover:scale-[1.03] 
          dark:hover:bg-blue-900/30`,

        link: `
          text-blue-600 underline-offset-4 
          hover:underline hover:text-blue-700 hover:scale-[1.02]`,
      },
      size: {
        default: "h-10 px-5 py-2.5 text-sm has-[>svg]:px-4",
        sm: "h-8 px-3 text-sm rounded-lg has-[>svg]:px-2.5",
        lg: "h-12 px-6 text-base rounded-xl has-[>svg]:px-5",
        icon: "size-10 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
