import { ComponentService } from "@/services/DI/Component";
import { CreateComponentPlaceholderDTO } from "@/services/types/Placeholder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeletePlaceholder({
  invalidate_key,
}: {
  invalidate_key: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: Placeholder["id"]) =>
      ComponentService.deletePlaceholder(id),
    onSuccess: () => {
      toast.success("Placeholder has been deleted");
      queryClient.invalidateQueries({ queryKey: [invalidate_key] });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}

export function useCreatePlaceholders() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (placeholders: CreateComponentPlaceholderDTO[]) => {
      for (const placeholder of placeholders) {
        for (const key in placeholder) {
          const value = placeholder[key as keyof CreateComponentPlaceholderDTO];
          if (!value) continue;
          if (value.trim().length < 3) {
            throw new Error(
              key.charAt(0).toUpperCase() + key.slice(1) + " too short."
            );
          }
        }
      }

      return ComponentService.createPlaceholders(placeholders);
    },
    onSuccess: (data) => {
      const component_id = data.data as Component["id"];
      toast.success("Placeholders has been created");
      queryClient.invalidateQueries({ queryKey: [component_id] });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}
