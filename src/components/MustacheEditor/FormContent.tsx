import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MustacheEditor from "@/components/MustacheEditor/MustacheEditor";
import Placehodlers from "@/pages/Components/components/Placehodlers";
import { extractFields } from "@/components/MustacheEditor/utils/extractFields";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Flex from "../Layout/Flex";
import { Copy, CopyCheck } from "lucide-react";
type FormContentProps = {
  content: Section["content"];
  setContent: (content: Section["content"]) => void;
  placeholders: PlaceholderToCreate[];
  setPlaceholders: (placeholders: PlaceholderToCreate[]) => void;
};

const PLACEHOLDER = "{{name}}";
export const FormContent = ({
  content,
  setContent,
  placeholders,
  setPlaceholders,
}: FormContentProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const [placeholdersInfo, setPlaceholdersInfo] = useState({
    isUnique: true,
    placeholders: [""],
  });

  const handleClick = () => {
    setIsClicked(true);
    navigator.clipboard.writeText(PLACEHOLDER);
    setTimeout(() => {
      setIsClicked(false);
    }, 600);
  };

  useEffect(() => {
    if (!placeholdersInfo.isUnique) {
      toast.error(
        `Placeholder ${placeholdersInfo.placeholders.join(", ")} already exist.`
      );
    }
  }, [placeholdersInfo]);

  return (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue="content">
        <Flex direction="row" justify="between" align="center">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="placeholders">Placeholders</TabsTrigger>
          </TabsList>
        </Flex>
        <TabsContent value="content">
          <MustacheEditor
            value={content}
            setContent={(template) => {
              const {
                placeholders: new_placeholders,
                isAllUnique,
                repeated_placeholders,
              } = extractFields({ template });
              setPlaceholdersInfo({
                isUnique: isAllUnique,
                placeholders: repeated_placeholders,
              });
              if (isAllUnique) {
                setContent(template);
                const placeholders_to_set = [];
                for (const item of new_placeholders) {
                  const candidate = placeholders.find(
                    (plc) =>
                      plc.title.toLowerCase() === item.title.toLowerCase()
                  );
                  if (!candidate) {
                    placeholders_to_set.push(item);
                  }
                }
                setPlaceholders([...placeholders_to_set, ...placeholders]);
              }
            }}
          />
          <span className="text-xs text-slate-600">
            Start typing text or html.
            <Flex direction="row" align="center">
              Remember about placeholders {PLACEHOLDER}{" "}
              {isClicked ? (
                <CopyCheck className="w-3 h-3 cursor-pointer" />
              ) : (
                <Copy
                  onClick={handleClick}
                  className="w-3 h-3 cursor-pointer"
                />
              )}
            </Flex>
          </span>
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
  );
};
