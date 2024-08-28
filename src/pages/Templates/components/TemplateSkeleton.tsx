import { PageContainer } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";

const TemplateSkeleton = () => {
  return (
    <PageContainer>
      <div className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton key={item} className="h-[40px] w-[240px]" />
        ))}
      </div>
    </PageContainer>
  );
};

export default TemplateSkeleton;
