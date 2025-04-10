
# Code Guardian - Validação Hub para Aplicações Java Obfuscadas

Uma plataforma web para validação automática de aplicações Java (.jar) obfuscadas, que verifica a eficácia da obfuscação e realiza testes funcionais, gerando relatórios detalhados e certificados de validação.

## Funcionalidades

- Upload de arquivos JAR obfuscados
- Configuração personalizada de testes de validação
- Verificação de técnicas de obfuscação:
  - Obfuscação de nomes de classes
  - Criptografia de strings
  - Obfuscação de fluxo de controle
  - Verificação de marca d'água digital
- Testes funcionais para garantir comportamento correto da aplicação
- Validação de proteções de segurança:
  - Resistência à descompilação
  - Proteções anti-debug
- Geração de relatórios detalhados e certificados de validação

## Como usar

1. **Upload do arquivo JAR**: Faça o upload do seu arquivo Java (.jar) obfuscado.
2. **Configuração dos testes**: Selecione quais aspectos da obfuscação deseja validar.
3. **Execução da validação**: Inicie o processo automatizado de validação.
4. **Análise dos resultados**: Verifique os resultados detalhados da validação.
5. **Exportação de evidências**: Baixe o relatório detalhado e o certificado de validação.

## Tecnologias utilizadas

- React com TypeScript
- Tailwind CSS para estilização
- Componentes UI modernos e responsivos
- Sistema de validação automatizada

## Tutorial de validação

### 1. Preparação do arquivo

Antes de iniciar a validação, certifique-se de que sua aplicação Java está corretamente obfuscada utilizando ferramentas como ProGuard, DexGuard ou similares. O arquivo deve estar no formato JAR (.jar).

### 2. Upload do arquivo

Faça o upload do arquivo JAR obfuscado na plataforma. O sistema aceitará apenas arquivos com a extensão .jar.

### 3. Configuração dos testes

Configure quais aspectos da obfuscação deseja validar, como:
- Verificação de obfuscação de nomes de classes
- Validação de criptografia de strings
- Verificação de obfuscação de fluxo de controle
- Testes funcionais para garantir que a aplicação mantém seu comportamento esperado
- Testes de segurança para verificar proteções contra descompilação e debugging

### 4. Execução da validação

Inicie o processo de validação. O sistema executará automaticamente todos os testes configurados e exibirá o progresso em tempo real.

### 5. Análise dos resultados

Após a conclusão da validação, analise os resultados detalhados para verificar se a obfuscação foi implementada corretamente e se a aplicação mantém sua funcionalidade.

### 6. Exportação de evidências

Exporte o relatório detalhado e o certificado de validação. Estes documentos servem como evidências formais de que sua aplicação passou pelos testes de validação e está adequadamente protegida contra engenharia reversa.

## Notas importantes

- O sistema não armazena os arquivos JAR enviados após a conclusão da validação.
- A validação é realizada inteiramente no navegador, garantindo a segurança e confidencialidade do seu código.
- Os relatórios gerados seguem as boas práticas de mercado para validação de software.

## URL do projeto

**URL**: https://lovable.dev/projects/5094207c-8eab-48fc-a094-377df1aade8f
