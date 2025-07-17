import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const InquiryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [readInquiries, setReadInquiries] = useState(new Set());
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    // localStorageから既読状態を取得
    const savedReadInquiries = localStorage.getItem('readInquiries');
    if (savedReadInquiries) {
      setReadInquiries(new Set(JSON.parse(savedReadInquiries)));
    }

    // localStorageから問い合わせデータを取得
    const savedInquiries = localStorage.getItem('inquiries');
    if (savedInquiries) {
      const inquiries = JSON.parse(savedInquiries);
      const foundInquiry = inquiries.find(inq => inq.id === parseInt(id));
      if (foundInquiry) {
        setInquiry(foundInquiry);
        
        // 既読状態を更新
        const newReadInquiries = new Set(readInquiries);
        newReadInquiries.add(parseInt(id));
        setReadInquiries(newReadInquiries);
        localStorage.setItem('readInquiries', JSON.stringify([...newReadInquiries]));
      }
    }
  }, [id]);

  const updateInquiryStatus = (newStatus) => {
    if (!inquiry) return;

    // localStorageから問い合わせデータを取得
    const savedInquiries = localStorage.getItem('inquiries');
    if (savedInquiries) {
      const inquiries = JSON.parse(savedInquiries);
      const updatedInquiries = inquiries.map(inq => 
        inq.id === inquiry.id ? { ...inq, status: newStatus } : inq
      );
      
      // localStorageを更新
      localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
      
      // 現在の問い合わせ状態を更新
      setInquiry({ ...inquiry, status: newStatus });
      
      // 通知を表示
      setNotificationMessage(`ステータスを「${newStatus}」に変更しました`);
      setShowNotification(true);
      
      // 3秒後に通知を非表示
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!inquiry) {
    return (
      <div className="container mx-auto p-4">
        <div className="box">
          <p>問い合わせが見つかりません。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* 通知 */}
      {showNotification && (
        <div className="notification is-success is-light" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, minWidth: '300px' }}>
          <button className="delete" onClick={() => setShowNotification(false)}></button>
          <span className="icon-text">
            <span className="icon">
              <i className="fas fa-check"></i>
            </span>
            <span>{notificationMessage}</span>
          </span>
        </div>
      )}
      
      <div className="box" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div className="columns is-vcentered">
          <div className="column">
            <h1 className="title has-text-white mb-0">
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-envelope-open"></i>
                </span>
                <span>問い合わせ詳細</span>
              </span>
            </h1>
          </div>
          <div className="column is-narrow">
            <button 
              className="button is-white is-outlined"
              onClick={() => navigate('/inquiries')}
            >
              <span className="icon">
                <i className="fas fa-arrow-left"></i>
              </span>
              <span>一覧に戻る</span>
            </button>
          </div>
        </div>
      </div>

      <div className="box mt-4">
        {/* ヘッダー情報 */}
        <div className="columns is-multiline">
          <div className="column is-8">
            <h2 className="title is-4">{inquiry.title}</h2>
            <p className="subtitle is-6 has-text-grey">
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
                <span>{inquiry.customerName}</span>
              </span>
            </p>
          </div>
          <div className="column is-4">
            <div className="has-text-right">
              <p className="is-size-7 has-text-grey">
                {formatDate(inquiry.createdAt)}
              </p>
              {readInquiries.has(inquiry.id) && (
                <span className="tag is-success is-light">
                  <span className="icon">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>既読</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ステータス情報 */}
        <div className="columns is-multiline mb-4">
          <div className="column is-3">
            <span className={`tag ${getPriorityColor(inquiry.priority)} is-medium`}>
              <span className="icon">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
              <span>優先度: {inquiry.priority}</span>
            </span>
          </div>
          <div className="column is-3">
            <span className={`tag ${getStatusColor(inquiry.status)} is-medium`}>
              <span className="icon">
                <i className="fas fa-tasks"></i>
              </span>
              <span>ステータス: {inquiry.status}</span>
            </span>
          </div>
          <div className="column is-3">
            <span className="tag is-info is-medium">
              <span className="icon">
                <i className="fas fa-tag"></i>
              </span>
              <span>カテゴリ: {inquiry.category}</span>
            </span>
          </div>
        </div>

        {/* 連絡先情報 */}
        <div className="box has-background-light">
          <h3 className="title is-5">
            <span className="icon-text">
              <span className="icon">
                <i className="fas fa-address-card"></i>
              </span>
              <span>連絡先情報</span>
            </span>
          </h3>
          <div className="columns">
            <div className="column is-6">
              <p>
                <strong>メールアドレス:</strong><br />
                <a href={`mailto:${inquiry.email}`} className="has-text-link">
                  {inquiry.email}
                </a>
              </p>
            </div>
            <div className="column is-6">
              <p>
                <strong>電話番号:</strong><br />
                <a href={`tel:${inquiry.phone}`} className="has-text-link">
                  {inquiry.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* 問い合わせ内容 */}
        <div className="box">
          <h3 className="title is-5">
            <span className="icon-text">
              <span className="icon">
                <i className="fas fa-comment"></i>
              </span>
              <span>問い合わせ内容</span>
            </span>
          </h3>
          <div className="content">
            <div className="box has-background-white-ter">
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {inquiry.message}
              </p>
            </div>
          </div>
        </div>

        {/* ステータス変更 */}
        <div className="box has-background-light">
          <h3 className="title is-5">
            <span className="icon-text">
              <span className="icon">
                <i className="fas fa-edit"></i>
              </span>
              <span>ステータス変更</span>
            </span>
          </h3>
          <div className="columns is-centered">
            <div className="column is-narrow">
              <div className="buttons">
                <button 
                  className={`button ${inquiry.status === '未対応' ? 'is-danger' : 'is-danger is-outlined'}`}
                  onClick={() => updateInquiryStatus('未対応')}
                >
                  <span className="icon">
                    <i className="fas fa-exclamation-circle"></i>
                  </span>
                  <span>未対応</span>
                </button>
                <button 
                  className={`button ${inquiry.status === '対応中' ? 'is-warning' : 'is-warning is-outlined'}`}
                  onClick={() => updateInquiryStatus('対応中')}
                >
                  <span className="icon">
                    <i className="fas fa-clock"></i>
                  </span>
                  <span>対応中</span>
                </button>
                <button 
                  className={`button ${inquiry.status === '完了' ? 'is-success' : 'is-success is-outlined'}`}
                  onClick={() => updateInquiryStatus('完了')}
                >
                  <span className="icon">
                    <i className="fas fa-check-circle"></i>
                  </span>
                  <span>対応完了</span>
                </button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default InquiryDetail; 