const BASE_URL = "http://localhost:7777";

export class ComponentServiceDB {
  static async create(
    component: Omit<Component, "id">
  ): Promise<ServerResponseSuccess<Component> | ServerResponseError> {
    try {
      const response = await fetch(BASE_URL + "/components", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(component),
      });
      const json = await response.json();
      if (!response.ok) {
        const error: ServerResponseValidationError = {
          message: json.message,
          status: "error",
          errors: json.errors,
        };
        throw error;
      }
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async deletePlaceholder(
    placeholder_id: Placeholder["id"],
    component_id: Component["id"]
  ) {
    try {
      const response = await fetch(
        BASE_URL + `/component-palceholders/${placeholder_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ component_id }),
        }
      );
      const data: ServerResponseSuccess<Placeholder> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async createComponentPlaceholder(
    placeholder: Omit<Placeholder, "id">
  ) {
    try {
      const response = await fetch(BASE_URL + `/component-palceholders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(placeholder),
      });
      const data: ServerResponseSuccess<Placeholder> = await response.json();
      return data;
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
        body: JSON.stringify(placeholder),
      });
      const data: ServerResponseSuccess<Placeholder> = await response.json();
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
      const data: ServerResponseSuccess<Component> = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async update(component: Component): Promise<ServerResponseSuccess<Component> | ServerResponseError> {
    try {
      const response = await fetch(BASE_URL + `/components/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(component),
      });
      const json = await response.json();
      if (!response.ok) {
        const error: ServerResponseValidationError = {
          message: json.message,
          status: "error",
          errors: json.errors,
        };
        throw error;
      }
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
      const data: ServerResponseSuccess<Component[]> = await response.json();
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
      const data: ServerResponseSuccess<Component> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
