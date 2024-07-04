import {
  CreateSectionDTO,
  CreateSectionFromComponentDTO,
  DeleteSectionDTO,
  DuplicateSectionDTO,
  PlaceholderResponse,
  SectionResponse,
  UpdatePlaceholderDTO,
  UpdateSectionDTO,
} from "../types/Section";

export interface SectionServiceInterface {
  create(section: CreateSectionDTO): SectionResponse;
  duplicate(section_id: DuplicateSectionDTO): SectionResponse;

  createFromComponent(section: CreateSectionFromComponentDTO): SectionResponse;
  createPlaceholders(
    placeholders: Omit<Placeholder, "id">[]
  ): PlaceholderResponse<Placeholder[]>;

  deletePlaceholder(id: Placeholder["id"]): PlaceholderResponse<Placeholder>;

  delete(id: DeleteSectionDTO): SectionResponse;
  update(section: UpdateSectionDTO): SectionResponse;
  updatePlaceholder(
    section: UpdatePlaceholderDTO
  ): PlaceholderResponse<Placeholder>;
}

export interface SectionServiceInterfaceDB {
  create(section: CreateSectionDTO): Promise<any>;
  duplicate(section_id: DuplicateSectionDTO): Promise<any>;

  createFromComponent(section: CreateSectionFromComponentDTO): Promise<any>;
  createPlaceholders(placeholders: Omit<Placeholder, "id">[]): Promise<any>;

  deletePlaceholder(id: Placeholder["id"]): Promise<any>;

  delete(id: DeleteSectionDTO): Promise<any>;
  update(section: UpdateSectionDTO): Promise<any>;
  updatePlaceholder(section: UpdatePlaceholderDTO): Promise<any>;
}
