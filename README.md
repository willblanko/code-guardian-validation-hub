
# Code Guardian - Validação Hub para Aplicações Java Obfuscadas

Uma plataforma web de demonstração para simulação de validação de aplicações Java (.jar) obfuscadas.

## IMPORTANTE: Sobre a Natureza desta Aplicação

Esta aplicação é uma **demonstração** que simula o processo de validação de aplicações Java obfuscadas. 
**Ela não executa testes reais em arquivos JAR**. Para realizar testes reais, você precisará configurar um ambiente de teste adequado conforme descrito na seção "Configurando um Ambiente de Teste Real" abaixo.

## Funcionalidades Simuladas

- Upload de arquivos JAR obfuscados
- Configuração personalizada de testes de validação
- Verificação simulada de técnicas de obfuscação:
  - Obfuscação de nomes de classes
  - Criptografia de strings
  - Obfuscação de fluxo de controle
  - Verificação de marca d'água digital
- Simulação de testes funcionais
- Validação simulada de proteções de segurança:
  - Resistência à descompilação
  - Proteções anti-debug
- Geração de relatórios detalhados em PDF e certificados de validação
- Armazenamento de histórico de testes em banco de dados

## Como usar a Demonstração

1. **Upload do arquivo JAR**: Faça o upload do seu arquivo Java (.jar) obfuscado.
2. **Configuração dos testes**: Selecione quais aspectos da obfuscação deseja simular a validação.
3. **Execução da simulação**: Inicie o processo automatizado de validação simulada.
4. **Análise dos resultados**: Verifique os resultados detalhados da simulação.
5. **Exportação de evidências**: Baixe o relatório detalhado em PDF e o certificado de validação.

## Configurando um Ambiente de Teste Real

Para realizar testes reais em aplicações Java obfuscadas, recomendamos configurar um ambiente de teste dedicado com as seguintes ferramentas:

### 1. SonarQube para Análise de Código

O SonarQube é uma plataforma de análise contínua de qualidade de código que pode detectar problemas de segurança e qualidade.

**Instalação e Configuração:**

```bash
# Instalar SonarQube via Docker
docker run -d --name sonarqube -p 9000:9000 sonarqube:latest

# Analisar um projeto Java
./gradlew sonarqube \
  -Dsonar.projectKey=meu-projeto \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=token-gerado-no-sonarqube
```

**Integração com Java:**
1. Adicione o plugin SonarQube ao seu projeto Gradle ou Maven
2. Configure as propriedades do SonarQube no arquivo build.gradle ou pom.xml
3. Execute a análise e acesse os resultados através da interface web

### 2. Ferramentas de Descompilação e Análise de Bytecode

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

### 3. Frameworks para Análise Avançada

#### JStillery
Framework para desofuscação de JavaScript embutido em aplicações Java.

```bash
# Clone o repositório
git clone https://github.com/mindedsecurity/JStillery.git
cd JStillery

# Instale as dependências
npm install

# Execute a interface web
npm start
```

#### BOOM (Bytecode Obfuscation Open Metrics)
Ferramenta para medir a eficácia da ofuscação de bytecode Java.

```bash
# Clone o repositório
git clone https://github.com/pnfsoftware/boom
cd boom

# Construa com Gradle
./gradlew build

# Execute a análise
java -jar build/libs/boom.jar analisar seu-arquivo.jar
```

### 4. Verificação de Proteções Anti-Debug

Para testar proteções anti-debug em aplicações Java:

1. **Utilize JDB (Java Debugger):**
   ```bash
   jdb -classpath seu-arquivo.jar nome.da.ClassePrincipal
   ```

2. **Teste com VisualVM:**
   ```bash
   visualvm --jdkhome /caminho/para/jdk
   ```
   Depois conecte-se à JVM alvo para verificar se a aplicação detecta a conexão do depurador.

### 5. Verificação de Licença e Hardware

Para testes de validação de licença com hardware:

1. **Emulação de Hardware USB:**
   Use o QEMU USB passthrough ou dispositivos virtuais USB para simular diferentes ambientes de hardware.

2. **Monitoramento de Chamadas do Sistema:**
   ```bash
   strace -f -e trace=file java -jar seu-arquivo.jar
   ```
   Isso monitora as operações de arquivo realizadas pela aplicação, útil para rastrear verificações de licença baseadas em arquivo.

3. **Monitoramento de Acesso a Hardware:**
   ```bash
   ltrace -f java -jar seu-arquivo.jar
   ```
   Para rastrear chamadas de biblioteca que podem estar acessando informações de hardware.

## Notas importantes

- Para testes reais e completos, recomenda-se um ambiente isolado e seguro.
- As ferramentas mencionadas podem exigir conhecimentos avançados em segurança e engenharia reversa.
- Utilize estas ferramentas apenas em aplicações que você tem permissão legal para analisar.
- Os resultados de ferramentas automatizadas devem ser sempre validados manualmente por especialistas.

## URL do projeto de demonstração

**URL**: https://lovable.dev/projects/5094207c-8eab-48fc-a094-377df1aade8f
