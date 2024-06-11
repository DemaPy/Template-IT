const BASE_URL = "http://localhost:7777";

export class TemplateServiceDB {
  static async create(template: Omit<Template, "id">) {
    try {
      const response = await fetch(BASE_URL + "/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(template),
      });
      const data: ServerResponse<Template> = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async delete(template_id: Template["id"]) {
    try {
      const response = await fetch(BASE_URL + `/templates/${template_id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data: ServerResponse<Template> = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async update(template: Template) {
    try {
      const response = await fetch(BASE_URL + "/templates", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(template),
      });
      const data: ServerResponse<Template> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const response = await fetch(BASE_URL + "/templates", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data: ServerResponse<Template[]> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getOne(id: string) {
    try {
      const response = await fetch(BASE_URL + `/templates/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data: ServerResponse<Template> = await response.json();
      return data;
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
      const response = await fetch(BASE_URL + `/section-palceholders/${placeholder_id}`, {
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

  static async createSectionPlaceholder(placeholder: Omit<Placeholder, "id">) {
    try {
      const response = await fetch(BASE_URL + `/section-palceholders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(placeholder),
      });
      const data: ServerResponse<Placeholder> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async createSection(section: Omit<Section, "id">) {
    try {
      const response = await fetch(BASE_URL + `/sections/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(section),
      });
      const data: ServerResponse<Section> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async updateSection(section: Section) {
    try {
      const response = await fetch(BASE_URL + `/sections/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(section),
      });
      const data: ServerResponse<Section> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
