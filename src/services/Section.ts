import { AccessError } from "./Errors/AccessError";
import { AuthError } from "./Errors/AuthError";
import { ValidationError } from "./Errors/ValidationError";
import { UpdateSectionDTO } from "./types/Section";

const BASE_URL = "http://localhost:7777";

export class SectionServiceDB {

  static async duplicateSection(section_id: Section["id"]) {
    try {
      const response = await fetch(BASE_URL + `/sections/${section_id}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (!response.ok) {
        if (response.status === 403) {
          throw new AccessError({ message: json.message });
        }
        if (response.status === 401) {
          throw new AuthError({ message: json.message });
        }

        if ("errors" in json) {
          throw new ValidationError({
            message: json.message,
            errors: json.errors,
          });
        }

        throw new Error(response.statusText);
      }
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
      if (!response.ok) {
        if (response.status === 403) {
          throw new AccessError({ message: json.message });
        }
        if (response.status === 401) {
          throw new AuthError({ message: json.message });
        }

        if ("errors" in json) {
          throw new ValidationError({
            message: json.message,
            errors: json.errors,
          });
        }

        throw new Error(response.statusText);
      }
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
      if (!response.ok) {
        if (response.status === 403) {
          throw new AccessError({ message: json.message });
        }
        if (response.status === 401) {
          throw new AuthError({ message: json.message });
        }

        if ("errors" in json) {
          throw new ValidationError({
            message: json.message,
            errors: json.errors,
          });
        }

        throw new Error(response.statusText);
      }
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
        body: JSON.stringify({placeholders: placeholders}),
      });
      const json = await response.json();
      if (!response.ok) {
        if (response.status === 403) {
          throw new AccessError({ message: json.message });
        }
        if (response.status === 401) {
          throw new AuthError({ message: json.message });
        }

        if ("errors" in json) {
          throw new ValidationError({
            message: json.message,
            errors: json.errors,
          });
        }

        throw new Error(response.statusText);
      }
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async create(section: Omit<Section, "id">) {
    try {
      const response = await fetch(BASE_URL + `/sections/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(section),
      });
      const json = await response.json();
      if (!response.ok) {
        if (response.status === 403) {
          throw new AccessError({ message: json.message });
        }
        if (response.status === 401) {
          throw new AuthError({ message: json.message });
        }

        if ("errors" in json) {
          throw new ValidationError({
            message: json.message,
            errors: json.errors,
          });
        }

        throw new Error(response.statusText);
      }
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async update(section: UpdateSectionDTO) {
    try {
      const response = await fetch(BASE_URL + `/sections/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(section),
      });
      const json = await response.json();
      if (!response.ok) {
        if (response.status === 403) {
          throw new AccessError({ message: json.message });
        }
        if (response.status === 401) {
          throw new AuthError({ message: json.message });
        }

        if ("errors" in json) {
          throw new ValidationError({
            message: json.message,
            errors: json.errors,
          });
        }

        throw new Error(response.statusText);
      }
      return json;
    } catch (error) {
      throw error;
    }
  }
}
