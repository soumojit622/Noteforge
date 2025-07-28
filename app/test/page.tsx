import { Button } from '@/components/ui/button'
import React from 'react'

const TestPage = () => {
    return (
        <div>
            <Button>✨ Fancy Button</Button>
            <Button variant="destructive">❌ Delete</Button>
            <Button variant="outline">📦 Outline</Button>
            <Button variant="secondary">🎯 Secondary</Button>
            <Button variant="ghost">👻 Ghost</Button>
            <Button variant="link">🔗 Link</Button>
            <Button size="icon">
                <svg className="size-4" />
            </Button>
        </div >
    )
}

export default TestPage