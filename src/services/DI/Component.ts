import { ComponentServiceDB } from "../ComponentDB";
import { CreateComponent, UpdateComponent } from "../types/Component";
import { CreatePlaceholders } from "../types/Placeholder";
import { UpdatePlaceholder } from "../types/Section";

class _ComponentService {
  service: any;
  constructor(service: any) {
    this.service = service;
  }

  delete = async (component: ComponentDeleteDTO) => {
    try {
      const result = await this.service.delete(component);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  create = async (component: CreateComponent) => {
    try {
      const result = await this.service.create(component);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  update = async (component: UpdateComponent) => {
    try {
      const result = await this.service.update(component);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  deletePlaceholder = async (placeholder_id: Placeholder["id"]) => {
    try {
      const result = await this.service.deletePlaceholder(placeholder_id);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  createPlaceholders = async (placeholders: CreatePlaceholders) => {
    try {
      const result: ServerResponseSuccess<Component["id"]> =
        await this.service.createPlaceholders(placeholders);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  getAll = async () => {
    try {
      const result: ServerResponseSuccess<Component[]> = await this.service.getAll();
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  getOne = async (id: Component["id"]) => {
    try {
      const result: ServerResponseSuccess<Component> =
        await this.service.getOne(id);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  updatePlaceholder = async (section: UpdatePlaceholder) => {
    try {
      const result = await this.service.updatePlaceholder(section);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };
}

export const ComponentService = new _ComponentService(ComponentServiceDB);
