
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
- Geração de relatórios detalhados em PDF e certificados de validação
- Armazenamento de histórico de testes em banco de dados

## Como usar

1. **Upload do arquivo JAR**: Faça o upload do seu arquivo Java (.jar) obfuscado.
2. **Configuração dos testes**: Selecione quais aspectos da obfuscação deseja validar.
3. **Execução da validação**: Inicie o processo automatizado de validação.
4. **Análise dos resultados**: Verifique os resultados detalhados da validação.
5. **Exportação de evidências**: Baixe o relatório detalhado em PDF e o certificado de validação.

## Tipos de Testes Realizados

### Testes de Obfuscação

#### 1. Obfuscação de Nomes de Classes
Verifica se os nomes das classes foram devidamente ofuscados para evitar sua identificação fácil por técnicas de engenharia reversa. Classes com nomes ofuscados dificultam a compreensão da estrutura do programa por potenciais atacantes.

**O que é verificado:**
- Análise das classes no arquivo JAR para detectar padrões de nomes não-significativos
- Verificação da ausência de nomes originais e significativos nas classes
- Avaliação da consistência da ofuscação em todo o código

#### 2. Criptografia de Strings
Avalia se as strings no código foram criptografadas para proteger mensagens, URLs, chaves e outros dados sensíveis. A criptografia de strings impede que informações sensíveis sejam facilmente lidas de um arquivo descompilado.

**O que é verificado:**
- Detecção de mecanismos de descriptografia de strings em tempo de execução
- Verificação da ausência de strings literais significativas no bytecode
- Análise da implementação das técnicas de ocultação de strings

#### 3. Obfuscação de Fluxo de Controle
Analisa se a estrutura do fluxo de controle (condicionais, loops) foi alterada para dificultar a análise estática e dinâmica do código. A obfuscação de fluxo torna o código mais difícil de seguir e entender.

**O que é verificado:**
- Detecção de instruções opacas e predicados invariantes
- Identificação de código morto inserido estrategicamente
- Análise de fluxos de execução não-convencionais

#### 4. Verificação de Marca d'água Digital
Verifica a presença de marca d'água digital inserida durante o processo de obfuscação, útil para rastreabilidade e proteção de propriedade intelectual.

**O que é verificado:**
- Detecção de marcas d'água estáticas ou dinâmicas
- Verificação da integridade da marca d'água
- Análise da resistência da marca d'água a manipulações

### Testes Funcionais

Executa a aplicação para garantir que, apesar da obfuscação, ela mantém todas as funcionalidades originais e não apresenta erros de execução. É fundamental que o processo de obfuscação não afete o comportamento esperado da aplicação.

**O que é verificado:**
- Inicialização correta da aplicação
- Execução de funcionalidades básicas
- Verificação de comportamento sob diferentes entradas
- Análise de desempenho comparado à versão não-obfuscada

### Testes de Segurança

#### 1. Proteção contra Descompilação
Avalia a resistência do código contra tentativas de descompilação, verificando se ferramentas comuns não conseguem reverter o bytecode para código fonte legível.

**O que é verificado:**
- Tentativas de descompilação com ferramentas populares
- Análise da qualidade do código recuperado
- Identificação de barreiras anti-descompilação

#### 2. Proteções Anti-Debug
Testa a presença de proteções contra debugging, que dificultam a análise dinâmica do código em tempo de execução. Mecanismos anti-debug podem detectar e responder a tentativas de depuração.

**O que é verificado:**
- Detecção de mecanismos que identificam debuggers
- Análise de proteções contra manipulação de memória
- Verificação de respostas a tentativas de debugging

## Tecnologias utilizadas

- React com TypeScript
- Tailwind CSS para estilização
- Componentes UI modernos e responsivos
- Sistema de validação automatizada
- Geração de relatórios em PDF
- Armazenamento em banco de dados Supabase

## Notas importantes

- O sistema não armazena os arquivos JAR enviados após a conclusão da validação.
- Os relatórios gerados seguem as boas práticas de mercado para validação de software.
- Os certificados podem ser usados como evidência formal do processo de validação.

## URL do projeto

**URL**: https://lovable.dev/projects/5094207c-8eab-48fc-a094-377df1aade8f
