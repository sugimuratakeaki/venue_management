import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Text, Card, Badge } from '../../atoms';
import { theme } from '../../../styles/theme';

const Container = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};
`;

const CalendarSection = styled.div`
  flex: 1;
`;

const SidePanel = styled(Card)`
  width: 300px;
  padding: ${theme.spacing.lg};
  height: fit-content;
`;

const ViewTabs = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  background: ${theme.colors.neutral[100]};
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
`;

const Tab = styled.button<{ active?: boolean }>`
  flex: 1;
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

const CalendarGrid = styled.div`
  background: ${theme.colors.neutral[0]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const MonthNavigation = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: ${theme.colors.neutral[200]};
  margin-bottom: 1px;
`;

const WeekDay = styled.div`
  background: ${theme.colors.neutral[50]};
  padding: ${theme.spacing.sm};
  text-align: center;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.neutral[700]};
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: ${theme.colors.neutral[200]};
`;

const DayCell = styled.div<{ isToday?: boolean; isOtherMonth?: boolean }>`
  background: ${props => props.isToday ? theme.colors.primary[50] : theme.colors.neutral[0]};
  min-height: 100px;
  padding: ${theme.spacing.sm};
  position: relative;
  opacity: ${props => props.isOtherMonth ? 0.5 : 1};
  
  &:hover {
    background: ${theme.colors.neutral[50]};
  }
`;

const DayNumber = styled.div<{ isToday?: boolean }>`
  font-weight: ${props => props.isToday ? theme.fontWeight.bold : theme.fontWeight.regular};
  color: ${props => props.isToday ? theme.colors.primary[600] : theme.colors.neutral[700]};
  margin-bottom: ${theme.spacing.xs};
`;

const Event = styled.div<{ type: string }>`
  font-size: ${theme.fontSize.xs};
  padding: 2px 4px;
  margin: 2px 0;
  border-radius: 2px;
  background: ${props => 
    props.type === 'confirmed' ? theme.colors.success :
    props.type === 'provisional' ? theme.colors.warning :
    theme.colors.neutral[300]
  };
  color: ${theme.colors.neutral[0]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FilterSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const FilterTitle = styled.div`
  font-weight: ${theme.fontWeight.semibold};
  margin-bottom: ${theme.spacing.sm};
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  cursor: pointer;
  
  input {
    width: 16px;
    height: 16px;
  }
`;

const LegendSection = styled.div`
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.neutral[200]};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xs};
`;

const LegendColor = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background: ${props => props.color};
  border-radius: 2px;
`;

const EventDetail = styled(Card)`
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
`;

export const CalendarPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [currentMonth, setCurrentMonth] = useState('2025年1月');
  const [selectedFilters, setSelectedFilters] = useState({
    venues: ['all'],
    status: ['all']
  });

  // カレンダーのモックデータ生成
  const generateCalendarDays = () => {
    const days = [];
    const events: { [key: number]: { name: string; type: string }[] } = {
      15: [{ name: 'NOCプラザ', type: 'provisional' }],
      22: [{ name: 'NOCプラザ', type: 'provisional' }],
      10: [{ name: 'ホテルニューキャッスル', type: 'confirmed' }],
      28: [{ name: 'じばさんプラザ', type: 'provisional' }],
    };

    // 前月の日付（薄く表示）
    for (let i = 29; i <= 31; i++) {
      days.push({ day: i, isOtherMonth: true, events: [] });
    }

    // 当月の日付
    for (let i = 1; i <= 31; i++) {
      days.push({
        day: i,
        isToday: i === 15,
        isOtherMonth: false,
        events: events[i] || []
      });
    }

    // 翌月の日付（薄く表示）
    for (let i = 1; i <= 4; i++) {
      days.push({ day: i, isOtherMonth: true, events: [] });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <Container>
      <CalendarSection>
        <ViewTabs>
          <Tab active={viewMode === 'month'} onClick={() => setViewMode('month')}>
            月表示
          </Tab>
          <Tab active={viewMode === 'week'} onClick={() => setViewMode('week')}>
            週表示
          </Tab>
          <Tab active={viewMode === 'day'} onClick={() => setViewMode('day')}>
            日表示
          </Tab>
        </ViewTabs>

        <CalendarGrid>
          <CalendarHeader>
            <MonthNavigation>
              <Button size="small" variant="outline">←</Button>
              <Text size="lg" weight="bold">{currentMonth}</Text>
              <Button size="small" variant="outline">→</Button>
            </MonthNavigation>
            <div>
              <Button size="small" variant="outline">今日</Button>
              <Button size="small" variant="outline" style={{ marginLeft: '8px' }}>
                印刷
              </Button>
            </div>
          </CalendarHeader>

          <WeekDays>
            {weekDays.map(day => (
              <WeekDay key={day}>{day}</WeekDay>
            ))}
          </WeekDays>

          <DaysGrid>
            {calendarDays.map((day, index) => (
              <DayCell 
                key={index}
                isToday={day.isToday}
                isOtherMonth={day.isOtherMonth}
              >
                <DayNumber isToday={day.isToday}>{day.day}</DayNumber>
                {day.events.map((event: any, i: number) => (
                  <Event key={i} type={event.type}>
                    {event.name}
                  </Event>
                ))}
              </DayCell>
            ))}
          </DaysGrid>
        </CalendarGrid>
      </CalendarSection>

      <SidePanel>
        <FilterSection>
          <FilterTitle>会場フィルタ</FilterTitle>
          <CheckboxGroup>
            <CheckboxItem>
              <input type="checkbox" checked />
              <span>すべて</span>
            </CheckboxItem>
            <CheckboxItem>
              <input type="checkbox" />
              <span>NOCプラザ</span>
            </CheckboxItem>
            <CheckboxItem>
              <input type="checkbox" />
              <span>ホテルニューキャッスル</span>
            </CheckboxItem>
            <CheckboxItem>
              <input type="checkbox" />
              <span>じばさんプラザ</span>
            </CheckboxItem>
          </CheckboxGroup>
        </FilterSection>

        <FilterSection>
          <FilterTitle>ステータスフィルタ</FilterTitle>
          <CheckboxGroup>
            <CheckboxItem>
              <input type="checkbox" checked />
              <span>すべて</span>
            </CheckboxItem>
            <CheckboxItem>
              <input type="checkbox" />
              <span>確定</span>
            </CheckboxItem>
            <CheckboxItem>
              <input type="checkbox" />
              <span>仮予約</span>
            </CheckboxItem>
            <CheckboxItem>
              <input type="checkbox" />
              <span>キャンセル</span>
            </CheckboxItem>
          </CheckboxGroup>
        </FilterSection>

        <LegendSection>
          <FilterTitle>凡例</FilterTitle>
          <LegendItem>
            <LegendColor color={theme.colors.success} />
            <Text size="sm">確定</Text>
          </LegendItem>
          <LegendItem>
            <LegendColor color={theme.colors.warning} />
            <Text size="sm">仮予約</Text>
          </LegendItem>
          <LegendItem>
            <LegendColor color={theme.colors.error} />
            <Text size="sm">キャンセル</Text>
          </LegendItem>
          <LegendItem>
            <LegendColor color={theme.colors.neutral[300]} />
            <Text size="sm">保留</Text>
          </LegendItem>
        </LegendSection>

        <EventDetail>
          <Text size="sm" weight="semibold">1月15日の予定</Text>
          <div style={{ marginTop: '8px' }}>
            <Text size="xs">NOCプラザ（仮予約）</Text>
            <Text size="xs" color={theme.colors.neutral[600]}>
              防災研修 50名
            </Text>
          </div>
        </EventDetail>
      </SidePanel>
    </Container>
  );
};