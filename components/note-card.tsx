"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Note } from "@/db/schema";
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
import { AlertCircle, Check, Eye, FileText, Loader2, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteNote } from "@/server/notes";

interface NotebookCardProps {
    note: Note;
}

export default function NoteCard({ note }: NotebookCardProps) {
    const router = useRouter();

    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await deleteNote(note.id);

            if (response.success) {
                toast.success("Note deleted successfully");
                router.refresh();
            }
        } catch {
            toast.error("Failed to delete note");
        } finally {
            setIsDeleting(false);
            setIsOpen(false);
        }
    };

    return (
        <Card className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-md transition-shadow hover:shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                    <span className="inline-flex items-center gap-2">
                        <FileText className="size-5 text-blue-600 dark:text-blue-400" />
                        {note.title}
                    </span>
                </CardTitle>
            </CardHeader>

            <CardContent className="pt-1">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
                    A personal note to capture your thoughts and ideas.
                </p>
            </CardContent>

            <CardFooter className="mt-4 flex justify-end gap-3">
                <Link href={`/dashboard/notebook/${note.notebookId}/note/${note.id}`}>
                    <Button
                        variant="outline"
                        className="text-sm flex items-center gap-1 hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                        <Eye className="size-4" />
                        View
                    </Button>
                </Link>

                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className="text-sm flex items-center gap-1"
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <>
                                    <Trash2 className="size-4" />
                                    Delete
                                </>
                            )}
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 shadow-2xl p-6 transition-all">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2 text-lg font-semibold text-red-600 dark:text-red-500">
                                <span className="flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900 p-1.5">
                                    <AlertCircle className="size-5 text-red-600 dark:text-red-400" />
                                </span>
                                Confirm Deletion
                            </AlertDialogTitle>
                            <AlertDialogDescription className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                Are you sure you want to permanently delete this note? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter className="mt-6 flex justify-end gap-3">
                            <AlertDialogCancel className="text-sm px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 transition flex items-center gap-2">
                                <X className="size-4" />
                                Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                                onClick={handleDelete}
                                className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition flex items-center gap-2"
                            >
                                <Check className="size-4" />
                                Confirm
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>

    );
}