import {
  SectionServiceInterface,
  SectionServiceInterfaceDB,
} from "../Interfaces";
import { SectionServiceDB } from "../Section";
import { CreatePlaceholders } from "../types/Placeholder";
import {
  CreateSection,
  CreateSectionFromComponent,
  DeleteSection,
  DuplicateSection,
  UpdatePlaceholder,
  UpdateSection,
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

  duplicate = async (id: DuplicateSection) => {
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

  create = async (section: CreateSection) => {
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

  createFromComponent = async (section: CreateSectionFromComponent) => {
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

  createPlaceholders = async (placeholders: CreatePlaceholders) => {
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

  delete = async (id: DeleteSection) => {
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

  update = async (section: UpdateSection) => {
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

  updatePlaceholder = async (placeholder: UpdatePlaceholder) => {
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
