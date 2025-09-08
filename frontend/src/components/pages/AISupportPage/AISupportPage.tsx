import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Text, Card, Badge } from '../../atoms';
import { theme } from '../../../styles/theme';


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
  color: ${props => props.active ? theme.colors.secondary[600] : theme.colors.neutral[600]};
  font-weight: ${props => props.active ? theme.fontWeight.semibold : theme.fontWeight.regular};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.active ? theme.colors.neutral[0] : theme.colors.neutral[200]};
  }
`;

const InputCard = styled(Card)`
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const URLInputGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const URLInput = styled(Input)`
  flex: 1;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.neutral[300]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.md};
  font-family: inherit;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.secondary[500]};
  }
`;

const ResultCard = styled(Card)`
  padding: ${theme.spacing.xl};
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 2px solid ${theme.colors.neutral[200]};
`;

const ResultSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const ResultItem = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr auto;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.neutral[50]};
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.sm};
  align-items: center;
`;

const FieldLabel = styled.div`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.neutral[600]};
  font-weight: ${theme.fontWeight.medium};
`;

const FieldValue = styled.input`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.neutral[300]};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.md};
  background: ${theme.colors.neutral[0]};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.secondary[500]};
  }
`;

const ConfidenceBadge = styled(Badge)<{ confidence: 'high' | 'medium' | 'low' }>`
  background: ${props => 
    props.confidence === 'high' ? theme.colors.success :
    props.confidence === 'medium' ? theme.colors.warning :
    theme.colors.error
  };
  color: ${theme.colors.neutral[0]};
`;

const RoomCard = styled.div`
  background: ${theme.colors.neutral[50]};
  border: 1px solid ${theme.colors.neutral[200]};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const StationCard = styled.div`
  background: ${theme.colors.neutral[50]};
  border: 1px solid ${theme.colors.neutral[200]};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-top: ${theme.spacing.xl};
`;

const HelpText = styled.div`
  background: ${theme.colors.secondary[50]};
  border-left: 4px solid ${theme.colors.secondary[500]};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.sm};
`;

const AnalyzeButton = styled(Button)`
  background: linear-gradient(135deg, ${theme.colors.secondary[500]} 0%, ${theme.colors.secondary[700]} 100%);
`;

interface AISupportPageProps {
  onBack?: () => void;
  onApply?: (data: any) => void;
}

export const AISupportPage: React.FC<AISupportPageProps> = ({ onBack, onApply }) => {
  const [inputMode, setInputMode] = useState<'url' | 'text'>('text');
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // シミュレーション用のタイマー
    setTimeout(() => {
      setAnalysisResult({
        basic: {
          venueName: { value: 'NOCプラザ', confidence: 'high' },
          address: { value: '新潟県新潟市東区卸新町2丁目853番地3', confidence: 'high' },
          phone: { value: '025-273-4181', confidence: 'high' },
          email: { value: 'info@nocplaza.jp', confidence: 'medium' },
          officialUrl: { value: 'https://www.nocplaza.jp', confidence: 'high' },
        },
        rooms: [
          {
            name: 'ホール',
            area: '489㎡',
            capacity: '200名',
            ceilingHeight: '4.0m',
          },
          {
            name: '101会議室',
            area: '164㎡',
            capacity: '80名',
            ceilingHeight: '3.0m',
          },
        ],
        stations: [
          {
            name: '新潟駅',
            line: 'JR信越本線',
            distance: '5km',
            method: 'タクシー15分',
          },
        ],
        urls: {
          official: 'https://www.nocplaza.jp',
          reservation: 'https://www.nocplaza.jp/reservation',
          googleMap: 'https://maps.google.com/...',
        },
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleApply = () => {
    if (onApply && analysisResult) {
      onApply(analysisResult);
    }
    alert('解析結果を会場登録画面に反映しました');
  };

  return (
    <div>
        <Text size="md" color={theme.colors.neutral[600]} style={{ marginBottom: theme.spacing.xl }}>
          Webページやテキストから会場情報を自動で抽出します
        </Text>

        <HelpText>
          <Text size="sm">
            💡 ヒント: 会場の公式サイトやパンフレットのテキストを貼り付けると、
            施設名、住所、電話番号、部屋情報、アクセス情報などを自動で抽出します。
            複数の部屋や複数の最寄り駅も識別可能です。
          </Text>
        </HelpText>

        <TabContainer>
          <Tab active={inputMode === 'text'} onClick={() => setInputMode('text')}>
            テキスト貼り付け
          </Tab>
          <Tab active={inputMode === 'url'} onClick={() => setInputMode('url')}>
            URL入力
          </Tab>
        </TabContainer>

        <InputCard>
          {inputMode === 'url' ? (
            <>
              <Text size="md" weight="medium" style={{ marginBottom: theme.spacing.md }}>
                会場のWebページURLを入力
              </Text>
              <URLInputGroup>
                <URLInput
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/venue"
                />
                <Button variant="outline" onClick={() => alert('URL取得機能は準備中です')}>
                  取得
                </Button>
              </URLInputGroup>
            </>
          ) : (
            <>
              <Text size="md" weight="medium" style={{ marginBottom: theme.spacing.md }}>
                会場情報のテキストを貼り付け
              </Text>
              <TextArea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`会場情報をここに貼り付けてください。
                
例:
NOCプラザ
〒950-8756 新潟県新潟市東区卸新町2丁目853番地3
TEL: 025-273-4181

施設概要:
・ホール（489㎡、収容人数200名）
・101会議室（164㎡、収容人数80名）

アクセス:
JR新潟駅南口よりタクシーで15分`}
              />
            </>
          )}
          
          <div style={{ textAlign: 'center', marginTop: theme.spacing.lg }}>
            <AnalyzeButton 
              size="large" 
              onClick={handleAnalyze}
              disabled={isAnalyzing || (!url && !text)}
            >
              {isAnalyzing ? '解析中...' : 'AIで解析'}
            </AnalyzeButton>
          </div>
        </InputCard>

        {analysisResult && (
          <ResultCard>
            <ResultHeader>
              <Text size="lg" weight="bold">解析結果</Text>
              <Button variant="outline" size="small" onClick={() => setAnalysisResult(null)}>
                クリア
              </Button>
            </ResultHeader>

            <ResultSection>
              <Text size="md" weight="semibold" style={{ marginBottom: theme.spacing.md }}>
                基本情報
              </Text>
              <ResultItem>
                <FieldLabel>施設名</FieldLabel>
                <FieldValue 
                  value={analysisResult.basic.venueName.value}
                  onChange={(e) => {/* 編集処理 */}}
                />
                <ConfidenceBadge confidence={analysisResult.basic.venueName.confidence}>
                  信頼度: 高
                </ConfidenceBadge>
              </ResultItem>
              <ResultItem>
                <FieldLabel>住所</FieldLabel>
                <FieldValue 
                  value={analysisResult.basic.address.value}
                  onChange={(e) => {/* 編集処理 */}}
                />
                <ConfidenceBadge confidence={analysisResult.basic.address.confidence}>
                  信頼度: 高
                </ConfidenceBadge>
              </ResultItem>
              <ResultItem>
                <FieldLabel>電話番号</FieldLabel>
                <FieldValue 
                  value={analysisResult.basic.phone.value}
                  onChange={(e) => {/* 編集処理 */}}
                />
                <ConfidenceBadge confidence={analysisResult.basic.phone.confidence}>
                  信頼度: 高
                </ConfidenceBadge>
              </ResultItem>
            </ResultSection>

            <ResultSection>
              <Text size="md" weight="semibold" style={{ marginBottom: theme.spacing.md }}>
                部屋情報（複数識別）
              </Text>
              {analysisResult.rooms.map((room: any, index: number) => (
                <RoomCard key={index}>
                  <Text size="sm" weight="medium">部屋{index + 1}: {room.name}</Text>
                  <Text size="xs" color={theme.colors.neutral[600]}>
                    広さ: {room.area} / 収容人数: {room.capacity} / 天井高: {room.ceilingHeight}
                  </Text>
                </RoomCard>
              ))}
            </ResultSection>

            <ResultSection>
              <Text size="md" weight="semibold" style={{ marginBottom: theme.spacing.md }}>
                最寄り駅（複数識別）
              </Text>
              {analysisResult.stations.map((station: any, index: number) => (
                <StationCard key={index}>
                  <Text size="sm" weight="medium">駅{index + 1}: {station.name}</Text>
                  <Text size="xs" color={theme.colors.neutral[600]}>
                    路線: {station.line} / 距離: {station.distance} / アクセス: {station.method}
                  </Text>
                </StationCard>
              ))}
            </ResultSection>

            <ResultSection>
              <Text size="md" weight="semibold" style={{ marginBottom: theme.spacing.md }}>
                URL情報
              </Text>
              <ResultItem>
                <FieldLabel>公式サイト</FieldLabel>
                <FieldValue 
                  value={analysisResult.urls.official}
                  onChange={(e) => {/* 編集処理 */}}
                />
                <Badge variant="success">自動取得</Badge>
              </ResultItem>
              <ResultItem>
                <FieldLabel>予約サイト</FieldLabel>
                <FieldValue 
                  value={analysisResult.urls.reservation}
                  onChange={(e) => {/* 編集処理 */}}
                />
                <Badge variant="success">自動取得</Badge>
              </ResultItem>
              <ResultItem>
                <FieldLabel>Google Maps</FieldLabel>
                <FieldValue 
                  value={analysisResult.urls.googleMap}
                  onChange={(e) => {/* 編集処理 */}}
                />
                <Badge variant="success">自動生成</Badge>
              </ResultItem>
            </ResultSection>

            <ButtonGroup>
              <Button variant="primary" size="large" onClick={handleApply}>
                会場登録画面へ適用
              </Button>
              <Button variant="outline" size="large" onClick={() => alert('手動編集画面を開きます')}>
                手動編集
              </Button>
              <Button variant="ghost" size="large" onClick={onBack}>
                キャンセル
              </Button>
            </ButtonGroup>
          </ResultCard>
        )}
    </div>
  );
};