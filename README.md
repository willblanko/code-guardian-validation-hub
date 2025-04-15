
# Code Guardian - Validação Hub para Aplicações Java Obfuscadas

Uma plataforma web para análise, descompilação e comparação detalhada de aplicações Java (.jar) ofuscadas.

## Sobre Esta Aplicação

Esta aplicação realiza a validação e comparação estrutural de arquivos JAR ofuscados com suas versões originais, utilizando o arquivo mapping.txt gerado pelo ProGuard. A plataforma oferece:

- Upload de arquivos JAR (original e ofuscado) e mapping.txt
- Análise detalhada das técnicas de ofuscação aplicadas
- Comparação estrutural entre versões original e ofuscada
- Detalhamento das diferenças encontradas (classes, métodos e campos)
- Análise de classes não mapeadas
- Geração de relatórios detalhados e certificados de validação

## Como Usar a Aplicação

1. **Upload de Arquivos**:
   - Carregue o arquivo JAR original (não ofuscado)
   - Carregue o arquivo JAR ofuscado que deseja analisar
   - Carregue o arquivo mapping.txt gerado pelo ofuscador (recomendado para análise precisa)

2. **Iniciar Análise**:
   - Após carregar os arquivos necessários, clique no botão "Iniciar Análise de Ofuscação"
   - A plataforma realizará a análise estrutural e comparação dos arquivos

3. **Visualização dos Resultados**:
   - Veja estatísticas detalhadas sobre as diferenças e correspondências encontradas
   - Explore a lista de classes não mapeadas
   - Consulte o detalhamento das diferenças específicas (renomeação de classes, métodos e campos)
   - Analise as técnicas de ofuscação detectadas

4. **Exportação de Relatórios**:
   - Baixe o relatório detalhado em PDF com todas as diferenças encontradas
   - Exporte o certificado de validação
   - Salve os resultados para consulta futura

## Como Funciona a Análise

A plataforma realiza uma análise em duas etapas:

1. **Análise Estática**: Examina o arquivo JAR ofuscado para detectar padrões típicos de ofuscação, como nomes de classes alterados, strings criptografadas e fluxo de controle modificado.

2. **Análise Comparativa**: Compara estruturalmente o JAR original com o JAR ofuscado, usando o arquivo mapping.txt como referência para mapear classes, métodos e campos entre as duas versões.

Após estas análises, a plataforma gera um relatório detalhado sobre a eficácia das técnicas de ofuscação aplicadas e fornece métricas precisas sobre as diferenças encontradas.

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

2. **YGuard**
   - Ferramenta gratuita de ofuscação para projetos Java
   - Suporte para ofuscação de nomes e criptografia de strings
   - [Site Oficial do YGuard](https://www.yworks.com/products/yguard)
   - Integração com Maven e Ant

## URL do projeto de demonstração

**URL**: https://lovable.dev/projects/5094207c-8eab-48fc-a094-377df1aade8f

