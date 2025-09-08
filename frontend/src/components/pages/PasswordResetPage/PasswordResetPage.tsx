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

const ResetCard = styled.div`
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

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: ${theme.spacing.md};
  background: ${props => props.type === 'success' ? theme.colors.success + '20' : theme.colors.error + '20'};
  border: 1px solid ${props => props.type === 'success' ? theme.colors.success : theme.colors.error};
  border-radius: ${theme.borderRadius.sm};
  color: ${props => props.type === 'success' ? theme.colors.success : theme.colors.error};
  margin-bottom: ${theme.spacing.md};
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

interface PasswordResetPageProps {
  onBack: () => void;
}

export const PasswordResetPage: React.FC<PasswordResetPageProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('メールアドレスを入力してください');
      return;
    }
    setIsSubmitted(true);
    setError('');
  };

  return (
    <PageContainer>
      <ResetCard>
        <Header>
          <Logo>防</Logo>
          <Text size="xl" weight="bold">パスワードリセット</Text>
          <Text size="md" color={theme.colors.neutral[600]}>
            登録済みのメールアドレスを入力してください
          </Text>
        </Header>

        {isSubmitted ? (
          <>
            <Message type="success">
              パスワードリセット用のメールを送信しました。
              メールボックスをご確認ください。
            </Message>
            <Button variant="primary" fullWidth onClick={onBack}>
              ログイン画面へ戻る
            </Button>
          </>
        ) : (
          <Form onSubmit={handleSubmit}>
            {error && <Message type="error">{error}</Message>}
            
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

            <Button type="submit" variant="primary" size="large" fullWidth>
              リセットメールを送信
            </Button>
          </Form>
        )}

        <Link onClick={onBack}>
          ログイン画面へ戻る
        </Link>
      </ResetCard>
    </PageContainer>
  );
};