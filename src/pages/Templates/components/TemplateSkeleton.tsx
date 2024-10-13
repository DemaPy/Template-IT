import { PageContainer } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";

export const TemplatesSkeleton = () => {
  return (
    <PageContainer>
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton key={item} className="h-[400px] p-4 flex flex-col gap-3 border rounded-md bg-blue-100 border-blue-300" />
        ))}
      </div>
    </PageContainer>
  );
};
