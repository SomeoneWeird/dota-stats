const PillDouble = ({ left, right }) => {
  return (
    <div className="flex rounded h-10 mr-4">
      <span className="rounded-l flex-grow h-full flex justify-center items-center px-2 bg-black bg-opacity-50">
        {left}
      </span>
      <span className="rounded-r flex-grow h-full flex justify-center items-center px-2 bg-black bg-opacity-20">
        {right}
      </span>
    </div>
  );
};

export default PillDouble;
