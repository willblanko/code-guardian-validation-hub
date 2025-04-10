
import React from 'react';

const ValidationTutorial: React.FC = () => {
  return (
    <div className="mt-10 border-t pt-8">
      <h2 className="text-xl font-semibold mb-4">Tutorial de Validação</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">1. Preparação do Arquivo</h3>
          <p className="text-gray-600">
            Antes de iniciar a validação, certifique-se de que sua aplicação Java está corretamente obfuscada
            utilizando ferramentas como ProGuard, DexGuard ou similares. O arquivo deve estar no formato JAR (.jar).
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">2. Upload do Arquivo</h3>
          <p className="text-gray-600">
            Faça o upload do arquivo JAR obfuscado na plataforma. O sistema aceitará apenas arquivos com a extensão .jar.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">3. Configuração dos Testes</h3>
          <p className="text-gray-600">
            Configure quais aspectos da obfuscação deseja validar, como:
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-600">
            <li>Verificação de obfuscação de nomes de classes</li>
            <li>Validação de criptografia de strings</li>
            <li>Verificação de obfuscação de fluxo de controle</li>
            <li>Testes funcionais para garantir que a aplicação mantém seu comportamento esperado</li>
            <li>Testes de segurança para verificar proteções contra descompilação e debugging</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">4. Execução da Validação</h3>
          <p className="text-gray-600">
            Inicie o processo de validação. O sistema executará automaticamente todos os testes configurados
            e exibirá o progresso em tempo real.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">5. Análise dos Resultados</h3>
          <p className="text-gray-600">
            Após a conclusão da validação, analise os resultados detalhados para verificar se a obfuscação
            foi implementada corretamente e se a aplicação mantém sua funcionalidade.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">6. Exportação de Evidências</h3>
          <p className="text-gray-600">
            Exporte o relatório detalhado e o certificado de validação. Estes documentos servem como evidências
            formais de que sua aplicação passou pelos testes de validação e está adequadamente protegida
            contra engenharia reversa.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValidationTutorial;
