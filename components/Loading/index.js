const Loading = ({ style }) => {
  return (
    <div className="border border-black border-opacity-25 shadow rounded w-full h-80">
      <div className="animate-pulse flex h-full">
        <div className="w-full h-full bg-black bg-opacity-25"></div>
      </div>
    </div>
  );
};

export default Loading;
