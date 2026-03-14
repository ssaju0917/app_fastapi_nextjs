import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Card({ title, children, footer }: CardProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
        {/* ヘッダーエリア */}
        <div className="px-6 py-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        {/* コンテンツエリア */}
        <div className="px-6 py-4 text-slate-300">
            {children}
        </div>
        
        {/* フッターエリア（オプション） */}
        {footer && (
            <div className="px-6 py-4 border-t border-slate-900/50 bg-slate-700">
                {footer}
            </div>
        )}
    </div>
  );
}