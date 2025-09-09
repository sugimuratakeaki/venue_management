import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Text, Card } from '../../atoms';
import { theme } from '../../../styles/theme';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
`;

const MainCard = styled(Card)`
  padding: ${theme.spacing.xl};
`;

const Section = styled.div`
  margin-bottom: ${theme.spacing.xxl};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.neutral[800]};
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 2px solid ${theme.colors.primary[500]};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
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
  
  span {
    color: ${theme.colors.error};
  }
`;

const TextArea = styled.textarea`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.neutral[300]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.md};
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
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

interface ControlRoom {
  name: string;
  area: string;
  desk_count: string;
  chair_count: string;
  capacity: string;
  notes: string;
}

interface Room {
  name: string;
  ceiling_height: string;
  floor_area: string;
  desk_count: string;
  chair_count: string;
  capacity: string;
  control_rooms: ControlRoom[];
}

interface VenueRegisterPageProps {
  onBack?: () => void;
}

export const VenueRegisterPage: React.FC<VenueRegisterPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    // 基本情報
    venue_no: '',
    venue_name: '',
    prefecture: '',
    city: '',
    address: '',
    postal_code: '',
    phone: '',
    email: '',
    contact_person: '',
    description: '',
    official_url: '',
    reservation_url: '',
    google_map_url: '',
    
    // 利用条件
    can_eat_drink: false,
    can_wear_shoes: false,
    is_earthquake_resistant: false,
    operating_hours: '',
    can_receive_package: false,
    package_receiver: '',
    
    // 部屋情報
    rooms: [
      { 
        name: '', 
        ceiling_height: '',
        floor_area: '',
        desk_count: '',
        chair_count: '',
        capacity: '',
        control_rooms: [] as ControlRoom[]
      }
    ] as Room[],
    
    // 最寄り駅
    stations: [
      { 
        name: '',
        line: '',
        transport_method: '徒歩',
        travel_time: '',
        notes: ''
      }
    ],
    
    // 設備情報
    facilities: {
      podium: { quantity: 0, notes: '' },
      whiteboard: { quantity: 0, notes: '' },
      screen: { quantity: 0, size: '', notes: '' },
      mic_wireless: { quantity: 0, is_wireless: true, notes: '' },
      mic_wired: { quantity: 0, is_wireless: false, notes: '' },
      projector_stand: { quantity: 0, notes: '' },
      projector: { quantity: 0, notes: '' },
    },
    
    // 料金情報
    fees: {
      main_venue_fee: '',
      control_room_fee: '',
      equipment_fee: '',
      electricity_fee: '',
      air_conditioner_fee: '',
      garbage_fee: '',
      meal_bring_fee: '',
      estimated_total_fee: '',
      fee_notes: '',
    },
    
    // 駐車場情報
    parking: {
      onsite_spaces: '',
      onsite_fee: '',
      nearby_info: '',
    },
    
    // 予約・キャンセル条件
    reservation_method: '',
    cancellation_policy: '',
    payment_terms: '',
  });

  const handleSave = () => {
    console.log('保存:', formData);
    alert('会場情報を登録しました');
    if (onBack) onBack();
  };

  const handleCancel = () => {
    if (window.confirm('入力内容が失われますが、よろしいですか？')) {
      if (onBack) onBack();
    }
  };

  return (
    <Container>
      <Header>
        <div>
          <Button variant="outline" onClick={() => alert('AI入力支援機能を開きます')}>
            AI入力支援
          </Button>
        </div>
      </Header>

      <MainCard>
        {/* 基本情報 */}
        <Section>
          <SectionTitle>基本情報</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>会場管理番号</Label>
              <Input
                value={formData.venue_no}
                onChange={(e) => setFormData({ ...formData, venue_no: e.target.value })}
                placeholder="例：V001"
              />
            </FormGroup>
            <FormGroup>
              <Label>施設名 <span>*</span></Label>
              <Input
                value={formData.venue_name}
                onChange={(e) => setFormData({ ...formData, venue_name: e.target.value })}
                placeholder="例：NOCプラザ"
              />
            </FormGroup>
            <FormGroup>
              <Label>都道府県 <span>*</span></Label>
              <Select
                value={formData.prefecture}
                onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
              >
                <option value="">選択してください</option>
                <option value="新潟県">新潟県</option>
                <option value="東京都">東京都</option>
                <option value="大阪府">大阪府</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>市区町村 <span>*</span></Label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="例：新潟市"
              />
            </FormGroup>
          </FormGrid>
          
          <FormGrid>
            <FormGroup>
              <Label>住所 <span>*</span></Label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="例：新潟市中央区東堀通1-86-12"
              />
            </FormGroup>
            <FormGroup>
              <Label>郵便番号</Label>
              <Input
                value={formData.postal_code}
                onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                placeholder="例：950-8756"
              />
            </FormGroup>
          </FormGrid>
          
          <FormGrid>
            <FormGroup>
              <Label>電話番号 <span>*</span></Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="例：025-234-5678"
              />
            </FormGroup>
            <FormGroup>
              <Label>メールアドレス</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="例：info@noc-plaza.jp"
              />
            </FormGroup>
            <FormGroup>
              <Label>担当者名</Label>
              <Input
                value={formData.contact_person}
                onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                placeholder="例：山田太郎"
              />
            </FormGroup>
          </FormGrid>
          
          <FormGroup>
            <Label>施設説明</Label>
            <TextArea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="施設の特徴や利用案内などを記入してください"
            />
          </FormGroup>
          
          <FormGrid>
            <FormGroup>
              <Label>公式サイトURL</Label>
              <Input
                value={formData.official_url}
                onChange={(e) => setFormData({ ...formData, official_url: e.target.value })}
                placeholder="例：https://noc-plaza.jp"
              />
            </FormGroup>
            <FormGroup>
              <Label>予約サイトURL</Label>
              <Input
                value={formData.reservation_url}
                onChange={(e) => setFormData({ ...formData, reservation_url: e.target.value })}
                placeholder="例：https://noc-plaza.jp/booking"
              />
            </FormGroup>
            <FormGroup>
              <Label>GoogleマップURL</Label>
              <Input
                value={formData.google_map_url}
                onChange={(e) => setFormData({ ...formData, google_map_url: e.target.value })}
                placeholder="例：https://maps.google.com/..."
              />
            </FormGroup>
          </FormGrid>
        </Section>

        {/* 利用条件 */}
        <Section>
          <SectionTitle>利用条件</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>利用可能時間</Label>
              <Input
                value={formData.operating_hours}
                onChange={(e) => setFormData({ ...formData, operating_hours: e.target.value })}
                placeholder="例：9:00-21:00"
              />
            </FormGroup>
            
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={formData.can_eat_drink}
                onChange={(e) => setFormData({ ...formData, can_eat_drink: e.target.checked })}
              />
              飲食可
            </CheckboxLabel>
            
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={formData.can_wear_shoes}
                onChange={(e) => setFormData({ ...formData, can_wear_shoes: e.target.checked })}
              />
              土足可
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
                  {formData.rooms.length > 1 && (
                    <Button 
                      variant="text" 
                      size="small" 
                      style={{ color: theme.colors.error }}
                      onClick={() => {
                        const newRooms = formData.rooms.filter((_, i) => i !== index);
                        setFormData({ ...formData, rooms: newRooms });
                      }}
                    >
                      削除
                    </Button>
                  )}
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
                  {formData.stations.length > 1 && (
                    <Button 
                      variant="text" 
                      size="small" 
                      style={{ color: theme.colors.error }}
                      onClick={() => {
                        const newStations = formData.stations.filter((_, i) => i !== index);
                        setFormData({ ...formData, stations: newStations });
                      }}
                    >
                      削除
                    </Button>
                  )}
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
          <FormGrid>
            <FormGroup>
              <Label>演台</Label>
              <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                <Input 
                  type="number" 
                  value={formData.facilities.podium.quantity}
                  style={{ width: '100px' }}
                  placeholder="数量"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      podium: { ...formData.facilities.podium, quantity: parseInt(e.target.value) || 0 }
                    }
                  })}
                />
                <Input 
                  value={formData.facilities.podium.notes}
                  placeholder="備考"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      podium: { ...formData.facilities.podium, notes: e.target.value }
                    }
                  })}
                />
              </div>
            </FormGroup>
            
            <FormGroup>
              <Label>ホワイトボード</Label>
              <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                <Input 
                  type="number" 
                  value={formData.facilities.whiteboard.quantity}
                  style={{ width: '100px' }}
                  placeholder="数量"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      whiteboard: { ...formData.facilities.whiteboard, quantity: parseInt(e.target.value) || 0 }
                    }
                  })}
                />
                <Input 
                  value={formData.facilities.whiteboard.notes}
                  placeholder="備考"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      whiteboard: { ...formData.facilities.whiteboard, notes: e.target.value }
                    }
                  })}
                />
              </div>
            </FormGroup>
            
            <FormGroup>
              <Label>スクリーン</Label>
              <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                <Input 
                  type="number" 
                  value={formData.facilities.screen.quantity}
                  style={{ width: '100px' }}
                  placeholder="数量"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      screen: { ...formData.facilities.screen, quantity: parseInt(e.target.value) || 0 }
                    }
                  })}
                />
                <Input 
                  value={formData.facilities.screen.size}
                  style={{ width: '150px' }}
                  placeholder="サイズ"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      screen: { ...formData.facilities.screen, size: e.target.value }
                    }
                  })}
                />
                <Input 
                  value={formData.facilities.screen.notes}
                  placeholder="備考"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      screen: { ...formData.facilities.screen, notes: e.target.value }
                    }
                  })}
                />
              </div>
            </FormGroup>
            
            <FormGroup>
              <Label>ワイヤレスマイク</Label>
              <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                <Input 
                  type="number" 
                  value={formData.facilities.mic_wireless.quantity}
                  style={{ width: '100px' }}
                  placeholder="数量"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      mic_wireless: { ...formData.facilities.mic_wireless, quantity: parseInt(e.target.value) || 0 }
                    }
                  })}
                />
                <Input 
                  value={formData.facilities.mic_wireless.notes}
                  placeholder="備考"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      mic_wireless: { ...formData.facilities.mic_wireless, notes: e.target.value }
                    }
                  })}
                />
              </div>
            </FormGroup>
            
            <FormGroup>
              <Label>有線マイク</Label>
              <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                <Input 
                  type="number" 
                  value={formData.facilities.mic_wired.quantity}
                  style={{ width: '100px' }}
                  placeholder="数量"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      mic_wired: { ...formData.facilities.mic_wired, quantity: parseInt(e.target.value) || 0 }
                    }
                  })}
                />
                <Input 
                  value={formData.facilities.mic_wired.notes}
                  placeholder="備考"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      mic_wired: { ...formData.facilities.mic_wired, notes: e.target.value }
                    }
                  })}
                />
              </div>
            </FormGroup>
            
            <FormGroup>
              <Label>プロジェクター台</Label>
              <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                <Input 
                  type="number" 
                  value={formData.facilities.projector_stand.quantity}
                  style={{ width: '100px' }}
                  placeholder="数量"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      projector_stand: { ...formData.facilities.projector_stand, quantity: parseInt(e.target.value) || 0 }
                    }
                  })}
                />
                <Input 
                  value={formData.facilities.projector_stand.notes}
                  placeholder="備考"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      projector_stand: { ...formData.facilities.projector_stand, notes: e.target.value }
                    }
                  })}
                />
              </div>
            </FormGroup>
            
            <FormGroup>
              <Label>プロジェクター</Label>
              <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                <Input 
                  type="number" 
                  value={formData.facilities.projector.quantity}
                  style={{ width: '100px' }}
                  placeholder="数量"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      projector: { ...formData.facilities.projector, quantity: parseInt(e.target.value) || 0 }
                    }
                  })}
                />
                <Input 
                  value={formData.facilities.projector.notes}
                  placeholder="備考（例：HDMI対応）"
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      projector: { ...formData.facilities.projector, notes: e.target.value }
                    }
                  })}
                />
              </div>
            </FormGroup>
          </FormGrid>
        </Section>

        {/* 料金情報 */}
        <Section>
          <SectionTitle>料金情報</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>メイン会場費用</Label>
              <Input
                value={formData.fees.main_venue_fee}
                onChange={(e) => setFormData({
                  ...formData,
                  fees: { ...formData.fees, main_venue_fee: e.target.value }
                })}
                placeholder="例：30000"
              />
            </FormGroup>
            <FormGroup>
              <Label>控室費用</Label>
              <Input
                value={formData.fees.control_room_fee}
                onChange={(e) => setFormData({
                  ...formData,
                  fees: { ...formData.fees, control_room_fee: e.target.value }
                })}
                placeholder="例：5000"
              />
            </FormGroup>
            <FormGroup>
              <Label>備品費用</Label>
              <Input
                value={formData.fees.equipment_fee}
                onChange={(e) => setFormData({
                  ...formData,
                  fees: { ...formData.fees, equipment_fee: e.target.value }
                })}
                placeholder="例：10000"
              />
            </FormGroup>
            <FormGroup>
              <Label>電気使用料</Label>
              <Input
                value={formData.fees.electricity_fee}
                onChange={(e) => setFormData({
                  ...formData,
                  fees: { ...formData.fees, electricity_fee: e.target.value }
                })}
                placeholder="例：5000"
              />
            </FormGroup>
            <FormGroup>
              <Label>冷暖房費</Label>
              <Input
                value={formData.fees.air_conditioner_fee}
                onChange={(e) => setFormData({
                  ...formData,
                  fees: { ...formData.fees, air_conditioner_fee: e.target.value }
                })}
                placeholder="例：3000"
              />
            </FormGroup>
            <FormGroup>
              <Label>ゴミ処理費</Label>
              <Input
                value={formData.fees.garbage_fee}
                onChange={(e) => setFormData({
                  ...formData,
                  fees: { ...formData.fees, garbage_fee: e.target.value }
                })}
                placeholder="例：2000"
              />
            </FormGroup>
            <FormGroup>
              <Label>飲食物持込料</Label>
              <Input
                value={formData.fees.meal_bring_fee}
                onChange={(e) => setFormData({
                  ...formData,
                  fees: { ...formData.fees, meal_bring_fee: e.target.value }
                })}
                placeholder="例：0"
              />
            </FormGroup>
            <FormGroup>
              <Label>概算合計金額</Label>
              <Input
                value={formData.fees.estimated_total_fee}
                onChange={(e) => setFormData({
                  ...formData,
                  fees: { ...formData.fees, estimated_total_fee: e.target.value }
                })}
                placeholder="例：55000"
              />
            </FormGroup>
          </FormGrid>
          
          <FormGroup>
            <Label>料金備考</Label>
            <TextArea
              value={formData.fees.fee_notes}
              onChange={(e) => setFormData({
                ...formData,
                fees: { ...formData.fees, fee_notes: e.target.value }
              })}
              placeholder="例：土日祝日は20%増し"
            />
          </FormGroup>
        </Section>

        {/* 駐車場情報 */}
        <Section>
          <SectionTitle>駐車場情報</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>施設内駐車場台数</Label>
              <Input
                value={formData.parking.onsite_spaces}
                onChange={(e) => setFormData({
                  ...formData,
                  parking: { ...formData.parking, onsite_spaces: e.target.value }
                })}
                placeholder="例：50"
              />
            </FormGroup>
            <FormGroup>
              <Label>施設内駐車場料金</Label>
              <Input
                value={formData.parking.onsite_fee}
                onChange={(e) => setFormData({
                  ...formData,
                  parking: { ...formData.parking, onsite_fee: e.target.value }
                })}
                placeholder="例：無料"
              />
            </FormGroup>
          </FormGrid>
          
          <FormGroup>
            <Label>周辺駐車場情報</Label>
            <TextArea
              value={formData.parking.nearby_info}
              onChange={(e) => setFormData({
                ...formData,
                parking: { ...formData.parking, nearby_info: e.target.value }
              })}
              placeholder="周辺の駐車場情報を記入してください"
            />
          </FormGroup>
        </Section>

        {/* 予約・キャンセル条件 */}
        <Section>
          <SectionTitle>予約・キャンセル条件</SectionTitle>
          <FormGroup>
            <Label>予約方法・手順</Label>
            <TextArea
              value={formData.reservation_method}
              onChange={(e) => setFormData({ ...formData, reservation_method: e.target.value })}
              placeholder="予約方法や手順を記入してください"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>キャンセルポリシー</Label>
            <TextArea
              value={formData.cancellation_policy}
              onChange={(e) => setFormData({ ...formData, cancellation_policy: e.target.value })}
              placeholder="例：利用日の30日前まで：無料&#10;29日前〜7日前：料金の30%&#10;6日前〜前日：料金の50%&#10;当日：料金の100%"
              rows={5}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>支払条件</Label>
            <TextArea
              value={formData.payment_terms}
              onChange={(e) => setFormData({ ...formData, payment_terms: e.target.value })}
              placeholder="支払い方法や期限などを記入してください"
            />
          </FormGroup>
        </Section>

        <ButtonGroup>
          <Button variant="outline" onClick={() => alert('一時保存しました')}>
            一時保存
          </Button>
          <Button variant="primary" onClick={handleSave}>
            登録
          </Button>
          <Button variant="ghost" onClick={handleCancel}>
            キャンセル
          </Button>
        </ButtonGroup>
      </MainCard>
    </Container>
  );
};