import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  folder: 'properties' | 'blog'; // Define a pasta
  onUpload: (url: string) => void; // Retorna a URL da imagem
  value?: string; // URL já existente (edição)
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ folder, onUpload, value }) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(value || '');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from('imagens') // Nome do bucket
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error('Erro ao fazer upload:', error.message);
      setUploading(false);
      return;
    }

    // Pega a URL pública
    const { publicURL, error: urlError } = supabase.storage
      .from('imagens')
      .getPublicUrl(filePath);

    if (urlError) {
      console.error('Erro ao obter URL pública:', urlError.message);
      setUploading(false);
      return;
    }

    setImageUrl(publicURL || '');
    onUpload(publicURL || '');
    setUploading(false);
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      {imageUrl && (
        <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
      )}
      <label className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700">
        <Upload className="w-4 h-4" />
        <span>{uploading ? 'A carregar...' : 'Escolher imagem'}</span>
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
};

export default ImageUploader;
