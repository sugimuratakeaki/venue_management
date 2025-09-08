import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../../styles/theme';

export interface CardProps {
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  borderRadius?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const StyledCard = styled.div<CardProps>`
  background-color: ${theme.colors.neutral[0]};
  border: 1px solid ${theme.colors.neutral[200]};
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  
  ${({ padding = 'medium' }) => {
    switch (padding) {
      case 'none':
        return css`padding: 0;`;
      case 'small':
        return css`padding: ${theme.spacing.sm};`;
      case 'large':
        return css`padding: ${theme.spacing.lg};`;
      default:
        return css`padding: ${theme.spacing.md};`;
    }
  }}
  
  ${({ shadow = 'sm' }) => shadow !== 'none' && css`
    box-shadow: ${theme.shadows[shadow]};
  `}
  
  ${({ borderRadius = 'md' }) => css`
    border-radius: ${theme.borderRadius[borderRadius]};
  `}
  
  ${({ onClick }) => onClick && css`
    cursor: pointer;
    
    &:hover {
      box-shadow: ${theme.shadows.lg};
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
`;

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <StyledCard {...props}>
      {children}
    </StyledCard>
  );
};