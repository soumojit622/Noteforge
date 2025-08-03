// import { CreateNotebookButton } from "@/components/create-notebook-button";
// import NotebookCard from "@/components/notebook-card";
import { CreateNotebookButton } from "@/components/create-notebook-button";
import NotebookCard from "@/components/notebook-card";
import { PageWrapper } from "@/components/page-wrapper";
import { getNotebooks } from "@/server/notebooks";
import { Notebook, FilePlus } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const notebooks = await getNotebooks();

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
          <Notebook className="size-6 text-blue-600 dark:text-blue-400" />
          Notebooks
        </h1>

        <CreateNotebookButton />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notebooks.success &&
          notebooks?.notebooks?.map((notebook) => (
            <Link
              href={`/dashboard/${notebook.id}`}
              key={notebook.id}
              className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm transition-all hover:border-blue-600 hover:shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                  <Notebook className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 group-hover:underline">
                    {notebook.name}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {notebook.notes?.length ?? 0} note
                    {notebook.notes?.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>


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
