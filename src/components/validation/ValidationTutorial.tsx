
import React from 'react';

const ValidationTutorial: React.FC = () => {
  return (
    <div className="mt-10 border-t pt-8">
      <h2 className="text-xl font-semibold mb-4">Tutorial de Validação</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">1. Preparação dos Arquivos</h3>
          <p className="text-gray-600">
            Antes de iniciar a validação, você precisa preparar três arquivos:
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
            Faça o upload dos três arquivos na plataforma. Todos os arquivos devem estar nos formatos corretos:
            arquivos JAR (.jar) para as aplicações, e arquivo de texto (.txt) para o mapping.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">3. Execução da Análise</h3>
          <p className="text-gray-600">
            Após carregar todos os arquivos necessários, clique no botão "Iniciar Análise de Ofuscação".
            O sistema irá descompilar os arquivos JAR, comparar o código original com o ofuscado
            utilizando o arquivo mapping.txt, e exibir os resultados em tempo real.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">4. Análise dos Resultados</h3>
          <p className="text-gray-600">
            Após a conclusão da análise, você terá acesso a:
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-600">
            <li>Visão detalhada das técnicas de ofuscação aplicadas</li>
            <li>Comparação entre versões original e ofuscada do código</li>
            <li>Lista de classes não mapeadas no arquivo mapping.txt</li>
            <li>Estatísticas sobre correspondências e diferenças encontradas</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">5. Exportação dos Resultados</h3>
          <p className="text-gray-600">
            Exporte o relatório detalhado em PDF ou texto, e o certificado de validação.
            Estes documentos contêm informações completas sobre as técnicas de ofuscação
            detectadas e o nível de proteção alcançado.
          </p>
        </div>
        
        <div className="space-y-2 bg-blue-50 p-4 rounded-md border border-blue-200">
          <h3 className="text-lg font-medium text-blue-800">Sobre o Processo de Descompilação</h3>
          <p className="text-blue-700">
            A plataforma utiliza tecnologias de descompilação Java para analisar o bytecode
            dos arquivos JAR. São comparadas as estruturas de classes, métodos e campos 
            entre as versões original e ofuscada, utilizando o arquivo mapping.txt para
            correlacionar os nomes originais com os ofuscados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValidationTutorial;
