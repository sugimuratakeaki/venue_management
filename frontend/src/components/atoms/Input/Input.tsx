import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../../styles/theme';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
}

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
`;

const Label = styled.label`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.neutral[700]};
`;

const StyledInput = styled.input<{ error?: boolean; fullWidth?: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.fontSize.md};
  border: 1px solid ${({ error }) => error ? theme.colors.error : theme.colors.neutral[300]};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.neutral[0]};
  transition: all 0.2s ease-in-out;
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
  
  &:hover:not(:disabled) {
    border-color: ${({ error }) => error ? theme.colors.error : theme.colors.neutral[400]};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ error }) => error ? theme.colors.error : theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ error }) => error ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)'};
  }
  
  &:disabled {
    background-color: ${theme.colors.neutral[100]};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${theme.colors.neutral[500]};
  }
`;

const HelperText = styled.span<{ error?: boolean }>`
  font-size: ${theme.fontSize.xs};
  color: ${({ error }) => error ? theme.colors.error : theme.colors.neutral[600]};
`;

export const Input: React.FC<InputProps> = ({ 
  fullWidth, 
  error, 
  label, 
  helperText,
  id,
  ...props 
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <InputWrapper fullWidth={fullWidth}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <StyledInput 
        id={inputId}
        error={error} 
        fullWidth={fullWidth} 
        {...props} 
      />
      {helperText && <HelperText error={error}>{helperText}</HelperText>}
    </InputWrapper>
  );
};