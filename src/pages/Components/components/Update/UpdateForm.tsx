import { FormTitle } from "@/components/MustacheEditor/FormTitle";
import { FormContent } from "@/components/MustacheEditor/FormContent";
import { useEffect, useState } from "react";
import Mustache from "mustache";
import { useComponentUpdate } from "../../pages/hooks/useComponent";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  component: Component;
};

const UpdateForm = ({ component }: Props) => {
  const [err, setErr] = useState("");

  const [title, setTitle] = useState(component.title);
  const [content, setContent] = useState(component.content);
  const [placeholders, setPlaceholders] = useState<PlaceholderToCreate[]>(
    component.placeholders
  );

  const { isPending, mutate, isError, error } = useComponentUpdate({
    invalidate_key: component.id,
  });

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
      content: clean,
      placeholders: placeholders.map((item) => {
        for (const placeholder of component.placeholders) {
          if (item.title.toLowerCase() === placeholder.title.toLowerCase()) {
            return {
              ...item,
              id: placeholder.id,
            };
          }
        }
        return item;
      }),
      id: component.id,
    });
  };

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

  return (
    <div className="grid gap-4">
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
