import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, X } from 'lucide-react';

interface MultiFileUploaderProps {
  folder: string;
  files: string[];
  onUpload: (urls: string[]) => void;
  accept: 'image/*' | 'video/*';
}

export const MultiFileUploader: React.FC<MultiFileUploaderProps> = ({ 
  folder, 
  files, 
  onUpload, 
  accept 
}) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${i}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('imagens')
          .upload(filePath, file, { upsert: true });

        if (uploadError) {
          console.error('Erro no upload:', uploadError);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from('imagens')
          .getPublicUrl(filePath);

        if (urlData?.publicUrl) {
          uploadedUrls.push(urlData.publicUrl);
        }
      }

      if (uploadedUrls.length > 0) {
        // **Substituímos o array completo**, evitando duplicações
         onUpload(uploadedUrls);
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload dos ficheiros');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    onUpload(updatedFiles);
  };

  return (
    <div className="space-y-4">
      {/* File Preview */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((url, index) => (
            <div key={index} className="relative">
              {accept.startsWith('image') ? (
                <img
                  src={url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-gray-300"
                />
              ) : (
                <video
                  src={url}
                  className="w-full h-24 object-cover rounded-lg border border-gray-300"
                  controls
                />
              )}
              <button
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      <div>
        <label className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">
                {uploading ? 'A carregar...' : 'Clique para carregar ficheiros'}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              {accept.startsWith('image') ? 'PNG, JPG ou JPEG' : 'MP4, MOV ou AVI'} (MAX. 50MB cada)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept={accept}
            multiple
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
};
