import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Settings2, Sparkles, Zap } from 'lucide-react'
import { ReactNode } from 'react'

export default function Features() {
  return (
    <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Everything You Need to Write Smarter
          </h2>
          <p className="mt-4 text-muted-foreground">
            Noteforge is built to be fast, flexible, and focused — giving you complete control over your notes.
          </p>
        </div>

        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          {/* Customizable */}
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Zap className="size-6 text-sky-500" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">Fully Customizable</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Adjust layouts, themes, and features to match your exact workflow — Noteforge adapts to you.
              </p>
            </CardContent>
          </Card>

          {/* Control */}
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Settings2 className="size-6 text-sky-500" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">Total Control</h3>
            </CardHeader>
            <CardContent>
              <p className="mt-3 text-sm">
                Customize every detail from structure to styling. Build a space that feels truly yours.
              </p>
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Sparkles className="size-6 text-sky-500" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">AI-Powered Suggestions</h3>
            </CardHeader>
            <CardContent>
              <p className="mt-3 text-sm">
                Get smart writing help, task hints, and organization prompts — right when you need them.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-background absolute inset-0 from-transparent to-75%"
    />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
)
