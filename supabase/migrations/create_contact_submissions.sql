-- ============================================================
-- Tabela: contact_submissions
-- Guarda todas as submissões dos formulários do site Globalead
-- Executar no Supabase → SQL Editor
-- ============================================================

create table if not exists contact_submissions (
  id             uuid                     default gen_random_uuid() primary key,
  created_at     timestamp with time zone default now(),

  -- Dados do contacto
  nome           text,
  apelido        text,
  email          text,
  telemovel      text,

  -- Dados do formulário
  assunto        text,
  mensagem       text,
  meio_contacto  text,
  horario        text,
  distrito       text,
  cod_postal     text,
  page           text,   -- página/formulário de origem (home, contacto, seguros, credito, etc.)

  -- Campos adicionais guardados como JSON (área, quartos, valor empréstimo, etc.)
  extra_data     jsonb   default '{}',

  -- Estado de gestão (novo → lido → respondido)
  status         text    default 'novo'
);

-- Índices para pesquisa rápida
create index if not exists idx_contact_submissions_created_at on contact_submissions(created_at desc);
create index if not exists idx_contact_submissions_status     on contact_submissions(status);
create index if not exists idx_contact_submissions_page       on contact_submissions(page);

-- Desativar Row Level Security para que o admin possa ler/escrever sem autenticação Supabase
-- (o acesso já é protegido pela password do AdminPage)
alter table contact_submissions disable row level security;
