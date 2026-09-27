/**
 * Origem da visita: de onde a pessoa chegou ao site (Instagram, Facebook, Google, outro site…).
 *
 * Guarda-se no primeiro carregamento de cada visita e junta-se a cada pedido dos formulários
 * (contact_submissions.extra_data.origem), para o CRM saber de onde vêm os pedidos.
 * Fica só nesta visita (sessionStorage): não é um cookie e não identifica a pessoa. Dos anúncios
 * guarda-se apenas se houve clique (fbclid/gclid: sim ou não), nunca o identificador do clique.
 */
export interface OrigemVisita {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  /** Página de onde veio, só quando é de fora do site (sem parâmetros). */
  referrer?: string;
  /** Primeira página aberta nesta visita. */
  pagina_entrada?: string;
  fbclid?: boolean;
  gclid?: boolean;
}

const CHAVE = 'globalead_origem_visita';
const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const corta = (v: string | null | undefined, n = 150) => (v ?? '').trim().slice(0, n);

export function guardarOrigemDaVisita(): void {
  try {
    if (typeof window === 'undefined' || sessionStorage.getItem(CHAVE)) return;
    const q = new URLSearchParams(window.location.search);
    const origem: OrigemVisita = {};
    for (const k of UTM) {
      const v = corta(q.get(k));
      if (v) origem[k] = v;
    }
    try {
      const u = new URL(document.referrer);
      if (u.hostname !== window.location.hostname) origem.referrer = corta(u.origin + u.pathname, 200);
    } catch {
      // sem página de origem (entrada direta)
    }
    // Página de entrada só com o caminho e os utm_* (sem fbclid/gclid nem outros identificadores).
    const utm = new URLSearchParams();
    for (const k of UTM) if (origem[k]) utm.set(k, origem[k] as string);
    origem.pagina_entrada = corta(window.location.pathname + (utm.toString() ? `?${utm}` : ''), 200);
    if (q.has('fbclid')) origem.fbclid = true;
    if (q.has('gclid')) origem.gclid = true;
    sessionStorage.setItem(CHAVE, JSON.stringify(origem));
  } catch {
    // sessionStorage bloqueado: os pedidos seguem sem origem
  }
}

export function origemDaVisita(): OrigemVisita | null {
  try {
    const v = sessionStorage.getItem(CHAVE);
    return v ? (JSON.parse(v) as OrigemVisita) : null;
  } catch {
    return null;
  }
}
