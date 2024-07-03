import ComponentsSkeleton from "@/pages/Components/components/Skeleton";

type GridProps = {
  isLoading?: boolean
  items: Array<Template | Campaign | Component> | null,
  component: React.ElementType
}

const GridView = ({ isLoading, items, component }: GridProps) => {
  let Component = component
  if (!items) return null
  if (isLoading) return <ComponentsSkeleton />
  return <div className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4">{
    items.map((item) => <Component key={item.id} item={item} />)
  }</div>;
};

export default GridView;
