# -*- coding: utf-8 -*-
"""Gera o kit de marca do Embarcaly: SVGs e PNGs a partir da geometria do Conceito A."""
import os
from PIL import Image, ImageDraw

BASE = r"C:\Users\Bruno Bianchini\OneDrive\Documents\repos\embarcaly\brand"
PNG = os.path.join(BASE, "png")
os.makedirs(PNG, exist_ok=True)

# ---- paleta ----
INK        = "#171C20"
STAMP      = "#B0432B"
PAPER      = "#FBFAF7"
INK_DARK   = "#E9EDEE"   # marca sobre fundo escuro
STAMP_DARK = "#D4715A"

# ---- geometria canonica (viewBox 48x48) ----
# Proporcao de E de verdade: braco de cima e de baixo iguais, do meio mais curto.
# O "futuro menos definido" e dito pelo TOM da barra de baixo, nao pelo comprimento
# — encurtar o braco inferior fazia a marca ser lida como F.
BARS = [
    ("haste",       7.0,  9.00, 6.5, 30.0, "ink"),
    ("agora",      15.0,  9.00, 26.0, 6.5, "stamp"),
    ("depois",     15.0, 20.75, 19.0, 6.5, "ink"),
    ("mais_tarde", 15.0, 32.50, 26.0, 6.5, "ink_soft"),
]
RX = 1.0
SOFT = 0.55


def svg_rects(ink, stamp, indent="  "):
    out = []
    for _, x, y, w, h, role in BARS:
        fill = stamp if role == "stamp" else ink
        op = f' fill-opacity="{SOFT}"' if role == "ink_soft" else ""
        out.append(
            f'{indent}<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{RX}" fill="{fill}"{op}/>'
        )
    return "\n".join(out)


def write(name, content):
    path = os.path.join(BASE, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("svg  ->", name)


HEAD = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" '
        'role="img" aria-label="Embarcaly">')

# ---------- marcas ----------
write("embarcaly-mark.svg",        HEAD + "\n" + svg_rects(INK, STAMP) + "\n</svg>\n")
write("embarcaly-mark-dark.svg",   HEAD + "\n" + svg_rects(INK_DARK, STAMP_DARK) + "\n</svg>\n")
write("embarcaly-mark-mono.svg",
      HEAD.replace('aria-label="Embarcaly"', 'aria-label="Embarcaly" fill="currentColor"') + "\n"
      + svg_rects("currentColor", "currentColor") + "\n</svg>\n")

# ---------- lockup horizontal ----------
FONT_STACK = "Familjen Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"


def lockup(ink, stamp):
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196 48" width="196" height="48" '
        'role="img" aria-label="Embarcaly">\n'
        + svg_rects(ink, stamp) + "\n"
        f'  <text x="52" y="33.5" font-family="{FONT_STACK}" font-size="26" font-weight="700" '
        f'letter-spacing="-0.85" fill="{ink}">embarca<tspan fill="{stamp}">ly</tspan></text>\n'
        "</svg>\n"
    )


write("embarcaly-lockup.svg", lockup(INK, STAMP))
write("embarcaly-lockup-dark.svg", lockup(INK_DARK, STAMP_DARK))

# ---------- icone de aplicativo ----------
def icon_svg(size, bg, ink, stamp, radius_ratio=0.2226):
    scale = (size * 0.75) / 48.0            # marca ocupa 75% do quadrado
    off = (size - 48 * scale) / 2.0
    rects = []
    for _, x, y, w, h, role in BARS:
        fill = stamp if role == "stamp" else ink
        op = f' fill-opacity="{SOFT}"' if role == "ink_soft" else ""
        rects.append(
            f'  <rect x="{off + x*scale:.2f}" y="{off + y*scale:.2f}" '
            f'width="{w*scale:.2f}" height="{h*scale:.2f}" rx="{RX*scale:.2f}" fill="{fill}"{op}/>'
        )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" '
        f'width="{size}" height="{size}" role="img" aria-label="Embarcaly">\n'
        f'  <rect width="{size}" height="{size}" rx="{size*radius_ratio:.1f}" fill="{bg}"/>\n'
        + "\n".join(rects) + "\n</svg>\n"
    )


write("embarcaly-icon.svg",       icon_svg(512, INK, PAPER, STAMP))
write("embarcaly-icon-light.svg", icon_svg(512, PAPER, INK, STAMP))
write("favicon.svg",              icon_svg(64, INK, PAPER, STAMP, radius_ratio=0.16))

# ---------- PNGs ----------
SS = 4  # supersampling


def hexrgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def draw_mark(size, ink, stamp, bg=None, radius_ratio=None, cover=0.75):
    big = size * SS
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if bg is not None:
        r = big * (radius_ratio if radius_ratio is not None else 0.2226)
        d.rounded_rectangle([0, 0, big - 1, big - 1], radius=r, fill=hexrgb(bg))
    scale = (big * cover) / 48.0
    off = (big - 48 * scale) / 2.0
    for _, x, y, w, h, role in BARS:
        base = hexrgb(stamp if role == "stamp" else ink)
        if role == "ink_soft":
            if bg is not None:                      # mistura sobre o fundo do icone
                b = hexrgb(bg)
                fill = tuple(round(base[i] * SOFT + b[i] * (1 - SOFT)) for i in range(3)) + (255,)
            else:                                   # transparente: usa alfa
                fill = base + (round(255 * SOFT),)
        else:
            fill = base + (255,)
        x0, y0 = off + x * scale, off + y * scale
        d.rounded_rectangle([x0, y0, x0 + w * scale, y0 + h * scale],
                            radius=max(1.0, RX * scale), fill=fill)
    return img.resize((size, size), Image.LANCZOS)


def save(img, name):
    p = os.path.join(PNG, name)
    img.save(p, "PNG")
    print("png  ->", os.path.join("png", name))


# icones de loja e sistema (fundo tinta, marca papel)
for s in (1024, 512, 192, 180, 120):
    save(draw_mark(s, PAPER, STAMP, bg=INK), f"icon-{s}.png")

# icone claro, para fundos escuros de sistema
save(draw_mark(1024, INK, STAMP, bg=PAPER), "icon-light-1024.png")

# marca isolada, fundo transparente
save(draw_mark(1024, INK, STAMP, cover=0.92), "mark-1024.png")
save(draw_mark(1024, INK_DARK, STAMP_DARK, cover=0.92), "mark-dark-1024.png")

# favicons
for s in (32, 16):
    save(draw_mark(s, PAPER, STAMP, bg=INK, radius_ratio=0.16), f"favicon-{s}.png")

# favicon.ico multi-resolucao
ico = draw_mark(256, PAPER, STAMP, bg=INK, radius_ratio=0.16)
ico.save(os.path.join(PNG, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48), (256, 256)])
print("ico  -> png/favicon.ico")

print("\nOK")
