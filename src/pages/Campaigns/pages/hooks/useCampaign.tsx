import { CAMPAIGNS_KEY } from "@/constance/query-key";
import { CampaignServiceDB } from "@/services/CampaignDB";
import {
  CreateCampaign,
  DeleteCampaign,
  UpdateCampaign,
} from "@/services/types/Campaign";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useFetchCampaign(id: Campaign["id"]) {
  return useQuery({
    queryKey: [id],
    queryFn: ({ queryKey }) => CampaignServiceDB.getOne(queryKey[0]),
  });
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: DeleteCampaign) => CampaignServiceDB.delete(id),
    onSuccess: () => {
      toast.success("Campaign has been deleted");
      navigate("/campaigns");
      queryClient.invalidateQueries({ queryKey: CAMPAIGNS_KEY });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (campaign: CreateCampaign) => {
      for (const key in campaign) {
        const value = campaign[key as keyof CreateCampaign];
        if (value.trim().length < 3) {
          throw new Error(
            key.charAt(0).toUpperCase() + key.slice(1) + " too short."
          );
        }
      }
      return CampaignServiceDB.create(campaign);
    },
    onSuccess: (data) => {
      toast.success("Campaign has been created");
      navigate(`/campaigns/${data.data.id}`);
      queryClient.invalidateQueries({ queryKey: CAMPAIGNS_KEY });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}

export function useCampaignUpdate({
  invalidate_key,
}: {
  invalidate_key: QueryKey;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (campaign: UpdateCampaign) => {
      for (const key in campaign) {
        const value = campaign[key as keyof UpdateCampaign];
        if (value.trim().length < 3) {
          throw new Error(
            key.charAt(0).toUpperCase() + key.slice(1) + " too short."
          );
        }
      }

      return CampaignServiceDB.update(campaign);
    },
    onSuccess: () => {
      toast.success("Campaign has been updated");
      queryClient.invalidateQueries({ queryKey: invalidate_key });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}

export function useFetchCampaigns() {
  return useQuery({
    queryKey: CAMPAIGNS_KEY,
    queryFn: () => CampaignServiceDB.getAll(),
  });
}
