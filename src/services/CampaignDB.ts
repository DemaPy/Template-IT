const BASE_URL = "http://localhost:7777";

export class CampaignServiceDB {
  static async create(campaign: Omit<Campaign, "id">) {
    try {
      const response = await fetch(BASE_URL + "/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(campaign),
      });
      const json = await response.json();
      if (!response.ok) {
        const error: ServerResponseValidationError = {
          message: json.message,
          status: "error",
          errors: json.errors
        };
        throw error;
      }
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async updateLayout(layout: Pick<Layout, "id" | "is_active">) {
    try {
      const response = await fetch(BASE_URL + "/layouts", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(layout),
      });
      if (!response.ok) {
        const err: ServerResponseError = await response.json()
        throw err
      }
      const data: ServerResponseSuccess<Layout> = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw {
          status: 'error',
          message: error.message
        };
      }
      throw error
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
        body: JSON.stringify({layout: layouts}),
      });
      if (!response.ok) {
        const err: ServerResponseError = await response.json()
        throw err
      }
      const data: ServerResponseSuccess<Layout> = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw {
          status: 'error',
          message: error.message
        };
      }
      throw error
    }
  }

  static async savePlaceholderData(_data: {campaignId: Campaign['id'], data: Record<string, Record<string, Record<string, string>>>}) {
    try {
      const response = await fetch(BASE_URL + `/campaigns/${_data.campaignId}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(_data.data),
      });
      const data: ServerResponseSuccess<Campaign> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async delete(campaign_id: Campaign["id"]) {
    try {
      const response = await fetch(BASE_URL + `/campaigns/${campaign_id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data: ServerResponseSuccess<Campaign> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async update(campaign: Campaign) {
    try {
      const response = await fetch(BASE_URL + "/campaigns", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(campaign),
      });
      const data: ServerResponseSuccess<Campaign> = await response.json();
      return data;
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
      const data: ServerResponseSuccess<Campaign[]> = await response.json();
      return data;
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
      const data: ServerResponseSuccess<Campaign> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
