import { useLayoutEffect, useState } from "react";
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

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const devices: Devices = {
    desktop: "1440px",
    tablet: "920px",
    mobile: "400px",
  };
  return (
    <div className="fixed inset-0 bg-slate-50 z-[99999] rounded-md !mt-0">
      <TransformWrapper
        smooth={true}
        minScale={0.7}
        maxScale={1.3}
        initialScale={1}
      >
        <div className="p-2">
          <NavbarBuilder
            setDevice={(device: KeyDevices) => setDevice(device)}
            html={html}
            campaign={campaign}
          />
        </div>
        <TransformComponent
          wrapperClass="!w-full !h-screen bg-white rounded-md"
          contentClass="!w-full"
        >
          <iframe
            style={{ width: devices[device] }}
            srcDoc={decode(html)}
            className="h-[700vh] pointer-events-none"
          ></iframe>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default PreviewPage;
