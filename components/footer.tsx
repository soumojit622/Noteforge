"use client"

import { Github, Heart, Linkedin } from "lucide-react"
import Link from "next/link"

export default function FooterSection() {
    return (
        <footer className="w-full border-t bg-background py-6 text-sm text-muted-foreground">
            <div className="max-w-6xl mx-auto px-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Left: Copyright */}
                <div className="text-center sm:text-left">
                    © {new Date().getFullYear()}{" "}
                    <span className="text-foreground font-semibold">NoteForge</span>. All rights reserved.
                </div>

                {/* Center: Made with Love */}
                <div className="text-center flex items-center justify-center gap-1 text-muted-foreground">
                    Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by{" "}
                    <span className="text-foreground font-medium">Soumojit Banerjee</span>
                </div>

                {/* Right: Social Icons */}
                <div className="flex items-center justify-center gap-4">
                    <Link
                        href="https://github.com/soumojit622"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors duration-200"
                        aria-label="GitHub"
                    >
                        <Github className="h-5 w-5" />
                    </Link>

                    <Link
                        href="https://www.linkedin.com/in/soumojit-banerjee-4914b3228/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors duration-200"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
