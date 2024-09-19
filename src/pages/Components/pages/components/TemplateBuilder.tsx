import fulfillWithFallbacks from "@/hooks/fulfillWithFallbacks";

type Props = {
  components: Component[];
};

const TemplateBuilder = ({ components }: Props) => {
  const { decoded } = fulfillWithFallbacks({ sections: components });

  if (components[0].placeholders.length === 0) {
    return (
      <div className="w-full grow flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl">
        Start adding placeholders
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2 relative bg-slate-50 p-2 grow">
      <iframe srcDoc={decoded} className="h-full w-full"></iframe>
    </div>
  );
};

export default TemplateBuilder;
