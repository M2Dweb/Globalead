-- ============================================================
-- Tabela: team_members
--
-- Equipa da página Sobre (secção «A nossa equipa»). O Carlos gere-a no painel
-- do CRM (crm.globalead.pt/admin → Equipa): acrescentar, editar, esconder,
-- mudar a ordem e apagar pessoas, com a fotografia guardada no R2 (pasta
-- equipa/).
--
-- Executar no Supabase → SQL Editor. Pode correr-se mais do que uma vez.
-- ============================================================

create table if not exists public.team_members (
  id            uuid                     default gen_random_uuid() primary key,
  created_at    timestamp with time zone default now(),

  name          text not null,
  role          text not null default '',   -- cargo em português (ex.: «Advogada»)
  photo_url     text,                       -- retrato; no site aparece a preto e branco

  -- Botões de contacto ao lado do nome. Vazio = o botão não aparece.
  whatsapp      text,
  phone         text,
  email         text,

  position      integer not null default 0, -- ordem no site (1, 2, 3…)
  is_published  boolean not null default true,

  -- Cargo noutros idiomas, como nos imóveis e no blog: { "en": { "role": "Lawyer" } }.
  -- Sem tradução, o site em inglês mostra o cargo em português.
  translations  jsonb not null default '{}'::jsonb
);

create index if not exists idx_team_members_position on public.team_members(position);

-- ------------------------------------------------------------
-- Segurança: o site (chave pública) só lê quem está visível. Escrever passa
-- pelo painel do CRM, que usa a chave de serviço e ignora estas regras.
-- ------------------------------------------------------------
alter table public.team_members enable row level security;

drop policy if exists "site lê equipa visível" on public.team_members;
create policy "site lê equipa visível" on public.team_members
  for select to anon, authenticated using (is_published);

comment on table public.team_members is
  'Equipa da página Sobre. Gerida no painel do CRM (chave de serviço); o site só lê as linhas com is_published.';

-- ------------------------------------------------------------
-- Pessoas que já estavam no site. Só entram com a tabela vazia, por isso
-- correr isto outra vez não as duplica nem desfaz alterações do painel.
-- ------------------------------------------------------------
insert into public.team_members (name, role, photo_url, whatsapp, phone, email, position, translations)
select v.name, v.role, v.photo_url, v.whatsapp, v.phone, v.email, v.position, v.translations
from (values
  ('Carlos Gonçalves', 'Fundador e CEO', 'https://globalead.pt/equipa/carlos-goncalves.jpg',
   '+351 910 647 620', '+351 910 647 620', 'geral@globalead.pt', 1, '{"en": {"role": "Founder & CEO"}}'::jsonb),
  ('Duarte Vinhas', 'Desenvolvedor', 'https://globalead.pt/equipa/duarte-vinhas.jpg',
   null, null, 'dev@globalead.pt', 2, '{"en": {"role": "Developer"}}'::jsonb)
) as v(name, role, photo_url, whatsapp, phone, email, position, translations)
where not exists (select 1 from public.team_members);
