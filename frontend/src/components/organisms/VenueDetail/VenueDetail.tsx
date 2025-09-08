import React from 'react';
import styled from 'styled-components';
import { Card, Text, Badge, Button } from '../../atoms';
import { InfoItem } from '../../molecules';
import { theme } from '../../../styles/theme';

export interface VenueDetailProps {
  venue: any;
  onBack?: () => void;
  onEdit?: () => void;
}

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const BackButton = styled(Button)`
  margin-bottom: ${theme.spacing.lg};
`;

const MainCard = styled(Card)`
  margin-bottom: ${theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 2px solid ${theme.colors.neutral[200]};
`;

const TitleSection = styled.div`
  flex: 1;
`;

const StatusBadge = styled(Badge)`
  margin-top: ${theme.spacing.xs};
`;

const Section = styled.div`
  margin-bottom: ${theme.spacing.xl};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled(Text)`
  margin-bottom: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.neutral[200]};
`;

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
`;

const RoomCard = styled(Card)`
  background-color: ${theme.colors.neutral[50]};
`;

const StationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.md};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const VenueDetail: React.FC<VenueDetailProps> = ({ venue, onBack, onEdit }) => {
  if (!venue) return null;

  return (
    <Container>
      {onBack && (
        <BackButton variant="text" onClick={onBack}>
          ← 一覧に戻る
        </BackButton>
      )}

      <MainCard padding="large">
        <Header>
          <TitleSection>
            <Text as="h1" size="xxl" weight="bold">
              {venue.venue_name}
            </Text>
            <Text size="md" color={theme.colors.neutral[600]}>
              {venue.official_name || venue.venue_name}
            </Text>
          </TitleSection>
          <StatusBadge variant={venue.status === 'active' ? 'success' : 'neutral'}>
            {venue.status === 'active' ? '利用可能' : '確認中'}
          </StatusBadge>
        </Header>

        <Section>
          <SectionTitle as="h2" size="lg" weight="semibold">
            基本情報
          </SectionTitle>
          <InfoItem
            label="住所"
            value={`〒${venue.postal_code || ''} ${venue.address}`}
            icon="📍"
          />
          <InfoItem
            label="電話番号"
            value={venue.phone_number || '未登録'}
            icon="📞"
          />
          {venue.email && (
            <InfoItem
              label="メールアドレス"
              value={venue.email}
              icon="✉️"
            />
          )}
          {venue.official_url && (
            <InfoItem
              label="公式サイト"
              value={
                <a href={venue.official_url} target="_blank" rel="noopener noreferrer">
                  {venue.official_url}
                </a>
              }
              icon="🌐"
            />
          )}
        </Section>

        {venue.rooms && venue.rooms.length > 0 && (
          <Section>
            <SectionTitle as="h2" size="lg" weight="semibold">
              部屋情報
            </SectionTitle>
            <RoomsGrid>
              {venue.rooms.map((room: any, index: number) => (
                <RoomCard key={index} padding="medium">
                  <Text weight="semibold">{room.room_name}</Text>
                  <Text size="sm" color={theme.colors.neutral[600]}>
                    {room.room_type}
                  </Text>
                  {room.floor && (
                    <Text size="sm">階数: {room.floor}階</Text>
                  )}
                  {room.floor_area && (
                    <Text size="sm">面積: {room.floor_area}㎡</Text>
                  )}
                  {room.capacity_theater && (
                    <Text size="sm">収容人数: {room.capacity_theater}名</Text>
                  )}
                </RoomCard>
              ))}
            </RoomsGrid>
          </Section>
        )}

        {venue.stations && venue.stations.length > 0 && (
          <Section>
            <SectionTitle as="h2" size="lg" weight="semibold">
              アクセス情報
            </SectionTitle>
            <StationsGrid>
              {venue.stations.map((station: any, index: number) => (
                <InfoItem
                  key={index}
                  label={`${station.line_name} ${station.station_name}`}
                  value={
                    <>
                      {station.exit_name && <Text size="sm">出口: {station.exit_name}</Text>}
                      {station.transportation_method && (
                        <Text size="sm">
                          {station.transportation_method}
                          {station.walking_time && ` ${station.walking_time}分`}
                        </Text>
                      )}
                      {station.notes && <Text size="sm">{station.notes}</Text>}
                    </>
                  }
                  icon="🚃"
                />
              ))}
            </StationsGrid>
          </Section>
        )}

        {venue.tags && venue.tags.length > 0 && (
          <Section>
            <SectionTitle as="h2" size="lg" weight="semibold">
              タグ
            </SectionTitle>
            <TagsContainer>
              {venue.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="neutral">
                  {tag}
                </Badge>
              ))}
            </TagsContainer>
          </Section>
        )}

        <ActionButtons>
          <Button variant="primary" fullWidth onClick={onEdit}>
            編集する
          </Button>
          <Button variant="outline" fullWidth>
            PDFでエクスポート
          </Button>
        </ActionButtons>
      </MainCard>
    </Container>
  );
};