"use client";

import {
    useEditor,
    EditorContent,
    useEditorState,
    type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Undo,
    Redo,
    Bold,
    Italic,
    Strikethrough,
    Code,
    Underline,
    Link,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Plus,
    ChevronDown,
    Superscript,
    Subscript,
} from "lucide-react";
import { updateNote } from "@/server/notes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface RichTextEditorProps {
    content?: JSONContent[];
    noteId?: string;
}

const RichTextEditor = ({ content, noteId }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [StarterKit, Document, Paragraph, Text],
        immediatelyRender: false,
        autofocus: true,
        editable: true,
        injectCSS: false,
        onUpdate: ({ editor }) => {
            if (noteId) {
                const content = editor.getJSON();
                updateNote(noteId, { content });
            }
        },
        content: content ?? {
            type: "doc",
            content: [
                {
                    type: "heading",
                    attrs: { level: 1 },
                    content: [{ type: "text", text: "Getting started" }],
                },
                {
                    type: "paragraph",
                    content: [
                        { type: "text", text: "Welcome to the " },
                        {
                            type: "text",
                            text: "Simple Editor",
                            marks: [{ type: "italic" }],
                        },
                        { type: "text", text: " template! This template integrates " },
                        { type: "text", text: "open source", marks: [{ type: "bold" }] },
                        {
                            type: "text",
                            text: " UI components and Tiptap extensions licensed under ",
                        },
                        { type: "text", text: "MIT", marks: [{ type: "bold" }] },
                        { type: "text", text: "." },
                    ],
                },
                {
                    type: "paragraph",
                    content: [
                        { type: "text", text: "Integrate it by following the " },
                        {
                            type: "text",
                            text: "Tiptap UI Components docs",
                            marks: [{ type: "code" }],
                        },
                        { type: "text", text: " or using our CLI tool." },
                    ],
                },
                {
                    type: "codeBlock",
                    content: [{ type: "text", text: "npx @tiptap/cli init" }],
                },
                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Features" }],
                },
                {
                    type: "blockquote",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: "A fully responsive rich text editor with built-in support for common formatting and layout tools. Type markdown ",
                                },
                                { type: "text", text: "**", marks: [{ type: "bold" }] },
                                { type: "text", text: " or use keyboard shortcuts " },
                                { type: "text", text: "⌘+B", marks: [{ type: "code" }] },
                                { type: "text", text: " for most all common markdown marks." },
                            ],
                        },
                    ],
                },
            ],
        },
    });

    const editorState = useEditorState({
        editor,
        selector: (ctx) => {
            if (!ctx.editor) return {};
            return {
                isBold: ctx.editor?.isActive("bold"),
                canBold: ctx.editor?.can().chain().focus().toggleBold().run(),
                isItalic: ctx.editor?.isActive("italic"),
                canItalic: ctx.editor?.can().chain().focus().toggleItalic().run(),
                isStrike: ctx.editor?.isActive("strike"),
                canStrike: ctx.editor?.can().chain().focus().toggleStrike().run(),
                isCode: ctx.editor?.isActive("code"),
                canCode: ctx.editor?.can().chain().focus().toggleCode().run(),
                isParagraph: ctx.editor?.isActive("paragraph"),
                isHeading1: ctx.editor?.isActive("heading", { level: 1 }),
                isHeading2: ctx.editor?.isActive("heading", { level: 2 }),
                isHeading3: ctx.editor?.isActive("heading", { level: 3 }),
                isBulletList: ctx.editor?.isActive("bulletList"),
                isOrderedList: ctx.editor?.isActive("orderedList"),
                isCodeBlock: ctx.editor?.isActive("codeBlock"),
                isBlockquote: ctx.editor?.isActive("blockquote"),
                canUndo: ctx.editor?.can().chain().focus().undo().run(),
                canRedo: ctx.editor?.can().chain().focus().redo().run(),
            };
        },
    });

    const getActiveHeading = () => {
        if (editorState?.isHeading1) return "H1";
        if (editorState?.isHeading2) return "H2";
        if (editorState?.isHeading3) return "H3";
        return "H1";
    };

    return (
        <div className="w-full max-w-7xl bg-card text-card-foreground rounded-lg overflow-hidden border mx-auto">
            <TooltipProvider delayDuration={100}>
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-1 p-2 sm:p-3 md:p-4 bg-muted/50 border-b overflow-x-auto">

                    {/* Undo */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => editor?.chain().focus().undo().run()}
                                disabled={!editorState?.canUndo}
                                className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                            >
                                <Undo className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Undo</TooltipContent>
                    </Tooltip>

                    {/* Redo */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => editor?.chain().focus().redo().run()}
                                disabled={!editorState?.canRedo}
                                className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                            >
                                <Redo className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Redo</TooltipContent>
                    </Tooltip>

                    <div className="w-px h-6 bg-border mx-1" />

                    {/* Heading Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent gap-1"
                            >
                                {getActiveHeading()}
                                <ChevronDown className="h-3 w-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-popover border">
                            <DropdownMenuItem onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
                                Heading 1
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
                                Heading 2
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
                                Heading 3
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editor?.chain().focus().setParagraph().run()}>
                                Paragraph
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Lists */}
                    {[{ icon: List, label: "Bullet List", active: editorState?.isBulletList, handler: () => editor?.chain().focus().toggleBulletList().run() },
                    { icon: ListOrdered, label: "Numbered List", active: editorState?.isOrderedList, handler: () => editor?.chain().focus().toggleOrderedList().run() }]
                        .map(({ icon: Icon, label, active, handler }, i) => (
                            <Tooltip key={i}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handler}
                                        className={`size-8 p-0 hover:bg-accent ${active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{label}</TooltipContent>
                            </Tooltip>
                        ))}

                    <div className="w-px h-6 bg-border mx-1" />

                    {/* Formatting */}
                    {[
                        { icon: Bold, label: "Bold", active: editorState?.isBold, handler: () => editor?.chain().focus().toggleBold().run(), disabled: !editorState?.canBold },
                        { icon: Italic, label: "Italic", active: editorState?.isItalic, handler: () => editor?.chain().focus().toggleItalic().run(), disabled: !editorState?.canItalic },
                        { icon: Strikethrough, label: "Strikethrough", active: editorState?.isStrike, handler: () => editor?.chain().focus().toggleStrike().run(), disabled: !editorState?.canStrike },
                        { icon: Code, label: "Code", active: editorState?.isCode, handler: () => editor?.chain().focus().toggleCode().run(), disabled: !editorState?.canCode },
                        { icon: Underline, label: "Underline", active: false, handler: () => { }, disabled: false }
                    ].map(({ icon: Icon, label, active, handler, disabled }, i) => (
                        <Tooltip key={i}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handler}
                                    disabled={disabled}
                                    className={`size-8 p-0 hover:bg-accent ${active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
                                >
                                    <Icon className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{label}</TooltipContent>
                        </Tooltip>
                    ))}

                    <div className="w-px h-6 bg-border mx-1" />

                    {/* Extras */}
                    {[{ icon: Link, label: "Link" }, { icon: Superscript, label: "Superscript" }, { icon: Subscript, label: "Subscript" }]
                        .map(({ icon: Icon, label }, i) => (
                            <Tooltip key={i}>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent">
                                        <Icon className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{label}</TooltipContent>
                            </Tooltip>
                        ))}

                    <div className="w-px h-6 bg-border mx-1" />

                    {/* Alignments */}
                    {[{ icon: AlignLeft, label: "Align Left" }, { icon: AlignCenter, label: "Align Center" }, { icon: AlignRight, label: "Align Right" }, { icon: AlignJustify, label: "Justify" }]
                        .map(({ icon: Icon, label }, i) => (
                            <Tooltip key={i}>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent">
                                        <Icon className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{label}</TooltipContent>
                            </Tooltip>
                        ))}

                    <div className="flex-1" />
                </div>
            </TooltipProvider>

            {/* Editor Content */}
            <div className="min-h-[300px] sm:min-h-[400px] md:min-h-[500px] p-3 sm:p-4 md:p-6 bg-card">
                <EditorContent
                    editor={editor}
                    className="prose prose-neutral dark:prose-invert max-w-none focus:outline-none 
            [&_.ProseMirror]:focus:outline-none 
            [&_.ProseMirror]:min-h-[300px] sm:[&_.ProseMirror]:min-h-[400px] md:[&_.ProseMirror]:min-h-[500px] 
            [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-4 
            [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-3 
            [&_.ProseMirror_p]:mb-4 
            [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-border [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic 
            [&_.ProseMirror_pre]:bg-muted [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:rounded [&_.ProseMirror_pre]:overflow-x-auto 
            [&_.ProseMirror_code]:bg-muted [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:rounded"
                />
            </div>
        </div>
    );
};

export default RichTextEditor;