
import React from 'react';

const ValidationTutorial: React.FC = () => {
  return (
    <div className="mt-10 border-t pt-8">
      <h2 className="text-xl font-semibold mb-4">Tutorial de Validação</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">1. Preparação dos Arquivos</h3>
          <p className="text-gray-600">
            Para realizar uma validação completa, você precisará de:
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-600">
            <li>O arquivo JAR original (não ofuscado)</li>
            <li>O arquivo JAR ofuscado (após processamento com ProGuard ou similar)</li>
            <li>O arquivo mapping.txt gerado pelo ofuscador</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">2. Upload dos Arquivos</h3>
          <p className="text-gray-600">
            Faça o upload dos três arquivos na plataforma. É necessário que todos os arquivos
            estejam nos formatos corretos: arquivos JAR (.jar) para as aplicações, e arquivo 
            de texto (.txt) para o mapping.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">3. Análise e Comparação</h3>
          <p className="text-gray-600">
            Após carregar todos os arquivos necessários, clique no botão "Iniciar Análise de Ofuscação".
            O sistema realizará uma comparação detalhada entre o JAR original e o ofuscado,
            utilizando o arquivo mapping.txt para correlacionar classes e métodos.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">4. Relatório Detalhado</h3>
          <p className="text-gray-600">
            Após a conclusão da análise, você receberá:
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-600">
            <li>Métricas de correspondência e diferenças entre os arquivos</li>
            <li>Lista de classes não mapeadas no arquivo mapping.txt</li>
            <li>Avaliação das técnicas de ofuscação detectadas</li>
            <li>Recomendações para melhorar a segurança da aplicação</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">5. Exportação e Certificação</h3>
          <p className="text-gray-600">
            Você pode exportar o relatório completo em formato PDF, baixar um certificado
            de validação, ou salvar os resultados para referência futura.
          </p>
        </div>
        
        <div className="space-y-2 bg-blue-50 p-4 rounded-md border border-blue-200">
          <h3 className="text-lg font-medium text-blue-800">Sobre o Processo de Análise</h3>
          <p className="text-blue-700">
            A plataforma utiliza algoritmos avançados para comparar os bytecodes Java,
            identificar padrões de ofuscação e avaliar a eficácia das técnicas aplicadas.
            O arquivo mapping.txt é essencial para correlacionar com precisão os elementos
            originais com suas versões ofuscadas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValidationTutorial;
