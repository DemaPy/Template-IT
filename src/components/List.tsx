
type ListProps = {
    items: Array<Template | Campaign | Section | Placeholder | Component> | null,
    component: React.ElementType
    [key: string]: any;
  }
  
  const ListView = ({ items, component, ...rest }: ListProps) => {
    let Component = component
  if (!items) return null
    return <ul className="flex flex-col items-center justify-start gap-4">{
      items.map((item) => <Component {...rest} key={item.id} item={item} />)
    }</ul>;
  };
  
  export default ListView;
  