/**
 * Generador de las páginas del ToS (/terms, /terminos) a partir del Markdown
 * fuente de este mismo repositorio.
 *
 * Por qué existe aquí y no en otro sitio: `thenapply.dev` es el dominio real,
 * y este repositorio (`thenapply-landing`), no `motor3-boilerplate`, es quien
 * lo sirve. La revisión legal completa del ToS se hizo en
 * `motor3-boilerplate/packages/landing` sin que nadie notara que ese proyecto
 * de Cloudflare Pages no tenía el dominio atado — el ToS estuvo publicándose
 * en el sitio equivocado durante días. Consolidar aquí, con este mismo
 * generador, es la forma de que no vuelva a pasar: éste es ahora el único
 * lugar donde el ToS se edita.
 *
 * Diseño heredado de ese primer generador (motor3-boilerplate,
 * `packages/landing/tos-render.mjs`), portado sin cambios de fondo: el
 * parser cubre exactamente el subconjunto de Markdown que usan los dos
 * documentos y **falla en cerrado** ante cualquier construcción que no
 * reconozca, en vez de ignorarla en silencio. `verificarCobertura` exige
 * además que ningún bloque de texto del Markdown se pierda en la conversión.
 * Sólo cambia la plantilla HTML: la de este sitio (Tailwind CDN, paleta
 * brand/cyanAccent/blueAccent), no la de `packages/landing`.
 *
 * No hay integración automática con `motor3-boilerplate`: si el texto legal
 * cambia allí, hay que traer el Markdown aquí a mano y volver a generar. Es
 * una decisión consciente (ver DEUDA_TECNICA.md del monorepo, §4.2): no se
 * construye una pieza de sincronización entre repos sobre el mismo tipo de
 * fallo silencioso que causó el problema original.
 */

// --- Utilidades de texto -----------------------------------------------------

/** Escapa lo que HTML interpretaría como marcado. Se aplica **antes** de generar etiquetas. */
function escaparHtml(texto) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Convierte un título en un identificador estable para enlazar a la cláusula. */
function anclaDeTitulo(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// --- Marcado en línea --------------------------------------------------------

// Sin sintaxis de valor arbitrario de Tailwind (`text-[...]`) en ninguna clase
// que participe aquí: un `]` suelto antes de tiempo rompe la regex de enlaces
// `\[([^\]]+)\]` cuando el texto de un enlace envuelve código en línea (pasó
// de verdad la primera vez que se portó este generador a este repositorio,
// con `[`TERMS_OF_SERVICE.es.md`](./TERMS_OF_SERVICE.es.md)`).
const CLASE_ENLACE = 'text-brand-400 hover:text-white transition-colors underline decoration-brand-700';
const CLASE_CODIGO = 'font-mono text-cyanAccent';

/**
 * Rutas publicadas equivalentes a los enlaces entre ficheros del repositorio.
 *
 * En el Markdown, las dos versiones se enlazan entre sí por nombre de fichero
 * —lo correcto cuando se leen en GitHub—, pero en la web esas rutas no existen
 * y el enlace quedaría roto. La traducción se hace aquí, al publicar.
 */
const ENLACES_PUBLICADOS = new Map([
  ['./TERMS_OF_SERVICE.md', '/terms'],
  ['./TERMS_OF_SERVICE.es.md', '/terminos'],
  // Anexos de producto (ver PAGINAS_PRODUCTOS en tos-paginas.mjs). Un
  // Producto nuevo añade sus dos rutas aquí, junto con su entrada en esa
  // lista — el resto del generador no necesita saber que existe.
  ['./web-to-markdown.md', '/terms/web-to-markdown'],
  ['./web-to-markdown.es.md', '/terminos/web-to-markdown'],
]);

/** Traduce un destino del Markdown a su ruta en el sitio publicado. */
function reescribirEnlace(destino) {
  return ENLACES_PUBLICADOS.get(destino) ?? destino;
}

/**
 * Convierte el marcado en línea de una porción de texto.
 *
 * El orden importa: primero se escapa el HTML, luego se sustituyen las
 * construcciones de dentro hacia fuera (código, enlaces, negrita, cursiva), de
 * modo que las etiquetas que vamos generando no vuelvan a pasar por el
 * escapado ni las capture una regla posterior.
 */
export function renderizarInline(textoCrudo, contexto) {
  let html = escaparHtml(textoCrudo);

  // `código` — va primero para que su contenido no se reinterprete.
  html = html.replace(/`([^`]+)`/g, `<code class="${CLASE_CODIGO}">$1</code>`);

  // [texto](destino)
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_todo, texto, destino) =>
      `<a href="${reescribirEnlace(destino)}" class="${CLASE_ENLACE}">${texto}</a>`,
  );

  // <https://…> y <correo@dominio> (ya escapados como &lt;…&gt;).
  html = html.replace(
    /&lt;(https?:\/\/[^\s&]+)&gt;/g,
    (_todo, url) => `<a href="${url}" class="${CLASE_ENLACE}">${url}</a>`,
  );
  html = html.replace(
    /&lt;([^\s@&]+@[^\s@&]+)&gt;/g,
    (_todo, correo) => `<a href="mailto:${correo}" class="${CLASE_ENLACE}">${correo}</a>`,
  );

  // **negrita** antes que *cursiva*: al sustituirla desaparecen los dobles
  // asteriscos y la regla de cursiva ya no puede confundirse con ellos.
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  comprobarSinMarcadoResidual(html, contexto);
  return html;
}

/**
 * Aborta si queda sintaxis Markdown sin convertir.
 *
 * Es la red que hace que el generador falle en cerrado: un `**` desemparejado
 * o un `[enlace]` mal cerrado saldría literal en la página publicada, y en un
 * texto legal eso no puede pasar desapercibido.
 */
function comprobarSinMarcadoResidual(html, contexto) {
  const residuos = [
    [/\*/, 'asterisco suelto (negrita o cursiva sin cerrar)'],
    [/`/, 'acento grave suelto (código sin cerrar)'],
    [/\[[^\]]*\]\(/, 'enlace mal formado'],
  ];
  for (const [patron, descripcion] of residuos) {
    if (patron.test(html)) {
      throw new Error(
        `Marcado sin convertir en ${contexto}: ${descripcion}.\n  Texto: ${html.slice(0, 160)}`,
      );
    }
  }
}

// --- Análisis del Markdown ---------------------------------------------------

/**
 * Trocea el Markdown en bloques tipados.
 *
 * @throws si encuentra una línea que no encaja en el subconjunto soportado.
 */
export function parsearBloques(markdown) {
  const lineas = markdown.split(/\r?\n/);
  const bloques = [];
  let i = 0;

  while (i < lineas.length) {
    const linea = lineas[i];

    if (linea.trim() === '') {
      i += 1;
      continue;
    }

    if (/^---+$/.test(linea)) {
      bloques.push({ tipo: 'separador' });
      i += 1;
      continue;
    }

    const titulo = /^(#{1,3}) (.+)$/.exec(linea);
    if (titulo !== null) {
      bloques.push({ tipo: `h${titulo[1].length}`, texto: titulo[2].trim() });
      i += 1;
      continue;
    }

    // Cita: líneas consecutivas que empiezan por `>`. Los `>` vacíos separan
    // párrafos dentro de la propia cita.
    if (/^>/.test(linea)) {
      const parrafos = [];
      let actual = [];
      while (i < lineas.length && /^>/.test(lineas[i])) {
        const contenido = lineas[i].replace(/^>\s?/, '');
        if (contenido.trim() === '') {
          if (actual.length > 0) parrafos.push(actual.join(' '));
          actual = [];
        } else {
          actual.push(contenido.trim());
        }
        i += 1;
      }
      if (actual.length > 0) parrafos.push(actual.join(' '));
      bloques.push({ tipo: 'cita', parrafos });
      continue;
    }

    // Lista: `- item`, con continuaciones sangradas que pertenecen al mismo item.
    if (/^- /.test(linea)) {
      const items = [];
      while (i < lineas.length && (/^- /.test(lineas[i]) || /^\s+\S/.test(lineas[i]))) {
        if (/^- /.test(lineas[i])) {
          items.push(lineas[i].replace(/^- /, '').trim());
        } else {
          items[items.length - 1] += ` ${lineas[i].trim()}`;
        }
        i += 1;
      }
      bloques.push({ tipo: 'lista', items });
      continue;
    }

    // Construcciones de Markdown válidas pero no soportadas. Se comprueban
    // **antes** del párrafo genérico: sin esto, una fila de tabla o un bloque
    // de código empezarían por un carácter no blanco y se colarían como
    // párrafo, saliendo publicados con su sintaxis en crudo. Es justo el fallo
    // silencioso que este generador existe para evitar.
    const noSoportadas = [
      [/^\|/, 'tabla'],
      [/^```/, 'bloque de código'],
      [/^\d+\.\s/, 'lista numerada'],
      [/^!\[/, 'imagen'],
      [/^<[a-z]/i, 'HTML en crudo'],
      [/^={3,}$/, 'título con subrayado (setext)'],
    ];
    for (const [patron, nombre] of noSoportadas) {
      if (patron.test(linea)) {
        throw new Error(
          `Línea ${i + 1} del Markdown usa una construcción no soportada por el generador ` +
            `del ToS (${nombre}): ${JSON.stringify(linea.slice(0, 80))}. ` +
            'Amplía `parsearBloques` antes de usarla en el documento.',
        );
      }
    }

    // Párrafo: líneas consecutivas hasta la siguiente en blanco. Se permite la
    // sangría de continuación porque el Markdown fuente va ajustado a 80
    // columnas.
    if (/^\S/.test(linea)) {
      const partes = [];
      while (
        i < lineas.length &&
        lineas[i].trim() !== '' &&
        !/^(#{1,3} |>|- |---+$)/.test(lineas[i])
      ) {
        partes.push(lineas[i].trim());
        i += 1;
      }
      bloques.push({ tipo: 'parrafo', texto: partes.join(' ') });
      continue;
    }

    throw new Error(
      `Línea ${i + 1} del Markdown con una construcción no soportada por el generador ` +
        `del ToS: ${JSON.stringify(linea)}. Amplía \`parsearBloques\` antes de usarla.`,
    );
  }

  return bloques;
}

// --- Composición de la página ------------------------------------------------

/** Renderiza los bloques del cuerpo (de la primera sección en adelante). */
function renderizarCuerpo(bloques) {
  const salida = [];
  let seccionAbierta = false;
  let primerBloqueDeSeccion = false;

  const cerrarSeccion = () => {
    if (seccionAbierta) {
      salida.push('        </section>');
      seccionAbierta = false;
    }
  };

  for (const bloque of bloques) {
    if (bloque.tipo === 'h2') {
      cerrarSeccion();
      const ancla = anclaDeTitulo(bloque.texto);
      salida.push(`        <section id="${ancla}" class="mt-10">`);
      salida.push(
        `          <h2 class="mb-2 text-lg font-semibold text-white">${renderizarInline(bloque.texto, 'título h2')}</h2>`,
      );
      seccionAbierta = true;
      primerBloqueDeSeccion = true;
      continue;
    }

    if (bloque.tipo === 'h3') {
      const ancla = anclaDeTitulo(bloque.texto);
      salida.push(
        `          <h3 id="${ancla}" class="mb-2 mt-6 text-base font-semibold text-white">` +
          `${renderizarInline(bloque.texto, 'título h3')}</h3>`,
      );
      primerBloqueDeSeccion = true;
      continue;
    }

    // El primer párrafo de una sección no lleva margen superior; los
    // siguientes sí.
    const margen = primerBloqueDeSeccion ? '' : ' mt-3';

    if (bloque.tipo === 'parrafo') {
      salida.push(
        `          <p class="text-slate-400 leading-relaxed${margen}">${renderizarInline(bloque.texto, 'párrafo')}</p>`,
      );
      primerBloqueDeSeccion = false;
      continue;
    }

    if (bloque.tipo === 'lista') {
      const clase = primerBloqueDeSeccion
        ? 'ml-5 list-disc space-y-2 text-slate-400'
        : 'ml-5 mt-3 list-disc space-y-2 text-slate-400';
      salida.push(`          <ul class="${clase}">`);
      for (const item of bloque.items) {
        salida.push(`            <li>${renderizarInline(item, 'elemento de lista')}</li>`);
      }
      salida.push('          </ul>');
      primerBloqueDeSeccion = false;
      continue;
    }

    throw new Error(`Bloque inesperado en el cuerpo del ToS: ${bloque.tipo}`);
  }

  cerrarSeccion();
  return salida.join('\n');
}

/** Renderiza el bloque de cierre (la cláusula de idioma) como aviso destacado. */
function renderizarCierre(bloques) {
  if (bloques.length === 0) return '';
  const parrafos = bloques
    .filter((bloque) => bloque.tipo === 'parrafo')
    .map(
      (bloque, indice) =>
        `          <p class="${indice === 0 ? '' : 'mt-2 '}text-slate-400 leading-relaxed">` +
        `${renderizarInline(bloque.texto, 'cierre')}</p>`,
    );
  if (parrafos.length === 0) return '';
  return ['        <div class="mt-8 rounded-xl border border-brand-border bg-brand-card p-5">', ...parrafos, '        </div>'].join(
    '\n',
  );
}

/** Renderiza la cita de cabecera (el aviso de idioma de la versión española). */
function renderizarCita(bloque) {
  const parrafos = bloque.parrafos.map((texto, indice) => {
    const clase = indice === 0 ? 'font-semibold text-white' : 'mt-2 italic text-slate-400';
    return `          <p class="${clase}">${renderizarInline(texto, 'cita de cabecera')}</p>`;
  });
  return [
    '        <div class="mt-6 rounded-xl border border-brand-border bg-brand-card p-5 text-sm leading-relaxed">',
    ...parrafos,
    '        </div>',
  ].join('\n');
}

/**
 * Genera la página completa.
 *
 * @param {object} opciones
 * @param {string} opciones.markdown Documento fuente.
 * @param {object} opciones.pagina Textos y metadatos propios del idioma.
 */
export function renderizarTos({ markdown, pagina }) {
  const bloques = parsearBloques(markdown);

  const h1 = bloques.find((bloque) => bloque.tipo === 'h1');
  if (h1 === undefined) throw new Error('El Markdown del ToS no tiene título de nivel 1.');

  const indicePrimeraSeccion = bloques.findIndex((bloque) => bloque.tipo === 'h2');
  if (indicePrimeraSeccion === -1) {
    throw new Error('El Markdown del ToS no tiene ninguna sección de nivel 2.');
  }

  // Todo lo posterior al último separador, si va después de las secciones, es
  // el bloque de cierre (la cláusula de idioma).
  const indiceUltimoSeparador = bloques.reduce(
    (ultimo, bloque, indice) =>
      bloque.tipo === 'separador' && indice > indicePrimeraSeccion ? indice : ultimo,
    -1,
  );
  const finCuerpo = indiceUltimoSeparador === -1 ? bloques.length : indiceUltimoSeparador;

  const preambulo = bloques.slice(0, indicePrimeraSeccion);
  const cuerpo = bloques.slice(indicePrimeraSeccion, finCuerpo);
  const cierre = indiceUltimoSeparador === -1 ? [] : bloques.slice(indiceUltimoSeparador + 1);

  // El preámbulo se reparte en tres piezas con estilo propio: el subtítulo (el
  // único párrafo enteramente en negrita), la línea de fecha y el resto de
  // párrafos introductorios.
  const cabecera = [];
  const introduccion = [];
  let subtitulo = null;
  let fecha = null;

  for (const bloque of preambulo) {
    if (bloque.tipo === 'h1' || bloque.tipo === 'separador') continue;
    if (bloque.tipo === 'cita') {
      cabecera.push(renderizarCita(bloque));
      continue;
    }
    // Lista en el preámbulo: por ejemplo, el listado de Productos vigentes
    // que el maestro enumera antes de la primera sección numerada. No lleva
    // el margen `mt-3` de las listas del cuerpo porque aquí siempre sigue a
    // un párrafo introductorio, nunca abre la página.
    if (bloque.tipo === 'lista') {
      const items = bloque.items
        .map((item) => `          <li>${renderizarInline(item, 'elemento de lista del preámbulo')}</li>`)
        .join('\n');
      introduccion.push(`        <ul class="ml-5 mt-3 list-disc space-y-2 text-slate-400">\n${items}\n        </ul>`);
      continue;
    }
    if (bloque.tipo !== 'parrafo') {
      throw new Error(`Bloque inesperado en el preámbulo del ToS: ${bloque.tipo}`);
    }
    if (subtitulo === null && /^\*\*[^*]+\*\*$/.test(bloque.texto)) {
      subtitulo = bloque.texto.replace(/^\*\*|\*\*$/g, '');
      continue;
    }
    if (fecha === null && pagina.patronFecha.test(bloque.texto)) {
      fecha = bloque.texto;
      continue;
    }
    introduccion.push(`        <p class="text-slate-400 leading-relaxed">${renderizarInline(bloque.texto, 'introducción')}</p>`);
  }

  if (fecha === null) {
    throw new Error(
      `No se encontró la línea de última actualización (${pagina.patronFecha}) en el ToS.`,
    );
  }

  const lineaFecha =
    pagina.enlaceAlternativo === null
      ? `        <p class="mt-3 text-sm text-slate-400">${escaparHtml(fecha)}</p>`
      : `        <p class="mt-3 text-sm text-slate-400">${escaparHtml(fecha)} &middot; ` +
        `<a href="${pagina.enlaceAlternativo.href}" class="${CLASE_ENLACE}">${pagina.enlaceAlternativo.texto}</a> ` +
        `(${pagina.enlaceAlternativo.nota})</p>`;

  const subtituloHtml =
    subtitulo === null
      ? ''
      : `        <p class="mt-2 text-sm font-semibold text-white">${renderizarInline(subtitulo, 'subtítulo')}</p>\n`;

  return `<!DOCTYPE html>
<html lang="${pagina.lang}" class="dark scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escaparHtml(pagina.titulo)}</title>
    <meta name="description" content="${escaparHtml(pagina.descripcion)}">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="alternate" hreflang="en" href="https://thenapply.dev/terms">
    <link rel="alternate" hreflang="es" href="https://thenapply.dev/terminos">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#f4f3ff', 100: '#ebe9fe', 400: '#a78bfa', 500: '#8b5cf6',
                            600: '#7c3aed', 700: '#6d28d9', dark: '#08090C', card: '#12141A',
                            border: '#1E222D'
                        },
                        cyanAccent: '#00f2fe',
                        blueAccent: '#4F7DFC'
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
                    }
                }
            }
        }
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

    <style>
        body { background-color: #08090C; color: #E2E8F0; font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-brand-500 selection:text-white">

    <header class="sticky top-0 z-50 backdrop-blur-md bg-[#08090C]/80 border-b border-brand-border/60 transition-all duration-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/" class="flex items-center space-x-3 group">
                <img src="/icon-mark.svg" alt="" width="36" height="36" class="group-hover:scale-105 transition-transform">
                <span class="font-bold text-lg tracking-tight text-white">Then Apply</span>
            </a>
            <a href="/" class="text-sm text-slate-400 hover:text-white transition-colors">&larr; ${escaparHtml(pagina.volver)}</a>
        </div>
    </header>

    <main class="flex-grow px-4 sm:px-6 lg:px-8 py-16">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">${renderizarInline(h1.texto, 'título')}</h1>
${subtituloHtml}${lineaFecha}
${cabecera.join('\n')}${cabecera.length > 0 ? '\n' : ''}${introduccion.join('\n')}${introduccion.length > 0 ? '\n' : ''}
${renderizarCuerpo(cuerpo)}
${renderizarCierre(cierre)}
      </div>
    </main>

    <footer class="bg-[#050608] border-t border-brand-border/80 py-12 text-slate-400 text-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center space-x-3">
                <img src="/icon-mark.svg" alt="" width="28" height="28">
                <span class="font-bold text-white tracking-tight">Then Apply</span>
                <span class="text-xs text-slate-500 font-mono">© 2026 Then Apply.</span>
            </div>
            <div class="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
                <a href="/terms" class="hover:text-white transition-colors">Terms</a>
                <a href="/terminos" class="hover:text-white transition-colors">Términos (ES)</a>
                <span>Polar.sh is our Merchant of Record for billing</span>
                <a href="mailto:keys@thenapply.dev" class="hover:text-white transition-colors">Support: keys@thenapply.dev</a>
            </div>
        </div>
    </footer>
</body>
</html>
`;
}

// --- Comprobación anti-deriva ------------------------------------------------

/**
 * Reduce un texto a palabras comparables: sin marcado, sin espacios dobles.
 *
 * El espaciado alrededor de la puntuación se normaliza a propósito: al quitar
 * las etiquetas del HTML se sustituyen por un espacio (necesario para que
 * `<li>a</li><li>b</li>` no se lea como «ab»), y eso deja huecos artificiales
 * en sitios como `<code>ejemplo.dev</code>,`. Sin este ajuste la comprobación
 * daría falsos positivos por diferencias de espaciado, no por texto perdido.
 */
function normalizar(texto) {
  return texto
    // Autolinks `<correo@dominio>` / `<https://…>`: en el Markdown llevan los
    // ángulos y en el HTML ya se han convertido en <a>, así que se reducen a
    // su texto interior en ambos lados antes de comparar.
    .replace(/<([^\s<>]+)>/g, '$1')
    .replace(/[*`>]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&middot;|&larr;|&copy;|&mdash;/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?)\]])/g, '$1')
    .replace(/([([])\s+/g, '$1')
    .trim();
}

/**
 * Comprueba que el HTML generado no ha perdido texto del Markdown fuente.
 *
 * No compara los ficheros byte a byte —el HTML añade su propio armazón—, sino
 * que exige que **todo** el texto de cada bloque del Markdown aparezca en la
 * página. Es lo que convierte un fallo silencioso del renderizador (una
 * cláusula que se cae porque usaba una sintaxis no contemplada) en un build
 * roto. Ya demostró encontrar fallos reales la primera vez que se usó (una
 * clase con `[` sin cerrar rompía un enlace que envolvía código en línea).
 *
 * @throws si algún bloque del Markdown no aparece en el HTML.
 */
export function verificarCobertura({ markdown, html, origen }) {
  const textoHtml = normalizar(html.replace(/<[^>]+>/g, ' '));
  const faltantes = [];

  for (const bloque of parsearBloques(markdown)) {
    const textos =
      bloque.tipo === 'lista'
        ? bloque.items
        : bloque.tipo === 'cita'
          ? bloque.parrafos
          : bloque.tipo === 'separador'
            ? []
            : [bloque.texto];

    for (const texto of textos) {
      const esperado = normalizar(texto);
      if (esperado.length > 0 && !textoHtml.includes(esperado)) {
        faltantes.push(esperado);
      }
    }
  }

  if (faltantes.length > 0) {
    throw new Error(
      `El HTML generado desde ${origen} ha perdido ${faltantes.length} bloque(s) de texto ` +
        `del Markdown fuente. El primero:\n  ${faltantes[0].slice(0, 200)}`,
    );
  }
}
