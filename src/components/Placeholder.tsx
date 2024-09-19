type PlaceholderProps = {
  item: Placeholder;
};

const Placeholder = ({ item }: PlaceholderProps) => {
  return (
    <div className="flex justify-between gap-2 items-center" key={item.id}>
      <p className="p-2 border rounded-md grow text-sm font-semibold">
        {item.title}
      </p>
    </div>
  );
};

export default Placeholder;
