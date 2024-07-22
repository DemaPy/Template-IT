import { TemplateServiceDB } from "../TemplateDB";
import {
  CreateTemplateDTO,
  DeleteTemplateDTO,
  TemplateResponse,
  UpdateTemplateDTO,
} from "../types/Template";

class _TemplateService {
  service: any;
  constructor(service: any) {
    this.service = service;
  }

  delete = async (template_id: DeleteTemplateDTO) => {
    try {
      const result = await this.service.delete(template_id);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        throw err
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  create = async (template: CreateTemplateDTO) => {
    try {
      const result = await this.service.create(template);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  update = async (data: UpdateTemplateDTO) => {
    try {
      const result = await this.service.update(data);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  getAll = async (): TemplateResponse<Template[]> => {
    try {
      const result = await this.service.getAll();
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  getOne = async (id: string) => {
    try {
      const result = await this.service.getOne(id);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err
      }

      throw {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };
}

export const TemplateService = new _TemplateService(TemplateServiceDB);
