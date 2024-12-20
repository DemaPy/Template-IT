import { BASE_URL } from "@/config";
import { UpdatePlaceholder } from "./types/Placeholder";
import type {
  CreateSection,
  CreateSectionFromComponent,
  DeleteSection,
  DuplicateSection,
  UpdateSectionProps,
} from "./types/Section";
import { handleResponseDB } from "@/utils/handleResponse";

export class SectionServiceDB {
  static async duplicate({ id }: DuplicateSection) {
    try {
      const response = await fetch(BASE_URL + `/sections/${id}`, {
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

  static async delete({ id }: DeleteSection) {
    try {
      const response = await fetch(BASE_URL + `/sections/${id}`, {
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

  static async getOne(id: Section["id"]) {
    try {
      const response = await fetch(BASE_URL + `/sections/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json: ServerResponseSuccess<Section> = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async create(section: CreateSection) {
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

  static async createFromComponent(data: CreateSectionFromComponent) {
    try {
      const response = await fetch(BASE_URL + `/sections/component`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ section: data }),
      });
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async update(section: UpdateSectionProps) {
    try {
      const response = await fetch(BASE_URL + `/sections/`, {
        method: "PATCH",
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
  static async updatePlaceholder(placeholder: UpdatePlaceholder) {
    try {
      const response = await fetch(BASE_URL + `/section-palceholders/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ placeholder: placeholder }),
      });
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error) {
      throw error;
    }
  }
}
