import { lazy, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreatePlaceholders } from "@/services/types/Placeholder";
import toast from "react-hot-toast";
import Mustache from "mustache";
import { FormContent } from "./FormContent";
import { CirclePlus } from "lucide-react";

const FormTitle = lazy(() => import("@/components/MustacheEditor/FormTitle"));

export type PayloadProps = {
  title: string;
  content: string;
  placeholders: CreatePlaceholders["placeholders"];
};

export const CreateContentForm = ({
  onSubmit,
  isPending,
}: {
  isPending: boolean;
  onSubmit: (payload: PayloadProps) => void;
}) => {
  const [err, setErr] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [placeholders, setPlaceholders] = useState<
    CreatePlaceholders["placeholders"]
  >([]);

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
    const payload = {
      content,
      title: title,
      placeholders,
    };
    onSubmit(payload);
  };

  useEffect(() => {
    if (err) {
      toast.error(err);
    }
  }, [err]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"} size={"sm"}>
          <CirclePlus className="w-4 h-4" />
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
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
