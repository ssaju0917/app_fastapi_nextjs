import React from 'react';
import clsx from 'clsx'; // クラス名結合ライブラリ

type ButtonProps = {
    variant?: 'primary' | 'ghost';
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

export function Button({
    variant = 'primary',
    children,
    className,
}: ButtonProps) {
    // ベースとなる共通スタイル
    const base = 'px-4 py-2 rounded-md font-medium transition-all duration-200;'
    
    // バリデーションごとのスタイル定義
    const styles = variant === 'primary'
        ? 'bg-teal-600 text-white hover:bg-teal-500 shadow-sm'
        : 'bg-transparent text-slate-300 border border-slate-600 hover:bg-slate-800';

    return (
        <button
            className={clsx(base, styles, className)}
        >
            {children}
        </button>
    );
}