'use client';

import { useEffect, useRef, useState } from 'react';
import { useAtmosphere } from '@/components/layout/Atmosphere';

type Mode = 'idle' | 'hover' | 'click' | 'label' | 'direcional';

interface Estado {
  mode: Mode;
  label: string | null;
  dir: 'left' | 'right' | null;
}

const INICIAL: Estado = { mode: 'idle', label: null, dir: null };

/**
 * Cursor customizado. Os componentes declaram o comportamento que querem por
 * atributos, então este arquivo não sabe nada sobre as seções:
 *
 *   data-cursor="hover"      círculo cheio que inverte o que está embaixo
 *   data-cursor="drag"       vira seta ←/→ conforme a metade do elemento
 *   data-cursor-label="…"    mostra o texto dentro do círculo
 *   data-cursor-magnetic     o cursor gruda no centro do elemento
 *
 * A cor acompanha a atmosfera da seção — na de projetos, isso é a cor da
 * marca do projeto em foco.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [estado, setEstado] = useState<Estado>(INICIAL);
  const { atmosphere } = useAtmosphere();
  const accent = atmosphere.colorA;

  const cursorRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  // Espelha o estado para o handler de pointermove comparar sem virar
  // dependência do efeito (que remontaria os listeners a cada mudança).
  const estadoRef = useRef<Estado>(INICIAL);

  useEffect(() => {
    // Só ativa em dispositivos com mouse de verdade (desktop). Touch e
    // dispositivos híbridos usam o cursor nativo do sistema.
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setEnabled(mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const aplicar = (proximo: Estado) => {
      const atual = estadoRef.current;
      if (
        atual.mode === proximo.mode &&
        atual.label === proximo.label &&
        atual.dir === proximo.dir
      ) {
        return; // nada mudou — evita re-render a cada pixel percorrido
      }
      estadoRef.current = proximo;
      setEstado(proximo);
    };

    const onMove = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      const alvo = el?.closest<HTMLElement>(
        '[data-cursor], [data-cursor-label], [data-cursor-magnetic]'
      );

      // Magnetismo: o cursor abandona o ponteiro e se ancora no centro do
      // alvo, dando a sensação de encaixe.
      const ima = el?.closest<HTMLElement>('[data-cursor-magnetic]');
      if (ima) {
        const r = ima.getBoundingClientRect();
        target.current.x = r.left + r.width / 2;
        target.current.y = r.top + r.height / 2;
      } else {
        target.current.x = e.clientX;
        target.current.y = e.clientY;
      }

      if (!alvo) return aplicar(INICIAL);

      const tipo = alvo.dataset.cursor;
      const label = alvo.dataset.cursorLabel ?? null;

      if (tipo === 'drag') {
        const r = alvo.getBoundingClientRect();
        const dir = e.clientX < r.left + r.width / 2 ? 'left' : 'right';
        return aplicar({ mode: 'direcional', label: null, dir });
      }
      if (label) return aplicar({ mode: 'label', label, dir: null });
      if (tipo) return aplicar({ mode: 'hover', label: null, dir: null });
      // Só magnético, sem data-cursor: mantém a forma, muda a âncora.
      return aplicar(INICIAL);
    };

    const onDown = () => {
      // Direcional e rótulo não viram bolinha de clique: perderiam a
      // informação que estão passando bem na hora em que ela é usada.
      if (
        estadoRef.current.mode === 'direcional' ||
        estadoRef.current.mode === 'label'
      ) {
        return;
      }
      aplicar({ mode: 'click', label: null, dir: null });
    };
    const onUp = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      if (estadoRef.current.mode === 'direcional' || estadoRef.current.mode === 'label') {
        return;
      }
      const alvo = el?.closest<HTMLElement>('[data-cursor]');
      aplicar(
        alvo
          ? { mode: 'hover', label: null, dir: null }
          : INICIAL
      );
    };

    let frame = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.22;
      current.current.y += (target.current.y - current.current.y) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  const { mode, label, dir } = estado;

  // Idle: anel fino na cor da seção. Hover/click: círculo branco com
  // mix-blend-mode: difference, que inverte o que está embaixo. Rótulo e
  // direcional: disco sólido na cor da seção, com conteúdo em carbon —
  // difference deixaria o texto e a seta ilegíveis sobre imagem.
  const invertido = mode === 'hover' || mode === 'click';
  const solido = mode === 'label' || mode === 'direcional';
  const size =
    mode === 'label'
      ? 104
      : mode === 'direcional'
        ? 84
        : mode === 'hover'
          ? 78
          : mode === 'click'
            ? 62
            : 26;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[202] flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: invertido ? '#FFFFFF' : solido ? accent : 'transparent',
        border: invertido || solido ? 'none' : `1.5px solid ${accent}`,
        mixBlendMode: invertido ? 'difference' : 'normal',
        willChange: 'transform, width, height',
        transition:
          'width 280ms cubic-bezier(0.65, 0, 0.35, 1), height 280ms cubic-bezier(0.65, 0, 0.35, 1), background-color 200ms ease-out, border 200ms ease-out',
      }}
    >
      {mode === 'label' && label && (
        <span
          className="select-none px-2 text-center font-mono uppercase leading-tight text-carbon"
          style={{ fontSize: 9, letterSpacing: '0.14em' }}
        >
          {label}
        </span>
      )}
      {mode === 'direcional' && (
        <span
          className="select-none text-carbon"
          style={{
            fontSize: 20,
            transform: dir === 'left' ? 'scaleX(-1)' : 'none',
          }}
        >
          →
        </span>
      )}
    </div>
  );
}
