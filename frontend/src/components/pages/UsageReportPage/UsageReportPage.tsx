import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Text, Card } from '../../atoms';
import { theme } from '../../../styles/theme';

const Container = styled.div`
  max-width: 1200px;
`;

const ControlSection = styled(Card)`
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: center;
`;

const Select = styled.select`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.neutral[300]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.md};
  background: ${theme.colors.neutral[0]};
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
  }
`;

const ChartContainer = styled(Card)`
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const ChartTitle = styled.div`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  margin-bottom: ${theme.spacing.lg};
`;

const Chart = styled.div`
  height: 300px;
  background: linear-gradient(to top, ${theme.colors.primary[100]}, ${theme.colors.neutral[0]});
  border-radius: ${theme.borderRadius.md};
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: ${theme.spacing.md};
  gap: ${theme.spacing.md};
`;

const Bar = styled.div<{ height: number }>`
  flex: 1;
  height: ${props => props.height}%;
  background: linear-gradient(to top, ${theme.colors.primary[600]}, ${theme.colors.primary[400]});
  border-radius: ${theme.borderRadius.sm} ${theme.borderRadius.sm} 0 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: ${theme.spacing.xs};
  
  &:hover {
    background: linear-gradient(to top, ${theme.colors.primary[700]}, ${theme.colors.primary[500]});
  }
`;

const BarLabel = styled.div`
  position: absolute;
  bottom: -25px;
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.neutral[600]};
`;

const BarValue = styled.div`
  position: absolute;
  top: -20px;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.primary[700]};
`;

const PieChartContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PieChart = styled.div`
  width: 250px;
  height: 250px;
  border-radius: ${theme.borderRadius.full};
  background: conic-gradient(
    ${theme.colors.primary[500]} 0deg 108deg,
    ${theme.colors.secondary[500]} 108deg 216deg,
    ${theme.colors.warning} 216deg 288deg,
    ${theme.colors.success} 288deg
  );
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: ${theme.colors.neutral[0]};
    border-radius: ${theme.borderRadius.full};
  }
`;

const PieLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const LegendColor = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background: ${props => props.color};
  border-radius: ${theme.borderRadius.sm};
`;

const DataTable = styled.table`
  width: 100%;
  background: ${theme.colors.neutral[0]};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`;

const Thead = styled.thead`
  background: ${theme.colors.neutral[100]};
`;

const Th = styled.th`
  padding: ${theme.spacing.md};
  text-align: left;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.neutral[700]};
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

const ExportButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

export const UsageReportPage: React.FC = () => {
  const [period, setPeriod] = useState('month');
  const [reportType, setReportType] = useState('usage');

  const monthlyData = [
    { month: '10月', value: 15, count: 15 },
    { month: '11月', value: 23, count: 23 },
    { month: '12月', value: 31, count: 31 },
    { month: '1月', value: 28, count: 28 },
    { month: '2月', value: 35, count: 35 },
    { month: '3月', value: 42, count: 42 },
  ];

  const regionData = [
    { region: '新潟県', percentage: 30, color: theme.colors.primary[500] },
    { region: '東京都', percentage: 35, color: theme.colors.secondary[500] },
    { region: '大阪府', percentage: 20, color: theme.colors.warning },
    { region: 'その他', percentage: 15, color: theme.colors.success },
  ];

  const detailData = [
    { venue: 'NOCプラザ', usage: 12, revenue: '480,000円', rate: '85%' },
    { venue: 'ホテルニューキャッスル', usage: 8, revenue: '320,000円', rate: '62%' },
    { venue: 'じばさんプラザ', usage: 15, revenue: '225,000円', rate: '91%' },
    { venue: '新潟市民会館', usage: 5, revenue: '150,000円', rate: '38%' },
  ];

  return (
    <Container>
      <ControlSection>
        <div>
          <Text size="sm" color={theme.colors.neutral[600]}>期間選択</Text>
          <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="month">月別</option>
            <option value="quarter">四半期</option>
            <option value="year">年別</option>
          </Select>
        </div>
        <div>
          <Text size="sm" color={theme.colors.neutral[600]}>レポート種別</Text>
          <Select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="usage">利用実績</option>
            <option value="region">地域別実績</option>
            <option value="cost">費用分析</option>
          </Select>
        </div>
        <Button variant="primary">レポート生成</Button>
      </ControlSection>

      <ChartContainer>
        <ChartTitle>月別利用実績</ChartTitle>
        <Chart>
          {monthlyData.map((data) => (
            <Bar key={data.month} height={(data.value / 50) * 100}>
              <BarValue>{data.count}件</BarValue>
              <BarLabel>{data.month}</BarLabel>
            </Bar>
          ))}
        </Chart>
      </ChartContainer>

      <ChartContainer>
        <ChartTitle>地域別利用実績</ChartTitle>
        <PieChartContainer>
          <PieChart />
          <PieLegend>
            {regionData.map((data) => (
              <LegendItem key={data.region}>
                <LegendColor color={data.color} />
                <Text size="sm">{data.region}: {data.percentage}%</Text>
              </LegendItem>
            ))}
          </PieLegend>
        </PieChartContainer>
      </ChartContainer>

      <ChartContainer>
        <ChartTitle>詳細データ</ChartTitle>
        <DataTable>
          <Thead>
            <Tr>
              <Th>会場名</Th>
              <Th>利用回数</Th>
              <Th>収益</Th>
              <Th>稼働率</Th>
            </Tr>
          </Thead>
          <Tbody>
            {detailData.map((data) => (
              <Tr key={data.venue}>
                <Td>{data.venue}</Td>
                <Td>{data.usage}回</Td>
                <Td>{data.revenue}</Td>
                <Td>
                  <Text color={
                    parseInt(data.rate) >= 80 ? theme.colors.success :
                    parseInt(data.rate) >= 50 ? theme.colors.warning :
                    theme.colors.error
                  }>
                    {data.rate}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </DataTable>
      </ChartContainer>

      <ExportButtons>
        <Button variant="primary">PDFでエクスポート</Button>
        <Button variant="outline">Excelでエクスポート</Button>
        <Button variant="outline">印刷プレビュー</Button>
      </ExportButtons>
    </Container>
  );
};