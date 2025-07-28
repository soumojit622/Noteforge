'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import {
    Menu,
    X,
    Sparkles,
    Lightbulb,
    BadgeDollarSign,
    Info,
    LogIn,
    UserPlus,
    Github
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useScroll } from 'motion/react'
import { ModeToggle } from './ModeToggle'
import Image from 'next/image'

const menuItems = [
    { name: 'Features', href: '#features', icon: Sparkles },
    { name: 'Solution', href: '#solution', icon: Lightbulb },
    { name: 'About', href: '#about', icon: Info }
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                className={cn(
                    'fixed z-20 w-full border-b transition-colors duration-150',
                    scrolled && 'bg-background/50 backdrop-blur-3xl'
                )}
            >
                <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        {/* Left: Logo + Desktop Nav */}
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link href="/" aria-label="home" className="flex items-center space-x-2">
                                <Image
                                    src="/logo.svg"
                                    alt="Noteforge Logo"
                                    width={32}
                                    height={32}
                                    className="rounded-md"
                                />
                                <span className="text-lg font-semibold tracking-tight text-foreground">
                                    Noteforge
                                </span>
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                            >
                                {menuState ? (
                                    <X className="size-6 text-foreground transition-transform duration-200" />
                                ) : (
                                    <Menu className="size-6 text-foreground transition-transform duration-200" />
                                )}
                            </button>

                            {/* Desktop Nav Links */}
                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map(({ name, href, icon: Icon }, index) => (
                                        <li key={index}>
                                            <Link
                                                href={href}
                                                className="flex items-center gap-1.5 text-muted-foreground hover:text-accent-foreground duration-150"
                                            >
                                                <Icon className="size-4" />
                                                <span>{name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>


                        {/* Right: Mobile & Desktop Auth Buttons + Mode Toggle */}
                        <div
                            className={cn(
                                'bg-background mb-6 hidden w-full flex-wrap items-center justify-end space-y-6 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:flex-row lg:items-center lg:gap-4 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent',
                                menuState && 'block'
                            )}
                        >
                            {/* Mobile Menu Links */}
                            <div className="lg:hidden w-full">
                                <ul className="space-y-6 text-base mb-4">
                                    {menuItems.map(({ name, href, icon: Icon }, index) => (
                                        <li key={index}>
                                            <Link
                                                href={href}
                                                className="flex items-center gap-2 text-muted-foreground hover:text-accent-foreground duration-150"
                                            >
                                                <Icon className="size-4" />
                                                <span>{name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Mode Toggle & Auth Buttons */}
                            <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-end sm:gap-3 md:w-fit space-y-3 sm:space-y-0">
                                <ModeToggle />

                                {/* ✅ GitHub Button */}
                                <Button asChild variant="outline" size="sm">
                                    <Link
                                        href="https://github.com/soumojit622/Noteforge"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5"
                                    >
                                        <Github className="size-4" />
                                        <span>GitHub</span>
                                    </Link>
                                </Button>

                                <Button asChild variant="outline" size="sm">
                                    <Link href="/login" className="flex items-center gap-1.5">
                                        <LogIn className="size-4" />
                                        <span>Login</span>
                                    </Link>
                                </Button>
                                <Button asChild size="sm">
                                    <Link href="/signup" className="flex items-center gap-1.5">
                                        <UserPlus className="size-4" />
                                        <span>Sign Up</span>
                                    </Link>
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
