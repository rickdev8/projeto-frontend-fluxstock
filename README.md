# 🖥️ FluxStock — Web Interface (Frontend)

Aplicação front-end do **FluxStock**, um sistema de controle e gestão de estoque focado em produtividade. A interface foi projetada do zero para ser rápida, minimalista e totalmente adaptável a diferentes tamanhos de tela.

> ⚠️ **Nota:** Este repositório representa a camada de visualização (*Client-side*). A aplicação consome a REST API do FluxStock. **[Acesse o repositório do Back-end aqui](COLOCAR_O_LINK_DO_REPO_DO_BACKEND_AQUI)**.

---

## ✨ Destaques da Interface & UX

* **Otimização de Buscas (*Debounce*):** Implementação de atraso programado nos inputs de pesquisa. A listagem só consulta a API após o usuário terminar de digitar, economizando largura de banda e poupando o servidor.
* **Componentes Modulares:** Estrutura baseada em componentes isolados e reutilizáveis, garantindo consistência visual em todo o sistema.
* **100% Responsivo:** Layout fluido testado para operação em Desktops (telas de estoque), Tablets e Smartphones (conferência rápida no galpão).
* **Tratamento de Estados:** Experiência visual amigável para carregamentos (*Skeletons/Loadings*), listas vazias (*Empty States*) e feedbacks de erro.
* **Rotas Protegidas:** Controle de navegação baseado em sessão de usuário via Token JWT.

---

## 🛠️ Tecnologias

* **[Next.js](https://nextjs.org/)** — Framework React 
* **TypeScript** — Tipagem estática e interfaces estritas
* **CSS Modules** — Estilização com escopo isolado (zero conflitos de cascata)
* **Lucide Icons** *(Ou troque pelo pacote de ícones que você usou, ex: Phosphor / React Icons)*
* **Vercel** — CI/CD e Hospedagem

---

## 🏛️ Estrutura de Arquivos

A organização do projeto segue boas práticas de separação de responsabilidades:

```text
src/
├── components/       # Componentes visuais genéricos (Buttons, Inputs, Modals)
├── hooks/            # Custom Hooks (ex: useDebounce, useAuth)
├── services/         # Configuração do cliente HTTP e chamadas da API
├── styles/           # Tokens globais de CSS, resets e variáveis de cores
├── types/            # Definições de tipagem estática (Interfaces do sistema)
└── pages/            # Rotas da aplicação (ou /app se usou App Router)
