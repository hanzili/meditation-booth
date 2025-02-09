import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primaryForeground hover:bg-primary/90 dark:bg-primary dark:text-primaryForeground dark:hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructiveForeground hover:bg-destructive/90 dark:bg-destructive dark:text-destructiveForeground dark:hover:bg-destructive/90",
        outline:
          "border border-border bg-background hover:bg-muted hover:text-foreground dark:border-border dark:bg-background dark:hover:bg-muted dark:hover:text-foreground",
        secondary:
          "bg-secondary text-secondaryForeground hover:bg-secondary/80 dark:bg-secondary dark:text-secondaryForeground dark:hover:bg-secondary/80",
        ghost:
          "hover:bg-muted hover:text-foreground dark:hover:bg-muted dark:hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline dark:text-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
