import PageContainer from '@/components/PageContainer'
import { Skeleton } from '@/components/ui/skeleton'


const CampaignSkeleton = () => {
    return (
        <PageContainer>
            {/* HEADING SKELETON */}
            <div className='flex justify-between'>
                <Skeleton className='h-[40px] w-[240px]' />
                <div className='flex gap-2'>
                    <Skeleton className='h-[40px] w-[40px]' />
                    <Skeleton className='h-[40px] w-[40px]' />
                </div>
            </div>
            {/* BODY SKELETON */}
            <div className='flex gap-4 items-stretch'>
                <div className='w-1/2 flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
                        <Skeleton className='w-full gap-4 border rounded-md p-4 h-10' />
                        <Skeleton className='w-full gap-4 border rounded-md p-4 h-10' />
                    </div>
                    {
                        Array.from({ length: 7 }, (_, idx) => idx).map(item => <SectionSkeleton key={item} />)
                    }
                </div>
                <div className='w-3/4 grow'>
                    <Skeleton className='w-full h-full' />
                </div>
            </div>
        </PageContainer>
    )
}

function SectionSkeleton() {
    return <Skeleton className='w-fullgap-4 border rounded-md p-4 h-14' />
}

export default CampaignSkeleton