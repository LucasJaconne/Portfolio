export interface Projeto {
  slug: string;
  titulo: string;
  ano: number;
  categoria:
    | 'Landing Page'
    | 'Site Institucional'
    | 'E-commerce'
    | 'App'
    | 'Dashboard'
    | 'Portfólio'
    | 'Outro';
  cliente: string;
  tecnologias: string[];
  imagemPrincipal: string;
  galeria: string[];
  descricaoCurta: string;
  descricaoCompleta: string;
  contexto: string;
  desafios: string;
  solucao: string;
  resultados: string;
  urlExterna: string;
  destaque: boolean;
  grafismo: '✦' | '〜' | '朩';
  logoLetra: string;          // letra/símbolo placeholder no card lateral
  corCapa: string;            // gradiente CSS para fallback da capa
  accent: string;             // cor sólida da marca, legível sobre fundo escuro
  imagemCard?: string;        // imagem exibida no carrossel da home
}

/**
 * `descricaoCurta` é a única vitrine do projeto: aparece inteira no carrossel
 * da home, sem "ler mais" e sem página de detalhe. Mantenha até ~130
 * caracteres — acima disso passa de 4 linhas na coluna do carrossel e o
 * bloco de texto empurra a paginação.
 */
export const projetos: Projeto[] = [
  {
    slug: 'aline-lima',
    titulo: 'Dra. Aline Lima',
    ano: 2026,
    categoria: 'Site Institucional',
    cliente: 'Dra. Aline Lima — Estética Orofacial',
    tecnologias: [],
    imagemPrincipal: '/images/projetos/aline/aline.webp',
    galeria: ['/images/projetos/aline/aline.webp'],
    descricaoCurta:
      'Site da especialista em estética orofacial Aline Lima — tratamentos, cursos e agendamento de consultas.',
    descricaoCompleta:
      'O site da Dra. Aline Lima reúne as duas frentes do trabalho dela: o atendimento clínico em estética orofacial — harmonização facial, toxina botulínica e bioestimuladores — e a formação de outros profissionais, com cursos e formações. Também organiza o home care, o programa de paciente modelo e o agendamento de consultas, com uma identidade serifada e clara que traduz o cuidado clínico da marca.',
    contexto:
      'Especialista em estética orofacial certificada pelo CFO e com mais de dez anos de atuação, Aline divide o tempo entre atender pacientes e formar profissionais. As duas frentes disputavam o mesmo espaço nas redes sociais, sem um endereço próprio que organizasse a informação e sustentasse a autoridade da marca.',
    desafios:
      'Acomodar dois públicos distintos — pacientes em busca de tratamento e profissionais em busca de formação — sem que um atrapalhasse a leitura do outro, mantendo a sobriedade que a área da saúde exige e evitando qualquer promessa de resultado.',
    solucao:
      'Estrutura com caminhos separados para pacientes e alunos, identidade serifada em tons claros e dourados, apresentação individual de cada tratamento, áreas dedicadas a cursos, formações, home care e paciente modelo, e agendamento de consulta acessível de qualquer seção.',
    resultados:
      'Endereço próprio que sustenta a marca pessoal, apresenta tratamentos e formações lado a lado e centraliza o agendamento fora das redes sociais.',
    urlExterna: 'https://www.dralinelima.com.br/',
    destaque: true,
    grafismo: '✦',
    logoLetra: 'A',
    corCapa: 'linear-gradient(135deg, #C0A882 0%, #6B5B3F 50%, #14100a 100%)',
    accent: '#C0A882',
    imagemCard: '/images/projetos/aline/aline.webp',
  },

  {
    slug: 'alonso',
    titulo: 'Alonso',
    ano: 2026,
    categoria: 'Landing Page',
    cliente: 'Alonso Estética Automotiva',
    tecnologias: [],
    imagemPrincipal: '/images/projetos/alonso/alonso.webp',
    galeria: ['/images/projetos/alonso/alonso.webp'],
    descricaoCurta:
      'Site de estética automotiva especializada em PPF, com catálogo de cortes por modelo e agendamento pelo WhatsApp.',
    descricaoCompleta:
      'O site da Alonso Estética Automotiva apresenta o trabalho de proteção de pintura em PPF. A peça central é o catálogo digital de cortes: o cliente encontra o diagrama exato para o modelo do próprio carro, já que as películas são cortadas eletronicamente na medida, sem uso de lâminas. Uma segunda área reúne as linhas de PPF disponíveis, e o agendamento acontece direto pelo WhatsApp, a partir de qualquer ponto da página.',
    contexto:
      'A Alonso trabalha com películas de proteção cortadas eletronicamente — um serviço técnico que uma foto não explica sozinha. Faltava um lugar onde o cliente entendesse o que é PPF, confirmasse se o próprio carro está coberto e saísse com o serviço agendado.',
    desafios:
      'Traduzir um serviço técnico, organizado por modelo de veículo, em uma navegação que qualquer motorista percorra sem esforço — e sustentar uma identidade escura de alto contraste sem prejudicar a leitura nem o carregamento das imagens dos carros.',
    solucao:
      'Identidade escura com laranja de destaque, catálogo de cortes organizado por modelo, seção dedicada às linhas de PPF e um caminho curto até o WhatsApp em toda a página.',
    resultados:
      'Presença digital que explica o serviço antes do primeiro contato: o cliente chega ao WhatsApp já sabendo qual proteção quer, o que encurta a conversa e qualifica o agendamento.',
    urlExterna: 'https://www.alonsoesteticaautomotiva.com.br/',
    destaque: true,
    grafismo: '〜',
    logoLetra: 'A',
    corCapa: 'linear-gradient(135deg, #F97316 0%, #7C2D12 50%, #140a04 100%)',
    accent: '#F97316',
    imagemCard: '/images/projetos/alonso/alonso.webp',
  },

  {
    slug: 'flavio-lavigne',
    titulo: 'Flavio Lavigne',
    ano: 2026,
    categoria: 'Portfólio',
    cliente: 'Flavio Lavigne Makeup Artist',
    tecnologias: ['Next.js', 'React', 'Supabase'],
    imagemPrincipal: '/images/bunners/flaviolavigne.png',
    galeria: ['/images/bunners/flaviolavigne.png'],
    descricaoCurta:
      'Portfólio, serviços e cursos do maquiador Flavio Lavigne — com blog próprio e a mesma elegância do trabalho dele.',
    descricaoCompleta:
      'O site do Flavio Lavigne é o cartão de visitas digital de um dos maquiadores mais requisitados de Volta Redonda. Desenvolvido com Next.js e Supabase, reúne o portfólio de trabalhos — noivas, editorial e social —, a apresentação de serviços e cursos e um blog gerenciável com conteúdo sobre beleza. O design escuro com tons dourados traduz a sofisticação da marca pessoal do artista.',
    contexto:
      'Flavio Lavigne precisava de uma presença digital à altura do seu trabalho como makeup artist — um espaço próprio para apresentar portfólio, divulgar serviços e cursos e publicar conteúdo, sem depender exclusivamente das redes sociais.',
    desafios:
      'Traduzir a estética sofisticada do trabalho do Flavio em uma experiência digital, equilibrando um portfólio altamente visual, a divulgação de serviços e cursos e um blog atualizável — tudo com leveza e performance no carregamento das imagens.',
    solucao:
      'Site com Next.js e Supabase, identidade escura com detalhes dourados, galeria de portfólio otimizada, seções dedicadas a serviços e cursos e um blog com painel próprio para o artista publicar conteúdo de forma autônoma.',
    resultados:
      'Presença digital profissional que centraliza portfólio, serviços e conteúdo em um só lugar, fortalecendo a marca pessoal do Flavio e servindo como vitrine para noivas, clientes e alunos.',
    urlExterna: 'https://www.flaviolavigne.com/',
    destaque: true,
    grafismo: '✦',
    logoLetra: 'F',
    corCapa: 'linear-gradient(135deg, #C9A05C 0%, #6B4A26 50%, #14100a 100%)',
    accent: '#C9A05C',
    imagemCard: '/images/bunners/flaviolavigne.png',
  },

  {
    slug: 'axis',
    titulo: 'AXIS',
    ano: 2025,
    categoria: 'App',
    cliente: 'AXIS Eventos',
    tecnologias: ['Next.js', 'React', 'Supabase'],
    imagemPrincipal: '/images/projetos/axis/banner1.webp',
    galeria: [
      '/images/projetos/axis/banner1.webp',
      '/images/projetos/axis/mobile1.webp',
      '/images/projetos/axis/mobile2.webp',
      '/images/projetos/axis/banner3.webp',
      '/images/projetos/axis/banner2.webp',
    ],
    descricaoCurta:
      'Plataforma de eventos, pré-vendas e artistas da AXIS — design imersivo conectando público e produtores.',
    descricaoCompleta:
      'A AXIS é uma plataforma completa para o ecossistema de eventos da agência, unindo tecnologia de ponta e design premium. Desenvolvida com Next.js e Supabase, centraliza a divulgação de eventos, o gerenciamento de pré-vendas por lotes e o portfólio de artistas agenciados. Oferece uma interface fluida com animações imersivas e um dashboard intuitivo para produtores, elevando o padrão das experiências de entretenimento regional.',
    contexto:
      'A AXIS Eventos precisava de uma presença digital à altura do seu posicionamento no mercado — uma plataforma que centralizasse a divulgação dos eventos, apresentasse o cast de artistas agenciados e gerenciasse pré-vendas com clareza e impacto visual, sem depender de soluções genéricas que não refletissem a identidade da marca.',
    desafios:
      'Criar uma plataforma que conciliasse múltiplas responsabilidades — divulgação de eventos, gestão de lotes de pré-venda e vitrine de artistas — com uma interface premium, animações imersivas e performance sólida, entregando uma experiência fluida tanto no mobile quanto no desktop.',
    solucao:
      'Arquitetura com Next.js e Supabase para dados em tempo real, design system próprio com animações refinadas, seções dedicadas a cada artista agenciado e um painel de gerenciamento de eventos e lotes para a equipe da AXIS — tudo dentro de uma identidade visual coesa e de alto impacto.',
    resultados:
      'Plataforma lançada com interface premium que unificou a comunicação da agência, aumentou o engajamento com os eventos divulgados e posicionou a AXIS como referência em experiência digital no mercado de entretenimento regional.',
    urlExterna: 'https://axis-eventos.vercel.app/',
    destaque: true,
    grafismo: '✦',
    logoLetra: 'A',
    corCapa: 'linear-gradient(135deg, #EF4444 0%, #991B1B 50%, #1a0505 100%)',
    accent: '#EF4444',
    imagemCard: '/images/bunners/axis.png',
  },

  {
    slug: 'veiculos-rj',
    titulo: 'Veículos RJ',
    ano: 2025,
    categoria: 'E-commerce',
    cliente: 'Veículos RJ',
    tecnologias: ['Next.js', 'Supabase', 'Tailwind CSS', 'AutoCerto'],
    imagemPrincipal: '/images/projetos/veiculosrj/banner1.webp',
    galeria: [
      '/images/projetos/veiculosrj/banner1.webp',
      '/images/projetos/veiculosrj/banner2.webp',
      '/images/projetos/veiculosrj/mobile1.webp',
      '/images/projetos/veiculosrj/mobile2.webp',
      '/images/projetos/veiculosrj/banner3.webp',
      '/images/projetos/veiculosrj/banner4.webp',
      '/images/projetos/veiculosrj/mobile3.webp',
      '/images/projetos/veiculosrj/mobile4.webp',
    ],
    descricaoCurta:
      'Marketplace automotivo multiloja para classificados de veículos com geração de leads via WhatsApp.',
    descricaoCompleta:
      'O Veículos RJ é um marketplace automotivo multiloja de alta performance, construído com Next.js, Tailwind CSS e Supabase. Focado na geração de leads direta via WhatsApp, a plataforma oferece uma experiência otimizada para lojistas e compradores, com gestão de estoque manual ou integrada via AutoCerto, garantindo rapidez e segurança nas negociações de veículos.',
    contexto:
      'Lojistas de veículos da região precisavam de uma plataforma centralizada para expor seu estoque online com geração de leads direta, sem depender de marketplaces genéricos com taxas elevadas.',
    desafios:
      'Integrar múltiplas lojas em uma plataforma única mantendo a identidade de cada lojista, além de conciliar gestão de estoque manual com importação automática via AutoCerto.',
    solucao:
      'Marketplace multiloja com Next.js para performance e SEO, Supabase para dados em tempo real, integração AutoCerto para estoque automático e geração de leads via WhatsApp direto.',
    resultados:
      'Plataforma ativa com múltiplos lojistas, geração de leads consistente via WhatsApp e gestão de estoque flexível — manual ou automatizada.',
    urlExterna: 'https://www.veiculosrj.com/',
    destaque: true,
    grafismo: '〜',
    logoLetra: 'V',
    corCapa: 'linear-gradient(135deg, #0d3b66 0%, #1a4a85 50%, #f3f3f3 100%)',
    accent: '#3A7FC2',
    imagemCard: '/images/bunners/veiculos.png',
  },

  {
    slug: 'gabriel-passig',
    titulo: 'Gabriel Passig',
    ano: 2024,
    categoria: 'Landing Page',
    cliente: 'Gabriel Passig Advocacia',
    tecnologias: ['WordPress', 'Responsivo', 'SEO'],
    imagemPrincipal: '/images/projetos/gabrielpassig/banner1.webp',
    galeria: [
      '/images/projetos/gabrielpassig/banner1.webp',
      '/images/projetos/gabrielpassig/banner2.webp',
      '/images/projetos/gabrielpassig/mobile1.webp',
      '/images/projetos/gabrielpassig/mobile2.webp',
      '/images/projetos/gabrielpassig/banner3.webp',
      '/images/projetos/gabrielpassig/banner4.webp',
      '/images/projetos/gabrielpassig/mobile3.webp',
      '/images/projetos/gabrielpassig/mobile4.webp',
    ],
    descricaoCurta:
      'Site institucional para advocacia previdenciária, responsivo e gerenciável pelo próprio escritório no WordPress.',
    descricaoCompleta:
      'Site profissional para escritório de advocacia, com foco em Direito Previdenciário, totalmente responsivo, institucional e gerenciado pelo painel do WordPress. Conta com páginas informativas, áreas de atendimento e conteúdo atualizado para auxiliar clientes em dúvidas sobre benefícios e serviços previdenciários.',
    contexto:
      'O escritório de advocacia precisava de uma presença digital profissional que transmitisse credibilidade e facilitasse o contato com clientes em busca de orientação previdenciária.',
    desafios:
      'Criar um site institucional que equilibrasse seriedade profissional com acessibilidade de informação, tudo gerenciável pelo próprio cliente sem conhecimento técnico.',
    solucao:
      'Site WordPress responsivo com páginas informativas sobre áreas de atuação, design profissional focado em credibilidade e painel intuitivo para atualização de conteúdo pelo próprio escritório.',
    resultados:
      'Site ativo gerando contatos orgânicos para o escritório, com conteúdo atualizado regularmente pelo cliente de forma autônoma.',
    urlExterna: 'https://gabrielpassig.com.br/',
    destaque: true,
    grafismo: '朩',
    logoLetra: 'G',
    corCapa: 'linear-gradient(135deg, #1a2980 0%, #3B82F6 50%, #93c5fd 100%)',
    accent: '#82B4F4',
    imagemCard: '/images/bunners/gabriel.png',
  },
];

export function getProjetoBySlug(slug: string): Projeto | undefined {
  return projetos.find((p) => p.slug === slug);
}

export function getProjetoIndex(slug: string): number {
  return projetos.findIndex((p) => p.slug === slug);
}

export function getProjetoAdjacentes(slug: string) {
  const idx = projetos.findIndex((p) => p.slug === slug);
  if (idx === -1) return { anterior: null, proximo: null };
  return {
    anterior: idx > 0 ? projetos[idx - 1] : projetos[projetos.length - 1],
    proximo:
      idx < projetos.length - 1 ? projetos[idx + 1] : projetos[0],
  };
}
