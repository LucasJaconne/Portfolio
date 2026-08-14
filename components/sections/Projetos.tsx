'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import { projetos } from '@/lib/data/projetos';
import { useSnap } from '@/components/layout/SnapController';
import { useAtmosphere } from '@/components/layout/Atmosphere';
import { cn } from '@/lib/utils';

const total = projetos.length;
const INK = '#E8E3D7';
const EASE = [0.16, 1, 0.3, 1] as const;

/** Anexa alpha (0–1) a um hex sólido: #EF4444 + 0.4 → #EF444466 */
function withAlpha(hex: string, a: number) {
  return hex + Math.round(a * 255).toString(16).padStart(2, '0');
}

function useMedia(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return matches;
}

export function Projetos() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const snap = useSnap();
  const { setAtmosphere } = useAtmosphere();
  const reduced = useReducedMotion();
  const isMobile = useMedia('(max-width: 767px)');
  const finePointer = useMedia('(pointer: fine)');

  const goTo = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(total - 1, i)));
  }, []);
  // Loop infinito: passar do último volta pro primeiro e vice-versa.
  const next = useCallback(() => setIndex((i) => (i + 1) % total), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), []);

  const projeto = projetos[index];

  // A atmosfera do fundo assume a cor da marca do projeto em foco.
  useEffect(() => {
    if (inView) {
      setAtmosphere({
        id: `projetos-${projeto.slug}`,
        colorA: projeto.accent,
        colorB: INK,
      });
    }
  }, [inView, projeto, setAtmosphere]);

  useEffect(() => {
    if (!inView) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [inView, next, prev]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
  };

  // Onde o ponteiro desceu, para separar clique de arrasto no deck.
  const xAoPressionar = useRef(0);

  // ── Tilt 3D do deck (desktop, pointer fino) ──
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rX = useSpring(tiltX, { stiffness: 130, damping: 18, mass: 0.6 });
  const rY = useSpring(tiltY, { stiffness: 130, damping: 18, mass: 0.6 });
  // Brilho especular que acompanha a inclinação.
  const glossX = useTransform(rY, [-9, 9], ['18%', '82%']);
  const glossY = useTransform(rX, [7, -7], ['15%', '85%']);
  const gloss = useMotionTemplate`radial-gradient(480px circle at ${glossX} ${glossY}, rgba(232,227,215,0.13), transparent 60%)`;

  const tiltEnabled = finePointer && !reduced;

  const onTiltMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltY.set(px * 9);
    tiltX.set(py * -7);
  };
  const onTiltLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // Geometria do leque: mais aberto no desktop, discreto no mobile. O passo
  // horizontal é fechado o bastante para o card da frente crescer sem que as
  // cartas de trás avancem demais sobre a borda direita da tela.
  const xStep = isMobile ? 22 : 42;
  const yStep = isMobile ? 8 : 12;
  const scaleStep = isMobile ? 0.045 : 0.06;
  const rotStep = isMobile ? 1.2 : 1.5;
  // Só os cards da frente ficam montados: o véu escuro cresce 0.22 por
  // camada, então da quinta em diante a carta já está sob preto opaco e
  // decodificar a imagem seria trabalho jogado fora. No mobile o corte é
  // mais agressivo — empilhar imagens full-bleed é o que trava o aparelho.
  const visibleDepth = isMobile ? 3 : 4;

  return (
    <section
      ref={ref}
      id="projetos"
      data-snap-section="projetos"
      className="snap-section relative flex h-screen w-full items-center overflow-hidden"
      style={{
        height: '100svh',
        color: INK,
        ['--ac' as string]: projeto.accent,
      }}
    >
      {/* gap-0 no desktop: as colunas já somam 100%, e um gap somado a isso
          empurrava a coluna da direita para fora da viewport.
          items-start no desktop: o topo do texto encosta na mesma horizontal
          do topo do card — o bloco deixa de flutuar no meio do vão. */}
      <div className="relative z-10 grid w-full grid-cols-1 items-center gap-6 md:grid-cols-[32%_68%] md:items-start md:gap-0">
        {/* ── Texto (esquerda) — colado no card, na altura dele ── */}
        <div className="order-2 grid px-6 md:order-1 md:pl-16">
          {/* mobile: crossfade simultâneo (mode="sync") sem esperar o exit.
              desktop: mode="wait" mantém o slide sequencial editorial.
              gridArea 1/1 faz texto antigo e novo ocuparem a MESMA célula
              (sobrepostos) durante o crossfade — sem empurrar o conteúdo
              de baixo, que era o que fazia o texto "descer e voltar". */}
          <AnimatePresence mode={isMobile ? 'sync' : 'wait'}>
            <motion.div
              key={projeto.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: isMobile ? 0.2 : 0.3 }}
              style={{ gridArea: '1 / 1' }}
              // min-h (não h) fixa o piso da altura sem cortar: com a ficha
              // técnica somada, em telas baixas o conteúdo passa de 50vh e
              // precisa poder crescer em vez de transbordar a caixa.
              className="flex flex-col gap-5 md:ml-auto md:mr-6 md:min-h-[50vh] md:max-w-sm md:justify-between md:gap-0"
            >
              <Reveal reduced={reduced} mobile={isMobile}>
                <div className="flex items-center gap-2.5 font-mono text-tiny uppercase tracking-[0.3em] text-[#E8E3D7]/60">
                  <span
                    className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: projeto.accent }}
                  />
                  {projeto.categoria} · {projeto.ano}
                </div>
              </Reveal>

              <div>
                <Reveal
                  reduced={reduced}
                  mobile={isMobile}
                  delay={isMobile ? 0 : 0.06}
                  className="-mb-[clamp(10px,1.3vw,19px)] pb-[clamp(10px,1.3vw,19px)]"
                >
                  <h2
                    data-cursor="hover"
                    className="font-display font-bold leading-[0.92] tracking-[-0.02em] text-[#E8E3D7]"
                    style={{ fontSize: 'clamp(36px, 4.6vw, 70px)' }}
                  >
                    {projeto.titulo}
                  </h2>
                </Reveal>
                {/* O cliente só aparece quando acrescenta algo ao título —
                    em "Veículos RJ" os dois são idênticos. */}
                {projeto.cliente !== projeto.titulo && (
                  <Reveal reduced={reduced} mobile={isMobile} delay={isMobile ? 0 : 0.09}>
                    <p className="mt-2.5 font-lora text-[13px] italic text-[#E8E3D7]/45">
                      {projeto.cliente}
                    </p>
                  </Reveal>
                )}

                <Reveal reduced={reduced} mobile={isMobile} delay={isMobile ? 0 : 0.12}>
                  {/* Sem clamp: esta é a única vitrine do projeto, então a
                      descrição precisa aparecer inteira. O min-h reserva a
                      altura da maior delas, para que trocar de projeto não
                      mude o tamanho do bloco (o que fazia o deck pular).
                      As descrições em projetos.ts são mantidas curtas o
                      bastante para caber — ver comentário lá. */}
                  <p className="mt-3 min-h-[4.6rem] font-lora text-[15px] leading-relaxed text-[#E8E3D7]/70 md:mt-4 md:min-h-[8.5rem] md:text-body-lg">
                    {projeto.descricaoCurta}
                  </p>
                </Reveal>

                {/* Ficha técnica — texto puro, sem caixas: a informação
                    aparece sem somar mais uma borda ao layout. Projeto sem
                    stack declarada não deixa a linha vazia ocupando espaço. */}
                {projeto.tecnologias.length > 0 && (
                  <Reveal reduced={reduced} mobile={isMobile} delay={isMobile ? 0 : 0.15}>
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8E3D7]/40">
                      {projeto.tecnologias.join(' · ')}
                    </p>
                  </Reveal>
                )}
              </div>

              {/* Sem URL declarada não há link: um href vazio recarregaria a
                  página em cima do visitante. */}
              {projeto.urlExterna && (
                <Reveal reduced={reduced} mobile={isMobile} delay={isMobile ? 0 : 0.18}>
                  <a
                    href={projeto.urlExterna}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    data-cursor-label="Abrir site"
                    className="group inline-flex w-fit items-center gap-2 border-b border-[#E8E3D7]/30 pb-1 font-mono text-tiny uppercase tracking-[0.2em] text-[#E8E3D7] transition-colors hover:border-[var(--ac)]"
                  >
                    Ver projeto
                    <span
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
                      style={{ color: projeto.accent }}
                    >
                      ↗
                    </span>
                  </a>
                </Reveal>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Deck de cards (direita) ── */}
        {/* padding assimétrico: a folga maior à direita é o espaço em que as
            cartas de trás abrem em leque. */}
        <div className="relative order-1 md:order-2 md:pl-2 md:pr-8">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={handleDragEnd}
            style={{
              touchAction: 'pan-y',
              // O card é 16:9, então largura vira altura. Em telas baixas o
              // teto de 980px deixaria o deck alto demais e a paginação
              // colidiria com o botão "Contato" — daí o limite pela altura
              // sobrando (a subtração cobre paginação, botão e respiro).
              maxWidth: 'min(980px, calc((100svh - 232px) * 16 / 9))',
            }}
            className="relative z-10 ml-5 mr-9 cursor-grab active:cursor-grabbing md:mx-auto"
          >
            {/* Palco em perspectiva — o deck inteiro inclina seguindo o cursor;
                as cartas de trás abrem em leque para a direita. */}
            {/* O deck inteiro vira controle: metade esquerda volta, metade
                direita avança — e o cursor mostra ←/→ para anunciar isso.
                O ponteiro é comparado com onde o botão desceu, senão o
                clique que encerra um arrasto também navegaria. */}
            <div
              style={{ perspective: 1400 }}
              data-cursor="drag"
              onPointerMove={onTiltMove}
              onPointerLeave={onTiltLeave}
              onPointerDown={(e) => {
                xAoPressionar.current = e.clientX;
              }}
              onClick={(e) => {
                if (Math.abs(e.clientX - xAoPressionar.current) > 8) return;
                const r = e.currentTarget.getBoundingClientRect();
                if (e.clientX < r.left + r.width / 2) prev();
                else next();
              }}
            >
              <motion.div
                className="relative aspect-video w-full"
                style={
                  tiltEnabled
                    ? { rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d' }
                    : undefined
                }
              >
                {projetos.map((p, i) => {
                  const depth = (i - index + total) % total; // 0 = frente
                  const isActive = depth === 0;
                  // Mobile: descarta os cards do fundo (ocultos) — menos camadas
                  // na GPU e menos imagens decodificadas.
                  if (depth > visibleDepth) return null;
                  // Transform/opacity dirigidos por CSS (thread de composição/GPU),
                  // não pelo spring do framer (thread principal, recalcula por
                  // frame). É o que destrava a troca no celular.
                  const transform = `translate3d(${depth * xStep}px, ${depth * yStep}px, 0) scale(${1 - depth * scaleStep}) rotate(${depth * rotStep}deg)`;
                  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';
                  const dur = isMobile ? '0.5s' : '0.6s';
                  return (
                    <div
                      key={p.slug}
                      // Sem data-cursor aqui: o closest() do cursor pegaria o
                      // card antes do deck e trocaria a seta pelo círculo.
                      // A navegação agora é do deck inteiro, por metade.
                      className="absolute inset-0 overflow-hidden border border-[#E8E3D7]/10"
                      style={{
                        background: '#0b0e13',
                        zIndex: total - depth,
                        transform,
                        opacity: isActive ? 1 : 0.95 - depth * 0.12,
                        // Blur só no desktop (animar filter re-rasteriza — caro).
                        filter: isMobile ? undefined : `blur(${depth * 1.5}px)`,
                        // CSS anima transform/opacity na GPU. No desktop o blur
                        // também transiciona; no mobile fica de fora (custo).
                        transition: reduced
                          ? 'none'
                          : `transform ${dur} ${ease}, opacity ${dur} ${ease}${isMobile ? '' : `, filter ${dur} ${ease}`}`,
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                        // Sombra estática (fora da transição) p/ não repintar.
                        boxShadow: isActive
                          ? `0 30px 80px rgba(0,0,0,0.55), 0 0 110px ${withAlpha(projeto.accent, 0.16)}`
                          : '0 20px 50px rgba(0,0,0,0.4)',
                      }}
                    >
                      {/* Imagem do projeto */}
                      <Image
                        src={p.imagemCard ?? p.imagemPrincipal}
                        alt={p.titulo}
                        fill
                        priority={i === 0}
                        sizes="(min-width: 768px) 56vw, 100vw"
                        className="object-cover"
                        draggable={false}
                      />
                      {/* Scrim sutil para ancorar o card no fundo escuro */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                      {/* Escurecimento das cartas de trás — opacity via CSS */}
                      <div
                        className="pointer-events-none absolute inset-0 bg-black"
                        style={{
                          opacity: depth * 0.22,
                          transition: reduced ? 'none' : `opacity ${dur} ${ease}`,
                        }}
                      />
                      {/* Brilho especular que segue o tilt (só no card da frente) */}
                      {isActive && tiltEnabled && (
                        <motion.div
                          className="pointer-events-none absolute inset-0"
                          style={{ background: gloss }}
                        />
                      )}
                    </div>
                  );
                })}

              </motion.div>
            </div>

            {/* Paginação — compacta */}
            <div className="mt-5 flex items-center gap-3">
              <PagButton dir="prev" onClick={prev} />

              {/* Barras de progresso entre as setas. Valem até xl porque o
                  índice por nome só cabe inteiro a partir de 1280px — com a
                  lista atual de projetos, abaixo disso os últimos nomes
                  saíam pela borda da tela. */}
              <div className="flex max-w-[160px] flex-1 items-center gap-1.5 xl:hidden">
                {projetos.map((p, i) => (
                  <button
                    key={p.slug}
                    onClick={() => goTo(i)}
                    data-cursor="hover"
                    aria-label={`Ir para ${p.titulo}`}
                    className="group relative h-3 flex-1"
                  >
                    <span className="absolute inset-x-0 top-[calc(50%-1px)] h-[2px] rounded-full bg-[#E8E3D7]/20" />
                    <motion.span
                      className="absolute inset-x-0 top-[calc(50%-1px)] h-[2px] origin-left rounded-full"
                      initial={false}
                      animate={{
                        scaleX: i <= index ? 1 : 0,
                        backgroundColor: projeto.accent,
                      }}
                      transition={{
                        scaleX: { duration: 0.5, ease: EASE },
                        backgroundColor: { duration: 0.5 },
                      }}
                    />
                  </button>
                ))}
              </div>

              <PagButton dir="next" onClick={next} />

              {/* Telas largas: índice por nome — navega e diz onde se está,
                  no lugar do contador numérico. */}
              <div className="ml-7 hidden items-center gap-7 xl:flex">
                {projetos.map((p, i) => {
                  const ativo = i === index;
                  return (
                    <button
                      key={p.slug}
                      onClick={() => goTo(i)}
                      data-cursor="hover"
                      aria-label={`Ir para ${p.titulo}`}
                      aria-current={ativo ? 'true' : undefined}
                      className="group relative whitespace-nowrap pb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300"
                      style={{ color: ativo ? INK : 'rgba(232,227,215,0.35)' }}
                    >
                      {p.titulo}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-px origin-left"
                        style={{
                          backgroundColor: projeto.accent,
                          transform: ativo ? 'scaleX(1)' : 'scaleX(0)',
                          transition: reduced
                            ? 'none'
                            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Continuidade vertical → Contato */}
      <motion.button
        type="button"
        onClick={() => snap.goToId('contato')}
        data-cursor="hover"
        aria-label="Ir para Contato"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="group absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8E3D7]/45 transition-colors group-hover:text-[#E8E3D7]">
          Contato
        </span>
        <span className="text-[#E8E3D7]/55 transition-transform duration-500 group-hover:translate-y-1 group-hover:text-[#E8E3D7]">
          ↓
        </span>
      </motion.button>
    </section>
  );
}

/** Reveal editorial: o conteúdo sobe por trás de uma máscara (overflow hidden).
 *  No mobile (ou reduced motion) usa só opacity — sem clip, sem stagger. */
function Reveal({
  children,
  delay = 0,
  className,
  reduced,
  mobile,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  reduced?: boolean | null;
  mobile?: boolean;
}) {
  if (reduced || mobile) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: '0%', transition: { duration: 0.6, ease: EASE, delay } }}
        exit={{ y: '-110%', transition: { duration: 0.3, ease: EASE } }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function PagButton({
  dir,
  onClick,
}: {
  dir: 'prev' | 'next';
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      data-cursor="hover"
      data-cursor-magnetic=""
      aria-label={dir === 'prev' ? 'Projeto anterior' : 'Próximo projeto'}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E8E3D7]/30 text-xs text-[#E8E3D7] transition-all duration-300 hover:border-[var(--ac)] hover:bg-[var(--ac)] hover:text-carbon"
    >
      <span style={{ transform: dir === 'prev' ? 'scaleX(-1)' : 'none' }}>→</span>
    </button>
  );
}
