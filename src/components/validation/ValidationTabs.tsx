
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Cog, CheckCircle } from 'lucide-react';

interface ValidationTabsProps {
  activeTab: string;
  canProceedFromUpload: boolean;
  canProceedFromConfig: boolean;
  isValidating: boolean;
}

const ValidationTabs: React.FC<ValidationTabsProps> = ({
  activeTab,
  canProceedFromUpload,
  canProceedFromConfig,
  isValidating
}) => {
  return (
    <TabsList className="grid w-full grid-cols-3 mb-8">
      <TabsTrigger 
        value="upload" 
        className="flex items-center justify-center"
        disabled={isValidating}
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload
      </TabsTrigger>
      <TabsTrigger 
        value="configure" 
        className="flex items-center justify-center"
        disabled={!canProceedFromUpload || isValidating}
      >
        <Cog className="h-4 w-4 mr-2" />
        Configuração
      </TabsTrigger>
      <TabsTrigger 
        value="validate" 
        className="flex items-center justify-center"
        disabled={!canProceedFromConfig || isValidating}
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        Validação
      </TabsTrigger>
    </TabsList>
  );
};

export default ValidationTabs;
