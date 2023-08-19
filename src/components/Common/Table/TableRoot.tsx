import type { ComponentPropsWithoutRef } from 'react';

const TableRoot = (props: ComponentPropsWithoutRef<'table'>) => {
  const { children, ...restProps } = props;

  return <table {...restProps}>{children}</table>;
};

export default TableRoot;
