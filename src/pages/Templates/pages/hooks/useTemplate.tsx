import { TEMPLATES_KEY } from "@/constance/query-key";
import { TemplateServiceDB } from "@/services/TemplateDB";
import { CreateTemplate, DeleteTemplate, UpdateTemplate } from "@/services/types/Template";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useFetchTemplate(id: Template["id"]) {
    return useQuery({
        queryKey: [id],
        queryFn: ({ queryKey }) => TemplateServiceDB.getOne(queryKey[0])
    })
}

export function useDeleteTemplate() {
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (id: DeleteTemplate) => TemplateServiceDB.delete(id),
        onSuccess: () => {
            toast.success("Template has been deleted");
            navigate("/templates")
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
        mutationFn: (template: CreateTemplate) => {
            for (const key in template) {
                const value = template[key as keyof CreateTemplate]
                if (value.trim().length < 3) {
                    throw new Error(key.charAt(0).toUpperCase() + key.slice(1) + " too short.")
                }
            }
            return TemplateServiceDB.create(template)
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

export function useTemplateUpdate({
    invalidate_key,
}: {
    invalidate_key: Template["id"];
}) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (template: UpdateTemplate) => {
            for (const key in template) {
                const value = template[key as keyof UpdateTemplate];
                if (value.trim().length < 3) {
                    throw new Error(
                        key.charAt(0).toUpperCase() + key.slice(1) + " too short."
                    );
                }
            }

            return TemplateServiceDB.update(template);
        },
        onSuccess: () => {
            toast.success("Template has been updated");
            queryClient.invalidateQueries({ queryKey: [invalidate_key] });
        },
        onError: (data) => {
            toast.error(data.message);
        },
    });
}

export function useFetchTemplates() {
    return useQuery({
        queryKey: TEMPLATES_KEY,
        queryFn: () => TemplateServiceDB.getAll()
    })
}
