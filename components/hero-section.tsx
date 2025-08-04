'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Pen, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { HeroHeader } from './header'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                {/* Background gradients */}
                <div
                    aria-hidden
                    className="absolute inset-0 isolate hidden contain-strict lg:block"
                >
                    <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>

                <section>
                    <div className="relative pt-24">
                        <div className="absolute inset-0 -z-10 size-full bg-[radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />

                        <div className="mx-auto max-w-5xl px-6">
                            <div className="sm:mx-auto lg:mr-auto lg:mt-0">
                                <TextEffect
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    as="h1"
                                    className="mt-8 max-w-2xl text-balance text-5xl font-semibold md:text-6xl lg:mt-16"
                                >
                                    NoteForge Your Digital Brain for Smarter Notes
                                </TextEffect>

                                <TextEffect
                                    per="line"
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    delay={0.5}
                                    as="p"
                                    className="mt-6 max-w-2xl text-pretty text-lg"
                                >
                                    Write, plan, and organize all in one place. Stay focused and capture everything that matters — instantly.
                                </TextEffect>

                                <AnimatedGroup
                                    // @ts-expect-error animation group typing mismatch
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-10 flex items-center gap-3"
                                >
                                    <Button asChild className="h-10.5 rounded-xl px-5 text-base">
                                        <Link href="/dashboard">
                                            <Pen className="size-4 mr-1" />
                                            Start Writing
                                        </Link>
                                    </Button>

                                    <Button
                                        asChild
                                        variant="outline"
                                        className="h-10.5 rounded-xl px-5 text-base"
                                    >
                                        <Link href="/dashboard">
                                            <PlayCircle className="size-4 mr-1" />
                                            See It in Action
                                        </Link>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>

                        {/* Demo UI Images */}
                        <AnimatedGroup
                            // @ts-expect-error animation group typing mismatch
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}
                        >
                            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                                />
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-5xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    <Image
                                        className="bg-background aspect-[15/8] hidden rounded-2xl dark:block"
                                        src="/dark.png"
                                        alt="NoteForge UI (dark)"
                                        width={2700}
                                        height={1440}
                                        priority
                                    />
                                    <Image
                                        className="z-2 border-border/25 aspect-[15/8] rounded-2xl border dark:hidden"
                                        src="/light.png"
                                        alt="NoteForge UI (light)"
                                        width={2700}
                                        height={1440}
                                        priority
                                    />
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>

                {/* Partner Logos Section */}
                <section className="bg-background pb-16 pt-16 md:pb-32">
                    <div className="group relative m-auto max-w-5xl px-6">
                        <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                            <Link href="/" className="block text-sm duration-150 hover:opacity-75">
                                <span>Meet Our Customers</span>
                                <ChevronRight className="ml-1 inline-block size-3" />
                            </Link>
                        </div>

                        <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
                            {[
                                ['nvidia.svg', 'Nvidia'],
                                ['column.svg', 'Column'],
                                ['github.svg', 'GitHub'],
                                ['nike.svg', 'Nike'],
                                ['lemonsqueezy.svg', 'Lemon Squeezy'],
                                ['laravel.svg', 'Laravel'],
                                ['lilly.svg', 'Lilly'],
                                ['openai.svg', 'OpenAI'],
                            ].map(([logo, alt], i) => (
                                <div className="flex" key={i}>
                                    <Image
                                        className="mx-auto dark:invert"
                                        src={`https://html.tailus.io/blocks/customers/${logo}`}
                                        alt={`${alt} Logo`}
                                        width={100}
                                        height={28}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
