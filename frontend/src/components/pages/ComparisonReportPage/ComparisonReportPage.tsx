import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Text, Card, Badge } from '../../atoms';
import { theme } from '../../../styles/theme';

const Container = styled.div`
  max-width: 1200px;
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

const ComparisonTable = styled(Card)`
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  min-width: 600px;
`;

const Thead = styled.thead`
  background: ${theme.colors.neutral[100]};
`;

const Th = styled.th`
  padding: ${theme.spacing.md};
  text-align: left;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.neutral[700]};
  border-bottom: 2px solid ${theme.colors.neutral[300]};
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid ${theme.colors.neutral[200]};
  
  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: ${theme.spacing.md};
  color: ${theme.colors.neutral[700]};
`;

const CategoryRow = styled.tr`
  background: ${theme.colors.neutral[50]};
`;

const CategoryTd = styled.td`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.primary[700]};
`;

const RadarChartContainer = styled(Card)`
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const RadarChart = styled.div`
  width: 400px;
  height: 400px;
  margin: 0 auto;
  position: relative;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cpolygon points='200,50 350,150 300,300 100,300 50,150' fill='none' stroke='%23E0E0E0' stroke-width='1'/%3E%3Cpolygon points='200,100 300,175 275,250 125,250 100,175' fill='none' stroke='%23E0E0E0' stroke-width='1'/%3E%3Cpolygon points='200,150 250,200 250,225 150,225 150,200' fill='none' stroke='%23E0E0E0' stroke-width='1'/%3E%3C/svg%3E") center no-repeat;
  background-size: contain;
`;

const CheckIcon = styled.span`
  color: ${theme.colors.success};
  font-weight: ${theme.fontWeight.bold};
`;

const CrossIcon = styled.span`
  color: ${theme.colors.error};
  font-weight: ${theme.fontWeight.bold};
`;

export const ComparisonReportPage: React.FC = () => {
  const [selectedVenues, setSelectedVenues] = useState<string[]>(['NOCプラザ', 'ホテルニューキャッスル']);

  const venues = [
    'NOCプラザ',
    'ホテルニューキャッスル',
    'じばさんプラザ',
    '新潟市民会館',
    'プラザ21',
  ];

  const toggleVenue = (venue: string) => {
    if (selectedVenues.includes(venue)) {
      setSelectedVenues(selectedVenues.filter(v => v !== venue));
    } else if (selectedVenues.length < 5) {
      setSelectedVenues([...selectedVenues, venue]);
    }
  };

  const comparisonData: { [key: string]: {
    capacity: string;
    area: string;
    price: string;
    parking: string;
    equipment: {
      projector: boolean;
      whiteboard: boolean;
      wifi: boolean;
      catering: boolean;
    };
    access: string;
    rating: number;
  } } = {
    'NOCプラザ': {
      capacity: '200名',
      area: '489㎡',
      price: '30,000円/日',
      parking: '50台',
      equipment: { projector: true, whiteboard: true, wifi: true, catering: false },
      access: 'JR新潟駅より15分',
      rating: 4.5,
    },
    'ホテルニューキャッスル': {
      capacity: '150名',
      area: '320㎡',
      price: '45,000円/日',
      parking: '30台',
      equipment: { projector: true, whiteboard: true, wifi: true, catering: true },
      access: 'JR新潟駅より10分',
      rating: 4.8,
    },
    'じばさんプラザ': {
      capacity: '100名',
      area: '240㎡',
      price: '20,000円/日',
      parking: '20台',
      equipment: { projector: true, whiteboard: false, wifi: true, catering: false },
      access: 'JR新潟駅より20分',
      rating: 3.9,
    },
  };

  return (
    <Container>
      <SelectionSection>
        <Text size="lg" weight="semibold" style={{ marginBottom: theme.spacing.md }}>
          比較する会場を選択（最大5件）
        </Text>
        <VenueSelector>
          {venues.map(venue => (
            <VenueCard
              key={venue}
              selected={selectedVenues.includes(venue)}
              onClick={() => toggleVenue(venue)}
            >
              <Text size="sm" weight={selectedVenues.includes(venue) ? 'semibold' : 'regular'}>
                {venue}
              </Text>
            </VenueCard>
          ))}
        </VenueSelector>
        <Button variant="primary">比較実行</Button>
      </SelectionSection>

      <ComparisonTable>
        <Text size="lg" weight="semibold" style={{ marginBottom: theme.spacing.lg }}>
          基本情報比較
        </Text>
        <Table>
          <Thead>
            <Tr>
              <Th>項目</Th>
              {selectedVenues.map(venue => (
                <Th key={venue}>{venue}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <CategoryRow>
              <CategoryTd colSpan={selectedVenues.length + 1}>基本スペック</CategoryTd>
            </CategoryRow>
            <Tr>
              <Td>収容人数</Td>
              {selectedVenues.map(venue => (
                <Td key={venue}>{comparisonData[venue]?.capacity || '-'}</Td>
              ))}
            </Tr>
            <Tr>
              <Td>面積</Td>
              {selectedVenues.map(venue => (
                <Td key={venue}>{comparisonData[venue]?.area || '-'}</Td>
              ))}
            </Tr>
            <Tr>
              <Td>料金</Td>
              {selectedVenues.map(venue => (
                <Td key={venue}>
                  <Text color={theme.colors.primary[600]} weight="semibold">
                    {comparisonData[venue]?.price || '-'}
                  </Text>
                </Td>
              ))}
            </Tr>
            <CategoryRow>
              <CategoryTd colSpan={selectedVenues.length + 1}>設備</CategoryTd>
            </CategoryRow>
            <Tr>
              <Td>プロジェクター</Td>
              {selectedVenues.map(venue => (
                <Td key={venue}>
                  {comparisonData[venue]?.equipment.projector ? 
                    <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                </Td>
              ))}
            </Tr>
            <Tr>
              <Td>ホワイトボード</Td>
              {selectedVenues.map(venue => (
                <Td key={venue}>
                  {comparisonData[venue]?.equipment.whiteboard ? 
                    <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                </Td>
              ))}
            </Tr>
            <Tr>
              <Td>Wi-Fi</Td>
              {selectedVenues.map(venue => (
                <Td key={venue}>
                  {comparisonData[venue]?.equipment.wifi ? 
                    <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                </Td>
              ))}
            </Tr>
            <Tr>
              <Td>ケータリング</Td>
              {selectedVenues.map(venue => (
                <Td key={venue}>
                  {comparisonData[venue]?.equipment.catering ? 
                    <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                </Td>
              ))}
            </Tr>
            <CategoryRow>
              <CategoryTd colSpan={selectedVenues.length + 1}>アクセス</CategoryTd>
            </CategoryRow>
            <Tr>
              <Td>駅からの距離</Td>
              {selectedVenues.map(venue => (
                <Td key={venue}>{comparisonData[venue]?.access || '-'}</Td>
              ))}
            </Tr>
            <Tr>
              <Td>駐車場</Td>
              {selectedVenues.map(venue => (
                <Td key={venue}>{comparisonData[venue]?.parking || '-'}</Td>
              ))}
            </Tr>
            <CategoryRow>
              <CategoryTd colSpan={selectedVenues.length + 1}>評価</CategoryTd>
            </CategoryRow>
            <Tr>
              <Td>総合評価</Td>
              {selectedVenues.map(venue => (
                <Td key={venue}>
                  <Text color={theme.colors.warning} weight="semibold">
                    ★ {comparisonData[venue]?.rating || '-'}
                  </Text>
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </ComparisonTable>

      <RadarChartContainer>
        <Text size="lg" weight="semibold" style={{ marginBottom: theme.spacing.lg }}>
          レーダーチャート比較
        </Text>
        <RadarChart />
        <div style={{ textAlign: 'center', marginTop: theme.spacing.lg }}>
          <Text size="sm" color={theme.colors.neutral[600]}>
            価格・設備・アクセス・評価・収容力の5軸で比較
          </Text>
        </div>
      </RadarChartContainer>

      <div style={{ display: 'flex', gap: theme.spacing.md }}>
        <Button variant="primary">PDFでエクスポート</Button>
        <Button variant="outline">Excelでエクスポート</Button>
      </div>
    </Container>
  );
};