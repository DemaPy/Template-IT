import { ReactElement } from "react";

export type FetchCampaignProps = {
  children: (data: Campaign) => ReactElement;
  skeleton: ReactElement;
  campaign_id: Campaign["id"];
};
