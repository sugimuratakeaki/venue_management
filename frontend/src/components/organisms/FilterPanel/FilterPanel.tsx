import React from 'react';
import styled from 'styled-components';
import { FilterGroup } from '../../molecules';
import { Button, Text } from '../../atoms';
import { theme } from '../../../styles/theme';

export interface FilterPanelProps {
  filters: {
    prefectures: string[];
    capacityRanges: string[];
    features: string[];
  };
  selectedFilters: {
    prefectures: string[];
    capacityRanges: string[];
    features: string[];
  };
  onFilterChange: (filterType: string, values: string[]) => void;
  onClearAll: () => void;
}

const Container = styled.div`
  background-color: ${theme.colors.neutral[0]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 2px solid ${theme.colors.neutral[200]};
`;

const FilterSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const prefectureOptions = [
  { label: '東京都', value: 'tokyo', count: 5 },
  { label: '愛知県', value: 'aichi', count: 3 },
  { label: '静岡県', value: 'shizuoka', count: 2 },
  { label: '新潟県', value: 'niigata', count: 4 },
];

const capacityOptions = [
  { label: '～50名', value: '0-50', count: 2 },
  { label: '51～100名', value: '51-100', count: 5 },
  { label: '101～200名', value: '101-200', count: 4 },
  { label: '201名～', value: '201-', count: 3 },
];

const featureOptions = [
  { label: '駅近', value: 'near-station', count: 8 },
  { label: '駐車場あり', value: 'parking', count: 10 },
  { label: 'バリアフリー', value: 'barrier-free', count: 6 },
  { label: '飲食可', value: 'food-allowed', count: 7 },
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll
}) => {
  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

  return (
    <Container>
      <Header>
        <Text as="h3" size="lg" weight="semibold">
          絞り込み検索
        </Text>
        {hasActiveFilters && (
          <Button 
            variant="text" 
            size="small" 
            onClick={onClearAll}
          >
            すべてクリア
          </Button>
        )}
      </Header>

      <FilterSection>
        <FilterGroup
          title="都道府県"
          options={prefectureOptions}
          selectedValues={selectedFilters.prefectures}
          onChange={(values) => onFilterChange('prefectures', values)}
        />
      </FilterSection>

      <FilterSection>
        <FilterGroup
          title="収容人数"
          options={capacityOptions}
          selectedValues={selectedFilters.capacityRanges}
          onChange={(values) => onFilterChange('capacityRanges', values)}
        />
      </FilterSection>

      <FilterSection>
        <FilterGroup
          title="設備・特徴"
          options={featureOptions}
          selectedValues={selectedFilters.features}
          onChange={(values) => onFilterChange('features', values)}
        />
      </FilterSection>
    </Container>
  );
};