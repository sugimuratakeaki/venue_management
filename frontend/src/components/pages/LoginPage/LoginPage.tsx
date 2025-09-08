import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Text } from '../../atoms';
import { theme } from '../../../styles/theme';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${theme.colors.primary[50]} 0%, ${theme.colors.secondary[50]} 100%);
`;

const LoginCard = styled.div`
  background: ${theme.colors.neutral[0]};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.xl};
  padding: ${theme.spacing.xxl};
  width: 100%;
  max-width: 400px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const Logo = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.primary[700]} 100%);
  border-radius: ${theme.borderRadius.full};
  margin: 0 auto ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral[0]};
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.neutral[700]};
  font-weight: ${theme.fontWeight.medium};
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin: ${theme.spacing.sm} 0;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.neutral[600]};
  cursor: pointer;
`;

const Link = styled.a`
  color: ${theme.colors.primary[600]};
  text-decoration: none;
  font-size: ${theme.fontSize.sm};
  text-align: center;
  margin-top: ${theme.spacing.md};
  display: block;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.neutral[200]};
  color: ${theme.colors.neutral[500]};
  font-size: ${theme.fontSize.xs};
`;

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <PageContainer>
      <LoginCard>
        <Header>
          <Logo>防</Logo>
          <Text size="xl" weight="bold">防災士研修センター</Text>
          <Text size="md" color={theme.colors.neutral[600]}>会場管理システム</Text>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>メールアドレス</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>パスワード</Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              required
            />
          </FormGroup>

          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <CheckboxLabel htmlFor="showPassword">パスワードを表示</CheckboxLabel>
          </CheckboxGroup>

          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <CheckboxLabel htmlFor="rememberMe">ログイン情報を記憶</CheckboxLabel>
          </CheckboxGroup>

          <Button type="submit" variant="primary" size="large" fullWidth>
            ログイン
          </Button>
        </Form>

        <Link onClick={() => alert('パスワードリセット機能は準備中です')}>
          パスワードをお忘れの方
        </Link>

        <Footer>
          © 2025 防災士研修センター All Rights Reserved.
        </Footer>
      </LoginCard>
    </PageContainer>
  );
};