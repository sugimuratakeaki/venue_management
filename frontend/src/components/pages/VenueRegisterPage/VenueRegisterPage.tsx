import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Text, Card } from '../../atoms';
import { theme } from '../../../styles/theme';


const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xl};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${theme.colors.neutral[300]};
    z-index: 0;
  }
`;

const Step = styled.div<{ active?: boolean; completed?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xs};
  position: relative;
  z-index: 1;
`;

const StepCircle = styled.div<{ active?: boolean; completed?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.fontWeight.bold};
  background: ${props => 
    props.completed ? theme.colors.success :
    props.active ? theme.colors.primary[500] : 
    theme.colors.neutral[300]};
  color: ${theme.colors.neutral[0]};
`;

const StepLabel = styled.div<{ active?: boolean }>`
  font-size: ${theme.fontSize.sm};
  color: ${props => props.active ? theme.colors.primary[700] : theme.colors.neutral[600]};
  font-weight: ${props => props.active ? theme.fontWeight.medium : theme.fontWeight.regular};
`;

const FormCard = styled(Card)`
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
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

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  cursor: pointer;
  
  input {
    width: 18px;
    height: 18px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

const ButtonGroupLeft = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const ButtonGroupRight = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const AIButton = styled(Button)`
  background: linear-gradient(135deg, ${theme.colors.secondary[500]} 0%, ${theme.colors.secondary[700]} 100%);
`;

interface VenueRegisterPageProps {
  onBack?: () => void;
}

export const VenueRegisterPage: React.FC<VenueRegisterPageProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: 基本情報
    venueName: '',
    address: '',
    phone: '',
    email: '',
    contactPerson: '',
    access: '',
    
    // Step 2: 施設詳細
    roomName: '',
    ceilingHeight: '',
    area: '',
    desks: '',
    chairs: '',
    capacity: '',
    foodAllowed: false,
    shoesAllowed: false,
    earthquakeStandard: false,
    
    // Step 3: 設備情報
    equipment: {
      podium: false,
      whiteboard: false,
      screen: false,
      wirelessMic: false,
      projectorStand: false,
    },
    otherEquipment: '',
    
    // Step 4: 料金情報
    waitingRoomFee: '',
    mainVenueFee: '',
    equipmentFee: '',
    estimatedFee: '',
    
    // Step 5: 予約条件
    reservationConditions: '',
    cancellationPolicy: '',
    paymentTerms: '',
    
    // Step 6: 駐車場情報
    parkingSpaces: '',
    parkingFee: '',
    nearbyParking: '',
  });

  const steps = [
    { id: 1, label: '基本情報' },
    { id: 2, label: '施設詳細' },
    { id: 3, label: '設備情報' },
    { id: 4, label: '料金情報' },
    { id: 5, label: '予約条件' },
    { id: 6, label: '駐車場' },
  ];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    alert('会場情報を登録しました');
    if (onBack) onBack();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormSection>
            <FormRow>
              <FormGroup>
                <Label>施設名 <span>*</span></Label>
                <Input
                  value={formData.venueName}
                  onChange={(e) => setFormData({...formData, venueName: e.target.value})}
                  placeholder="例: NOCプラザ"
                />
              </FormGroup>
              <FormGroup>
                <Label>電話番号 <span>*</span></Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="例: 025-273-4181"
                />
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Label>住所 <span>*</span></Label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="例: 新潟県新潟市東区卸新町2丁目853番地3"
              />
            </FormGroup>
            <FormRow>
              <FormGroup>
                <Label>メールアドレス</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="例: info@example.com"
                />
              </FormGroup>
              <FormGroup>
                <Label>担当者</Label>
                <Input
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  placeholder="例: 山田太郎"
                />
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Label>アクセス情報</Label>
              <TextArea
                value={formData.access}
                onChange={(e) => setFormData({...formData, access: e.target.value})}
                placeholder="最寄り駅からのアクセス方法などを入力"
              />
            </FormGroup>
          </FormSection>
        );
      
      case 2:
        return (
          <FormSection>
            <FormRow>
              <FormGroup>
                <Label>部屋名</Label>
                <Input
                  value={formData.roomName}
                  onChange={(e) => setFormData({...formData, roomName: e.target.value})}
                  placeholder="例: ホール"
                />
              </FormGroup>
              <FormGroup>
                <Label>天井高（m）</Label>
                <Input
                  type="number"
                  value={formData.ceilingHeight}
                  onChange={(e) => setFormData({...formData, ceilingHeight: e.target.value})}
                  placeholder="例: 4.0"
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>広さ（㎡）</Label>
                <Input
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  placeholder="例: 489"
                />
              </FormGroup>
              <FormGroup>
                <Label>収容人数 <span>*</span></Label>
                <Input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  placeholder="例: 200"
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>机の数</Label>
                <Input
                  type="number"
                  value={formData.desks}
                  onChange={(e) => setFormData({...formData, desks: e.target.value})}
                  placeholder="例: 50"
                />
              </FormGroup>
              <FormGroup>
                <Label>椅子の数</Label>
                <Input
                  type="number"
                  value={formData.chairs}
                  onChange={(e) => setFormData({...formData, chairs: e.target.value})}
                  placeholder="例: 200"
                />
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Label>その他条件</Label>
              <CheckboxGroup>
                <CheckboxItem>
                  <input
                    type="checkbox"
                    checked={formData.foodAllowed}
                    onChange={(e) => setFormData({...formData, foodAllowed: e.target.checked})}
                  />
                  飲食可
                </CheckboxItem>
                <CheckboxItem>
                  <input
                    type="checkbox"
                    checked={formData.shoesAllowed}
                    onChange={(e) => setFormData({...formData, shoesAllowed: e.target.checked})}
                  />
                  土足可
                </CheckboxItem>
                <CheckboxItem>
                  <input
                    type="checkbox"
                    checked={formData.earthquakeStandard}
                    onChange={(e) => setFormData({...formData, earthquakeStandard: e.target.checked})}
                  />
                  耐震基準適合
                </CheckboxItem>
              </CheckboxGroup>
            </FormGroup>
          </FormSection>
        );
      
      case 3:
        return (
          <FormSection>
            <FormGroup>
              <Label>設備</Label>
              <CheckboxGroup>
                <CheckboxItem>
                  <input
                    type="checkbox"
                    checked={formData.equipment.podium}
                    onChange={(e) => setFormData({
                      ...formData, 
                      equipment: {...formData.equipment, podium: e.target.checked}
                    })}
                  />
                  演台
                </CheckboxItem>
                <CheckboxItem>
                  <input
                    type="checkbox"
                    checked={formData.equipment.whiteboard}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipment: {...formData.equipment, whiteboard: e.target.checked}
                    })}
                  />
                  ホワイトボード
                </CheckboxItem>
                <CheckboxItem>
                  <input
                    type="checkbox"
                    checked={formData.equipment.screen}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipment: {...formData.equipment, screen: e.target.checked}
                    })}
                  />
                  スクリーン
                </CheckboxItem>
                <CheckboxItem>
                  <input
                    type="checkbox"
                    checked={formData.equipment.wirelessMic}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipment: {...formData.equipment, wirelessMic: e.target.checked}
                    })}
                  />
                  ワイヤレスマイク
                </CheckboxItem>
                <CheckboxItem>
                  <input
                    type="checkbox"
                    checked={formData.equipment.projectorStand}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipment: {...formData.equipment, projectorStand: e.target.checked}
                    })}
                  />
                  プロジェクター台
                </CheckboxItem>
              </CheckboxGroup>
            </FormGroup>
            <FormGroup>
              <Label>その他設備</Label>
              <TextArea
                value={formData.otherEquipment}
                onChange={(e) => setFormData({...formData, otherEquipment: e.target.value})}
                placeholder="その他の設備を自由に記入してください"
              />
            </FormGroup>
          </FormSection>
        );
      
      case 4:
        return (
          <FormSection>
            <FormRow>
              <FormGroup>
                <Label>控室費用</Label>
                <Input
                  value={formData.waitingRoomFee}
                  onChange={(e) => setFormData({...formData, waitingRoomFee: e.target.value})}
                  placeholder="例: 5,000円/日"
                />
              </FormGroup>
              <FormGroup>
                <Label>メイン会場費用</Label>
                <Input
                  value={formData.mainVenueFee}
                  onChange={(e) => setFormData({...formData, mainVenueFee: e.target.value})}
                  placeholder="例: 30,000円/日"
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>備品費用</Label>
                <Input
                  value={formData.equipmentFee}
                  onChange={(e) => setFormData({...formData, equipmentFee: e.target.value})}
                  placeholder="例: プロジェクター 3,000円"
                />
              </FormGroup>
              <FormGroup>
                <Label>概算料金</Label>
                <Input
                  value={formData.estimatedFee}
                  onChange={(e) => setFormData({...formData, estimatedFee: e.target.value})}
                  placeholder="例: 40,000円〜"
                />
              </FormGroup>
            </FormRow>
          </FormSection>
        );
      
      case 5:
        return (
          <FormSection>
            <FormGroup>
              <Label>予約条件</Label>
              <TextArea
                value={formData.reservationConditions}
                onChange={(e) => setFormData({...formData, reservationConditions: e.target.value})}
                placeholder="予約に関する条件を記入してください"
              />
            </FormGroup>
            <FormGroup>
              <Label>キャンセル規定</Label>
              <TextArea
                value={formData.cancellationPolicy}
                onChange={(e) => setFormData({...formData, cancellationPolicy: e.target.value})}
                placeholder="キャンセルに関する規定を記入してください"
              />
            </FormGroup>
            <FormGroup>
              <Label>支払条件</Label>
              <TextArea
                value={formData.paymentTerms}
                onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                placeholder="支払いに関する条件を記入してください"
              />
            </FormGroup>
          </FormSection>
        );
      
      case 6:
        return (
          <FormSection>
            <FormRow>
              <FormGroup>
                <Label>駐車台数</Label>
                <Input
                  type="number"
                  value={formData.parkingSpaces}
                  onChange={(e) => setFormData({...formData, parkingSpaces: e.target.value})}
                  placeholder="例: 50"
                />
              </FormGroup>
              <FormGroup>
                <Label>駐車料金</Label>
                <Input
                  value={formData.parkingFee}
                  onChange={(e) => setFormData({...formData, parkingFee: e.target.value})}
                  placeholder="例: 無料"
                />
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Label>周辺駐車場情報</Label>
              <TextArea
                value={formData.nearbyParking}
                onChange={(e) => setFormData({...formData, nearbyParking: e.target.value})}
                placeholder="周辺の駐車場情報を記入してください"
              />
            </FormGroup>
          </FormSection>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
        
        <StepIndicator>
          {steps.map((step) => (
            <Step 
              key={step.id}
              active={step.id === currentStep}
              completed={step.id < currentStep}
            >
              <StepCircle 
                active={step.id === currentStep}
                completed={step.id < currentStep}
              >
                {step.id < currentStep ? '✓' : step.id}
              </StepCircle>
              <StepLabel active={step.id === currentStep}>
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </StepIndicator>
        
        <FormCard>
          {renderStepContent()}
        </FormCard>
        
        <ButtonGroup>
          <ButtonGroupLeft>
            <AIButton onClick={() => alert('AI入力支援機能を開きます')}>
              AI入力支援
            </AIButton>
            <Button variant="outline" onClick={() => alert('一時保存しました')}>
              一時保存
            </Button>
          </ButtonGroupLeft>
          
          <ButtonGroupRight>
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevious}>
                前へ
              </Button>
            )}
            {currentStep < 6 ? (
              <Button variant="primary" onClick={handleNext}>
                次へ
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSave}>
                保存
              </Button>
            )}
            <Button variant="ghost" onClick={onBack}>
              キャンセル
            </Button>
          </ButtonGroupRight>
        </ButtonGroup>
    </div>
  );
};