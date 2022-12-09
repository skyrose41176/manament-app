import {Card, InputBase} from '@mui/material';
import {SearchNormal1} from 'iconsax-react';
import React, {FC, useRef, useState} from 'react';

interface Props {
  placeholder?: string;
  onSubmit: (value: string) => void;
  width?: number | string;
}
const SearchBar: FC<Props> = props => {
  const {placeholder = 'Vui lòng nhập từ khóa', onSubmit, width = 220} = props;
  const [search, setSearch] = useState('');
  const typingRef = useRef<any>();

  const handleSearchDebounce = (value: string) => {
    setSearch(value);
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }
    typingRef.current = setTimeout(() => {
      onSubmit && onSubmit(value);
    }, 300);
  };
  return (
    <Card
      sx={{
        p: '2px 10px 2px 0px',
        display: 'flex',
        alignItems: 'center',
        width: width,
        height: 32,
        borderRadius: '4px',
        border: '1px solid #eeeeee',
        boxShadow: 'none',
        // boxShadow: 'rgb(145 158 171 / 24%) 0px 1px 2px 0px',
      }}
    >
      <InputBase
        sx={{ml: 1, flex: 1, fontSize: '14px'}}
        placeholder={placeholder}
        value={search}
        onChange={({target: {value}}) => handleSearchDebounce(value)}
      />
      <SearchNormal1 color="#555" size={16} />
    </Card>
  );
};

export default SearchBar;
