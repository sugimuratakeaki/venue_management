import React from 'react';
import styled from 'styled-components';
import { Card, Text, Badge } from '../../atoms';
import { theme } from '../../../styles/theme';

export interface VenueCardProps {
  venue: {
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
  };
  onClick?: () => void;
}

const StyledCard = styled(Card)`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
`;

const Title = styled(Text)`
  flex: 1;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.neutral[600]};
`;

const StationInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.xs};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.sm};
`;

const Icon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

export const VenueCard: React.FC<VenueCardProps> = ({ venue, onClick }) => {
  const mainStation = venue.stations?.[0];
  const maxCapacity = Math.max(...(venue.rooms?.map(r => r.capacity_theater || 0) || [0]));
  
  const getStatusVariant = (status?: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      default:
        return 'neutral';
    }
  };

  return (
    <StyledCard onClick={onClick} padding="medium">
      <CardContent>
        <Header>
          <Title as="h3" size="lg" weight="semibold">
            {venue.venue_name}
          </Title>
          {venue.status && (
            <Badge variant={getStatusVariant(venue.status)} size="small">
              {venue.status === 'active' ? '利用可' : '利用不可'}
            </Badge>
          )}
        </Header>

        <InfoRow>
          <Icon>📍</Icon>
          <Text size="sm">
            {venue.prefecture} {venue.city}
          </Text>
        </InfoRow>

        {mainStation && (
          <InfoRow>
            <Icon>🚃</Icon>
            <Text size="sm">
              {mainStation.line_name} {mainStation.station_name}
              {mainStation.walking_time && ` 徒歩${mainStation.walking_time}分`}
            </Text>
          </InfoRow>
        )}

        {maxCapacity > 0 && (
          <InfoRow>
            <Icon>👥</Icon>
            <Text size="sm">
              最大収容人数: {maxCapacity}名
            </Text>
          </InfoRow>
        )}

        {venue.rooms && venue.rooms.length > 0 && (
          <InfoRow>
            <Icon>🚪</Icon>
            <Text size="sm">
              {venue.rooms.length}部屋
            </Text>
          </InfoRow>
        )}

        {venue.tags && venue.tags.length > 0 && (
          <TagsContainer>
            {venue.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="neutral" size="small">
                {tag}
              </Badge>
            ))}
            {venue.tags.length > 3 && (
              <Badge variant="neutral" size="small">
                +{venue.tags.length - 3}
              </Badge>
            )}
          </TagsContainer>
        )}
      </CardContent>
    </StyledCard>
  );
};