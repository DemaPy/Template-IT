import { TemplateServiceDB } from "../TemplateDB";
import {
  CreateTemplateDTO,
  DeleteTemplateDTO,
  TemplateResponse,
} from "../types/Template";

class _TemplateService {
  service: any;
  constructor(service: any) {
    this.service = service;
  }

  delete = async (
    template_id: DeleteTemplateDTO
  ): TemplateResponse<Template> => {
    try {
      const result: ServerResponseSuccess<Template> = await this.service.delete(
        template_id
      );
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

  create = async (template: CreateTemplateDTO): TemplateResponse<Template> => {
    try {
      const result: ServerResponseSuccess<Template> = await this.service.create(
        template
      );
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

  update = async (template: Template): TemplateResponse<Template> => {
    try {
      const result: ServerResponseSuccess<Template> = await this.service.update(
        template
      );
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

  getAll = async (): TemplateResponse<Template[]> => {
    try {
      const result: ServerResponseSuccess<Template[]> =
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

  getOne = async (id: string): Promise<ServerResponseSuccess<Template>> => {
    try {
      const result: ServerResponseSuccess<Template> = await this.service.getOne(
        id
      );
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

export const TemplateService = new _TemplateService(TemplateServiceDB);
