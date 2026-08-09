/**
 * Genera el ToS maestro (/terms, /terminos) y el anexo de cada Producto
 * (/terms/<producto>, /terminos/<producto>) desde su Markdown fuente.
 *
 * Ejecútalo a mano y comitea el resultado tras editar cualquiera de los
 * Markdown de origen (el maestro, o el Anexo de un Producto):
 *
 *   npm run build:tos
 *
 * Por qué es así, y no un paso de Cloudflare Pages en el deploy: este sitio
 * declara "no build step" a propósito (ver README.md) para todo lo demás —
 * index.html y web-to-markdown/index.html se editan a mano y se sirven tal
 * cual. Convertir el proyecto entero a un build step por las dos páginas del
 * ToS sería un cambio de arquitectura mayor que el propio problema que esto
 * resuelve. En su lugar, sólo el ToS tiene generador, se ejecuta en local, y
 * el HTML generado se comitea como cualquier otro fichero estático del sitio
 * — Cloudflare Pages lo sirve sin saber que existió un generador.
 *
 * Contrapartida asumida: si alguien edita el Markdown y olvida correr este
 * script antes de comitear, el HTML publicado queda desactualizado sin que
 * nada lo impida en el momento del push. Es el mismo tipo de olvido que ya
 * pasó una vez (ver DEUDA_TECNICA.md del monorepo, §4.2) — la diferencia es
 * que ahora, en cuanto alguien SÍ ejecute este script, `verificarCobertura`
 * garantiza que el HTML que salga no habrá perdido ninguna cláusula por el
 * camino.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PAGINAS_PRODUCTOS, PAGINAS_TOS } from './tos-paginas.mjs';
import { renderizarTos, verificarCobertura } from './tos-render.mjs';

const raiz = dirname(fileURLToPath(import.meta.url));

for (const pagina of [...PAGINAS_TOS, ...PAGINAS_PRODUCTOS]) {
  const markdown = readFileSync(join(raiz, pagina.fuente), 'utf8');
  const html = renderizarTos({ markdown, pagina });

  // Falla en cerrado: si el HTML ha perdido cualquier bloque de texto del
  // Markdown, no se escribe nada y el script termina con error.
  verificarCobertura({ markdown, html, origen: pagina.fuente });

  const destino = join(raiz, pagina.ruta);
  mkdirSync(destino, { recursive: true });
  writeFileSync(join(destino, 'index.html'), html, 'utf8');
  console.log(`ToS generado: ${pagina.fuente} → /${pagina.ruta}`);
}
