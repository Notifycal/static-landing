function Tab({ name, children }) {
  return <div data-name={name}>{children}</div>;
}

export default Tab;
