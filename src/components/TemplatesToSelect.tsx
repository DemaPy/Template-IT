import Error from "@/pages/Error/Error"
import { SelectItem } from "./ui/select"
import { useFetchTemplates } from "@/pages/Templates/pages/hooks/useTemplate";
import ComponentsSkeleton from "@/pages/Components/components/ComponentsSkeleton";

export function TemplatesToSelect() {
    const { data, isError, error, isPending } = useFetchTemplates();

    if (isPending) return <ComponentsSkeleton />

    if (isError) {
        return <Error error={error} message={error.message} path="/" />
    }

    return (
        <>
            {data.data.map((item, idx) => <SelectItem key={idx} value={item.id}>{item.title}</SelectItem>)}
        </>
    )
}
