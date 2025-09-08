import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../../styles/theme';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const ButtonBase = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.fontWeight.medium};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
  
  /* Size variants */
  ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return css`
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.fontSize.sm};
        `;
      case 'large':
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.fontSize.lg};
        `;
      default:
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.fontSize.md};
        `;
    }
  }}
  
  /* Style variants */
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${theme.colors.primary[500]};
          color: ${theme.colors.neutral[0]};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[600]};
            box-shadow: ${theme.shadows.md};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.primary[700]};
          }
        `;
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary[500]};
          color: ${theme.colors.neutral[0]};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondary[600]};
            box-shadow: ${theme.shadows.md};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.secondary[700]};
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary[600]};
          border: 1px solid ${theme.colors.primary[500]};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[50]};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.primary[100]};
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary[600]};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[50]};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.primary[100]};
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${theme.colors.neutral[600]};
          border: 1px solid ${theme.colors.neutral[300]};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.neutral[50]};
            border-color: ${theme.colors.neutral[400]};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.neutral[100]};
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <ButtonBase {...props}>
      {children}
    </ButtonBase>
  );
};