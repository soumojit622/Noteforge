import { CreateNoteButton } from "@/components/create-note-button";
import NoteCard from "@/components/note-card";
import { PageWrapper } from "@/components/page-wrapper";
import { getNotebookById } from "@/server/notebooks";
import { BookOpen, StickyNote } from "lucide-react";

type Params = Promise<{
  notebookId: string;
}>;

export default async function NotebookPage({ params }: { params: Params }) {
  const { notebookId } = await params;
  const { notebook } = await getNotebookById(notebookId);

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: notebook?.name ?? "Notebook",
          href: `/dashboard/notebook/${notebookId}`,
        },
      ]}
    >
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
          <BookOpen className="size-6 text-blue-600 dark:text-blue-400" />
          {notebook?.name ?? "Notebook"}
        </h1>

        <CreateNoteButton notebookId={notebookId} />
      </div>

      {notebook?.notes?.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notebook.notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="mt-24 flex flex-col items-center text-center text-zinc-500 dark:text-zinc-400">
          <StickyNote className="mb-4 size-10 text-zinc-400 dark:text-zinc-600" />
          <h2 className="text-xl font-semibold">No notes yet</h2>
          <p className="text-sm mt-2 mb-6 max-w-sm">
            You haven’t created any notes in this notebook yet. Click the button above to get started!
          </p>
          <CreateNoteButton notebookId={notebookId} />
        </div>
      )}
    </PageWrapper>
  );
}
