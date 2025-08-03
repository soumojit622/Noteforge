"use client";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar";
import { ChevronRight, FileText } from "lucide-react";
import { useQueryState } from "nuqs";
import clsx from "clsx";

interface SidebarDataProps {
    data: {
        navMain: {
            title: string;
            items: { title: string; url: string }[];
        }[];
    };
}

export function SidebarData({ data }: SidebarDataProps) {
    const [search] = useQueryState("search", { defaultValue: "" });

    const filteredData = data.navMain.filter((item) => {
        const notebookMatches = item.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const noteMatches = item.items.some((note) =>
            note.title.toLowerCase().includes(search.toLowerCase())
        );

        return notebookMatches || noteMatches;
    });

    return (
        <>
            {filteredData.map((item) => (
                <Collapsible
                    key={item.title}
                    defaultOpen
                    className="group/collapsible"
                >
                    <SidebarGroup className="mb-3 rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <SidebarGroupLabel
                            asChild
                            className={clsx(
                                "group/label flex items-center justify-between gap-2 px-4 py-2 bg-zinc-50 dark:bg-zinc-900",
                                "text-sm font-semibold text-zinc-700 dark:text-zinc-200",
                                "hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-zinc-800 dark:hover:text-blue-400",
                                "transition-colors cursor-pointer"
                            )}
                        >
                            <CollapsibleTrigger className="flex w-full items-center gap-2">
                                <span className="truncate">{item.title}</span>
                                {item.items.length > 0 && (
                                    <ChevronRight className="ml-auto size-4 text-muted-foreground transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                )}
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>

                        <CollapsibleContent>
                            <SidebarGroupContent className="bg-white dark:bg-zinc-950">
                                {/* ⬆️ Removed border-t here to prevent double borders */}
                                <SidebarMenu>
                                    {item.items.map((note) => (
                                        <SidebarMenuItem key={note.title}>
                                            <SidebarMenuButton
                                                asChild
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                            >
                                                <a href={note.url} className="flex items-center gap-2 w-full">
                                                    <FileText className="size-4 text-muted-foreground" />
                                                    <span className="truncate">{note.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>

                </Collapsible>
            ))}
        </>
    );
}
