import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Card, Text, Badge } from '../../atoms';
import { theme } from '../../../styles/theme';

const Container = styled.div`
  max-width: 800px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const Section = styled(Card)`
  padding: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 2px solid ${theme.colors.neutral[200]};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.lg};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.neutral[700]};
`;

const Required = styled.span`
  color: ${theme.colors.error};
  margin-left: ${theme.spacing.xs};
`;

const Select = styled.select`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.neutral[300]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.md};
  background: ${theme.colors.neutral[0]};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
`;

const UserAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.primary[500]};
  color: ${theme.colors.neutral[0]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.xxl};
  font-weight: ${theme.fontWeight.bold};
  margin: 0 auto ${theme.spacing.lg};
`;

const StatusBadge = styled(Badge)<{ status: string }>`
  background: ${props => 
    props.status === 'active' ? theme.colors.success :
    props.status === 'inactive' ? theme.colors.neutral[400] :
    theme.colors.error
  };
  color: ${theme.colors.neutral[0]};
`;

const PermissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};
`;

const PermissionSection = styled.div`
  border: 1px solid ${theme.colors.neutral[200]};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
`;

const PermissionTitle = styled.div`
  font-weight: ${theme.fontWeight.semibold};
  margin-bottom: ${theme.spacing.sm};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  cursor: pointer;
  margin-bottom: ${theme.spacing.xs};
`;

const ActivityLog = styled.div`
  background: ${theme.colors.neutral[50]};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.neutral[200]};
  
  &:last-child {
    border-bottom: none;
  }
`;

const DangerZone = styled(Card)`
  padding: ${theme.spacing.lg};
  border: 2px solid ${theme.colors.error};
  background: ${theme.colors.error}10;
`;

interface UserEditPageProps {
  userId?: number;
  onBack?: () => void;
}

export const UserEditPage: React.FC<UserEditPageProps> = ({ userId, onBack }) => {
  const [formData, setFormData] = useState({
    name: '山田太郎',
    email: 'yamada@example.com',
    role: 'manager',
    status: 'active',
    department: '運営部',
    employee_id: 'EMP001',
    phone: '090-1234-5678',
    permissions: {
      venue: ['view', 'edit', 'create'],
      reservation: ['view', 'edit', 'create', 'delete'],
      user: ['view'],
      report: ['view', 'export'],
      system: [],
    },
    notifications: {
      email: true,
      reservation: true,
      system: false,
      report: true,
    },
  });

  const [activityLog] = useState([
    { date: '2025/01/07 10:30', action: 'ログイン' },
    { date: '2025/01/06 16:45', action: '会場情報を更新' },
    { date: '2025/01/05 09:15', action: '予約を確定' },
    { date: '2025/01/04 14:00', action: 'レポートをエクスポート' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('ユーザー情報を更新しました');
  };

  const handlePasswordReset = () => {
    if (window.confirm('パスワードリセットメールを送信しますか？')) {
      alert('パスワードリセットメールを送信しました');
    }
  };

  const handleAccountLock = () => {
    if (window.confirm('このアカウントをロックしますか？')) {
      setFormData({ ...formData, status: 'locked' });
      alert('アカウントをロックしました');
    }
  };

  const handleAccountDelete = () => {
    if (window.confirm('このアカウントを削除しますか？この操作は取り消せません。')) {
      alert('アカウントを削除しました');
      onBack && onBack();
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
            <SectionTitle>基本情報</SectionTitle>
            <StatusBadge status={formData.status}>
              {formData.status === 'active' ? 'アクティブ' :
               formData.status === 'inactive' ? '非アクティブ' : 'ロック中'}
            </StatusBadge>
          </div>
          
          <UserAvatar>{formData.name[0]}</UserAvatar>
          
          <FormGrid>
            <FormGroup>
              <Label>
                氏名<Required>*</Required>
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>
                メールアドレス<Required>*</Required>
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>
                権限<Required>*</Required>
              </Label>
              <Select 
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="admin">システム管理者</option>
                <option value="manager">運営管理者</option>
                <option value="user">一般利用者</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>ステータス</Label>
              <Select 
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">アクティブ</option>
                <option value="inactive">非アクティブ</option>
                <option value="locked">ロック中</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>部署</Label>
              <Input
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>社員番号</Label>
              <Input
                value={formData.employee_id}
                onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>電話番号</Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </FormGroup>
          </FormGrid>
        </Section>

        <Section>
          <SectionTitle>詳細権限設定</SectionTitle>
          <PermissionGrid>
            <PermissionSection>
              <PermissionTitle>会場管理</PermissionTitle>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.permissions.venue.includes('view')} />
                閲覧
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.permissions.venue.includes('edit')} />
                編集
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.permissions.venue.includes('create')} />
                作成
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.permissions.venue.includes('delete')} />
                削除
              </CheckboxLabel>
            </PermissionSection>
            
            <PermissionSection>
              <PermissionTitle>予約管理</PermissionTitle>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.permissions.reservation.includes('view')} />
                閲覧
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.permissions.reservation.includes('edit')} />
                編集
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.permissions.reservation.includes('create')} />
                作成
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.permissions.reservation.includes('delete')} />
                削除
              </CheckboxLabel>
            </PermissionSection>
            
            <PermissionSection>
              <PermissionTitle>ユーザー管理</PermissionTitle>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.permissions.user.includes('view')} />
                閲覧
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.permissions.user.includes('edit')} />
                編集
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.permissions.user.includes('create')} />
                作成
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.permissions.user.includes('delete')} />
                削除
              </CheckboxLabel>
            </PermissionSection>
            
            <PermissionSection>
              <PermissionTitle>レポート</PermissionTitle>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.permissions.report.includes('view')} />
                閲覧
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" checked={formData.permissions.report.includes('export')} />
                エクスポート
              </CheckboxLabel>
            </PermissionSection>
          </PermissionGrid>
        </Section>

        <Section>
          <SectionTitle>通知設定</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
            <CheckboxLabel>
              <input 
                type="checkbox" 
                checked={formData.notifications.email}
                onChange={(e) => setFormData({ ...formData, notifications: { ...formData.notifications, email: e.target.checked }})}
              />
              メール通知を受け取る
            </CheckboxLabel>
            <CheckboxLabel>
              <input 
                type="checkbox" 
                checked={formData.notifications.reservation}
                onChange={(e) => setFormData({ ...formData, notifications: { ...formData.notifications, reservation: e.target.checked }})}
              />
              予約関連の通知
            </CheckboxLabel>
            <CheckboxLabel>
              <input 
                type="checkbox" 
                checked={formData.notifications.system}
                onChange={(e) => setFormData({ ...formData, notifications: { ...formData.notifications, system: e.target.checked }})}
              />
              システム通知
            </CheckboxLabel>
            <CheckboxLabel>
              <input 
                type="checkbox" 
                checked={formData.notifications.report}
                onChange={(e) => setFormData({ ...formData, notifications: { ...formData.notifications, report: e.target.checked }})}
              />
              レポート通知
            </CheckboxLabel>
          </div>
        </Section>

        <Section>
          <SectionTitle>最近のアクティビティ</SectionTitle>
          <ActivityLog>
            {activityLog.map((log, index) => (
              <ActivityItem key={index}>
                <Text size="sm">{log.action}</Text>
                <Text size="sm" style={{ color: theme.colors.neutral[600] }}>
                  {log.date}
                </Text>
              </ActivityItem>
            ))}
          </ActivityLog>
        </Section>

        <Section>
          <SectionTitle>パスワード管理</SectionTitle>
          <div style={{ display: 'flex', gap: theme.spacing.md }}>
            <Button variant="outline" onClick={handlePasswordReset}>
              パスワードリセットメールを送信
            </Button>
            <Button variant="outline">
              二要素認証を設定
            </Button>
          </div>
        </Section>

        <ButtonGroup>
          <Button variant="primary" type="submit" size="large">
            更新する
          </Button>
          <Button variant="outline" onClick={onBack} size="large">
            キャンセル
          </Button>
        </ButtonGroup>

        <DangerZone>
          <Text size="lg" weight="semibold" style={{ color: theme.colors.error, marginBottom: theme.spacing.md }}>
            危険な操作
          </Text>
          <div style={{ display: 'flex', gap: theme.spacing.md }}>
            <Button 
              variant="outline" 
              onClick={handleAccountLock}
              style={{ borderColor: theme.colors.error, color: theme.colors.error }}
            >
              アカウントをロック
            </Button>
            <Button 
              variant="outline" 
              onClick={handleAccountDelete}
              style={{ borderColor: theme.colors.error, color: theme.colors.error }}
            >
              アカウントを削除
            </Button>
          </div>
        </DangerZone>
      </Form>
    </Container>
  );
};