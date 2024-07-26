import { BASE_URL } from "@/config";
import {
  CreateTemplateDTO,
  DeleteTemplateDTO,
  UpdateTemplateDTO,
} from "./types/Template";
import { handleResponseDB } from "@/utils/handleResponse";

export class TemplateServiceDB {
  static async create(template: CreateTemplateDTO) {
    try {
      const response = await fetch(BASE_URL + "/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ template: template }),
      });
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async delete({ id }: DeleteTemplateDTO) {
    try {
      const response = await fetch(BASE_URL + `/templates/${id}`, {
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

  static async update(data: UpdateTemplateDTO) {
    try {
      const response = await fetch(BASE_URL + "/templates", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ template: data }),
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
      const response = await fetch(BASE_URL + "/templates", {
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

  static async getOne(id: Template["id"]) {
    try {
      const response = await fetch(BASE_URL + `/templates/${id}`, {
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

  static async duplicateSection(section_id: Section["id"]) {
    try {
      const response = await fetch(BASE_URL + `/sections/${section_id}`, {
        method: "POST",
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

  static async deleteSection(section_id: Section["id"]) {
    try {
      const response = await fetch(BASE_URL + `/sections/${section_id}`, {
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

  static async deletePlaceholder(placeholder_id: Placeholder["id"]) {
    try {
      const response = await fetch(
        BASE_URL + `/section-palceholders/${placeholder_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async createPlaceholders(placeholders: Omit<Placeholder, "id">[]) {
    try {
      const response = await fetch(BASE_URL + `/section-palceholders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ placeholders: placeholders }),
      });
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
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
        body: JSON.stringify({ section: section }),
      });
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      throw error;
    }
  }
}
