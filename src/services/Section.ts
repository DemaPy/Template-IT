import { BASE_URL } from "@/config";
import { AccessError } from "./Errors/AccessError";
import { AuthError } from "./Errors/AuthError";
import { ValidationError } from "./Errors/ValidationError";
import { CreatePlaceholdersDTO } from "./types/Placeholder";
import {
  CreateSectionDTO,
  CreateSectionFromComponentDTO,
  DeleteSectionDTO,
  DuplicateSectionDTO,
  UpdatePlaceholderDTO,
  UpdateSectionDTO,
} from "./types/Section";

export class SectionServiceDB {
  static async duplicate({ id }: DuplicateSectionDTO) {
    try {
      const response = await fetch(BASE_URL + `/sections/${id}`, {
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

        throw new Error(json.message);
      }
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async delete({ id }: DeleteSectionDTO) {
    try {
      const response = await fetch(BASE_URL + `/sections/${id}`, {
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

        throw new Error(json.message);
      }
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

        throw new Error(json.message);
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

        throw new Error(json.message);
      }
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async createPlaceholders(placeholders: CreatePlaceholdersDTO) {
    try {
      const response = await fetch(BASE_URL + `/section-palceholders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ placeholder: placeholders }),
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

        throw new Error(json.message);
      }
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async create(section: CreateSectionDTO) {
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

        throw new Error(json.message);
      }
      return json;
    } catch (error) {
      throw error;
    }
  }

  static async createFromComponent(data: CreateSectionFromComponentDTO) {
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

        throw new Error(json.message);
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
        body: JSON.stringify({ section: section }),
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

        throw new Error(json.message);
      }
      return json;
    } catch (error) {
      throw error;
    }
  }
  static async updatePlaceholder(placeholder: UpdatePlaceholderDTO) {
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

        throw new Error(json.message);
      }
      return json;
    } catch (error) {
      throw error;
    }
  }
}
