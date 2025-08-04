'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FAQsThree() {
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: 'calendar',
            question: 'Can I schedule reminders for my notes?',
            answer:
                'Yes! NoteForge lets you attach due dates and reminders to any note. You’ll get timely notifications, so you never miss a task.',
        },
        {
            id: 'item-2',
            icon: 'dollar-sign',
            question: 'How does billing work?',
            answer:
                'We offer both monthly and annual billing. You can manage your plan and payment method anytime from your account settings.',
        },
        {
            id: 'item-3',
            icon: 'upload-cloud',
            question: 'Can I import content from other tools?',
            answer:
                'Absolutely. You can import notes from Markdown files, Google Docs, and even Notion — with full formatting preserved.',
        },
        {
            id: 'item-4',
            icon: 'languages',
            question: 'Is NoteForge available in multiple languages?',
            answer:
                'Yes. NoteForge is currently available in English, Spanish, French, and Hindi. More languages are on the way!',
        },
        {
            id: 'item-5',
            icon: 'activity',
            question: 'How can I monitor my productivity?',
            answer:
                'With our built-in insights dashboard, you can view writing streaks, word counts, and usage stats to stay on track.',
        },
    ]

    return (
        <section className="bg-muted dark:bg-background py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    {/* Left Section */}
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold text-foreground">
                                Got Questions?
                            </h2>
                            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                                We’ve got answers. Still unsure?{' '}
                                <Link
                                    href="#"
                                    className="text-blue-400 font-medium hover:underline"
                                >
                                    Reach out to our support team
                                </Link>
                                .
                            </p>
                        </div>
                    </div>

                    {/* Right Section - Accordion */}
                    <div className="md:w-2/3">
                        <Accordion type="single" collapsible className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background rounded-lg border px-4 shadow-sm transition-all"
                                >
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3 text-left">
                                            <div className="flex size-6 text-blue-400">
                                                <DynamicIcon name={item.icon} className="m-auto size-4" />
                                            </div>
                                            <span className="text-base font-medium text-foreground">
                                                {item.question}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-muted-foreground text-base leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
