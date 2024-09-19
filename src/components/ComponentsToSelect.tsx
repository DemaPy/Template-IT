import { useFetchComponents } from "@/pages/Components/pages/hooks/useComponent"
import {ErrorPage} from "@/pages/Error/Error"
import { SelectItem } from "./ui/select"
import ComponentsSkeleton from "@/pages/Components/components/ComponentsSkeleton"

export function ComponentsToSelect() {
    const { data, isPending, isError, error } = useFetchComponents()

    if (isPending) return <ComponentsSkeleton />

    if (isError) {
        return <ErrorPage error={error} message={error.message} path="/" />
    }

    return (
        <>
            {data.data.map((item, idx) => <SelectItem key={idx} value={item.id}>{item.title}</SelectItem>)}
        </>
    )
}
