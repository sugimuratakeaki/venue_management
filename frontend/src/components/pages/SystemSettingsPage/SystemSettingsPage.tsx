import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Text, Card, Input } from '../../atoms';
import { theme } from '../../../styles/theme';

const Container = styled.div`
  max-width: 1000px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  background: ${theme.colors.neutral[100]};
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.xl};
`;

const Tab = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  background: ${props => props.active ? theme.colors.neutral[0] : 'transparent'};
  color: ${props => props.active ? theme.colors.primary[600] : theme.colors.neutral[600]};
  font-weight: ${props => props.active ? theme.fontWeight.medium : theme.fontWeight.regular};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.active ? theme.colors.neutral[0] : theme.colors.neutral[200]};
  }
`;

const SettingSection = styled(Card)`
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
`;

const SectionTitle = styled.div`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 2px solid ${theme.colors.neutral[200]};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.neutral[700]};
  margin-bottom: ${theme.spacing.xs};
`;

const HelpText = styled.div`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.neutral[600]};
  margin-top: ${theme.spacing.xs};
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

const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.neutral[300]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.md};
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
  }
`;

const FileInput = styled.div`
  padding: ${theme.spacing.lg};
  border: 2px dashed ${theme.colors.neutral[300]};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
  cursor: pointer;
  
  &:hover {
    border-color: ${theme.colors.primary[500]};
    background: ${theme.colors.primary[50]};
  }
`;

const BackupTable = styled.table`
  width: 100%;
  margin-top: ${theme.spacing.lg};
`;

const Th = styled.th`
  padding: ${theme.spacing.sm};
  text-align: left;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.neutral[700]};
  border-bottom: 1px solid ${theme.colors.neutral[300]};
`;

const Td = styled.td`
  padding: ${theme.spacing.sm};
  color: ${theme.colors.neutral[700]};
  border-bottom: 1px solid ${theme.colors.neutral[200]};
`;

const MasterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const MasterItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md};
  background: ${theme.colors.neutral[50]};
  border-radius: ${theme.borderRadius.sm};
`;

const SaveButton = styled(Button)`
  position: sticky;
  bottom: ${theme.spacing.lg};
  float: right;
`;

export const SystemSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const backupHistory = [
    { date: '2025/01/07 03:00', type: '自動', size: '125MB', status: '成功' },
    { date: '2025/01/06 03:00', type: '自動', size: '124MB', status: '成功' },
    { date: '2025/01/05 15:30', type: '手動', size: '123MB', status: '成功' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <SettingSection>
            <SectionTitle>基本設定</SectionTitle>
            <FormGroup>
              <Label>システム名</Label>
              <Input defaultValue="防災士研修センター 会場管理システム" />
              <HelpText>ログイン画面やヘッダーに表示される名称です</HelpText>
            </FormGroup>
            
            <FormGroup>
              <Label>ロゴ画像</Label>
              <FileInput>
                <Text size="sm" style={{ color: theme.colors.neutral[600] }}>
                  クリックしてファイルを選択<br />
                  またはドラッグ&ドロップ
                </Text>
              </FileInput>
              <HelpText>推奨サイズ: 200x50px、形式: PNG/JPG</HelpText>
            </FormGroup>
            
            <FormGroup>
              <Label>タイムゾーン</Label>
              <Select defaultValue="Asia/Tokyo">
                <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York (EST)</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>言語</Label>
              <Select defaultValue="ja">
                <option value="ja">日本語</option>
                <option value="en">English</option>
              </Select>
            </FormGroup>
          </SettingSection>
        );
      
      case 'security':
        return (
          <SettingSection>
            <SectionTitle>セキュリティ設定</SectionTitle>
            <FormGroup>
              <Label>パスワードポリシー</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label>
                  <input type="checkbox" defaultChecked /> 最小文字数: 
                  <Input type="number" defaultValue="8" style={{ width: '60px', marginLeft: '8px' }} />
                </label>
                <label>
                  <input type="checkbox" defaultChecked /> 大文字を含む
                </label>
                <label>
                  <input type="checkbox" defaultChecked /> 小文字を含む
                </label>
                <label>
                  <input type="checkbox" defaultChecked /> 数字を含む
                </label>
                <label>
                  <input type="checkbox" /> 特殊文字を含む
                </label>
              </div>
            </FormGroup>
            
            <FormGroup>
              <Label>セッションタイムアウト（分）</Label>
              <Input type="number" defaultValue="30" style={{ width: '100px' }} />
              <HelpText>無操作時に自動ログアウトするまでの時間</HelpText>
            </FormGroup>
            
            <FormGroup>
              <Label>ログイン試行回数制限</Label>
              <Input type="number" defaultValue="5" style={{ width: '100px' }} />
              <HelpText>この回数を超えるとアカウントがロックされます</HelpText>
            </FormGroup>
            
            <FormGroup>
              <Label>二要素認証</Label>
              <Select>
                <option value="disabled">無効</option>
                <option value="optional">オプション</option>
                <option value="required">必須</option>
              </Select>
            </FormGroup>
          </SettingSection>
        );
      
      case 'notification':
        return (
          <SettingSection>
            <SectionTitle>通知設定</SectionTitle>
            <FormGroup>
              <Label>メールサーバー設定</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Input placeholder="SMTPホスト" defaultValue="smtp.gmail.com" />
                <Input placeholder="ポート" type="number" defaultValue="587" style={{ width: '100px' }} />
                <Input placeholder="ユーザー名" defaultValue="noreply@example.com" />
                <Input placeholder="パスワード" type="password" />
              </div>
            </FormGroup>
            
            <FormGroup>
              <Label>通知テンプレート - 予約確定</Label>
              <TextArea defaultValue="[会場名]の予約が確定しました。&#10;日時: [予約日時]&#10;担当者: [担当者名]" />
            </FormGroup>
            
            <FormGroup>
              <Label>通知テンプレート - パスワードリセット</Label>
              <TextArea defaultValue="パスワードリセットのリクエストを受け付けました。&#10;以下のリンクからパスワードをリセットしてください。&#10;[リセットリンク]" />
            </FormGroup>
            
            <FormGroup>
              <Label>デフォルト通知先</Label>
              <Input type="email" placeholder="admin@example.com" />
              <HelpText>システム通知のデフォルト送信先</HelpText>
            </FormGroup>
          </SettingSection>
        );
      
      case 'backup':
        return (
          <SettingSection>
            <SectionTitle>バックアップ設定</SectionTitle>
            <FormGroup>
              <Label>自動バックアップ</Label>
              <Select defaultValue="daily">
                <option value="disabled">無効</option>
                <option value="daily">毎日</option>
                <option value="weekly">毎週</option>
                <option value="monthly">毎月</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>バックアップ時刻</Label>
              <Input type="time" defaultValue="03:00" style={{ width: '150px' }} />
            </FormGroup>
            
            <FormGroup>
              <Label>保存期間（日）</Label>
              <Input type="number" defaultValue="30" style={{ width: '100px' }} />
              <HelpText>この期間を過ぎたバックアップは自動削除されます</HelpText>
            </FormGroup>
            
            <FormGroup>
              <Label>バックアップ履歴</Label>
              <BackupTable>
                <thead>
                  <tr>
                    <Th>日時</Th>
                    <Th>種別</Th>
                    <Th>サイズ</Th>
                    <Th>ステータス</Th>
                    <Th>アクション</Th>
                  </tr>
                </thead>
                <tbody>
                  {backupHistory.map((backup, index) => (
                    <tr key={index}>
                      <Td>{backup.date}</Td>
                      <Td>{backup.type}</Td>
                      <Td>{backup.size}</Td>
                      <Td>{backup.status}</Td>
                      <Td>
                        <Button size="small" variant="text">リストア</Button>
                        <Button size="small" variant="text">ダウンロード</Button>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </BackupTable>
            </FormGroup>
            
            <Button variant="primary">今すぐバックアップ</Button>
          </SettingSection>
        );
      
      case 'master':
        return (
          <SettingSection>
            <SectionTitle>マスタ管理</SectionTitle>
            <FormGroup>
              <Label>都道府県マスタ</Label>
              <MasterList>
                {['北海道', '青森県', '岩手県', '宮城県', '秋田県'].map(pref => (
                  <MasterItem key={pref}>
                    <Text size="sm">{pref}</Text>
                    <Button size="small" variant="text">編集</Button>
                  </MasterItem>
                ))}
              </MasterList>
              <Button size="small" variant="outline" style={{ marginTop: '8px' }}>
                すべて表示
              </Button>
            </FormGroup>
            
            <FormGroup>
              <Label>設備マスタ</Label>
              <MasterList>
                {['プロジェクター', 'ホワイトボード', 'スクリーン', 'マイク', 'Wi-Fi'].map(item => (
                  <MasterItem key={item}>
                    <Text size="sm">{item}</Text>
                    <div>
                      <Button size="small" variant="text">編集</Button>
                      <Button size="small" variant="text" style={{ color: theme.colors.error }}>
                        削除
                      </Button>
                    </div>
                  </MasterItem>
                ))}
              </MasterList>
              <Button size="small" variant="outline" style={{ marginTop: '8px' }}>
                新規追加
              </Button>
            </FormGroup>
            
            <FormGroup>
              <Label>ステータスマスタ</Label>
              <MasterList>
                {['仮予約', '確定', 'キャンセル', '保留'].map(status => (
                  <MasterItem key={status}>
                    <Text size="sm">{status}</Text>
                    <Button size="small" variant="text">編集</Button>
                  </MasterItem>
                ))}
              </MasterList>
            </FormGroup>
          </SettingSection>
        );
      
      default:
        return null;
    }
  };

  return (
    <Container>
      <TabContainer>
        <Tab active={activeTab === 'basic'} onClick={() => setActiveTab('basic')}>
          基本設定
        </Tab>
        <Tab active={activeTab === 'security'} onClick={() => setActiveTab('security')}>
          セキュリティ
        </Tab>
        <Tab active={activeTab === 'notification'} onClick={() => setActiveTab('notification')}>
          通知
        </Tab>
        <Tab active={activeTab === 'backup'} onClick={() => setActiveTab('backup')}>
          バックアップ
        </Tab>
        <Tab active={activeTab === 'master'} onClick={() => setActiveTab('master')}>
          マスタ管理
        </Tab>
      </TabContainer>

      {renderTabContent()}

      <SaveButton variant="primary" size="large">
        設定を保存
      </SaveButton>
    </Container>
  );
};