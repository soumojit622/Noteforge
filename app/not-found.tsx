import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass, Home, Mail } from "lucide-react"

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black px-6 py-12 text-center transition-colors duration-300">
            <Compass className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
            <h1 className="text-6xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
                Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link href="/" passHref>
                    <Button size="lg">
                        <Home className="w-4 h-4" />
                        Go back home
                    </Button>
                </Link>
                <Link href="/contact" passHref>
                    <Button variant="outline" size="lg">
                        <Mail className="w-4 h-4" />
                        Contact Support
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound
