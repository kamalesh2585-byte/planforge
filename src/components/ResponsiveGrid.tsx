import { ReactNode } from 'react';

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ResponsiveGrid({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  className = '',
}: ResponsiveGridProps) {
  const gapMap = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const colClasses = `
    grid
    ${cols.mobile ? `grid-cols-${cols.mobile}` : 'grid-cols-1'}
    ${cols.tablet ? `md:grid-cols-${cols.tablet}` : 'md:grid-cols-2'}
    ${cols.desktop ? `lg:grid-cols-${cols.desktop}` : 'lg:grid-cols-3'}
    ${gapMap[gap]}
    ${className}
  `;

  return <div className={colClasses}>{children}</div>;
}
