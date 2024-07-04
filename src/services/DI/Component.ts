import { ComponentServiceDB } from "../ComponentDB";
import { AccessError } from "../Errors/AccessError";
import { AuthError } from "../Errors/AuthError";
import { ValidationError } from "../Errors/ValidationError";
import { UpdateComponentDTO } from "../types/Component";
import { PlaceholderResponse, UpdatePlaceholderDTO } from "../types/Section";

class _ComponentService {
  service: any;
  constructor(service: any) {
    this.service = service;
  }

  delete = async (
    component: ComponentDeleteDTO
  ): Promise<
    | ServerResponseSuccess<Component>
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Component> =
        await this.service.delete(component);
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
    component: ComponentCreateDTO
  ): Promise<
    | ServerResponseSuccess<Component>
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Component> =
        await this.service.create(component);
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
    component: UpdateComponentDTO
  ): Promise<
    | ServerResponseSuccess<Component>
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Component> =
        await this.service.update(component);
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
    | ServerResponseSuccess<Component>
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Component> =
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

  createPlaceholders = async (
    placeholders: Omit<Placeholder, "id">[]
  ): Promise<
    | ServerResponseSuccess<Placeholder[]>
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

  getAll = async (): Promise<
    | ServerResponseSuccess<Component[]>
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Component[]> =
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
    | ServerResponseSuccess<Component>
    | AccessError
    | AuthError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Component> =
        await this.service.getOne(id);
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
    section: UpdatePlaceholderDTO
  ): PlaceholderResponse<Placeholder> => {
    try {
      const result: ServerResponseSuccess<Placeholder> =
        await this.service.updatePlaceholder(section);
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

export const ComponentService = new _ComponentService(ComponentServiceDB);
