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
      const result: ServerResponse<Layout[]> = await this.service.saveLayout(
        layout
      );
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  delete = async (campaign_id: Campaign["id"]) => {
    try {
      const result: ServerResponse<Campaign> = await this.service.delete(
        campaign_id
      );
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  create = async (campaign: Omit<Campaign, "id" | "userId">) => {
    try {
      const result: ServerResponse<Campaign> = await this.service.create(
        campaign
      );
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  update = async (campaign: Campaign) => {
    try {
      const result: ServerResponse<Campaign> = await this.service.update(
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
      const result: ServerResponse<Campaign[]> = await this.service.getAll();
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  };

  getOne = async (id: Campaign["id"]) => {
    try {
      const result: ServerResponse<Campaign> = await this.service.getOne(id);
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
    if (!data || !placeholders) return [];
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

  updateLayoutIsActive = async (layout: Layout) => {
    try {
      const result: ServerResponse<Layout> = await this.service.updateLayoutIsActive(layout);
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  }

  savePlaceholderData = async (data: Record<string, string>, placeholderId: Placeholder['id']) => {
    try {
      const result: ServerResponse<Campaign> = await this.service.savePlaceholderData(data, placeholderId);
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  }
}

export const CampaignService = new _CampaignService(CampaignServiceDB);
