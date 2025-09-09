import React from 'react';
import styled from 'styled-components';
import { Text, Button } from '../../atoms';
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 65px;
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

const Layout = styled.div`
  display: flex;
  padding-top: 65px;
`;

const Sidebar = styled.nav`
  width: 240px;
  background: ${theme.colors.neutral[0]};
  height: calc(100vh - 65px);
  border-right: 1px solid ${theme.colors.neutral[200]};
  padding: ${theme.spacing.lg} 0;
  position: fixed;
  left: 0;
  top: 65px;
  overflow-y: auto;
`;

const MenuSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const MenuTitle = styled.div`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.neutral[500]};
  text-transform: uppercase;
  padding: 0 ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.sm};
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
  margin-left: 240px;
  padding: ${theme.spacing.xl};
  min-height: calc(100vh - 65px);
`;

export interface MainLayoutProps {
  children: React.ReactNode;
  userName?: string;
  activePage?: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children,
  userName = '管理者',
  activePage = 'dashboard',
  onNavigate,
  onLogout
}) => {
  const menuStructure = [
    {
      section: 'メイン',
      items: [
        { id: 'dashboard', label: 'ダッシュボード', icon: '📊' },
      ]
    },
    {
      section: '会場管理',
      items: [
        { id: 'venue-list', label: '会場一覧', icon: '📋' },
        { id: 'venue-register', label: '会場登録', icon: '➕' },
        { id: 'venue-search', label: '会場検索', icon: '🔍' },
      ]
    },
    {
      section: '予約管理',
      items: [
        { id: 'reservation', label: '予約管理', icon: '📅' },
        { id: 'calendar', label: 'カレンダー', icon: '📆' },
      ]
    },
    {
      section: '管理',
      items: [
        { id: 'users', label: 'ユーザー管理', icon: '👥' },
        { id: 'settings', label: 'システム設定', icon: '⚙️' },
        { id: 'ai-support', label: 'AI入力支援', icon: '🤖' },
      ]
    }
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
          {menuStructure.map((section) => (
            <MenuSection key={section.section}>
              <MenuTitle>{section.section}</MenuTitle>
              {section.items.map(item => (
                <MenuItem 
                  key={item.id} 
                  active={item.id === activePage}
                  onClick={() => onNavigate(item.id)}
                >
                  <MenuIcon>{item.icon}</MenuIcon>
                  <Text size="sm">{item.label}</Text>
                </MenuItem>
              ))}
            </MenuSection>
          ))}
        </Sidebar>

        <MainContent>
          {children}
        </MainContent>
      </Layout>
    </PageContainer>
  );
};