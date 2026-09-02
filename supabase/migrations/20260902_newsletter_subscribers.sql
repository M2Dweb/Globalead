-- ============================================================
-- Tabela: newsletter_subscribers
--
-- Lista própria de subscritores da newsletter. O envio das campanhas é feito
-- no Brevo, mas a lista fica também aqui: se um dia se mudar de plataforma,
-- os contactos são da Globalead e não da ferramenta.
--
-- Executar no Supabase → SQL Editor.
-- ============================================================

create table if not exists newsletter_subscribers (
  id               uuid                     default gen_random_uuid() primary key,
  created_at       timestamp with time zone default now(),

  -- Guardado sempre em minúsculas (normalizado na Netlify Function), para que
  -- "Joao@x.pt" e "joao@x.pt" não entrem como dois subscritores diferentes.
  email            text not null unique,
  nome             text,
  apelido          text,

  -- RGPD: prova de que houve consentimento, quando e a partir de onde.
  consent_at       timestamp with time zone default now(),
  source           text,   -- 'rodape', 'popup', ...

  -- ativo → removido (não apagamos: é preciso saber que pediu para sair)
  status           text not null default 'ativo',
  unsubscribed_at  timestamp with time zone,

  -- false = ficou por sincronizar com o Brevo (a API falhou nesse momento).
  -- Permite reenviar mais tarde sem perder a subscrição.
  brevo_synced     boolean not null default false
);

create index if not exists idx_newsletter_subscribers_created_at on newsletter_subscribers(created_at desc);
create index if not exists idx_newsletter_subscribers_status     on newsletter_subscribers(status);

-- ------------------------------------------------------------
-- Segurança
--
-- AO CONTRÁRIO da contact_submissions, esta tabela fica com RLS LIGADO e sem
-- políticas. A chave anónima do Supabase viaja no bundle do site — qualquer
-- pessoa a pode extrair — por isso não pode dar acesso à lista de emails.
--
-- As subscrições não entram diretamente do browser: passam pela função
-- /.netlify/functions/newsletter-subscribe, que usa a service role key
-- (ignora RLS) e nunca chega ao lado do cliente.
-- ------------------------------------------------------------
alter table newsletter_subscribers enable row level security;

comment on table newsletter_subscribers is
  'Subscritores da newsletter. Escrita/leitura só pelas Netlify Functions (service role). RLS ligado sem políticas = inacessível com a chave anónima.';
