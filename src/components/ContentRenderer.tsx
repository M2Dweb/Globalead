import React from 'react';
import '../styles/ContentRenderer.css';

interface ContentRendererProps {
  content: string;
  className?: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content, className = "" }) => {
  // Se o conteúdo for vazio ou apenas espaços, não renderizar nada
  if (!content || content.trim() === '') {
    return null;
  }
  
  return (
    <div
      className={`content-renderer prose max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{ lineHeight: '1.6', wordBreak: 'break-word' }}
    />
  );
};

export default ContentRenderer;