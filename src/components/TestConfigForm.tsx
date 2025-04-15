
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface TestConfig {
  obfuscationTests: {
    classNameObfuscation: boolean;
    stringEncryption: boolean;
    controlFlowObfuscation: boolean;
    watermarkCheck: boolean;
  };
  functionalTests: {
    enabled: boolean;
    customTestCommand: string;
    timeoutSeconds: number;
  };
  securityTests: {
    enabled: boolean;
    decompilationProtection: boolean;
    antiDebug: boolean;
  };
}

interface TestConfigFormProps {
  config: TestConfig;
  onChange: (config: TestConfig) => void;
}

const TestConfigForm: React.FC<TestConfigFormProps> = ({ config, onChange }) => {
  const handleConfigChange = (section: keyof TestConfig, key: string, value: boolean | string | number) => {
    const newConfig = { ...config };
    
    // @ts-ignore
    newConfig[section][key] = value;
    onChange(newConfig);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Testes de Ofuscação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="classNameObfuscation" 
                checked={config.obfuscationTests.classNameObfuscation}
                onCheckedChange={(checked) => 
                  handleConfigChange('obfuscationTests', 'classNameObfuscation', !!checked)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="classNameObfuscation">Ofuscação de nomes de classes</Label>
                <p className="text-sm text-gray-500">
                  Verifica se os nomes das classes e métodos foram ofuscados
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="stringEncryption" 
                checked={config.obfuscationTests.stringEncryption}
                onCheckedChange={(checked) => 
                  handleConfigChange('obfuscationTests', 'stringEncryption', !!checked)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="stringEncryption">Criptografia de strings</Label>
                <p className="text-sm text-gray-500">
                  Verifica se as strings no código foram criptografadas
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="controlFlowObfuscation" 
                checked={config.obfuscationTests.controlFlowObfuscation}
                onCheckedChange={(checked) => 
                  handleConfigChange('obfuscationTests', 'controlFlowObfuscation', !!checked)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="controlFlowObfuscation">Ofuscação de fluxo de controle</Label>
                <p className="text-sm text-gray-500">
                  Verifica se o fluxo de controle foi ofuscado
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="watermarkCheck" 
                checked={config.obfuscationTests.watermarkCheck}
                onCheckedChange={(checked) => 
                  handleConfigChange('obfuscationTests', 'watermarkCheck', !!checked)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="watermarkCheck">Verificação de marca d'água</Label>
                <p className="text-sm text-gray-500">
                  Verifica se há marcas d'água no código
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Testes Funcionais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="functionalEnabled" 
                checked={config.functionalTests.enabled}
                onCheckedChange={(checked) => 
                  handleConfigChange('functionalTests', 'enabled', !!checked)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="functionalEnabled">Ativar testes funcionais</Label>
                <p className="text-sm text-gray-500">
                  Executa testes funcionais na aplicação ofuscada
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Testes de Segurança</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="securityEnabled" 
                checked={config.securityTests.enabled}
                onCheckedChange={(checked) => 
                  handleConfigChange('securityTests', 'enabled', !!checked)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="securityEnabled">Ativar testes de segurança</Label>
                <p className="text-sm text-gray-500">
                  Verifica proteções de segurança na aplicação
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="decompilationProtection" 
                checked={config.securityTests.decompilationProtection}
                onCheckedChange={(checked) => 
                  handleConfigChange('securityTests', 'decompilationProtection', !!checked)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="decompilationProtection">Proteção contra descompilação</Label>
                <p className="text-sm text-gray-500">
                  Verifica se há proteções contra descompilação
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="antiDebug" 
                checked={config.securityTests.antiDebug}
                onCheckedChange={(checked) => 
                  handleConfigChange('securityTests', 'antiDebug', !!checked)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="antiDebug">Proteção anti-debug</Label>
                <p className="text-sm text-gray-500">
                  Verifica se há proteções contra depuração
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestConfigForm;
