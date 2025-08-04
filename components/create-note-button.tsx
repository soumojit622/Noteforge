"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNote } from "@/server/notes";
import { Edit3, Loader2, PlusCircleIcon, StickyNote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const formSchema = z.object({
    name: z.string().min(2).max(50),
});

export const CreateNoteButton = ({ notebookId }: { notebookId: string }) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);

            const response = await createNote({
                title: values.name,
                content: {},
                notebookId,
            });

            if (response.success) {
                form.reset();
                toast.success("Note created successfully");
                router.refresh();
                setIsOpen(false);
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error("Failed to create note");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-max">
                    <PlusCircleIcon className=" size-4" />
                    Create Note
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 shadow-xl p-6 transition-all">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                        <StickyNote className="size-5 text-blue-600 dark:text-blue-400" />
                        Create New Note
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
                        Add a short title for your note. You can fill in the content afterward.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        <span className="inline-flex items-center gap-1">
                                            <Edit3 className="size-4 text-blue-500" />
                                            Note Title
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Edit3 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <Input
                                                {...field}
                                                placeholder="e.g. Meeting Notes, Daily Tasks"
                                                className="pl-10 py-2.5 text-sm rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 rounded-md transition"
                        >
                            {isLoading ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <>
                                    <PlusCircleIcon className="size-4" />
                                    Create Note
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>

        </Dialog>
    );
};