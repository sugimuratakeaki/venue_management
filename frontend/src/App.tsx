import React, { useState } from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import { MainLayout } from './components/templates';
import { 
  VenueListPage, 
  VenueDetailPage,
  LoginPage,
  DashboardPage,
  VenueRegisterPage,
  VenueEditPage,
  VenueSearchPage,
  AISupportPage,
  PasswordResetPage,
  ReservationManagePage,
  CalendarPage,
  UsageReportPage,
  ComparisonReportPage,
  UserManagePage,
  SystemSettingsPage
} from './components/pages';

type PageType = 
  | 'login'
  | 'dashboard'
  | 'venue-list'
  | 'venue-detail'
  | 'venue-register'
  | 'venue-edit'
  | 'venue-search'
  | 'ai-support'
  | 'password-reset'
  | 'reservation'
  | 'calendar'
  | 'report-usage'
  | 'report-compare'
  | 'users'
  | 'settings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [selectedVenueId, setSelectedVenueId] = useState<number | undefined>();
  const [userName] = useState('管理者');

  const handleLogin = (email: string, password: string) => {
    // モックログイン処理
    console.log('Login attempt:', email);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'venue-list':
      case 'venue-register':
      case 'venue-search':
      case 'dashboard':
      case 'ai-support':
      case 'reservation':
      case 'calendar':
      case 'report-usage':
      case 'report-compare':
      case 'users':
      case 'settings':
        setCurrentPage(page as PageType);
        break;
      default:
        console.log(`Navigation to ${page} not implemented yet`);
        break;
    }
  };

  const handleVenueSelect = (venueId: number) => {
    setSelectedVenueId(venueId);
    setCurrentPage('venue-detail');
  };

  const handleBack = () => {
    if (currentPage === 'venue-detail') {
      setCurrentPage('venue-list');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              ダッシュボード
            </h1>
            <DashboardContent onNavigate={handleNavigate} />
          </>
        );
      
      case 'venue-list':
        return (
          <>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              会場一覧
            </h1>
            <VenueListPage onVenueSelect={handleVenueSelect} />
          </>
        );
      
      case 'venue-detail':
        return <VenueDetailPage 
          venueId={selectedVenueId} 
          onBack={handleBack} 
          onEdit={() => setCurrentPage('venue-edit')}
        />;
      
      case 'venue-register':
        return (
          <>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              会場登録
            </h1>
            <VenueRegisterContent onBack={handleBack} />
          </>
        );
      
      case 'venue-edit':
        return (
          <>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              会場編集
            </h1>
            <VenueEditContent venueId={selectedVenueId} onBack={handleBack} />
          </>
        );
      
      case 'venue-search':
        return (
          <>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              会場検索
            </h1>
            <VenueSearchContent onBack={handleBack} onVenueSelect={handleVenueSelect} />
          </>
        );
      
      case 'ai-support':
        return (
          <>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              AI入力支援
            </h1>
            <AISupportContent 
              onBack={handleBack}
              onApply={(data) => {
                console.log('AI data:', data);
                setCurrentPage('venue-register');
              }}
            />
          </>
        );
      
      case 'reservation':
        return (
          <>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              予約管理
            </h1>
            <ReservationManagePage />
          </>
        );
      
      case 'calendar':
        return (
          <>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              カレンダー
            </h1>
            <CalendarPage />
          </>
        );
      
      case 'report-usage':
        return (
          <>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              利用統計レポート
            </h1>
            <UsageReportPage />
          </>
        );
      
      case 'report-compare':
        return (
          <>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              会場比較レポート
            </h1>
            <ComparisonReportPage />
          </>
        );
      
      case 'users':
        return (
          <>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              ユーザー管理
            </h1>
            <UserManagePage />
          </>
        );
      
      case 'settings':
        return (
          <>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              システム設定
            </h1>
            <SystemSettingsPage />
          </>
        );
      
      default:
        return null;
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <GlobalStyle />
        <LoginPage onLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <MainLayout
        userName={userName}
        activePage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      >
        {renderPageContent()}
      </MainLayout>
    </>
  );
}

// DashboardPage から必要な部分だけ抽出
const DashboardContent: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const statsCards = [
    { label: '登録会場数', value: '156', change: '前月比 +12', status: 'success' },
    { label: '今月の予約', value: '24', change: '確定待ち 5件', status: 'warning' },
    { label: '利用率', value: '68%', change: '前月比 +5%', status: 'success' },
    { label: '未処理タスク', value: '8', change: '要対応 3件', status: 'error' },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {statsCards.map((stat, index) => (
          <div key={index} style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '14px', color: '#757575', marginBottom: '8px' }}>{stat.label}</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4CAF50', marginBottom: '8px' }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: stat.status === 'success' ? '#4CAF50' : stat.status === 'warning' ? '#FF9800' : '#F44336' }}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>クイックアクセス</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('venue-register')} style={{ padding: '12px 24px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            新規会場登録
          </button>
          <button onClick={() => onNavigate('venue-search')} style={{ padding: '12px 24px', background: 'white', color: '#4CAF50', border: '1px solid #4CAF50', borderRadius: '8px', cursor: 'pointer' }}>
            会場検索
          </button>
          <button onClick={() => onNavigate('calendar')} style={{ padding: '12px 24px', background: 'white', color: '#4CAF50', border: '1px solid #4CAF50', borderRadius: '8px', cursor: 'pointer' }}>
            予約カレンダー
          </button>
          <button onClick={() => onNavigate('ai-support')} style={{ padding: '12px 24px', background: 'white', color: '#4CAF50', border: '1px solid #4CAF50', borderRadius: '8px', cursor: 'pointer' }}>
            AI入力支援
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>最近の更新</h3>
          <div>
            {['NOCプラザ - 料金情報を更新', 'ホテルニューキャッスル - 新規登録', 'じばさんプラザ - 予約確定'].map((item, index) => (
              <div key={index} style={{ padding: '12px 0', borderBottom: index < 2 ? '1px solid #E0E0E0' : 'none' }}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>お知らせ</h3>
          <div>
            {['システムメンテナンス - 12/25 2:00-4:00', '新機能リリース - AI支援機能を追加', '承認待ち - 3件の承認が必要です'].map((item, index) => (
              <div key={index} style={{ padding: '12px 0', borderBottom: index < 2 ? '1px solid #E0E0E0' : 'none' }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 各ページから Header とサイドバー関連のコードを除去したバージョン
const VenueRegisterContent: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  return <VenueRegisterPage onBack={onBack} />;
};

const VenueEditContent: React.FC<{ venueId?: number; onBack?: () => void }> = ({ venueId, onBack }) => {
  return <VenueEditPage venueId={venueId} onBack={onBack} />;
};

const VenueSearchContent: React.FC<{ onBack?: () => void; onVenueSelect?: (id: number) => void }> = ({ onBack, onVenueSelect }) => {
  return <VenueSearchPage onBack={onBack} onVenueSelect={onVenueSelect} />;
};

const AISupportContent: React.FC<{ onBack?: () => void; onApply?: (data: any) => void }> = ({ onBack, onApply }) => {
  return <AISupportPage onBack={onBack} onApply={onApply} />;
};

export default App;