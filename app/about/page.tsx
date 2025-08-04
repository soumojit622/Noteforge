'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft, Rocket, Target } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground py-24 px-6">
            {/* Back to Home button */}
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'absolute top-6 left-6 flex items-center gap-1 text-sm'
                )}
            >
                <ArrowLeft className="w-4 h-4" />
                Home
            </Link>

            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                    About <span className="text-blue-400">NoteForge</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-12">
                    NoteForge is built for thinkers, writers, and creators. Whether you&apos;re a student, a professional,
                    or an artist — our platform helps you organize, express, and grow your ideas without friction.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                    {/* Illustration */}
                    <Image
                        src="/aboutus.jpg"
                        alt="About illustration"
                        width={500}
                        height={500}
                        className="mx-auto dark:brightness-[0.85]"
                    />

                    {/* Mission & Vision */}
                    <div className="text-left space-y-8">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-blue-400">
                                <Target className="w-5 h-5" />
                                <h2 className="text-xl font-semibold">Our Mission</h2>
                            </div>
                            <p className="text-muted-foreground">
                                Empower individuals and teams to capture, explore, and refine their ideas — beautifully and effortlessly.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-blue-400">
                                <Rocket className="w-5 h-5" />
                                <h2 className="text-xl font-semibold">Our Vision</h2>
                            </div>
                            <p className="text-muted-foreground">
                                We imagine a world where creativity flows freely, and NoteForge becomes the trusted companion
                                for every thinker on their journey of creation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-20 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <span className="text-foreground text-md">
                        Made with <span className="inline-block">💙</span> by Soumojit Banerjee
                    </span>
                </div>
            </div>
        </main>
    )
}
