const PillSingle = ({ href, children }) => {
  const pillStyles =
    "mr-3 inline-block border border-grey-400 rounded py-1 px-3 text-gray-200 hover:bg-gray-200 hover:bg-opacity-25 text-xl";
  return (
    <>
      {href.trim().length ? (
        <span class={pillStyles}>
          <a className="" href={href}>
            {children}
          </a>
        </span>
      ) : (
        <span className={pillStyles}>{children}</span>
      )}
    </>
  );
};

export default PillSingle;
