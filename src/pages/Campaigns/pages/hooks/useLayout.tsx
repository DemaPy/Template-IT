import { CampaignServiceDB } from "@/services/CampaignDB";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";


export function useLayoutOrderUpdate({
    invalidate_key,
}: {
    invalidate_key: Campaign["id"];
}) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (layout: Layout[]) => {
            // for (const key in layout) {
            //     const value = layout[key as keyof Layout[]];
            //     if (value.trim().length < 3) {
            //         throw new Error(
            //             key.charAt(0).toUpperCase() + key.slice(1) + " too short."
            //         );
            //     }
            // }

            return CampaignServiceDB.updateLayoutsOrder(layout);
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

