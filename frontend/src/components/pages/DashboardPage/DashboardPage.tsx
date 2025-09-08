import React from 'react';
import styled from 'styled-components';
import { Card, Text, Button, Badge } from '../../atoms';
import { theme } from '../../../styles/theme';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.neutral[50]};
`;

const Header = styled.header`
  background: ${theme.colors.neutral[0]};
  border-bottom: 1px solid ${theme.colors.neutral[200]};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.primary[700]} 100%);
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral[0]};
  font-weight: ${theme.fontWeight.bold};
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Layout = styled.div`
  display: flex;
`;

const Sidebar = styled.nav`
  width: 240px;
  background: ${theme.colors.neutral[0]};
  height: calc(100vh - 65px);
  border-right: 1px solid ${theme.colors.neutral[200]};
  padding: ${theme.spacing.lg} 0;
`;

const MenuItem = styled.div<{ active?: boolean }>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${props => props.active ? theme.colors.primary[50] : 'transparent'};
  border-left: 3px solid ${props => props.active ? theme.colors.primary[500] : 'transparent'};
  color: ${props => props.active ? theme.colors.primary[700] : theme.colors.neutral[700]};
  transition: all 0.2s;
  
  &:hover {
    background: ${theme.colors.neutral[50]};
  }
`;

const MenuIcon = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${theme.spacing.xl};
`;

const WelcomeSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const StatCard = styled(Card)`
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const StatValue = styled.div`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary[600]};
`;

const QuickActionsSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const QuickActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  margin-top: ${theme.spacing.md};
`;

const RecentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const RecentCard = styled(Card)`
  padding: ${theme.spacing.lg};
`;

const RecentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const RecentItem = styled.div`
  padding: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.neutral[200]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationBadge = styled.div`
  background: ${theme.colors.error};
  color: ${theme.colors.neutral[0]};
  border-radius: ${theme.borderRadius.full};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.xs};
`;

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  userName?: string;
  onLogout: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ 
  onNavigate, 
  userName = '管理者',
  onLogout 
}) => {
  const menuItems = [
    { id: 'venue', label: '会場管理', icon: '🏢', active: true },
    { id: 'reservation', label: '予約管理', icon: '📅' },
    { id: 'report', label: 'レポート', icon: '📊' },
    { id: 'admin', label: '管理機能', icon: '⚙️' },
    { id: 'ai', label: 'AI支援', icon: '🤖' },
  ];

  return (
    <PageContainer>
      <Header>
        <HeaderLeft>
          <Logo>防</Logo>
          <Text size="lg" weight="bold">防災士研修センター 会場管理システム</Text>
        </HeaderLeft>
        <HeaderRight>
          <NotificationBadge>3</NotificationBadge>
          <UserInfo>
            <Text size="md">{userName}</Text>
          </UserInfo>
          <Button size="small" variant="outline" onClick={onLogout}>
            ログアウト
          </Button>
        </HeaderRight>
      </Header>

      <Layout>
        <Sidebar>
          {menuItems.map(item => (
            <MenuItem 
              key={item.id} 
              active={item.active}
              onClick={() => onNavigate(item.id)}
            >
              <MenuIcon>{item.icon}</MenuIcon>
              <Text size="md">{item.label}</Text>
            </MenuItem>
          ))}
        </Sidebar>

        <MainContent>
          <WelcomeSection>
            <Text size="xxl" weight="bold">ダッシュボード</Text>
            <Text size="md" color={theme.colors.neutral[600]}>
              おはようございます、{userName}さん
            </Text>
          </WelcomeSection>

          <StatsGrid>
            <StatCard>
              <Text size="sm" color={theme.colors.neutral[600]}>登録会場数</Text>
              <StatValue>156</StatValue>
              <Text size="xs" color={theme.colors.success}>前月比 +12</Text>
            </StatCard>
            <StatCard>
              <Text size="sm" color={theme.colors.neutral[600]}>今月の予約</Text>
              <StatValue>24</StatValue>
              <Text size="xs" color={theme.colors.warning}>確定待ち 5件</Text>
            </StatCard>
            <StatCard>
              <Text size="sm" color={theme.colors.neutral[600]}>利用率</Text>
              <StatValue>68%</StatValue>
              <Text size="xs" color={theme.colors.success}>前月比 +5%</Text>
            </StatCard>
            <StatCard>
              <Text size="sm" color={theme.colors.neutral[600]}>未処理タスク</Text>
              <StatValue>8</StatValue>
              <Text size="xs" color={theme.colors.error}>要対応 3件</Text>
            </StatCard>
          </StatsGrid>

          <QuickActionsSection>
            <Text size="lg" weight="bold">クイックアクセス</Text>
            <QuickActions>
              <Button 
                variant="primary" 
                onClick={() => onNavigate('venue-register')}
              >
                新規会場登録
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate('venue-search')}
              >
                会場検索
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate('calendar')}
              >
                予約カレンダー
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate('ai-support')}
              >
                AI入力支援
              </Button>
            </QuickActions>
          </QuickActionsSection>

          <RecentSection>
            <RecentCard>
              <Text size="lg" weight="bold">最近の更新</Text>
              <RecentList>
                <RecentItem>
                  <div>
                    <Text size="sm">NOCプラザ</Text>
                    <Text size="xs" color={theme.colors.neutral[500]}>料金情報を更新</Text>
                  </div>
                  <Badge variant="success">完了</Badge>
                </RecentItem>
                <RecentItem>
                  <div>
                    <Text size="sm">ホテルニューキャッスル</Text>
                    <Text size="xs" color={theme.colors.neutral[500]}>新規登録</Text>
                  </div>
                  <Badge variant="info">新規</Badge>
                </RecentItem>
                <RecentItem>
                  <div>
                    <Text size="sm">じばさんプラザ</Text>
                    <Text size="xs" color={theme.colors.neutral[500]}>予約確定</Text>
                  </div>
                  <Badge variant="warning">予約</Badge>
                </RecentItem>
              </RecentList>
            </RecentCard>

            <RecentCard>
              <Text size="lg" weight="bold">お知らせ・通知</Text>
              <RecentList>
                <RecentItem>
                  <div>
                    <Text size="sm">システムメンテナンス</Text>
                    <Text size="xs" color={theme.colors.neutral[500]}>12/25 2:00-4:00</Text>
                  </div>
                  <Badge variant="error">重要</Badge>
                </RecentItem>
                <RecentItem>
                  <div>
                    <Text size="sm">新機能リリース</Text>
                    <Text size="xs" color={theme.colors.neutral[500]}>AI支援機能を追加</Text>
                  </div>
                  <Badge variant="info">お知らせ</Badge>
                </RecentItem>
                <RecentItem>
                  <div>
                    <Text size="sm">承認待ち</Text>
                    <Text size="xs" color={theme.colors.neutral[500]}>3件の承認が必要です</Text>
                  </div>
                  <Badge variant="warning">要対応</Badge>
                </RecentItem>
              </RecentList>
            </RecentCard>
          </RecentSection>
        </MainContent>
      </Layout>
    </PageContainer>
  );
};