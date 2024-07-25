
type ListProps = {
  items: Array<Template | Campaign | Section | Placeholder | Component> | null,
  component: React.ElementType
  [key: string]: any;
}

const ListView = ({ items, component, ...rest }: ListProps) => {
  let Component = component
  if (!items) return null
  console.log(items);
  return <ul className="flex flex-col items-stretch justify-start gap-2">{
    items.map((item, idx) => <Component {...rest} key={item?.id || idx} item={item} />)
  }</ul>;
};

export default ListView;
