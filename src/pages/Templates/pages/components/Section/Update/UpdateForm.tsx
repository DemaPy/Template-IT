import { FormContent } from "@/components/MustacheEditor/FormContent";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUpdateSection } from "../../../hooks/useSection";
import Mustache from "mustache";
import DOMPurify from "dompurify";
import { lazy, useEffect, useState } from "react";
import toast from "react-hot-toast";

const FormTitle = lazy(() => import("@/components/MustacheEditor/FormTitle"));

type UpdateFormProps = {
  template_id: Template["id"];
  data: Section;
};

const UpdateForm = ({ template_id, data }: UpdateFormProps) => {
  const [err, setErr] = useState("");

  const { isPending, mutate, isError, error } = useUpdateSection({
    invalidate_key: template_id,
  });

  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [placeholders, setPlaceholders] = useState<PlaceholderToCreate[]>(
    data.placeholders
  );

  useEffect(() => {
    if (err) {
      toast.error(err);
    }
  }, [err]);

  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isError, error]);

  const validateTemplate = () => {
    let isValid = true;
    try {
      Mustache.parse(content);
      return isValid;
    } catch (error) {
      isValid = false;
      if (error instanceof Error) {
        setErr(error.message);
      } else {
        setErr("Template validation error.");
      }
      return isValid;
    }
  };

  const validatePlaceholders = () => {
    let isValid = true;
    for (const placeholder of placeholders) {
      if (!placeholder.fallback.trim().length) {
        setErr("Fallback value missing for: " + placeholder.title);
        isValid = false;
      }
    }
    return isValid;
  };

  const handleCreate = () => {
    if (!validateTemplate()) return;
    if (!validatePlaceholders()) return;
    const clean = DOMPurify.sanitize(content, {
      ADD_TAGS: ["style"],
      FORCE_BODY: true,
    });
    mutate({
      title,
      templateId: template_id,
      content: clean,
      placeholders: placeholders.map((item) => {
        for (const placeholder of data.placeholders) {
          if (item.title.toLowerCase() === placeholder.title.toLowerCase()) {
            return {
              ...item,
              id: placeholder.id,
            };
          }
        }
        return item;
      }),
      id: data.id,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <FormTitle setTitle={(title) => setTitle(title)} title={title} />
      <FormContent
        content={content}
        setContent={(content) => setContent(content)}
        placeholders={placeholders}
        setPlaceholders={(placeholders) => {
          setPlaceholders(placeholders);
          setErr("");
        }}
      />
      <DialogFooter>
        <Button disabled={isPending} onClick={handleCreate}>
          Update
        </Button>
      </DialogFooter>
    </div>
  );
};

export default UpdateForm;
