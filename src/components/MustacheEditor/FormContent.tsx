import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MustacheEditor from "@/components/MustacheEditor/MustacheEditor";
import Placehodlers from "@/pages/Components/components/Placehodlers";
import { extractFields } from "@/components/MustacheEditor/utils/extractFields";

type FormContentProps = {
  content: Section["content"];
  setContent: (content: Section["content"]) => void;
  placeholders: PlaceholderToCreate[];
  setPlaceholders: (placeholders: PlaceholderToCreate[]) => void;
};

export const FormContent = ({
  content,
  setContent,
  placeholders,
  setPlaceholders,
}: FormContentProps) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <div className="col-span-4">
        <Tabs defaultValue="content">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="placeholders">Placeholders</TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <MustacheEditor
              value={content}
              setContent={(template) => {
                setContent(template);
                setPlaceholders(extractFields({ template }));
              }}
            />
          </TabsContent>
          <TabsContent value="placeholders">
            <div className="flex flex-col gap-2 max-h-[420px] h-full overflow-y-auto">
              <Placehodlers
                placeholders={placeholders}
                setPlaceholders={(data) => setPlaceholders(data)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
