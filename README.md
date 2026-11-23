# VoxFive - Sistema de Gestão de Feedbacks

![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-brightgreen)
![Java](https://img.shields.io/badge/Java-17+-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.5-green)
![React](https://img.shields.io/badge/React-18+-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)

## 1. Contexto Acadêmico

Este projeto foi desenvolvido como requisito obrigatório para a conclusão do Trabalho de Conclusão de Curso (TCC) do curso superior de tecnologia em Análise e Desenvolvimento de Sistemas do SENAI.

O escopo do sistema foi idealizado e construído durante a **Saga SENAI**, uma iniciativa que conecta desafios de empresas reais com a academia. O objetivo central deste projeto foi resolver um problema prático de uma empresa parceira, que necessitava de uma ferramenta segura, rastreável e eficiente para centralizar o recebimento de feedbacks, sugestões e reclamações de seus clientes e colaboradores.

## 2. Visão Geral do Projeto

O VoxFive é uma aplicação full-stack voltada para o recebimento, gestão e análise de feedbacks. O sistema possui um controle rigoroso de acesso baseado em perfis (Roles), uma interface administrativa completa para análise de dados e um mecanismo de auditoria para rastreamento de ações sensíveis.

### 2.1. Funcionalidades por Perfil

**Usuários (Role: USER):**
- Autenticação, cadastro seguro e recuperação de senha.
- Envio de novos feedbacks categorizados.
- Acompanhamento do status das próprias solicitações.
- Leitura das respostas encaminhadas pela equipe administrativa.

**Administradores (Role: ADMIN):**
- Gestão de Feedbacks: Visualização global, respostas oficiais e exclusão de registros.
- Dashboard Gerencial: Métricas de volume, taxa de resolução, pendências e distribuição por categoria.
- Consultas Avançadas: Filtros customizados por data, tipo e status, com renderização em tabela.
- Gestão de Acessos: Capacidade exclusiva de provisionar novas contas com privilégios de Administrador.
- Trilha de Auditoria (Audit Logs): Registro imutável de ações sensíveis (exclusões e criação de admins), contendo autor, ação e data/hora.

## 3. Arquitetura e Segurança (Backend)

O backend foi construído com forte ênfase em AppSec (Segurança de Aplicações), implementando as seguintes camadas de proteção:

- **Autenticação Stateless com JWT:** Uso de accessToken de curta duração e refreshToken com rotação e blacklist.
- **Criptografia de Senhas:** Hashes gerados via BCryptPasswordEncoder (fator de custo 12) com DelegatingPasswordEncoder.
- **Rate Limiting:** Controle de requisições em rotas críticas (login, refresh, cadastro) utilizando janela deslizante em memória, prevenindo ataques de força bruta.
- **Honeypot:** Endpoints iscas que registram tentativas de varredura e bloqueiam preventivamente o IP do atacante.
- **CORS Restrito:** Configuração estrita para aceitar chamadas apenas da origem do Frontend React.
- **Prevenção de Vazamento de Dados:** Tratamento global de exceções sem expor stacktraces ou mensagens internas.
- **Headers de Segurança:** Implementação de HSTS, X-Frame-Options, Content-Security-Policy e Referrer-Policy.
- **Banco de Dados Versionado:** Uso de Flyway para controle de migrações (V1 a V4) e integridade do schema.
- **Arquitetura em Camadas:** Separação estrita (Controller -> Service -> Repository), uso de DTOs (Records) e mapeamento com MapStruct.
- **Trilha de Auditoria:** Interceptação de operações críticas de escrita para registro persistente em banco de dados.

## 4. Tecnologias Utilizadas

**Backend:**
- Java 17
- Spring Boot 3 (Web, Data JPA, Validation, Security, Actuator)
- MySQL 8
- Flyway Migration
- JSON Web Tokens (JJWT)
- Lombok e MapStruct

**Frontend:**
- React.js com Vite
- React Router DOM (Navegação SPA e proteção de rotas)
- Axios (Consumo de API com interceptadores para renovação de token)
- Context API (Gestão de estado de autenticação)

## 5. Instruções de Execução

### 5.1. Pré-requisitos
- Java Development Kit (JDK) 17 ou superior.
- Node.js (v18+) e NPM.
- Servidor MySQL ativo (porta padrão 3306).

### 5.2. Configuração do Backend

1. Acesse o diretório do backend: `cd prjVoxFive`
2. Configure as credenciais do banco de dados no arquivo `src/main/resources/application-dev.yml`:
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/db_voxFive?createDatabaseIfNotExist=true
       username: root
       password: SUA_SENHA_AQUI
   app:
     jwt:
       secret: dev-only-secret-change-me-please-32bytes-long
