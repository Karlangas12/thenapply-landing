/**
 * Tests del generador de las páginas del ToS.
 *
 * Sin dependencias externas a propósito (`node:test` + `node:assert`, no
 * Vitest): este repositorio no tiene bundler ni build step para el resto del
 * sitio, y arrastrar un framework de test entero sólo para el generador del
 * ToS sería más ceremonia de la que el problema pide. `node --test` viene con
 * Node 22, que es lo único que hace falta para correr `build-tos.mjs`.
 *
 * Lo que de verdad se protege aquí no es el formato del HTML, sino que **el
 * texto legal publicado siga siendo el del Markdown fuente**. Portado del
 * mismo test en motor3-boilerplate/packages/landing/tests/tos-render.test.mjs
 * (el repositorio donde se hizo la revisión legal), adaptado a esta plantilla
 * visual y sin Vitest.
 */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';

import { PAGINAS_TOS } from '../tos-paginas.mjs';
import { parsearBloques, renderizarTos, verificarCobertura } from '../tos-render.mjs';

const raiz = dirname(dirname(fileURLToPath(import.meta.url)));

function leerFuente(pagina) {
  return readFileSync(join(raiz, pagina.fuente), 'utf8');
}

describe('generación de las páginas del ToS', () => {
  for (const pagina of PAGINAS_TOS) {
    const markdown = leerFuente(pagina);
    const html = renderizarTos({ markdown, pagina });

    it(`/${pagina.ruta} (${pagina.lang}): no pierde ningún bloque de texto del Markdown fuente`, () => {
      assert.doesNotThrow(() => verificarCobertura({ markdown, html, origen: pagina.fuente }));
    });

    it(`/${pagina.ruta} (${pagina.lang}): página completa con el idioma y los metadatos correctos`, () => {
      assert.ok(html.startsWith('<!DOCTYPE html>'));
      assert.ok(html.includes(`<html lang="${pagina.lang}"`));
      assert.ok(html.includes(`<title>${pagina.titulo}</title>`));
      assert.ok(html.trimEnd().endsWith('</html>'));
    });

    it(`/${pagina.ruta} (${pagina.lang}): conserva el armazón visual del sitio (nav, Tailwind CDN, pie)`, () => {
      assert.ok(html.includes('cdn.tailwindcss.com'));
      assert.ok(html.includes('min-h-screen flex flex-col antialiased'));
      assert.ok(html.includes('© 2026 Then Apply.'));
    });

    it(`/${pagina.ruta} (${pagina.lang}): rinde cada sección del Markdown como una <section> con ancla`, () => {
      const seccionesMarkdown = parsearBloques(markdown).filter((bloque) => bloque.tipo === 'h2');
      const seccionesHtml = html.match(/<section id="/g) ?? [];
      assert.equal(seccionesMarkdown.length, 12);
      assert.equal(seccionesHtml.length, seccionesMarkdown.length);
    });

    it(`/${pagina.ruta} (${pagina.lang}): no deja enlaces a ficheros .md, que en la web estarían rotos`, () => {
      assert.doesNotMatch(html, /href="[^"]*\.md"/);
    });
  }

  it('publica las cláusulas de la revisión conservadora de agosto de 2026', () => {
    // Caso de regresión sobre el contenido concreto que motivó la revisión: si
    // alguien reintroduce el tope único que dejaba a un consumidor del plan
    // gratuito con un límite de 0 €, o se cae la reserva del RGPD, esto falla.
    const pagina = PAGINAS_TOS[0];
    const html = renderizarTos({ markdown: leerFuente(pagina), pagina });

    assert.ok(html.includes('the cap in section 9.3 does <strong class="text-white font-semibold">not</strong> apply'));
    assert.ok(html.includes('whether or not the consumer pays for the Service'));
    assert.ok(html.includes('right to compensation under the General Data Protection Regulation'));
    assert.ok(html.includes('This language clause is not absolute.'));
  });

  it('el enlace de cierre a la traducción apunta a la ruta publicada, no al fichero .md', () => {
    const pagina = PAGINAS_TOS[0];
    const html = renderizarTos({ markdown: leerFuente(pagina), pagina });
    assert.ok(html.includes('<a href="/terminos"'));
  });
});

describe('el generador falla en cerrado', () => {
  const paginaBase = PAGINAS_TOS[0];

  it('rechaza una construcción Markdown que no sabe convertir (tabla)', () => {
    const markdown = [
      '# Terms of Service',
      '',
      '**Then Apply — Web to Markdown API**',
      '',
      'Last updated: August 9, 2026',
      '',
      '## 1. Definitions',
      '',
      '| Plan | Price |',
      '| --- | --- |',
    ].join('\n');

    assert.throws(() => renderizarTos({ markdown, pagina: paginaBase }), /no soportada/);
  });

  it('rechaza el marcado en línea sin cerrar en vez de publicarlo literal', () => {
    const markdown = [
      '# Terms of Service',
      '',
      '**Then Apply — Web to Markdown API**',
      '',
      'Last updated: August 9, 2026',
      '',
      '## 1. Definitions',
      '',
      'Una **negrita que nunca se cierra.',
    ].join('\n');

    assert.throws(() => renderizarTos({ markdown, pagina: paginaBase }), /sin convertir/);
  });

  it('exige que exista la línea de última actualización', () => {
    const markdown = ['# Terms of Service', '', '## 1. Definitions', '', 'Texto.'].join('\n');

    assert.throws(() => renderizarTos({ markdown, pagina: paginaBase }), /última actualización/i);
  });

  it('detecta que el HTML ha perdido texto del Markdown', () => {
    const markdown = leerFuente(paginaBase);
    const htmlMutilado = renderizarTos({ markdown, pagina: paginaBase }).replace(
      /<section id="9-limitation-of-liability"[^>]*>[\s\S]*?<\/section>/,
      '',
    );

    assert.throws(
      () => verificarCobertura({ markdown, html: htmlMutilado, origen: paginaBase.fuente }),
      /ha perdido/,
    );
  });

  it('un enlace cuyo texto envuelve código en línea se convierte correctamente', () => {
    // Caso de regresión: la primera versión de este generador (portado de
    // motor3-boilerplate) daba a <code> una clase con sintaxis de valor
    // arbitrario de Tailwind (`text-[0.9em]`), y el `]` suelto rompía la
    // regex de enlaces siempre que el texto del enlace envolviera código —
    // justo el caso real de la nota de traducción al final del ToS.
    const markdown = [
      '# Terms of Service',
      '',
      '**Then Apply — Web to Markdown API**',
      '',
      'Last updated: August 9, 2026',
      '',
      '## 1. Definitions',
      '',
      'See [`TERMS_OF_SERVICE.es.md`](./TERMS_OF_SERVICE.es.md) for the translation.',
    ].join('\n');

    const html = renderizarTos({ markdown, pagina: paginaBase });
    assert.ok(html.includes('<a href="/terminos"'));
    assert.ok(html.includes('<code class="font-mono text-cyanAccent">TERMS_OF_SERVICE.es.md</code>'));
    assert.doesNotMatch(html, /\[<code/);
  });
});
