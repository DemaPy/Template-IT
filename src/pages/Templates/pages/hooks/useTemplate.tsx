import { TEMPLATES_KEY } from "@/constance/query-key";
import { TemplateService } from "@/services/DI/Template";
import { CreateTemplateDTO, DeleteTemplateDTO } from "@/services/types/Template";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useFetchTemplate(id: Template["id"]) {
    return useQuery({
        queryKey: [id],
        queryFn: ({ queryKey }) => TemplateService.getOne(queryKey[0])
    })
}

export function useDeleteTemplate() {
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (id: DeleteTemplateDTO) => TemplateService.delete(id),
        onSuccess: () => {
            toast.success("Template has been deleted");
            navigate("/components")
            queryClient.invalidateQueries({ queryKey: TEMPLATES_KEY })
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })
}

export function useCreateTemplate() {
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (template: CreateTemplateDTO) => {
            for (const key in template) {
                const value = template[key as keyof CreateTemplateDTO]
                if (value.trim().length < 3) {
                    throw new Error(key.charAt(0).toUpperCase() + key.slice(1) + " too short.")
                }
            }
            return TemplateService.create(template)
        },
        onSuccess: (data) => {
            toast.success("Template has been created");
            navigate(`/templates/${data.data.id}`)
            queryClient.invalidateQueries({ queryKey: TEMPLATES_KEY })
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })
}

export function useFetchTemplates() {
    return useQuery({
        queryKey: TEMPLATES_KEY,
        queryFn: () => TemplateService.getAll()
    })
}
