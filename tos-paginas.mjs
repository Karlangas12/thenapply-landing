/**
 * Configuración por idioma de las páginas del ToS.
 *
 * Vive aparte de `build-tos.mjs` para que el test del generador use
 * exactamente la misma configuración que el build: si el test comprobara una
 * configuración propia, dejaría de acreditar lo que de verdad se publica.
 *
 * Sólo describe el *armazón* de la página (metadatos, navegación, enlaces
 * entre idiomas). El texto legal viene íntegramente del Markdown fuente.
 *
 * Dos listas, no una: `PAGINAS_TOS` es el documento maestro (aplica a
 * cualquier Producto que ofrezca el Proveedor); `PAGINAS_PRODUCTOS` son los
 * anexos específicos de cada Producto, incorporados al maestro por
 * referencia (ver la sección 1, "Schedule", de `TERMS_OF_SERVICE.md`).
 * `build-tos.mjs` genera ambas listas con el mismo generador — añadir un
 * Producto nuevo es añadir una entrada aquí y su Markdown en `products/`, sin
 * tocar el maestro ni el generador.
 *
 * ## `version`: la fecha en formato comprobable por máquina
 *
 * Cada página declara su `version` en ISO (`YYYY-MM-DD`), el **mismo formato**
 * que `TOS_VERSION` y `SCHEDULE_VERSION` en el `wrangler.toml` del Worker que
 * sella la aceptación. El generador **no la deduce del texto**: la exige aquí
 * y comprueba que la línea de última actualización del Markdown dice esa misma
 * fecha, fallando en cerrado si divergen. Así hay un único valor que un humano
 * (o un script) puede contrastar entre tres sitios: este fichero, el documento
 * publicado (`<meta name="tos-version">`) y la configuración del Worker.
 *
 * `slug` sólo lo llevan los anexos: es la clave con la que el Worker registra
 * en `metadata.tos.scheduleVersions` qué versión del Anexo aceptó el Cliente.
 */
export const PAGINAS_TOS = [
  {
    fuente: 'TERMS_OF_SERVICE.md',
    ruta: 'terms',
    lang: 'en',
    titulo: 'Terms of Service — Then Apply',
    descripcion:
      'Terms of Service for Then Apply: licence of use, prohibited uses, API key ' +
      'responsibility, billing through Polar.sh, liability, and governing law. Applies ' +
      "to every Product offered by the Provider — see each Product's Schedule for its " +
      'specific features, pricing, and quotas.',
    volver: 'Back to home',
    enlaceAlternativo: {
      href: '/terminos',
      texto: 'Versión en español',
      // Coherente con la cláusula de idioma del final del documento: la
      // versión inglesa es la de *referencia*, no un texto vinculante
      // absoluto frente a derechos imperativos del consumidor.
      nota: 'for convenience — the English version is the reference text',
    },
    patronFecha: /^Last updated:/,
    version: '2026-08-09',
  },
  {
    fuente: 'TERMS_OF_SERVICE.es.md',
    ruta: 'terminos',
    lang: 'es',
    titulo: 'Términos de Servicio — Then Apply',
    descripcion:
      'Términos de Servicio de Then Apply: licencia de uso, usos prohibidos, ' +
      'responsabilidad sobre la API key, facturación vía Polar.sh, responsabilidad y ley ' +
      'aplicable. Se aplican a todos los Productos del Proveedor — el Anexo de cada ' +
      'Producto establece sus funcionalidades, precios y cuotas específicos.',
    volver: 'Volver al inicio',
    // La versión española no necesita esta línea: el aviso de idioma va en la
    // cita destacada de la cabecera, que viene del propio Markdown.
    enlaceAlternativo: null,
    patronFecha: /^Última actualización:/,
    version: '2026-08-09',
  },
];

export const PAGINAS_PRODUCTOS = [
  {
    fuente: 'products/web-to-markdown.md',
    ruta: 'terms/web-to-markdown',
    lang: 'en',
    titulo: 'Web to Markdown API — Product Schedule — Then Apply',
    descripcion:
      'Product Schedule for the Web to Markdown API: description, Content format, ' +
      'intellectual property, output quality, and where to find current plans, pricing, ' +
      'and quotas. Incorporated by reference into the Then Apply Terms of Service.',
    volver: 'Back to home',
    enlaceAlternativo: {
      href: '/terminos/web-to-markdown',
      texto: 'Versión en español',
      nota: 'for convenience — the English version is the reference text',
    },
    patronFecha: /^Last updated:/,
    version: '2026-08-09',
    slug: 'web-to-markdown',
  },
  {
    fuente: 'products/web-to-markdown.es.md',
    ruta: 'terminos/web-to-markdown',
    lang: 'es',
    titulo: 'Web to Markdown API — Anexo de producto — Then Apply',
    descripcion:
      'Anexo de producto de la API Web to Markdown: descripción, forma del Contenido, ' +
      'propiedad intelectual, calidad de la salida y dónde encontrar los planes, precios ' +
      'y cuotas vigentes. Incorporado por referencia a los Términos de Servicio de Then ' +
      'Apply.',
    volver: 'Volver al inicio',
    enlaceAlternativo: null,
    patronFecha: /^Última actualización:/,
    version: '2026-08-09',
    slug: 'web-to-markdown',
  },
];
