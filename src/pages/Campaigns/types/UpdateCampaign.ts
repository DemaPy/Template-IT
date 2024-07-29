type TUpdateCampaign = {
  isOpen: boolean;
  setClose: () => void;
  campaign_id: Campaign["id"];
};

type TFetchCampaignToUpdate = {
  campaign_id: Campaign["id"];
  setTitle: (value: Campaign["title"]) => void;
};