
import React, { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { UploadCloud, File, CheckCircle, X, AlertCircle } from 'lucide-react';

interface FileUploaderProps {
  onFilesSelected: (files: {
    originalJar?: File,
    obfuscatedJar?: File,
    mappingFile?: File
  }) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{
    originalJar?: File,
    obfuscatedJar?: File,
    mappingFile?: File
  }>({});

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, fileType: keyof typeof selectedFiles) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file, fileType);
    }
  }, [selectedFiles]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, fileType: keyof typeof selectedFiles) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file, fileType);
    }
  }, [selectedFiles]);

  const processFile = (file: File, fileType: keyof typeof selectedFiles) => {
    // Validação de arquivos
    if (fileType === 'originalJar' || fileType === 'obfuscatedJar') {
      if (!file.name.endsWith('.jar')) {
        toast({
          title: "Formato de arquivo inválido",
          description: "Por favor, selecione um arquivo JAR (.jar)",
          variant: "destructive"
        });
        return;
      }
    } else if (fileType === 'mappingFile') {
      if (!file.name.endsWith('.txt')) {
        toast({
          title: "Formato de arquivo inválido",
          description: "Por favor, selecione um arquivo mapping.txt",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Cria um novo objeto mantendo os arquivos existentes e adicionando/substituindo o novo
    const updatedFiles = { ...selectedFiles, [fileType]: file };
    setSelectedFiles(updatedFiles);
    
    // Enviamos os arquivos atualizados para o componente pai
    onFilesSelected(updatedFiles);
    
    toast({
      title: "Arquivo selecionado",
      description: `${file.name} (${formatFileSize(file.size)})`,
      variant: "default"
    });
  };

  const handleRemoveFile = useCallback((fileType: keyof typeof selectedFiles) => {
    const updatedFiles = { ...selectedFiles };
    delete updatedFiles[fileType];
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  }, [selectedFiles, onFilesSelected]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderFileUploader = (fileType: keyof typeof selectedFiles, label: string, description: string, accept: string) => {
    const selectedFile = selectedFiles[fileType];
    
    return (
      <div className="w-full mb-6">
        <h3 className="text-lg font-medium mb-2">{label}</h3>
        {!selectedFile ? (
          <div 
            className={`dropzone border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${isDragging ? 'border-guardian-blue bg-blue-50' : 'border-gray-300 hover:border-guardian-blue'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, fileType)}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <UploadCloud className="w-12 h-12 mb-3 text-guardian-blue" />
              <p className="mb-4 text-sm text-gray-500">{description}</p>
              <Button asChild>
                <label className="cursor-pointer">
                  Selecionar arquivo
                  <input
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, fileType)}
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
              <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(fileType)}>
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

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 p-4 rounded-md text-orange-800 mb-6">
        <div className="flex">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
          <div>
            <p className="font-medium">Para análise completa, carregue três arquivos:</p>
            <ol className="list-decimal list-inside mt-2 ml-4 space-y-1 text-sm">
              <li>JAR original (não ofuscado)</li>
              <li>JAR ofuscado (com ProGuard ou YGuard)</li>
              <li>Arquivo mapping.txt gerado pelo ofuscador</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {renderFileUploader('originalJar', 'Arquivo JAR Original', 'Carregue o arquivo JAR antes da ofuscação', '.jar')}
        {renderFileUploader('obfuscatedJar', 'Arquivo JAR Ofuscado', 'Carregue o arquivo JAR após a ofuscação', '.jar')}
        {renderFileUploader('mappingFile', 'Arquivo Mapping', 'Carregue o arquivo mapping.txt gerado pelo ProGuard', '.txt')}
      </div>
      
      <div className="flex justify-between items-center p-4 border rounded-lg bg-gray-50">
        <div>
          <p className="font-medium">Status dos arquivos:</p>
          <div className="text-sm text-gray-600 mt-1">
            <p>
              {selectedFiles.originalJar ? (
                <span className="text-green-600">✓ JAR Original</span>
              ) : (
                <span className="text-gray-400">○ JAR Original não carregado</span>
              )}
            </p>
            <p>
              {selectedFiles.obfuscatedJar ? (
                <span className="text-green-600">✓ JAR Ofuscado</span>
              ) : (
                <span className="text-gray-400">○ JAR Ofuscado não carregado</span>
              )}
            </p>
            <p>
              {selectedFiles.mappingFile ? (
                <span className="text-green-600">✓ Arquivo Mapping</span>
              ) : (
                <span className="text-gray-400">○ Arquivo Mapping não carregado</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
