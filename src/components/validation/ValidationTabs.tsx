
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Upload } from 'lucide-react';

interface ValidationTabsProps {
  allFilesUploaded: boolean;
  isValidating: boolean;
  onStartValidation: () => void;
}

const ValidationTabs: React.FC<ValidationTabsProps> = ({
  allFilesUploaded,
  isValidating,
  onStartValidation
}) => {
  return (
    <div className="flex justify-center mb-8">
      <Button 
        className="px-6 py-2 text-white bg-guardian-blue hover:bg-blue-700"
        disabled={!allFilesUploaded || isValidating}
        onClick={onStartValidation}
      >
        {isValidating ? (
          <div className="flex items-center">
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-50 border-t-transparent rounded-full" />
            Analisando...
          </div>
        ) : (
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Iniciar Análise de Ofuscação
          </div>
        )}
      </Button>
    </div>
  );
};

export default ValidationTabs;
