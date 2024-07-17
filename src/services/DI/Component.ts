import { ComponentServiceDB } from "../ComponentDB";
import { AccessError } from "../Errors/AccessError";
import { AuthError } from "../Errors/AuthError";
import { UpdateComponentDTO } from "../types/Component";
import { CreateComponentPlaceholderDTO } from "../types/Placeholder";
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
      if (err instanceof Error) {
        throw {
          status: "error",
          message: err.message,
        };
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  create = async (
    component: ComponentCreateDTO
  ): Promise<ServerResponseSuccess<Component>> => {
    try {
      const result: ServerResponseSuccess<Component> =
        await this.service.create(component);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        throw {
          status: "error",
          message: err.message,
        };
      }

      throw {
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
      if (err instanceof Error) {
        throw {
          status: "error",
          message: err.message,
        };
      }

      throw {
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
      if (err instanceof Error) {
        throw {
          status: "error",
          message: err.message,
        };
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  createPlaceholders = async (
    placeholders: CreateComponentPlaceholderDTO[]
  ): Promise<ServerResponseSuccess<Component["id"]>> => {
    try {
      const result: ServerResponseSuccess<Component["id"]> =
        await this.service.createPlaceholders(placeholders);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw {
          status: "error",
          message: err.message,
        };
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  getAll = async (): Promise<ServerResponseSuccess<Component[]>> => {
    try {
      const result: ServerResponseSuccess<Component[]> =
        await this.service.getAll();
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw {
          status: "error",
          message: err.message,
        };
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  getOne = async (id: string): Promise<ServerResponseSuccess<Component>> => {
    try {
      const result: ServerResponseSuccess<Component> =
        await this.service.getOne(id);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw {
          status: "error",
          message: err.message,
        };
      }

      throw {
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
      if (err instanceof Error) {
        throw {
          status: "error",
          message: err.message,
        };
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };
}

export const ComponentService = new _ComponentService(ComponentServiceDB);
