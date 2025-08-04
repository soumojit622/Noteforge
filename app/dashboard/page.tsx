import { CreateNotebookButton } from "@/components/create-notebook-button";
import NotebookCard from "@/components/notebook-card";
import { PageWrapper } from "@/components/page-wrapper";
import { getNotebooks } from "@/server/notebooks";
import { Notebook, FilePlus } from "lucide-react";

export default async function Page() {
  const notebooks = await getNotebooks();

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
      {/* Heading and Create Button */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
          <Notebook className="size-6 text-blue-600 dark:text-blue-400" />
          Notebooks
        </h1>

        <CreateNotebookButton />
      </div>

      {/* Notebook Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notebooks.success &&
          notebooks?.notebooks?.map((notebook) => (
            <NotebookCard key={notebook.id} notebook={notebook} />
          ))}
      </div>

      {/* Empty State */}
      {notebooks.success && notebooks?.notebooks?.length === 0 && (
        <div className="mt-20 flex flex-col items-center justify-center text-center text-zinc-600 dark:text-zinc-400">
          <FilePlus className="mb-4 size-10 text-zinc-400 dark:text-zinc-600" />
          <h2 className="text-xl font-semibold">No notebooks found</h2>
          <p className="text-sm mt-2 mb-6">
            Start by creating your first notebook to organize your notes.
          </p>
          <CreateNotebookButton />
        </div>
      )}
    </PageWrapper>
  );
}
