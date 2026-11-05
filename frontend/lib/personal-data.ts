export interface FotoPessoal {
  id: number;
  src: string;
  alt: string;
  legenda: string;
  description: string;
}

/** As descrições são as mesmas da versão anterior; só os rótulos deixaram o formato de código. */
export const fotosPessoais: FotoPessoal[] = [
  {
    id: 1,
    src: "/personal-1.jpg",
    alt: "Fotografia da estrada e do pôr do sol refletido no retrovisor do carro",
    legenda: "Fotografia · perspectiva",
    description:
      "Fotografar me treina a capturar o ângulo perfeito e as nuances do momento. Este registro da estrada refletida no retrovisor durante o pôr do sol traduz minha paixão por capturar caminhos, horizontes e o valor dos pequenos detalhes que passam no fluxo diário.",
  },
  {
    id: 2,
    src: "/personal-2.jpg",
    alt: "Minha filha sorrindo feliz sob bolhas de sabão",
    legenda: "Família · legado",
    description:
      "A pureza e a alegria contagiante da minha filha em meio às bolhas de sabão ao ar livre. Ela é meu combustível diário, a base do meu equilíbrio emocional e quem me ensina a redescobrir o mundo com a curiosidade e o entusiasmo de uma criança.",
  },
  {
    id: 3,
    src: "/personal-3.jpg",
    alt: "Claudemir e sua parceira sorrindo juntos no campo ao entardecer",
    legenda: "Parceria · estabilidade",
    description:
      "Ao lado da minha esposa e parceira de vida, renovando as energias na natureza. O companheirismo, o afeto e a estabilidade familiar são a base silenciosa e segura sobre a qual construo todos os meus passos profissionais.",
  },
  {
    id: 4,
    src: "/personal-4.jpg",
    alt: "Culinária na brasa com fogo de chão ativo, representando a paixão por cozinhar em geral",
    legenda: "Gastronomia · fogo de chão",
    description:
      "A arte da gastronomia, do fogo e da criação na cozinha. Explorar receitas, dominar a brasa e cozinhar em geral é o meu laboratório favorito de criatividade sensorial e descompressão. Para mim, preparar uma boa refeição é a melhor forma de reunir pessoas queridas e celebrar momentos offline reais.",
  },
  {
    id: 5,
    src: "/personal-5.jpg",
    alt: "Claudemir posando em quadra de gramado sintético com bola de futebol sob o pé",
    legenda: "Futebol · leitura de jogo",
    description:
      "O futebol de final de semana é minha válvula de escape físico e de foco tático. Além do exercício, jogar futebol me ensina sobre leitura de jogo, cooperação coletiva rápida, estratégia sob pressão e o ritmo necessário para resolver problemas em equipe.",
  },
  {
    id: 6,
    src: "/personal-6.jpg",
    alt: "Claudemir tocando violão de pernas cruzadas no tapete de brinquedo com sua filha pequena ao lado tocando um piano infantil",
    legenda: "Música · criatividade",
    description:
      "Dedilhar acordes no violão enquanto minha filha experimenta seus primeiros ritmos em seu tecladinho de brinquedo. A música é nossa linguagem de criatividade abstrata, permitindo acalmar a mente lógica e criar momentos de pura conexão e harmonia.",
  },
];
