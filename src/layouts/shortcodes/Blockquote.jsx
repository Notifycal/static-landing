const Blockquote = ({ name, children }) => {
  return (
    <div className="blockquote my-10 rounded-xl bg-white px-16 py-8 lg:px-20">
      <blockquote className="text-text-dark text-2xl">{children}</blockquote>
      <p className="mt-4 mb-0">{name}</p>
    </div>
  );
};

export default Blockquote;
