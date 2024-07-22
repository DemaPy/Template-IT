import { CreatePlaceholdersDTO } from "../types/Placeholder";
import {
  CreateSectionDTO,
  CreateSectionFromComponentDTO,
  DeleteSectionDTO,
  DuplicateSectionDTO,
  PlaceholderResponse,
  UpdatePlaceholderDTO,
  UpdateSectionDTO,
} from "../types/Section";

export interface SectionServiceInterface {
  create(section: CreateSectionDTO): Promise<ServerResponseSuccess<Section>>;
  getOne(section: Section["id"]): Promise<ServerResponseSuccess<Section>>;
  duplicate(
    section_id: DuplicateSectionDTO
  ): Promise<ServerResponseSuccess<Section>>;

  createFromComponent(
    section: CreateSectionFromComponentDTO
  ): Promise<ServerResponseSuccess<Section>>;
  createPlaceholders(
    placeholders: CreatePlaceholdersDTO
  ): PlaceholderResponse<Placeholder[]>;

  deletePlaceholder(id: Placeholder["id"]): PlaceholderResponse<Placeholder>;

  delete(id: DeleteSectionDTO): Promise<ServerResponseSuccess<Section>>;
  update(section: UpdateSectionDTO): Promise<ServerResponseSuccess<Section>>;
  updatePlaceholder(
    section: UpdatePlaceholderDTO
  ): PlaceholderResponse<Placeholder>;
}

export interface SectionServiceInterfaceDB {
  create(section: CreateSectionDTO): Promise<any>;
  duplicate(section_id: DuplicateSectionDTO): Promise<any>;
  getOne(section: Section["id"]): Promise<ServerResponseSuccess<Section>>;

  createFromComponent(section: CreateSectionFromComponentDTO): Promise<any>;
  createPlaceholders(placeholders: CreatePlaceholdersDTO): Promise<any>;

  deletePlaceholder(id: Placeholder["id"]): Promise<any>;

  delete(id: DeleteSectionDTO): Promise<any>;
  update(section: UpdateSectionDTO): Promise<any>;
  updatePlaceholder(section: UpdatePlaceholderDTO): Promise<any>;
}
