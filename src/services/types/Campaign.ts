export type CampaignResponse = Promise<ServerResponseSuccess<Campaign>>;

export type CreateCampaignDTO = {
  title: Campaign["title"];
  templateId: Template["id"]
};

export type UpdateCampaignDTO = {
  id: Campaign["id"];
  title: Campaign["title"];
};

export type DeleteCampaignDTO = {
  id: Campaign["id"];
};
