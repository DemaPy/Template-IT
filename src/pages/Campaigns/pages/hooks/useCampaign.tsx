import { CAMPAIGNS_KEY } from "@/constance/query-key";
import { CampaignService } from "@/services/DI/Campaign";
import { CreateCampaignDTO, DeleteCampaignDTO, UpdateCampaignDTO } from "@/services/types/Campaign";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useFetchCampaign(id: Campaign["id"]) {
    return useQuery({
        queryKey: [id],
        queryFn: ({ queryKey }) => CampaignService.getOne(queryKey[0])
    })
}

export function useDeleteCampaign() {
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (id: DeleteCampaignDTO) => CampaignService.delete(id),
        onSuccess: () => {
            toast.success("Campaign has been deleted");
            navigate("/campaigns")
            queryClient.invalidateQueries({ queryKey: CAMPAIGNS_KEY })
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })
}

export function useCreateCampaign() {
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (campaign: CreateCampaignDTO) => {
            for (const key in campaign) {
                const value = campaign[key as keyof CreateCampaignDTO]
                if (value.trim().length < 3) {
                    throw new Error(key.charAt(0).toUpperCase() + key.slice(1) + " too short.")
                }
            }
            return CampaignService.create(campaign)
        },
        onSuccess: (data) => {
            toast.success("Campaign has been created");
            navigate(`/campaings/${data.data.id}`)
            queryClient.invalidateQueries({ queryKey: CAMPAIGNS_KEY })
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })
}

export function useCampaignUpdate({
    invalidate_key,
}: {
    invalidate_key: Campaign["id"];
}) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (campaign: UpdateCampaignDTO) => {
            for (const key in campaign) {
                const value = campaign[key as keyof UpdateCampaignDTO];
                if (value.trim().length < 3) {
                    throw new Error(
                        key.charAt(0).toUpperCase() + key.slice(1) + " too short."
                    );
                }
            }

            return CampaignService.update(campaign);
        },
        onSuccess: () => {
            toast.success("Campaign has been updated");
            queryClient.invalidateQueries({ queryKey: [invalidate_key] });
        },
        onError: (data) => {
            toast.error(data.message);
        },
    });
}

export function useFetchCampaigns() {
    return useQuery({
        queryKey: CAMPAIGNS_KEY,
        queryFn: () => CampaignService.getAll()
    })
}
