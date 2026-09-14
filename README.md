# Petshop do Bê - Fase 2

Site desenvolvido para a disciplina de Fundamentos de Sistemas Web (PUCRS), referente à **Fase 2** do projeto: plataforma online de comércio de produtos e serviços de um petshop.

## Estrutura de arquivos

```
├── index.html          → Página inicial (carrossel + status dinâmico da loja)
├── produtos.html        → Produtos por categoria, com filtro interativo
├── servicos.html         → Serviços de banho e tosa
├── agendamento.html      → Formulário de cadastro (cliente + pet) e agendamento
├── contato.html          → Contato e horário de funcionamento
├── css/
│   └── style.css        → Estilos personalizados (aplicados sobre o Bootstrap 5)
├── js/
│   └── main.js           → Funções JavaScript do site (comentadas)
├── images/                → Imagens dos produtos (mesma pasta da Fase 1)
└── README.md              → Este arquivo de ajuda
```

## Funcionalidades por página

- **index.html**: apresentação do petshop, carrossel (Bootstrap) com destaques de produtos e serviços, e uma faixa de status dinâmica que, via JavaScript, mostra uma saudação (Bom dia/Boa tarde/Boa noite) e informa se a loja está aberta ou fechada **no momento**, com base no horário do dispositivo do usuário.
- **produtos.html**: exibe os produtos das categorias (rações não perecíveis, acessórios/brinquedos, higiene e limpeza, saúde e cuidados), cada um com foto, descrição e valor, organizados em cards do Bootstrap. Um filtro de categorias (botões) permite mostrar apenas uma categoria por vez, usando JavaScript.
- **servicos.html**: exibe os serviços de banho e tosa (com e sem tele-busca), com descrição, valor e indicação de disponibilidade de tele-busca, além de um botão que leva à página de agendamento.
- **agendamento.html** *(nova nesta fase)*: formulário de cadastro do cliente (nome, CPF, telefone, e-mail, endereço, sexo) e do pet (nome, raça, idade, porte, restrições de saúde), com escolha do(s) serviço(s) desejado(s), da forma de atendimento (tele-busca ou entrega no local) e da data/horário do agendamento. O formulário usa JavaScript para:
  - definir a data mínima de agendamento (não permite datas passadas);
  - tornar o campo "Endereço" obrigatório apenas quando "Tele-busca" é selecionada;
  - exibir um campo de observações apenas se o cliente marcar que o pet tem alguma restrição de saúde;
  - validar o preenchimento e exibir, ao final, um resumo dinâmico do agendamento na tela.
- **contato.html**: canais de atendimento e horário de funcionamento, organizados em cards.

## Tecnologias utilizadas

- HTML5 semântico.
- **CSS3 / Bootstrap 5** (via CDN) para layout responsivo, navbar, cards, carrossel e formulários, complementado por um arquivo `css/style.css` próprio com a identidade visual do petshop.
- **JavaScript puro (vanilla JS)**, com funções comentadas em `js/main.js`, responsáveis pelo carrossel, pela saudação/status dinâmico (função temporal baseada em `Date()`), pelo filtro de produtos e pela lógica do formulário de agendamento.

## Acessibilidade

Como requisito de acessibilidade para deficientes visuais, foram adotadas as seguintes práticas:

- Atributo `alt` descritivo em todas as imagens do site (produtos e carrossel).
- Link "Pular para o conteúdo principal" (`skip-link`), visível ao navegar por teclado, permitindo pular o menu de navegação.
- Uso de `<label for="">` associando corretamente cada campo do formulário ao seu rótulo.
- Uso de `aria-live="polite"` na faixa de status da loja e no resumo do agendamento, para que leitores de tela anunciem essas atualizações dinâmicas.
- Uso de `aria-current="page"` no link de navegação da página atual e `aria-label` nos botões e regiões de navegação.
- Contorno de foco (`outline`) bem visível em links, botões e campos de formulário para navegação por teclado.

## Ajustes realizados em relação à Fase 1

- Adição do Bootstrap 5 e de um arquivo `css/style.css` próprio, antes inexistentes (Fase 1 usava apenas HTML puro).
- Padronização do cabeçalho como navbar responsiva (com menu recolhível em telas pequenas) e do rodapé, mantidos consistentes entre as páginas.
- Reorganização do código em arquivos separados (`css/`, `js/`), com comentários explicando cada bloco/função.
- Criação da nova página `agendamento.html`, com o formulário de cadastro de cliente/pet e agendamento de serviço.
- Pequenos ajustes de padronização de títulos e textos para manter a consistência entre as páginas antes da publicação.

## Publicação

Site publicado via GitHub Pages: *(atualizar com o link após a publicação da Fase 2)*
