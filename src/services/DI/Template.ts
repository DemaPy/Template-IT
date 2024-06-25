import { ensureError } from "@/lib/utils";
import { TemplateServiceDB } from "../TemplateDB";
import { AccessError } from "../Errors/AccessError";
import { AuthError } from "../Errors/AuthError";
import { ValidationError } from "../Errors/ValidationError";

class _TemplateService {
  service: any;
  constructor(service: any) {
    this.service = service;
  }

  duplicateSection = async (
    section_id: Section["id"]
  ): Promise<
    | ServerResponseSuccess<Section>
    | ValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Section> =
        await this.service.duplicateSection(section_id);
      return result;
    } catch (err) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof ValidationError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  delete = async (
    template_id: Template["id"]
  ): Promise<
    | ServerResponseSuccess<Template>
    | ValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Template> = await this.service.delete(
        template_id
      );
      return result;
    } catch (err) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof ValidationError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  create = async (
    template: Omit<Template, "id" | "sections" | "userId">
  ): Promise<
    | ServerResponseSuccess<Template>
    | ValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Template> = await this.service.create(
        template
      );
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof ValidationError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  update = async (
    template: Template
  ): Promise<
    | ServerResponseSuccess<Template>
    | ValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Template> = await this.service.update(
        template
      );
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof ValidationError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  createSection = async (
    section: Omit<Section, "id" | "placeholders">
  ): Promise<
    | ServerResponseSuccess<Section>
    | ValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Section> =
        await this.service.createSection(section);
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof ValidationError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  createSectionFromComponent = async (
    section: Omit<Section, "id">
  ): Promise<
    | ServerResponseSuccess<Section>
    | ValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Section> =
        await this.service.createSection(section);
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof ValidationError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  createSectionPlaceholder = async (
    placeholder: Omit<Placeholder, "id">
  ): Promise<
    | ServerResponseSuccess<Placeholder>
    | ValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Placeholder> =
        await this.service.createSectionPlaceholder(placeholder);
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof ValidationError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  deletePlaceholder = async (
    placeholder_id: Placeholder["id"]
  ): Promise<
    | ServerResponseSuccess<Placeholder>
    | ValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Placeholder> =
        await this.service.deletePlaceholder(placeholder_id);
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof ValidationError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  deleteSection = async (
    section_id: Section["id"]
  ): Promise<
    | ServerResponseSuccess<Section>
    | ValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Section> =
        await this.service.deleteSection(section_id);
      return result;
    } catch (err) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof ValidationError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  getAll = async (): Promise<
    | ServerResponseSuccess<Template[]>
    | ValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Template[]> =
        await this.service.getAll();
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof ValidationError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  getOne = async (
    id: string
  ): Promise<
    | ServerResponseSuccess<Template>
    | ValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Template> = await this.service.getOne(
        id
      );
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof ValidationError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  updateSection = async (
    section: Section
  ): Promise<
    | ServerResponseSuccess<Section>
    | ValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Section> =
        await this.service.updateSection(section);
      return result;
    } catch (err: unknown) {
      if (err instanceof AccessError) {
        return err;
      }

      if (err instanceof AuthError) {
        return err;
      }

      if (err instanceof ValidationError) {
        return err;
      }

      if (err instanceof Error) {
        return {
          status: "error",
          message: err.message,
        };
      }

      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };
}

export const TemplateService = new _TemplateService(TemplateServiceDB);
