import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Text, Card, Badge, Input } from '../../atoms';
import { theme } from '../../../styles/theme';

const Container = styled.div`
  max-width: 1200px;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
`;

const SearchSection = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const Table = styled.table`
  width: 100%;
  background: ${theme.colors.neutral[0]};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
`;

const Thead = styled.thead`
  background: ${theme.colors.neutral[100]};
`;

const Th = styled.th`
  padding: ${theme.spacing.md};
  text-align: left;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.neutral[700]};
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid ${theme.colors.neutral[200]};
  
  &:hover {
    background: ${theme.colors.neutral[50]};
  }
`;

const Td = styled.td`
  padding: ${theme.spacing.md};
  color: ${theme.colors.neutral[700]};
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.primary[500]};
  color: ${theme.colors.neutral[0]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.fontWeight.semibold};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const StatusBadge = styled(Badge)<{ status: string }>`
  background: ${props => 
    props.status === 'active' ? theme.colors.success :
    props.status === 'inactive' ? theme.colors.neutral[400] :
    theme.colors.error
  };
  color: ${theme.colors.neutral[0]};
`;

const RoleBadge = styled(Badge)<{ role: string }>`
  background: ${props => 
    props.role === 'admin' ? theme.colors.primary[600] :
    props.role === 'manager' ? theme.colors.secondary[600] :
    theme.colors.neutral[500]
  };
  color: ${theme.colors.neutral[0]};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
`;

const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${theme.colors.neutral[0]};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  max-width: 500px;
  width: 90%;
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.neutral[700]};
  margin-bottom: ${theme.spacing.xs};
`;

const Select = styled.select`
  width: 100%;
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

export const UserManagePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    {
      id: 1,
      name: '山田太郎',
      email: 'yamada@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2025/01/07 10:30',
    },
    {
      id: 2,
      name: '鈴木花子',
      email: 'suzuki@example.com',
      role: 'manager',
      status: 'active',
      lastLogin: '2025/01/07 09:15',
    },
    {
      id: 3,
      name: '佐藤次郎',
      email: 'sato@example.com',
      role: 'user',
      status: 'inactive',
      lastLogin: '2024/12/25 14:20',
    },
    {
      id: 4,
      name: '田中美咲',
      email: 'tanaka@example.com',
      role: 'manager',
      status: 'active',
      lastLogin: '2025/01/06 16:45',
    },
  ];

  const roleLabels: { [key: string]: string } = {
    admin: 'システム管理者',
    manager: '運営管理者',
    user: '一般利用者',
  };

  const statusLabels: { [key: string]: string } = {
    active: 'アクティブ',
    inactive: '非アクティブ',
    locked: 'ロック中',
  };

  return (
    <Container>
      <ActionBar>
        <SearchSection>
          <Input
            placeholder="ユーザー名・メールアドレスで検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '300px' }}
          />
          <Button variant="outline">検索</Button>
        </SearchSection>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          新規ユーザー登録
        </Button>
      </ActionBar>

      <Table>
        <Thead>
          <Tr>
            <Th>ユーザー</Th>
            <Th>メールアドレス</Th>
            <Th>権限</Th>
            <Th>ステータス</Th>
            <Th>最終ログイン</Th>
            <Th>アクション</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <Tr key={user.id}>
              <Td>
                <UserInfo>
                  <UserAvatar>{user.name[0]}</UserAvatar>
                  <Text weight="medium">{user.name}</Text>
                </UserInfo>
              </Td>
              <Td>{user.email}</Td>
              <Td>
                <RoleBadge role={user.role}>
                  {roleLabels[user.role]}
                </RoleBadge>
              </Td>
              <Td>
                <StatusBadge status={user.status}>
                  {statusLabels[user.status]}
                </StatusBadge>
              </Td>
              <Td>{user.lastLogin}</Td>
              <Td>
                <ActionButtons>
                  <Button size="small" variant="text">編集</Button>
                  <Button size="small" variant="text">権限変更</Button>
                  <Button size="small" variant="text" style={{ color: theme.colors.error }}>
                    削除
                  </Button>
                </ActionButtons>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <Text size="lg" weight="bold" style={{ marginBottom: theme.spacing.lg }}>
            新規ユーザー登録
          </Text>
          
          <FormGroup>
            <Label>氏名 *</Label>
            <Input placeholder="例: 山田太郎" />
          </FormGroup>
          
          <FormGroup>
            <Label>メールアドレス *</Label>
            <Input type="email" placeholder="email@example.com" />
          </FormGroup>
          
          <FormGroup>
            <Label>権限 *</Label>
            <Select>
              <option value="">選択してください</option>
              <option value="admin">システム管理者</option>
              <option value="manager">運営管理者</option>
              <option value="user">一般利用者</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>初期パスワード *</Label>
            <Input type="password" placeholder="8文字以上" />
          </FormGroup>
          
          <FormGroup>
            <Label>通知設定</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label>
                <input type="checkbox" /> システム通知を受け取る
              </label>
              <label>
                <input type="checkbox" /> 予約通知を受け取る
              </label>
              <label>
                <input type="checkbox" /> レポート通知を受け取る
              </label>
            </div>
          </FormGroup>
          
          <div style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              キャンセル
            </Button>
            <Button variant="primary" onClick={() => {
              alert('ユーザーを登録しました');
              setIsModalOpen(false);
            }}>
              登録
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </Container>
  );
};