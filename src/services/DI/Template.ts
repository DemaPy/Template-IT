import { ensureError } from "@/lib/utils";
import { TemplateServiceDB } from "../TemplateDB";

class _TemplateService {
  service: any;
  constructor(service: any) {
    this.service = service;
  }

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

  delete = async (template_id: Template["id"]) => {
    try {
      const result: ServerResponse<Template> = await this.service.delete(
        template_id
      );
      return result;
    } catch (err) {
      const error = ensureError(err);
      return error;
    }
  };

  create = async (template: Omit<Template, "id" | "sections" | "userId">) => {
    try {
      const result: ServerResponse<Template> = await this.service.create(
        template
      );
      return result;
    } catch (err) {
      const error = ensureError(err);
      return error;
    }
  };

  update = async (template: Template) => {
    try {
      const result: ServerResponse<Template> = await this.service.update(
        template
      );
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  };

  createSection = async (section: Omit<Section, "id" | "placeholders">) => {
    try {
      const result: ServerResponse<Section> = await this.service.createSection(
        section
      );
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  };

  createSectionFromComponent = async (section: Omit<Section, "id">) => {
    try {
      const result: ServerResponse<Section> = await this.service.createSection(
        section
      );
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  };

  createSectionPlaceholder = async (placeholder: Omit<Placeholder, "id">) => {
    try {
      const result: ServerResponse<Placeholder> =
        await this.service.createSectionPlaceholder(placeholder);
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

  getAll = async () => {
    try {
      const result: ServerResponse<Template[]> = await this.service.getAll();
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  };

  getOne = async (id: string) => {
    try {
      const result: ServerResponse<Template> = await this.service.getOne(id);
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  };

  updateSection = async (section: Section) => {
    try {
      const result: ServerResponse<Section> = await this.service.updateSection(
        section
      );
      return result;
    } catch (err: unknown) {
      const error = ensureError(err);
      return error;
    }
  };
}

export const TemplateService = new _TemplateService(TemplateServiceDB);
