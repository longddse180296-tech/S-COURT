import { Link } from 'react-router-dom';

const sizeClassNames = {
  sm: {
    mark: 'h-7 w-7',
    text: 'text-sm',
    gap: 'gap-2',
  },
  md: {
    mark: 'h-9 w-9',
    text: 'text-lg',
    gap: 'gap-2.5',
  },
  lg: {
    mark: 'h-11 w-11',
    text: 'text-2xl',
    gap: 'gap-3',
  },
};

const BrandLogo = ({ to, size = 'md', className = '', textClassName = '' }) => {
  const classes = sizeClassNames[size] || sizeClassNames.md;
  const content = (
    <>
      <img
        src="/assets/sportshub-mark.png"
        alt="SportsHub"
        className={`${classes.mark} shrink-0 rounded-full object-contain`}
      />
      <span className={`${classes.text} font-extrabold leading-none text-primary-deep ${textClassName}`}>
        SportsHub
      </span>
    </>
  );

  const baseClassName = `inline-flex items-center ${classes.gap} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClassName} aria-label="SportsHub">
        {content}
      </Link>
    );
  }

  return <span className={baseClassName}>{content}</span>;
};

export default BrandLogo;
