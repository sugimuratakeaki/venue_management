import React, { useState } from 'react';
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
  max-width: 1200px;
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

const TabContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xl};
  border-bottom: 2px solid ${theme.colors.neutral[200]};
  overflow-x: auto;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? theme.colors.primary[500] : 'transparent'};
  color: ${props => props.active ? theme.colors.primary[700] : theme.colors.neutral[600]};
  font-weight: ${props => props.active ? theme.fontWeight.semibold : theme.fontWeight.regular};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  
  &:hover {
    color: ${theme.colors.primary[600]};
  }
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.md};
`;

const InfoCard = styled(Card)`
  background-color: ${theme.colors.neutral[50]};
`;

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
`;

const RoomCard = styled(Card)`
  background-color: ${theme.colors.neutral[50]};
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.neutral[200]};
`;

const RoomSpecs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.sm};
  margin: ${theme.spacing.md} 0;
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.xs} 0;
  border-bottom: 1px solid ${theme.colors.neutral[100]};
`;

const ControlRoomList = styled.div`
  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.sm};
  background: ${theme.colors.neutral[0]};
  border-radius: ${theme.borderRadius.sm};
`;

const StationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.md};
`;

const EquipmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.sm};
`;

const EquipmentItem = styled.div<{ available?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm};
  background: ${props => props.available ? theme.colors.success + '10' : theme.colors.neutral[50]};
  border-radius: ${theme.borderRadius.sm};
  color: ${props => props.available ? theme.colors.neutral[700] : theme.colors.neutral[400]};
`;

const CheckIcon = styled.span`
  color: ${theme.colors.success};
  font-weight: ${theme.fontWeight.bold};
`;

const CrossIcon = styled.span`
  color: ${theme.colors.neutral[400]};
`;

const PricingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const PricingRow = styled.tr`
  border-bottom: 1px solid ${theme.colors.neutral[200]};
  
  &:last-child {
    border-bottom: none;
  }
`;

const PricingLabel = styled.td`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.neutral[600]};
  width: 40%;
`;

const PricingValue = styled.td`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  color: ${theme.colors.neutral[700]};
`;

const MapContainer = styled.div`
  margin-top: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 400px;
  background: ${theme.colors.neutral[100]};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

// 設備タイプのマッピング（実際はAPIから取得）
const FACILITY_TYPES: { [key: number]: string } = {
  1: 'スクリーン',
  2: 'プロジェクター',
  3: 'ワイヤレスマイク',
  4: '有線マイク',
  5: 'ホワイトボード',
  6: '演台'
};

export const VenueDetail: React.FC<VenueDetailProps> = ({ venue, onBack, onEdit }) => {
  const [activeTab, setActiveTab] = useState('basic');
  
  if (!venue) return null;

  // Extract place ID or coordinates from Google Maps URL
  const getMapEmbedUrl = (googleMapUrl: string) => {
    if (!googleMapUrl) return null;
    
    // If it's already an embed URL, return it
    if (googleMapUrl.includes('embed')) return googleMapUrl;
    
    // Extract query parameter for search
    const match = googleMapUrl.match(/[?&]q=([^&]+)/);
    if (match) {
      const query = match[1];
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${query}`;
    }
    
    // If it's a place URL, extract place name
    const placeMatch = googleMapUrl.match(/place\/([^/]+)/);
    if (placeMatch) {
      const place = placeMatch[1];
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${place}`;
    }
    
    // Default: use the address for search
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(venue.address)}`;
  };

  const mapEmbedUrl = getMapEmbedUrl(venue.google_map_url);

  const tabs = [
    { id: 'basic', label: '基本情報' },
    { id: 'rooms', label: '部屋・設備' },
    { id: 'pricing', label: '料金' },
    { id: 'access', label: 'アクセス・駐車場' },
    { id: 'conditions', label: '利用条件' },
  ];

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
            <Text size="sm" color={theme.colors.neutral[500]}>
              会場番号: {venue.venue_no}
            </Text>
          </TitleSection>
          <StatusBadge variant={venue.is_active ? 'success' : 'neutral'}>
            {venue.is_active ? '利用可能' : '確認中'}
          </StatusBadge>
        </Header>

        <TabContainer>
          {tabs.map(tab => (
            <Tab
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Tab>
          ))}
        </TabContainer>

        {activeTab === 'basic' && (
          <>
            <Section>
              <SectionTitle as="h2" size="lg" weight="semibold">
                連絡先情報
              </SectionTitle>
              <InfoGrid>
                <InfoItem
                  label="住所"
                  value={`〒${venue.postal_code || ''} ${venue.address}`}
                  icon="📍"
                />
                {venue.google_map_url && mapEmbedUrl && (
                  <MapContainer style={{gridColumn: 'span 2'}}>
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={mapEmbedUrl}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </MapContainer>
                )}
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
                {venue.contact_person && (
                  <InfoItem
                    label="担当者"
                    value={venue.contact_person}
                    icon="👤"
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
                {venue.reservation_url && (
                  <InfoItem
                    label="予約サイト"
                    value={
                      <a href={venue.reservation_url} target="_blank" rel="noopener noreferrer">
                        {venue.reservation_url}
                      </a>
                    }
                    icon="📅"
                  />
                )}
              </InfoGrid>
            </Section>

            <Section>
              <SectionTitle as="h2" size="lg" weight="semibold">
                営業情報
              </SectionTitle>
              <InfoGrid>
                {venue.operating_hours && (
                  <InfoItem
                    label="営業時間"
                    value={venue.operating_hours}
                    icon="🕐"
                  />
                )}
                <InfoItem
                  label="荷物受取"
                  value={venue.can_receive_package ? '可能' : '不可'}
                  icon="📦"
                />
                {venue.package_receiver && (
                  <InfoItem
                    label="荷物受取者/場所"
                    value={venue.package_receiver}
                    icon="👥"
                  />
                )}
              </InfoGrid>
            </Section>

            {venue.notes && (
              <Section>
                <SectionTitle as="h2" size="lg" weight="semibold">
                  備考
                </SectionTitle>
                <Text>{venue.notes}</Text>
              </Section>
            )}
          </>
        )}

        {activeTab === 'rooms' && (
          <>
            {venue.rooms && venue.rooms.length > 0 && (
              <Section>
                <SectionTitle as="h2" size="lg" weight="semibold">
                  部屋情報
                </SectionTitle>
                <RoomsGrid>
                  {venue.rooms.map((room: any, index: number) => (
                    <RoomCard key={index} padding="medium">
                      <RoomHeader>
                        <div>
                          <Text size="lg" weight="semibold">{room.room_name}</Text>
                          {room.is_main_room && (
                            <Badge variant="primary" size="small">メイン会場</Badge>
                          )}
                        </div>
                      </RoomHeader>
                      
                      <RoomSpecs>
                        {room.ceiling_height && (
                          <SpecItem>
                            <Text size="sm" color={theme.colors.neutral[600]}>天井高</Text>
                            <Text size="sm" weight="medium">{room.ceiling_height}m</Text>
                          </SpecItem>
                        )}
                        {room.floor_area && (
                          <SpecItem>
                            <Text size="sm" color={theme.colors.neutral[600]}>面積</Text>
                            <Text size="sm" weight="medium">{room.floor_area}㎡</Text>
                          </SpecItem>
                        )}
                        {room.capacity && (
                          <SpecItem>
                            <Text size="sm" color={theme.colors.neutral[600]}>収容人数</Text>
                            <Text size="sm" weight="medium">{room.capacity}名</Text>
                          </SpecItem>
                        )}
                        {room.desk_count && (
                          <SpecItem>
                            <Text size="sm" color={theme.colors.neutral[600]}>机</Text>
                            <Text size="sm" weight="medium">{room.desk_count}台</Text>
                          </SpecItem>
                        )}
                        {room.chair_count && (
                          <SpecItem>
                            <Text size="sm" color={theme.colors.neutral[600]}>椅子</Text>
                            <Text size="sm" weight="medium">{room.chair_count}脚</Text>
                          </SpecItem>
                        )}
                      </RoomSpecs>
                      
                      {room.control_rooms && room.control_rooms.length > 0 && (
                        <ControlRoomList>
                          <Text size="sm" weight="semibold" style={{ marginBottom: theme.spacing.xs }}>
                            控室
                          </Text>
                          {room.control_rooms.map((control: any, cIndex: number) => (
                            <div key={cIndex} style={{ marginBottom: theme.spacing.xs }}>
                              <Text size="xs" weight="medium">
                                {control.control_room_name}
                              </Text>
                              <Text size="xs" color={theme.colors.neutral[600]}>
                                {control.control_room_area}㎡ / {control.capacity}名 / 机{control.desk_count} / 椅子{control.chair_count}
                              </Text>
                              {control.notes && (
                                <Text size="xs" color={theme.colors.neutral[500]}>
                                  {control.notes}
                                </Text>
                              )}
                            </div>
                          ))}
                        </ControlRoomList>
                      )}
                    </RoomCard>
                  ))}
                </RoomsGrid>
              </Section>
            )}

            {venue.facilities && venue.facilities.length > 0 && (
              <Section>
                <SectionTitle as="h2" size="lg" weight="semibold">
                  設備
                </SectionTitle>
                <EquipmentGrid>
                  {venue.facilities.map((facility: any, index: number) => (
                    <EquipmentItem key={index} available={facility.quantity > 0}>
                      {facility.quantity > 0 ? <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                      {FACILITY_TYPES[facility.facility_type_id] || `設備${facility.facility_type_id}`}
                      {facility.quantity > 1 && ` (${facility.quantity})`}
                      {facility.is_wireless !== undefined && facility.is_wireless && ' (ワイヤレス)'}
                      {facility.notes && ` - ${facility.notes}`}
                    </EquipmentItem>
                  ))}
                </EquipmentGrid>
              </Section>
            )}

            <Section>
              <SectionTitle as="h2" size="lg" weight="semibold">
                利用可能条件
              </SectionTitle>
              <EquipmentGrid>
                <EquipmentItem available={venue.can_eat_drink}>
                  {venue.can_eat_drink ? <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  飲食可
                </EquipmentItem>
                <EquipmentItem available={venue.can_wear_shoes}>
                  {venue.can_wear_shoes ? <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  土足可
                </EquipmentItem>
                <EquipmentItem available={venue.is_earthquake_resistant}>
                  {venue.is_earthquake_resistant ? <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  耐震基準適合
                </EquipmentItem>
              </EquipmentGrid>
            </Section>
          </>
        )}

        {activeTab === 'pricing' && venue.fees && (
          <Section>
            <SectionTitle as="h2" size="lg" weight="semibold">
              料金情報（2.5-3日間）
            </SectionTitle>
            <InfoCard padding="medium">
              <PricingTable>
                <tbody>
                  {venue.fees.main_venue_fee && (
                    <PricingRow>
                      <PricingLabel>メイン会場費用</PricingLabel>
                      <PricingValue>
                        <Text size="lg" weight="semibold" color={theme.colors.primary[600]}>
                          ¥{venue.fees.main_venue_fee.toLocaleString()}
                        </Text>
                      </PricingValue>
                    </PricingRow>
                  )}
                  {venue.fees.control_room_fee && (
                    <PricingRow>
                      <PricingLabel>控室費用</PricingLabel>
                      <PricingValue>¥{venue.fees.control_room_fee.toLocaleString()}</PricingValue>
                    </PricingRow>
                  )}
                  {venue.fees.equipment_fee && (
                    <PricingRow>
                      <PricingLabel>備品費用</PricingLabel>
                      <PricingValue>¥{venue.fees.equipment_fee.toLocaleString()}</PricingValue>
                    </PricingRow>
                  )}
                  {venue.fees.electricity_fee && (
                    <PricingRow>
                      <PricingLabel>電気代</PricingLabel>
                      <PricingValue>¥{venue.fees.electricity_fee.toLocaleString()}</PricingValue>
                    </PricingRow>
                  )}
                  {venue.fees.air_conditioner_fee && (
                    <PricingRow>
                      <PricingLabel>エアコン代</PricingLabel>
                      <PricingValue>¥{venue.fees.air_conditioner_fee.toLocaleString()}</PricingValue>
                    </PricingRow>
                  )}
                  {venue.fees.notes && (
                    <PricingRow>
                      <PricingLabel>備考</PricingLabel>
                      <PricingValue>{venue.fees.notes}</PricingValue>
                    </PricingRow>
                  )}
                </tbody>
              </PricingTable>
            </InfoCard>
          </Section>
        )}

        {activeTab === 'access' && (
          <>
            {venue.stations && venue.stations.length > 0 && (
              <Section>
                <SectionTitle as="h2" size="lg" weight="semibold">
                  最寄り駅
                </SectionTitle>
                <StationsGrid>
                  {venue.stations.map((station: any, index: number) => (
                    <InfoCard key={index} padding="medium">
                      <Text weight="semibold">{station.station_name}</Text>
                      <Text size="sm" color={theme.colors.neutral[600]}>
                        {station.line_name}
                      </Text>
                      {station.transport_method && (
                        <Text size="sm">
                          {station.transport_method}
                          {station.travel_time && ` ${station.travel_time}分`}
                        </Text>
                      )}
                      {station.notes && (
                        <Text size="sm" color={theme.colors.neutral[500]}>
                          {station.notes}
                        </Text>
                      )}
                    </InfoCard>
                  ))}
                </StationsGrid>
              </Section>
            )}

            {venue.parking && (
              <Section>
                <SectionTitle as="h2" size="lg" weight="semibold">
                  駐車場情報
                </SectionTitle>
                <InfoGrid>
                  {venue.parking.parking_capacity && (
                    <InfoItem
                      label="収容台数"
                      value={`${venue.parking.parking_capacity}台`}
                      icon="🚗"
                    />
                  )}
                  <InfoItem
                    label="料金"
                    value={venue.parking.is_free ? '無料' : venue.parking.parking_fee}
                    icon="💰"
                  />
                  {venue.parking.nearby_parking_info && (
                    <InfoItem
                      label="周辺駐車場"
                      value={venue.parking.nearby_parking_info}
                      icon="🅿️"
                    />
                  )}
                </InfoGrid>
              </Section>
            )}
          </>
        )}

        {activeTab === 'conditions' && venue.conditions && (
          <Section>
            <SectionTitle as="h2" size="lg" weight="semibold">
              予約・利用条件
            </SectionTitle>
            <InfoGrid>
              {venue.conditions.reservation_conditions && (
                <InfoItem
                  label="予約条件"
                  value={venue.conditions.reservation_conditions}
                  icon="📋"
                />
              )}
              {venue.conditions.cancellation_policy && (
                <InfoItem
                  label="キャンセルポリシー"
                  value={venue.conditions.cancellation_policy}
                  icon="⚠️"
                />
              )}
              {venue.conditions.payment_terms && (
                <InfoItem
                  label="支払条件"
                  value={venue.conditions.payment_terms}
                  icon="💳"
                />
              )}
              {venue.conditions.advance_reservation_days && (
                <InfoItem
                  label="予約可能期間"
                  value={`${venue.conditions.advance_reservation_days}日前から`}
                  icon="📅"
                />
              )}
              {venue.conditions.cancellation_deadline_days && (
                <InfoItem
                  label="キャンセル期限"
                  value={`利用日の${venue.conditions.cancellation_deadline_days}日前まで`}
                  icon="🕐"
                />
              )}
            </InfoGrid>
          </Section>
        )}

        <ActionButtons>
          <Button variant="primary" fullWidth onClick={onEdit}>
            編集する
          </Button>
          <Button variant="outline" fullWidth>
            PDFでエクスポート
          </Button>
          <Button variant="outline" fullWidth>
            印刷する
          </Button>
        </ActionButtons>
      </MainCard>
    </Container>
  );
};