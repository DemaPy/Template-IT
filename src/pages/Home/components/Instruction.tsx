import Title from "@/components/Title";
import { useEffect } from "react";

const Instruction = () => {
  return (
    <div className="container px-4">
      <div className="flex flex-col gap-8">
        <Step1 />
        <Step2 />
        <Step3 />
      </div>
    </div>
  );
};

const Step1 = () => {
  useEffect(() => {}, []);
  return (
    <section>
      <Title color="neutral" size="xs" title="Step 1" />
      <div className="flex gap-4 md:flex-row flex-col">
        <div className="w-1/2">
          <Title title="Create template" />
        </div>
        <div className="w-full bg-white rounded-md p-4 flex flex-col gap-4 overflow-hidden">
          <img
            src="./Templates.png"
            alt=""
            className="rounded max-w-full object-contain"
          />
          <img
            src="./Template.png"
            alt=""
            className="rounded max-w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

const Step2 = () => {
  useEffect(() => {}, []);
  return (
    <section>
      <Title color="neutral" size="xs" title="Step 2" />
      <div className="flex gap-4 md:flex-row flex-col">
        <div className="w-1/2">
          <Title title="Create component" />
        </div>
        <div className="w-full bg-white rounded-md p-4 flex flex-col gap-4 overflow-hidden">
          <img
            src="./Component.png"
            alt=""
            className="rounded max-w-full object-contain"
          />
          <img
            src="./CreateComponent.png"
            alt=""
            className="rounded max-w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

const Step3 = () => {
  useEffect(() => {}, []);
  return (
    <section>
      <Title color="neutral" size="xs" title="Step 3" />
      <div className="flex gap-4 md:flex-row flex-col">
        <div className="w-1/2">
          <Title title="Create or duplicate section" />
        </div>
        <div className="w-full bg-white rounded-md p-4 flex flex-col gap-4 overflow-hidden">
          <img
            src="./CreateSection.png"
            alt=""
            className="rounded max-w-full object-contain"
          />
          <img
            src="./DuplicateSection.png"
            alt=""
            className="rounded max-w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Instruction;
