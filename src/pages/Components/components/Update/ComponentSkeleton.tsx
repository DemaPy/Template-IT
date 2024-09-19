import PageContainer from "@/components/PageContainer";
import { Skeleton } from "@/components/ui/skeleton";

const ComponentUpdateSkeleton = () => {
  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-[40px] w-full" />
        <div className="flex gap-2 max-w-96">
          <Skeleton className="h-[40px] w-full" />
          <Skeleton className="h-[40px] w-full" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    </PageContainer>
  );
};

export default ComponentUpdateSkeleton;
