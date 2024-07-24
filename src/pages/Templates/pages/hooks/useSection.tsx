import { SectionService } from "@/services/DI/Section";
import { CreateSectionDTO, CreateSectionFromComponentDTO, DeleteSectionDTO, DuplicateSectionDTO, UpdateSectionDTO } from "@/services/types/Section";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const isValid = ({ value, key }: { value: string, key: string }) => {
    if (value.trim().length < 3) {
        throw new Error(key.charAt(0).toUpperCase() + key.slice(1) + " too short.")
    }
}

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
                if (Array.isArray(value)) continue
                isValid({ key, value })
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
                if (Array.isArray(value)) continue
                isValid({ key, value })
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
                isValid({ key, value })
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

export function useDuplicate({ invalidate_key }: { invalidate_key: string }) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (item: DuplicateSectionDTO) => SectionService.duplicate({ id: item.id }),
        onSuccess: () => {
            toast.success("Section has been duplicated");
            queryClient.invalidateQueries({ queryKey: [invalidate_key] })
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })
}

export function useDeleteSectionPlaceholder({ invalidate_key }: { invalidate_key: string }) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: Placeholder["id"]) => SectionService.deletePlaceholder(id),
        onSuccess: () => {
            toast.success("Placeholder has been deleted");
            queryClient.invalidateQueries({ queryKey: [invalidate_key] })
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })
}