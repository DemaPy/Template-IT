import { useState } from "react";
import NavbarBuilder from "./NavbarBuilder";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { decode } from "html-entities";

type Props = {
  html: string;
  campaign: Campaign;
};
type Devices = { desktop: string; tablet: string; mobile: string };
export type KeyDevices = keyof Devices;
const PreviewPage = ({ html, campaign }: Props) => {
  const [device, setDevice] = useState<keyof Devices>("desktop");

  const devices: Devices = {
    desktop: "1440px",
    tablet: "920px",
    mobile: "400px",
  };

  return (
    <div className="fixed inset-0 bg-slate-50 z-50 rounded-md">
      <TransformWrapper
        smooth={true}
        minScale={0.7}
        maxScale={1.3}
        initialScale={1}
      >
        <div className="p-4">
          <NavbarBuilder
            setDevice={(device: KeyDevices) => setDevice(device)}
            html={html}
            campaign={campaign}
          />
        </div>
        <TransformComponent
          wrapperClass="!w-screen !h-screen bg-white rounded-md"
          contentClass="pointer-events-none !w-full"
        >
          <iframe
            style={{ width: devices[device] }}
            srcDoc={decode(html)}
            className="grow pointer-events-none"
          ></iframe>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default PreviewPage;
