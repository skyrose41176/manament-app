import React from 'react';

export interface ColumnTableProps {
  field: string;
  headerName: React.ReactNode;
  type?: 'text' | number;
  valueGetter?: (row: any, index: number) => void;
  renderCell?: (row: any, index: number) => void;
  center?: boolean;
  width?: string | number;
  maxWidth?: string | number;
  minWidth?: string | number;
  isSortable?: boolean;
}
