import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Mustache from "mustache";
import ComponentUpdateSkeleton from "./ComponentSkeleton";
import { Edit } from "lucide-react";
import { FormTitle } from "@/components/MustacheEditor/FormTitle";
import { FormContent } from "@/components/MustacheEditor/FormContent";
import { useComponentUpdate } from "../../pages/hooks/useComponent";
import DOMPurify from "dompurify";

const UpdateForm = ({ component }: UpdateFormProps) => {
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
    const clean = DOMPurify.sanitize(content);
    mutate({
      title,
      content: clean,
      placeholders,
      id: component.id,
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

  if (isPending) return <ComponentUpdateSkeleton />;

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
