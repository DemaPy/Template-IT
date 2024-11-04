import { Label } from "@/components/ui/label";
import { TemplateCardContentProps } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplateBuilder from "../../pages/components/TemplateBuilder";

const TemplateCardContent = ({ sections }: TemplateCardContentProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Tabs defaultValue="preview">
        <div className="flex justify-between items-center">
          <Label htmlFor="content">Content</Label>
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="placeholders">Placeholders</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview">
          <TemplateBuilder sections={sections} />
        </TabsContent>
        <TabsContent value="placeholders">
          <TemplateBuilder sections={sections} isHtml={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplateCardContent;
