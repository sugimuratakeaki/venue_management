import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Text, Card } from '../../atoms';
import { VenueCard } from '../../molecules';
import { theme } from '../../../styles/theme';


const SearchPanel = styled(Card)`
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const SearchSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const SectionTitle = styled.div`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.neutral[700]};
  margin-bottom: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.neutral[200]};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.neutral[600]};
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

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: ${theme.spacing.sm};
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  cursor: pointer;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.neutral[700]};
  
  input {
    width: 18px;
    height: 18px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-top: ${theme.spacing.xl};
`;

const ResultsSection = styled.div`
  margin-top: ${theme.spacing.xl};
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
`;

const TabContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  background: ${theme.colors.neutral[100]};
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.md};
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  background: ${props => props.active ? theme.colors.neutral[0] : 'transparent'};
  color: ${props => props.active ? theme.colors.primary[600] : theme.colors.neutral[600]};
  font-weight: ${props => props.active ? theme.fontWeight.medium : theme.fontWeight.regular};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.active ? theme.colors.neutral[0] : theme.colors.neutral[200]};
  }
`;

const MapView = styled.div`
  height: 500px;
  background: ${theme.colors.neutral[200]};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral[500]};
`;

interface VenueSearchPageProps {
  onBack?: () => void;
  onVenueSelect?: (venueId: number) => void;
}

export const VenueSearchPage: React.FC<VenueSearchPageProps> = ({ onBack, onVenueSelect }) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchCriteria, setSearchCriteria] = useState({
    keyword: '',
    prefecture: '',
    city: '',
    capacityMin: '',
    capacityMax: '',
    desksMin: '',
    desksMax: '',
    chairsMin: '',
    chairsMax: '',
    priceMin: '',
    priceMax: '',
    equipment: {
      podium: false,
      whiteboard: false,
      screen: false,
      wirelessMic: false,
      projectorStand: false,
    },
    conditions: {
      foodAllowed: false,
      shoesAllowed: false,
      earthquakeStandard: false,
      waitingRoom: false,
      parking: false,
    },
  });

  // モックデータ
  const mockResults = [
    {
      id: 10,
      venue_name: "NOCプラザ",
      prefecture: "新潟県",
      city: "新潟市",
      address: "新潟県新潟市東区卸新町2丁目853番地3",
      capacity: 200,
      price: "30,000円〜",
      tags: ["ホール", "会議室", "防災訓練可"],
      status: "active" as const
    },
    {
      id: 11,
      venue_name: "ホテルニューキャッスル",
      prefecture: "新潟県",
      city: "新潟市",
      address: "新潟県新潟市中央区明石1-2-3",
      capacity: 150,
      price: "25,000円〜",
      tags: ["会議室", "研修施設"],
      status: "active" as const
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
      desksMin: '',
      desksMax: '',
      chairsMin: '',
      chairsMax: '',
      priceMin: '',
      priceMax: '',
      equipment: {
        podium: false,
        whiteboard: false,
        screen: false,
        wirelessMic: false,
        projectorStand: false,
      },
      conditions: {
        foodAllowed: false,
        shoesAllowed: false,
        earthquakeStandard: false,
        waitingRoom: false,
        parking: false,
      },
    });
  };

  return (
    <div>
        
        <SearchPanel>
          <SearchSection>
            <SectionTitle>基本条件</SectionTitle>
            <FormRow>
              <FormGroup style={{ gridColumn: 'span 2' }}>
                <Label>フリーワード</Label>
                <Input
                  value={searchCriteria.keyword}
                  onChange={(e) => setSearchCriteria({...searchCriteria, keyword: e.target.value})}
                  placeholder="施設名、住所などで検索"
                />
              </FormGroup>
              <FormGroup>
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
              </FormGroup>
              <FormGroup>
                <Label>市区町村</Label>
                <Input
                  value={searchCriteria.city}
                  onChange={(e) => setSearchCriteria({...searchCriteria, city: e.target.value})}
                  placeholder="例: 新潟市"
                />
              </FormGroup>
            </FormRow>
          </SearchSection>

          <SearchSection>
            <SectionTitle>収容条件</SectionTitle>
            <FormRow>
              <FormGroup>
                <Label>収容人数</Label>
                <RangeInputGroup>
                  <Input
                    type="number"
                    value={searchCriteria.capacityMin}
                    onChange={(e) => setSearchCriteria({...searchCriteria, capacityMin: e.target.value})}
                    placeholder="最小"
                    style={{ width: '100px' }}
                  />
                  <span>〜</span>
                  <Input
                    type="number"
                    value={searchCriteria.capacityMax}
                    onChange={(e) => setSearchCriteria({...searchCriteria, capacityMax: e.target.value})}
                    placeholder="最大"
                    style={{ width: '100px' }}
                  />
                </RangeInputGroup>
              </FormGroup>
              <FormGroup>
                <Label>机の数</Label>
                <RangeInputGroup>
                  <Input
                    type="number"
                    value={searchCriteria.desksMin}
                    onChange={(e) => setSearchCriteria({...searchCriteria, desksMin: e.target.value})}
                    placeholder="最小"
                    style={{ width: '100px' }}
                  />
                  <span>〜</span>
                  <Input
                    type="number"
                    value={searchCriteria.desksMax}
                    onChange={(e) => setSearchCriteria({...searchCriteria, desksMax: e.target.value})}
                    placeholder="最大"
                    style={{ width: '100px' }}
                  />
                </RangeInputGroup>
              </FormGroup>
              <FormGroup>
                <Label>椅子の数</Label>
                <RangeInputGroup>
                  <Input
                    type="number"
                    value={searchCriteria.chairsMin}
                    onChange={(e) => setSearchCriteria({...searchCriteria, chairsMin: e.target.value})}
                    placeholder="最小"
                    style={{ width: '100px' }}
                  />
                  <span>〜</span>
                  <Input
                    type="number"
                    value={searchCriteria.chairsMax}
                    onChange={(e) => setSearchCriteria({...searchCriteria, chairsMax: e.target.value})}
                    placeholder="最大"
                    style={{ width: '100px' }}
                  />
                </RangeInputGroup>
              </FormGroup>
            </FormRow>
          </SearchSection>

          <SearchSection>
            <SectionTitle>設備条件</SectionTitle>
            <CheckboxGrid>
              <CheckboxItem>
                <input
                  type="checkbox"
                  checked={searchCriteria.equipment.podium}
                  onChange={(e) => setSearchCriteria({
                    ...searchCriteria,
                    equipment: {...searchCriteria.equipment, podium: e.target.checked}
                  })}
                />
                演台
              </CheckboxItem>
              <CheckboxItem>
                <input
                  type="checkbox"
                  checked={searchCriteria.equipment.whiteboard}
                  onChange={(e) => setSearchCriteria({
                    ...searchCriteria,
                    equipment: {...searchCriteria.equipment, whiteboard: e.target.checked}
                  })}
                />
                ホワイトボード
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
              <CheckboxItem>
                <input
                  type="checkbox"
                  checked={searchCriteria.equipment.projectorStand}
                  onChange={(e) => setSearchCriteria({
                    ...searchCriteria,
                    equipment: {...searchCriteria.equipment, projectorStand: e.target.checked}
                  })}
                />
                プロジェクター台
              </CheckboxItem>
            </CheckboxGrid>
          </SearchSection>

          <SearchSection>
            <SectionTitle>料金条件</SectionTitle>
            <FormRow>
              <FormGroup>
                <Label>概算料金</Label>
                <RangeInputGroup>
                  <Input
                    value={searchCriteria.priceMin}
                    onChange={(e) => setSearchCriteria({...searchCriteria, priceMin: e.target.value})}
                    placeholder="最小"
                    style={{ width: '120px' }}
                  />
                  <span>〜</span>
                  <Input
                    value={searchCriteria.priceMax}
                    onChange={(e) => setSearchCriteria({...searchCriteria, priceMax: e.target.value})}
                    placeholder="最大"
                    style={{ width: '120px' }}
                  />
                </RangeInputGroup>
              </FormGroup>
            </FormRow>
          </SearchSection>

          <SearchSection>
            <SectionTitle>その他条件</SectionTitle>
            <CheckboxGrid>
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
                  checked={searchCriteria.conditions.waitingRoom}
                  onChange={(e) => setSearchCriteria({
                    ...searchCriteria,
                    conditions: {...searchCriteria.conditions, waitingRoom: e.target.checked}
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
            </CheckboxGrid>
          </SearchSection>

          <ButtonGroup>
            <Button variant="primary" size="large" onClick={handleSearch}>
              検索
            </Button>
            <Button variant="outline" size="large" onClick={handleClear}>
              条件クリア
            </Button>
            <Button variant="outline" size="large" onClick={() => alert('検索条件を保存しました')}>
              検索条件を保存
            </Button>
          </ButtonGroup>
        </SearchPanel>

        <ResultsSection>
          <ResultsHeader>
            <Text size="lg" weight="semibold">
              検索結果: {mockResults.length}件
            </Text>
            <TabContainer>
              <Tab active={viewMode === 'list'} onClick={() => setViewMode('list')}>
                一覧表示
              </Tab>
              <Tab active={viewMode === 'map'} onClick={() => setViewMode('map')}>
                地図表示
              </Tab>
            </TabContainer>
          </ResultsHeader>

          {viewMode === 'list' ? (
            <ResultsGrid>
              {mockResults.map(venue => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  onClick={() => onVenueSelect && onVenueSelect(venue.id)}
                />
              ))}
            </ResultsGrid>
          ) : (
            <MapView>
              地図表示機能は準備中です
            </MapView>
          )}
        </ResultsSection>
    </div>
  );
};