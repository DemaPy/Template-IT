import InputSkeleton from "@/components/Skeletons/InputSkeleton";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RegisterSkeleton = () => {
  return (
    <div className="flex items-center justify-center mx-10 h-full">
      <Card className="min-w-96 max-w-xl">
        <CardHeader className="space-y-1">
          <InputSkeleton />
          <InputSkeleton />
        </CardHeader>
        <Skeleton className="h-[400px] w-full" />
      </Card>
    </div>
  );
};

export default RegisterSkeleton;
