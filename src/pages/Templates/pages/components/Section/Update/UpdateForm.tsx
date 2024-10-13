import { useEffect, useState } from "react";
import { UpdateFormProps } from "../../../types/UpdateSection";
import { useUpdateSection } from "../../../hooks/useSection";
import SectionSkeleton from "./SectionSkeleton";
import toast from "react-hot-toast";
import { FormTitle } from "@/components/MustacheEditor/FormTitle";
import { FormContent } from "@/components/MustacheEditor/FormContent";
import Mustache from "mustache";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import DOMPurify from "dompurify";

const UpdateForm = ({ section, template_id }: UpdateFormProps) => {
  const [err, setErr] = useState("");

  const [title, setTitle] = useState(section.title);
  const [content, setContent] = useState(section.content);
  const [placeholders, setPlaceholders] = useState<PlaceholderToCreate[]>(
    section.placeholders
  );

  const { isPending, mutate, isError, error } = useUpdateSection({
    invalidate_key: template_id,
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
      templateId: template_id,
      content: clean,
      placeholders,
      id: section.id,
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (err) {
      toast.error(err);
    }
  }, [err]);

  if (isPending) return <SectionSkeleton />;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"default"}>
          <Edit className="w-4 h-4 text-yellow-400" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
        </DialogHeader>
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
        </div>
        <DialogFooter>
          <Button disabled={isPending} onClick={handleCreate}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateForm;
