import { AccessError } from "../Errors/AccessError";
import { AuthError } from "../Errors/AuthError";
import { ValidationError } from "../Errors/ValidationError";
import {
  SectionServiceInterface,
  SectionServiceInterfaceDB,
} from "../Interfaces";
import { SectionServiceDB } from "../Section";
import {
  CreateSectionDTO,
  CreateSectionFromComponentDTO,
  DeleteSectionDTO,
  DuplicateSectionDTO,
  PlaceholderResponse,
  SectionResponse,
  UpdatePlaceholderDTO,
  UpdateSectionDTO,
} from "../types/Section";

class _SectionService implements SectionServiceInterface {
  service: SectionServiceInterfaceDB;
  constructor(service: any) {
    this.service = service;
  }

  duplicate = async (id: DuplicateSectionDTO): SectionResponse => {
    try {
      const result: ServerResponseSuccess<Section> =
        await this.service.duplicate(id);
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

  create = async (section: CreateSectionDTO): SectionResponse => {
    try {
      const result: ServerResponseSuccess<Section> = await this.service.create(
        section
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

  createFromComponent = async (
    section: CreateSectionFromComponentDTO
  ): SectionResponse => {
    try {
      const result: ServerResponseSuccess<Section> =
        await this.service.createFromComponent(section);
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
  ): PlaceholderResponse<Placeholder[]> => {
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
  ): PlaceholderResponse<Placeholder> => {
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

  delete = async (id: DeleteSectionDTO): SectionResponse => {
    try {
      const result: ServerResponseSuccess<Section> = await this.service.delete(
        id
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

  update = async (section: UpdateSectionDTO): SectionResponse => {
    try {
      const result: ServerResponseSuccess<Section> = await this.service.update(
        section
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

  updatePlaceholder = async (
    placeholder: UpdatePlaceholderDTO
  ): PlaceholderResponse<Placeholder> => {
    try {
      const result: ServerResponseSuccess<Placeholder> =
        await this.service.updatePlaceholder(placeholder);
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
