import { SectionService } from "@/services/DI/Section";
import { CreateSectionFromComponentDTO, DeleteSectionDTO } from "@/services/types/Section";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export function useCreateFromComponent({ invalidate_key }: { invalidate_key: string }) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (component: CreateSectionFromComponentDTO) => {
            for (const key in component) {
                const value = component[key as keyof CreateSectionFromComponentDTO]
                if (value.trim().length < 3) {
                    throw new Error(key.charAt(0).toUpperCase() + key.slice(1) + " too short.")
                }
            }
            return SectionService.createFromComponent(component)
        },
        onSuccess: () => {
            toast.success("Section has been created");
            queryClient.invalidateQueries({ queryKey: [invalidate_key] })
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })
}

export function useDeleteSection({ invalidate_key }: { invalidate_key: string }) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: DeleteSectionDTO) => SectionService.delete(id),
        onSuccess: () => {
            toast.success("Section has been deleted");
            queryClient.invalidateQueries({ queryKey: [invalidate_key] })
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })
}