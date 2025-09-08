import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { VenueList, FilterPanel } from '../../organisms';
import { SearchBar } from '../../molecules';
import { Text } from '../../atoms';
import { useVenues } from '../../../hooks/useVenues';
import { theme } from '../../../styles/theme';


const SearchSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const FilterSection = styled.aside`
  @media (max-width: ${theme.breakpoints.desktop}) {
    display: none;
  }
`;

const ResultsSection = styled.main`
  min-height: 400px;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const MobileFilterButton = styled.button`
  display: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.neutral[0]};
  border: 1px solid ${theme.colors.neutral[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.md};
  cursor: pointer;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    display: block;
  }
`;

interface VenueListPageProps {
  onVenueSelect?: (venueId: number) => void;
}

export const VenueListPage: React.FC<VenueListPageProps> = ({ onVenueSelect }) => {
  const { venues, loading, error, searchVenues, filterVenues } = useVenues();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    prefectures: [] as string[],
    capacityRanges: [] as string[],
    features: [] as string[]
  });
  const [selectedVenue, setSelectedVenue] = useState<any>(null);

  const filteredVenues = useMemo(() => {
    let result = searchQuery ? searchVenues(searchQuery) : venues;
    
    const hasFilters = Object.values(selectedFilters).some(arr => arr.length > 0);
    if (hasFilters) {
      result = filterVenues(selectedFilters);
    }
    
    return result;
  }, [venues, searchQuery, selectedFilters, searchVenues, filterVenues]);

  const handleFilterChange = (filterType: string, values: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      prefectures: [],
      capacityRanges: [],
      features: []
    });
  };

  const handleVenueClick = (venue: any) => {
    setSelectedVenue(venue);
    if (onVenueSelect) {
      onVenueSelect(venue.id);
    }
  };

  if (error) {
    return (
      <div>
        <Text color={theme.colors.error}>{error}</Text>
      </div>
    );
  }

  return (
    <div>
        <Text size="md" color={theme.colors.neutral[600]} style={{ marginBottom: theme.spacing.xl }}>
          全国の防災研修に適した会場を検索・管理できます
        </Text>

        <SearchSection>
          <SearchBar
            placeholder="会場名、地域、駅名、タグで検索..."
            onSearch={setSearchQuery}
          />
        </SearchSection>

        <MainContent>
          <FilterSection>
            <FilterPanel
              filters={{
                prefectures: [],
                capacityRanges: [],
                features: []
              }}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearFilters}
            />
          </FilterSection>

          <ResultsSection>
            <ResultsHeader>
              <Text size="md" color={theme.colors.neutral[600]}>
                {loading ? '読み込み中...' : `${filteredVenues.length}件の会場`}
              </Text>
              <MobileFilterButton>
                絞り込み
              </MobileFilterButton>
            </ResultsHeader>

            <VenueList
              venues={filteredVenues}
              onVenueClick={handleVenueClick}
              loading={loading}
              emptyMessage={
                searchQuery || Object.values(selectedFilters).some(arr => arr.length > 0)
                  ? '検索条件に一致する会場が見つかりませんでした'
                  : '会場データがありません'
              }
            />
          </ResultsSection>
        </MainContent>
    </div>
  );
};