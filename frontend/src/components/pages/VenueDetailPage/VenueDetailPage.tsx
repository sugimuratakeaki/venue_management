import React from 'react';
import { VenueDetail } from '../../organisms';

interface VenueDetailPageProps {
  venueId?: number;
  onBack?: () => void;
  onEdit?: () => void;
}


export const VenueDetailPage: React.FC<VenueDetailPageProps> = ({ 
  venueId = 10, // デフォルトでID 10の会場を表示
  onBack,
  onEdit
}) => {
  // 実際の実装では、venueIdを使ってデータを取得
  const mockVenue = {
    id: 10,
    venue_no: "V010",
    venue_name: "NOCプラザ",
    official_name: "NOCプラザ",
    prefecture: "新潟県",
    city: "新潟市",
    address: "〒950-8756 新潟県新潟市東区卸新町2丁目853番地3",
    postal_code: "950-8756",
    phone_number: "025-273-4181",
    email: null,
    official_url: "https://www.nocplaza.jp",
    reservation_url: null,
    google_map_url: "https://maps.google.com/maps?q=新潟県新潟市東区卸新町2丁目853番地3",
    contact_person: null,
    contact_department: null,
    rooms: [
      {
        id: 1,
        room_name: "ホール",
        room_type: "ホール",
        floor: null,
        ceiling_height: 4.0,
        floor_area: 489,
        capacity_theater: 200,
        capacity_school: 160,
        capacity_banquet: null,
        width: null,
        depth: null,
        is_dividable: false,
        has_stage: true,
        notes: "控室備え付けあり（本体料金込み）"
      },
      {
        id: 2,
        room_name: "101会議室",
        room_type: "会議室",
        floor: "1",
        ceiling_height: 3.0,
        floor_area: 164,
        capacity_theater: 80,
        capacity_school: 58,
        capacity_banquet: null,
        width: null,
        depth: null,
        is_dividable: false,
        has_stage: false,
        notes: "控室として203会議室(40㎡)利用可能"
      }
    ],
    stations: [
      {
        id: 1,
        station_name: "新潟駅",
        line_name: "JR信越本線・白新線・越後線",
        exit_name: "南口",
        transportation_method: "タクシー",
        walking_time: null,
        taxi_time: 15,
        bus_time: null,
        distance_km: 5,
        notes: "新潟駅南口から5km"
      }
    ],
    tags: ["会議室", "ホール", "研修施設", "防災訓練可", "大規模イベント可"],
    status: "active"
  };

  return (
    <VenueDetail 
      venue={mockVenue} 
      onBack={onBack}
      onEdit={onEdit}
    />
  );
};