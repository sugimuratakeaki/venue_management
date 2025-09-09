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
            <DashboardContent 
              onNavigate={handleNavigate} 
              setSelectedVenueId={setSelectedVenueId}
              setCurrentPage={setCurrentPage}
            />
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
const DashboardContent: React.FC<{ 
  onNavigate: (page: string) => void;
  setSelectedVenueId: (id: number) => void;
  setCurrentPage: (page: PageType) => void;
}> = ({ onNavigate, setSelectedVenueId, setCurrentPage }) => {
  const statsCards = [
    { label: '総登録会場数', value: '156', change: '全国の会場', status: 'primary' },
    { label: '今月の更新', value: '24', change: '新規追加 8件', status: 'success' },
    { label: '今週の更新', value: '7', change: '編集 5件', status: 'info' },
    { label: '本日の更新', value: '3', change: '最新', status: 'warning' },
  ];

  // ローカルストレージから最近見た会場を取得（実際の実装では必要）
  const recentlyViewed = [
    { id: 1, name: 'NOCプラザ', area: '新潟県', lastViewed: '10分前' },
    { id: 2, name: 'ホテルニューキャッスル', area: '新潟県', lastViewed: '1時間前' },
    { id: 3, name: 'じばさんプラザ', area: '新潟県', lastViewed: '昨日' },
    { id: 4, name: '東京国際フォーラム', area: '東京都', lastViewed: '2日前' },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {statsCards.map((stat, index) => (
          <div key={index} style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '14px', color: '#757575', marginBottom: '8px' }}>{stat.label}</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 
              stat.status === 'primary' ? '#4CAF50' : 
              stat.status === 'success' ? '#4CAF50' : 
              stat.status === 'info' ? '#2196F3' : 
              '#FF9800', marginBottom: '8px' }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: '#757575' }}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>クイックアクセス</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('venue-list')} style={{ padding: '12px 24px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            会場一覧
          </button>
          <button onClick={() => onNavigate('venue-register')} style={{ padding: '12px 24px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            新規会場登録
          </button>
          <button onClick={() => onNavigate('venue-search')} style={{ padding: '12px 24px', background: 'white', color: '#4CAF50', border: '1px solid #4CAF50', borderRadius: '8px', cursor: 'pointer' }}>
            会場検索・比較
          </button>
          <button onClick={() => onNavigate('ai-support')} style={{ padding: '12px 24px', background: 'white', color: '#4CAF50', border: '1px solid #4CAF50', borderRadius: '8px', cursor: 'pointer' }}>
            AI入力支援
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>最近の更新情報</h3>
          <div>
            {[
              { id: 10, venue: 'NOCプラザ', action: '料金情報を更新', time: '10分前', user: '山田太郎', type: 'edit' },
              { id: 11, venue: 'ホテルニューキャッスル', action: '新規登録', time: '1時間前', user: '佐藤花子', type: 'new' },
              { id: 12, venue: 'じばさんプラザ', action: '控室情報を追加', time: '3時間前', user: '鈴木一郎', type: 'edit' },
              { id: 13, venue: '東京国際フォーラム', action: '設備情報を更新', time: '昨日', user: '田中美香', type: 'edit' },
              { id: 14, venue: '大阪国際会議場', action: '写真を追加', time: '2日前', user: '高橋次郎', type: 'edit' },
            ].map((item, index) => (
              <div key={index} style={{ 
                padding: '12px 0', 
                borderBottom: index < 4 ? '1px solid #E0E0E0' : 'none'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <div>
                    <span 
                      style={{ 
                        fontWeight: 500, 
                        color: '#2196F3', 
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                      onClick={() => {
                        setSelectedVenueId(item.id);
                        setCurrentPage('venue-detail');
                      }}
                    >
                      {item.venue}
                    </span>
                    <span style={{ color: '#757575', marginLeft: '8px' }}>- {item.action}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#9E9E9E' }}>{item.time}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#9E9E9E' }}>
                  更新者: {item.user}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>最近閲覧した会場</h3>
          <div>
            {recentlyViewed.map((item, index) => (
              <div 
                key={index} 
                style={{ 
                  padding: '12px 0', 
                  borderBottom: index < recentlyViewed.length - 1 ? '1px solid #E0E0E0' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onClick={() => {
                  setSelectedVenueId(item.id);
                  setCurrentPage('venue-detail');
                }}
              >
                <div>
                  <span style={{ fontWeight: 500, color: '#2196F3' }}>{item.name}</span>
                  <span style={{ color: '#757575', marginLeft: '8px' }}>- {item.area}</span>
                </div>
                <span style={{ fontSize: '12px', color: '#9E9E9E' }}>{item.lastViewed}</span>
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