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
      const data: ServerResponse<Campaign> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async updateLayoutIsActive(layout: Layout) {
    try {
      const response = await fetch(BASE_URL + "/layouts", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(layout),
      });
      const data: ServerResponse<Campaign> = await response.json();
      return data;
    } catch (error) {
      throw error;
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
      const data: ServerResponse<Campaign> = await response.json();
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
      const data: ServerResponse<Campaign> = await response.json();
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
      const data: ServerResponse<Campaign> = await response.json();
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
      const data: ServerResponse<Campaign[]> = await response.json();
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
      const data: ServerResponse<Campaign> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async saveLayout(layout: Layout[]) {
    try {
      const response = await fetch(BASE_URL + `/layouts/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(layout),
      });
      const data: ServerResponse<Layout> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
