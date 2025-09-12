import React from 'react';

interface ContentRendererProps {
  content: string;
  className?: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content, className = "" }) => {
  return (
    <div 
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{
        lineHeight: '1.6'
      }}
    />
  );
};

export default ContentRenderer;