import { CreatePlaceholders } from "../types/Placeholder";
import {
  CreateSection,
  CreateSectionFromComponent,
  DeleteSection,
  DuplicateSection,
  PlaceholderResponse,
  UpdatePlaceholder,
  UpdateSection,
} from "../types/Section";

export interface SectionServiceInterface {
  create(section: CreateSection): Promise<ServerResponseSuccess<Section>>;
  getOne(section: Section["id"]): Promise<ServerResponseSuccess<Section>>;
  duplicate(
    section_id: DuplicateSection
  ): Promise<ServerResponseSuccess<Section>>;

  createFromComponent(
    section: CreateSectionFromComponent
  ): Promise<ServerResponseSuccess<Section>>;
  createPlaceholders(
    placeholders: CreatePlaceholders
  ): PlaceholderResponse<Placeholder[]>;

  deletePlaceholder(id: Placeholder["id"]): PlaceholderResponse<Placeholder>;

  delete(id: DeleteSection): Promise<ServerResponseSuccess<Section>>;
  update(section: UpdateSection): Promise<ServerResponseSuccess<Section>>;
  updatePlaceholder(
    section: UpdatePlaceholder
  ): PlaceholderResponse<Placeholder>;
}

export interface SectionServiceInterfaceDB {
  create(section: CreateSection): Promise<any>;
  duplicate(section_id: DuplicateSection): Promise<any>;
  getOne(section: Section["id"]): Promise<ServerResponseSuccess<Section>>;

  createFromComponent(section: CreateSectionFromComponent): Promise<any>;
  createPlaceholders(placeholders: CreatePlaceholders): Promise<any>;

  deletePlaceholder(id: Placeholder["id"]): Promise<any>;

  delete(id: DeleteSection): Promise<any>;
  update(section: UpdateSection): Promise<any>;
  updatePlaceholder(section: UpdatePlaceholder): Promise<any>;
}
