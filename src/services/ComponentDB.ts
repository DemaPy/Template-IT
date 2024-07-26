import { BASE_URL } from "@/config";
import { CreateComponentDTO, UpdateComponentDTO } from "./types/Component";
import { CreatePlaceholdersDTO } from "./types/Placeholder";
import { UpdatePlaceholderDTO } from "./types/Section";
import { handleResponseDB } from "@/utils/handleResponse";

export class ComponentServiceDB {
  static async create(
    component: CreateComponentDTO
  ): Promise<ServerResponseSuccess<Component> | ServerResponseError> {
    try {
      const response = await fetch(BASE_URL + "/components", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ component: component }),
      });
      const json = await response.json();
      handleResponseDB({ json, response });
      return json;
    } catch (error: any) {
      throw error;
    }
  }

  static async deletePlaceholder(placeholder_id: Placeholder["id"]) {
    try {
      const response = await fetch(
        BASE_URL + `/component-palceholders/${placeholder_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
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

  static async createPlaceholders(placeholders: CreatePlaceholdersDTO[]) {
    try {
      const response = await fetch(BASE_URL + `/component-palceholders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ placeholder: placeholders }),
      });
      const json = await response.json();
      handleResponseDB({ json, response });

      return json;
    } catch (error) {
      throw error;
    }
  }

  static async deleteComponentPlaceholder(placeholder: Placeholder) {
    try {
      const response = await fetch(BASE_URL + `/component-palceholders/`, {
        method: "DELETE",
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

  static async delete(component_id: Component["id"]) {
    try {
      const response = await fetch(BASE_URL + `/components/${component_id}`, {
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

  static async update(
    component: UpdateComponentDTO
  ): Promise<ServerResponseSuccess<Component> | ServerResponseError> {
    try {
      const response = await fetch(BASE_URL + `/components/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ component: component }),
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
      const response = await fetch(BASE_URL + "/components", {
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

  static async getOne(id: Component["id"]) {
    try {
      const response = await fetch(BASE_URL + `/components/${id}`, {
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
  static async updatePlaceholder(placeholder: UpdatePlaceholderDTO) {
    try {
      const response = await fetch(BASE_URL + `/component-palceholders/`, {
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
