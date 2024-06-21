import { CampaignServiceDB } from "../CampaignDB";
import { DataToReturn } from "@/pages/Campaigns/pages/components/Section";
import { AccessError } from "../Errors/AccessError";
import { AuthError } from "../Errors/AuthError";

class _CampaignService {
  service: any;
  constructor(service: any) {
    this.service = service;
  }

  delete = async (
    campaign_id: Campaign["id"]
  ): Promise<
    | ServerResponseSuccess<Campaign>
    | ServerResponseValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Campaign> = await this.service.delete(
        campaign_id
      );
      return result;
    } catch (err) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  create = async (
    campaign: Omit<Campaign, "id" | "userId" | "layout" | "data">
  ): Promise<
    | ServerResponseSuccess<Campaign>
    | ServerResponseValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Campaign> = await this.service.create(
        campaign
      );
      return result;
    } catch (err) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  update = async (
    campaign: Campaign
  ): Promise<
    | ServerResponseSuccess<Campaign>
    | ServerResponseValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Campaign> = await this.service.update(
        campaign
      );
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  getAll = async (): Promise<
    | ServerResponseSuccess<Campaign[]>
    | ServerResponseValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Campaign[]> =
        await this.service.getAll();
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  getOne = async (
    id: Campaign["id"]
  ): Promise<
    | ServerResponseSuccess<Campaign>
    | ServerResponseValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Campaign> = await this.service.getOne(
        id
      );
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
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

  updateLayout = async (
    layout: Partial<Layout>
  ): Promise<
    | ServerResponseSuccess<Campaign>
    | ServerResponseValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Campaign> =
        await this.service.updateLayout(layout);
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  updateLayoutsOrder = async (
    layout: Layout[]
  ): Promise<
    | ServerResponseSuccess<Campaign>
    | ServerResponseValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Campaign> =
        await this.service.updateLayoutsOrder(layout);
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
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
      const result: ServerResponseSuccess<Campaign> =
        await this.service.savePlaceholderData(data);
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };
}

export const CampaignService = new _CampaignService(CampaignServiceDB);
