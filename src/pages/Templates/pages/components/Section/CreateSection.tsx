import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateSectionForm } from "./CreateSectionForm";

const CreateSection = ({ template_id }: TCreateSection) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setClose = () => setIsOpen(false);

  return (
    <>
      <Button
        variant={"ghost"}
        className="bg-white rounded-md border sticky top-0 flex justify-between w-full font-normal"
        onClick={() => setIsOpen(true)}
      >
        Create section <PlusCircle className="w-4 h-4" />
      </Button>
      {isOpen && (
        <CreateSectionForm
          isOpen={isOpen}
          setClose={setClose}
          template_id={template_id}
        />
      )}
    </>
  );
};

export default CreateSection;
