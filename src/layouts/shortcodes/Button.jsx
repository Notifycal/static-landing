const Button = ({ href, style, rel, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel={`
        noopener noreferrer ${rel ? (rel === 'follow' ? '' : rel) : 'nofollow'}
      `}
      className={`btn me-4 mb-4 ${style === 'outline' ? 'btn-outline-primary' : 'btn-primary'} border-primary inline-flex items-center justify-center no-underline hover:text-white`}
    >
      {children}
    </a>
  );
};

export default Button;
