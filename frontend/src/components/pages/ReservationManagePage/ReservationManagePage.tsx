import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Text, Card, Badge, Input } from '../../atoms';
import { theme } from '../../../styles/theme';

const Container = styled.div`
  max-width: 1200px;
`;

const FilterSection = styled(Card)`
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const FilterRow = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.neutral[300]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.md};
  background: ${theme.colors.neutral[0]};
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
  }
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
  border-bottom: 2px solid ${theme.colors.neutral[200]};
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  &:hover {
    background: ${theme.colors.neutral[50]};
  }
`;

const Td = styled.td`
  padding: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.neutral[200]};
  color: ${theme.colors.neutral[700]};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
`;

const StatusBadge = styled(Badge)<{ status: string }>`
  background: ${props => 
    props.status === '確定' ? theme.colors.success :
    props.status === '仮予約' ? theme.colors.warning :
    props.status === 'キャンセル' ? theme.colors.error :
    theme.colors.neutral[400]
  };
  color: ${theme.colors.neutral[0]};
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

const ModalHeader = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const ModalBody = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const ModalFooter = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
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

export const ReservationManagePage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [changeReason, setChangeReason] = useState('');
  const [newStatus, setNewStatus] = useState('');

  // モックデータ
  const reservations = [
    {
      id: 1,
      venueName: 'NOCプラザ',
      status: '仮予約',
      candidateDates: '2025/01/15, 2025/01/22',
      contactPerson: '山田太郎',
      memo: '防災研修（50名）',
      deadline: '2024/12/31',
    },
    {
      id: 2,
      venueName: 'ホテルニューキャッスル',
      status: '確定',
      candidateDates: '2025/02/10',
      contactPerson: '鈴木花子',
      memo: '年次総会（100名）',
      deadline: '-',
    },
    {
      id: 3,
      venueName: 'じばさんプラザ',
      status: '仮予約',
      candidateDates: '2025/01/28, 2025/02/05',
      contactPerson: '佐藤次郎',
      memo: '防災訓練（30名）',
      deadline: '2025/01/10',
    },
  ];

  const handleStatusChange = (reservation: any) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleModalSubmit = () => {
    alert(`ステータスを ${newStatus} に変更しました`);
    setIsModalOpen(false);
    setChangeReason('');
    setNewStatus('');
  };

  return (
    <Container>
      <FilterSection>
        <FilterRow>
          <div>
            <Label>進捗状況</Label>
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">すべて</option>
              <option value="provisional">仮予約</option>
              <option value="confirmed">確定</option>
              <option value="cancelled">キャンセル</option>
            </Select>
          </div>
          <div>
            <Label>期間</Label>
            <Select value={filterPeriod} onChange={(e) => setFilterPeriod(e.target.value)}>
              <option value="all">すべて</option>
              <option value="thisMonth">今月</option>
              <option value="nextMonth">来月</option>
              <option value="next3Months">3ヶ月以内</option>
            </Select>
          </div>
          <div>
            <Label>地域</Label>
            <Select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
              <option value="all">すべて</option>
              <option value="niigata">新潟県</option>
              <option value="tokyo">東京都</option>
              <option value="osaka">大阪府</option>
            </Select>
          </div>
          <Button variant="primary">絞り込み</Button>
        </FilterRow>
      </FilterSection>

      <Table>
        <Thead>
          <Tr>
            <Th>施設名</Th>
            <Th>予約状況</Th>
            <Th>候補日</Th>
            <Th>担当者</Th>
            <Th>メモ</Th>
            <Th>期限</Th>
            <Th>アクション</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reservations.map((reservation) => (
            <Tr key={reservation.id}>
              <Td>
                <Text weight="medium">{reservation.venueName}</Text>
              </Td>
              <Td>
                <StatusBadge status={reservation.status}>
                  {reservation.status}
                </StatusBadge>
              </Td>
              <Td>{reservation.candidateDates}</Td>
              <Td>{reservation.contactPerson}</Td>
              <Td>{reservation.memo}</Td>
              <Td>
                {reservation.deadline !== '-' && (
                  <Text color={theme.colors.error} size="sm">
                    {reservation.deadline}
                  </Text>
                )}
              </Td>
              <Td>
                <ActionButtons>
                  <Button
                    size="small"
                    variant="outline"
                    onClick={() => handleStatusChange(reservation)}
                  >
                    ステータス変更
                  </Button>
                  <Button size="small" variant="text">
                    詳細
                  </Button>
                </ActionButtons>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <Text size="lg" weight="bold">ステータス変更</Text>
            {selectedReservation && (
              <Text size="md" color={theme.colors.neutral[600]}>
                {selectedReservation.venueName}
              </Text>
            )}
          </ModalHeader>
          
          <ModalBody>
            <FormGroup>
              <Label>新しいステータス</Label>
              <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="">選択してください</option>
                <option value="confirmed">確定</option>
                <option value="provisional">仮予約</option>
                <option value="cancelled">キャンセル</option>
                <option value="pending">保留</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>変更理由</Label>
              <TextArea
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
                placeholder="変更理由を入力してください"
              />
            </FormGroup>
            
            <FormGroup>
              <input type="checkbox" id="sendNotification" />
              <label htmlFor="sendNotification" style={{ marginLeft: '8px' }}>
                担当者に通知を送信
              </label>
            </FormGroup>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              キャンセル
            </Button>
            <Button variant="primary" onClick={handleModalSubmit}>
              変更
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};