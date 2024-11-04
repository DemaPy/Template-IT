import { Delete } from "./Delete";
import { UpdateCampaign } from "./Update";

export const Actions = ({ campaign_id }: { campaign_id: Template["id"] }) => {
  return (
    <>
      <UpdateCampaign campaign_id={campaign_id} />
      <Delete campaign_id={campaign_id} />
    </>
  );
};
