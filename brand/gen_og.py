# -*- coding: utf-8 -*-
"""Imagem de compartilhamento (Open Graph), 1200x630, sistema visual v3.

Azul estrutura, laranja aponta. Sem o E ampliado ao fundo: num cartao de
1200x630 nao ha area livre para ele, e o manual proibe grafismo atras de texto.
"""
import os
import pymupdf
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

AQUI = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(AQUI)
F = os.path.join(AQUI, "fonts")
TMP = os.path.join(AQUI, "_og.pdf")
OUT = os.path.join(REPO, "og-image.png")

pdfmetrics.registerFont(TTFont("PP", os.path.join(F, "Poppins-400.ttf")))
pdfmetrics.registerFont(TTFont("PP-Lt", os.path.join(F, "Poppins-300.ttf")))
pdfmetrics.registerFont(TTFont("PP-Md", os.path.join(F, "Poppins-500.ttf")))
pdfmetrics.registerFont(TTFont("PP-Sb", os.path.join(F, "Poppins-600.ttf")))
pdfmetrics.registerFont(TTFont("PP-Bd", os.path.join(F, "Poppins-700.ttf")))
pdfmetrics.registerFont(TTFont("PM", os.path.join(F, "IBMPlexMono-400.ttf")))
pdfmetrics.registerFont(TTFont("PM-Md", os.path.join(F, "IBMPlexMono-500.ttf")))
pdfmetrics.registerFont(TTFont("PM-Sb", os.path.join(F, "IBMPlexMono-600.ttf")))

# ---- paleta v3 ----
BREU    = HexColor("#1C1E3C")
CARTA   = HexColor("#262A54")
FIO     = HexColor("#414682")
BRANCO  = HexColor("#FFFFFF")
CLARO   = HexColor("#C9CBE4")
FRACO   = HexColor("#7C80AE")
LARANJA = HexColor("#ED8426")
VERDE   = HexColor("#2FBF87")

W, H = 1200, 630
M = 64
BARRA = 12

# ---- geometria do E, a mesma de gen_brand.py (viewBox 48x48) ----
BARS = [
    (7.0,  9.00, 6.5, 30.0),   # haste
    (15.0, 9.00, 26.0, 6.5),   # agora
    (15.0, 20.75, 19.0, 6.5),  # depois
    (15.0, 32.50, 26.0, 6.5),  # mais tarde
]

c = canvas.Canvas(TMP, pagesize=(W, H))
c.setFillColor(BREU)
c.rect(0, 0, W, H, stroke=0, fill=1)

# ---- assinatura ----
mx, my, mesc = M, H - M - 30, 0.62
for i, (x, y, w, h) in enumerate(BARS):
    c.setFillColor(LARANJA if i == 1 else BRANCO)
    c.setFillAlpha(0.55 if i == 3 else 1)
    c.rect(mx + x * mesc, my + (48 - y - h) * mesc, w * mesc, h * mesc, stroke=0, fill=1)
c.setFillAlpha(1)

c.setFont("PP-Bd", 23)
c.setFillColor(BRANCO)
c.drawString(mx + 40, my + 8, "embarca")
c.setFillColor(LARANJA)
c.drawString(mx + 40 + c.stringWidth("embarca", "PP-Bd", 23), my + 8, "ly")

# ---- rotulo ----
c.setFont("PM-Md", 12)
c.setFillColor(LARANJA)
c.drawString(M, H - 156, "R E S O L U Ç Ã O   A N A C   N º   4 0 0 / 2 0 1 6")

# ---- manchete ----
c.setFont("PP-Bd", 54)
c.setFillColor(BRANCO)
c.drawString(M, H - 218, "A companhia deve hotel")
c.drawString(M, H - 276, "pra você.")
c.setFillColor(LARANJA)
c.drawString(M, H - 334, "Ninguém vai falar.")

# ---- escada de direitos ----
cx, cy, cw, ch = W - M - 396, 118, 396, 268
c.setFillColor(CARTA)
c.rect(cx, cy, cw, ch, stroke=0, fill=1)
c.setFillColor(LARANJA)
c.rect(cx, cy, 4, ch, stroke=0, fill=1)

c.setFont("PM-Sb", 42)
c.setFillColor(LARANJA)
c.drawString(cx + 30, cy + ch - 66, "3h45")
c.setFont("PM-Md", 12)
c.drawString(cx + 30, cy + ch - 86, "C O N T A N D O")

c.setFont("PM", 12)
c.setFillColor(FRACO)
c.drawRightString(cx + cw - 30, cy + ch - 46, "LA3477")
c.drawRightString(cx + cw - 30, cy + ch - 64, "POA -> GRU")

c.setStrokeColor(FIO)
c.setLineWidth(1)
c.line(cx + 30, cy + ch - 110, cx + cw - 30, cy + ch - 110)

linhas = [
    ("Comunicação", "+1H", VERDE, True),
    ("Alimentação", "+2H", VERDE, True),
    ("Hospedagem", "EM 15MIN", LARANJA, False),
]
ly = cy + ch - 142
for nome, marco, cor, cheio in linhas:
    c.setFillColor(cor)
    if cheio:
        c.rect(cx + 30, ly - 3, 11, 11, stroke=0, fill=1)
    else:
        c.setStrokeColor(cor)
        c.setLineWidth(2)
        c.rect(cx + 31, ly - 2, 9, 9, stroke=1, fill=0)
    c.setFont("PP-Md", 16)
    c.setFillColor(BRANCO if cheio else CLARO)
    c.drawString(cx + 54, ly, nome)
    c.setFont("PM-Md", 11)
    c.setFillColor(cor)
    c.drawRightString(cx + cw - 30, ly + 1, marco)
    if nome != "Hospedagem":
        c.setFillColor(cor)
        c.rect(cx + 34.5, ly - 40, 2, 34, stroke=0, fill=1)
    ly -= 48

# ---- linha de apoio ----
c.setFont("PP-Lt", 19)
c.setFillColor(CLARO)
c.drawString(M, 172, "Passou de 4 horas, hospedagem e traslado são obrigação dela.")
c.drawString(M, 144, "Passou de 2, é comida. Guia gratuito, 8 folhas.")

c.setFont("PM-Md", 12)
c.setFillColor(FRACO)
c.drawString(M, 96, "E M B A R C A L Y . C O M")

# ---- barra de rodape ----
c.setFillColor(LARANJA)
c.rect(0, 0, W, BARRA, stroke=0, fill=1)

c.showPage()
c.save()

doc = pymupdf.open(TMP)
pix = doc[0].get_pixmap(matrix=pymupdf.Matrix(2, 2))
pix.save(OUT)
doc.close()
os.remove(TMP)
print("OK ->", OUT, pix.width, "x", pix.height)
