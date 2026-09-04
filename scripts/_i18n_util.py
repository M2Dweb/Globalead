# -*- coding: utf-8 -*-
"""Auxiliar temporário para a migração de textos para os ficheiros de tradução.

Apagado no fim do trabalho — não faz parte do projeto.
"""
import collections
import io
import json

PT = 'src/i18n/locales/pt.json'
EN = 'src/i18n/locales/en.json'


def _load(p):
    return json.load(io.open(p, encoding='utf-8'), object_pairs_hook=collections.OrderedDict)


def _save(p, d):
    io.open(p, 'w', encoding='utf-8', newline='').write(
        json.dumps(d, ensure_ascii=False, indent=2) + '\n')


def add(section, pairs):
    """pairs: lista de (chave, texto_pt, texto_en)."""
    pt, en = _load(PT), _load(EN)
    pt.setdefault(section, collections.OrderedDict())
    en.setdefault(section, collections.OrderedDict())
    for key, p, e in pairs:
        pt[section][key] = p
        en[section][key] = e
    _save(PT, pt)
    _save(EN, en)
    print('  %s: +%d chaves' % (section, len(pairs)))


class Patch(object):
    def __init__(self, path):
        self.path = path
        self.s = io.open(path, encoding='utf-8').read()

    def sub(self, old, new, expected=1):
        n = self.s.count(old)
        if n != expected:
            raise SystemExit('FALHOU em %s (%d != %d): %r' % (self.path, n, expected, old[:90]))
        self.s = self.s.replace(old, new)
        return self

    def save(self):
        io.open(self.path, 'w', encoding='utf-8', newline='').write(self.s)
        print('  OK %s' % self.path)
