// MultiFileUploader.tsx
import React from 'react';
import { supabase } from '../lib/supabase';

interface MultiFileUploaderProps {
  folder: string;
  files: string[];
  onUpload: (urls: string[]) => void;
  accept: 'image/*' | 'video/*';
}

export const MultiFileUploader: React.FC<MultiFileUploaderProps> = ({ folder, files, onUpload, accept }) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const uploadedUrls: string[] = [];

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const { data, error } = await supabase.storage
        .from(folder)
        .upload(`${Date.now()}_${file.name}`, file, { upsert: true });

      if (error) {
        console.error('Erro no upload:', error);
        continue;
      }

      const url = supabase.storage.from(folder).getPublicUrl(data.path).publicUrl;
      uploadedUrls.push(url);
    }

    onUpload(uploadedUrls);
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        multiple
        accept={accept}
        onChange={handleChange}
        className="mb-2"
      />
      <div className="flex flex-wrap gap-2">
        {files.map((url, idx) => (
          accept.startsWith('image') ? (
            <img key={idx} src={url} alt={`upload-${idx}`} className="h-24 w-24 object-cover rounded" />
          ) : (
            <video key={idx} src={url} className="h-32 w-48" controls />
          )
        ))}
      </div>
    </div>
  );
};
