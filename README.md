# 📄 Gerador de Currículo em PDF

![Screenshot App](./public/images/screenshot.JPG)

Projeto desenvolvido em **React + Next.js + TypeScript**, com geração de currículo em PDF utilizando **@react-pdf/renderer**.

## 📌 Descrição

Este projeto permite que o usuário preencha suas informações profissionais em um formulário multi-etapas com opção de foto e uma paleta de cores que, ao final, gera seu currículo personalizado em PDF.

O usuário pode:

- Preencher seus **dados pessoais**
- Definir seu **perfil pessoal e objetivo profissional**
- Informar sua **formação acadêmica**
- Adicionar suas **experiências profissionais**
- Fazer upload de uma **foto de perfil**
- Escolher o **modelo de currículo**
- Personalizar a **cor do cabeçalho**

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@react-pdf/renderer](https://react-pdf.org/)

## 📂 Estrutura do Projeto

```bash
📁 src
├── components
│   └── CurriculoModelo01.tsx
├── hooks
│   └── useFormData.ts
├── pages
│   ├── index.tsx
│   ├── preview.tsx
│   └── generate.tsx
├── styles
│   └── globals.css
└── types
    └── formTypes.ts
bash
Copiar
Editar
```

## 📝 Como Usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/gerador-curriculo-pdf.git
   Instale as dependências:
   ```

```bash
npm install
```

Rode o projeto:

```bash
npm run dev
```

Acesse http://localhost:3000 no navegador.

## 🖨️ Gerando o PDF

Após preencher todas as informações:

Clique em "Gerar PDF"

O PDF será gerado dinamicamente e será feito o download.

## 📦 Dependências Principais

@react-pdf/renderer

react

next

typescript

tailwindcss

## 📄 Licença

Projeto desenvolvido para fins acadêmicos e de portfólio. Sinta-se à vontade para usar como base para seus projetos.
