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
    prefecture_id: 15, // 新潟県
    address: "新潟県新潟市東区卸新町2丁目853番地3",
    postal_code: "950-8756",
    phone_number: "025-273-4181",
    email: "info@nocplaza.jp",
    contact_person: "山田太郎",
    official_url: "https://www.nocplaza.jp",
    reservation_url: "https://www.nocplaza.jp/reserve",
    google_map_url: "https://maps.google.com/maps?q=新潟県新潟市東区卸新町2丁目853番地3",
    can_eat_drink: true,
    can_wear_shoes: false,
    is_earthquake_resistant: true,
    operating_hours: "9:00～21:00",
    can_receive_package: true,
    package_receiver: "管理事務所",
    notes: "防災訓練実績多数、AED設置",
    is_active: true,
    // 関連テーブルのデータ
    rooms: [
      {
        id: 1,
        venue_id: 10,
        room_name: "ホール",
        ceiling_height: 4.0,
        floor_area: 489,
        desk_count: 50,
        chair_count: 200,
        capacity: 200,
        is_main_room: true,
        // 控室情報（room_control_roomsテーブル）
        control_rooms: [
          {
            id: 1,
            room_id: 1,
            control_room_name: "控室A",
            control_room_area: 40,
            desk_count: 10,
            chair_count: 20,
            capacity: 20,
            notes: "本体料金込み",
            display_order: 1
          },
          {
            id: 2,
            room_id: 1,
            control_room_name: "控室B",
            control_room_area: 25,
            desk_count: 5,
            chair_count: 10,
            capacity: 10,
            notes: "別途料金",
            display_order: 2
          }
        ]
      },
      {
        id: 2,
        venue_id: 10,
        room_name: "101会議室",
        ceiling_height: 3.0,
        floor_area: 164,
        desk_count: 30,
        chair_count: 60,
        capacity: 60,
        is_main_room: false,
        control_rooms: []
      }
    ],
    // 最寄り駅情報（venues_stationsテーブル）
    stations: [
      {
        id: 1,
        venue_id: 10,
        station_name: "新潟駅",
        line_name: "JR信越本線・白新線・越後線",
        transport_method: "タクシー",
        travel_time: 15,
        notes: "南口から約5km",
        display_order: 1
      }
    ],
    // 設備情報（venue_facilitiesテーブル）
    facilities: [
      { facility_type_id: 1, quantity: 1, notes: "200インチ" }, // スクリーン
      { facility_type_id: 2, quantity: 1, notes: null }, // プロジェクター
      { facility_type_id: 3, quantity: 5, is_wireless: true }, // ワイヤレスマイク
      { facility_type_id: 4, quantity: 10, is_wireless: false }, // 有線マイク
      { facility_type_id: 5, quantity: 2, notes: null }, // ホワイトボード
      { facility_type_id: 6, quantity: 1, notes: null } // 演台
    ],
    // 料金情報（venue_feesテーブル）
    fees: {
      main_venue_fee: 30000,
      control_room_fee: 5000,
      equipment_fee: 3000,
      electricity_fee: 2000,
      air_conditioner_fee: 3000,
      notes: "税別、2.5日間の料金"
    },
    // 駐車場情報（venue_parkingテーブル）
    parking: {
      parking_capacity: 50,
      parking_fee: "無料",
      is_free: true,
      nearby_parking_info: "隣接駐車場あり、大型バス3台可"
    },
    // 利用条件（venue_conditionsテーブル）
    conditions: {
      reservation_conditions: "3ヶ月前から予約可能、仮予約は2週間有効",
      cancellation_policy: "30日前まで無料、7日前まで50%、当日100%",
      payment_terms: "利用日の7日前までに全額振込",
      advance_reservation_days: 90,
      cancellation_deadline_days: 7
    }
  };

  return (
    <VenueDetail 
      venue={mockVenue} 
      onBack={onBack}
      onEdit={onEdit}
    />
  );
};