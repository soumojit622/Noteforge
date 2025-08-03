"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Notebook } from "@/db/schema";
import Link from "next/link";
import { Button } from "./ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { deleteNotebook } from "@/server/notebooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NotebookCardProps {
    notebook: Notebook;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
    const router = useRouter();

    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await deleteNotebook(notebook.id);

            if (response.success) {
                toast.success("Notebook deleted successfully");
                router.refresh();
            }
        } catch {
            toast.error("Failed to delete notebook");
        } finally {
            setIsDeleting(false);
            setIsOpen(false);
        }
    };
    return (
        <Card className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm transition hover:shadow-md">
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                    {notebook.name}
                    <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
                        {notebook.notes?.length ?? 0} note{notebook.notes?.length !== 1 ? "s" : ""}
                    </span>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Organize and manage your thoughts with ease.
                </p>
            </CardContent>

            <CardFooter className="mt-2 flex justify-end gap-2">
                <Link href={`/dashboard/notebook/${notebook.id}`}>
                    <Button variant="outline" className="text-sm">
                        View
                    </Button>
                </Link>

                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className="text-sm"
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <>
                                    <Trash2 className="size-4 mr-1" />
                                    Delete
                                </>
                            )}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-red-600">
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the notebook
                                and all its notes.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>

    );
}