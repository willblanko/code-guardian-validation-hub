
import React, { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { UploadCloud, File, CheckCircle, X } from 'lucide-react';

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  }, []);

  const processFile = (file: File) => {
    if (!file.name.endsWith('.jar')) {
      toast({
        title: "Formato de arquivo inválido",
        description: "Por favor, selecione um arquivo JAR (.jar)",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedFile(file);
    onFileSelected(file);
    
    toast({
      title: "Arquivo selecionado",
      description: `${file.name} (${formatFileSize(file.size)})`,
      variant: "default"
    });
  };

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div 
          className={`dropzone ${isDragging ? 'dropzone-active' : 'border-gray-300 hover:border-guardian-blue'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <UploadCloud className="w-12 h-12 mb-3 text-guardian-blue" />
            <h3 className="mb-2 font-semibold text-lg">Arraste e solte o arquivo JAR</h3>
            <p className="mb-4 text-sm text-gray-500">ou clique para selecionar o arquivo</p>
            <Button asChild>
              <label className="cursor-pointer">
                Selecionar arquivo
                <input
                  type="file"
                  accept=".jar"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4 border rounded-lg bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-md border">
                <File className="h-8 w-8 text-guardian-blue" />
              </div>
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center mt-3">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm text-green-600">Arquivo pronto para validação</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
