import { ensureError } from "@/lib/utils";
import { CampaignServiceDB } from "../CampaignDB";
import { DataToReturn } from "@/pages/Campaigns/pages/components/Section";

class _CampaignService {
  service: any;
  constructor(service: any) {
    this.service = service;
  }

  saveLayout = async (layout: Layout[]) => {
    try {
      const result: ServerResponseSuccess<Layout[]> =
        await this.service.saveLayout(layout);
      return result;
    } catch (err) {
      const error = ensureError(err);
      return error;
    }
  };

  delete = async (campaign_id: Campaign["id"]) => {
    try {
      const result: ServerResponseSuccess<Campaign> = await this.service.delete(
        campaign_id
      );
      return result;
    } catch (err) {
      const error = ensureError(err);
      return error;
    }
  };

  create = async (
    campaign: Omit<Campaign, "id" | "userId" | "layout" | "data">
  ): Promise<ServerResponseSuccess<Campaign> | ServerResponseValidationError | ServerResponseError> => {
    try {
      const result: ServerResponseSuccess<Campaign> = await this.service.create(
        campaign
      );
      return result;
    } catch (err) {
      if ("errors" in (err as ServerResponseValidationError)) {
        return err as ServerResponseValidationError
      }
      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  update = async (campaign: Campaign) => {
    try {
      const result: ServerResponseSuccess<Campaign> = await this.service.update(
        campaign
      );
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  };

  getAll = async () => {
    try {
      const result: ServerResponseSuccess<Campaign[]> =
        await this.service.getAll();
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  };

  getOne = async (id: Campaign["id"]) => {
    try {
      const result: ServerResponseSuccess<Campaign> = await this.service.getOne(
        id
      );
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  };

  convertPlaceholders = (
    data: Campaign["data"],
    placeholders: Placeholder[] | null,
    section_id: string
  ) => {
    if (Object.keys(data).length === 0 || !placeholders) return [];
    const dataToReturn: DataToReturn = [];
    for (const placeholder of placeholders || []) {
      const placeholderData = data[section_id];
      const newViedOfData = {
        id: placeholder.id,
        title: placeholder.title,
        data: placeholderData[placeholder.id],
      };
      dataToReturn.push(newViedOfData);
    }
    return dataToReturn;
  };

  updateLayout = async (layout: Layout) : Promise<ServerResponseSuccess<Campaign> | ServerResponseError> => {
    try {
      const result: ServerResponseSuccess<Campaign> =
        await this.service.updateLayout(layout);
      return result;
    } catch (err: unknown) {
      return err as ServerResponseError
    }
  };

  updateLayoutsOrder = async (layout: Layout[]) : Promise<ServerResponseSuccess<Campaign> | ServerResponseError> => {
    try {
      const result: ServerResponseSuccess<Campaign> =
        await this.service.updateLayoutsOrder(layout);
      return result;
    } catch (err: unknown) {
      return err as ServerResponseError
    }
  };

  savePlaceholderData = async (data: {
    campaignId: Campaign["id"];
    data: Record<string, Record<string, Record<string, string>>>;
  }) => {
    try {
      const result: ServerResponseSuccess<Campaign> =
        await this.service.savePlaceholderData(data);
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  };
}

export const CampaignService = new _CampaignService(CampaignServiceDB);
