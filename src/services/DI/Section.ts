import { AccessError } from "../Errors/AccessError";
import { AuthError } from "../Errors/AuthError";
import { ValidationError } from "../Errors/ValidationError";
import { SectionServiceDB } from "../Section";
import { UpdateSectionDTO } from "../types/Section";

class _SectionService {
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

  create = async (
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

  createPlaceholders = async (
    placeholders: Omit<Placeholder, "id">[]
  ): Promise<
    | ServerResponseSuccess<Placeholder[]>
    | ValidationError
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Placeholder[]> =
        await this.service.createPlaceholders(placeholders);
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


  update = async (
    section: UpdateSectionDTO
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

export const SectionService = new _SectionService(SectionServiceDB);
