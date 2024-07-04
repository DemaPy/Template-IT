import { TemplateServiceDB } from "../TemplateDB";
import { AccessError } from "../Errors/AccessError";
import { AuthError } from "../Errors/AuthError";
import { ValidationError } from "../Errors/ValidationError";
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

  create = async (template: CreateTemplateDTO): TemplateResponse<Template> => {
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

  update = async (template: Template): TemplateResponse<Template> => {
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

  getAll = async (): TemplateResponse<Template[]> => {
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
}

export const TemplateService = new _TemplateService(TemplateServiceDB);
