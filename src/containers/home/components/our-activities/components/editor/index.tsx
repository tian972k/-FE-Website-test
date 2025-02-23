"use client";
import { Button } from "@app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select";
import { Editor as EditorType, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Strike from "@tiptap/extension-strike";

import {
  Bold,
  Italic,
  UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";

const FONT_SIZES = [
  { label: "12px", value: "12" },
  { label: "14px", value: "14" },
  { label: "16px", value: "16" },
  { label: "18px", value: "18" },
  { label: "20px", value: "20" },
  { label: "24px", value: "24" },
  { label: "32px", value: "32" },
];
const MenuBar = ({ editor }: { editor: EditorType }) => {
  if (!editor) {
    return null;
  }

  const getFontSize = () => {
    const fontSize = editor.getAttributes("textStyle").fontSize;
    return fontSize?.replace("px", "") || "16";
  };
  return (
    <div className="flex flex-wrap gap-1 p-2 border-b items-center">
      <Select
        value={getFontSize()}
        onValueChange={(value) => {
          editor.chain().focus().setFontSize(value).run();
        }}
      >
        <SelectTrigger className="w-[5rem] border-none shadow-none text-[#0E9594]">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          {FONT_SIZES.map((size) => (
            <SelectItem key={size.value} value={size.value}>
              {size.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="h-6 w-px bg-border mx-2" />
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "button-editor active" : "button-editor"}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "button-editor active" : "button-editor"}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "button-editor active" : "button-editor"}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "button-editor active" : "button-editor"}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <div className="h-6 w-px bg-border mx-2" />
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive({ textAlign: "left" }) ? "button-editor active" : "button-editor"
        }
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" }) ? "button-editor active" : "button-editor"
        }
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive({ textAlign: "right" }) ? "button-editor active" : "button-editor"
        }
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <div className="h-6 w-px bg-border mx-2" />
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "button-editor active" : "button-editor"}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "button-editor active" : "button-editor"}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );
};

import React from "react";
import { FontSize } from "./extension/FontSize";

const Editor = ({ onChange, value }: { onChange: (value: string) => void; value: string }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      FontSize.configure({ types: ["textStyle"] }),
      TextStyle,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Strike,
    ],
    onUpdate({ editor }) {
      if (onChange) onChange(editor.getHTML());
    },
    content: value ? value : null,
  });
  if (!editor) return;
  return (
    <div className="editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="edit-content" placeholder="type message" />
    </div>
  );
};

export default Editor;
