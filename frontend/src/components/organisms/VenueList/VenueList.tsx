import React from 'react';
import styled from 'styled-components';
import { VenueCard } from '../../molecules';
import { Text } from '../../atoms';
import { theme } from '../../../styles/theme';

export interface VenueListProps {
  venues: Array<{
    id: number;
    venue_name: string;
    prefecture: string;
    city: string;
    address: string;
    stations?: Array<{
      station_name: string;
      line_name: string;
      walking_time?: number | null;
    }>;
    rooms?: Array<{
      room_name: string;
      capacity_theater?: number | null;
    }>;
    tags?: string[];
    status?: string;
  }>;
  onVenueClick?: (venue: any) => void;
  loading?: boolean;
  emptyMessage?: string;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xxl};
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${theme.spacing.md};
`;

const LoadingContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xxl};
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${theme.colors.neutral[200]};
  border-top-color: ${theme.colors.primary[500]};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const VenueList: React.FC<VenueListProps> = ({
  venues,
  onVenueClick,
  loading = false,
  emptyMessage = '会場が見つかりませんでした'
}) => {
  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </Container>
    );
  }

  if (venues.length === 0) {
    return (
      <Container>
        <EmptyState>
          <EmptyIcon>🏢</EmptyIcon>
          <Text size="lg" color={theme.colors.neutral[600]}>
            {emptyMessage}
          </Text>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      {venues.map((venue) => (
        <VenueCard
          key={venue.id}
          venue={venue}
          onClick={() => onVenueClick?.(venue)}
        />
      ))}
    </Container>
  );
};