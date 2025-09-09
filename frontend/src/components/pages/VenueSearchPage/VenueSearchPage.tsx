import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Text, Card } from '../../atoms';
import { FilterGroup } from '../../molecules';
import { theme } from '../../../styles/theme';
import venuesData from '../../../data/venues.json';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

// クイック絞り込みセクション
const QuickFilterSection = styled(Card)`
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const QuickFilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const QuickFilterGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

// 詳細検索セクション（アコーディオン）
const DetailedSearchSection = styled(Card)`
  padding: 0;
  margin-bottom: ${theme.spacing.xl};
  overflow: hidden;
`;

const AccordionHeader = styled.div<{ isOpen: boolean }>`
  padding: ${theme.spacing.lg};
  background: ${theme.colors.neutral[50]};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;
  
  &:hover {
    background: ${theme.colors.neutral[100]};
  }
  
  &::after {
    content: '${props => props.isOpen ? '▲' : '▼'}';
    color: ${theme.colors.neutral[600]};
    font-size: ${theme.fontSize.sm};
  }
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
`;

const DetailedSearchForm = styled.div`
  padding: ${theme.spacing.lg};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.neutral[600]};
  font-weight: ${theme.fontWeight.medium};
`;

const Select = styled.select`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.neutral[300]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.md};
  background: ${theme.colors.neutral[0]};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
  }
`;

const RangeInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const RangeInput = styled(Input)`
  flex: 1;
`;

// 選択中のフィルタータグ
const ActiveFiltersSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  align-items: center;
`;

const FilterTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.primary[100]};
  color: ${theme.colors.primary[700]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.sm};
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary[700]};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${theme.colors.primary[900]};
  }
`;

// 結果セクション
const ResultsSection = styled.div``;

// 会場選択エリア
const VenueSelectionArea = styled(Card)`
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
`;

const VenueSelectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const VenueCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
`;

const VenueCard = styled.div<{ selected: boolean }>`
  padding: ${theme.spacing.md};
  border: 2px solid ${props => props.selected ? theme.colors.primary[500] : theme.colors.neutral[300]};
  border-radius: ${theme.borderRadius.md};
  background-color: ${props => props.selected ? theme.colors.primary[50] : theme.colors.neutral[0]};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${theme.colors.primary[400]};
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

const VenueCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
`;

const VenueCardBody = styled.div`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.neutral[600]};
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const ComparisonTable = styled(Card)`
  padding: 0;
  overflow: auto;
  position: relative;
  max-height: 80vh;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  position: relative;
`;

const Thead = styled.thead`
  background-color: ${theme.colors.neutral[50]};
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid ${theme.colors.neutral[200]};
  
  &:hover {
    background-color: ${theme.colors.neutral[50]};
  }
`;

const Th = styled.th`
  padding: ${theme.spacing.md};
  text-align: left;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.neutral[700]};
  white-space: nowrap;
  background-color: ${theme.colors.neutral[50]};
  position: sticky;
  top: 0;
  
  &:first-child {
    position: sticky;
    left: 0;
    top: 0;
    z-index: 12;
    min-width: 180px;
    box-shadow: 2px 0 4px rgba(0,0,0,0.1);
  }
`;

const Td = styled.td`
  padding: ${theme.spacing.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.neutral[700]};
  min-width: 200px;
  
  &:first-child {
    position: sticky;
    left: 0;
    background-color: ${theme.colors.neutral[0]};
    font-weight: ${theme.fontWeight.medium};
    z-index: 1;
    min-width: 180px;
    box-shadow: 2px 0 4px rgba(0,0,0,0.05);
  }
  
  ${Tr}:hover &:first-child {
    background-color: ${theme.colors.neutral[50]};
  }
`;

const ItemTh = styled(Th)`
  position: sticky;
  left: 0;
  background-color: ${theme.colors.primary[600]};
  z-index: 3;
  min-width: 180px;
  box-shadow: 2px 0 4px rgba(0,0,0,0.1);
`;

const ItemTd = styled(Td)`
  position: sticky;
  left: 0;
  background-color: ${theme.colors.neutral[0]};
  font-weight: ${theme.fontWeight.medium};
  z-index: 1;
  min-width: 180px;
  box-shadow: 2px 0 4px rgba(0,0,0,0.05);
  
  ${Tr}:hover & {
    background-color: ${theme.colors.neutral[50]};
  }
`;

const CategoryRow = styled(Tr)`
  background-color: ${theme.colors.primary[50]};
  
  &:hover {
    background-color: ${theme.colors.primary[50]};
  }
`;

const CategoryTd = styled(Td)`
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.primary[700]};
  background-color: ${theme.colors.primary[50]} !important;
  
  &:first-child {
    background-color: ${theme.colors.primary[50]} !important;
  }
`;

const VenueNameTh = styled(Th)`
  cursor: pointer;
  color: ${theme.colors.primary[600]};
  min-width: 200px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CheckIcon = styled.span`
  color: ${theme.colors.success};
  font-weight: ${theme.fontWeight.bold};
`;

const CrossIcon = styled.span`
  color: ${theme.colors.neutral[400]};
`;

const VenueCheckbox = styled.input`
  margin-right: ${theme.spacing.sm};
`;

const ComparisonControls = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
`;

interface VenueSearchPageProps {
  onBack?: () => void;
  onVenueSelect?: (venueId: number) => void;
}

export const VenueSearchPage: React.FC<VenueSearchPageProps> = ({ onBack, onVenueSelect }) => {
  const [isDetailedSearchOpen, setIsDetailedSearchOpen] = useState(false);
  const [selectedVenues, setSelectedVenues] = useState<number[]>([]);
  const [showComparisonOnly, setShowComparisonOnly] = useState(false);
  
  // クイック絞り込みフィルター
  const [quickFilters, setQuickFilters] = useState({
    prefectures: [] as string[],
    capacity: [] as string[],
    features: [] as string[],
    price: [] as string[],
  });
  
  // 詳細検索条件
  const [detailedSearch, setDetailedSearch] = useState({
    keyword: '',
    city: '',
    areaMin: '',
    areaMax: '',
    specificEquipment: '',
  });

  // フィルターオプション
  const prefectureOptions = [
    { label: '東京都', value: 'tokyo', count: 25 },
    { label: '大阪府', value: 'osaka', count: 18 },
    { label: '愛知県', value: 'aichi', count: 15 },
    { label: '新潟県', value: 'niigata', count: 12 },
    { label: '福岡県', value: 'fukuoka', count: 10 },
  ];

  const capacityOptions = [
    { label: '～50名', value: '0-50', count: 15 },
    { label: '51～100名', value: '51-100', count: 20 },
    { label: '101～200名', value: '101-200', count: 18 },
    { label: '201～500名', value: '201-500', count: 12 },
    { label: '501名～', value: '501-', count: 5 },
  ];

  const featureOptions = [
    { label: '駅近（徒歩10分以内）', value: 'near-station', count: 35 },
    { label: '駐車場あり', value: 'parking', count: 45 },
    { label: '飲食可', value: 'food-allowed', count: 30 },
    { label: '土足可', value: 'shoes-allowed', count: 20 },
    { label: '耐震基準適合', value: 'earthquake', count: 40 },
    { label: '控室あり', value: 'control-room', count: 25 },
  ];

  const priceOptions = [
    { label: '～3万円/日', value: '0-30000', count: 10 },
    { label: '3～5万円/日', value: '30000-50000', count: 15 },
    { label: '5～10万円/日', value: '50000-100000', count: 12 },
    { label: '10万円～/日', value: '100000-', count: 8 },
  ];

  // JSONデータから会場情報を取得
  const searchResults = venuesData.venues.map(venue => {
    // 最初の部屋の情報を使用
    const mainRoom = venue.rooms[0] || {};
    // 最初の駅の情報を使用
    const mainStation = venue.stations[0] || {};
    
    // 料金の計算（概算料金を取得）
    let totalFee = 0;
    if (venue.fees?.estimated_total_fee) {
      const fees = Object.values(venue.fees.estimated_total_fee);
      if (fees.length > 0) {
        const feeStr = fees[0].toString();
        // 範囲表記の場合は最大値を取得
        if (feeStr.includes('-')) {
          totalFee = parseInt(feeStr.split('-')[1]);
        } else {
          totalFee = parseInt(feeStr);
        }
      }
    }

    // アクセス情報の整形
    let accessInfo = '';
    if (mainStation.station_name) {
      accessInfo = `${mainStation.station_name}から`;
      if (mainStation.walking_time) {
        accessInfo += `徒歩${mainStation.walking_time}分`;
      } else if (mainStation.taxi_time) {
        accessInfo += `車${mainStation.taxi_time}分`;
      } else if (mainStation.bus_time) {
        accessInfo += `バス${mainStation.bus_time}分`;
      }
    }

    // 駐車場情報の整形
    let parkingInfo = '';
    if (venue.facilities?.parking_capacity) {
      parkingInfo = `${venue.facilities.parking_capacity}台`;
      if (venue.facilities.parking_fee) {
        parkingInfo += `（${venue.facilities.parking_fee}）`;
      }
    } else if (venue.facilities?.parking_notes) {
      parkingInfo = venue.facilities.parking_notes;
    }

    return {
      id: venue.id,
      name: venue.venue_name,
      address: venue.address,
      capacity: mainRoom.capacity_theater || mainRoom.capacity_school ? 
        `${mainRoom.capacity_theater || mainRoom.capacity_school}名` : '情報なし',
      area: mainRoom.floor_area ? `${mainRoom.floor_area}㎡` : '情報なし',
      price: totalFee ? `${totalFee.toLocaleString()}円` : '要確認',
      access: accessInfo || '情報なし',
      parking: parkingInfo || '情報なし',
      equipment: {
        podium: venue.equipment?.podium || false,
        whiteboard: venue.equipment?.whiteboard || false,
        screen: venue.equipment?.screen || false,
        wirelessMic: venue.equipment?.wireless_microphone || false,
        microphone: venue.equipment?.microphone || false,
        projector: venue.equipment?.projector || false,
        wifi: venue.equipment?.wifi || false,
      },
      conditions: {
        foodAllowed: venue.facilities?.can_eat_drink || false,
        shoesAllowed: venue.facilities?.can_wear_shoes || false,
        earthquakeStandard: venue.facilities?.is_earthquake_resistant || false,
        controlRoom: venue.rooms?.some(room => room.notes?.includes('控室')) || false,
        packageReceivable: venue.package_handling?.can_receive_package || false,
      },
      // 詳細情報も追加
      venueCode: venue.venue_no,
      phoneNumber: venue.phone_number,
      email: venue.email,
      contactPerson: venue.contact_person,
      operatingHours: venue.operating_hours,
      fees: venue.fees,
      cancellationPolicy: venue.cancellation_policy,
      reservationConditions: venue.reservation_conditions,
      notes: venue.tags ? venue.tags.join('、') : '',
    };
  });

  const handleQuickFilterChange = (filterType: string, values: string[]) => {
    setQuickFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  const handleRemoveFilter = (filterType: string, value: string) => {
    setQuickFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType as keyof typeof prev].filter(v => v !== value)
    }));
  };

  const handleClearAllFilters = () => {
    setQuickFilters({
      prefectures: [],
      capacity: [],
      features: [],
      price: [],
    });
    setDetailedSearch({
      keyword: '',
      city: '',
      areaMin: '',
      areaMax: '',
      specificEquipment: '',
    });
  };

  const handleVenueToggle = (venueId: number) => {
    if (selectedVenues.includes(venueId)) {
      setSelectedVenues(selectedVenues.filter(id => id !== venueId));
    } else if (selectedVenues.length < 5) {
      setSelectedVenues([...selectedVenues, venueId]);
    }
  };

  const hasActiveFilters = Object.values(quickFilters).some(arr => arr.length > 0) || 
                          Object.values(detailedSearch).some(val => val !== '');

  const filteredResults = showComparisonOnly 
    ? searchResults.filter(venue => selectedVenues.includes(venue.id))
    : searchResults;

  return (
    <Container>
      {/* クイック絞り込み */}
      <QuickFilterSection>
        <QuickFilterHeader>
          <Text size="lg" weight="bold">クイック絞り込み</Text>
          {hasActiveFilters && (
            <Button variant="text" size="small" onClick={handleClearAllFilters}>
              すべてクリア
            </Button>
          )}
        </QuickFilterHeader>
        
        <QuickFilterGroups>
          <FilterGroup
            title="都道府県"
            options={prefectureOptions}
            selectedValues={quickFilters.prefectures}
            onChange={(values) => handleQuickFilterChange('prefectures', values)}
          />
          
          <FilterGroup
            title="収容人数"
            options={capacityOptions}
            selectedValues={quickFilters.capacity}
            onChange={(values) => handleQuickFilterChange('capacity', values)}
          />
          
          <FilterGroup
            title="設備・条件"
            options={featureOptions}
            selectedValues={quickFilters.features}
            onChange={(values) => handleQuickFilterChange('features', values)}
          />
          
          <FilterGroup
            title="料金帯"
            options={priceOptions}
            selectedValues={quickFilters.price}
            onChange={(values) => handleQuickFilterChange('price', values)}
          />
        </QuickFilterGroups>
      </QuickFilterSection>

      {/* 詳細検索（アコーディオン） */}
      <DetailedSearchSection>
        <AccordionHeader 
          isOpen={isDetailedSearchOpen}
          onClick={() => setIsDetailedSearchOpen(!isDetailedSearchOpen)}
        >
          <Text size="md" weight="semibold">詳細検索</Text>
        </AccordionHeader>
        
        <AccordionContent isOpen={isDetailedSearchOpen}>
          <DetailedSearchForm>
            <FormGroup>
              <Label>フリーワード</Label>
              <Input
                placeholder="施設名、住所、備考など"
                value={detailedSearch.keyword}
                onChange={(e) => setDetailedSearch(prev => ({ ...prev, keyword: e.target.value }))}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>市区町村</Label>
              <Input
                placeholder="例：新潟市中央区"
                value={detailedSearch.city}
                onChange={(e) => setDetailedSearch(prev => ({ ...prev, city: e.target.value }))}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>面積（㎡）</Label>
              <RangeInputGroup>
                <RangeInput
                  type="number"
                  placeholder="最小"
                  value={detailedSearch.areaMin}
                  onChange={(e) => setDetailedSearch(prev => ({ ...prev, areaMin: e.target.value }))}
                />
                <span>～</span>
                <RangeInput
                  type="number"
                  placeholder="最大"
                  value={detailedSearch.areaMax}
                  onChange={(e) => setDetailedSearch(prev => ({ ...prev, areaMax: e.target.value }))}
                />
              </RangeInputGroup>
            </FormGroup>
            
            <FormGroup>
              <Label>特定の設備</Label>
              <Input
                placeholder="例：ライブ配信機器"
                value={detailedSearch.specificEquipment}
                onChange={(e) => setDetailedSearch(prev => ({ ...prev, specificEquipment: e.target.value }))}
              />
            </FormGroup>
            
            <FormGroup style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'flex-end' }}>
              <Button variant="primary" style={{ width: '200px' }}>
                詳細検索を実行
              </Button>
            </FormGroup>
          </DetailedSearchForm>
        </AccordionContent>
      </DetailedSearchSection>

      {/* 選択中のフィルター表示 */}
      {hasActiveFilters && (
        <ActiveFiltersSection>
          <Text size="sm" weight="semibold" style={{ marginRight: theme.spacing.md }}>
            選択中のフィルター：
          </Text>
          {Object.entries(quickFilters).map(([filterType, values]) =>
            values.map(value => {
              const option = 
                filterType === 'prefectures' ? prefectureOptions.find(o => o.value === value) :
                filterType === 'capacity' ? capacityOptions.find(o => o.value === value) :
                filterType === 'features' ? featureOptions.find(o => o.value === value) :
                priceOptions.find(o => o.value === value);
              
              return option ? (
                <FilterTag key={`${filterType}-${value}`}>
                  {option.label}
                  <RemoveTagButton onClick={() => handleRemoveFilter(filterType, value)}>
                    ✕
                  </RemoveTagButton>
                </FilterTag>
              ) : null;
            })
          )}
          {detailedSearch.keyword && (
            <FilterTag>
              キーワード: {detailedSearch.keyword}
              <RemoveTagButton onClick={() => setDetailedSearch(prev => ({ ...prev, keyword: '' }))}>
                ✕
              </RemoveTagButton>
            </FilterTag>
          )}
        </ActiveFiltersSection>
      )}

      {/* 検索結果 */}
      <ResultsSection>
        <ResultsHeader>
          <Text size="lg" weight="bold">
            検索結果: {filteredResults.length}件
          </Text>
        </ResultsHeader>

        {/* 会場選択エリア */}
        <VenueSelectionArea>
          <VenueSelectionHeader>
            <Text size="md" weight="semibold">
              会場を選択して比較 (最大5件)
            </Text>
            <ComparisonControls>
              <Text size="sm">
                選択中: {selectedVenues.length}/5件
              </Text>
              <Button
                variant={showComparisonOnly ? 'primary' : 'outline'}
                size="small"
                onClick={() => setShowComparisonOnly(!showComparisonOnly)}
                disabled={selectedVenues.length === 0}
              >
                選択した会場のみ比較表示
              </Button>
            </ComparisonControls>
          </VenueSelectionHeader>
          
          <VenueCardGrid>
            {searchResults.map(venue => (
              <VenueCard 
                key={venue.id}
                selected={selectedVenues.includes(venue.id)}
                onClick={() => handleVenueToggle(venue.id)}
              >
                <VenueCardHeader>
                  <input
                    type="checkbox"
                    checked={selectedVenues.includes(venue.id)}
                    onChange={() => handleVenueToggle(venue.id)}
                    disabled={!selectedVenues.includes(venue.id) && selectedVenues.length >= 5}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Text weight="semibold">{venue.name}</Text>
                </VenueCardHeader>
                <VenueCardBody>
                  <div>{venue.address}</div>
                  <div>収容人数: {venue.capacity}</div>
                  <div>料金: {venue.price}</div>
                </VenueCardBody>
              </VenueCard>
            ))}
          </VenueCardGrid>
        </VenueSelectionArea>

        <ComparisonTable>
          <Table>
            <Thead>
              <Tr>
                <ItemTh>項目</ItemTh>
                {filteredResults.map(venue => (
                  <VenueNameTh key={venue.id}>
                    <span 
                      onClick={() => onVenueSelect && onVenueSelect(venue.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <Text size="sm" weight="semibold" style={{ color: theme.colors.primary[600] }}>
                        {venue.name}
                      </Text>
                    </span>
                  </VenueNameTh>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>基本情報</CategoryTd>
              </CategoryRow>
              <Tr>
                <ItemTd>住所</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.address}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>会場コード</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.venueCode || '-'}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>電話番号</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.phoneNumber || '-'}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>メールアドレス</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.email || '-'}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>担当者名</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.contactPerson || '-'}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>収容人数（メイン）</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.capacity}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>面積（メイン）</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.area}</Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>料金情報</CategoryTd>
              </CategoryRow>
              <Tr>
                <ItemTd>基本料金（2.5日間）</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.price}</Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>アクセス・駐車場</CategoryTd>
              </CategoryRow>
              <Tr>
                <ItemTd>最寄り駅</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.access}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>駐車場台数</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.parking}</Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>設備（基本）</CategoryTd>
              </CategoryRow>
              <Tr>
                <ItemTd>演台</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.equipment.podium ? <CheckIcon>○</CheckIcon> : <CrossIcon>－</CrossIcon>}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>ホワイトボード</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.equipment.whiteboard ? <CheckIcon>○</CheckIcon> : <CrossIcon>－</CrossIcon>}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>スクリーン</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.equipment.screen ? <CheckIcon>○</CheckIcon> : <CrossIcon>－</CrossIcon>}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>プロジェクター</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.equipment.projector ? <CheckIcon>○</CheckIcon> : <CrossIcon>－</CrossIcon>}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>ワイヤレスマイク</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.equipment.wirelessMic ? <CheckIcon>○</CheckIcon> : <CrossIcon>－</CrossIcon>}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>有線マイク</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.equipment.microphone ? <CheckIcon>○</CheckIcon> : <CrossIcon>－</CrossIcon>}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>ポインター</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>要確認</Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>設備（音響・映像）</CategoryTd>
              </CategoryRow>
              <Tr>
                <ItemTd>録音機器</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}><CrossIcon>－</CrossIcon></Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>ライブ配信機器</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}><CheckIcon>○</CheckIcon></Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>同時通訳ブース</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}><CrossIcon>－</CrossIcon></Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>音響設備</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}><CheckIcon>○</CheckIcon></Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>照明調整</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}><CheckIcon>○</CheckIcon></Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>設備（その他）</CategoryTd>
              </CategoryRow>
              <Tr>
                <ItemTd>空調設備</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}><CheckIcon>○</CheckIcon></Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>Wi-Fi</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.equipment.wifi ? <CheckIcon>○</CheckIcon> : <CrossIcon>－</CrossIcon>}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>プロジェクター台</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>要確認</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>控室</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.conditions.controlRoom ? <CheckIcon>○（2室）</CheckIcon> : <CrossIcon>－</CrossIcon>}</Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>利用条件</CategoryTd>
              </CategoryRow>
              <Tr>
                <ItemTd>飲食可</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.conditions.foodAllowed ? <CheckIcon>○</CheckIcon> : <CrossIcon>－</CrossIcon>}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>土足可</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.conditions.shoesAllowed ? <CheckIcon>○</CheckIcon> : <CrossIcon>－</CrossIcon>}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>耐震基準適合</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.conditions.earthquakeStandard ? <CheckIcon>○（新耐震）</CheckIcon> : <CrossIcon>－</CrossIcon>}</Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>営業時間</ItemTd>
                {filteredResults.map(venue => {
                  const hours = venue.operatingHours;
                  const display = hours?.weekday_open && hours?.weekday_close ?
                    `${hours.weekday_open}～${hours.weekday_close}` : '要確認';
                  return <Td key={venue.id}>{display}</Td>;
                })}
              </Tr>
              <Tr>
                <ItemTd>荷物受取可</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.conditions.packageReceivable ? <CheckIcon>○</CheckIcon> : <CrossIcon>－</CrossIcon>}</Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>予約・キャンセル条件</CategoryTd>
              </CategoryRow>
              <Tr>
                <ItemTd>予約方法</ItemTd>
                {filteredResults.map(venue => {
                  const method = venue.reservationConditions?.reservation_method || '要確認';
                  return <Td key={venue.id}>{method}</Td>;
                })}
              </Tr>
              <Tr>
                <ItemTd>支払い期限</ItemTd>
                {filteredResults.map(venue => {
                  const deadline = venue.reservationConditions?.payment_deadline || '要確認';
                  return <Td key={venue.id}>{deadline}</Td>;
                })}
              </Tr>
              <Tr>
                <ItemTd>支払い方法</ItemTd>
                {filteredResults.map(venue => {
                  const method = venue.reservationConditions?.payment_method || '要確認';
                  return <Td key={venue.id}>{method}</Td>;
                })}
              </Tr>
              <Tr>
                <ItemTd>キャンセルポリシー</ItemTd>
                {filteredResults.map(venue => {
                  const policy = venue.cancellationPolicy?.notes || '要確認';
                  return <Td key={venue.id}>{policy}</Td>;
                })}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>その他情報</CategoryTd>
              </CategoryRow>
              <Tr>
                <ItemTd>公式サイト</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    <a href="#" style={{ color: theme.colors.primary[600] }}>サイトを見る</a>
                  </Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>予約サイト</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    <a href="#" style={{ color: theme.colors.primary[600] }}>予約ページ</a>
                  </Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>Googleマップ</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    <a href="#" style={{ color: theme.colors.primary[600] }}>地図を見る</a>
                  </Td>
                ))}
              </Tr>
              <Tr>
                <ItemTd>備考</ItemTd>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.notes || '-'}</Td>
                ))}
              </Tr>
            </Tbody>
          </Table>
        </ComparisonTable>
      </ResultsSection>
    </Container>
  );
};