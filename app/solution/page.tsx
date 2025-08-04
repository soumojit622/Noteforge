'use client'

import Link from 'next/link'
import {
    Layers3,
    Brain,
    FileText,
    SearchCheck,
    UserCheck,
    BarChart4,
    ArrowLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const solutions = [
    {
        icon: Layers3,
        title: 'Disorganized Notes',
        description:
            'NoteForge organizes your content into clean folders, searchable tags, and intuitive structure.'
    },
    {
        icon: Brain,
        title: 'Creative Block',
        description:
            'Boost creativity with AI-driven suggestions, rewrites, and smart content improvements.'
    },
    {
        icon: FileText,
        title: 'Scattered Workflows',
        description:
            'Unify journals, docs, and ideas into one workspace to keep everything flowing smoothly.'
    },
    {
        icon: SearchCheck,
        title: 'Lack of Focus',
        description:
            'A minimal editor that helps you stay distraction-free, with smart inline tools when needed.'
    },
    {
        icon: UserCheck,
        title: 'Solo to Team',
        description:
            'Seamless sharing, real-time collaboration, and version tracking — whether solo or in a team.'
    },
    {
        icon: BarChart4,
        title: 'No Progress Tracking',
        description:
            'Visualize your writing trends, track streaks, and understand how you work best.'
    }
]

export default function SolutionPage() {
    return (
        <main className="min-h-screen bg-background text-foreground py-24 px-6 relative">
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

            <div className="mx-auto max-w-6xl text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                    Solving Real Problems <span className="text-blue-400">with Clarity</span>
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto text-lg mb-16">
                    From messy thoughts to polished ideas — NoteForge removes friction from your writing journey.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((solution, index) => (
                        <div
                            key={index}
                            className={cn(
                                'rounded-2xl p-6 border bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300'
                            )}
                        >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-blue-400 mb-4">
                                <solution.icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                            <p className="text-sm text-muted-foreground">{solution.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
