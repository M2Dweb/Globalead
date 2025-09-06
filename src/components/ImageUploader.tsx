import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface ImageUploaderProps {
  value?: string;
  onUploadComplete: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | undefined>(value);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const filePath = `uploads/${Date.now()}_${file.name}`;

    setUploading(true);
    setError(null);

    const { error } = await supabase.storage
      .from('imagens')
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error(error);
      setError('Falha no upload da imagem.');
      setUploading(false);
      return;
    }

    const url = supabase.storage.from('imagens').getPublicUrl(filePath).data.publicUrl;
    setPreview(url);
    onUploadComplete(url);
    setUploading(false);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p className="text-sm text-gray-500">A carregar...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {preview && <img src={preview} alt="Preview" className="mt-2 w-40 h-40 object-cover rounded" />}
    </div>
  );
};

export default ImageUploader;
