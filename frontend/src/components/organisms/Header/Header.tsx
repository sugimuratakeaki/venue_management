import React from 'react';
import styled from 'styled-components';
import { Text, Button } from '../../atoms';
import { theme } from '../../../styles/theme';

export interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
  showMenu?: boolean;
}

const HeaderContainer = styled.header`
  background-color: ${theme.colors.primary[500]};
  color: ${theme.colors.neutral[0]};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const MenuButton = styled(Button)`
  display: none;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    display: flex;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${theme.colors.neutral[0]};
  text-decoration: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const Header: React.FC<HeaderProps> = ({
  title = '防災士研修センター 会場管理システム',
  onMenuClick,
  showMenu = false
}) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoSection>
          {showMenu && (
            <MenuButton 
              variant="text" 
              onClick={onMenuClick}
              style={{ color: 'white' }}
            >
              ☰
            </MenuButton>
          )}
          <Text as="h1" size="xl" weight="bold">
            {title}
          </Text>
        </LogoSection>
        
        <Navigation>
          <NavLink href="#venues">会場一覧</NavLink>
          <NavLink href="#search">会場検索</NavLink>
          <NavLink href="#add">会場登録</NavLink>
          <NavLink href="#reports">レポート</NavLink>
          <NavLink href="#settings">設定</NavLink>
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  );
};