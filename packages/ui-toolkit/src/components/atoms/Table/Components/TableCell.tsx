import React, { ReactNode } from 'react';


type Props = {
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
  textAlign?: 'left' | 'right' | 'center';
  colSpan?: number;
  rowSpan?: number;
  onClick?: (e?: React.MouseEvent) => void;
  width?: number | string;
}


const TableCell = (props: Props) => {
  const { children, className = 'tb10Td', style, width, textAlign, colSpan = 1, rowSpan = 1, onClick } = props;

  return (
    <td onClick={onClick}
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={{ ...style, textAlign }}
      className={className}
      width={width}
    >
      {children}
    </td>
  );
};

export default TableCell;
