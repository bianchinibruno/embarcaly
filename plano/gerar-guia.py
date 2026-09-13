# -*- coding: utf-8 -*-
"""
Guia de direitos do passageiro — Embarcaly.

Sistema visual v2 · superfície IMPRESSA.
O documento se comporta como formulário oficial de aviação: papel greenbar,
duas tintas (chumbo + carimbo violeta), marcas de registro, furos de arquivo,
textura de fibra e desalinho de registro proposital.
"""
import os
import random
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

AQUI = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(AQUI)
F = os.path.join(REPO, "brand", "fonts")
OUT = os.path.join(AQUI, "guia-direitos-do-passageiro.pdf")

pdfmetrics.registerFont(TTFont("AN", os.path.join(F, "ArchivoNarrow-500.ttf")))
pdfmetrics.registerFont(TTFont("AN-Bd", os.path.join(F, "ArchivoNarrow-700.ttf")))
pdfmetrics.registerFont(TTFont("AR", os.path.join(F, "Archivo-400.ttf")))
pdfmetrics.registerFont(TTFont("AR-Sb", os.path.join(F, "Archivo-600.ttf")))
pdfmetrics.registerFont(TTFont("CP", os.path.join(F, "CourierPrime-400.ttf")))
pdfmetrics.registerFont(TTFont("CP-Bd", os.path.join(F, "CourierPrime-700.ttf")))

# ---------------------------------------------------------------- tintas
PAPEL     = HexColor("#EFEEE6")   # papel de formulário
BARRA     = HexColor("#DCE3D8")   # banda greenbar
BARRA_ESC = HexColor("#CBD6C6")
CHUMBO    = HexColor("#14170F")   # tinta 1
CHUMBO_2  = HexColor("#5C6356")
CHUMBO_3  = HexColor("#8B9185")
FIO       = HexColor("#B4B8A9")
CARIMBO   = HexColor("#46356E")   # tinta 2, violeta de carimbo
CARIMBO_L = HexColor("#7E6BA8")

W, H = A4
M = 19 * mm
CAL = 11 * mm            # calha esquerda dos furos
X0 = M + CAL             # coluna de texto
CW = W - X0 - M

random.seed(400)

c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("Guia de direitos do passageiro aereo")
c.setAuthor("Bruno Bianchini")
c.setSubject("Resolucao ANAC no 400/2016")

st = {"pag": 0}


# ---------------------------------------------------------------- material
def fibra():
    """Textura de fibra do papel. Sem isso o fundo fica chapado e morto."""
    for _ in range(2600):
        x = random.uniform(0, W)
        y = random.uniform(0, H)
        t = random.uniform(0.12, 0.55)
        v = random.uniform(0.03, 0.10)
        c.setFillColor(Color(0.08, 0.09, 0.06, alpha=v))
        c.rect(x, y, t, t, stroke=0, fill=1)


def furos():
    """Furos de arquivo na calha, como formulário de fichário."""
    for fy in (H * 0.25, H * 0.5, H * 0.75):
        c.setFillColor(HexColor("#DAD8CC"))
        c.circle(M + 4.5 * mm, fy, 2.4 * mm, stroke=0, fill=1)
        c.setStrokeColor(HexColor("#C2C0B2"))
        c.setLineWidth(0.5)
        c.circle(M + 4.5 * mm, fy, 2.4 * mm, stroke=1, fill=0)


def registro():
    """Marcas de registro da gráfica nos cantos."""
    d = 3.6 * mm
    c.setLineWidth(0.45)
    for x, y in ((M * 0.5, H - M * 0.5), (W - M * 0.5, H - M * 0.5),
                 (M * 0.5, M * 0.5), (W - M * 0.5, M * 0.5)):
        c.setStrokeColor(CHUMBO_3)
        c.line(x - d, y, x + d, y)
        c.line(x, y - d, x, y + d)
        # desalinho de registro: a segunda tinta não bate exatamente
        c.setStrokeColor(CARIMBO_L)
        c.line(x - d + 0.7, y + 0.7, x + d + 0.7, y + 0.7)


def fundo():
    c.setFillColor(PAPEL)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    # calha
    c.setFillColor(HexColor("#E6E5DB"))
    c.rect(0, 0, M + CAL - 3 * mm, H, stroke=0, fill=1)
    c.setStrokeColor(FIO)
    c.setLineWidth(0.5)
    c.line(M + CAL - 3 * mm, 0, M + CAL - 3 * mm, H)
    fibra()
    furos()
    registro()


def rodape():
    if st["pag"] <= 1:
        return
    c.setStrokeColor(FIO)
    c.setLineWidth(0.5)
    c.line(X0, 14 * mm, W - M, 14 * mm)
    c.setFont("CP", 7)
    c.setFillColor(CHUMBO_3)
    c.drawString(X0, 10 * mm, "EMBARCALY / GUIA 400")
    c.drawRightString(W - M, 10 * mm, "FL. %02d DE 08" % st["pag"])


def pagina(num=None, titulo=None, etiqueta=None):
    if st["pag"] > 0:
        rodape()
        c.showPage()
    st["pag"] += 1
    fundo()
    y = H - M - 4 * mm

    if etiqueta:
        # cabeçalho de formulário: campo com rótulo minúsculo
        c.setFont("CP", 7)
        c.setFillColor(CHUMBO_3)
        c.drawString(X0, y, "SEÇÃO")
        c.drawRightString(W - M, y, "RES. ANAC 400/2016")
        y -= 10
        c.setStrokeColor(CHUMBO)
        c.setLineWidth(0.9)
        c.line(X0, y, W - M, y)
        y -= 13
        c.setFont("CP-Bd", 8.5)
        c.setFillColor(CARIMBO)
        c.drawString(X0, y, etiqueta.upper())
        y -= 38

    if titulo:
        c.setFont("AN-Bd", 31)
        c.setFillColor(CHUMBO)
        c.drawString(X0, y, titulo)
        y -= 17
        c.setStrokeColor(FIO)
        c.setLineWidth(0.5)
        c.line(X0, y, W - M, y)
        y -= 20
    return y


# ---------------------------------------------------------------- texto
def wrap(txt, fonte, tam, larg):
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


def para(y, txt, tam=10, fonte="AR", cor=CHUMBO_2, x=None, larg=None, ent=None):
    x = X0 if x is None else x
    larg = larg or CW
    ent = ent or tam * 1.5
    c.setFont(fonte, tam)
    c.setFillColor(cor)
    for ln in wrap(txt, fonte, tam, larg):
        c.drawString(x, y, ln)
        y -= ent
    return y


def sub(y, txt, tam=13):
    c.setFont("AN-Bd", tam)
    c.setFillColor(CHUMBO)
    c.drawString(X0, y, txt.upper())
    return y - tam * 1.5


def margem(y, txt):
    """Citação de artigo na calha, como documento jurídico."""
    c.setFont("CP", 6.2)
    c.setFillColor(CARIMBO_L)
    for i, ln in enumerate(wrap(txt, "CP", 6.2, CAL + 2 * mm)):
        c.drawString(M + 0.5 * mm, y - i * 8, ln)


def carimbo_rotativo(x, y, linhas, ang=-5.5, esc=1.0):
    """Carimbo de borracha: caixa, rotação e desalinho de tinta."""
    c.saveState()
    c.translate(x, y)
    c.rotate(ang)
    c.scale(esc, esc)
    larg = 0
    for ln, tam in linhas:
        larg = max(larg, pdfmetrics.stringWidth(ln.upper(), "CP-Bd", tam))
    larg += 22
    alt = 16 + sum(t * 1.7 for _, t in linhas)

    # fantasma de registro: a tinta bate 0,8pt fora
    c.setStrokeColor(Color(0.49, 0.42, 0.66, alpha=0.35))
    c.setLineWidth(1.7)
    c.rect(-larg / 2 + 0.8, -alt / 2 - 0.8, larg, alt, stroke=1, fill=0)

    c.setStrokeColor(CARIMBO)
    c.setLineWidth(1.7)
    c.rect(-larg / 2, -alt / 2, larg, alt, stroke=1, fill=0)
    c.setLineWidth(0.5)
    c.rect(-larg / 2 + 3, -alt / 2 + 3, larg - 6, alt - 6, stroke=1, fill=0)

    yy = alt / 2 - 13
    for ln, tam in linhas:
        c.setFont("CP-Bd", tam)
        c.setFillColor(CARIMBO)
        c.drawCentredString(0, yy, ln.upper())
        yy -= tam * 1.7
    c.restoreState()


def campo(y, rotulo, valor, x=None, larg=None, tam=11):
    """Campo de formulário: rótulo pequeno acima, valor sobre linha."""
    x = X0 if x is None else x
    larg = larg or CW
    c.setFont("CP", 6.6)
    c.setFillColor(CHUMBO_3)
    c.drawString(x, y, rotulo.upper())
    c.setFont("AR-Sb", tam)
    c.setFillColor(CHUMBO)
    c.drawString(x, y - tam - 3, valor)
    c.setStrokeColor(FIO)
    c.setLineWidth(0.5)
    c.line(x, y - tam - 8, x + larg, y - tam - 8)
    return y - tam - 18


def greenbar(y, linhas, colunas, alt=None):
    """Tabela em papel greenbar. Bandas alternadas, como listagem de impressora."""
    alt = alt or 9.5 * mm
    c.setStrokeColor(CHUMBO)
    c.setLineWidth(0.9)
    c.line(X0, y + 4, W - M, y + 4)
    c.setFont("CP-Bd", 6.8)
    c.setFillColor(CHUMBO_3)
    for cx, rot in colunas:
        c.drawString(X0 + cx, y - 6, rot.upper())
    y -= 13

    for i, cels in enumerate(linhas):
        if i % 2 == 0:
            c.setFillColor(BARRA)
            c.rect(X0, y - alt + 6, CW, alt, stroke=0, fill=1)
        for (cx, _), (txt, fonte, tam, cor) in zip(colunas, cels):
            c.setFont(fonte, tam)
            c.setFillColor(cor)
            c.drawString(X0 + cx, y - alt + 6 + (alt - tam) / 2 + 1, txt)
        y -= alt
    c.setStrokeColor(CHUMBO)
    c.setLineWidth(0.9)
    c.line(X0, y + 6, W - M, y + 6)
    return y - 6


# ================================================================ FL.01 CAPA
st["pag"] = 1
fundo()

c.setFont("CP", 7.2)
c.setFillColor(CHUMBO_3)
c.drawString(X0, H - M - 4 * mm, "DOCUMENTO INFORMATIVO / DISTRIBUIÇÃO LIVRE")
c.drawRightString(W - M, H - M - 4 * mm, "ED. 01 · SET 2026")

y = H - M - 9 * mm
c.setStrokeColor(CHUMBO)
c.setLineWidth(1.2)
c.line(X0, y, W - M, y)

y -= 26 * mm
c.setFont("CP-Bd", 9)
c.setFillColor(CARIMBO)
c.drawString(X0, y, "RESOLUÇÃO ANAC Nº 400/2016")

y -= 18 * mm
c.setFont("AN-Bd", 54)
c.setFillColor(CHUMBO)
c.drawString(X0, y, "A COMPANHIA")
y -= 58
c.drawString(X0, y, "DEVE HOTEL")
y -= 58
c.drawString(X0, y, "PRA VOCÊ.")

y -= 15 * mm
c.setFont("AN-Bd", 19)
c.setFillColor(CHUMBO_3)
c.drawString(X0, y, "NINGUÉM VAI FALAR.")

y -= 16 * mm
y = para(y, "Passou de quatro horas de atraso, eles são obrigados a te hospedar e "
            "pagar o transporte. Passou de duas, devem comida. Em 2018, 17 milhões "
            "de brasileiros tiveram voo atrasado ou cancelado. Dois por cento "
            "pediram alguma coisa.",
         tam=11, larg=CW * 0.78, ent=17)

# tabela de limiares
y -= 10 * mm
y = greenbar(
    y,
    [
        [("+1h", "CP-Bd", 13, CHUMBO), ("LIBERADO", "CP-Bd", 8.5, CARIMBO),
         ("Internet e telefone", "AR-Sb", 11, CHUMBO)],
        [("+2h", "CP-Bd", 13, CHUMBO), ("LIBERADO", "CP-Bd", 8.5, CARIMBO),
         ("Comida", "AR-Sb", 11, CHUMBO)],
        [("+4h", "CP-Bd", 13, CHUMBO), ("LIBERADO", "CP-Bd", 8.5, CARIMBO),
         ("Hotel e transporte", "AR-Sb", 11, CHUMBO)],
    ],
    [(0, "decorrido"), (60, "situação"), (160, "direito")],
    alt=11 * mm,
)

carimbo_rotativo(W - M - 32 * mm, 52 * mm,
                 [("guarde", 11), ("no celular", 11)], ang=-6.5)

c.setFont("CP", 7.4)
c.setFillColor(CHUMBO_3)
c.drawString(X0, 24 * mm, "EMBARCALY  /  BRUNO BIANCHINI")
c.drawString(X0, 19 * mm, "bianchinibruno.github.io/embarcaly")

# ================================================================ FL.02
y = pagina(titulo="Assistência material", etiqueta="1 · o que destrava, e quando")
margem(y - 2, "Art. 27")

y = para(y, "A contagem começa no horário originalmente previsto para a partida. "
            "Vale para atraso, cancelamento e preterição. Eles deveriam oferecer "
            "sem você pedir. Quase nunca oferecem.", tam=10.5, ent=16)
y -= 6 * mm

blocos = [
    ("+1h", "COMUNICAÇÃO",
     "Internet e telefone por conta da companhia. Dois minutos de ligação pra "
     "avisar quem está te esperando do outro lado."),
    ("+2h", "ALIMENTAÇÃO",
     "Voucher, refeição ou lanche conforme o horário. Se o atraso pegou o almoço, "
     "é almoço. Não é um pacote de bolacha."),
    ("+4h", "HOSPEDAGEM",
     "Hotel mais transporte de ida e volta ate ele. Se você está na cidade onde mora, "
     "eles podem custear só o transporte até sua casa e de volta."),
]
for marco, nome, desc in blocos:
    alt = 32 * mm
    c.setFillColor(BARRA)
    c.rect(X0, y - alt, CW, alt, stroke=0, fill=1)
    c.setStrokeColor(CARIMBO)
    c.setLineWidth(2.2)
    c.line(X0, y - alt, X0, y)

    c.setFont("CP-Bd", 22)
    c.setFillColor(CHUMBO)
    c.drawString(X0 + 12, y - 14 * mm, marco)

    c.setFont("AN-Bd", 12)
    c.setFillColor(CARIMBO)
    c.drawString(X0 + 12, y - 22 * mm, nome)

    linhas_d = wrap(desc, "AR", 10, CW - 58 * mm)
    yy = y - (alt / 2) + (len(linhas_d) - 1) * 7 + 1
    c.setFont("AR", 10)
    c.setFillColor(CHUMBO_2)
    for ln in linhas_d:
        c.drawString(X0 + 52 * mm, yy, ln)
        yy -= 14
    y -= alt + 8 * mm

y -= 5 * mm
c.setStrokeColor(CARIMBO)
c.setLineWidth(1.1)
c.rect(X0, y - 27 * mm, CW, 27 * mm, stroke=1, fill=0)
c.setFont("AN-Bd", 12)
c.setFillColor(CARIMBO)
c.drawString(X0 + 12, y - 10 * mm, "A QUE NINGUÉM CONHECE")
c.setFont("AR", 10)
c.setFillColor(CHUMBO)
yy = y - 17 * mm
for ln in wrap("Eles precisam te informar do atraso e atualizar a cada 30 minutos. "
               "Silêncio já é descumprimento, e vira prova a seu favor.",
               "AR", 10, CW - 24):
    c.drawString(X0 + 12, yy, ln)
    yy -= 13.5
y -= 36 * mm

para(y, "O motivo do atraso não muda nada. Mau tempo, problema técnico, malha "
        "aérea: a assistência é devida do mesmo jeito. Não é cortesia e não é "
        "negociação.", tam=9.6, cor=CHUMBO_2, ent=14)

# ================================================================ FL.03
y = pagina(titulo="Quatro saídas", etiqueta="2 · acima de 4h, cancelamento, preterição")
margem(y - 2, "Art. 21 e 22")

y = para(y, "O erro mais caro do passageiro brasileiro é aceitar a primeira coisa "
            "que colocam na mesa. A escolha é sua. Peça pelo nome.", tam=10.5, ent=16)
y -= 5 * mm

opcoes = [
    ("01", "REACOMODAÇÃO",
     "Outro voo pro mesmo destino na primeira oportunidade, inclusive em outra "
     "companhia, sem você pagar diferença."),
    ("02", "REEMBOLSO INTEGRAL",
     "Todo o valor pago de volta, com a taxa de embarque junto."),
    ("03", "OUTRA MODALIDADE",
     "Ônibus, van, o que resolver o trecho. Por conta deles."),
    ("04", "REMARCAÇÃO",
     "Data e horário que sirvam pra você, sem custo e sem multa."),
]
for num, nome, desc in opcoes:
    c.setFont("CP-Bd", 15)
    c.setFillColor(CARIMBO)
    c.drawString(X0, y - 2, num)
    c.setFont("AN-Bd", 13)
    c.setFillColor(CHUMBO)
    c.drawString(X0 + 26, y, nome)
    yy = y - 15
    c.setFont("AR", 9.8)
    c.setFillColor(CHUMBO_2)
    for ln in wrap(desc, "AR", 9.8, CW - 26):
        c.drawString(X0 + 26, yy, ln)
        yy -= 13.5
    y = yy - 6
    c.setStrokeColor(FIO)
    c.setLineWidth(0.5)
    c.line(X0, y + 4, W - M, y + 4)
    y -= 12

y -= 4 * mm
y = sub(y, "Se foi preterição")
y = para(y, "Preterição é quando negam seu embarque num voo com reserva confirmada. "
            "O famoso overbooking. Além das quatro saídas acima, existe compensação "
            "financeira paga na hora.", tam=10, ent=15)
y -= 4 * mm

y = greenbar(
    y,
    [
        [("250 DES", "CP-Bd", 11, CHUMBO), ("", "CP", 8, CHUMBO),
         ("Voo doméstico", "AR-Sb", 10, CHUMBO)],
        [("500 DES", "CP-Bd", 11, CHUMBO), ("", "CP", 8, CHUMBO),
         ("Voo internacional", "AR-Sb", 10, CHUMBO)],
    ],
    [(0, "compensação"), (90, ""), (160, "trecho")],
    alt=9 * mm,
)
y -= 5 * mm
para(y, "DES é moeda de referência do FMI e varia todo dia. Na ordem de grandeza, "
        "250 DES ficam perto de R$1.800 e 500 DES perto de R$3.600. Confira a "
        "cotação antes de citar número. É um mínimo, não impede cobrar prejuízo maior.",
     tam=8.8, cor=CHUMBO_3, ent=12.5)

# ================================================================ FL.04
y = pagina(titulo="No balcão, agora", etiqueta="3 · o que falar e o que guardar")

y = para(y, "A diferença entre quem recebe e quem não recebe raramente é o direito. "
            "É saber pedir com o nome certo, e ter registrado o que aconteceu.",
         tam=10.5, ent=16)
y -= 5 * mm
y = sub(y, "Fale exatamente assim")

frases = [
    "Meu voo está com X horas de atraso. Quero a assistência material da Resolução 400.",
    "Já passou de quatro horas. Preciso de hospedagem e transporte.",
    "Entendi a reacomodação. Eu quero o reembolso integral, com a taxa de embarque.",
    "Tem voo de outra companhia pro mesmo destino hoje? Quero ser reacomodado nele.",
    "Pode registrar no sistema e me passar o número de protocolo?",
]
for f in frases:
    linhas = wrap(f, "AR-Sb", 9.8, CW - 32)
    alt = 9 + 13.5 * len(linhas)
    c.setFillColor(BARRA)
    c.rect(X0, y - alt + 9, CW, alt, stroke=0, fill=1)
    c.setStrokeColor(CARIMBO)
    c.setLineWidth(1.6)
    c.line(X0, y - alt + 9, X0, y + 9)
    c.setFont("CP-Bd", 11)
    c.setFillColor(CARIMBO)
    c.drawString(X0 + 9, y, "»")
    yy = y
    c.setFont("AR-Sb", 9.8)
    c.setFillColor(CHUMBO)
    for ln in linhas:
        c.drawString(X0 + 24, yy, ln)
        yy -= 13.5
    y = yy - 8

y -= 4 * mm
y = sub(y, "Guarde tudo isto")
provas = [
    "Foto do painel do aeroporto com o atraso e o horário visível",
    "Print do aplicativo da companhia com o status do voo",
    "Cartão de embarque, e-ticket e todos os comprovantes",
    "Nota de tudo que você gastou porque eles não ofereceram",
    "Nome de quem te atendeu, horário e número de protocolo",
    "Recusa por escrito, se recusarem alguma coisa",
]
for p in provas:
    c.setStrokeColor(CARIMBO)
    c.setLineWidth(0.9)
    c.rect(X0, y - 2.5, 8, 8, stroke=1, fill=0)
    c.setFont("AR", 9.8)
    c.setFillColor(CHUMBO_2)
    c.drawString(X0 + 16, y, p)
    y -= 16

y -= 4 * mm
c.setStrokeColor(CHUMBO)
c.setLineWidth(0.9)
c.rect(X0, y - 21 * mm, CW, 21 * mm, stroke=1, fill=0)
c.setFont("AN-Bd", 11.5)
c.setFillColor(CHUMBO)
c.drawString(X0 + 10, y - 8 * mm, "ACEITAR O VOUCHER NÃO ABRE MÃO DE NADA")
c.setFont("AR", 9.6)
c.setFillColor(CHUMBO_2)
yy = y - 13.5 * mm
for ln in wrap("Assistência material é obrigação, não acordo. O que exige atenção é "
               "assinar termo de acordo ou de quitação. Aí sim, leia antes.",
               "AR", 9.6, CW - 24):
    c.drawString(X0 + 10, yy, ln)
    yy -= 12.5

# ================================================================ FL.05
y = pagina(titulo="Bagagem", etiqueta="4 · extravio, atraso e dano")
margem(y - 2, "Art. 33 e 34")

y = para(y, "A companhia tem prazo pra te devolver a mala. Passado o prazo, ela é "
            "considerada extraviada em definitivo e entra indenização.",
         tam=10.5, ent=16)
y -= 6 * mm

y = greenbar(
    y,
    [
        [("07 DIAS", "CP-Bd", 13, CHUMBO), ("", "CP", 8, CHUMBO),
         ("Voo doméstico", "AR-Sb", 10.5, CHUMBO)],
        [("21 DIAS", "CP-Bd", 13, CHUMBO), ("", "CP", 8, CHUMBO),
         ("Voo internacional", "AR-Sb", 10.5, CHUMBO)],
    ],
    [(0, "prazo pra entregar"), (100, ""), (160, "trecho")],
    alt=11 * mm,
)

y -= 8 * mm
y = sub(y, "Faça nesta ordem")
passos = [
    "NÃO saia do aeroporto. Abra o RIB, o Registro de Irregularidade de Bagagem, "
    "ainda na área de desembarque.",
    "Guarde a via do RIB e a etiqueta que colaram no seu cartão de embarque.",
    "Enquanto a mala não chega, gasto essencial com roupa e higiene é reembolsável. "
    "Guarde toda nota.",
    "Mala danificada ou violada: registre na hora, com foto, antes de sair.",
]
for i, p in enumerate(passos, 1):
    c.setFont("CP-Bd", 12)
    c.setFillColor(CARIMBO)
    c.drawString(X0, y, "%02d" % i)
    yy = y
    c.setFont("AR", 9.8)
    c.setFillColor(CHUMBO_2)
    for ln in wrap(p, "AR", 9.8, CW - 26):
        c.drawString(X0 + 26, yy, ln)
        yy -= 13.5
    y = yy - 8

y -= 3 * mm
carimbo_rotativo(X0 + CW * 0.5, y - 13 * mm,
                 [("não saia sem", 10), ("abrir o RIB", 10)], ang=-4)
y -= 30 * mm

para(y, "Sair do aeroporto sem o RIB é o erro que mais enfraquece um caso de "
        "bagagem. Depois da porta, provar que a mala não chegou fica muito mais "
        "difícil.", tam=9.6, cor=CHUMBO_2, ent=14)

# ================================================================ FL.06
y = pagina(titulo="Se disserem não", etiqueta="5 · onde levar o caso, de graça")

y = para(y, "Tudo abaixo é gratuito e não precisa de advogado. Siga a ordem: cada "
            "etapa fortalece a seguinte.", tam=10.5, ent=16)
y -= 5 * mm

canais = [
    ("01", "A PRÓPRIA COMPANHIA",
     "Abra reclamação no canal oficial e anote o protocolo. Parece inútil e não é: "
     "prova que você tentou resolver antes, e os canais seguintes pedem isso."),
    ("02", "ANAC PASSAGEIRO",
     "Canal direto criado pela ANAC em 2026, só para o setor aéreo. A companhia "
     "tem 10 dias corridos para responder, e existe painel público com o "
     "desempenho de cada empresa. superapp.anac.gov.br/reclamacao/incluir"),
    ("03", "CONSUMIDOR.GOV.BR",
     "Plataforma geral do governo, que segue valendo. Passageiros aéreos "
     "registram cerca de 100 mil reclamações por ano ali, com mais de 80% "
     "resolvidas."),
    ("04", "PROCON",
     "Do seu estado ou município. Tem poder de mediação e de multa."),
    ("05", "JUIZADO ESPECIAL CÍVEL",
     "Até 20 salários mínimos, sem advogado. É onde saem as indenizações por dano "
     "moral, separadas de tudo acima."),
]
for num, nome, desc in canais:
    c.setFont("CP-Bd", 14)
    c.setFillColor(CARIMBO)
    c.drawString(X0, y - 1, num)
    c.setFont("AN-Bd", 12.5)
    c.setFillColor(CHUMBO)
    c.drawString(X0 + 28, y, nome)
    yy = y - 14
    c.setFont("AR", 9.6)
    c.setFillColor(CHUMBO_2)
    for ln in wrap(desc, "AR", 9.6, CW - 28):
        c.drawString(X0 + 28, yy, ln)
        yy -= 13
    y = yy - 6
    c.setStrokeColor(FIO)
    c.setLineWidth(0.5)
    c.line(X0, y + 4, W - M, y + 4)
    y -= 11

y -= 4 * mm
para(y, "Prazo pra reclamar: 5 anos no transporte doméstico, pelo Código de Defesa "
        "do Consumidor. Não corra, mas não deixe esfriar. Prova some.",
     tam=9.6, cor=CHUMBO_3, ent=14)

# ================================================================ FL.07 BOLSO
y = pagina(titulo="Destaque e guarde", etiqueta="6 · resumo de bolso")

y -= 2 * mm
# picote
c.setStrokeColor(CHUMBO_3)
c.setDash(2.2, 3)
c.setLineWidth(0.7)
c.line(X0, y, W - M, y)
c.setDash()
c.setFont("CP", 6.5)
c.setFillColor(CHUMBO_3)
c.drawString(X0, y + 6, "DESTAQUE AQUI")
y -= 15 * mm

y = greenbar(
    y,
    [
        [("+1h", "CP-Bd", 17, CHUMBO), ("", "CP", 8, CHUMBO),
         ("internet e telefone", "AN-Bd", 14, CHUMBO)],
        [("+2h", "CP-Bd", 17, CHUMBO), ("", "CP", 8, CHUMBO),
         ("comida", "AN-Bd", 14, CHUMBO)],
        [("+4h", "CP-Bd", 17, CHUMBO), ("", "CP", 8, CHUMBO),
         ("hotel e transporte", "AN-Bd", 14, CHUMBO)],
    ],
    [(0, ""), (80, ""), (110, "")],
    alt=16 * mm,
)

y -= 14 * mm
y = sub(y, "Acima de 4h, cancelou ou preteriu — você escolhe", tam=11.5)
for t in ["outro voo, inclusive de outra companhia",
          "reembolso integral, com a taxa de embarque",
          "outro meio de transporte",
          "remarcar sem custo"]:
    c.setFont("CP-Bd", 10)
    c.setFillColor(CARIMBO)
    c.drawString(X0, y, "—")
    c.setFont("AR-Sb", 11)
    c.setFillColor(CHUMBO)
    c.drawString(X0 + 18, y, t)
    y -= 19

y -= 11 * mm
y = sub(y, "Sempre", tam=11.5)
for t in ["Foto do painel com o horário",
          "Toda nota do que você gastou",
          "Nome de quem atendeu e o protocolo"]:
    c.setStrokeColor(CARIMBO)
    c.setLineWidth(1)
    c.rect(X0, y - 3, 9, 9, stroke=1, fill=0)
    c.setFont("AR-Sb", 11)
    c.setFillColor(CHUMBO)
    c.drawString(X0 + 18, y, t)
    y -= 20

y -= 12 * mm
c.setFillColor(BARRA_ESC)
c.rect(X0, y - 20 * mm, CW, 20 * mm, stroke=0, fill=1)
c.setFont("AN-Bd", 12)
c.setFillColor(CHUMBO)
c.drawString(X0 + 12, y - 8 * mm, "E TE ATUALIZAR A CADA 30 MINUTOS.")
c.setFont("AR", 10)
c.setFillColor(CHUMBO_2)
c.drawString(X0 + 12, y - 14.5 * mm, "Obrigação deles. Silêncio é descumprimento.")

carimbo_rotativo(W - M - 32 * mm, 27 * mm, [("res. 400", 10), ("anac", 10)], ang=5)

# ================================================================ FL.08
y = pagina(titulo="Por que eu montei isso", etiqueta="7 · o autor")

y = para(y, "Sou engenheiro de software. Voltei de uma viagem com treze reservas em "
            "sete fornecedores: quatro voos, três hotéis, um carro e cinco passeios. "
            "Terminei tudo numa planilha, porque nenhum aplicativo dava conta de "
            "juntar aquilo.", tam=11, cor=CHUMBO, ent=17)
y -= 4
y = para(y, "Aí um voo atrasou três horas em Lisboa. O painel do aeroporto me "
            "informou do voo e parou por aí. O transfer, o hotel e o passeio do dia "
            "seguinte eu resolvi sozinho, no celular, na fila.", tam=11, cor=CHUMBO, ent=17)
y -= 4
y = para(y, "Foi ali que entendi que o problema não é organizar a viagem. É conduzir "
            "ela quando sai do plano. É isso que estou construindo.",
         tam=11, cor=CHUMBO, ent=17)

y -= 10 * mm
c.setFillColor(BARRA)
c.rect(X0, y - 30 * mm, CW, 30 * mm, stroke=0, fill=1)
c.setStrokeColor(CARIMBO)
c.setLineWidth(2.2)
c.line(X0, y - 30 * mm, X0, y)
c.setFont("AN-Bd", 15)
c.setFillColor(CARIMBO)
c.drawString(X0 + 12, y - 10 * mm, "VOCÊ É QUEM ORGANIZA A VIAGEM DO GRUPO?")
c.setFont("AR", 10)
c.setFillColor(CHUMBO)
yy = y - 16 * mm
for ln in wrap("Quero te ouvir vinte minutos antes de escrever mais uma linha de "
               "código. Não tenho nada pra vender.", "AR", 10, CW - 30):
    c.drawString(X0 + 12, yy, ln)
    yy -= 13.5
y -= 38 * mm

y = campo(y, "contato", "bbianchini97@gmail.com", larg=CW * 0.62)
y = campo(y, "produto", "bianchinibruno.github.io/embarcaly", larg=CW * 0.62)

carimbo_rotativo(W - M - 28 * mm, y + 20 * mm,
                 [("embarcaly", 11)], ang=-7)

y -= 8 * mm
c.setStrokeColor(FIO)
c.setLineWidth(0.5)
c.line(X0, y, W - M, y)
y -= 14
y = para(y, "Documento informativo baseado na Resolução ANAC nº 400/2016 e no Código "
            "de Defesa do Consumidor. Não constitui consultoria jurídica. Norma muda "
            "e caso concreto tem particularidade. Na dúvida, procure o Procon, a ANAC "
            "ou um advogado. Versão vigente em anac.gov.br.",
         tam=8.2, cor=CHUMBO_3, ent=11.5)
y -= 6
c.setFont("CP", 7)
c.setFillColor(CHUMBO_3)
c.drawString(X0, y, "ED. 01 · SET 2026 · DISTRIBUIÇÃO LIVRE")

rodape()
c.showPage()
c.save()
print("OK ->", OUT)
