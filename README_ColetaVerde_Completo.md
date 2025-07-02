# ♻️ Coleta Verde

Aplicativo híbrido desenvolvido em **Ionic + Angular** como projeto de TCC no curso técnico de Desenvolvimento de Sistemas pela ETEC.

O **Coleta Verde** conecta empresas que precisam de serviços de coleta de resíduos com prestadores de serviço (pessoas físicas), promovendo sustentabilidade ambiental e geração de renda.

---

## 🎯 Objetivo

Criar uma plataforma onde empresas possam:
- Solicitar a coleta de lixo, entulho e materiais recicláveis
- Agendar o serviço com data, horário e valor sugerido
- Acompanhar o andamento do serviço

E onde prestadores de serviço possam:
- Visualizar solicitações abertas
- Aceitar coletas e prestar o serviço
- Receber uma remuneração extra pelo trabalho

---

## 📲 Tecnologias utilizadas

- **Ionic Framework** (mobile híbrido)
- **Angular** (estrutura do app)
- **Firebase (Firestore)** – Banco de dados em tempo real
- **Google Maps API** (opcional para localização)
- **ViaCEP API** – Consulta automática de endereços via CEP

---

## 🖼️ Funcionalidades principais

- Cadastro e login para empresas e prestadores
- Sistema de autenticação com JWT
- Cadastro de endereços
- Solicitação de coleta com descrição, valor e agendamento
- Tela de carteira com saldo, extrato e solicitação de saque
- Lista de solicitações abertas para prestadores aceitarem
- Histórico de serviços
- Avaliação e feedback após a coleta

---

## 🚀 Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/Gustavo-Pereira-Carvalho/coleta-verde.git

# Instale as dependências
npm install

# Execute o app no navegador
ionic serve
```

> ⚠️ É necessário ter o Ionic CLI instalado: `npm install -g @ionic/cli`

---

## 📷 Capturas de Tela

> As imagens abaixo são ilustrativas. Substitua pelos prints reais na pasta `./screenshots/`.

### Tela de Solicitação de Coleta (Empresa)
![Solicitação de Coleta](./screenshots/solicitacao.png)

### Tela Home da Empresa
![Home da Empresa](./screenshots/home-empresa.png)

### Tela de Carteira do Prestador
![Carteira do Prestador](./screenshots/carteira.png)

---

## 👨‍💻 Minha participação no projeto

Fui responsável pelo desenvolvimento de telas essenciais para a experiência do usuário:

- 🟢 **Tela de Solicitação de Coleta** (empresas preenchem dados do serviço)
- 🏠 **Tela Home da Empresa**
- 💼 **Tela de Carteira do Prestador**, com saldo acumulado, botão de saque, extrato (com dados fictícios no momento)

---

## 🧪 Status do projeto

🚧 Em desenvolvimento contínuo — melhorias em andamento.

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos. Todos os direitos reservados © 2025 Gustavo Pereira Carvalho.
