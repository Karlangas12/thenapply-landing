/**
 * Configuración por idioma de las dos páginas del ToS.
 *
 * Vive aparte de `build-tos.mjs` para que el test del generador use
 * exactamente la misma configuración que el build: si el test comprobara una
 * configuración propia, dejaría de acreditar lo que de verdad se publica.
 *
 * Sólo describe el *armazón* de la página (metadatos, navegación, enlaces
 * entre idiomas). El texto legal viene íntegramente del Markdown fuente.
 */
export const PAGINAS_TOS = [
  {
    fuente: 'TERMS_OF_SERVICE.md',
    ruta: 'terms',
    lang: 'en',
    titulo: 'Terms of Service — Then Apply',
    descripcion:
      'Terms of Service for Then Apply and the Web to Markdown API: licence of use, ' +
      'prohibited uses, API key responsibility, billing through Polar.sh, liability, ' +
      'and governing law.',
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
  },
  {
    fuente: 'TERMS_OF_SERVICE.es.md',
    ruta: 'terminos',
    lang: 'es',
    titulo: 'Términos de Servicio — Then Apply',
    descripcion:
      'Términos de Servicio de Then Apply y la API Web to Markdown: licencia de uso, ' +
      'usos prohibidos, responsabilidad sobre la API key, facturación vía Polar.sh, ' +
      'responsabilidad y ley aplicable.',
    volver: 'Volver al inicio',
    // La versión española no necesita esta línea: el aviso de idioma va en la
    // cita destacada de la cabecera, que viene del propio Markdown.
    enlaceAlternativo: null,
    patronFecha: /^Última actualización:/,
  },
];
