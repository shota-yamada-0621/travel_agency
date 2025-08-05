// src/components/CsvExportButton.jsx
import React from 'react';

const CsvExportButton = ({ data, headers, filename = 'export.csv', buttonText = 'CSV出力', className = 'button is-link' }) => {
  const convertToCsv = (data, headers) => {
    if (!data || data.length === 0) {
      return '';
    }

    // ヘッダー行の生成
    const headerKeys = headers.map(header => header.key);
    const headerRow = headers.map(header => header.label).join(',');

    // データ行の生成
    const dataRows = data.map(row => {
      return headerKeys.map(key => {
        const value = row[key];
        // CSVの特殊文字をエスケープする
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',');
    });

    return [headerRow, ...dataRows].join('\n');
  };

  const handleExport = () => {
    const csvContent = convertToCsv(data, headers);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button onClick={handleExport} className={className}>
      {buttonText}
    </button>
  );
};

export default CsvExportButton;