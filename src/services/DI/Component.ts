import { ComponentServiceDB } from "../ComponentDB";

class _ComponentService {
  service: any;
  constructor(service: any) {
    this.service = service;
  }

  delete = async (
    component: Component["id"]
  ): Promise<
    | ServerResponseSuccess<Component>
    | ServerResponseAuthenticationError
    | ServerResponseAuthorizationError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Component> =
        await this.service.delete(component);
      return result;
    } catch (err) {
      if (
        "code" in
        (err as
          | ServerResponseAuthenticationError
          | ServerResponseAuthorizationError)
      ) {
        return err as
          | ServerResponseAuthenticationError
          | ServerResponseAuthorizationError;
      }
      if ("errors" in (err as ServerResponseValidationError)) {
        return err as ServerResponseValidationError;
      }
      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  create = async (
    component: Omit<Component, "id" | "placeholders">
  ): Promise<
    | ServerResponseSuccess<Component>
    | ServerResponseAuthenticationError
    | ServerResponseAuthorizationError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Component> =
        await this.service.create(component);
      return result;
    } catch (err) {
      if ("errors" in (err as ServerResponseValidationError)) {
        return err as ServerResponseValidationError;
      }
      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  update = async (
    component: Component
  ): Promise<
    | ServerResponseSuccess<Component>
    | ServerResponseAuthenticationError
    | ServerResponseAuthorizationError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Component> =
        await this.service.update(component);
      return result;
    } catch (err: unknown) {
      if ("errors" in (err as ServerResponseValidationError)) {
        return err as ServerResponseValidationError;
      }
      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  deletePlaceholder = async (
    placeholder_id: Placeholder["id"],
    componentId: Component["id"]
  ): Promise<
    | ServerResponseSuccess<Component>
    | ServerResponseAuthenticationError
    | ServerResponseAuthorizationError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Component> =
        await this.service.deletePlaceholder(placeholder_id, componentId);
      return result;
    } catch (err: unknown) {
      if (
        "code" in
        (err as
          | ServerResponseAuthenticationError
          | ServerResponseAuthorizationError)
      ) {
        return err as
          | ServerResponseAuthenticationError
          | ServerResponseAuthorizationError;
      }
      if ("errors" in (err as ServerResponseValidationError)) {
        return err as ServerResponseValidationError;
      }
      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  createComponentPlaceholder = async (
    placeholder: Omit<Placeholder, "id">
  ): Promise<
    | ServerResponseSuccess<Placeholder>
    | ServerResponseAuthenticationError
    | ServerResponseAuthorizationError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Placeholder> =
        await this.service.createComponentPlaceholder(placeholder);
      return result;
    } catch (err: unknown) {
      if (
        "code" in
        (err as
          | ServerResponseAuthenticationError
          | ServerResponseAuthorizationError)
      ) {
        return err as
          | ServerResponseAuthenticationError
          | ServerResponseAuthorizationError;
      }
      if ("errors" in (err as ServerResponseValidationError)) {
        return err as ServerResponseValidationError;
      }
      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  getAll = async (): Promise<
    | ServerResponseSuccess<Component[]>
    | ServerResponseAuthenticationError
    | ServerResponseAuthorizationError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Component[]> =
        await this.service.getAll();
      return result;
    } catch (err: unknown) {
      if (
        "code" in
        (err as
          | ServerResponseAuthenticationError
          | ServerResponseAuthorizationError)
      ) {
        return err as
          | ServerResponseAuthenticationError
          | ServerResponseAuthorizationError;
      }
      if ("errors" in (err as ServerResponseValidationError)) {
        return err as ServerResponseValidationError;
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
    | ServerResponseSuccess<Component>
    | ServerResponseAuthenticationError
    | ServerResponseAuthorizationError
    | ServerResponseError
  > => {
    try {
      const result: ServerResponseSuccess<Component> =
        await this.service.getOne(id);
      return result;
    } catch (err: unknown) {
      if (
        "code" in
        (err as
          | ServerResponseAuthenticationError
          | ServerResponseAuthorizationError)
      ) {
        return err as
          | ServerResponseAuthenticationError
          | ServerResponseAuthorizationError;
      }
      if ("errors" in (err as ServerResponseValidationError)) {
        return err as ServerResponseValidationError;
      }
      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };
}

export const ComponentService = new _ComponentService(ComponentServiceDB);
