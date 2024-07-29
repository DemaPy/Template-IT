import { CampaignServiceDB } from "../CampaignDB";
import { DataToReturn } from "@/pages/Campaigns/pages/components/Section";
import {
  CreateCampaign,
  DeleteCampaign,
  UpdateCampaign,
} from "../types/Campaign";

class _CampaignService {
  service: any;
  constructor(service: any) {
    this.service = service;
  }

  delete = async (campaign_id: DeleteCampaign) => {
    try {
      const result = await this.service.delete(campaign_id);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        throw err
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  create = async (campaign: CreateCampaign) => {
    try {
      const result = await this.service.create(campaign);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        throw err
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  update = async (campaign: UpdateCampaign) => {
    try {
      const result = await this.service.update(campaign);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  getAll = async (): Promise<ServerResponseSuccess<Campaign[]>> => {
    try {
      const result = await this.service.getAll();
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  getOne = async (id: Campaign["id"]) => {
    try {
      const result = await this.service.getOne(id);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  convertPlaceholders = (
    data: Campaign["data"],
    placeholders: Placeholder[] | null,
    section_id: string
  ) => {
    if (!placeholders) return [];
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

  updateLayout = async (layout: Partial<Layout>) => {
    try {
      const result = await this.service.updateLayout(layout);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  updateLayoutsOrder = async (layout: Layout[]) => {
    try {
      const result = await this.service.updateLayoutsOrder(layout);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  savePlaceholderData = async (data: {
    campaignId: Campaign["id"];
    data: Record<string, Record<string, Record<string, string>>>;
  }) => {
    try {
      const result = await this.service.savePlaceholderData(data);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };
}

export const CampaignService = new _CampaignService(CampaignServiceDB);
