import { SectionServiceDB } from "@/services/Section";
import { UpdatePlaceholder } from "@/services/types/Placeholder";
import {
  CreateSection,
  CreateSectionFromComponent,
  DeleteSection,
  DuplicateSection,
  UpdateSection,
} from "@/services/types/Section";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const isValid = ({ value, key }: { value: string; key: string }) => {
  if (value.trim().length < 3) {
    throw new Error(key.charAt(0).toUpperCase() + key.slice(1) + " too short.");
  }
};

export function useFetchSection(id: Section["id"]) {
  return useQuery({
    queryKey: [id],
    queryFn: () => SectionServiceDB.getOne(id),
  });
}

export function useCreateSection({
  invalidate_key,
}: {
  invalidate_key: Template["id"];
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (section: CreateSection) => {
      for (const key in section) {
        console.log(key)
        const value = section[key as keyof CreateSection];
        if (Array.isArray(value)) continue;
        isValid({ key, value });
      }
      return SectionServiceDB.create(section);
    },
    onSuccess: () => {
      toast.success("Section has been created");
      queryClient.invalidateQueries({ queryKey: [invalidate_key] });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}

export function useUpdateSection({
  invalidate_key,
}: {
  invalidate_key: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (section: UpdateSection) => {
      for (const key in section) {
        const value = section[key as keyof UpdateSection];
        if (Array.isArray(value)) continue;
        isValid({ key, value });
      }
      return SectionServiceDB.update(section);
    },
    onSuccess: () => {
      toast.success("Section has been updated");
      queryClient.invalidateQueries({ queryKey: [invalidate_key] });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}

export function useCreateFromComponent({
  invalidate_key,
}: {
  invalidate_key: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (component: CreateSectionFromComponent) => {
      for (const key in component) {
        const value = component[key as keyof CreateSectionFromComponent];
        isValid({ key, value });
      }
      return SectionServiceDB.createFromComponent(component);
    },
    onSuccess: () => {
      toast.success("Section has been created");
      queryClient.invalidateQueries({ queryKey: [invalidate_key] });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}

export function useDeleteSection({
  invalidate_key,
}: {
  invalidate_key: string;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: DeleteSection) => SectionServiceDB.delete(id),
    onSuccess: () => {
      toast.success("Section has been deleted");
      queryClient.invalidateQueries({ queryKey: [invalidate_key] });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}

export function useDuplicate({ invalidate_key }: { invalidate_key: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: DuplicateSection) =>
      SectionServiceDB.duplicate({ id: item.id }),
    onSuccess: () => {
      toast.success("Section has been duplicated");
      queryClient.invalidateQueries({ queryKey: [invalidate_key] });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}

export function useUpdateSectionPlaceholder({
  invalidate_key,
}: {
  invalidate_key: string;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (placeholders: UpdatePlaceholder) =>
      SectionServiceDB.updatePlaceholder(placeholders),
    onSuccess: () => {
      toast.success("Placeholders has been created");
      queryClient.invalidateQueries({ queryKey: [invalidate_key] });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}
