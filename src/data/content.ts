/**
 * ✏️ TODO LO EDITABLE VIVE AQUÍ
 * Cambia textos, fotos, fecha y música sin tocar los componentes.
 */

export const site = {
  title: 'Para Valecita ❤️',
  description: 'Una pequeña sorpresa de cumpleaños hecha con mucho cariño.',
  /** Nombre cariñoso que aparece en varios textos */
  nickname: 'Valecita',
};

export const loader = {
  first: 'Preparando algo especial para ti...',
  second: 'Feliz cumpleaños, bonita ❤️',
};

export const hero = {
  eyebrow: 'Para Valeria Vargas',
  title: 'Feliz cumpleaños, bonita ❤️',
  subtitle: 'Hoy es un día especial porque celebramos a una persona aún más especial.',
  button: 'Tengo algo para ti ✨',
};

export const lock = {
  /** La página queda bloqueada con un contador hasta esta fecha (mes 1-12, día). */
  month: 9,
  day: 28,
  title: 'Bloqueado hasta el 28 de septiembre',
  subtitle: 'Algo especial se está preparando. Vuelve cuando el contador llegue a cero, o escribe la contraseña correcta si la tienes.',
  units: { days: 'días', hours: 'hrs', minutes: 'min', seconds: 'seg' },
  placeholder: '••••••',
  button: 'Desbloquear',
  /** ✏️ Sale una al azar cada vez que la contraseña está mal. Agrega las que quieras. */
  wrongMessages: [
    'Contraseña incorrecta. Sigue intentando...',
    'Pídele a tu novio que te la diga.',
    'Hazle piojito, seguro te la dice.',
    'Todavía no es tu cumpleaños. Vuelve después.',
    'Esa no es. Lo siento, mi amor.',
    'Ni lo sueñes, todavía no.',
  ],
  /**
   * Hash (no la contraseña en texto plano) para que no aparezca en el código.
   * Si quieres cambiar la contraseña, pide que te generen el hash de la nueva.
   * Contraseña actual: 6 dígitos que solo tú conoces.
   */
  passwordHash: '11m5pds',
};

export const deployUrl = 'https://vale-dusky.vercel.app';

/** Lo que se ve al pegar el link en WhatsApp/redes: bonito, pero sin spoilers. */
export const og = {
  title: 'Shhh... alguien está preparando algo para ti',
  description: 'Bloqueado hasta el 28 de septiembre. Descúbrelo cuando el contador llegue a cero.',
  image: '/og-cover.jpg',
};

export const revisit = {
  title: 'Revive los momentos',
  /** `icon` es una llave (no un emoji): 'mail' | 'photo' | 'book' | 'star' | 'game' | 'heart' */
  items: [
    { icon: 'mail', label: 'Para ti', href: '#para-ti' },
    { icon: 'photo', label: 'Recuerdos', href: '#recuerdos' },
    { icon: 'book', label: 'Historia', href: '#historia' },
    { icon: 'star', label: 'Razones', href: '#razones' },
    { icon: 'game', label: 'Juego', href: '#juego' },
    { icon: 'heart', label: 'Carta', href: '#carta' },
  ],
};

export const message = {
  eyebrow: 'Para ti',
  title: 'Para ti, Valecita',
  paragraphs: [
    'Quería hacerte algo diferente para recordarte lo mucho que significas para mí. No podía dejar pasar tu cumpleaños sin prepararte aunque sea un pequeño detalle.',
    'Gracias por ser tú, por hacerme reír y por hacer más bonitos hasta los días normales.',
  ],
  signature: 'Con todo mi cariño, Abraham Robledo',
};

export const gallery = {
  title: 'Algunos de mis momentos favoritos contigo ❤️',
  giftHint: 'Toca tu regalo y prepárate para el estallido 🎁',
  hint: 'Toca cada foto ✨',
  /**
   * 📸 PARA PONER TUS FOTOS:
   * 1. Copia tus imágenes a  public/photos/  (jpg, png o webp)
   * 2. Cambia `src` por su nombre, p. ej. '/photos/nosotros.jpg'
   * 3. Cambia `caption` y `alt`.
   * `ratio` es la forma de la tarjeta: '4/5' (vertical), '1/1' (cuadrada) o '4/3' (horizontal).
   * Puedes agregar o quitar fotos libremente.
   */
  photos: [
    { src: '/photos/foto-1.jpg', alt: 'Valeria y Abraham frente al espejo', caption: 'Ese beso robado frente al espejo', ratio: '3/4' },
    { src: '/photos/foto-2.jpg', alt: 'Valeria y Abraham sonriendo juntos', caption: 'Tu sonrisa, mi cosa favorita', ratio: '3/4' },
    { src: '/photos/foto-3.jpg', alt: 'Valeria y Abraham abrazados, elegantes', caption: 'Esa noche elegante contigo', ratio: '3/4' },
    { src: '/photos/foto-4.jpg', alt: 'Valeria y Abraham dándose un beso en el elevador', caption: 'Nos robamos besos hasta en el elevador', ratio: '3/4' },
    { src: '/photos/foto-5.jpg', alt: 'Valeria y Abraham de viaje, atardecer', caption: 'Ese viaje que no voy a olvidar', ratio: '3/4' },
    { src: '/photos/foto-6.jpg', alt: 'Valeria y Abraham con gorras en un centro comercial', caption: 'Esas caras que solo tú me sacas', ratio: '3/4' },
    { src: '/photos/foto-7.jpg', alt: 'Valeria y Abraham haciendo caras chistosas', caption: 'Nuestras caras de siempre', ratio: '4/3' },
    { src: '/photos/foto-8.jpg', alt: 'Valeria y Abraham en la Plaza de España, Sevilla', caption: 'Sevilla contigo fue mágico', ratio: '3/4' },
    { src: '/photos/foto-9.jpg', alt: 'Valeria y Abraham vestidos de negro', caption: 'Combinamos hasta la ropa', ratio: '3/4' },
    { src: '/photos/foto-10.jpg', alt: 'Valeria y Abraham gritando de la emoción', caption: 'Gritando de la emoción, como siempre', ratio: '4/3' },
    { src: '/photos/foto-11.jpg', alt: 'Valeria y Abraham en una cena especial', caption: 'Cenas que se sienten de cuento', ratio: '4/3' },
    { src: '/photos/foto-12.jpg', alt: 'Valeria con la bandera de México', caption: 'Tan orgullosa de los tuyos, mi belga-mexicana', ratio: '3/4' },
    { src: '/photos/foto-13.jpg', alt: 'Valeria y Abraham con playeras de la selección', caption: 'Echándole porras juntos', ratio: '4/3' },
    { src: '/photos/foto-14.jpg', alt: 'Abraham dándole un beso en la frente a Valeria', caption: 'Un beso en la frente, mi lugar favorito', ratio: '3/4' },
    { src: '/photos/foto-15.jpg', alt: 'Valeria y Abraham en la nieve', caption: 'Contigo hasta el frío se siente bien', ratio: '3/4' },
    { src: '/photos/foto-16.jpg', alt: 'Valeria y Abraham con mascarillas faciales', caption: 'Cuidándonos la cara y muriendo de risa', ratio: '3/4' },
    { src: '/photos/foto-17.jpg', alt: 'Valeria y Abraham en la Torre Eiffel de noche', caption: 'Esa noche en la Torre Eiffel', ratio: '4/3' },
    { src: '/photos/foto-18.jpg', alt: 'Valeria y Abraham en una cena, payaseando', caption: 'Payaseando como siempre', ratio: '3/4' },
    { src: '/photos/foto-19.jpg', alt: 'Valeria y Abraham en la Alhambra al atardecer', caption: 'Ese atardecer en la Alhambra', ratio: '3/4' },
    { src: '/photos/foto-20.jpg', alt: 'Valeria y Abraham en un partido de fútbol', caption: 'Noche de fútbol contigo', ratio: '4/5' },
  ],
};

export const story = {
  eyebrow: 'Nuestra historia',
  title: 'Cómo empezó todo',
  /** ✏️ Cambia fechas, títulos y textos (agrega o quita los que quieras). */
  events: [
    { date: '4 de abril de 2026', title: 'Nos hicimos novios', text: 'El día que todo se volvió más bonito. Mi mejor decisión.', icon: '💍' },
    { date: 'Nuestra primera salida', title: 'Contigo el tiempo vuela', text: 'Escribe aquí un recuerdo de ese día.', icon: '✨' },
    { date: 'Un día cualquiera', title: 'Reímos sin parar', text: 'Escribe aquí ese momento que solo ustedes entienden.', icon: '😂' },
    { date: 'Hoy', title: 'Tu cumpleaños', text: 'Celebrándote a ti, mi persona favorita.', icon: '🎂' },
  ],
};

export const reasons = {
  eyebrow: 'Razones',
  title: 'Por qué te amo',
  hint: 'Toca cada corazón para descubrirlas',
  /** ✏️ Cambia las razones por las tuyas. */
  items: [
    'Por tu sonrisa, que me arregla el día.',
    'Por lo linda que eres por dentro y por fuera.',
    'Por cómo me haces reír, incluso cuando no quiero.',
    'Por escucharme y estar siempre ahí.',
    'Por ser exactamente como eres, mi Valecita.',
    'Porque contigo todo se siente en casa.',
  ],
};

export const game = {
  eyebrow: 'Un mini juego',
  title: 'Atrapa mis corazones',
  hint: 'Toca los corazones antes de que caigan. Las estrellas doradas valen ×3 ✨ y los corazones rotos 💔 te quitan puntos. ¡Pasa los 3 niveles para ganar tu premio!',
  start: 'Jugar 🎮',
  next: 'Siguiente nivel ➜',
  retry: 'Reintentar nivel 🔁',
  again: 'Jugar otra vez 🔁',
  /**
   * Niveles: cada uno dura `time` segundos y necesita `goal` puntos.
   * `speed` = velocidad de caída, `spawn` = segundos entre corazones (menos = más difícil),
   * `size` = tamaño (menos = más chicos), `bad` = probabilidad de corazón roto (0 a 1).
   */
  levels: [
    { time: 15, goal: 10, speed: 1, spawn: 0.8, size: 1, bad: 0 },
    { time: 15, goal: 16, speed: 1.4, spawn: 0.58, size: 0.86, bad: 0.12 },
    { time: 15, goal: 24, speed: 1.9, spawn: 0.4, size: 0.74, bad: 0.2 },
  ],
  levelDone: '¡Nivel superado! Ahora se pone más difícil 😏',
  levelFail: '¡Casi! Vuelve a intentarlo 😘',
  win: '¡GANASTE! Me robaste el corazón (otra vez) ❤️',
  /** 🎁 El premio que aparece como cupón. ¡Cámbialo por el tuyo! */
  prize: {
    label: 'Cupón de premio',
    title: 'Una cita a tu elección',
    text: 'Tú escoges el plan y yo pongo todo lo demás. Incluye abrazo gigante y, de postre, yo 😏',
    note: 'Válido por siempre · Canjéalo con Abraham Robledo 😘',
  },
};

export const wish = {
  eyebrow: 'Es tu momento',
  title: 'Pide un deseo',
  button: 'Soplar las velas 🎂',
  again: 'Encender de nuevo 🕯️',
  hint: 'Cierra los ojos, piensa en tu deseo y toca el pastel',
  done: 'Que todos tus deseos se cumplan, mi amor. ❤️',
};

export const special = {
  title: 'Y esto apenas comienza...',
  /** Fecha desde que son novios (AAAA-MM-DD): 4 de abril de 2026 */
  since: '2026-04-04',
  counterLabel: 'Llevamos juntos',
  phrase: 'Espero poder seguir creando muchísimos recuerdos contigo.',
};

export const letter = {
  title: 'Una última cosita...',
  button: 'Abrir carta 💌',
  hint: 'Tócala con cuidado',
  greeting: 'Mi Valecita,',
  paragraphs: [
    'No soy muy bueno con las palabras, pero quería intentarlo. Gracias por llegar a mi vida y por quedarte en ella con esa ternura tan tuya. Desde el 4 de abril de 2026 mi vida es mucho más bonita.',
    'Me encanta tu risa, tu forma de ver las cosas y cómo logras que todo se sienta más ligero. Contigo aprendí que la felicidad también está en lo pequeño.',
    'Hoy quiero que sepas que estoy muy orgulloso de ti y muy agradecido de celebrarte. Que este nuevo año te llene de cosas bonitas, tanto como tú llenas mi vida.',
  ],
  closing: 'Te amo muchísimo,',
  signature: 'Abraham Robledo ❤️',
};

export const finale = {
  title: 'Feliz cumpleaños, mi bonita ❤️',
  subtitle: 'Te amo muchísimo.',
  tapHint: 'Toca el corazón',
  backToTop: 'Volver al inicio ↑',
};

export const music = {
  /**
   * 🎵 CANCIÓN: pon tu mp3 en public/music/ (por ejemplo la de Harry Styles que le guste)
   * y escribe aquí su ruta. Si el archivo no existe, suena una cajita de música
   * romántica generada en el navegador.
   */
  src: '/music/harry-styles.mp3',
  volume: 0.6,
};
