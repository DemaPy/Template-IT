import { SectionService } from "@/services/DI/Section";
import { CreateSectionDTO, CreateSectionFromComponentDTO, DeleteSectionDTO, UpdateSectionDTO } from "@/services/types/Section";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useFetchSection(id: Section["id"]) {
    return useQuery({
        queryKey: [id],
        queryFn: ({ queryKey }) => SectionService.getOne(queryKey[0])
    })
}


export function useCreateSection({ invalidate_key }: { invalidate_key: Template['id'] }) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (section: CreateSectionDTO) => {
            for (const key in section) {
                const value = section[key as keyof CreateSectionDTO]
                if (value.trim().length < 3) {
                    throw new Error(key.charAt(0).toUpperCase() + key.slice(1) + " too short.")
                }
            }
            return SectionService.create(section)
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

export function useUpdateSection({ invalidate_key }: { invalidate_key: string }) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (section: UpdateSectionDTO) => {
            for (const key in section) {
                const value = section[key as keyof UpdateSectionDTO]
                if (value.trim().length < 3) {
                    throw new Error(key.charAt(0).toUpperCase() + key.slice(1) + " too short.")
                }
            }
            return SectionService.update(section)
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