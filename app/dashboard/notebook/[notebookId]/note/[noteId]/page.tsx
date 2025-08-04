import { PageWrapper } from "@/components/page-wrapper";
import RichTextEditor from "@/components/rich-text-editor";
import { getNoteById } from "@/server/notes";
import { JSONContent } from "@tiptap/react";
import { StickyNote } from "lucide-react";

type Params = Promise<{
  noteId: string;
}>;

export default async function NotePage({ params }: { params: Params }) {
  const { noteId } = await params;
  const { note } = await getNoteById(noteId);

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: note?.notebook?.name ?? "Notebook",
          href: `/dashboard/notebook/${note?.notebook?.id}`,
        },
        {
          label: note?.title ?? "Note",
          href: `/dashboard/note/${noteId}`,
        },
      ]}
    >
      <div className="mb-6 flex items-center gap-3">
        <StickyNote className="size-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          {note?.title ?? "Untitled Note"}
        </h1>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm p-4 sm:p-6">
        <RichTextEditor
          content={note?.content as JSONContent[]}
          noteId={noteId}
        />
      </div>
    </PageWrapper>
  );
}
