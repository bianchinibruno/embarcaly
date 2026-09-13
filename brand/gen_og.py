# -*- coding: utf-8 -*-
"""Imagem de compartilhamento (Open Graph), 1200x630, sistema v2 · superfície impressa."""
import os
import random
import pymupdf
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

AQUI = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(AQUI)
F = os.path.join(AQUI, "fonts")
TMP = os.path.join(AQUI, "_og.pdf")
OUT = os.path.join(REPO, "og-image.png")

pdfmetrics.registerFont(TTFont("AN", os.path.join(F, "ArchivoNarrow-500.ttf")))
pdfmetrics.registerFont(TTFont("AN-Bd", os.path.join(F, "ArchivoNarrow-700.ttf")))
pdfmetrics.registerFont(TTFont("AR", os.path.join(F, "Archivo-400.ttf")))
pdfmetrics.registerFont(TTFont("AR-Sb", os.path.join(F, "Archivo-600.ttf")))
pdfmetrics.registerFont(TTFont("CP", os.path.join(F, "CourierPrime-400.ttf")))
pdfmetrics.registerFont(TTFont("CP-Bd", os.path.join(F, "CourierPrime-700.ttf")))

PAPEL    = HexColor("#EFEEE6")
CALHA    = HexColor("#E6E5DB")
BARRA    = HexColor("#DCE3D8")
CHUMBO   = HexColor("#14170F")
CHUMBO_2 = HexColor("#5C6356")
CHUMBO_3 = HexColor("#8B9185")
FIO      = HexColor("#B4B8A9")
CARIMBO  = HexColor("#46356E")
CARIMBO_L = HexColor("#7E6BA8")

W, H = 1200, 630
CAL = 54
M = 52
X0 = CAL + M

random.seed(400)

c = canvas.Canvas(TMP, pagesize=(W, H))
c.setFillColor(PAPEL)
c.rect(0, 0, W, H, stroke=0, fill=1)

# calha e furos
c.setFillColor(CALHA)
c.rect(0, 0, CAL, H, stroke=0, fill=1)
c.setStrokeColor(FIO)
c.setLineWidth(1)
c.line(CAL, 0, CAL, H)
for fy in (H * 0.26, H * 0.74):
    c.setFillColor(HexColor("#DAD8CC"))
    c.circle(CAL / 2, fy, 8, stroke=0, fill=1)
    c.setStrokeColor(HexColor("#C2C0B2"))
    c.setLineWidth(1)
    c.circle(CAL / 2, fy, 8, stroke=1, fill=0)

# fibra do papel
for _ in range(4200):
    x = random.uniform(0, W)
    y = random.uniform(0, H)
    t = random.uniform(0.3, 1.2)
    c.setFillColor(Color(0.08, 0.09, 0.06, alpha=random.uniform(0.03, 0.09)))
    c.rect(x, y, t, t, stroke=0, fill=1)

# cabeçalho de formulário
c.setFont("CP", 11)
c.setFillColor(CHUMBO_3)
c.drawString(X0, H - 44, "DOCUMENTO INFORMATIVO / DISTRIBUIÇÃO LIVRE")
c.drawRightString(W - M, H - 44, "ED. 01 · SET 2026")
c.setStrokeColor(CHUMBO)
c.setLineWidth(2)
c.line(X0, H - 58, W - M, H - 58)

# seção
c.setFont("CP-Bd", 12)
c.setFillColor(CARIMBO)
c.drawString(X0, H - 96, "RESOLUÇÃO ANAC Nº 400/2016")

# manchete
c.setFont("AN-Bd", 60)
c.setFillColor(CHUMBO)
c.drawString(X0, H - 168, "A COMPANHIA DEVE")
c.drawString(X0, H - 232, "HOTEL PRA VOCÊ.")
c.setFont("AN-Bd", 26)
c.setFillColor(CHUMBO_3)
c.drawString(X0, H - 276, "NINGUÉM VAI FALAR.")

# listagem greenbar
linhas = [("+1h", "LIBERADO", "Internet e telefone"),
          ("+2h", "LIBERADO", "Comida"),
          ("+4h", "LIBERADO", "Hotel e transporte")]
ly = H - 330
larg = W - M - X0
c.setStrokeColor(CHUMBO)
c.setLineWidth(2)
c.line(X0, ly, W - M, ly)
ly -= 6
alt = 46
for i, (marco, cod, txt) in enumerate(linhas):
    if i % 2 == 0:
        c.setFillColor(BARRA)
        c.rect(X0, ly - alt, larg, alt, stroke=0, fill=1)
    c.setFont("CP-Bd", 21)
    c.setFillColor(CHUMBO)
    c.drawString(X0 + 10, ly - alt + 15, marco)
    c.setFont("CP-Bd", 12)
    c.setFillColor(CARIMBO)
    c.drawString(X0 + 108, ly - alt + 17, cod)
    c.setFont("AR-Sb", 17)
    c.setFillColor(CHUMBO)
    c.drawString(X0 + 248, ly - alt + 16, txt)
    ly -= alt
c.setStrokeColor(CHUMBO)
c.setLineWidth(2)
c.line(X0, ly, W - M, ly)

# carimbo torto, com desalinho de registro
c.saveState()
c.translate(W - M - 116, 92)
c.rotate(-5.5)
bw, bh = 186, 62
c.setStrokeColor(Color(0.49, 0.42, 0.66, alpha=0.4))
c.setLineWidth(2.4)
c.rect(-bw / 2 + 1.4, -bh / 2 - 1.6, bw, bh, stroke=1, fill=0)
c.setStrokeColor(CARIMBO)
c.setLineWidth(2.4)
c.rect(-bw / 2, -bh / 2, bw, bh, stroke=1, fill=0)
c.setLineWidth(0.8)
c.rect(-bw / 2 + 4, -bh / 2 + 4, bw - 8, bh - 8, stroke=1, fill=0)
c.setFont("CP-Bd", 14)
c.setFillColor(CARIMBO)
c.drawCentredString(0, 7, "GUARDE")
c.drawCentredString(0, -13, "NO CELULAR")
c.restoreState()

# assinatura
c.setFont("CP-Bd", 12)
c.setFillColor(CHUMBO)
c.drawString(X0, 58, "EMBARCALY")
c.setFont("CP", 12)
c.setFillColor(CHUMBO_3)
c.drawString(X0 + 96, 58, "/ GUIA GRATUITO DOS SEUS DIREITOS")

# marcas de registro
for x, y in ((W - 26, H - 26), (W - 26, 26)):
    c.setStrokeColor(CHUMBO_3)
    c.setLineWidth(0.9)
    c.line(x - 10, y, x + 10, y)
    c.line(x, y - 10, x, y + 10)
    c.setStrokeColor(CARIMBO_L)
    c.line(x - 10 + 1.5, y + 1.5, x + 10 + 1.5, y + 1.5)

c.showPage()
c.save()

doc = pymupdf.open(TMP)
pix = doc[0].get_pixmap(matrix=pymupdf.Matrix(2, 2))
pix.save(OUT)
doc.close()
os.remove(TMP)
print("OK ->", OUT, pix.width, "x", pix.height)
