'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  useAtmosphere,
  ATMOSPHERES,
} from '@/components/layout/Atmosphere';

const WHATSAPP_URL =
  'https://wa.me/5585981254006?text=' +
  encodeURIComponent(
    'Olá! Vi seu portfólio e gostaria de conversar sobre a criação de um site para o meu negócio.'
  );
const INSTAGRAM_URL = 'https://www.instagram.com/triumworks/';
const EMAIL_URL = 'mailto:contato@triumtech.com.br';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Botão de ação — label em mono, caixa reta. O preenchimento teal cresce
 * da esquerda no hover e o texto inverte para carbon.
 */
function ActionPill({
  href,
  label,
  aria,
}: {
  href: string;
  label: string;
  aria: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      data-cursor="hover"
      data-cursor-magnetic=""
      className="group relative inline-flex items-center overflow-hidden border border-[#E8E3D7]/30 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#E8E3D7] transition-colors duration-500 ease-artisan hover:border-teal sm:px-9"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 origin-left scale-x-0 bg-teal transition-transform duration-500 ease-artisan group-hover:scale-x-100"
      />
      <span className="transition-colors duration-500 group-hover:text-carbon">
        {label}
      </span>
    </a>
  );
}

/**
 * Monumento da marca — cream chapado. O efeito de mouse é o mesmo do TRIUM
 * do topo da página: quem reage é o cursor customizado, que vira um disco e
 * inverte as cores do que está embaixo (`data-cursor="hover"`).
 */
function Monumento() {
  return (
    <span
      data-cursor="hover"
      // O vw dá a escala; o teto em vh impede que o monumento estoure a
      // altura da seção em telas baixas. No mobile o corpo é menor — em
      // tela estreita o nome ocupava a largura inteira e sufocava o resto.
      // A margem negativa desconta o sidebearing do "T" e encosta o glifo na
      // borda — só no mobile: no desktop o corpo é tão maior que o mesmo
      // valor em em viraria dezenas de pixels e comeria a haste da letra.
      // A margem inferior regula o corte. O pai tem overflow-hidden e termina
      // na linha do rodapé, então margem negativa faz a base das letras
      // transbordar e ser ceifada ali — no desktop é isso que dá o corte de
      // raspão. No mobile, positiva, a palavra assenta inteira acima da
      // linha. Em em para o corte manter a proporção quando o corpo cresce.
      className="-ml-[0.035em] mb-[0.15em] block select-none text-left font-display text-[min(28vw,58vh)] text-[#E8E3D7] md:-mb-[0.09em] md:ml-0 md:text-[min(33vw,58vh)]"
      style={{
        fontWeight: 800,
        lineHeight: 0.74,
        letterSpacing: '-0.045em',
      }}
    >
      TRIUM
    </span>
  );
}

export function Contato() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const { setAtmosphere } = useAtmosphere();

  useEffect(() => {
    if (inView) setAtmosphere(ATMOSPHERES.contato);
  }, [inView, setAtmosphere]);

  return (
    <section
      ref={ref}
      id="contato"
      data-snap-section="contato"
      className="snap-section relative flex h-screen w-full flex-col justify-between overflow-hidden"
      style={{ height: '100svh' }}
    >
      {/* ── Faixa superior: convite à esquerda, nota e rede à direita ── */}
      {/* flex-1 + justify-center no mobile: sem isso o bloco encosta no topo
          e todo o vazio da tela se acumula de uma vez só entre ele e o
          monumento. Centralizado, a folga se reparte acima e abaixo. */}
      <div className="relative z-10 flex flex-1 flex-col justify-center gap-10 px-6 pt-16 md:flex-row md:items-start md:justify-between md:gap-16 md:px-12 md:pt-28">
        <div>
          <motion.h2
            data-cursor="hover"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display font-bold leading-[0.94] tracking-[-0.025em] text-[#E8E3D7]"
            style={{ fontSize: 'clamp(32px, 4.6vw, 60px)' }}
          >
            conta sua ideia
            <br />
            a gente constrói
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:gap-4"
          >
            <ActionPill
              href={WHATSAPP_URL}
              label="Chamar no WhatsApp"
              aria="Falar via WhatsApp (abre em nova aba)"
            />
            <ActionPill
              href={EMAIL_URL}
              label="Mandar um e-mail"
              aria="Enviar e-mail para a TRIUM"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="max-w-xs shrink-0 md:text-right"
        >
          <p className="font-lora text-[15px] leading-relaxed text-[#E8E3D7]/60">
            Resposta em até 24 horas — direto com quem projeta e desenvolve,
            sem intermediário.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            data-cursor-label="Seguir"
            aria-label="Ver o Instagram da TRIUM (abre em nova aba)"
            className="group mt-7 inline-flex flex-col items-start md:items-end"
          >
            <span
              className="inline-flex items-baseline gap-2.5 font-display font-bold leading-none tracking-[-0.02em] text-[#E8E3D7] transition-colors duration-500 ease-artisan group-hover:text-teal"
              style={{ fontSize: 'clamp(26px, 2.6vw, 38px)' }}
            >
              Instagram
              <span
                className="text-teal transition-transform duration-500 ease-artisan group-hover:-translate-y-1 group-hover:translate-x-1"
                style={{ fontSize: '0.55em' }}
              >
                ↗
              </span>
            </span>
            {/* fio que acende no hover — o sublinhado cresce do lado em que
                o bloco está ancorado (direita no desktop, esquerda no mobile) */}
            <span className="mt-2 block h-px w-full origin-left bg-[#E8E3D7]/25 transition-colors duration-500 ease-artisan group-hover:bg-teal md:origin-right" />
            <span className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#E8E3D7]/45 transition-colors duration-500 group-hover:text-[#E8E3D7]/70">
              @triumworks
            </span>
          </a>
        </motion.div>
      </div>

      {/* ── Monumento: sangra de borda a borda, cortado pelo rodapé ── */}
      <div className="relative z-10 mt-auto overflow-hidden">
        <motion.div
          initial={{ y: '18%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <Monumento />
        </motion.div>
      </div>

      {/* ── Rodapé ── */}
      <div className="relative z-10 border-t border-[#E8E3D7]/10 px-6 py-5 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 md:px-12">
        TRIUM — Volta Redonda, RJ
      </div>
    </section>
  );
}
