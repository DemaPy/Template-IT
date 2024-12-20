import PageContainer from "@/components/PageContainer";
import { Skeleton } from "@/components/ui/skeleton";

const SectionUpdateSkeleton = () => {
  return (
    <PageContainer>
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    </PageContainer>
  );
};

export default SectionUpdateSkeleton;
