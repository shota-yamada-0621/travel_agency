import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Inquiries = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [readInquiries, setReadInquiries] = useState(new Set());

  // サンプルデータ
  const sampleInquiries = [
    {
      id: 1,
      title: "ツアーの予約について",
      customerName: "田中太郎",
      email: "tanaka@example.com",
      phone: "090-1234-5678",
      category: "予約",
      priority: "高",
      status: "未対応",
      message: "来月の沖縄ツアーについて詳しく知りたいです。家族4人で参加予定です。",
      createdAt: "2024-01-15T10:30:00",
      isRead: false
    },
    {
      id: 2,
      title: "キャンセルポリシーについて",
      customerName: "佐藤花子",
      email: "sato@example.com",
      phone: "080-9876-5432",
      category: "キャンセル",
      priority: "中",
      status: "対応中",
      message: "急な用事で旅行をキャンセルしたいのですが、返金は可能でしょうか？",
      createdAt: "2024-01-14T15:45:00",
      isRead: false
    },
    {
      id: 3,
      title: "ホテルの変更希望",
      customerName: "鈴木一郎",
      email: "suzuki@example.com",
      phone: "070-5555-1234",
      category: "変更",
      priority: "高",
      status: "未対応",
      message: "予約したホテルを別のホテルに変更したいです。可能でしょうか？",
      createdAt: "2024-01-13T09:15:00",
      isRead: false
    },
    {
      id: 4,
      title: "料金についての質問",
      customerName: "高橋美咲",
      email: "takahashi@example.com",
      phone: "090-7777-8888",
      category: "料金",
      priority: "中",
      status: "完了",
      message: "表示されている料金に含まれているものと含まれていないものを教えてください。",
      createdAt: "2024-01-12T14:20:00",
      isRead: true
    },
    {
      id: 5,
      title: "海外旅行の保険について",
      customerName: "渡辺健太",
      email: "watanabe@example.com",
      phone: "080-3333-4444",
      category: "保険",
      priority: "低",
      status: "完了",
      message: "海外旅行保険の加入は必須でしょうか？また、どのような補償内容でしょうか？",
      createdAt: "2024-01-11T11:00:00",
      isRead: true
    },
    {
      id: 6,
      title: "ツアーガイドの言語対応",
      customerName: "伊藤由美",
      email: "ito@example.com",
      phone: "090-6666-7777",
      category: "サービス",
      priority: "中",
      status: "対応中",
      message: "英語のツアーガイドは利用できますか？海外からのお客様が同行します。",
      createdAt: "2024-01-10T16:30:00",
      isRead: false
    },
    {
      id: 7,
      title: "食事のアレルギー対応",
      customerName: "山田恵子",
      email: "yamada@example.com",
      phone: "080-8888-9999",
      category: "食事",
      priority: "高",
      status: "未対応",
      message: "食物アレルギーがあるため、食事の対応をお願いできますか？",
      createdAt: "2024-01-09T13:45:00",
      isRead: false
    },
    {
      id: 8,
      title: "集合場所の詳細",
      customerName: "中村大輔",
      email: "nakamura@example.com",
      phone: "070-1111-2222",
      category: "集合",
      priority: "中",
      status: "完了",
      message: "ツアー当日の集合場所と時間を詳しく教えてください。",
      createdAt: "2024-01-08T10:15:00",
      isRead: true
    },
    {
      id: 9,
      title: "天候による変更について",
      customerName: "小林麻衣",
      email: "kobayashi@example.com",
      phone: "090-4444-5555",
      category: "変更",
      priority: "高",
      status: "未対応",
      message: "悪天候でツアーが変更になる場合の対応について教えてください。",
      createdAt: "2024-01-07T15:20:00",
      isRead: false
    },
    {
      id: 10,
      title: "写真撮影について",
      customerName: "加藤隆",
      email: "kato@example.com",
      phone: "080-2222-3333",
      category: "サービス",
      priority: "低",
      status: "完了",
      message: "ツアー中の写真撮影サービスはありますか？料金は別途でしょうか？",
      createdAt: "2024-01-06T12:00:00",
      isRead: true
    }
  ];

  useEffect(() => {
    // localStorageから既読状態を取得
    const savedReadInquiries = localStorage.getItem('readInquiries');
    if (savedReadInquiries) {
      setReadInquiries(new Set(JSON.parse(savedReadInquiries)));
    }

    // localStorageから問い合わせデータを取得、なければサンプルデータを使用
    const savedInquiries = localStorage.getItem('inquiries');
    if (savedInquiries) {
      setInquiries(JSON.parse(savedInquiries));
    } else {
      setInquiries(sampleInquiries);
      localStorage.setItem('inquiries', JSON.stringify(sampleInquiries));
    }
  }, []);

  const handleInquiryClick = (inquiryId) => {
    // 既読状態を更新
    const newReadInquiries = new Set(readInquiries);
    newReadInquiries.add(inquiryId);
    setReadInquiries(newReadInquiries);
    localStorage.setItem('readInquiries', JSON.stringify([...newReadInquiries]));
    
    // 詳細ページに遷移
    navigate(`/inquiries/${inquiryId}`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case '高': return 'has-text-danger';
      case '中': return 'has-text-warning';
      case '低': return 'has-text-success';
      default: return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '未対応': return 'is-danger';
      case '対応中': return 'is-warning';
      case '完了': return 'is-success';
      default: return 'is-light';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="box" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <h1 className="title has-text-white mb-0">
          <span className="icon-text">
            <span className="icon">
              <i className="fas fa-envelope"></i>
            </span>
            <span>問い合わせ管理</span>
          </span>
        </h1>
        <p className="subtitle has-text-white is-6 mt-2">
          未対応のものから優先して確認してください
        </p>
      </div>

      <div className="box mt-4">
        <div className="columns is-multiline">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="column is-12">
              <div 
                className={`box inquiry-item ${readInquiries.has(inquiry.id) ? 'is-read' : 'is-unread'}`}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderLeft: readInquiries.has(inquiry.id) ? '4px solid #48c774' : '4px solid #f14668',
                  background: readInquiries.has(inquiry.id) ? '#f5f5f5' : 'white'
                }}
                onClick={() => handleInquiryClick(inquiry.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                <div className="columns is-mobile is-vcentered">
                  <div className="column is-1">
                    <div className="has-text-centered">
                      {readInquiries.has(inquiry.id) ? (
                        <span className="icon has-text-success">
                          <i className="fas fa-check-circle"></i>
                        </span>
                      ) : (
                        <span className="icon has-text-danger">
                          <i className="fas fa-circle"></i>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="column is-3">
                    <p className={`${!readInquiries.has(inquiry.id) ? 'has-text-weight-bold' : ''}`}>
                      {inquiry.title}
                    </p>
                    <p className="is-size-7 has-text-grey">
                      {inquiry.customerName}
                    </p>
                  </div>
                  
                  <div className="column is-2">
                    <span className={`tag ${getPriorityColor(inquiry.priority)}`}>
                      {inquiry.priority}
                    </span>
                  </div>
                  
                  <div className="column is-2">
                    <span className={`tag ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </div>
                  
                  <div className="column is-2">
                    <span className="tag is-info is-light">
                      {inquiry.category}
                    </span>
                  </div>
                  
                  <div className="column is-2">
                    <p className="is-size-7 has-text-grey">
                      {formatDate(inquiry.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inquiries; 