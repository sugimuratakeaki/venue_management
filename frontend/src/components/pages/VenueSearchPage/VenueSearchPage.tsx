import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Text, Card } from '../../atoms';
import { theme } from '../../../styles/theme';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const SearchPanel = styled(Card)`
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const SearchForm = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: flex-end;
  flex-wrap: wrap;
`;

const SearchGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  flex: 1;
  min-width: 200px;
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

const FilterSection = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.neutral[200]};
  flex-wrap: wrap;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  cursor: pointer;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.neutral[700]};
  
  input {
    width: 16px;
    height: 16px;
  }
`;

const ResultsSection = styled.div``;

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

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.medium};
  background-color: ${props => 
    props.status === 'active' ? theme.colors.success : 
    props.status === 'provisional' ? theme.colors.warning :
    theme.colors.neutral[400]
  };
  color: ${theme.colors.neutral[0]};
`;

const CheckIcon = styled.span`
  color: ${theme.colors.success};
  font-weight: ${theme.fontWeight.bold};
`;

const CrossIcon = styled.span`
  color: ${theme.colors.neutral[400]};
`;

const ActionButton = styled(Button)`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: ${theme.fontSize.sm};
`;

const SelectionSection = styled(Card)`
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const VenueSelector = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const VenueCard = styled.div<{ selected?: boolean }>`
  padding: ${theme.spacing.md};
  border: 2px solid ${props => props.selected ? theme.colors.primary[500] : theme.colors.neutral[300]};
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.selected ? theme.colors.primary[50] : theme.colors.neutral[0]};
  cursor: pointer;
  min-width: 150px;
  
  &:hover {
    border-color: ${theme.colors.primary[400]};
  }
`;

interface VenueSearchPageProps {
  onBack?: () => void;
  onVenueSelect?: (venueId: number) => void;
}

export const VenueSearchPage: React.FC<VenueSearchPageProps> = ({ onBack, onVenueSelect }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    keyword: '',
    prefecture: '',
    city: '',
    capacityMin: '',
    capacityMax: '',
    areaMin: '',
    areaMax: '',
    priceMin: '',
    priceMax: '',
    equipment: {
      podium: false,
      whiteboard: false,
      screen: false,
      wirelessMic: false,
      projector: false,
    },
    conditions: {
      foodAllowed: false,
      shoesAllowed: false,
      earthquakeStandard: false,
      controlRoom: false,
      parking: false,
    },
  });

  const [selectedVenues, setSelectedVenues] = useState<number[]>([]);
  const [showComparisonOnly, setShowComparisonOnly] = useState(false);

  // モック検索結果データ
  const searchResults = [
    {
      id: 10,
      name: 'NOCプラザ',
      status: 'active',
      address: '新潟県新潟市東区卸新町2-853-3',
      postalCode: '950-0051',
      phone: '025-250-1234',
      fax: '025-250-1235',
      email: 'info@noc-plaza.jp',
      website: 'https://www.noc-plaza.jp',
      capacity: '200名',
      area: '489㎡',
      ceilingHeight: '5.5m',
      price: '30,000円/日',
      halfDayPrice: '18,000円/半日',
      hourlyPrice: '5,000円/時間',
      access: '新潟駅から車15分',
      nearestStation: 'JR新潟駅',
      busStop: '卸新町バス停から徒歩3分',
      parking: '50台（無料）',
      parkingNotes: '大型バス3台可',
      equipment: {
        podium: true,
        whiteboard: true,
        screen: true,
        wirelessMic: true,
        projector: true,
        wiredMic: true,
        pointer: true,
        speaker: true,
        internetWired: true,
        internetWireless: true,
        dvdPlayer: false,
        livestream: true,
      },
      conditions: {
        foodAllowed: true,
        shoesAllowed: false,
        earthquakeStandard: true,
        controlRoom: true,
        handicapAccess: true,
        elevator: true,
        airConditioning: true,
        heating: true,
      },
      layout: {
        theater: '200名',
        school: '120名',
        ushape: '60名',
        square: '80名',
        party: '150名',
      },
      openHours: '9:00～21:00',
      closedDays: '年末年始',
      cancelPolicy: '30日前まで無料',
      paymentMethod: '銀行振込、現金',
      managementCompany: '株式会社NOCプラザ',
      notes: '防災訓練実績多数、AED設置',
    },
    {
      id: 11,
      name: 'ホテルニューキャッスル',
      status: 'active',
      address: '新潟県新潟市中央区明石1-2-3',
      postalCode: '950-0086',
      phone: '025-222-3456',
      fax: '025-222-3457',
      email: 'reserve@new-castle.jp',
      website: 'https://www.new-castle.jp',
      capacity: '150名',
      area: '320㎡',
      ceilingHeight: '4.2m',
      price: '25,000円/日',
      halfDayPrice: '15,000円/半日',
      hourlyPrice: '4,000円/時間',
      access: '新潟駅から徒歩10分',
      nearestStation: 'JR新潟駅',
      busStop: '明石バス停から徒歩1分',
      parking: '30台（有料）',
      parkingNotes: '1日1,000円',
      equipment: {
        podium: true,
        whiteboard: true,
        screen: true,
        wirelessMic: false,
        projector: true,
        wiredMic: true,
        pointer: false,
        speaker: true,
        internetWired: true,
        internetWireless: true,
        dvdPlayer: true,
        livestream: false,
      },
      conditions: {
        foodAllowed: true,
        shoesAllowed: true,
        earthquakeStandard: true,
        controlRoom: false,
        handicapAccess: true,
        elevator: true,
        airConditioning: true,
        heating: true,
      },
      layout: {
        theater: '150名',
        school: '90名',
        ushape: '45名',
        square: '60名',
        party: '120名',
      },
      openHours: '8:00～22:00',
      closedDays: '無休',
      cancelPolicy: '14日前まで無料',
      paymentMethod: '銀行振込、クレジットカード、現金',
      managementCompany: 'ホテルニューキャッスル株式会社',
      notes: 'ケータリングサービス充実、宿泊施設併設',
    },
    {
      id: 12,
      name: 'じばさんプラザ',
      status: 'provisional',
      address: '新潟県新潟市西区流通センター1-1',
      postalCode: '950-2123',
      phone: '025-268-7890',
      fax: '025-268-7891',
      email: 'hall@jibasan.jp',
      website: 'https://www.jibasan.jp',
      capacity: '100名',
      area: '250㎡',
      ceilingHeight: '3.8m',
      price: '20,000円/日',
      halfDayPrice: '12,000円/半日',
      hourlyPrice: '3,500円/時間',
      access: '新潟駅から車20分',
      nearestStation: 'JR新潟駅',
      busStop: '流通センターバス停から徒歩5分',
      parking: '100台（無料）',
      parkingNotes: '大型バス5台可',
      equipment: {
        podium: false,
        whiteboard: true,
        screen: false,
        wirelessMic: false,
        projector: false,
        wiredMic: true,
        pointer: false,
        speaker: false,
        internetWired: false,
        internetWireless: true,
        dvdPlayer: false,
        livestream: false,
      },
      conditions: {
        foodAllowed: false,
        shoesAllowed: false,
        earthquakeStandard: true,
        controlRoom: true,
        handicapAccess: false,
        elevator: false,
        airConditioning: true,
        heating: true,
      },
      layout: {
        theater: '100名',
        school: '60名',
        ushape: '30名',
        square: '40名',
        party: '不可',
      },
      openHours: '9:00～17:00',
      closedDays: '土日祝日',
      cancelPolicy: '7日前まで無料',
      paymentMethod: '銀行振込のみ',
      managementCompany: '新潟地場産業振興センター',
      notes: '展示会場併設、搬入搬出容易',
    },
  ];

  const handleSearch = () => {
    alert('検索を実行します');
  };

  const handleClear = () => {
    setSearchCriteria({
      keyword: '',
      prefecture: '',
      city: '',
      capacityMin: '',
      capacityMax: '',
      areaMin: '',
      areaMax: '',
      priceMin: '',
      priceMax: '',
      equipment: {
        podium: false,
        whiteboard: false,
        screen: false,
        wirelessMic: false,
        projector: false,
      },
      conditions: {
        foodAllowed: false,
        shoesAllowed: false,
        earthquakeStandard: false,
        controlRoom: false,
        parking: false,
      },
    });
  };

  const toggleVenue = (venueId: number) => {
    if (selectedVenues.includes(venueId)) {
      setSelectedVenues(selectedVenues.filter(id => id !== venueId));
    } else if (selectedVenues.length < 5) {
      setSelectedVenues([...selectedVenues, venueId]);
    } else {
      alert('比較できる会場は最大5件までです');
    }
  };

  const filteredResults = showComparisonOnly 
    ? searchResults.filter(venue => selectedVenues.includes(venue.id))
    : searchResults;

  return (
    <Container>
      <SearchPanel>
        <SearchForm>
          <SearchGroup style={{ flex: 2 }}>
            <Label>フリーワード</Label>
            <Input
              value={searchCriteria.keyword}
              onChange={(e) => setSearchCriteria({...searchCriteria, keyword: e.target.value})}
              placeholder="施設名、住所などで検索"
            />
          </SearchGroup>
          <SearchGroup>
            <Label>都道府県</Label>
            <Select
              value={searchCriteria.prefecture}
              onChange={(e) => setSearchCriteria({...searchCriteria, prefecture: e.target.value})}
            >
              <option value="">選択してください</option>
              <option value="新潟県">新潟県</option>
              <option value="東京都">東京都</option>
              <option value="大阪府">大阪府</option>
            </Select>
          </SearchGroup>
          <SearchGroup>
            <Label>市区町村</Label>
            <Input
              value={searchCriteria.city}
              onChange={(e) => setSearchCriteria({...searchCriteria, city: e.target.value})}
              placeholder="例: 新潟市"
            />
          </SearchGroup>
          <Button variant="primary" onClick={handleSearch} style={{alignSelf: 'flex-end'}}>
            検索
          </Button>
          <Button variant="outline" onClick={handleClear} style={{alignSelf: 'flex-end'}}>
            クリア
          </Button>
        </SearchForm>
        
        <SearchForm style={{marginTop: theme.spacing.md}}>
          <SearchGroup>
            <Label>収容人数</Label>
            <div style={{display: 'flex', gap: theme.spacing.xs, alignItems: 'center'}}>
              <Input
                type="number"
                value={searchCriteria.capacityMin}
                onChange={(e) => setSearchCriteria({...searchCriteria, capacityMin: e.target.value})}
                placeholder="最小"
                style={{width: '100px'}}
              />
              <span>〜</span>
              <Input
                type="number"
                value={searchCriteria.capacityMax}
                onChange={(e) => setSearchCriteria({...searchCriteria, capacityMax: e.target.value})}
                placeholder="最大"
                style={{width: '100px'}}
              />
              <span>名</span>
            </div>
          </SearchGroup>
          <SearchGroup>
            <Label>面積（㎡）</Label>
            <div style={{display: 'flex', gap: theme.spacing.xs, alignItems: 'center'}}>
              <Input
                type="number"
                value={searchCriteria.areaMin}
                onChange={(e) => setSearchCriteria({...searchCriteria, areaMin: e.target.value})}
                placeholder="最小"
                style={{width: '100px'}}
              />
              <span>〜</span>
              <Input
                type="number"
                value={searchCriteria.areaMax}
                onChange={(e) => setSearchCriteria({...searchCriteria, areaMax: e.target.value})}
                placeholder="最大"
                style={{width: '100px'}}
              />
              <span>㎡</span>
            </div>
          </SearchGroup>
          <SearchGroup>
            <Label>1日料金（円）</Label>
            <div style={{display: 'flex', gap: theme.spacing.xs, alignItems: 'center'}}>
              <Input
                type="number"
                value={searchCriteria.priceMin}
                onChange={(e) => setSearchCriteria({...searchCriteria, priceMin: e.target.value})}
                placeholder="最小"
                style={{width: '120px'}}
              />
              <span>〜</span>
              <Input
                type="number"
                value={searchCriteria.priceMax}
                onChange={(e) => setSearchCriteria({...searchCriteria, priceMax: e.target.value})}
                placeholder="最大"
                style={{width: '120px'}}
              />
              <span>円</span>
            </div>
          </SearchGroup>
        </SearchForm>
        
        <FilterSection>
          <CheckboxItem>
            <input
              type="checkbox"
              checked={searchCriteria.conditions.foodAllowed}
              onChange={(e) => setSearchCriteria({
                ...searchCriteria,
                conditions: {...searchCriteria.conditions, foodAllowed: e.target.checked}
              })}
            />
            飲食可
          </CheckboxItem>
          <CheckboxItem>
            <input
              type="checkbox"
              checked={searchCriteria.conditions.shoesAllowed}
              onChange={(e) => setSearchCriteria({
                ...searchCriteria,
                conditions: {...searchCriteria.conditions, shoesAllowed: e.target.checked}
              })}
            />
            土足可
          </CheckboxItem>
          <CheckboxItem>
            <input
              type="checkbox"
              checked={searchCriteria.conditions.earthquakeStandard}
              onChange={(e) => setSearchCriteria({
                ...searchCriteria,
                conditions: {...searchCriteria.conditions, earthquakeStandard: e.target.checked}
              })}
            />
            耐震基準適合
          </CheckboxItem>
          <CheckboxItem>
            <input
              type="checkbox"
              checked={searchCriteria.conditions.controlRoom}
              onChange={(e) => setSearchCriteria({
                ...searchCriteria,
                conditions: {...searchCriteria.conditions, controlRoom: e.target.checked}
              })}
            />
            控室あり
          </CheckboxItem>
          <CheckboxItem>
            <input
              type="checkbox"
              checked={searchCriteria.conditions.parking}
              onChange={(e) => setSearchCriteria({
                ...searchCriteria,
                conditions: {...searchCriteria.conditions, parking: e.target.checked}
              })}
            />
            駐車場あり
          </CheckboxItem>
          <CheckboxItem>
            <input
              type="checkbox"
              checked={searchCriteria.equipment.projector}
              onChange={(e) => setSearchCriteria({
                ...searchCriteria,
                equipment: {...searchCriteria.equipment, projector: e.target.checked}
              })}
            />
            プロジェクター
          </CheckboxItem>
          <CheckboxItem>
            <input
              type="checkbox"
              checked={searchCriteria.equipment.screen}
              onChange={(e) => setSearchCriteria({
                ...searchCriteria,
                equipment: {...searchCriteria.equipment, screen: e.target.checked}
              })}
            />
            スクリーン
          </CheckboxItem>
          <CheckboxItem>
            <input
              type="checkbox"
              checked={searchCriteria.equipment.wirelessMic}
              onChange={(e) => setSearchCriteria({
                ...searchCriteria,
                equipment: {...searchCriteria.equipment, wirelessMic: e.target.checked}
              })}
            />
            ワイヤレスマイク
          </CheckboxItem>
        </FilterSection>
      </SearchPanel>

      <ResultsSection>
        <ResultsHeader>
          <Text size="lg" weight="semibold">
            検索結果: {searchResults.length}件
          </Text>
          <div style={{ display: 'flex', gap: theme.spacing.md }}>
            <Button variant="outline" size="small">
              CSV出力
            </Button>
            <Button variant="outline" size="small">
              印刷
            </Button>
          </div>
        </ResultsHeader>

        {searchResults.length > 0 && (
          <SelectionSection>
            <Text size="lg" weight="semibold" style={{ marginBottom: theme.spacing.md }}>
              比較する会場を選択（最大5件）
            </Text>
            <VenueSelector>
              {filteredResults.map(venue => (
                <VenueCard
                  key={venue.id}
                  selected={selectedVenues.includes(venue.id)}
                  onClick={() => toggleVenue(venue.id)}
                >
                  <Text size="sm" weight={selectedVenues.includes(venue.id) ? 'semibold' : 'regular'}>
                    {venue.name}
                  </Text>
                </VenueCard>
              ))}
            </VenueSelector>
            <div style={{ display: 'flex', gap: theme.spacing.md }}>
              <Button 
                variant="primary"
                disabled={selectedVenues.length === 0}
                onClick={() => setShowComparisonOnly(true)}
              >
                選択した会場のみ表示
              </Button>
              {showComparisonOnly && (
                <Button 
                  variant="outline"
                  onClick={() => setShowComparisonOnly(false)}
                >
                  全て表示
                </Button>
              )}
              {selectedVenues.length > 0 && (
                <Button 
                  variant="outline"
                  onClick={() => setSelectedVenues([])}
                >
                  選択をクリア
                </Button>
              )}
            </div>
          </SelectionSection>
        )}

        <ComparisonTable>
          <Table>
            <Thead>
              <Tr>
                <Th>項目</Th>
                {filteredResults.map(venue => (
                  <VenueNameTh key={venue.id} onClick={() => onVenueSelect && onVenueSelect(venue.id)}>
                    {venue.name}
                  </VenueNameTh>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>ステータス</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    <StatusBadge status={venue.status}>
                      {venue.status === 'active' ? '利用可能' : '仮予約'}
                    </StatusBadge>
                  </Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>基本情報</CategoryTd>
              </CategoryRow>
              
              <Tr>
                <Td>住所</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.address}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>郵便番号</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.postalCode}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>電話番号</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.phone}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>FAX</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.fax}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>メール</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.email}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>ウェブサイト</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    <a href={venue.website} target="_blank" rel="noopener noreferrer" style={{color: theme.colors.primary[600]}}>
                      {venue.website}
                    </a>
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>管理会社</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.managementCompany}</Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>施設仕様</CategoryTd>
              </CategoryRow>
              
              <Tr>
                <Td>収容人数</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    <Text weight="semibold">{venue.capacity}</Text>
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>面積</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.area}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>天井高</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.ceilingHeight}</Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>レイアウト対応人数</CategoryTd>
              </CategoryRow>
              
              <Tr>
                <Td>シアター形式</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.layout.theater}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>スクール形式</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.layout.school}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>ロの字形式</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.layout.ushape}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>島型形式</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.layout.square}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>パーティー形式</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.layout.party}</Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>料金</CategoryTd>
              </CategoryRow>
              
              <Tr>
                <Td>1日料金</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    <Text color={theme.colors.primary[600]} weight="semibold">
                      {venue.price}
                    </Text>
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>半日料金</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.halfDayPrice}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>時間料金</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.hourlyPrice}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>支払方法</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.paymentMethod}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>キャンセルポリシー</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.cancelPolicy}</Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>設備</CategoryTd>
              </CategoryRow>
              
              <Tr>
                <Td>演台</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.equipment.podium ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>ホワイトボード</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.equipment.whiteboard ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>スクリーン</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.equipment.screen ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>ワイヤレスマイク</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.equipment.wirelessMic ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>プロジェクター</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.equipment.projector ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>有線マイク</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.equipment.wiredMic ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>レーザーポインター</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.equipment.pointer ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>スピーカー</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.equipment.speaker ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>有線インターネット</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.equipment.internetWired ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>Wi-Fi</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.equipment.internetWireless ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>DVDプレーヤー</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.equipment.dvdPlayer ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>ライブ配信対応</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.equipment.livestream ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>利用条件</CategoryTd>
              </CategoryRow>
              
              <Tr>
                <Td>飲食可</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.conditions.foodAllowed ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>土足可</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.conditions.shoesAllowed ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>耐震基準適合</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.conditions.earthquakeStandard ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>控室あり</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.conditions.controlRoom ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>バリアフリー対応</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.conditions.handicapAccess ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>エレベーター</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.conditions.elevator ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>冷房</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.conditions.airConditioning ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td>暖房</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    {venue.conditions.heating ? 
                      <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                  </Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>アクセス</CategoryTd>
              </CategoryRow>
              
              <Tr>
                <Td>最寄り駅</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.nearestStation}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>駅からのアクセス</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.access}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>バス停</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.busStop}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>駐車場</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.parking}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>駐車場備考</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.parkingNotes}</Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>営業情報</CategoryTd>
              </CategoryRow>
              
              <Tr>
                <Td>営業時間</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.openHours}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>休館日</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.closedDays}</Td>
                ))}
              </Tr>
              <Tr>
                <Td>備考</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>{venue.notes}</Td>
                ))}
              </Tr>
              
              <CategoryRow>
                <CategoryTd colSpan={filteredResults.length + 1}>アクション</CategoryTd>
              </CategoryRow>
              
              <Tr>
                <Td>操作</Td>
                {filteredResults.map(venue => (
                  <Td key={venue.id}>
                    <div style={{ display: 'flex', gap: theme.spacing.xs }}>
                      <ActionButton 
                        variant="primary" 
                        size="small"
                        onClick={() => onVenueSelect && onVenueSelect(venue.id)}
                      >
                        詳細
                      </ActionButton>
                      <ActionButton variant="outline" size="small">
                        編集
                      </ActionButton>
                    </div>
                  </Td>
                ))}
              </Tr>
            </Tbody>
          </Table>
        </ComparisonTable>
      </ResultsSection>
    </Container>
  );
};