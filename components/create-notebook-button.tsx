"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { authClient } from "@/lib/auth-client";
import { createNotebook } from "@/server/notebooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

import { Edit3, Loader2, Notebook, PlusCircle, PlusCircleIcon } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2).max(50),
});

export const CreateNotebookButton = () => {
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
            const userId = (await authClient.getSession()).data?.user.id;

            if (!userId) {
                toast.error("You must be logged in to create a notebook");
                return;
            }

            const response = await createNotebook({
                ...values,
                userId,
            });

            if (response.success) {
                form.reset();
                toast.success("Notebook created successfully");
                router.refresh();
                setIsOpen(false);
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error("Failed to create notebook");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-max">
                    <PlusCircle className=" size-4" />
                    Create Notebook
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl bg-white dark:bg-zinc-800">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                        <Notebook className="size-5 text-blue-600" />
                        Create Notebook
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
                        Give your notebook a name. You can always edit it later.
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
                                        Notebook Name
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Edit3 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <Input
                                                {...field}
                                                placeholder="e.g. Travel Journal, Ideas, Reading Notes"
                                                className="pl-10 py-2.5 text-sm rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-blue-500 transition duration-150"
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
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 rounded-md transition"
                        >
                            {isLoading ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <>
                                    <PlusCircleIcon className="size-4 " />
                                    Create Notebook
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>


        </Dialog>
    );
};
