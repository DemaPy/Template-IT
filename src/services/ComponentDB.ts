const BASE_URL = "http://localhost:7777";

export class ComponentServiceDB {
  static async create(component: Omit<Component, "id">) {
    try {
      const response = await fetch(BASE_URL + "/components", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(component),
      });
      const data: ServerResponse<Component> = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async duplicateSection(section_id: Section["id"]) {
    try {
      const response = await fetch(BASE_URL + `/sections/${section_id}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data: ServerResponse<Section> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteSection(section_id: Section["id"]) {
    try {
      const response = await fetch(BASE_URL + `/sections/${section_id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data: ServerResponse<Section> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async deletePlaceholder(placeholder_id: Placeholder["id"]) {
    try {
      const response = await fetch(BASE_URL + `/placeholders/${placeholder_id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data: ServerResponse<Placeholder> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async delete(component_id: Component["id"]) {
    try {
      const response = await fetch(BASE_URL + `/components/${component_id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data: ServerResponse<Component> = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async update(component: Component) {
    try {
      const response = await fetch(BASE_URL + "/components", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(component),
      });
      const data: ServerResponse<Component> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const response = await fetch(BASE_URL + "/components", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data: ServerResponse<Component[]> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getOne(id: Component["id"]) {
    try {
      const response = await fetch(BASE_URL + `/components/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data: ServerResponse<Component> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
