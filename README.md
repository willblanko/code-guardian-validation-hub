
# Code Guardian - Validação Hub para Aplicações Java Obfuscadas

Uma plataforma web para análise estática de aplicações Java (.jar) obfuscadas.

## Sobre Esta Aplicação

Esta aplicação fornece uma validação básica de arquivos JAR e orientações sobre como realizar análises mais profundas de ofuscação usando ferramentas especializadas.

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

3. **Allatori (versão gratuita)**
   - Versão comunitária com recursos básicos
   - [Site Oficial do Allatori](https://www.allatori.com/)

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

### 2. SonarQube para Análise de Qualidade e Segurança

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

### 3. Framework para Desofuscação de JavaScript em Java

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
