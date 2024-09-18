import { ShowValidationError } from "@/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { UpdateFormProps } from "../../../types/UpdateSection";
import { extractFields } from "@/components/MustacheEditor/utils/extractFields";
import MustacheEditor from "@/components/MustacheEditor/MustacheEditor";
import Placehodlers from "@/pages/Components/components/Placehodlers";
import { Button } from "@/components/ui/button";
import { useUpdateSection } from "../../../hooks/useSection";
import { ErrorPage } from "@/pages/Error/Error";
import SectionSkeleton from "./SectionSkeleton";
import { DialogFooter } from "@/components/ui/dialog";

const UpdateForm = ({ section, template_id }: UpdateFormProps) => {
  const [title, setTitle] = useState(section.title);
  const [content, setContent] = useState(section.content);
  const [tab, setTab] = useState<string>("content");
  const [placeholders, setPlaceholders] = useState<Placeholder[]>(
    section.placeholders
  );

  const [errorContent, setErrorContent] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [fallbackError, setErrorFallback] = useState("");

  const { isPending, mutate, isError, error } = useUpdateSection({
    invalidate_key: template_id,
  });

  if (isPending) return <SectionSkeleton />;

  if (isError) {
    return (
      <ErrorPage
        error={error}
        message={error.message}
        path={`/templates/${template_id}`}
      />
    );
  }
  console.log(placeholders);

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-left">
        Title
      </Label>
      <Input
        id="name"
        placeholder="section title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        className="col-span-4"
      />
      <ShowValidationError error={errorTitle} />
      <div className="col-span-4 flex gap-4 flex-col">
        <Tabs
          value={tab}
          onValueChange={(t) => {
            if (!t) return;

            if (t === "placeholders") {
              try {
                const parsedTemplate = extractFields({
                  template: content,
                });
                if ("tokens" in parsedTemplate) {
                  setErrorContent("");
                  setPlaceholders(placeholders)
                  setTab(t);
                }
                // TODO: set position cursor at problematic position tag
                return;
              } catch (error) {
                if (error instanceof Error) {
                  setErrorContent(error.message);
                }
              }
            }
            setTab("content");
          }}
        >
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="placeholders">Placeholders</TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <MustacheEditor
              value={content}
              setContent={(template) => setContent(template)}
            />
            <ShowValidationError error={errorContent} />
          </TabsContent>
          <TabsContent value="placeholders">
            <div className="flex flex-col gap-2 max-h-[420px] h-full overflow-y-auto">
              <Placehodlers
                setErrorFallback={setErrorFallback}
                placeholders={placeholders}
                setPlaceholders={(data) => setPlaceholders(data)}
              />
              <ShowValidationError error={fallbackError} />
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={() => {
              if (!placeholders.length) {
                setErrorContent("Fulfill all placeholders.");
                return;
              }

              if (title.trim().length < 3) {
                setErrorTitle("Title too short.");
                return;
              }
              mutate({
                id: section.id,
                content: content,
                title: title,
                templateId: template_id,
                placeholders,
              });
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </div>
    </div>
  );
};

export default UpdateForm;
