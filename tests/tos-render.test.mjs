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
 *
 * Desde la separación maestro/anexo (9 de agosto de 2026), cubre las cuatro
 * páginas: el ToS maestro (aplica a cualquier Producto) y el Anexo de
 * Web to Markdown (específico de ese Producto), en los dos idiomas.
 */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';

import { PAGINAS_PRODUCTOS, PAGINAS_TOS } from '../tos-paginas.mjs';
import { parsearBloques, renderizarTos, verificarCobertura } from '../tos-render.mjs';

const raiz = dirname(dirname(fileURLToPath(import.meta.url)));
const TODAS_LAS_PAGINAS = [...PAGINAS_TOS, ...PAGINAS_PRODUCTOS];

function leerFuente(pagina) {
  return readFileSync(join(raiz, pagina.fuente), 'utf8');
}

describe('generación de las páginas del ToS y sus anexos de producto', () => {
  for (const pagina of TODAS_LAS_PAGINAS) {
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
      assert.equal(seccionesHtml.length, seccionesMarkdown.length);
      assert.ok(seccionesMarkdown.length > 0);
    });

    it(`/${pagina.ruta} (${pagina.lang}): no deja enlaces a ficheros .md, que en la web estarían rotos`, () => {
      assert.doesNotMatch(html, /href="[^"]*\.md"/);
    });
  }

  it('el ToS maestro tiene exactamente sus 12 secciones numeradas', () => {
    // Caso de regresión de recuento fijo: si al genericizar se pierde o se
    // duplica una sección, esto lo detecta aunque verificarCobertura no lo
    // haría (verificarCobertura sólo mira texto, no estructura).
    const pagina = PAGINAS_TOS[0];
    const secciones = parsearBloques(leerFuente(pagina)).filter((bloque) => bloque.tipo === 'h2');
    assert.equal(secciones.length, 12);
  });

  it('el Anexo de Web to Markdown tiene exactamente sus 6 secciones', () => {
    const pagina = PAGINAS_PRODUCTOS[0];
    const secciones = parsearBloques(leerFuente(pagina)).filter((bloque) => bloque.tipo === 'h2');
    assert.equal(secciones.length, 6);
  });

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

describe('separación maestro / anexo de producto (9 de agosto de 2026)', () => {
  it('el maestro enlaza al Anexo de Web to Markdown desde el listado de Productos', () => {
    const pagina = PAGINAS_TOS[0];
    const html = renderizarTos({ markdown: leerFuente(pagina), pagina });
    assert.ok(html.includes('<a href="/terms/web-to-markdown"'));
  });

  it('el maestro define "Product" y "Schedule" con la cláusula literal pedida', () => {
    const pagina = PAGINAS_TOS[0];
    const html = renderizarTos({ markdown: leerFuente(pagina), pagina });
    assert.ok(
      html.includes(
        "The specific features, pricing, and quotas of each Product offered by the Provider are set out in that Product's Schedule, incorporated into these Terms by reference.",
      ),
    );
  });

  it('el maestro ya no nombra "Web to Markdown" fuera del listado de Productos y su enlace', () => {
    // Regresión de la genericización: si alguien reintroduce el nombre del
    // producto dentro de una sección numerada (definiciones, IP, contacto...),
    // esto lo detecta. Se excluye la única mención legítima: el listado de
    // Productos vigentes del preámbulo.
    const pagina = PAGINAS_TOS[0];
    const html = renderizarTos({ markdown: leerFuente(pagina), pagina });
    const cuerpo = html.slice(html.indexOf('<section id="1-definitions"'));
    assert.doesNotMatch(cuerpo, /Web to Markdown/);
    assert.doesNotMatch(cuerpo, /web-to-markdown/);
  });

  it('el maestro ya no incluye el enlace de soporte técnico específico de un producto', () => {
    const pagina = PAGINAS_TOS[0];
    const html = renderizarTos({ markdown: leerFuente(pagina), pagina });
    assert.doesNotMatch(html, /github\.com\/Karlangas12\/web-to-markdown\/issues/);
  });

  it('el Anexo trae la cláusula de calidad de salida del Markdown, movida tal cual desde el maestro', () => {
    const pagina = PAGINAS_PRODUCTOS[0];
    const html = renderizarTos({ markdown: leerFuente(pagina), pagina });
    assert.ok(
      html.includes(
        'The Provider does not warrant that Markdown output will be accurate or complete for every page converted: conversion quality depends on the structure of the source page being fetched, which the Provider does not control.',
      ),
    );
  });

  it('el Anexo no fija cifras de precio o cuota, sólo remite al checkout', () => {
    // Decisión explícita: el ToS original nunca tuvo cifras de precios/cuotas
    // (viven sólo en la landing y en Polar), así que el Anexo no las inventa.
    // Si alguien añade un "€" o un número de cuota aquí, esto lo detecta.
    const pagina = PAGINAS_PRODUCTOS[0];
    const html = renderizarTos({ markdown: leerFuente(pagina), pagina });
    assert.doesNotMatch(html, /€|EUR/);
    assert.doesNotMatch(html, /\b\d+\s*(conversions|conversiones)\b/i);
    assert.ok(html.includes('thenapply.dev/#pricing'));
  });

  it('el Anexo enlaza de vuelta al maestro', () => {
    const pagina = PAGINAS_PRODUCTOS[0];
    const html = renderizarTos({ markdown: leerFuente(pagina), pagina });
    assert.ok(html.includes('<a href="/terms"'));
  });
});

describe('el generador falla en cerrado', () => {
  const paginaBase = PAGINAS_TOS[0];

  it('rechaza una construcción Markdown que no sabe convertir (tabla)', () => {
    const markdown = [
      '# Terms of Service',
      '',
      '**Then Apply**',
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
      '**Then Apply**',
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
      '**Then Apply**',
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

  it('acepta una lista en el preámbulo, antes de la primera sección numerada', () => {
    // Caso de regresión: el listado de Productos vigentes del maestro va
    // antes de "## 1. Definitions". La primera versión de este cambio no
    // contemplaba una lista ahí y lanzaba "Bloque inesperado en el
    // preámbulo: lista".
    const markdown = [
      '# Terms of Service',
      '',
      '**Then Apply**',
      '',
      'Last updated: August 9, 2026',
      '',
      'Intro.',
      '',
      '- **Web to Markdown API** — see its Schedule.',
      '',
      '## 1. Definitions',
      '',
      'Texto.',
    ].join('\n');

    const html = renderizarTos({ markdown, pagina: paginaBase });
    assert.ok(html.includes('<li><strong class="text-white font-semibold">Web to Markdown API</strong>'));
  });
});
