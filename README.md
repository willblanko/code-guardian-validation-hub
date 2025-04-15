
# Code Guardian - Validação Hub para Aplicações Java Obfuscadas

Uma plataforma web para análise, descompilação e comparação de aplicações Java (.jar) ofuscadas.

## Sobre Esta Aplicação

Esta aplicação realiza a validação e comparação de arquivos JAR ofuscados com suas versões originais, utilizando o arquivo mapping.txt gerado pelo ProGuard. A plataforma oferece:

- Upload de arquivos JAR (original e ofuscado) e mapping.txt
- Descompilação dos arquivos JAR para análise do código-fonte
- Comparação entre versões original e ofuscada usando o mapping.txt
- Análise detalhada das técnicas de ofuscação aplicadas
- Estatísticas de correspondências e diferenças encontradas
- Geração de relatórios detalhados e certificados de validação

## Como Usar a Aplicação

1. **Upload de Arquivos**:
   - Carregue o arquivo JAR original (não ofuscado)
   - Carregue o arquivo JAR ofuscado
   - Carregue o arquivo mapping.txt gerado pelo ofuscador

2. **Iniciar Análise**:
   - Após carregar todos os arquivos, clique no botão "Iniciar Análise de Ofuscação"
   - A plataforma realizará a descompilação e comparação dos arquivos

3. **Visualização dos Resultados**:
   - Veja estatísticas sobre as diferenças e correspondências encontradas
   - Analise a lista de classes não mapeadas
   - Consulte os detalhes sobre as técnicas de ofuscação detectadas

4. **Exportação de Relatórios**:
   - Baixe o relatório detalhado em PDF
   - Exporte o certificado de validação
   - Salve os resultados para consulta futura

## Ferramentas Recomendadas para Ofuscação de Java

### Ferramentas Gratuitas

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

## Tecnologias Utilizadas

- Frontend: React, TypeScript, Tailwind CSS
- Descompilação: Integração com serviços de descompilação Java
- Processamento: Análise e comparação de bytecode Java
- Exportação: Geração de relatórios PDF e certificados

## URL do projeto de demonstração

**URL**: https://lovable.dev/projects/5094207c-8eab-48fc-a094-377df1aade8f

