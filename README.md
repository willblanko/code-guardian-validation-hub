
# Code Guardian - Validação Hub para Aplicações Java Obfuscadas

Uma plataforma web avançada para análise real, descompilação e comparação detalhada de aplicações Java (.jar) ofuscadas.

## Sobre Esta Aplicação

Esta aplicação realiza a validação e comparação estrutural de arquivos JAR ofuscados com suas versões originais, utilizando o arquivo mapping.txt gerado pelo ProGuard. A plataforma oferece:

- Upload de arquivos JAR (original e ofuscado) e mapping.txt
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
   - A plataforma realizará a análise real e comparação dos arquivos

3. **Visualização dos Resultados**:
   - Veja estatísticas detalhadas sobre as diferenças e correspondências encontradas
   - Explore a lista de classes não mapeadas
   - Consulte o detalhamento das diferenças específicas (renomeação de classes, métodos e campos)
   - Analise as técnicas de ofuscação detectadas no bytecode

4. **Exportação de Relatórios**:
   - Baixe o relatório detalhado em PDF com todas as diferenças encontradas
   - Exporte o certificado de validação
   - Salve os resultados para consulta futura

## Como Funciona a Análise

A plataforma realiza uma análise profunda em várias etapas:

1. **Análise Estática**: Examina o arquivo JAR ofuscado para detectar padrões típicos de ofuscação, como:
   - Nomes de classes ofuscados
   - Strings criptografadas
   - Fluxo de controle modificado
   - Código morto inserido
   - Proteções anti-debugging

2. **Análise Comparativa**: Compara estruturalmente o JAR original com o JAR ofuscado, usando:
   - Mapeamento de classes via arquivo mapping.txt
   - Análise de bytecode para detecção de modificações
   - Comparação de assinaturas de classes e métodos

3. **Geração de Relatório**: Produz uma análise detalhada das diferenças, incluindo:
   - Métodos e campos renomeados
   - Técnicas de ofuscação detectadas por classe
   - Recomendações de segurança

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

## Análise Real vs. Simulação

Esta aplicação realiza uma análise real do bytecode Java dos arquivos JAR fornecidos. A análise inclui:

- Leitura real das assinaturas de classe (bytecode)
- Comparação estrutural do código
- Análise dos mapeamentos do ProGuard
- Detecção de padrões reais de ofuscação

A análise é realizada diretamente no navegador usando técnicas avançadas de processamento de bytecode, sem a necessidade de enviar arquivos para servidores externos.
