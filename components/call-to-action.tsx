import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PenTool, CalendarClock } from 'lucide-react'

export default function CallToAction() {
  return (
    <section className="py-20 md:py-32 bg-zinc-50 dark:bg-background/20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight lg:text-5xl">
          Ready to Elevate Your Notes?
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
          Start using NoteForge today to organize, plan, and create with clarity and speed.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/dashboard">
              <PenTool className="size-4" />
              Get Started
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="/book-demo">
              <CalendarClock className="size-4" />
              Book Demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
