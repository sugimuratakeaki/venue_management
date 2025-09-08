import React from 'react';
import styled from 'styled-components';
import { Text, Badge } from '../../atoms';
import { theme } from '../../../styles/theme';

export interface InfoItemProps {
  label: string;
  value: React.ReactNode;
  icon?: string;
  badge?: {
    text: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  };
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.neutral[200]};
  
  &:last-child {
    border-bottom: none;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 18px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const ValueWrapper = styled.div`
  color: ${theme.colors.neutral[800]};
`;

export const InfoItem: React.FC<InfoItemProps> = ({ 
  label, 
  value, 
  icon,
  badge 
}) => {
  return (
    <Container>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <Content>
        <LabelWrapper>
          <Text size="sm" color={theme.colors.neutral[600]} weight="medium">
            {label}
          </Text>
          {badge && (
            <Badge variant={badge.variant || 'neutral'} size="small">
              {badge.text}
            </Badge>
          )}
        </LabelWrapper>
        <ValueWrapper>
          {typeof value === 'string' ? (
            <Text size="md">{value}</Text>
          ) : (
            value
          )}
        </ValueWrapper>
      </Content>
    </Container>
  );
};