"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Paperclip } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@app/components/ui/button";
import Icon from "@app/components/icon";
import Editor from "../editor";

// Validation Schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(5, "Message should be at least 5 characters"),
  file: z.any().optional(),
});

// Form Type
type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const t = useTranslations();

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFileName(e.target.files[0].name);
      setValue("file", e.target.files[0]);
    }
  };

  // Submit handler
  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 contact-form">
      {/* Name */}
      <div className="item">
        <label className="label">{t.raw("bloc_2_2.btn_1")[0]}:</label>
        <input
          type="text"
          {...register("name")}
          className="input"
          placeholder={t.raw("bloc_2_2.btn_1")[1]}
        />
      </div>
      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

      {/* Email */}
      <div className="item">
        <label className="label">{t.raw("bloc_2_2.btn_2")[0]}:</label>
        <input
          type="email"
          {...register("email")}
          className="input"
          placeholder={t.raw("bloc_2_2.btn_2")[1]}
        />
      </div>
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

      {/* Message */}
      <div className="item">
        <label className="label">{t.raw("bloc_2_2.btn_3")}:</label>
        <Controller
          name="message"
          control={control}
          render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
        />
      </div>
      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}

      {/* File Upload */}
      <div className="item">
        <label className="label">{t.raw("bloc_2_2.btn_4")[0]}:</label>
        <div className="upload-file">
          <label className="flex items-center gap-2 text-blue-500 cursor-pointer">
            <Paperclip className="w-5 h-5" />
            <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
            <span className="label-file">{fileName || t.raw("bloc_2_2.btn_4")[1]}</span>
          </label>
          <span className="file-name">(*{t.raw("bloc_2_2.btn_4")[2]})</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <div className="btn-group">
          <Button type="button" onClick={() => reset()} className="btn-clear-all">
            {t("bloc_2_2.btn_5")}
          </Button>
          <Button type="submit" className="btn-send">
            {t("bloc_2_2.btn_6")} <Icon iconName="Send" className="icon" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
