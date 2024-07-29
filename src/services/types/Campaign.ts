export type CampaignResponse = Promise<ServerResponseSuccess<Campaign>>;

export type CreateCampaign = {
  title: Campaign["title"];
  templateId: Template["id"]
};

export type UpdateCampaign = {
  id: Campaign["id"];
  title: Campaign["title"];
};

export type DeleteCampaign = {
  id: Campaign["id"];
};
