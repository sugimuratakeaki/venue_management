import React from 'react';
import styled from 'styled-components';
import { Button, Text } from '../../atoms';
import { theme } from '../../../styles/theme';

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  multiple?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Title = styled(Text)`
  margin-bottom: ${theme.spacing.xs};
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
`;

const FilterButton = styled(Button)<{ isSelected: boolean }>`
  position: relative;
  
  ${({ isSelected }) => isSelected && `
    &::after {
      content: '✓';
      position: absolute;
      top: -4px;
      right: -4px;
      width: 16px;
      height: 16px;
      background-color: ${theme.colors.primary[500]};
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
    }
  `}
`;

const Count = styled.span`
  color: ${theme.colors.neutral[500]};
  margin-left: ${theme.spacing.xs};
`;

export const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  options,
  selectedValues,
  onChange,
  multiple = true
}) => {
  const handleOptionClick = (value: string) => {
    if (multiple) {
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter(v => v !== value));
      } else {
        onChange([...selectedValues, value]);
      }
    } else {
      onChange(selectedValues.includes(value) ? [] : [value]);
    }
  };

  return (
    <Container>
      <Title as="h4" size="md" weight="semibold">
        {title}
      </Title>
      <OptionsContainer>
        {options.map((option) => (
          <FilterButton
            key={option.value}
            variant={selectedValues.includes(option.value) ? 'primary' : 'outline'}
            size="small"
            onClick={() => handleOptionClick(option.value)}
            isSelected={selectedValues.includes(option.value)}
          >
            {option.label}
            {option.count !== undefined && (
              <Count>({option.count})</Count>
            )}
          </FilterButton>
        ))}
      </OptionsContainer>
    </Container>
  );
};