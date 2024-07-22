import {
  SectionServiceInterface,
  SectionServiceInterfaceDB,
} from "../Interfaces";
import { SectionServiceDB } from "../Section";
import { CreatePlaceholdersDTO } from "../types/Placeholder";
import {
  CreateSectionDTO,
  CreateSectionFromComponentDTO,
  DeleteSectionDTO,
  DuplicateSectionDTO,
  UpdatePlaceholderDTO,
  UpdateSectionDTO,
} from "../types/Section";

class _SectionService implements SectionServiceInterface {
  service: SectionServiceInterfaceDB;
  constructor(service: any) {
    this.service = service;
  }

  getOne = async (id: Section["id"]) => {
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

  duplicate = async (id: DuplicateSectionDTO) => {
    try {
      const result = await this.service.duplicate(id);
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

  create = async (section: CreateSectionDTO) => {
    try {
      const result = await this.service.create(section);
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

  createFromComponent = async (section: CreateSectionFromComponentDTO) => {
    try {
      const result = await this.service.createFromComponent(section);
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

  createPlaceholders = async (placeholders: CreatePlaceholdersDTO) => {
    try {
      const result = await this.service.createPlaceholders(placeholders);
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

  deletePlaceholder = async (placeholder_id: Placeholder["id"]) => {
    try {
      const result = await this.service.deletePlaceholder(placeholder_id);
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

  delete = async (id: DeleteSectionDTO) => {
    try {
      const result = await this.service.delete(id);
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

  update = async (section: UpdateSectionDTO) => {
    try {
      const result = await this.service.update(section);
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

  updatePlaceholder = async (placeholder: UpdatePlaceholderDTO) => {
    try {
      const result = await this.service.updatePlaceholder(placeholder);
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

export const SectionService = new _SectionService(SectionServiceDB);
