'use client'

import {
    Rocket,
    Settings,
    Wand2,
    Cloud,
    ShieldCheck,
    LayoutDashboard,
    ArrowLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

const features = [
    {
        icon: Rocket,
        title: 'Blazing Fast',
        description: 'Built for speed with optimized performance and minimal load times.'
    },
    {
        icon: Wand2,
        title: 'AI-Powered Writing',
        description: 'Get smart suggestions, corrections, and productivity tips in real-time.'
    },
    {
        icon: LayoutDashboard,
        title: 'Organized Workspace',
        description: 'Manage notes, tags, and folders with a beautiful and intuitive UI.'
    },
    {
        icon: Cloud,
        title: 'Cloud Sync',
        description: 'Access your notes anywhere, anytime. Data is securely stored in the cloud.'
    },
    {
        icon: Settings,
        title: 'Customizable',
        description: 'Themes, layouts, and behavior — tailor every detail to your workflow.'
    },
    {
        icon: ShieldCheck,
        title: 'Secure by Design',
        description: 'End-to-end encryption and private access keep your work safe and yours.'
    }
]

export default function FeaturesPage() {
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
            <div className="mx-auto max-w-6xl text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                    Why Choose <span className="text-blue-400">Noteforge</span>?
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto text-lg mb-16">
                    Our platform helps you focus, organize, and write better with delightful tools.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={cn(
                                'rounded-2xl p-6 border bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300'
                            )}
                        >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-blue-400 mb-4">
                                <feature.icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
