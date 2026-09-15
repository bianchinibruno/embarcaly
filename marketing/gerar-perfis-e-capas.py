# -*- coding: utf-8 -*-
"""Gera fotos de perfil e capas de rede social do Embarcaly, no sistema visual v3.

Saída em marketing/artes/perfis/.

Regras aplicadas (brand/IDENTIDADE.md):
  - fundo breu #1C1E3C, marca branca, barra "agora" em laranja #ED8426
  - o braço de baixo do E nunca encurta (encurtou, virou F); ele desbota a 55%
  - o E ampliado é textura: sai da peça cortado pela borda e PERDE a barra laranja
  - cantos retos, sem sombra, sem gradiente, sem emoji
  - Poppins no texto, IBM Plex Mono em número
  - barra laranja de rodapé colada na base
  - a marca do avatar cabe dentro do recorte circular das redes
"""
import os
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(BASE)
FONTS = os.path.join(REPO, "brand", "fonts")
OUT = os.path.join(BASE, "artes", "perfis")
os.makedirs(OUT, exist_ok=True)

BREU = (28, 30, 60)
PAPEL = (242, 241, 239)
INK = (51, 54, 106)
STAMP = (237, 132, 38)
BRANCO = (255, 255, 255)
APOIO = (201, 203, 228)

# geometria canônica do E de Três Tempos (viewBox 48x48), igual a brand/gen_brand.py
BARS = [
    ("haste", 7.0, 9.00, 6.5, 30.0, "ink"),
    ("agora", 15.0, 9.00, 26.0, 6.5, "stamp"),
    ("depois", 15.0, 20.75, 19.0, 6.5, "ink"),
    ("mais_tarde", 15.0, 32.50, 26.0, 6.5, "ink_soft"),
]
SOFT = 0.55
BBOX = (7.0, 9.0, 41.0, 39.0)  # x0, y0, x1, y1 em unidades


def poppins(weight, size):
    return ImageFont.truetype(os.path.join(FONTS, f"Poppins-{weight}.ttf"), size)


def mono(weight, size):
    return ImageFont.truetype(os.path.join(FONTS, f"IBMPlexMono-{weight}.ttf"), size)


def desenhar_marca(img, escala, ox, oy, ink=BRANCO, stamp=STAMP, textura=False, alpha=255):
    """Desenha o E. textura=True remove a barra laranja (regra do E ampliado)."""
    camada = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(camada)
    for _, x, y, w, h, papel in BARS:
        cor = ink
        a = alpha
        if papel == "stamp":
            cor = ink if textura else stamp
        if papel == "ink_soft":
            a = int(alpha * SOFT)
        d.rectangle(
            [ox + x * escala, oy + y * escala,
             ox + (x + w) * escala, oy + (y + h) * escala],
            fill=cor + (a,),
        )
    img.alpha_composite(camada)


def rodape_laranja(img, altura):
    d = ImageDraw.Draw(img)
    d.rectangle([0, img.height - altura, img.width, img.height], fill=STAMP + (255,))


def salvar(img, nome):
    caminho = os.path.join(OUT, nome)
    img.convert("RGB").save(caminho, "PNG", optimize=True)
    print("->", os.path.relpath(caminho, REPO), img.size)


# ---------------------------------------------------------------- avatar
def avatar(nome, fundo, ink, stamp, tamanho=1080):
    """A marca cabe num círculo de 75% do lado — as redes recortam em círculo."""
    img = Image.new("RGBA", (tamanho, tamanho), fundo + (255,))
    lw, lh = BBOX[2] - BBOX[0], BBOX[3] - BBOX[1]
    diagonal = (lw ** 2 + lh ** 2) ** 0.5
    escala = (tamanho * 0.75) / diagonal
    ox = (tamanho - lw * escala) / 2 - BBOX[0] * escala
    oy = (tamanho - lh * escala) / 2 - BBOX[1] * escala
    desenhar_marca(img, escala, ox, oy, ink=ink, stamp=stamp)
    salvar(img, nome)


# ---------------------------------------------------------------- capas
def capa(nome, largura, altura, linhas, safe=None, corte="direita", barra=None,
         espaco_ratio=0.055):
    """linhas: lista de (texto, fonte, cor). safe: (x0,y0,x1,y1) área visível."""
    img = Image.new("RGBA", (largura, altura), BREU + (255,))

    # E ampliado como textura: ocupa a altura inteira, a haste fica junto à
    # margem e os braços saem cortados pela borda. Sem a barra laranja.
    escala = altura / 30.0
    if corte == "direita":
        ox = largura * 0.82 - BBOX[0] * escala
    else:
        ox = largura * 0.18 - (BBOX[2] - 6.5) * escala
    oy = -BBOX[1] * escala
    desenhar_marca(img, escala, ox, oy, ink=BRANCO, textura=True, alpha=30)

    d = ImageDraw.Draw(img)
    x0, y0, x1, y1 = safe if safe else (0, 0, largura, altura)

    # bloco de texto centrado verticalmente na área segura
    alturas = []
    for texto, fonte, _ in linhas:
        caixa = d.textbbox((0, 0), texto, font=fonte)
        alturas.append(caixa[3] - caixa[1])
    espaco = int(altura * espaco_ratio)
    total = sum(alturas) + espaco * (len(linhas) - 1)
    y = y0 + ((y1 - y0) - total) / 2

    # lockup: marca pequena + palavra, na primeira linha
    marca_escala = alturas[0] / 30.0 * 1.35
    marca_larg = (BBOX[2] - BBOX[0]) * marca_escala
    texto0, fonte0, cor0 = linhas[0]
    caixa0 = d.textbbox((0, 0), texto0, font=fonte0)
    larg0 = caixa0[2] - caixa0[0]
    gap = marca_larg * 0.42
    x = x0 + ((x1 - x0) - (marca_larg + gap + larg0)) / 2
    desenhar_marca(img, marca_escala, x - BBOX[0] * marca_escala,
                   y - BBOX[1] * marca_escala + (alturas[0] - 30 * marca_escala) / 2)
    d.text((x + marca_larg + gap - caixa0[0], y - caixa0[1]), texto0, font=fonte0, fill=cor0)
    d.text((x + marca_larg + gap - caixa0[0] + larg0 - _larg(d, "ly", fonte0),
            y - caixa0[1]), "ly", font=fonte0, fill=STAMP)
    y += alturas[0] + espaco

    for texto, fonte, cor in linhas[1:]:
        caixa = d.textbbox((0, 0), texto, font=fonte)
        largura_txt = caixa[2] - caixa[0]
        d.text((x0 + ((x1 - x0) - largura_txt) / 2 - caixa[0], y - caixa[1]),
               texto, font=fonte, fill=cor)
        y += (caixa[3] - caixa[1]) + espaco

    rodape_laranja(img, barra or max(12, int(altura * 0.028)))
    salvar(img, nome)


def _larg(d, texto, fonte):
    caixa = d.textbbox((0, 0), texto, font=fonte)
    return caixa[2] - caixa[0]


if __name__ == "__main__":
    # perfil — serve para Instagram, TikTok, X, Threads e YouTube
    avatar("avatar-1080.png", BREU, BRANCO, STAMP)
    avatar("avatar-claro-1080.png", PAPEL, INK, STAMP)

    # capa do X — 1500x500. O avatar cobre o canto inferior esquerdo,
    # por isso o texto fica centralizado e acima da base.
    capa(
        "capa-x-1500x500.png", 1500, 500,
        [
            ("embarcaly", poppins(700, 92), BRANCO),
            ("Voo, hotel, carro e passeio num lugar só.", poppins(400, 34), APOIO),
            ("R$39 por viagem. Não é assinatura.", mono(500, 30), STAMP),
        ],
        safe=(60, 55, 1400, 425),
        barra=14,
    )

    # capa do YouTube — 2560x1440, tudo dentro da area segura de 1546x423
    capa(
        "capa-youtube-2560x1440.png", 2560, 1440,
        [
            ("embarcaly", poppins(700, 140), BRANCO),
            ("Quando um elo da viagem quebra, a cadeia inteira se refaz.", poppins(400, 52), APOIO),
            ("Android primeiro. R$39 por viagem.", mono(500, 46), STAMP),
        ],
        safe=(507, 508, 2053, 931),
        barra=22,
        espaco_ratio=0.038,
    )
