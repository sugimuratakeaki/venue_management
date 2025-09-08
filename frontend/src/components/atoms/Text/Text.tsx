import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../../styles/theme';

export interface TextProps {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const StyledText = styled.p<TextProps>`
  margin: 0;
  color: ${({ color }) => color || theme.colors.neutral[900]};
  font-size: ${({ size = 'md' }) => theme.fontSize[size]};
  font-weight: ${({ weight = 'regular' }) => theme.fontWeight[weight]};
  text-align: ${({ align = 'left' }) => align};
  
  ${({ truncate }) => truncate && css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

export const Text: React.FC<TextProps> = ({ as = 'p', children, ...props }) => {
  return (
    <StyledText as={as} {...props}>
      {children}
    </StyledText>
  );
};