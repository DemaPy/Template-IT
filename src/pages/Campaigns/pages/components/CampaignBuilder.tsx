import NavbarBuilder from "./NavbarBuilder";
import { decode } from "html-entities";
import mustache from "mustache";
import { useState } from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

type Props = {
  sortedSections: Section[];
  campaign: Campaign;
  slug: string;
  layout: Layout[];
};

type Devices = { desktop: string; tablet: string; mobile: string };
export type KeyDevices = keyof Devices;

const CampaignBuilder = ({ layout, slug, sortedSections, campaign }: Props) => {
  const [device, setDevice] = useState<keyof Devices>("desktop");

  const devices: Devices = {
    desktop: "1440px",
    tablet: "920px",
    mobile: "400px",
  };

  let html = "";
  for (const section of sortedSections) {
    const section_layout = layout.find(
      (item) => item.sectionId === section.id
    )!;
    const renderOnLength = Object.keys(section_layout.renderOn).length;

    if (renderOnLength > 0) {
      // In case if selected slug has been disabled
      if (!section_layout.renderOn[slug]) {
        continue;
      }
    }
    const all_placehodlers = section.placeholders.reduce((acc, item) => {

      if (!(section.id in campaign.data)) {
        acc[item.title] = item.fallback
      } else {
        const campaign_data = campaign.data[section.id];

        if (!(item.id in campaign_data)) {
          acc[item.title] = item.fallback
        }
        // In case of section has different amounts of slugs
        if (!(slug in campaign_data[item.id])) {
          acc[item.title] = item.fallback
        } else {
          if (campaign_data[item.id][slug].length === 0) {
            acc[item.title] = item.fallback
          } else {
            acc[item.title] = campaign_data[item.id][slug]
          }
        }
      }

      return acc;
    }, {} as Record<string, string>);

    try {
      console.log(all_placehodlers);

      const template = mustache.render(section.content, all_placehodlers);

      html += template;
    } catch (error) {
      console.warn(error)
    }
  }

  if (!campaign.data) {
    return (
      <div className="w-full flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl">
        Looks like you don't have data <br /> to render.
      </div>
    );
  }

  return (
    <div className="overflow-hidden flex flex-col gap-2 relative bg-slate-50 p-2">
      <TransformWrapper
        smooth={true}
        minScale={0.7}
        maxScale={1.3}
        initialScale={1}>
        <NavbarBuilder
          setDevice={(device: KeyDevices) => setDevice(device)}
          html={decode(html)}
          campaign={campaign}
        />
        <TransformComponent wrapperClass="!w-[900px] absolute inset-0 left-1/2 -translate-x-1/2" contentClass="!h-[100vh] overflow-y-auto overflow-x-hidden flex-col items-center">
          <iframe
            style={{ width: devices[device] }}
            srcDoc={decode(html)}
            className="grow"
          ></iframe>
        </TransformComponent>
      </TransformWrapper>
    </div >
  );
};

export default CampaignBuilder;
