import { ReactElement } from "react";

export type UpdateCampaignProps = {
  campaign_id: Campaign["id"];
};

export type FetchCampaignToUpdateProps = {
  campaign_id: Campaign["id"];
  children: (data: Campaign) => ReactElement;
  skeleton: ReactElement;
};
