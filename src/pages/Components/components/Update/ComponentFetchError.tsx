import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ComponentFetchError = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-left">
          Name
        </Label>
        <Input
          placeholder="title"
          id="name"
          defaultValue={"Oooops..."}
          disabled
          className="col-span-4 border-red-400"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-left">
          Content
        </Label>
        <Textarea
          defaultValue={
            "Something went wrong while fetching component for update... Please try again later."
          }
          disabled
          rows={12}
          className="resize-none border border-red-400"
        ></Textarea>
      </div>
    </div>
  );
};

export default ComponentFetchError;
