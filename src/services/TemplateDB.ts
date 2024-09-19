import { BASE_URL } from "@/config";
import {
  CreateTemplate,
  DeleteTemplate,
  UpdateTemplate,
} from "./types/Template";
import { handleResponseDB } from "@/utils/handleResponse";

export class TemplateServiceDB {
  static async create(template: CreateTemplate) {
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

  static async delete({ id }: DeleteTemplate) {
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

  static async update(data: UpdateTemplate) {
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
      const json: ServerResponseSuccess<Template[]> = await response.json();
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
      const json: ServerResponseSuccess<Template> = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      throw error;
    }
  }
}
