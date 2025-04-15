
# Code Guardian - Validação Hub para Aplicações Java Obfuscadas

Uma plataforma web avançada para análise real, descompilação e comparação detalhada de aplicações Java (.jar) ofuscadas, com backend dedicado para processamento.

## Sobre Esta Aplicação

Esta aplicação realiza a validação e comparação estrutural de arquivos JAR ofuscados com suas versões originais, utilizando o arquivo mapping.txt gerado pelo ProGuard. A plataforma oferece:

- Upload de arquivos JAR (original e ofuscado) e mapping.txt
- Descompilação real dos arquivos Java através de um backend dedicado
- Análise detalhada das técnicas de ofuscação aplicadas
- Comparação estrutural real entre versões original e ofuscada
- Análise profunda do bytecode Java
- Detalhamento das diferenças encontradas (classes, métodos e campos)
- Análise de classes não mapeadas
- Geração de relatórios detalhados e certificados de validação

## Como Usar a Aplicação

1. **Upload de Arquivos**:
   - Carregue o arquivo JAR original (não ofuscado)
   - Carregue o arquivo JAR ofuscado que deseja analisar
   - Carregue o arquivo mapping.txt gerado pelo ofuscador (recomendado para análise precisa)

2. **Iniciar Análise**:
   - Após carregar os arquivos, clique no botão "Iniciar Análise de Ofuscação"
   - Os arquivos serão enviados para processamento no backend
   - A plataforma mostrará o progresso da análise em tempo real

3. **Visualização dos Resultados**:
   - Veja estatísticas detalhadas sobre as diferenças e correspondências encontradas
   - Explore a lista de classes não mapeadas
   - Consulte o detalhamento das diferenças específicas (renomeação de classes, métodos e campos)
   - Analise as técnicas de ofuscação detectadas no bytecode

4. **Exportação de Relatórios**:
   - Baixe o relatório detalhado em PDF com todas as diferenças encontradas
   - Exporte o certificado de validação
   - Salve os resultados para consulta futura

## Arquitetura da Solução

A aplicação utiliza uma arquitetura cliente-servidor:

1. **Frontend (React + TypeScript)**:
   - Interface web para upload de arquivos e visualização de resultados
   - Comunicação com o backend via API REST

2. **Backend de Análise (Serviço Dedicado)**:
   - API RESTful para processamento de arquivos JAR
   - Descompilação real de bytecode Java usando ferramentas como Fernflower ou CFR
   - Análise detalhada de classes, métodos e campos
   - Processamento do arquivo mapping.txt para correlação
   - Detecção de técnicas de ofuscação

## Implementação do Backend

O backend de análise de JARs é implementado como um serviço separado. Para executá-lo:

1. **Clone o repositório backend**:
   ```bash
   git clone https://github.com/codeguardian/jar-analysis-api
   cd jar-analysis-api
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` com:
   ```
   PORT=3001
   STORAGE_PATH=./storage
   MAX_UPLOAD_SIZE=50mb
   ```

4. **Inicie o servidor localmente**:
   ```bash
   npm start
   # ou
   yarn start
   ```

5. **Implantação do backend**:
   O backend pode ser implantado em provedores como:
   - [Render](https://render.com) (recomendado para implantação gratuita)
   - [Railway](https://railway.app)
   - [Netlify Functions](https://www.netlify.com/products/functions/)
   - [Vercel Serverless Functions](https://vercel.com/docs/functions)

## Como Funciona a Análise

A plataforma realiza uma análise em várias etapas:

1. **Pré-processamento**:
   - Upload dos arquivos para o backend
   - Extração dos JARs em diretórios temporários
   - Validação dos arquivos enviados

2. **Descompilação e Análise**:
   - Descompilação dos arquivos JAR usando decompiladores como Fernflower ou CFR
   - Análise da estrutura de classes, métodos e campos
   - Processamento do arquivo mapping.txt para correlação de elementos
   - Detecção de padrões de ofuscação nos arquivos compilados

3. **Comparação**:
   - Correspondência entre classes, métodos e campos
   - Identificação de elementos não mapeados
   - Detecção e classificação de diferenças
   - Geração de métricas detalhadas

4. **Geração de Relatório**:
   - Compilação dos resultados da análise
   - Formatação das diferenças encontradas
   - Criação do certificado de validação

## Detalhes da API do Backend

O backend expõe os seguintes endpoints:

- `POST /analyze/start`: Inicia um job de análise e retorna um jobId
- `GET /analyze/status/:jobId`: Verifica o status de um job de análise
- `GET /analyze/result/:jobId`: Obtém os resultados completos da análise

### Exemplo de Resposta da Análise

```json
{
  "differences": 512,
  "matches": 1936,
  "unmappedClasses": ["com.example.UnmappedClass1", "com.example.UnmappedClass2"],
  "diffDetails": [
    {
      "className": "com.example.MyClass",
      "type": "Class renamed",
      "original": "com.example.MyClass",
      "obfuscated": "a.b.c"
    },
    {
      "className": "com.example.MyClass",
      "type": "Method renamed",
      "original": "processData(String input)",
      "obfuscated": "a(String b)"
    }
  ],
  "decompileUrl": "http://www.javadecompilers.com/"
}
```

## Como o Arquivo mapping.txt é Utilizado

O arquivo mapping.txt gerado pelo ProGuard contém o mapeamento entre os nomes originais e os nomes ofuscados. Exemplo:

```
com.example.MyClass -> a.b.c:
    int originalField -> a
    void originalMethod() -> a
```

Este arquivo é essencial para:
- Correlacionar classes, métodos e campos entre as versões original e ofuscada
- Identificar elementos não mapeados
- Verificar a eficácia da ofuscação
- Gerar métricas precisas de correspondência

## Ferramentas Recomendadas para Ofuscação de Java

1. **ProGuard**
   - Ferramenta gratuita e de código aberto para ofuscação, otimização e redução de código Java
   - [Site Oficial do ProGuard](https://www.guardsquare.com/proguard)
   - Exemplo de uso com geração de mapping.txt:
     ```bash
     java -jar proguard.jar -printmapping mapping.txt @config.pro
     ```

2. **DexGuard** (Versão comercial para Android)
   - Proteção avançada para aplicativos Android
   - Inclui ofuscação, criptografia e anti-tamper
   - [Site Oficial do DexGuard](https://www.guardsquare.com/dexguard)

3. **YGuard**
   - Ferramenta gratuita de ofuscação para projetos Java
   - Suporte para ofuscação de nomes e criptografia de strings
   - [Site Oficial do YGuard](https://www.yworks.com/products/yguard)
   - Integração com Maven e Ant
