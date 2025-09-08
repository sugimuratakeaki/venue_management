import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Card, Text, Badge } from '../../atoms';
import { theme } from '../../../styles/theme';

const Container = styled.div`
  max-width: 1000px;
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

const TextArea = styled.textarea`
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

const StatusSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const StatusBadge = styled(Badge)<{ status: string }>`
  background: ${props => 
    props.status === 'confirmed' ? theme.colors.success :
    props.status === 'provisional' ? theme.colors.warning :
    props.status === 'cancelled' ? theme.colors.error :
    theme.colors.neutral[400]
  };
  color: ${theme.colors.neutral[0]};
`;

const TimelineSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const TimelineItem = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: flex-start;
`;

const TimelineDot = styled.div<{ active?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: ${theme.borderRadius.full};
  background: ${props => props.active ? theme.colors.primary[500] : theme.colors.neutral[300]};
  margin-top: 4px;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const AttachmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const AttachmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.neutral[50]};
  border-radius: ${theme.borderRadius.sm};
`;

const NotificationSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  cursor: pointer;
`;

interface ReservationEditPageProps {
  reservationId?: number;
  onBack?: () => void;
}

export const ReservationEditPage: React.FC<ReservationEditPageProps> = ({ reservationId, onBack }) => {
  const [formData, setFormData] = useState({
    venue_name: 'NOCプラザ',
    room_name: '大会議室',
    date: '2025-01-15',
    start_time: '13:00',
    end_time: '17:00',
    purpose: '防災士研修',
    organizer_name: '防災士研修センター',
    organizer_contact: '山田太郎',
    organizer_email: 'yamada@example.com',
    organizer_phone: '090-1234-5678',
    participants: '50',
    status: 'provisional',
    equipment: ['projector', 'whiteboard', 'microphone'],
    catering: true,
    special_requests: '参加者用の駐車場を20台分確保希望',
    internal_memo: '前回同様の配置で準備',
    price: '30,000',
    payment_status: 'pending',
    payment_method: 'invoice',
  });

  const [timeline] = useState([
    { date: '2025/01/05 10:30', action: '予約申請', user: '山田太郎', active: true },
    { date: '2025/01/06 14:00', action: '仮予約承認', user: '管理者', active: true },
    { date: '2025/01/10', action: '確定予定', user: '-', active: false },
  ]);

  const [attachments] = useState([
    { name: '申請書.pdf', size: '256KB', date: '2025/01/05' },
    { name: '参加者名簿.xlsx', size: '45KB', date: '2025/01/06' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('予約情報を更新しました');
  };

  const handleStatusChange = (newStatus: string) => {
    setFormData({ ...formData, status: newStatus });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Section>
          <StatusSection>
            <SectionTitle>予約情報</SectionTitle>
            <StatusBadge status={formData.status}>
              {formData.status === 'confirmed' ? '確定' :
               formData.status === 'provisional' ? '仮予約' :
               formData.status === 'cancelled' ? 'キャンセル' : '保留'}
            </StatusBadge>
          </StatusSection>
          
          <FormGrid>
            <FormGroup>
              <Label>
                会場<Required>*</Required>
              </Label>
              <Select 
                value={formData.venue_name}
                onChange={(e) => setFormData({ ...formData, venue_name: e.target.value })}
              >
                <option value="NOCプラザ">NOCプラザ</option>
                <option value="ホテルニューキャッスル">ホテルニューキャッスル</option>
                <option value="じばさんプラザ">じばさんプラザ</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>
                部屋<Required>*</Required>
              </Label>
              <Select 
                value={formData.room_name}
                onChange={(e) => setFormData({ ...formData, room_name: e.target.value })}
              >
                <option value="大会議室">大会議室</option>
                <option value="中会議室">中会議室</option>
                <option value="小会議室">小会議室</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>
                利用日<Required>*</Required>
              </Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>
                利用時間<Required>*</Required>
              </Label>
              <div style={{ display: 'flex', gap: theme.spacing.sm, alignItems: 'center' }}>
                <Input
                  type="time"
                  value={formData.start_time}
                  onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                />
                <span>〜</span>
                <Input
                  type="time"
                  value={formData.end_time}
                  onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                />
              </div>
            </FormGroup>
            
            <FormGroup style={{ gridColumn: 'span 2' }}>
              <Label>
                利用目的<Required>*</Required>
              </Label>
              <Input
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              />
            </FormGroup>
          </FormGrid>
        </Section>

        <Section>
          <SectionTitle>申込者情報</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>
                団体名<Required>*</Required>
              </Label>
              <Input
                value={formData.organizer_name}
                onChange={(e) => setFormData({ ...formData, organizer_name: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>
                担当者名<Required>*</Required>
              </Label>
              <Input
                value={formData.organizer_contact}
                onChange={(e) => setFormData({ ...formData, organizer_contact: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>
                メールアドレス<Required>*</Required>
              </Label>
              <Input
                type="email"
                value={formData.organizer_email}
                onChange={(e) => setFormData({ ...formData, organizer_email: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>
                電話番号<Required>*</Required>
              </Label>
              <Input
                type="tel"
                value={formData.organizer_phone}
                onChange={(e) => setFormData({ ...formData, organizer_phone: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>参加人数</Label>
              <Input
                type="number"
                value={formData.participants}
                onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
              />
            </FormGroup>
          </FormGrid>
        </Section>

        <Section>
          <SectionTitle>利用設備・オプション</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: theme.spacing.md }}>
            <CheckboxLabel>
              <input 
                type="checkbox" 
                checked={formData.equipment.includes('projector')}
              />
              プロジェクター
            </CheckboxLabel>
            <CheckboxLabel>
              <input 
                type="checkbox" 
                checked={formData.equipment.includes('whiteboard')}
              />
              ホワイトボード
            </CheckboxLabel>
            <CheckboxLabel>
              <input 
                type="checkbox" 
                checked={formData.equipment.includes('microphone')}
              />
              マイク
            </CheckboxLabel>
            <CheckboxLabel>
              <input 
                type="checkbox" 
                checked={formData.catering}
              />
              ケータリング
            </CheckboxLabel>
          </div>
          
          <FormGroup style={{ marginTop: theme.spacing.md }}>
            <Label>特別要望</Label>
            <TextArea
              value={formData.special_requests}
              onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
            />
          </FormGroup>
        </Section>

        <Section>
          <SectionTitle>料金・支払い</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>料金</Label>
              <Input
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>支払い方法</Label>
              <Select 
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
              >
                <option value="invoice">請求書</option>
                <option value="bank_transfer">銀行振込</option>
                <option value="credit_card">クレジットカード</option>
                <option value="cash">現金</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>支払いステータス</Label>
              <Select 
                value={formData.payment_status}
                onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
              >
                <option value="pending">未払い</option>
                <option value="paid">支払済</option>
                <option value="partial">一部支払済</option>
              </Select>
            </FormGroup>
          </FormGrid>
        </Section>

        <Section>
          <SectionTitle>内部メモ</SectionTitle>
          <TextArea
            value={formData.internal_memo}
            onChange={(e) => setFormData({ ...formData, internal_memo: e.target.value })}
            placeholder="スタッフ間での共有事項を記入"
          />
        </Section>

        <Section>
          <SectionTitle>添付ファイル</SectionTitle>
          <AttachmentList>
            {attachments.map((file, index) => (
              <AttachmentItem key={index}>
                <div>
                  <Text size="sm">{file.name}</Text>
                  <Text size="xs" style={{ color: theme.colors.neutral[600] }}>
                    {file.size} - {file.date}
                  </Text>
                </div>
                <div>
                  <Button variant="text" size="small">ダウンロード</Button>
                  <Button variant="text" size="small">削除</Button>
                </div>
              </AttachmentItem>
            ))}
            <Button variant="outline" size="small">ファイルを追加</Button>
          </AttachmentList>
        </Section>

        <Section>
          <SectionTitle>ステータス変更</SectionTitle>
          <TimelineSection>
            {timeline.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineDot active={item.active} />
                <TimelineContent>
                  <Text size="sm" weight="medium">{item.action}</Text>
                  <Text size="xs" style={{ color: theme.colors.neutral[600] }}>
                    {item.date} - {item.user}
                  </Text>
                </TimelineContent>
              </TimelineItem>
            ))}
          </TimelineSection>
          
          <div style={{ marginTop: theme.spacing.lg, display: 'flex', gap: theme.spacing.md }}>
            <Button 
              variant="primary" 
              onClick={() => handleStatusChange('confirmed')}
              disabled={formData.status === 'confirmed'}
            >
              確定する
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleStatusChange('provisional')}
              disabled={formData.status === 'provisional'}
            >
              仮予約に戻す
            </Button>
            <Button 
              variant="outline" 
              style={{ color: theme.colors.error }}
              onClick={() => handleStatusChange('cancelled')}
              disabled={formData.status === 'cancelled'}
            >
              キャンセル
            </Button>
          </div>
        </Section>

        <Section>
          <SectionTitle>通知設定</SectionTitle>
          <NotificationSettings>
            <CheckboxLabel>
              <input type="checkbox" defaultChecked />
              申込者にステータス変更を通知
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" defaultChecked />
              管理者に変更を通知
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" />
              リマインダーを送信（利用日3日前）
            </CheckboxLabel>
          </NotificationSettings>
        </Section>

        <ButtonGroup>
          <Button variant="primary" type="submit" size="large">
            更新する
          </Button>
          <Button variant="outline" onClick={onBack} size="large">
            キャンセル
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};