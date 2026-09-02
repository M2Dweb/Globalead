import React, { useEffect, useState } from 'react';
import { uploadToR2 } from '../lib/uploadToR2';
import { compressImage } from '../lib/compressImage';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  folder: string;
  onUpload: (url: string) => void;
  onUploadComplete?: (data: { url: string; key: string }) => void;
  value?: string;
  adminPassword?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ folder, onUpload, onUploadComplete, value, adminPassword = '' }) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(value || '');

  // Mantém a pré-visualização alinhada com o formulário. Sem isto, ao trocar de
  // registo (ou depois de limpar o formulário) continuava a ver-se a imagem anterior.
  useEffect(() => {
    setImageUrl(value || '');
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // Comprime/redimensiona a imagem no browser antes de subir
      file = await compressImage(file);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { url, key } = await uploadToR2(file, filePath, adminPassword);

      setImageUrl(url);
      onUpload(url);
      if (onUploadComplete) {
        onUploadComplete({ url, key });
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao carregar a imagem: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImageUrl('');
    onUpload('');
    // Limpa também a referência ao ficheiro no R2 (image_url / image_key).
    if (onUploadComplete) {
      onUploadComplete({ url: '', key: '' });
    }
  };

  return (
    <div className="space-y-4">
      {imageUrl && (
        <div className="relative inline-block">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div>
        <label className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">
                {uploading ? 'A carregar...' : 'Clique para carregar'}
              </span>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG ou JPEG (MAX. 10MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;