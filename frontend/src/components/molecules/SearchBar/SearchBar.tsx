import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from '../../atoms';
import { theme } from '../../../styles/theme';

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  className?: string;
}

const SearchContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const SearchInputWrapper = styled.div`
  flex: 1;
`;

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '検索...',
  onSearch,
  className
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer className={className}>
      <SearchInputWrapper>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
        />
      </SearchInputWrapper>
      <Button 
        onClick={handleSearch}
        variant="primary"
      >
        検索
      </Button>
    </SearchContainer>
  );
};