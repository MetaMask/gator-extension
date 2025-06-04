const AddressCard = ({
  address,
  title,
  description,
  fallbackText,
}: {
  address: string | undefined;
  title: string;
  description: string;
  fallbackText: string;
}) => {
  return (
    <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 py-6 flex flex-col">
      <div className="mb-3">
        <span className="font-semibold text-lg">{title}</span>
      </div>
      <div className="text-sm text-base-content/70 mb-3">{description}</div>
      <div className="flex-1"></div>
      {address ? (
        <div className="bg-base-200 rounded-lg p-3">
          <div className="font-mono text-xs break-all">{address}</div>
        </div>
      ) : (
        <div className="bg-base-200 rounded-lg p-3 text-base-content/60 text-sm italic">{fallbackText}</div>
      )}
    </div>
  );
};

export default AddressCard;
