import fulfillWithFallbacks from "@/hooks/fulfillWithFallbacks";

type Props = {
  sections: Section[];
  isHtml?: boolean;
};

const TemplateBuilder = ({ sections, isHtml = false }: Props) => {
  const { decoded, html } = fulfillWithFallbacks({ sections });

  if (!sections) {
    return (
      <div className="w-full flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl">
        Start adding sections
      </div>
    );
  }

  return (
    <div className="w-full lg:min-h-80 min-h-40 flex flex-col gap-2 relative bg-white grow rounded-md">
      <iframe
        srcDoc={isHtml ? html : decoded}
        className="h-full w-full grow"
      ></iframe>
    </div>
  );
};

export default TemplateBuilder;
