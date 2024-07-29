import { BASE_URL } from "@/config";
import {
  CreateCampaign,
  DeleteCampaign,
  UpdateCampaign,
} from "./types/Campaign";
import { handleResponseDB } from "@/utils/handleResponse";
import { DataToReturn } from "@/pages/Campaigns/pages/components/Section";

export class CampaignServiceDB {
  static async create(campaign: CreateCampaign) {
    try {
      const response = await fetch(BASE_URL + "/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ campaign: campaign }),
      });
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      throw error;
    }
  }

  static convertPlaceholders = (
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

  static async updateLayout(layout:  Partial<Layout>) {
    try {
      const response = await fetch(BASE_URL + "/layouts", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ layout: layout }),
      });
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      if (error instanceof Error) {
        throw {
          status: "error",
          message: error.message,
        };
      }
      throw error;
    }
  }

  static async updateLayoutsOrder(layouts: Layout[]) {
    try {
      const response = await fetch(BASE_URL + "/layouts/order", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ layout: layouts }),
      });
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      if (error instanceof Error) {
        throw {
          status: "error",
          message: error.message,
        };
      }
      throw error;
    }
  }

  static async savePlaceholderData(_data: {
    campaignId: Campaign["id"];
    data: Record<string, Record<string, Record<string, string>>>;
  }) {
    try {
      const response = await fetch(
        BASE_URL + `/campaigns/${_data.campaignId}/data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ campaign: _data.data }),
        }
      );
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async delete(campaign_id: DeleteCampaign) {
    try {
      const response = await fetch(BASE_URL + `/campaigns/${campaign_id.id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async update(campaign: UpdateCampaign) {
    try {
      const response = await fetch(BASE_URL + "/campaigns", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ campaign: campaign }),
      });
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const response = await fetch(BASE_URL + "/campaigns", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async getOne(id: Campaign["id"]) {
    try {
      const response = await fetch(BASE_URL + `/campaigns/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      throw error;
    }
  }
}
