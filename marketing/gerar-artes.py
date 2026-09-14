# -*- coding: utf-8 -*-
"""
Gerador das artes de campanha do Embarcaly.

Sistema visual v3 (brand/IDENTIDADE.md). Escuro é o padrão da peça.
Produz, prontos para publicar:

  artes/carrossel-<slug>/fl-NN.png   1080x1350, carrossel de Instagram
  artes/loja/print-N.png             1080x1920, print da Play Store
  artes/loja/capa.png                1024x500, gráfico de destaque

Rodar:  python marketing/gerar-artes.py
"""
import os
import random
import pymupdf
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

AQUI = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(AQUI)
F = os.path.join(REPO, "brand", "fonts")
SAIDA = os.path.join(AQUI, "artes")

# Os apelidos continuam os mesmos: so a fonte por tras deles muda.
for nome, arq in [
    ("AN", "Poppins-600.ttf"), ("AN-Bd", "Poppins-700.ttf"),
    ("AR", "Poppins-400.ttf"), ("AR-Sb", "Poppins-600.ttf"),
    ("CP", "IBMPlexMono-400.ttf"), ("CP-Bd", "IBMPlexMono-600.ttf"),
]:
    pdfmetrics.registerFont(TTFont(nome, os.path.join(F, arq)))

# Os papeis continuam os mesmos — PAPEL e o fundo, CHUMBO e a tinta — mas no v3
# eles se invertem: o fundo e azul escuro e a tinta e branca. Manter os nomes faz
# cada chamada de desenho ja existente cair no lugar certo.
PAPEL     = HexColor("#1C1E3C")   # fundo da peca
CALHA     = HexColor("#262A54")
BARRA     = HexColor("#262A54")   # banda de tabela
BARRA_ESC = HexColor("#2F3463")
CHUMBO    = HexColor("#FFFFFF")   # tinta principal
CHUMBO_2  = HexColor("#C9CBE4")
CHUMBO_3  = HexColor("#7C80AE")
FIO       = HexColor("#414682")
CARIMBO   = HexColor("#ED8426")   # contando, agir agora
CARIMBO_L = HexColor("#ED8426")
AZUL      = HexColor("#33366A")   # texto sobre preenchimento laranja
BARRA_PE  = HexColor("#ED8426")   # a faixa colada na base


# ------------------------------------------------------------------ base
class Peca:
    """Uma peça do v3. Fundo azul escuro, tinta branca, laranja no que conta."""

    def __init__(self, larg, alt, margem=None, semente=400):
        self.W, self.H = larg, alt
        self.M = margem if margem is not None else int(larg * 0.075)
        self.CW = larg - 2 * self.M
        self.rnd = random.Random(semente)
        self.c = None

    def abrir(self, caminho_pdf):
        self.c = canvas.Canvas(caminho_pdf, pagesize=(self.W, self.H))

    def fundo(self, calha=False):
        c = self.c
        c.setFillColor(PAPEL)
        c.rect(0, 0, self.W, self.H, stroke=0, fill=1)
        if calha:
            cal = self.M * 0.62
            c.setFillColor(CALHA)
            c.rect(0, 0, cal, self.H, stroke=0, fill=1)
            c.setStrokeColor(FIO)
            c.setLineWidth(1)
            c.line(cal, 0, cal, self.H)

    def fibra(self):
        """Sem efeito no v3. Grao so em superficie clara, nunca sobre o escuro."""
        return

    def barra_pe(self, alt=None):
        """A faixa laranja colada na base. Fecha toda folha, sem margem."""
        c = self.c
        c.setFillColor(BARRA_PE)
        c.rect(0, 0, self.W, alt or max(8, self.W * 0.011), stroke=0, fill=1)

    def registro(self, cantos=(("d", "c"), ("d", "b"))):
        """Sem efeito no v3. Marca de grafica era vocabulario do v2."""
        return

    def wrap(self, txt, fonte, tam, larg):
        out, atual = [], ""
        for p in txt.split():
            t = (atual + " " + p).strip()
            if pdfmetrics.stringWidth(t, fonte, tam) <= larg:
                atual = t
            else:
                if atual:
                    out.append(atual)
                atual = p
        if atual:
            out.append(atual)
        return out

    def texto(self, x, y, txt, fonte, tam, cor, larg=None, ent=None):
        c = self.c
        larg = larg or self.CW
        ent = ent or tam * 1.4
        c.setFont(fonte, tam)
        c.setFillColor(cor)
        for ln in self.wrap(txt, fonte, tam, larg):
            c.drawString(x, y, ln)
            y -= ent
        return y

    def carimbo(self, x, y, linhas, ang=0, tam=None):
        """Etiqueta reta. No v2 isto girava; o v3 nao tem carimbo torto.

        O nome da funcao fica para nao quebrar as chamadas das pecas.
        """
        c = self.c
        tam = tam or self.W * 0.026
        c.saveState()
        c.translate(x, y)
        larg = max(pdfmetrics.stringWidth(l.upper(), "CP-Bd", tam) for l in linhas) + tam * 2.2
        alt = tam * (1.9 * len(linhas) + 1.1)
        c.setStrokeColor(CARIMBO)
        c.setLineWidth(tam * 0.11)
        c.rect(-larg / 2, -alt / 2, larg, alt, stroke=1, fill=0)
        yy = alt / 2 - tam * 1.55
        for l in linhas:
            c.setFont("CP-Bd", tam)
            c.setFillColor(CARIMBO)
            c.drawCentredString(0, yy, l.upper())
            yy -= tam * 1.9
        c.restoreState()

    def greenbar(self, y, linhas, alt, colx, fontes):
        """Listagem em papel de impressora. `linhas` é lista de tuplas de células."""
        c = self.c
        c.setStrokeColor(CHUMBO)
        c.setLineWidth(2.2)
        c.line(self.M, y, self.W - self.M, y)
        y -= 4
        for i, cels in enumerate(linhas):
            if i % 2 == 0:
                c.setFillColor(BARRA)
                c.rect(self.M, y - alt, self.CW, alt, stroke=0, fill=1)
            for cx, (fonte, tam, cor), txt in zip(colx, fontes, cels):
                if not txt:
                    continue
                c.setFont(fonte, tam)
                c.setFillColor(cor)
                c.drawString(self.M + cx, y - alt + (alt - tam) / 2 + tam * 0.12, txt)
            y -= alt
        c.setStrokeColor(CHUMBO)
        c.setLineWidth(2.2)
        c.line(self.M, y, self.W - self.M, y)
        return y - 4

    def salvar(self, tmp_pdf, png, escala=1):
        self.c.showPage()
        self.c.save()
        doc = pymupdf.open(tmp_pdf)
        doc[0].get_pixmap(matrix=pymupdf.Matrix(escala, escala)).save(png)
        doc.close()
        os.remove(tmp_pdf)


# ------------------------------------------------------------------ carrossel
CW_, CH_ = 1080, 1350


def slide(pasta, n, total, desenhar, semente=400):
    os.makedirs(pasta, exist_ok=True)
    p = Peca(CW_, CH_, margem=84, semente=semente + n)
    tmp = os.path.join(pasta, "_tmp.pdf")
    p.abrir(tmp)
    p.fundo(calha=False)

    # cabeçalho de formulário
    c = p.c
    c.setFont("CP", 15)
    c.setFillColor(CHUMBO_3)
    c.drawString(p.M, CH_ - p.M + 14, "EMBARCALY")
    c.drawRightString(CW_ - p.M, CH_ - p.M + 14, "FL. %02d/%02d" % (n, total))
    c.setStrokeColor(CHUMBO)
    c.setLineWidth(2.4)
    c.line(p.M, CH_ - p.M - 4, CW_ - p.M, CH_ - p.M - 4)

    desenhar(p)

    p.registro(cantos=(("d", "b"),))
    p.barra_pe()
    p.salvar(tmp, os.path.join(pasta, "fl-%02d.png" % n))


def gancho(p, linhas, tam=None, cor=CHUMBO, y=None):
    """Slide 1: a frase que faz 90% do trabalho."""
    tam = tam or 92
    y = y or CH_ * 0.72
    c = p.c
    c.setFont("AN-Bd", tam)
    for i, l in enumerate(linhas):
        c.setFillColor(cor if i < len(linhas) - 1 or len(linhas) == 1 else cor)
        c.drawString(p.M, y - i * tam * 1.04, l.upper())
    return y - len(linhas) * tam * 1.04


def secao(p, rot, titulo, y=None):
    y = y or CH_ * 0.78
    c = p.c
    c.setFont("CP-Bd", 17)
    c.setFillColor(CARIMBO)
    c.drawString(p.M, y, rot.upper())
    y -= 58
    c.setFont("AN-Bd", 58)
    c.setFillColor(CHUMBO)
    for ln in p.wrap(titulo.upper(), "AN-Bd", 58, p.CW):
        c.drawString(p.M, y, ln)
        y -= 62
    return y - 18


def fecho(p, chamada="Salva pra quando precisar", linha2="Embarcaly · guia gratuito de direitos"):
    c = p.c
    y = CH_ * 0.62
    c.setFont("AN-Bd", 62)
    c.setFillColor(CHUMBO)
    for ln in p.wrap(chamada.upper(), "AN-Bd", 62, p.CW):
        c.drawString(p.M, y, ln)
        y -= 68
    y -= 30
    p.texto(p.M, y, linha2, "AR", 26, CHUMBO_2, p.CW * 0.86, 36)
    p.carimbo(CW_ * 0.68, CH_ * 0.26, ["guarde", "no celular"], ang=-6, tam=30)
    c.setFont("CP-Bd", 17)
    c.setFillColor(CHUMBO)
    c.drawString(p.M, p.M + 6, "BIANCHINIBRUNO.GITHUB.IO/EMBARCALY")


COL3 = [0, 190, 400]
FONTES3 = [("CP-Bd", 44, CHUMBO), ("CP-Bd", 20, CARIMBO), ("AR-Sb", 30, CHUMBO)]
COL2 = [0, 250]
FONTES2 = [("CP-Bd", 34, CHUMBO), ("AR-Sb", 30, CHUMBO)]


# ------------------------------------------------------------------ P1
def carrossel_limiares():
    pasta = os.path.join(SAIDA, "carrossel-01-limiares")
    T = 7

    slide(pasta, 1, T, lambda p: (
        gancho(p, ["Seu voo", "atrasou", "4 horas."], tam=104, y=CH_ * 0.74),
        p.c.setFillColor(CARIMBO),
        p.c.setFont("AN-Bd", 104),
        p.c.drawString(p.M, CH_ * 0.74 - 3 * 108 - 24, "VOCÊ TEM"),
        p.c.drawString(p.M, CH_ * 0.74 - 4 * 108 - 24, "DIREITO A HOTEL."),
        p.texto(p.M, CH_ * 0.20, "Resolução ANAC nº 400/2016", "CP-Bd", 20, CHUMBO_3),
    ))

    slide(pasta, 2, T, lambda p: (
        secao(p, "o tamanho do problema", "E quase ninguém pede"),
        p.texto(p.M, CH_ * 0.50,
                "Em 2018, 17 milhões de brasileiros tiveram voo atrasado ou cancelado. "
                "Dois por cento pediram alguma coisa.",
                "AR", 34, CHUMBO_2, p.CW * 0.92, 48),
        p.texto(p.M, CH_ * 0.28,
                "Não é falta de direito. É falta de saber.",
                "AR-Sb", 34, CHUMBO, p.CW * 0.92, 48),
    ))

    for i, (marco, nome, det) in enumerate([
        ("+1h", "COMUNICAÇÃO", "Internet e telefone por conta da companhia. Dois minutos de ligação pra avisar quem está te esperando."),
        ("+2h", "ALIMENTAÇÃO", "Voucher, refeição ou lanche conforme o horário. Se o atraso pegou o almoço, é almoço."),
        ("+4h", "HOSPEDAGEM", "Hotel mais o transporte de ida e volta até ele. Se você mora na cidade, pode ser só o transporte."),
    ], start=3):
        def faz(p, marco=marco, nome=nome, det=det):
            c = p.c
            c.setFont("CP-Bd", 200)
            c.setFillColor(CARIMBO)
            c.drawString(p.M, CH_ * 0.62, marco)
            c.setFont("AN-Bd", 64)
            c.setFillColor(CHUMBO)
            c.drawString(p.M, CH_ * 0.52, nome)
            p.texto(p.M, CH_ * 0.42, det, "AR", 32, CHUMBO_2, p.CW * 0.94, 44)
            c.setFillColor(BARRA)
            c.rect(p.M, CH_ * 0.18, p.CW, 74, stroke=0, fill=1)
            c.setFont("CP-Bd", 22)
            c.setFillColor(CARIMBO)
            c.drawString(p.M + 24, CH_ * 0.18 + 28, "PEÇA NO BALCÃO, COM ESSAS PALAVRAS")
        slide(pasta, i, T, faz)

    slide(pasta, 6, T, lambda p: (
        secao(p, "resumo", "Guarde assim"),
        p.greenbar(CH_ * 0.60, [
            ("+1h", "LIBERADO", "internet e telefone"),
            ("+2h", "LIBERADO", "comida"),
            ("+4h", "LIBERADO", "hotel e transporte"),
        ], 98, COL3, FONTES3),
        p.texto(p.M, CH_ * 0.24,
                "Passou de 4h, ou cancelaram? Você escolhe entre outro voo, "
                "reembolso integral, outro transporte ou remarcar sem custo.",
                "AR", 28, CHUMBO_2, p.CW * 0.94, 40),
    ))

    slide(pasta, 7, T, lambda p: fecho(p))
    print("  carrossel-01-limiares:", T, "folhas")


# ------------------------------------------------------------------ P2
def carrossel_android():
    pasta = os.path.join(SAIDA, "carrossel-02-android")
    T = 8

    slide(pasta, 1, T, lambda p: (
        gancho(p, ["Procurei", "um app pra", "organizar", "viagem", "no Android."], tam=88, y=CH_ * 0.80),
        p.c.setFillColor(CARIMBO),
        p.c.setFont("AN-Bd", 88),
        p.c.drawString(p.M, CH_ * 0.80 - 5 * 91.5 - 30, "NÃO EXISTE"),
        p.c.drawString(p.M, CH_ * 0.80 - 6 * 91.5 - 30, "UM BOM."),
    ))

    slide(pasta, 2, T, lambda p: (
        secao(p, "o caso", "Minha última viagem"),
        p.greenbar(CH_ * 0.58, [
            ("4", "", "voos"),
            ("3", "", "hotéis"),
            ("1", "", "carro"),
            ("5", "", "passeios"),
        ], 82, COL3, FONTES3),
        p.texto(p.M, CH_ * 0.20,
                "Cada um num e-mail. Terminei numa planilha do Drive.",
                "AR-Sb", 32, CHUMBO, p.CW * 0.94, 44),
    ))

    slide(pasta, 3, T, lambda p: (
        secao(p, "o melhor do mercado", "É brasileiro. E é ótimo."),
        p.texto(p.M, CH_ * 0.50,
                "Chama Tripsy. Junta voo, hotel, carro e passeio, importa de 700 "
                "provedores, funciona offline. Faz tudo que eu precisava.",
                "AR", 34, CHUMBO_2, p.CW * 0.94, 48),
        p.texto(p.M, CH_ * 0.26, "Só roda no iPhone.", "AN-Bd", 62, CARIMBO, p.CW, 70),
    ))

    slide(pasta, 4, T, lambda p: (
        p.c.setFont("CP-Bd", 250),
        p.c.setFillColor(CARIMBO),
        p.c.drawString(p.M, CH_ * 0.56, "81%"),
        p.texto(p.M, CH_ * 0.44, "dos celulares no Brasil são Android.", "AN-Bd", 54, CHUMBO, p.CW, 62),
        p.texto(p.M, CH_ * 0.26,
                "O melhor organizador de viagem brasileiro não roda em 4 de cada 5 "
                "celulares do país.", "AR", 32, CHUMBO_2, p.CW * 0.94, 44),
    ))

    slide(pasta, 5, T, lambda p: (
        secao(p, "e não é descuido", "Eles sabem"),
        p.texto(p.M, CH_ * 0.50,
                "A Tripsy mantém uma página de lista de espera para Android. "
                "A própria concorrente documentando a demanda que escolheu não atender.",
                "AR", 34, CHUMBO_2, p.CW * 0.94, 48),
        p.carimbo(CW_ * 0.62, CH_ * 0.26, ["lista", "de espera"], ang=-7, tam=32),
    ))

    slide(pasta, 6, T, lambda p: (
        secao(p, "as alternativas", "São gringas"),
        p.greenbar(CH_ * 0.62, [
            ("TripIt", "US$49/ANO", "organiza e cala"),
            ("Wanderlog", "GRÁTIS", "planeja, não conduz"),
            ("Google", "GRÁTIS", "só o que passa no Gmail"),
        ], 94, [0, 250, 470],
            [("AR-Sb", 32, CHUMBO), ("CP-Bd", 19, CARIMBO), ("AR", 26, CHUMBO_2)]),
        p.texto(p.M, CH_ * 0.24,
                "Nenhuma sabe o que é a Resolução 400 da ANAC. E nenhuma te diz o que "
                "fazer quando o voo atrasa.", "AR", 30, CHUMBO_2, p.CW * 0.94, 42),
    ))

    slide(pasta, 7, T, lambda p: (
        gancho(p, ["Então tô", "construindo", "um."], tam=96, y=CH_ * 0.70),
        p.c.setFillColor(CARIMBO),
        p.c.setFont("AN-Bd", 96),
        p.c.drawString(p.M, CH_ * 0.70 - 3 * 100 - 26, "ANDROID PRIMEIRO."),
    ))

    slide(pasta, 8, T, lambda p: fecho(
        p, "Você é quem organiza a viagem do grupo?",
        "Me chama. Quero te ouvir 20 minutos antes de escrever mais uma linha de código."))
    print("  carrossel-02-android:", T, "folhas")


# ------------------------------------------------------------------ P3
def carrossel_voucher():
    pasta = os.path.join(SAIDA, "carrossel-03-voucher")
    T = 7

    slide(pasta, 1, T, lambda p: (
        gancho(p, ["Aceitar o", "voucher", "NÃO faz você"], tam=92, y=CH_ * 0.74),
        p.c.setFillColor(CARIMBO),
        p.c.setFont("AN-Bd", 92),
        p.c.drawString(p.M, CH_ * 0.74 - 3 * 96 - 26, "ABRIR MÃO"),
        p.c.drawString(p.M, CH_ * 0.74 - 4 * 96 - 26, "DE NADA."),
    ))

    for i, (rot, tit, txt) in enumerate([
        ("o medo", "Muita gente recusa", "Recusa a comida com medo de estar assinando alguma coisa que tira o direito de reclamar depois."),
        ("a regra", "É obrigação, não acordo", "Assistência material é dever da companhia. Aceitar o lanche não desiste de nada, porque não existe troca."),
        ("o que continua valendo", "Tudo", "Reacomodação, reembolso integral com taxa de embarque, outra modalidade, remarcação. Nada disso é afetado."),
        ("o que exige atenção", "Termo de acordo", "Aí sim. Documento chamado acordo, quitação ou transação: leia antes de assinar, e não assine com pressa no balcão."),
    ], start=2):
        def faz(p, rot=rot, tit=tit, txt=txt):
            secao(p, rot, tit)
            p.texto(p.M, CH_ * 0.44, txt, "AR", 34, CHUMBO_2, p.CW * 0.94, 48)
        slide(pasta, i, T, faz)

    slide(pasta, 6, T, lambda p: (
        secao(p, "faça sempre", "Pegue e guarde"),
        p.greenbar(CH_ * 0.60, [
            ("01", "", "Pegue o voucher"),
            ("02", "", "Guarde todo comprovante"),
            ("03", "", "Foto do painel com o horário"),
        ], 94, COL2 + [0], FONTES2 + [("AR", 20, CHUMBO)]),
    ))

    slide(pasta, 7, T, lambda p: fecho(p))
    print("  carrossel-03-voucher:", T, "folhas")


# ------------------------------------------------------------------ P4
def carrossel_escolhas():
    pasta = os.path.join(SAIDA, "carrossel-04-escolhas")
    T = 8

    slide(pasta, 1, T, lambda p: (
        gancho(p, ["Cancelaram", "seu voo?"], tam=104, y=CH_ * 0.72),
        p.c.setFillColor(CARIMBO),
        p.c.setFont("AN-Bd", 104),
        p.c.drawString(p.M, CH_ * 0.72 - 2 * 108 - 30, "VOCÊ TEM 4"),
        p.c.drawString(p.M, CH_ * 0.72 - 3 * 108 - 30, "OPÇÕES."),
        p.texto(p.M, CH_ * 0.24, "Eles vão te oferecer uma.", "AN-Bd", 50, CHUMBO_3, p.CW, 58),
    ))

    for i, (num, nome, det) in enumerate([
        ("01", "REACOMODAÇÃO", "Outro voo pro mesmo destino na primeira oportunidade. Inclusive em OUTRA companhia, sem você pagar diferença."),
        ("02", "REEMBOLSO INTEGRAL", "Todo o valor pago de volta, incluindo a taxa de embarque. Integral quer dizer integral."),
        ("03", "OUTRA MODALIDADE", "Ônibus, van, o que resolver o trecho. Por conta deles."),
        ("04", "REMARCAÇÃO", "Data e horário que sirvam pra você, sem custo e sem multa."),
    ], start=2):
        def faz(p, num=num, nome=nome, det=det):
            c = p.c
            c.setFont("CP-Bd", 190)
            c.setFillColor(CARIMBO)
            c.drawString(p.M, CH_ * 0.60, num)
            c.setFont("AN-Bd", 56)
            c.setFillColor(CHUMBO)
            for j, ln in enumerate(p.wrap(nome, "AN-Bd", 56, p.CW)):
                c.drawString(p.M, CH_ * 0.50 - j * 60, ln)
            p.texto(p.M, CH_ * 0.38, det, "AR", 32, CHUMBO_2, p.CW * 0.94, 44)
        slide(pasta, i, T, faz)

    slide(pasta, 6, T, lambda p: (
        secao(p, "a regra", "A escolha é sua"),
        p.texto(p.M, CH_ * 0.50,
                "Se te oferecerem só uma, peça as outras pelo nome. A companhia não "
                "escolhe por você.", "AR", 36, CHUMBO_2, p.CW * 0.94, 50),
        p.carimbo(CW_ * 0.60, CH_ * 0.28, ["peça", "pelo nome"], ang=-6, tam=32),
    ))

    slide(pasta, 7, T, lambda p: (
        secao(p, "quando vale", "Três situações"),
        p.greenbar(CH_ * 0.58, [
            ("ATRASO", "ACIMA DE 4H", ""),
            ("CANCELAMENTO", "IMEDIATO", ""),
            ("PRETERIÇÃO", "IMEDIATO + COMPENSAÇÃO", ""),
        ], 96, [0, 430, 0],
            [("AR-Sb", 32, CHUMBO), ("CP-Bd", 20, CARIMBO), ("AR", 20, CHUMBO)]),
        p.texto(p.M, CH_ * 0.22,
                "Preterição é o overbooking. Fora as quatro opções, tem compensação "
                "financeira paga na hora: 250 DES no doméstico, 500 no internacional.",
                "AR", 28, CHUMBO_2, p.CW * 0.94, 40),
    ))

    slide(pasta, 8, T, lambda p: fecho(p))
    print("  carrossel-04-escolhas:", T, "folhas")


# ------------------------------------------------------------------ loja
def prints_loja():
    pasta = os.path.join(SAIDA, "loja")
    os.makedirs(pasta, exist_ok=True)
    LW, LH = 1080, 1920

    telas = [
        ("A viagem inteira", "num lugar só",
         "Voo, hotel, carro e passeio. Funciona sem internet.",
         [("14:20", "CONFIRMADO", "GRU → LIS"),
          ("19:10", "CONFIRMADO", "Transfer"),
          ("21:00", "CONFIRMADO", "Hotel Baixa"),
          ("08:00", "CONFIRMADO", "Passeio Sintra")]),
        ("O voo atrasou.", "E agora?",
         "O Embarcaly refaz a viagem inteira sozinho.",
         [("14:20", "ATRASADO", "GRU → LIS"),
          ("19:10", "PERDIDO", "Transfer"),
          ("21:00", "AVISAR", "Hotel Baixa"),
          ("08:00", "INVIÁVEL", "Passeio Sintra")]),
        ("O que fazer", "agora",
         "Não a lista do que você reservou. A próxima ação.",
         [("AGORA", "", "Remarcar o transfer"),
          ("22:10", "", "Avisar a recepção"),
          ("AMANHÃ", "", "Remarcar Sintra")]),
        ("Seus direitos,", "na hora",
         "Resolução ANAC 400, com o texto pronto pro balcão.",
         [("+1h", "LIBERADO", "Internet e telefone"),
          ("+2h", "LIBERADO", "Comida"),
          ("+4h", "EM 1H50", "Hotel e transporte")]),
        ("Sem assinatura", "",
         "R$39 por viagem. Organizar é de graça pra sempre.",
         [("GRÁTIS", "", "Centralizar"),
          ("GRÁTIS", "", "Conduzir"),
          ("R$39", "", "Socorrer")]),
        ("Finalmente", "no Android",
         "O melhor organizador brasileiro só existia no iPhone.",
         [("81%", "", "do Brasil usa Android"),
          ("0", "", "apps bons pra isso")]),
    ]

    for i, (t1, t2, sub, linhas) in enumerate(telas, start=1):
        p = Peca(LW, LH, margem=80, semente=700 + i)
        tmp = os.path.join(pasta, "_tmp.pdf")
        p.abrir(tmp)
        p.fundo()
        c = p.c
        c.setFont("CP", 17)
        c.setFillColor(CHUMBO_3)
        c.drawString(p.M, LH - p.M + 16, "EMBARCALY")
        c.setStrokeColor(CHUMBO)
        c.setLineWidth(2.6)
        c.line(p.M, LH - p.M - 6, LW - p.M, LH - p.M - 6)

        y = LH * 0.84
        c.setFont("AN-Bd", 86)
        c.setFillColor(CHUMBO)
        c.drawString(p.M, y, t1.upper())
        if t2:
            c.setFillColor(CARIMBO)
            c.drawString(p.M, y - 92, t2.upper())
        p.texto(p.M, y - (188 if t2 else 96), sub, "AR", 32, CHUMBO_2, p.CW * 0.92, 44)

        p.greenbar(LH * 0.52, linhas, 104, [0, 230, 470],
                   [("CP-Bd", 36, CHUMBO), ("CP-Bd", 19, CARIMBO), ("AR-Sb", 30, CHUMBO)])

        c.setFont("CP-Bd", 19)
        c.setFillColor(CHUMBO_3)
        c.drawString(p.M, p.M, "RESOLUÇÃO ANAC Nº 400/2016")
        p.registro(cantos=(("d", "b"),))
        p.barra_pe()
        p.salvar(tmp, os.path.join(pasta, "print-%d.png" % i))

    # gráfico de destaque
    p = Peca(1024, 500, margem=52, semente=900)
    tmp = os.path.join(pasta, "_tmp.pdf")
    p.abrir(tmp)
    p.fundo()
    c = p.c
    c.setFont("AN-Bd", 62)
    c.setFillColor(CHUMBO)
    c.drawString(p.M, 300, "A VIAGEM INTEIRA")
    c.setFillColor(CARIMBO)
    c.drawString(p.M, 234, "NUM LUGAR SÓ.")
    c.setFont("AR", 24)
    c.setFillColor(CHUMBO_2)
    c.drawString(p.M, 180, "Voo, hotel, carro e passeio. E o que fazer quando atrasa.")
    c.setFont("CP-Bd", 17)
    c.setFillColor(CHUMBO_3)
    c.drawString(p.M, 76, "EMBARCALY")
    p.carimbo(860, 250, ["android"], ang=-6, tam=26)
    p.registro(cantos=(("d", "c"), ("d", "b")))
    p.barra_pe()
    p.salvar(tmp, os.path.join(pasta, "capa.png"))
    print("  loja: 6 prints + capa")


if __name__ == "__main__":
    os.makedirs(SAIDA, exist_ok=True)
    print("Gerando artes...")
    carrossel_limiares()
    carrossel_android()
    carrossel_voucher()
    carrossel_escolhas()
    prints_loja()
    print("Pronto ->", SAIDA)
