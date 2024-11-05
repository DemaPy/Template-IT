import { Button } from "@/components/ui/button";
import { usePreview } from "@/store/preview";
import {
  ArrowUpRightIcon,
  Copy,
  CopyCheck,
  Eye,
  MonitorStop,
  Tablet,
  TabletSmartphone,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { KeyDevices } from "./PreviewPage";
import { useControls } from "react-zoom-pan-pinch";

type Props = {
  campaign: Campaign;
  html: string;
  setDevice: (device: KeyDevices) => void;
};

const NavbarBuilder = ({ html, campaign, setDevice }: Props) => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  const [isCopy, setCopy] = useState(false);
  const isOpen = usePreview((store) => store.isOpen);
  const setOpen = usePreview((store) => store.setOpen);
  const setClose = usePreview((store) => store.setClose);
  const handleCopy = () => {
    setCopy(true);
    navigator.clipboard.writeText(html);
    setClose();
    let id = setTimeout(() => {
      setCopy(false);
      clearTimeout(id);
    }, 600);
  };

  return (
    <div className="sticky flex gap-2 items-center left-0 top-0 overflow-x-auto min-h-14">
      <Button
        onClick={() => setClose()}
        asChild
        size={"sm"}
        variant={"outline"}
      >
        <Link
          className="text-sm"
          target="_blank"
          to={`/templates/${campaign.templateId}`}
        >
          <ArrowUpRightIcon className="w-4 h-4" />
          Template
        </Link>
      </Button>
      <Button
        onClick={handleCopy}
        className="flex gap-2 items-center"
        size={"sm"}
        variant={"outline"}
      >
        {isCopy ? (
          <CopyCheck className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        Copy
      </Button>
      <Button
        onClick={() => resetTransform()}
        className="flex gap-2 items-center"
        size={"sm"}
        variant={"outline"}
      >
        Reset
      </Button>
      <Button
        onClick={() => (isOpen ? setClose() : setOpen(html))}
        className="flex gap-2 items-center"
        size={"sm"}
        variant={"outline"}
      >
        <Eye className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => {
          setDevice("desktop");
          resetTransform();
        }}
        className="flex gap-2 items-center"
        size={"sm"}
        variant={"outline"}
      >
        <span title="1440px">
          <MonitorStop className="w-4 h-4" />
        </span>
      </Button>
      <Button
        onClick={() => {
          setDevice("tablet");
          resetTransform();
        }}
        className="flex gap-2 items-center"
        size={"sm"}
        variant={"outline"}
      >
        <span title="920px">
          <Tablet className="w-4 h-4" />
        </span>
      </Button>
      <Button
        onClick={() => {
          setDevice("mobile");
          resetTransform();
        }}
        className="flex gap-2 items-center"
        size={"sm"}
        variant={"outline"}
      >
        <span title="400px">
          <TabletSmartphone className="w-4 h-4" />
        </span>
      </Button>
      <Button
        onClick={() => zoomIn()}
        className="flex gap-2 items-center"
        size={"sm"}
        variant={"outline"}
      >
        +
      </Button>
      <Button
        onClick={() => zoomOut()}
        className="flex gap-2 items-center"
        size={"sm"}
        variant={"outline"}
      >
        -
      </Button>
    </div>
  );
};

export default NavbarBuilder;
