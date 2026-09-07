/**
 * Escreve as traduções de supabase/seed/translations-en.json na base de dados.
 *
 *   node scripts/seed-translations.mjs --dry-run   # mostra o que faria
 *   node scripts/seed-translations.mjs             # escreve
 *   node scripts/seed-translations.mjs --force     # escreve por cima do que já lá está
 *
 * Precisa de SUPABASE_SERVICE_ROLE_KEY no .env e da coluna `translations`
 * (supabase/migrations/20260905_add_translations.sql).
 *
 * Por omissão NÃO mexe num campo que já tenha tradução: se o Carlos escreveu
 * ou corrigiu a versão inglesa no /admin, correr isto outra vez não lhe apaga o
 * trabalho. O --force é para quando se quer mesmo repor o ficheiro.
 *
 * As imagens que estão coladas dentro do texto português (data:image/...;base64)
 * não vivem no ficheiro de traduções — ocupariam megabytes no repositório. No
 * ficheiro aparecem como __GLIMG_0__, __GLIMG_1__, ... e são substituídas aqui,
 * pela ordem em que aparecem no português, para que a linha inglesa fique
 * completa e independente na base de dados.
 */
import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const LANG = 'en';
const DRY_RUN = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/** Campos de texto por tabela. Tem de bater certo com src/lib/translations.ts. */
const TABELAS = {
  properties: { campos: ['title', 'description'], fonteImagens: 'description' },
  blog_posts: { campos: ['title', 'excerpt', 'content'], fonteImagens: 'content' },
};

const IMG_DATA = /data:image\/[^"')\s]+/g;
const MARCADOR = /__GLIMG_(\d+)__/g;

const vazio = (v) =>
  v == null || (typeof v === 'string' && v.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim() === '');

const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
};

async function pedir(caminho, opcoes = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${caminho}`, { ...opcoes, headers });
  if (!res.ok) {
    const detalhe = await res.text();
    throw new Error(`HTTP ${res.status} em ${caminho}: ${detalhe.slice(0, 300)}`);
  }
  return res.status === 204 ? null : res.json();
}

/** Repõe as imagens do português nos marcadores da tradução. */
function reporImagens(textoEn, textoPt) {
  const imagens = String(textoPt || '').match(IMG_DATA) || [];
  let emFalta = 0;
  const resultado = textoEn.replace(MARCADOR, (marcador, i) => {
    const img = imagens[Number(i)];
    if (!img) {
      emFalta++;
      return marcador;
    }
    return img;
  });
  return { resultado, emFalta };
}

async function main() {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('Falta VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY no .env');
    process.exitCode = 1;
    return;
  }

  const ficheiro = resolve('supabase', 'seed', 'translations-en.json');
  const seed = JSON.parse(readFileSync(ficheiro, 'utf8'));

  let escritas = 0;
  let saltadas = 0;
  const avisos = [];

  for (const [tabela, { campos, fonteImagens }] of Object.entries(TABELAS)) {
    const traducoes = seed[tabela] || {};
    const refs = Object.keys(traducoes);
    if (refs.length === 0) continue;

    console.log(`\n${tabela}: ${refs.length} linhas no ficheiro`);

    let linhas;
    try {
      linhas = await pedir(`${tabela}?select=ref,${campos.join(',')},translations`);
    } catch (err) {
      if (String(err.message).includes('translations')) {
        console.error(
          '\nA coluna `translations` não existe. Corre primeiro a migração:\n' +
            '  supabase/migrations/20260905_add_translations.sql\n'
        );
        process.exitCode = 1;
        return;
      }
      throw err;
    }

    const porRef = new Map(linhas.map((l) => [l.ref, l]));

    for (const ref of refs) {
      const linha = porRef.get(ref);
      if (!linha) {
        avisos.push(`${tabela}/${ref}: já não existe na base de dados`);
        continue;
      }

      const existente = (linha.translations && linha.translations[LANG]) || {};
      const novo = { ...existente };
      let mudou = false;

      for (const campo of campos) {
        const valor = traducoes[ref][LANG] && traducoes[ref][LANG][campo];
        if (vazio(valor)) continue;

        if (!FORCE && !vazio(existente[campo])) {
          saltadas++;
          continue;
        }

        const { resultado, emFalta } = reporImagens(valor, linha[fonteImagens]);
        if (emFalta > 0) {
          avisos.push(`${tabela}/${ref}: ${emFalta} marcador(es) de imagem sem correspondência no português`);
        }
        novo[campo] = resultado;
        mudou = true;
      }

      if (!mudou) continue;

      const payload = { translations: { ...(linha.translations || {}), [LANG]: novo } };
      const tamanho = campos.reduce((t, c) => t + (novo[c] ? novo[c].length : 0), 0);

      if (DRY_RUN) {
        console.log(`  [simulação] ${ref} (${tamanho.toLocaleString('pt-PT')} caracteres)`);
      } else {
        await pedir(`${tabela}?ref=eq.${encodeURIComponent(ref)}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
        console.log(`  ${ref} (${tamanho.toLocaleString('pt-PT')} caracteres)`);
      }
      escritas++;
    }
  }

  console.log(`\n${DRY_RUN ? 'Simulação: ' : ''}${escritas} linha(s) ${DRY_RUN ? 'a escrever' : 'escritas'}.`);
  if (saltadas > 0) {
    console.log(`${saltadas} campo(s) saltado(s) por já terem tradução. Usa --force para os substituir.`);
  }
  if (avisos.length > 0) {
    console.log('\nAvisos:');
    for (const aviso of avisos) console.log(' -', aviso);
  }
}

main().catch((err) => {
  console.error('\nErro:', err.message);
  process.exitCode = 1;
});
