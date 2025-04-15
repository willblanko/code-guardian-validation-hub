
# Code Guardian - Validação Hub para Aplicações Java Obfuscadas

Uma plataforma web para análise e comparação de aplicações Java (.jar) ofuscadas.

## Sobre Esta Aplicação

Esta aplicação oferece validação estática de arquivos JAR e comparação entre versões original e ofuscada usando o arquivo mapping.txt gerado pelo ProGuard. A plataforma inclui:

- Upload de arquivos JAR (original e ofuscado) e mapping.txt
- Análise estática de ofuscação
- Validação de transformações realizadas pelo ofuscador
- Comparação entre versões do código
- Integração com serviços de descompilação online

## Ferramentas Recomendadas para Ofuscação de Java

### Ferramentas Gratuitas

1. **ProGuard**
   - Ferramenta gratuita e de código aberto para ofuscação, otimização e redução de código Java
   - [Site Oficial do ProGuard](https://www.guardsquare.com/proguard)
   - Exemplo de uso:
     ```bash
     java -jar proguard.jar @config.pro
     ```

2. **YGuard**
   - Ferramenta gratuita de ofuscação para projetos Java
   - Suporte para ofuscação de nomes e criptografia de strings
   - [Site Oficial do YGuard](https://www.yworks.com/products/yguard)
   - Integração com Maven e Ant

## Ferramentas de Análise de Ofuscação

### 1. Descompiladores para Análise

#### CFR (Class File Reader)
Um descompilador Java de código aberto que processa arquivos .class e .jar.

```bash
# Uso básico
java -jar cfr.jar seu-arquivo.jar --outputdir saida/

# Para verificar obfuscação
java -jar cfr.jar seu-arquivo.jar --outputdir saida/ --stringbuilder false --decodestringswitch false
```

#### Fernflower
Descompilador analítico para Java, usado como backend pelo IntelliJ IDEA.

```bash
# Uso básico
java -jar fernflower.jar seu-arquivo.jar diretorio-saida/
```

#### Procyon
Descompilador Java com bom suporte para recursos de linguagem mais recentes.

```bash
# Instalação
wget https://bitbucket.org/mstrobel/procyon/downloads/procyon-decompiler-0.5.36.jar

# Uso
java -jar procyon-decompiler-0.5.36.jar seu-arquivo.class
```

#### Bytecode Viewer
Conjunto de ferramentas para engenharia reversa de aplicações Java.

1. Baixe o Bytecode Viewer do GitHub: https://github.com/Konloch/bytecode-viewer/releases
2. Execute: `java -jar BytecodeViewer.jar`
3. Carregue seu arquivo JAR e utilize as múltiplas visualizações de bytecode e descompiladores

### 2. Como usar o arquivo mapping.txt do ProGuard

O ProGuard gera um arquivo mapping.txt que mapeia nomes originais para nomes ofuscados.

1. **Habilitando a geração do arquivo mapping.txt**
   ```
   -printmapping mapping.txt
   ```

2. **Exemplo de conteúdo do mapping.txt**
   ```
   com.example.MyClass -> a.b.c:
       int originalField -> a
       void originalMethod() -> a
   ```

3. **Usando o mapping.txt para desofuscar mensagens de erro**
   ```bash
   java -jar proguard.jar -retrace mapping.txt stacktrace.txt
   ```

## Uso desta Aplicação para Validação

### Passos para Validação Completa

1. Prepare seus arquivos:
   - O arquivo JAR original (não ofuscado)
   - O arquivo JAR ofuscado (após processamento com ProGuard ou YGuard)
   - O arquivo mapping.txt gerado pelo ofuscador

2. Carregue os arquivos na plataforma

3. Configure as verificações desejadas

4. Analise os resultados:
   - Verifique as técnicas de ofuscação detectadas
   - Revise as classes não mapeadas
   - Compare as versões do código usando o serviço de descompilação

5. Baixe o relatório detalhado da análise

## URL do projeto de demonstração

**URL**: https://lovable.dev/projects/5094207c-8eab-48fc-a094-377df1aade8f
