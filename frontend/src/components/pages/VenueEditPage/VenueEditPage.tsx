import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Card, Text } from '../../atoms';
import { theme } from '../../../styles/theme';

const Container = styled.div`
  max-width: 1200px;
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

const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const RoomItem = styled.div`
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.neutral[50]};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.neutral[200]};
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.neutral[200]};
`;

const RoomTitle = styled.h4`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.neutral[800]};
  margin: 0;
`;

const RoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const RoomInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const RoomLabel = styled.label`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.neutral[600]};
`;

const ControlRoomSection = styled.div`
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.neutral[100]};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.neutral[300]};
`;

const ControlRoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const ControlRoomItem = styled.div`
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.neutral[0]};
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid ${theme.colors.neutral[200]};
`;

const ControlRoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
`;

const ControlRoomTitle = styled.h5`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.neutral[700]};
  margin: 0;
`;

const StationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const StationItem = styled.div`
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.neutral[50]};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.neutral[200]};
`;

const StationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.neutral[200]};
`;

const StationTitle = styled.h4`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.neutral[800]};
  margin: 0;
`;

const StationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.sm};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${theme.spacing.xl};
`;

const StatusBadge = styled.div<{ status: string }>`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${props => 
    props.status === 'active' ? theme.colors.success :
    props.status === 'inactive' ? theme.colors.neutral[400] :
    theme.colors.warning
  };
  color: ${theme.colors.neutral[0]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.sm};
`;

const ChangeHistory = styled.div`
  background: ${theme.colors.neutral[50]};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin-top: ${theme.spacing.md};
`;

const EquipmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: ${theme.spacing.lg};
`;

const EquipmentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.neutral[50]};
  border-radius: ${theme.borderRadius.md};
`;

const EquipmentLabel = styled.label`
  font-weight: 600;
  color: ${theme.colors.neutral[700]};
  font-size: ${theme.fontSize.sm};
`;

const TriStateSelector = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
`;

const TriStateOption = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: ${theme.spacing.sm};
  border: 2px solid ${props => props.selected ? theme.colors.primary[500] : theme.colors.neutral[300]};
  background-color: ${props => props.selected ? theme.colors.primary[50] : theme.colors.neutral[0]};
  color: ${props => props.selected ? theme.colors.primary[700] : theme.colors.neutral[600]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.sm};
  font-weight: ${props => props.selected ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary[400]};
    background-color: ${props => props.selected ? theme.colors.primary[100] : theme.colors.neutral[50]};
  }
`;

const NotesInput = styled.input`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.neutral[300]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.sm};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
  }
`;

interface VenueEditPageProps {
  venueId?: number;
  onBack?: () => void;
}

export const VenueEditPage: React.FC<VenueEditPageProps> = ({ venueId, onBack }) => {
  const [formData, setFormData] = useState({
    // 基本情報
    venue_no: 'V010',
    venue_name: 'NOCプラザ',
    prefecture: '新潟県',
    city: '新潟市',
    address: '新潟市中央区東堀通1-86-12',
    postal_code: '950-8756',
    phone: '025-234-5678',
    email: 'info@noc-plaza.jp',
    contact_person: '山田太郎',
    description: '新潟市の中心部に位置する多目的会議施設です。防災研修や各種セミナーに最適な設備を完備しています。',
    official_url: 'https://noc-plaza.jp',
    reservation_url: 'https://noc-plaza.jp/booking',
    google_map_url: 'https://maps.google.com/...',
    
    // 利用条件
    can_eat_drink: true,
    can_wear_shoes: false,
    is_earthquake_resistant: true,
    operating_hours: '9:00-21:00',
    can_receive_package: true,
    package_receiver: '管理事務所',
    
    // 部屋情報
    rooms: [
      { 
        name: '大会議室', 
        ceiling_height: '4.0',
        floor_area: '489',
        desk_count: '100',
        chair_count: '200',
        capacity: '200',
        control_rooms: [
          {
            name: '控室A',
            area: '40',
            desk_count: '10',
            chair_count: '20',
            capacity: '20',
            notes: '本体料金込み'
          },
          {
            name: '控室B',
            area: '25',
            desk_count: '5',
            chair_count: '10',
            capacity: '10',
            notes: '別途料金'
          }
        ]
      },
      { 
        name: '中会議室',
        ceiling_height: '3.0',
        floor_area: '164',
        desk_count: '50',
        chair_count: '100',
        capacity: '100',
        control_rooms: [
          {
            name: '控室203',
            area: '30',
            desk_count: '8',
            chair_count: '15',
            capacity: '15',
            notes: '203会議室利用可能'
          }
        ]
      },
    ],
    
    // 最寄り駅
    stations: [
      { 
        name: '新潟駅',
        line: 'JR信越本線',
        transport_method: 'タクシー',
        travel_time: '15',
        notes: '南口から5km'
      },
      { 
        name: '白山駅',
        line: 'JR越後線',
        transport_method: '徒歩',
        travel_time: '10',
        notes: ''
      },
    ],
    
    // 設備情報
    facilities: {
      podium: { status: 'yes', notes: '高さ調整可能' },
      whiteboard: { status: 'yes', notes: '3台利用可能' },
      screen: { status: 'yes', notes: '150インチ×2台' },
      mic_wireless: { status: 'yes', notes: 'ワイヤレス4本' },
      mic_wired: { status: 'yes', notes: '有線2本' },
      projector: { status: 'yes', notes: 'HDMI対応・2台' },
      projector_stand: { status: 'no', notes: '' },
      pointer: { status: 'unknown', notes: '要確認' },
      recording_equipment: { status: 'yes', notes: '録画機器あり' },
      livestream_equipment: { status: 'no', notes: '' },
      interpreter_booth: { status: 'unknown', notes: '' },
      sound_system: { status: 'yes', notes: '大型スピーカー完備' },
      lighting_control: { status: 'yes', notes: '調光可能' },
      air_conditioning: { status: 'yes', notes: '個別空調' },
      wifi: { status: 'yes', notes: '高速WiFi完備' },
    },
    
    // 料金情報
    fees: {
      main_venue_fee: '30000',
      control_room_fee: '5000',
      equipment_fee: '10000',
      electricity_fee: '5000',
      air_conditioner_fee: '3000',
      garbage_fee: '2000',
      meal_bring_fee: '0',
      estimated_total_fee: '55000',
      fee_notes: '土日祝日は20%増し',
    },
    
    // 駐車場情報
    parking: {
      capacity: '50',
      fee: '無料',
      is_free: true,
      nearby_info: '近隣にコインパーキング多数あり（1時間200円程度）',
    },
    
    // 利用条件・キャンセルポリシー
    conditions: {
      reservation_conditions: '利用日の3ヶ月前から予約可能。仮予約期間は2週間。',
      cancellation_policy: '利用日の30日前まで：無料\n29日前〜7日前：料金の30%\n6日前〜前日：料金の50%\n当日：料金の100%',
      payment_terms: '利用日の14日前までに全額支払い',
      advance_reservation_days: '90',
      cancellation_deadline_days: '30',
    },
    
    notes: '防災研修に最適な施設です。大規模な避難訓練も実施可能。',
    status: 'active',
  });

  const [changeHistory] = useState([
    { date: '2025/01/05 14:30', user: '山田太郎', field: '料金情報', oldValue: '25,000円/日', newValue: '30,000円/日' },
    { date: '2024/12/20 10:15', user: '鈴木花子', field: '設備', oldValue: '-', newValue: 'Wi-Fi追加' },
    { date: '2024/11/15 09:00', user: '佐藤次郎', field: 'ステータス', oldValue: '準備中', newValue: 'アクティブ' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('会場情報を更新しました');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {/* 基本情報 */}
        <Section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
            <SectionTitle>基本情報</SectionTitle>
            <StatusBadge status={formData.status}>
              {formData.status === 'active' ? 'アクティブ' : '非アクティブ'}
            </StatusBadge>
          </div>
          
          <FormGrid>
            <FormGroup>
              <Label>会場管理番号</Label>
              <Input value={formData.venue_no} readOnly />
            </FormGroup>
            
            <FormGroup>
              <Label>ステータス</Label>
              <Select 
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">アクティブ</option>
                <option value="inactive">非アクティブ</option>
                <option value="pending">準備中</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>
                会場名<Required>*</Required>
              </Label>
              <Input
                value={formData.venue_name}
                onChange={(e) => setFormData({ ...formData, venue_name: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>郵便番号</Label>
              <Input
                value={formData.postal_code}
                onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                placeholder="000-0000"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>
                都道府県<Required>*</Required>
              </Label>
              <Select 
                value={formData.prefecture}
                onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
              >
                <option value="新潟県">新潟県</option>
                <option value="東京都">東京都</option>
                <option value="大阪府">大阪府</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>
                市区町村<Required>*</Required>
              </Label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup style={{ gridColumn: 'span 2' }}>
              <Label>
                住所<Required>*</Required>
              </Label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>
                電話番号<Required>*</Required>
              </Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>メールアドレス</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>担当者名</Label>
              <Input
                value={formData.contact_person}
                onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>利用可能時間</Label>
              <Input
                value={formData.operating_hours}
                onChange={(e) => setFormData({ ...formData, operating_hours: e.target.value })}
                placeholder="例: 9:00-21:00"
              />
            </FormGroup>
            
            <FormGroup style={{ gridColumn: 'span 2' }}>
              <Label>説明</Label>
              <TextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </FormGroup>
          </FormGrid>
        </Section>

        {/* 利用条件 */}
        <Section>
          <SectionTitle>利用条件</SectionTitle>
          <FormGrid>
            <CheckboxLabel>
              <input 
                type="checkbox" 
                checked={formData.can_eat_drink}
                onChange={(e) => setFormData({ ...formData, can_eat_drink: e.target.checked })}
              />
              飲食可能
            </CheckboxLabel>
            
            <CheckboxLabel>
              <input 
                type="checkbox" 
                checked={formData.can_wear_shoes}
                onChange={(e) => setFormData({ ...formData, can_wear_shoes: e.target.checked })}
              />
              土足可能
            </CheckboxLabel>
            
            <CheckboxLabel>
              <input 
                type="checkbox" 
                checked={formData.is_earthquake_resistant}
                onChange={(e) => setFormData({ ...formData, is_earthquake_resistant: e.target.checked })}
              />
              耐震基準適合（1981年以降）
            </CheckboxLabel>
            
            <CheckboxLabel>
              <input 
                type="checkbox" 
                checked={formData.can_receive_package}
                onChange={(e) => setFormData({ ...formData, can_receive_package: e.target.checked })}
              />
              設営日荷物受取可能
            </CheckboxLabel>
            
            <FormGroup>
              <Label>荷物受取者/保管場所</Label>
              <Input
                value={formData.package_receiver}
                onChange={(e) => setFormData({ ...formData, package_receiver: e.target.value })}
                disabled={!formData.can_receive_package}
              />
            </FormGroup>
          </FormGrid>
        </Section>

        {/* 部屋情報 */}
        <Section>
          <SectionTitle>部屋情報</SectionTitle>
          <RoomList>
            {formData.rooms.map((room, index) => (
              <RoomItem key={index}>
                <RoomHeader>
                  <RoomTitle>部屋 {index + 1}</RoomTitle>
                  <Button variant="text" size="small" style={{ color: theme.colors.error }}>削除</Button>
                </RoomHeader>
                
                <RoomGrid>
                  <RoomInputGroup>
                    <RoomLabel>部屋名 *</RoomLabel>
                    <Input 
                      value={room.name} 
                      placeholder="例：大会議室"
                      onChange={(e) => {
                        const newRooms = [...formData.rooms];
                        newRooms[index].name = e.target.value;
                        setFormData({ ...formData, rooms: newRooms });
                      }}
                    />
                  </RoomInputGroup>
                  
                  <RoomInputGroup>
                    <RoomLabel>天井高（メートル）</RoomLabel>
                    <Input 
                      value={room.ceiling_height} 
                      placeholder="例：4.0"
                      type="number"
                      step="0.1"
                      onChange={(e) => {
                        const newRooms = [...formData.rooms];
                        newRooms[index].ceiling_height = e.target.value;
                        setFormData({ ...formData, rooms: newRooms });
                      }}
                    />
                  </RoomInputGroup>
                  
                  <RoomInputGroup>
                    <RoomLabel>面積（平方メートル）</RoomLabel>
                    <Input 
                      value={room.floor_area} 
                      placeholder="例：489"
                      type="number"
                      onChange={(e) => {
                        const newRooms = [...formData.rooms];
                        newRooms[index].floor_area = e.target.value;
                        setFormData({ ...formData, rooms: newRooms });
                      }}
                    />
                  </RoomInputGroup>
                  
                  <RoomInputGroup>
                    <RoomLabel>机数</RoomLabel>
                    <Input 
                      value={room.desk_count} 
                      placeholder="例：100"
                      type="number"
                      onChange={(e) => {
                        const newRooms = [...formData.rooms];
                        newRooms[index].desk_count = e.target.value;
                        setFormData({ ...formData, rooms: newRooms });
                      }}
                    />
                  </RoomInputGroup>
                  
                  <RoomInputGroup>
                    <RoomLabel>椅子数</RoomLabel>
                    <Input 
                      value={room.chair_count} 
                      placeholder="例：200"
                      type="number"
                      onChange={(e) => {
                        const newRooms = [...formData.rooms];
                        newRooms[index].chair_count = e.target.value;
                        setFormData({ ...formData, rooms: newRooms });
                      }}
                    />
                  </RoomInputGroup>
                  
                  <RoomInputGroup>
                    <RoomLabel>最大収容人数</RoomLabel>
                    <Input 
                      value={room.capacity} 
                      placeholder="例：200"
                      type="number"
                      onChange={(e) => {
                        const newRooms = [...formData.rooms];
                        newRooms[index].capacity = e.target.value;
                        setFormData({ ...formData, rooms: newRooms });
                      }}
                    />
                  </RoomInputGroup>
                </RoomGrid>
                
                {/* 控室情報 */}
                <ControlRoomSection>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h5 style={{ margin: 0, fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.medium }}>
                      控室情報
                    </h5>
                    <Button 
                      variant="outline" 
                      size="small"
                      onClick={() => {
                        const newRooms = [...formData.rooms];
                        if (!newRooms[index].control_rooms) {
                          newRooms[index].control_rooms = [];
                        }
                        newRooms[index].control_rooms.push({
                          name: '',
                          area: '',
                          desk_count: '',
                          chair_count: '',
                          capacity: '',
                          notes: ''
                        });
                        setFormData({ ...formData, rooms: newRooms });
                      }}
                    >
                      + 控室を追加
                    </Button>
                  </div>
                  
                  {room.control_rooms && room.control_rooms.length > 0 ? (
                    <ControlRoomList>
                      {room.control_rooms.map((controlRoom, controlIndex) => (
                        <ControlRoomItem key={controlIndex}>
                          <ControlRoomHeader>
                            <ControlRoomTitle>控室 {controlIndex + 1}</ControlRoomTitle>
                            <Button 
                              variant="text" 
                              size="small" 
                              style={{ color: theme.colors.error }}
                              onClick={() => {
                                const newRooms = [...formData.rooms];
                                newRooms[index].control_rooms.splice(controlIndex, 1);
                                setFormData({ ...formData, rooms: newRooms });
                              }}
                            >
                              削除
                            </Button>
                          </ControlRoomHeader>
                          
                          <RoomGrid>
                            <RoomInputGroup>
                              <RoomLabel>控室名</RoomLabel>
                              <Input 
                                value={controlRoom.name}
                                placeholder="例：控室A"
                                onChange={(e) => {
                                  const newRooms = [...formData.rooms];
                                  newRooms[index].control_rooms[controlIndex].name = e.target.value;
                                  setFormData({ ...formData, rooms: newRooms });
                                }}
                              />
                            </RoomInputGroup>
                            
                            <RoomInputGroup>
                              <RoomLabel>面積（㎡）</RoomLabel>
                              <Input 
                                value={controlRoom.area}
                                placeholder="例：40"
                                type="number"
                                onChange={(e) => {
                                  const newRooms = [...formData.rooms];
                                  newRooms[index].control_rooms[controlIndex].area = e.target.value;
                                  setFormData({ ...formData, rooms: newRooms });
                                }}
                              />
                            </RoomInputGroup>
                            
                            <RoomInputGroup>
                              <RoomLabel>机数</RoomLabel>
                              <Input 
                                value={controlRoom.desk_count}
                                placeholder="例：10"
                                type="number"
                                onChange={(e) => {
                                  const newRooms = [...formData.rooms];
                                  newRooms[index].control_rooms[controlIndex].desk_count = e.target.value;
                                  setFormData({ ...formData, rooms: newRooms });
                                }}
                              />
                            </RoomInputGroup>
                            
                            <RoomInputGroup>
                              <RoomLabel>椅子数</RoomLabel>
                              <Input 
                                value={controlRoom.chair_count}
                                placeholder="例：20"
                                type="number"
                                onChange={(e) => {
                                  const newRooms = [...formData.rooms];
                                  newRooms[index].control_rooms[controlIndex].chair_count = e.target.value;
                                  setFormData({ ...formData, rooms: newRooms });
                                }}
                              />
                            </RoomInputGroup>
                            
                            <RoomInputGroup>
                              <RoomLabel>収容人数</RoomLabel>
                              <Input 
                                value={controlRoom.capacity}
                                placeholder="例：20"
                                type="number"
                                onChange={(e) => {
                                  const newRooms = [...formData.rooms];
                                  newRooms[index].control_rooms[controlIndex].capacity = e.target.value;
                                  setFormData({ ...formData, rooms: newRooms });
                                }}
                              />
                            </RoomInputGroup>
                            
                            <RoomInputGroup>
                              <RoomLabel>備考</RoomLabel>
                              <Input 
                                value={controlRoom.notes}
                                placeholder="例：本体料金込み"
                                onChange={(e) => {
                                  const newRooms = [...formData.rooms];
                                  newRooms[index].control_rooms[controlIndex].notes = e.target.value;
                                  setFormData({ ...formData, rooms: newRooms });
                                }}
                              />
                            </RoomInputGroup>
                          </RoomGrid>
                        </ControlRoomItem>
                      ))}
                    </ControlRoomList>
                  ) : (
                    <div style={{ marginTop: theme.spacing.md, color: theme.colors.neutral[500], fontSize: theme.fontSize.sm }}>
                      控室が登録されていません
                    </div>
                  )}
                </ControlRoomSection>
              </RoomItem>
            ))}
            
            <Button 
              variant="outline" 
              onClick={() => {
                const newRoom = {
                  name: '',
                  ceiling_height: '',
                  floor_area: '',
                  desk_count: '',
                  chair_count: '',
                  capacity: '',
                  control_rooms: []
                };
                setFormData({ ...formData, rooms: [...formData.rooms, newRoom] });
              }}
            >
              + 部屋を追加
            </Button>
          </RoomList>
        </Section>

        {/* アクセス情報 */}
        <Section>
          <SectionTitle>アクセス情報（最寄り駅）</SectionTitle>
          <StationList>
            {formData.stations.map((station, index) => (
              <StationItem key={index}>
                <StationHeader>
                  <StationTitle>最寄り駅 {index + 1}</StationTitle>
                  <Button variant="text" size="small" style={{ color: theme.colors.error }}>削除</Button>
                </StationHeader>
                
                <StationGrid>
                  <RoomInputGroup>
                    <RoomLabel>駅名 *</RoomLabel>
                    <Input 
                      value={station.name} 
                      placeholder="例：新潟駅"
                      onChange={(e) => {
                        const newStations = [...formData.stations];
                        newStations[index].name = e.target.value;
                        setFormData({ ...formData, stations: newStations });
                      }}
                    />
                  </RoomInputGroup>
                  
                  <RoomInputGroup>
                    <RoomLabel>路線名 *</RoomLabel>
                    <Input 
                      value={station.line} 
                      placeholder="例：JR信越本線"
                      onChange={(e) => {
                        const newStations = [...formData.stations];
                        newStations[index].line = e.target.value;
                        setFormData({ ...formData, stations: newStations });
                      }}
                    />
                  </RoomInputGroup>
                  
                  <RoomInputGroup>
                    <RoomLabel>移動方法</RoomLabel>
                    <Select 
                      value={station.transport_method}
                      onChange={(e) => {
                        const newStations = [...formData.stations];
                        newStations[index].transport_method = e.target.value;
                        setFormData({ ...formData, stations: newStations });
                      }}
                    >
                      <option value="徒歩">徒歩</option>
                      <option value="バス">バス</option>
                      <option value="タクシー">タクシー</option>
                      <option value="車">車</option>
                    </Select>
                  </RoomInputGroup>
                  
                  <RoomInputGroup>
                    <RoomLabel>所要時間（分）</RoomLabel>
                    <Input 
                      value={station.travel_time} 
                      placeholder="例：15"
                      type="number"
                      onChange={(e) => {
                        const newStations = [...formData.stations];
                        newStations[index].travel_time = e.target.value;
                        setFormData({ ...formData, stations: newStations });
                      }}
                    />
                  </RoomInputGroup>
                  
                  <RoomInputGroup>
                    <RoomLabel>備考</RoomLabel>
                    <Input 
                      value={station.notes} 
                      placeholder="例：南口から5km"
                      onChange={(e) => {
                        const newStations = [...formData.stations];
                        newStations[index].notes = e.target.value;
                        setFormData({ ...formData, stations: newStations });
                      }}
                    />
                  </RoomInputGroup>
                </StationGrid>
              </StationItem>
            ))}
            
            <Button 
              variant="outline"
              onClick={() => {
                const newStation = {
                  name: '',
                  line: '',
                  transport_method: '徒歩',
                  travel_time: '',
                  notes: ''
                };
                setFormData({ ...formData, stations: [...formData.stations, newStation] });
              }}
            >
              + 最寄り駅を追加
            </Button>
          </StationList>
        </Section>

        {/* 設備情報 */}
        <Section>
          <SectionTitle>設備情報</SectionTitle>
          <EquipmentGrid>
            <EquipmentItem>
              <EquipmentLabel>演台</EquipmentLabel>
              <TriStateSelector>
                <TriStateOption
                  selected={formData.facilities.podium.status === 'yes'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      podium: { ...formData.facilities.podium, status: 'yes' }
                    }
                  })}
                >
                  あり
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.podium.status === 'no'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      podium: { ...formData.facilities.podium, status: 'no' }
                    }
                  })}
                >
                  なし
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.podium.status === 'unknown'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      podium: { ...formData.facilities.podium, status: 'unknown' }
                    }
                  })}
                >
                  不明
                </TriStateOption>
              </TriStateSelector>
              <NotesInput
                value={formData.facilities.podium.notes}
                onChange={(e) => setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    podium: { ...formData.facilities.podium, notes: e.target.value }
                  }
                })}
                placeholder="備考（例：高さ調整可能）"
              />
            </EquipmentItem>
            
            <EquipmentItem>
              <EquipmentLabel>ワイヤレスマイク</EquipmentLabel>
              <TriStateSelector>
                <TriStateOption
                  selected={formData.facilities.mic_wireless.status === 'yes'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      mic_wireless: { ...formData.facilities.mic_wireless, status: 'yes' }
                    }
                  })}
                >
                  あり
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.mic_wireless.status === 'no'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      mic_wireless: { ...formData.facilities.mic_wireless, status: 'no' }
                    }
                  })}
                >
                  なし
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.mic_wireless.status === 'unknown'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      mic_wireless: { ...formData.facilities.mic_wireless, status: 'unknown' }
                    }
                  })}
                >
                  不明
                </TriStateOption>
              </TriStateSelector>
              <NotesInput
                value={formData.facilities.mic_wireless.notes}
                onChange={(e) => setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    mic_wireless: { ...formData.facilities.mic_wireless, notes: e.target.value }
                  }
                })}
                placeholder="備考（例：ワイヤレス4本）"
              />
            </EquipmentItem>
            
            <EquipmentItem>
              <EquipmentLabel>有線マイク</EquipmentLabel>
              <TriStateSelector>
                <TriStateOption
                  selected={formData.facilities.mic_wired.status === 'yes'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      mic_wired: { ...formData.facilities.mic_wired, status: 'yes' }
                    }
                  })}
                >
                  あり
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.mic_wired.status === 'no'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      mic_wired: { ...formData.facilities.mic_wired, status: 'no' }
                    }
                  })}
                >
                  なし
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.mic_wired.status === 'unknown'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      mic_wired: { ...formData.facilities.mic_wired, status: 'unknown' }
                    }
                  })}
                >
                  不明
                </TriStateOption>
              </TriStateSelector>
              <NotesInput
                value={formData.facilities.mic_wired.notes}
                onChange={(e) => setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    mic_wired: { ...formData.facilities.mic_wired, notes: e.target.value }
                  }
                })}
                placeholder="備考（例：有線2本）"
              />
            </EquipmentItem>

            <EquipmentItem>
              <EquipmentLabel>プロジェクター</EquipmentLabel>
              <TriStateSelector>
                <TriStateOption
                  selected={formData.facilities.projector.status === 'yes'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      projector: { ...formData.facilities.projector, status: 'yes' }
                    }
                  })}
                >
                  あり
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.projector.status === 'no'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      projector: { ...formData.facilities.projector, status: 'no' }
                    }
                  })}
                >
                  なし
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.projector.status === 'unknown'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      projector: { ...formData.facilities.projector, status: 'unknown' }
                    }
                  })}
                >
                  不明
                </TriStateOption>
              </TriStateSelector>
              <NotesInput
                value={formData.facilities.projector.notes}
                onChange={(e) => setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    projector: { ...formData.facilities.projector, notes: e.target.value }
                  }
                })}
                placeholder="備考（例：HDMI対応・2台）"
              />
            </EquipmentItem>

            <EquipmentItem>
              <EquipmentLabel>プロジェクタースタンド</EquipmentLabel>
              <TriStateSelector>
                <TriStateOption
                  selected={formData.facilities.projector_stand.status === 'yes'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      projector_stand: { ...formData.facilities.projector_stand, status: 'yes' }
                    }
                  })}
                >
                  あり
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.projector_stand.status === 'no'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      projector_stand: { ...formData.facilities.projector_stand, status: 'no' }
                    }
                  })}
                >
                  なし
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.projector_stand.status === 'unknown'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      projector_stand: { ...formData.facilities.projector_stand, status: 'unknown' }
                    }
                  })}
                >
                  不明
                </TriStateOption>
              </TriStateSelector>
              <NotesInput
                value={formData.facilities.projector_stand.notes}
                onChange={(e) => setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    projector_stand: { ...formData.facilities.projector_stand, notes: e.target.value }
                  }
                })}
                placeholder="備考"
              />
            </EquipmentItem>

            <EquipmentItem>
              <EquipmentLabel>レーザーポインター</EquipmentLabel>
              <TriStateSelector>
                <TriStateOption
                  selected={formData.facilities.pointer.status === 'yes'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      pointer: { ...formData.facilities.pointer, status: 'yes' }
                    }
                  })}
                >
                  あり
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.pointer.status === 'no'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      pointer: { ...formData.facilities.pointer, status: 'no' }
                    }
                  })}
                >
                  なし
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.pointer.status === 'unknown'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      pointer: { ...formData.facilities.pointer, status: 'unknown' }
                    }
                  })}
                >
                  不明
                </TriStateOption>
              </TriStateSelector>
              <NotesInput
                value={formData.facilities.pointer.notes}
                onChange={(e) => setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    pointer: { ...formData.facilities.pointer, notes: e.target.value }
                  }
                })}
                placeholder="備考（例：要確認）"
              />
            </EquipmentItem>

            <EquipmentItem>
              <EquipmentLabel>録画機器</EquipmentLabel>
              <TriStateSelector>
                <TriStateOption
                  selected={formData.facilities.recording_equipment.status === 'yes'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      recording_equipment: { ...formData.facilities.recording_equipment, status: 'yes' }
                    }
                  })}
                >
                  あり
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.recording_equipment.status === 'no'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      recording_equipment: { ...formData.facilities.recording_equipment, status: 'no' }
                    }
                  })}
                >
                  なし
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.recording_equipment.status === 'unknown'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      recording_equipment: { ...formData.facilities.recording_equipment, status: 'unknown' }
                    }
                  })}
                >
                  不明
                </TriStateOption>
              </TriStateSelector>
              <NotesInput
                value={formData.facilities.recording_equipment.notes}
                onChange={(e) => setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    recording_equipment: { ...formData.facilities.recording_equipment, notes: e.target.value }
                  }
                })}
                placeholder="備考（例：録画機器あり）"
              />
            </EquipmentItem>

            <EquipmentItem>
              <EquipmentLabel>ライブ配信機器</EquipmentLabel>
              <TriStateSelector>
                <TriStateOption
                  selected={formData.facilities.livestream_equipment.status === 'yes'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      livestream_equipment: { ...formData.facilities.livestream_equipment, status: 'yes' }
                    }
                  })}
                >
                  あり
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.livestream_equipment.status === 'no'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      livestream_equipment: { ...formData.facilities.livestream_equipment, status: 'no' }
                    }
                  })}
                >
                  なし
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.livestream_equipment.status === 'unknown'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      livestream_equipment: { ...formData.facilities.livestream_equipment, status: 'unknown' }
                    }
                  })}
                >
                  不明
                </TriStateOption>
              </TriStateSelector>
              <NotesInput
                value={formData.facilities.livestream_equipment.notes}
                onChange={(e) => setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    livestream_equipment: { ...formData.facilities.livestream_equipment, notes: e.target.value }
                  }
                })}
                placeholder="備考"
              />
            </EquipmentItem>

            <EquipmentItem>
              <EquipmentLabel>同時通訳ブース</EquipmentLabel>
              <TriStateSelector>
                <TriStateOption
                  selected={formData.facilities.interpreter_booth.status === 'yes'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      interpreter_booth: { ...formData.facilities.interpreter_booth, status: 'yes' }
                    }
                  })}
                >
                  あり
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.interpreter_booth.status === 'no'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      interpreter_booth: { ...formData.facilities.interpreter_booth, status: 'no' }
                    }
                  })}
                >
                  なし
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.interpreter_booth.status === 'unknown'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      interpreter_booth: { ...formData.facilities.interpreter_booth, status: 'unknown' }
                    }
                  })}
                >
                  不明
                </TriStateOption>
              </TriStateSelector>
              <NotesInput
                value={formData.facilities.interpreter_booth.notes}
                onChange={(e) => setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    interpreter_booth: { ...formData.facilities.interpreter_booth, notes: e.target.value }
                  }
                })}
                placeholder="備考"
              />
            </EquipmentItem>

            <EquipmentItem>
              <EquipmentLabel>音響システム</EquipmentLabel>
              <TriStateSelector>
                <TriStateOption
                  selected={formData.facilities.sound_system.status === 'yes'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      sound_system: { ...formData.facilities.sound_system, status: 'yes' }
                    }
                  })}
                >
                  あり
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.sound_system.status === 'no'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      sound_system: { ...formData.facilities.sound_system, status: 'no' }
                    }
                  })}
                >
                  なし
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.sound_system.status === 'unknown'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      sound_system: { ...formData.facilities.sound_system, status: 'unknown' }
                    }
                  })}
                >
                  不明
                </TriStateOption>
              </TriStateSelector>
              <NotesInput
                value={formData.facilities.sound_system.notes}
                onChange={(e) => setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    sound_system: { ...formData.facilities.sound_system, notes: e.target.value }
                  }
                })}
                placeholder="備考（例：大型スピーカー完備）"
              />
            </EquipmentItem>

            <EquipmentItem>
              <EquipmentLabel>照明調整</EquipmentLabel>
              <TriStateSelector>
                <TriStateOption
                  selected={formData.facilities.lighting_control.status === 'yes'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      lighting_control: { ...formData.facilities.lighting_control, status: 'yes' }
                    }
                  })}
                >
                  あり
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.lighting_control.status === 'no'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      lighting_control: { ...formData.facilities.lighting_control, status: 'no' }
                    }
                  })}
                >
                  なし
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.lighting_control.status === 'unknown'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      lighting_control: { ...formData.facilities.lighting_control, status: 'unknown' }
                    }
                  })}
                >
                  不明
                </TriStateOption>
              </TriStateSelector>
              <NotesInput
                value={formData.facilities.lighting_control.notes}
                onChange={(e) => setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    lighting_control: { ...formData.facilities.lighting_control, notes: e.target.value }
                  }
                })}
                placeholder="備考（例：調光可能）"
              />
            </EquipmentItem>

            <EquipmentItem>
              <EquipmentLabel>空調設備</EquipmentLabel>
              <TriStateSelector>
                <TriStateOption
                  selected={formData.facilities.air_conditioning.status === 'yes'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      air_conditioning: { ...formData.facilities.air_conditioning, status: 'yes' }
                    }
                  })}
                >
                  あり
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.air_conditioning.status === 'no'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      air_conditioning: { ...formData.facilities.air_conditioning, status: 'no' }
                    }
                  })}
                >
                  なし
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.air_conditioning.status === 'unknown'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      air_conditioning: { ...formData.facilities.air_conditioning, status: 'unknown' }
                    }
                  })}
                >
                  不明
                </TriStateOption>
              </TriStateSelector>
              <NotesInput
                value={formData.facilities.air_conditioning.notes}
                onChange={(e) => setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    air_conditioning: { ...formData.facilities.air_conditioning, notes: e.target.value }
                  }
                })}
                placeholder="備考（例：個別空調）"
              />
            </EquipmentItem>

            <EquipmentItem>
              <EquipmentLabel>Wi-Fi</EquipmentLabel>
              <TriStateSelector>
                <TriStateOption
                  selected={formData.facilities.wifi.status === 'yes'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      wifi: { ...formData.facilities.wifi, status: 'yes' }
                    }
                  })}
                >
                  あり
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.wifi.status === 'no'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      wifi: { ...formData.facilities.wifi, status: 'no' }
                    }
                  })}
                >
                  なし
                </TriStateOption>
                <TriStateOption
                  selected={formData.facilities.wifi.status === 'unknown'}
                  onClick={() => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      wifi: { ...formData.facilities.wifi, status: 'unknown' }
                    }
                  })}
                >
                  不明
                </TriStateOption>
              </TriStateSelector>
              <NotesInput
                value={formData.facilities.wifi.notes}
                onChange={(e) => setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    wifi: { ...formData.facilities.wifi, notes: e.target.value }
                  }
                })}
                placeholder="備考（例：高速WiFi完備）"
              />
            </EquipmentItem>
          </EquipmentGrid>
        </Section>

        {/* 料金情報 */}
        <Section>
          <SectionTitle>料金情報（2.5-3日利用）</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>メイン会場費用</Label>
              <Input
                type="number"
                value={formData.fees.main_venue_fee}
                onChange={(e) => setFormData({ ...formData, fees: { ...formData.fees, main_venue_fee: e.target.value }})}
                placeholder="円"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>控室費用</Label>
              <Input
                type="number"
                value={formData.fees.control_room_fee}
                onChange={(e) => setFormData({ ...formData, fees: { ...formData.fees, control_room_fee: e.target.value }})}
                placeholder="円"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>備品費用</Label>
              <Input
                type="number"
                value={formData.fees.equipment_fee}
                onChange={(e) => setFormData({ ...formData, fees: { ...formData.fees, equipment_fee: e.target.value }})}
                placeholder="円"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>電気代</Label>
              <Input
                type="number"
                value={formData.fees.electricity_fee}
                onChange={(e) => setFormData({ ...formData, fees: { ...formData.fees, electricity_fee: e.target.value }})}
                placeholder="円"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>エアコン代</Label>
              <Input
                type="number"
                value={formData.fees.air_conditioner_fee}
                onChange={(e) => setFormData({ ...formData, fees: { ...formData.fees, air_conditioner_fee: e.target.value }})}
                placeholder="円"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>ゴミ処理代</Label>
              <Input
                type="number"
                value={formData.fees.garbage_fee}
                onChange={(e) => setFormData({ ...formData, fees: { ...formData.fees, garbage_fee: e.target.value }})}
                placeholder="円"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>食事持込代</Label>
              <Input
                type="number"
                value={formData.fees.meal_bring_fee}
                onChange={(e) => setFormData({ ...formData, fees: { ...formData.fees, meal_bring_fee: e.target.value }})}
                placeholder="円"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>
                概算料金（控室・備品含む）<Required>*</Required>
              </Label>
              <Input
                type="number"
                value={formData.fees.estimated_total_fee}
                onChange={(e) => setFormData({ ...formData, fees: { ...formData.fees, estimated_total_fee: e.target.value }})}
                placeholder="円"
              />
            </FormGroup>
            
            <FormGroup style={{ gridColumn: 'span 2' }}>
              <Label>料金備考</Label>
              <TextArea
                value={formData.fees.fee_notes}
                onChange={(e) => setFormData({ ...formData, fees: { ...formData.fees, fee_notes: e.target.value }})}
                placeholder="例: 土日祝日は20%増し"
              />
            </FormGroup>
          </FormGrid>
        </Section>

        {/* 駐車場情報 */}
        <Section>
          <SectionTitle>駐車場情報</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>駐車台数</Label>
              <Input
                type="number"
                value={formData.parking.capacity}
                onChange={(e) => setFormData({ ...formData, parking: { ...formData.parking, capacity: e.target.value }})}
                placeholder="台"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>駐車料金</Label>
              <Input
                value={formData.parking.fee}
                onChange={(e) => setFormData({ ...formData, parking: { ...formData.parking, fee: e.target.value }})}
                placeholder="例: 無料 or 1時間200円"
              />
            </FormGroup>
            
            <CheckboxLabel>
              <input 
                type="checkbox" 
                checked={formData.parking.is_free}
                onChange={(e) => setFormData({ ...formData, parking: { ...formData.parking, is_free: e.target.checked }})}
              />
              無料
            </CheckboxLabel>
            
            <FormGroup style={{ gridColumn: 'span 2' }}>
              <Label>周辺駐車場情報</Label>
              <TextArea
                value={formData.parking.nearby_info}
                onChange={(e) => setFormData({ ...formData, parking: { ...formData.parking, nearby_info: e.target.value }})}
                placeholder="近隣のコインパーキング情報など"
              />
            </FormGroup>
          </FormGrid>
        </Section>

        {/* 予約・キャンセル条件 */}
        <Section>
          <SectionTitle>予約・キャンセル条件</SectionTitle>
          <FormGrid>
            <FormGroup style={{ gridColumn: 'span 2' }}>
              <Label>予約条件/仮予約条件</Label>
              <TextArea
                value={formData.conditions.reservation_conditions}
                onChange={(e) => setFormData({ ...formData, conditions: { ...formData.conditions, reservation_conditions: e.target.value }})}
              />
            </FormGroup>
            
            <FormGroup style={{ gridColumn: 'span 2' }}>
              <Label>
                キャンセルポリシー<Required>*</Required>
              </Label>
              <TextArea
                value={formData.conditions.cancellation_policy}
                onChange={(e) => setFormData({ ...formData, conditions: { ...formData.conditions, cancellation_policy: e.target.value }})}
                rows={5}
              />
            </FormGroup>
            
            <FormGroup style={{ gridColumn: 'span 2' }}>
              <Label>支払条件</Label>
              <TextArea
                value={formData.conditions.payment_terms}
                onChange={(e) => setFormData({ ...formData, conditions: { ...formData.conditions, payment_terms: e.target.value }})}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>予約可能日数（何日前から）</Label>
              <Input
                type="number"
                value={formData.conditions.advance_reservation_days}
                onChange={(e) => setFormData({ ...formData, conditions: { ...formData.conditions, advance_reservation_days: e.target.value }})}
                placeholder="日"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>キャンセル期限（何日前まで無料）</Label>
              <Input
                type="number"
                value={formData.conditions.cancellation_deadline_days}
                onChange={(e) => setFormData({ ...formData, conditions: { ...formData.conditions, cancellation_deadline_days: e.target.value }})}
                placeholder="日"
              />
            </FormGroup>
          </FormGrid>
        </Section>

        {/* URL情報 */}
        <Section>
          <SectionTitle>URL情報</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>公式サイト</Label>
              <Input
                type="url"
                value={formData.official_url}
                onChange={(e) => setFormData({ ...formData, official_url: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>予約ページ</Label>
              <Input
                type="url"
                value={formData.reservation_url}
                onChange={(e) => setFormData({ ...formData, reservation_url: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup style={{ gridColumn: 'span 2' }}>
              <Label>Google Maps URL</Label>
              <Input
                type="url"
                value={formData.google_map_url}
                onChange={(e) => setFormData({ ...formData, google_map_url: e.target.value })}
              />
            </FormGroup>
          </FormGrid>
        </Section>

        {/* 適用・備考 */}
        <Section>
          <SectionTitle>適用・備考</SectionTitle>
          <TextArea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={5}
            placeholder="その他の注意事項や特記事項を入力"
          />
        </Section>

        {/* 変更履歴 */}
        <Section>
          <SectionTitle>変更履歴</SectionTitle>
          <ChangeHistory>
            {changeHistory.map((history, index) => (
              <div key={index} style={{ marginBottom: theme.spacing.md }}>
                <Text size="sm" style={{ color: theme.colors.neutral[600] }}>
                  {history.date} - {history.user}
                </Text>
                <Text size="sm">
                  {history.field}: {history.oldValue} → {history.newValue}
                </Text>
              </div>
            ))}
          </ChangeHistory>
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