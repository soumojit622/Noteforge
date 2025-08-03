import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { SidebarData } from "./sidebar-data";
import { getNotebooks } from "@/server/notebooks";

import { BookOpenText, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const notebooks = await getNotebooks();

  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      ...(notebooks.notebooks?.map((notebook) => ({
        title: notebook.name,
        url: `/dashboard/${notebook.id}`,
        icon: <BookOpenText className="size-4 text-blue-500 inline-block mr-2" />,
        items: notebook.notes.map((note) => ({
          title: note.title,
          url: `/dashboard/notebook/${notebook.id}/note/${note.id}`,
          icon: <StickyNote className="size-3 text-muted-foreground inline-block mr-2" />,
        })),
      })) ?? []),
    ],
  };

  return (
    <Sidebar
      {...props}
      className={cn(
        "bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shadow-md"
      )}
    >
      {/* Sidebar Header */}
      <SidebarHeader className="flex flex-col gap-4 p-5 border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="NoteForge Logo"
            width={36}
            height={36}
            className="rounded-md shadow-sm"
          />
          <span className="text-xl font-bold tracking-tight">
            NoteForge
          </span>
        </Link>

        <React.Suspense fallback={<div className="text-sm text-gray-400">Searching...</div>}>
          <SearchForm />
        </React.Suspense>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent
        className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700"
      >
        <SidebarData data={data} />
      </SidebarContent>

      {/* Sidebar Rail (optional shortcut buttons) */}
      <SidebarRail />
    </Sidebar>
  );
}
