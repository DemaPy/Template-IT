import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MustacheEditor from "@/components/MustacheEditor/MustacheEditor";
import Placehodlers from "@/pages/Components/components/Placehodlers";
import { extractFields } from "@/components/MustacheEditor/utils/extractFields";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

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
  const placeholdersRef = useRef<Record<string, string>>({})
  const [isUnique, setUnique] = useState(true)

  useEffect(() => {
    if (!isUnique) {
      toast.error("Placeholder already exist.")
    }
  }, [isUnique])

  
  const preFulFillPlaceholders = placeholders.map(item => {
    if (item.title in placeholdersRef.current) {
      return {
        ...item,
        fallback: placeholdersRef.current[item.title]
      }
    }
    return item
  })
  console.log(placeholdersRef);
  
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
                const { placeholders, isAllUnique } = extractFields({ template })
                setUnique(isAllUnique)
                if (isAllUnique) {
                  setContent(template);
                  setPlaceholders(placeholders);
                }
              }}
            />
          </TabsContent>
          <TabsContent value="placeholders">
            <div className="flex flex-col gap-2 max-h-[420px] h-full overflow-y-auto">
              <Placehodlers
                placeholdersRef={placeholdersRef}
                placeholders={preFulFillPlaceholders}
                setPlaceholders={(data) => setPlaceholders(data)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
