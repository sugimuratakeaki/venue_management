import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../../styles/theme';

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'small' | 'medium';
  children: React.ReactNode;
  className?: string;
}

const StyledBadge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.fontWeight.medium};
  border-radius: ${theme.borderRadius.full};
  white-space: nowrap;
  
  ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 2px ${theme.spacing.xs};
          font-size: ${theme.fontSize.xs};
        `;
      default:
        return css`
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.fontSize.sm};
        `;
    }
  }}
  
  ${({ variant = 'primary' }) => {
    const getColors = () => {
      switch (variant) {
        case 'primary':
          return { bg: theme.colors.primary[100], color: theme.colors.primary[800] };
        case 'secondary':
          return { bg: theme.colors.secondary[100], color: theme.colors.secondary[800] };
        case 'success':
          return { bg: '#E8F5E9', color: '#2E7D32' };
        case 'warning':
          return { bg: '#FFF3E0', color: '#E65100' };
        case 'error':
          return { bg: '#FFEBEE', color: '#C62828' };
        case 'info':
          return { bg: theme.colors.secondary[100], color: theme.colors.secondary[800] };
        case 'neutral':
          return { bg: theme.colors.neutral[200], color: theme.colors.neutral[700] };
        default:
          return { bg: theme.colors.neutral[200], color: theme.colors.neutral[700] };
      }
    };
    
    const colors = getColors();
    return css`
      background-color: ${colors.bg};
      color: ${colors.color};
    `;
  }}
`;

export const Badge: React.FC<BadgeProps> = ({ children, ...props }) => {
  return (
    <StyledBadge {...props}>
      {children}
    </StyledBadge>
  );
};