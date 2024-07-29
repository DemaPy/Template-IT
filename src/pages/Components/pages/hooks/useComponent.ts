import { COMPONENTS_KEY } from "@/constance/query-key";
import { ComponentService } from "@/services/DI/Component";
import {
  CreateComponent,
  UpdateComponent,
} from "@/services/types/Component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useFetchComponent(id: Component["id"]) {
  return useQuery({
    queryKey: [id],
    queryFn: ({ queryKey }) => ComponentService.getOne(queryKey[0]),
  });
}

export function useDeleteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: Component["id"]) => ComponentService.delete(id),
    onSuccess: () => {
      toast.success("Component has been deleted");
      navigate("/components");
      queryClient.invalidateQueries({ queryKey: COMPONENTS_KEY });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}

export function useCreateComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (component: CreateComponent) => {
      for (const key in component) {
        const value = component[key as keyof CreateComponent];
        if (Array.isArray(value)) continue
        if (value.trim().length < 3) {
          throw new Error(
            key.charAt(0).toUpperCase() + key.slice(1) + " too short."
          );
        }
      }
      return ComponentService.create(component);
    },
    onSuccess: (data) => {
      toast.success("Component has been created");
      navigate(`/components/${data.data.id}`);
      queryClient.invalidateQueries({ queryKey: COMPONENTS_KEY });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}

export function useComponentUpdate({
  invalidate_key,
}: {
  invalidate_key: Component["id"];
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (component: UpdateComponent) => {
      for (const key in component) {
        const value = component[key as keyof UpdateComponent];
        if (Array.isArray(value)) continue
        if (value.trim().length < 3) {
          throw new Error(
            key.charAt(0).toUpperCase() + key.slice(1) + " too short."
          );
        }
      }

      return ComponentService.update(component);
    },
    onSuccess: () => {
      toast.success("Component has been updated");
      queryClient.invalidateQueries({ queryKey: [invalidate_key] });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}

export function useFetchComponents() {
  return useQuery({
    queryKey: COMPONENTS_KEY,
    queryFn: () => ComponentService.getAll(),
  });
}
