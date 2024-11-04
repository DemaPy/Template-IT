type GridProps = {
  items: Array<Template | Campaign | Component> | null,
  component: React.ElementType
}

const GridView = ({ items, component }: GridProps) => {
  let Component = component
  if (!items) return null
  return <div className="grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">{
    items.map((item) => <Component key={item.id} item={item} />)
  }</div>;
};

export default GridView;
