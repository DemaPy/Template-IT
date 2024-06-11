import { ensureError } from "@/lib/utils";
import { ComponentServiceDB } from "../ComponentDB";

class _ComponentService {
  service: any;
  constructor(service: any) {
    this.service = service;
  }

  delete = async (component: Component["id"]) => {
    try {
      const result: ServerResponse<Component> = await this.service.delete(
        component
      );
      return result;
    } catch (err) {
      const error = ensureError(err);
      return error;
    }
  };

  create = async (component: Omit<Component, "id" | "placeholders">) => {
    try {
      const result: ServerResponse<Component> = await this.service.create(
        component
      );
      return result;
    } catch (err) {
      const error = ensureError(err);
      return error;
    }
  };

  update = async (component: Component) => {
    try {
      const result: ServerResponse<Component> = await this.service.update(
        component
      );
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  };

  deletePlaceholder = async (placeholder_id: Placeholder["id"]) => {
    try {
      const result: ServerResponse<Placeholder> =
        await this.service.deletePlaceholder(placeholder_id);
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  }

  createComponentPlaceholder = async (placeholder: Omit<Placeholder, "id">) => {
    try {
      const result: ServerResponse<Placeholder> =
        await this.service.createComponentPlaceholder(placeholder);
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  }

  getAll = async () => {
    try {
      const result: ServerResponse<Component[]> = await this.service.getAll();
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  };

  getOne = async (id: string) => {
    try {
      const result: ServerResponse<Component> = await this.service.getOne(id);
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  };

  deleteSection = async (section_id: Section["id"]) => {
    try {
      const result: ServerResponse<Section> = await this.service.deleteSection(
        section_id
      );
      return result;
    } catch (err) {
      const error = ensureError(err);
      return error;
    }
  };

  duplicateSection = async (section_id: Section["id"]) => {
    try {
      const result: ServerResponse<Section> =
        await this.service.duplicateSection(section_id);
      return result;
    } catch (err) {
      const error = ensureError(err);
      return error;
    }
  };
}

export const ComponentService = new _ComponentService(ComponentServiceDB);
