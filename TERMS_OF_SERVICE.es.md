# Términos de Servicio

**Then Apply — Web to Markdown API**

> **This Spanish version is provided for convenience; the English version is
> the reference text.**
>
> *Esta versión en español se ofrece por cortesía; el texto de referencia es la
> [versión en inglés](./TERMS_OF_SERVICE.md). En caso de discrepancia entre
> ambas, prevalece la inglesa a efectos de interpretación de estos Términos.*
>
> *Esta cláusula de idioma no es absoluta: cuando el Cliente sea consumidor y
> sus derechos imperativos deriven de la ley de un país de residencia distinto
> del texto de referencia, esos derechos prevalecen sobre esta cláusula en lo
> que la contradigan.*

Última actualización: 9 de agosto de 2026

Estos Términos de Servicio (los «Términos») constituyen un acuerdo vinculante
entre usted y Carlos Fuentes Navarro, persona física residente en España, que
opera bajo la marca **Then Apply** (el «Proveedor», «nosotros»). Al solicitar
una API Key, suscribirse a un plan o realizar cualquier petición al Servicio,
usted acepta estos Términos en su totalidad. Si no los acepta, no use el
Servicio.

---

## 1. Definiciones

- **Servicio** (*Service*) — la plataforma SaaS Then Apply operada en
  `thenapply.dev`, incluida la API **Web to Markdown**, sus endpoints,
  documentación, paneles y cualquier producto sucesor o adicional que el
  Proveedor ponga a disposición bajo la marca Then Apply.
- **Cliente** (*Customer*) — la persona física o jurídica que se suscribe a un
  plan, recibe una API Key o utiliza de cualquier forma el Servicio. Cuando el
  Cliente sea una organización, la persona que acepta estos Términos declara
  estar autorizada para obligarla.
- **API Key** — la credencial secreta emitida al Cliente que autentica las
  peticiones al Servicio e identifica el plan y la cuota asociados a ellas.
- **Contenido** (*Content*) — cualquier entrada que el Cliente envíe al
  Servicio (URLs, HTML en crudo, parámetros) y cualquier salida que el Servicio
  devuelva en respuesta (Markdown, metadatos, cuerpos de error).
- **Plan** — el nivel de Servicio contratado por el Cliente, que determina la
  cuota de peticiones y las funcionalidades aplicables.

## 2. Licencia otorgada al Cliente

Sujeto al cumplimiento continuado de estos Términos y al pago de las tarifas
aplicables, el Proveedor otorga al Cliente un derecho **no exclusivo, no
transferible, no sublicenciable, revocable y limitado** de acceso y uso del
Servicio, exclusivamente mediante la API Key propia del Cliente y
exclusivamente dentro de la cuota de su Plan, para sus fines internos de
negocio o para su incorporación en los productos finales del propio Cliente.

Es una licencia de *uso* del Servicio, no una venta del mismo. No se otorga
ningún derecho distinto de los aquí expresamente indicados.

### 2.1. Usos prohibidos

El Cliente no podrá, ni permitirá a terceros:

**(a) Revender o envolver el Servicio.** Revender, sublicenciar, alquilar,
arrendar o poner de otro modo el Servicio a disposición de terceros como oferta
independiente, ni envolverlo —con o sin una capa fina de código propio— en un
producto que compita con el Servicio o que reproduzca sustancialmente su
funcionalidad. Sí se permite incorporar el Servicio como componente de un
producto más amplio que aporte un valor independiente sustancial; lo que no se
permite es reexponer la API, total o sustancialmente.

**(b) Realizar ingeniería inversa del Servicio.** Aplicar ingeniería inversa,
descompilar, desensamblar o intentar de otro modo derivar el código fuente, los
algoritmos subyacentes, los prompts de modelo o la arquitectura interna del
Servicio, salvo en la medida en que dicha restricción esté expresamente
prohibida por norma imperativa aplicable.

**(c) Compartir la API Key.** Divulgar, publicar, transferir o compartir una
API Key con terceros, ni usar una misma API Key en organizaciones no
relacionadas entre sí. El Cliente es el único responsable de la
confidencialidad de la API Key y de **toda** la actividad realizada con ella,
esté o no autorizada por él.

**(d) Exceder la cuota contratada.** Intentar eludir, sortear o anular la
limitación de tasa, la aplicación de cuotas, la autenticación o cualquier otro
control técnico del Servicio —incluido mediante rotación de claves, reparto de
tráfico entre varias cuentas o cualquier técnica equivalente— con el fin de
obtener servicio por encima del Plan pagado.

El Cliente tampoco usará el Servicio para obtener, procesar o redistribuir
contenido al que no esté autorizado a acceder, ni de forma que abuse, degrade o
ponga en riesgo el Servicio o los sitios de terceros de los que este descarga
contenido.

## 3. API Keys

Las API Keys se muestran en claro **una sola vez**, en el momento de su
emisión. El Proveedor almacena únicamente un hash criptográfico de la clave y,
por tanto, es técnicamente incapaz de recuperar una clave perdida; una clave
perdida debe revocarse y sustituirse. El Cliente deberá notificar al Proveedor
sin demora indebida si una API Key está o pudiera estar comprometida.

## 4. Planes, facturación y Merchant of Record

Las suscripciones y los pagos son procesados íntegramente por **Polar.sh**, que
actúa como **Merchant of Record** de todas las compras realizadas a través del
Servicio. Polar procesa el pago, emite facturas y recibos y es la contraparte
de la transacción de venta. El Proveedor no recibe ni almacena datos de
tarjeta. Las consultas de facturación, reembolsos, correcciones de factura y
cambios de suscripción se gestionan mediante el checkout y el portal de cliente
de Polar, o a través de los contactos de la sección 11.

Cuando Polar confirma una suscripción o compra, el Servicio emite
automáticamente una API Key (para clientes nuevos) o actualiza el Plan asociado
a una clave existente. La entrega de la clave por correo electrónico puede
tardar un breve periodo tras el checkout y no siempre es instantánea.

## 5. Contenido y propiedad intelectual

### 5.1. Titularidad del Servicio

El Servicio, su código fuente, su software subyacente, su documentación, su
diseño visual y los nombres y marcas **Then Apply** y **Web to Markdown** son y
seguirán siendo propiedad exclusiva del Proveedor, Carlos Fuentes Navarro. Se
reservan todos los derechos no otorgados expresamente en la sección 2. **Nada
en estos Términos transfiere, cede ni otorga al Cliente titularidad alguna**
sobre el Servicio ni sobre ningún derecho de propiedad intelectual o industrial
del Proveedor.

Cuando ciertos componentes del Servicio se distribuyan por separado bajo una
licencia de código abierto (por ejemplo, el paquete npm `web-to-markdown`),
dicha licencia rige esos componentes en su forma distribuida. No otorga derecho
alguno sobre el Servicio alojado, su infraestructura o las marcas.

### 5.2. Titularidad del Contenido

Entre las partes, el Cliente conserva todos los derechos sobre la entrada que
envía y sobre la salida que el Servicio le devuelve. El Proveedor no reclama
titularidad alguna sobre el Contenido del Cliente y lo utiliza solo en la
medida necesaria para operar el Servicio y cumplir la ley. El Cliente garantiza
que ostenta los derechos necesarios para enviar su entrada y que hacerlo no
infringe derechos de terceros.

## 6. Suspensión y terminación

El Proveedor podrá **suspender o revocar cualquier API Key con efecto
inmediato** cuando el Cliente incumpla estos Términos —en particular la sección
2.1— o cuando su uso abuse, degrade o ponga en riesgo el Servicio, su
infraestructura o sitios de terceros. Cuando las circunstancias lo permitan
razonablemente, el Proveedor avisará previamente y dará oportunidad de
subsanar; si el incumplimiento es grave o continuado, podrá actuar primero y
notificar después.

**La terminación por incumplimiento no da derecho al Cliente a reembolso alguno
del periodo ya facturado.** El Cliente puede cancelar su suscripción en
cualquier momento a través de Polar; la cancelación surte efecto al final del
periodo de facturación en curso, y el acceso continúa hasta entonces. Las
secciones 5, 7, 8, 9 y 10 sobreviven a la terminación.

## 7. Disponibilidad

**Nada en esta sección excluye ni limita derecho o remedio alguno que la ley
imperativa aplicable reconozca a los consumidores**, incluido el derecho legal
a que el Servicio se suministre y se mantenga conforme al contrato.

El Proveedor empleará esfuerzos razonables para mantener el Servicio disponible
y funcionando conforme a lo descrito en su documentación pública. El Proveedor
**no** publica actualmente ningún Acuerdo de Nivel de Servicio (SLA): la
disponibilidad se ofrece en régimen de **mejor esfuerzo** (*best effort*), sin
compromiso de tiempo de actividad, sin compromiso de tiempo de respuesta y sin
créditos de servicio. Si el Proveedor publicara un SLA, ese documento regirá la
disponibilidad desde su fecha de entrada en vigor y prevalecerá sobre esta
sección en lo que la contradiga.

El Servicio puede quedar temporalmente no disponible por mantenimiento, por
corrección de fallos o por incidencias en la infraestructura de terceros de la
que depende. Cuando la interrupción sea planificada y el preaviso resulte
razonablemente practicable, el Proveedor lo dará.

El Proveedor no garantiza que el Servicio sea ininterrumpido ni esté libre de
errores, ni que la salida Markdown sea exacta o completa para toda página
convertida: la calidad de la conversión depende de la estructura de la página
de origen, que el Proveedor no controla. Esto describe lo que el Servicio hace;
no es una renuncia a la obligación del Proveedor de prestarlo.

Cuando el Cliente sea consumidor en el sentido de la legislación española o de
la Unión Europea, la falta de disponibilidad que suponga falta de conformidad
del Servicio da lugar a los remedios legales preservados en la sección 9.1, con
independencia de lo que diga esta sección.

## 8. Garantías y exclusiones

**Nada en estos Términos excluye ni limita garantía, derecho o remedio alguno
que no pueda excluirse o limitarse legalmente**, incluidos los derechos que la
legislación española y de la Unión Europea reconocen a los consumidores y, en
particular, el derecho a recibir un servicio digital conforme al contrato.

### 8.1. Lo que el Proveedor sí garantiza

El Proveedor garantiza que prestará el Servicio con la diligencia y pericia
razonables y que el Servicio funcionará sustancialmente conforme a lo descrito
en su documentación pública vigente en cada momento.

### 8.2. Lo que el Proveedor no garantiza

Sin perjuicio de la sección 8.1 y de la sección 8.3, y en la máxima medida
permitida por la ley aplicable, el Servicio se presta sin garantías
adicionales, expresas o implícitas, incluidas las de comerciabilidad,
idoneidad para un fin determinado, exactitud y no infracción.

Cuando el Cliente no actúe como consumidor en el sentido de la legislación
española o de la Unión Europea, esta exclusión se extiende a las garantías
implícitas por ley, en la máxima medida que la ley aplicable permita.

### 8.3. Consumidores

Cuando el Cliente sea consumidor en el sentido de la legislación española o de
la Unión Europea, nada en esta sección excluye ni limita los requisitos de
conformidad que la ley aplicable impone a los servicios digitales, ni ningún
remedio disponible por falta de conformidad. El Proveedor no excluye las
garantías legales frente a consumidores.

## 9. Limitación de responsabilidad

**Nada en estos Términos excluye ni limita responsabilidad, derecho o remedio
alguno que no pueda excluirse o limitarse legalmente conforme a la ley
aplicable.** En particular, nada en esta sección afecta a los derechos y
remedios imperativos que la legislación española o de la Unión Europea en
materia de consumo reconoce a los consumidores, ni a las obligaciones del
Proveedor en materia de protección de datos. Si alguna parte de esta sección se
declarase inaplicable, el resto seguirá surtiendo efecto.

Con ese límite, la responsabilidad del Proveedor en relación con el Servicio se
limita según se establece a continuación.

### 9.1. Daños excluidos

En la máxima medida permitida por la ley aplicable, el Proveedor no responderá
de daños indirectos, incidentales, especiales, consecuenciales o punitivos, ni
del lucro cesante o de la pérdida de ingresos, datos, negocio, fondo de
comercio u otra pérdida económica similar, derivados del Servicio o
relacionados con él, aun habiendo sido advertido de su posibilidad.

Cuando el Cliente sea consumidor en el sentido de la legislación española o de
la Unión Europea, esta exclusión se aplica únicamente en la medida en que lo
permita la ley imperativa aplicable y, en todo caso, no excluye ni limita:

- la responsabilidad por daños directos causados por el incumplimiento del
  Proveedor, o por el cumplimiento defectuoso, de sus obligaciones conforme a
  estos Términos; ni
- ningún derecho o remedio legal que asista al consumidor por falta de
  conformidad del Servicio, incluidos el derecho a que el Servicio se ponga en
  conformidad, a una reducción del precio, a resolver el contrato o a obtener
  el reembolso.

### 9.2. Servicios y contenidos de terceros

El Servicio convierte el contenido que el **Cliente** le indica que descargue o
que el propio Cliente le envía. El Proveedor no selecciona, controla, verifica
ni respalda ese contenido, y no responderá de él ni de la falta de
autorización del Cliente para acceder a él o tratarlo.

Como se indica en la sección 4, Polar.sh actúa como Merchant of Record y es la
contraparte de la propia transacción de venta; la facturación, la emisión de
facturas y la tramitación de reembolsos se rigen, por tanto, por los términos
de Polar.

El Proveedor no responderá de los actos u omisiones de los proveedores externos
independientes de los que depende el Servicio. Esto **no** limita la
responsabilidad del Proveedor cuando el daño derive de su propio incumplimiento
de estos Términos, de su propia negligencia en la selección u operación de esos
proveedores, o de cualquier obligación que corresponda al Proveedor en materia
de protección de datos respecto de los encargados que actúen por su cuenta.

### 9.3. Límite agregado — Clientes que actúan como empresa

Cuando el Cliente no actúe como consumidor en el sentido de la legislación
española o de la Unión Europea, la responsabilidad agregada del Proveedor
derivada de estos Términos o del Servicio, o relacionada con ellos, no excederá
del importe total efectivamente abonado por el Cliente por el Servicio durante
los **doce (12) meses** inmediatamente anteriores al hecho que origine la
reclamación.

### 9.4. Clientes que son consumidores

Cuando el Cliente sea consumidor en el sentido de la legislación española o de
la Unión Europea, el límite de la sección 9.3 **no** se aplica. La
responsabilidad del Proveedor frente a un consumidor se determina conforme a la
ley aplicable, limitada —en la medida en que esa ley lo permita— a los daños
que fueran previsibles al tiempo de celebrarse el contrato y que sean
consecuencia directa del incumplimiento del Proveedor.

**Ninguna disposición de estos Términos se interpretará en el sentido de
reducir la responsabilidad del Proveedor frente a un consumidor por debajo del
nivel exigido por la ley imperativa aplicable, y ello con independencia de que
el consumidor pague o no por el Servicio.**

### 9.5. Responsabilidad que nunca se excluye ni se limita

Nada en estos Términos excluye ni limita la responsabilidad del Proveedor por:

- dolo o culpa grave;
- muerte o daños personales;
- fraude o manifestaciones fraudulentas;
- daños causados por infracción de la normativa de protección de datos,
  incluido el derecho a indemnización conforme al Reglamento General de
  Protección de Datos;
- cualquier remedio legal por falta de conformidad debido a un consumidor,
  incluido el reembolso que proceda por ley; ni
- cualquier otra responsabilidad que la ley imperativa aplicable no permita al
  Proveedor excluir o limitar.

## 10. Ley aplicable y jurisdicción

Estos Términos se rigen por la legislación **española**, con exclusión de sus
normas de conflicto de leyes y de la Convención de las Naciones Unidas sobre
los Contratos de Compraventa Internacional de Mercaderías.

Cuando el Cliente actúe como empresa, las partes se someten a la jurisdicción
exclusiva de los **tribunales de España**. Cuando el Cliente sea consumidor en
el sentido de la legislación española o de la Unión Europea, esta cláusula no
le priva de la protección de las disposiciones imperativas de la ley de su país
de residencia ni del derecho a acudir a los tribunales competentes conforme a
ellas.

## 11. Cambios en estos Términos

El Proveedor podrá actualizar estos Términos. Para los cambios **materiales**
—aquellos que reduzcan significativamente los derechos del Cliente o aumenten
sus obligaciones— el Proveedor notificará a los clientes activos **por correo
electrónico con al menos treinta (30) días de antelación** a su entrada en
vigor. El Cliente que no acepte un cambio material podrá cancelar su
suscripción antes de la fecha de efecto; el uso continuado del Servicio a
partir de esa fecha constituye aceptación.

Los cambios no materiales (aclaraciones, correcciones, actualización de datos
de contacto) surten efecto con su publicación, actualizando la fecha de la
cabecera de este documento.

## 12. Contacto

- Cuenta y facturación: <carlosfu.invers@gmail.com> (dirección temporal
  mientras se configura un buzón de soporte dedicado)
- Errores y problemas técnicos:
  <https://github.com/Karlangas12/web-to-markdown/issues>
