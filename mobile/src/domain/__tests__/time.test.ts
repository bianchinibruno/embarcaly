import { countdown, dayKey, dayMonth, gapLabel, hhmm, weekday } from '../time';

const d = (iso: string) => new Date(`${iso}:00`);

describe('formatação de data e hora', () => {
  it('escreve a hora sempre com dois dígitos', () => {
    expect(hhmm(d('2026-10-03T08:05'))).toBe('08:05');
    expect(hhmm(d('2026-10-03T22:40'))).toBe('22:40');
  });

  it('escreve meia-noite como 00:00, e não como 24:00', () => {
    expect(hhmm(d('2026-10-03T00:00'))).toBe('00:00');
  });

  it('escreve dia e mês em caixa alta, como num carimbo', () => {
    expect(dayMonth(d('2026-10-03T08:40'))).toBe('03 OUT');
    expect(dayMonth(d('2026-01-31T08:40'))).toBe('31 JAN');
    expect(dayMonth(d('2026-12-09T08:40'))).toBe('09 DEZ');
  });

  it('nomeia o dia da semana em português', () => {
    // 03/10/2026 cai num sábado.
    expect(weekday(d('2026-10-03T08:40'))).toBe('sábado');
    expect(weekday(d('2026-10-04T08:40'))).toBe('domingo');
    expect(weekday(d('2026-10-06T08:40'))).toBe('terça');
  });

  it('agrupa pelo dia ignorando a hora', () => {
    expect(dayKey(d('2026-10-03T00:10'))).toBe(dayKey(d('2026-10-03T23:50')));
  });

  it('separa dias diferentes mesmo com dez minutos entre eles', () => {
    expect(dayKey(d('2026-10-03T23:50'))).not.toBe(dayKey(d('2026-10-04T00:10')));
  });
});

describe('contagem regressiva nos limites', () => {
  const agora = d('2026-10-03T06:00');

  it('diz «agora» quando o instante já chegou', () => {
    expect(countdown(agora, agora)).toBe('agora');
  });

  it('diz «agora» para instante que já passou, sem número negativo', () => {
    expect(countdown(d('2026-10-03T05:00'), agora)).toBe('agora');
  });

  it('vira horas exatamente aos 60 minutos', () => {
    expect(countdown(d('2026-10-03T06:59'), agora)).toBe('em 59 min');
    expect(countdown(d('2026-10-03T07:00'), agora)).toBe('em 1h 00');
  });

  it('vira dias exatamente às 24 horas', () => {
    expect(countdown(d('2026-10-04T05:59'), agora)).toBe('em 23h 59');
    expect(countdown(d('2026-10-04T06:00'), agora)).toBe('em 1d 00h');
  });
});

describe('intervalo entre reservas nos limites', () => {
  const fim = d('2026-10-03T10:00');
  const mais = (min: number) => new Date(fim.getTime() + min * 60000);

  it('esconde intervalo de 24 minutos', () => {
    expect(gapLabel(fim, mais(24), false)).toBeNull();
  });

  it('mostra a partir de 25 minutos', () => {
    expect(gapLabel(fim, mais(25), false)).toBe('25 min livres');
  });

  it('escreve horas e minutos quando passa de uma hora', () => {
    expect(gapLabel(fim, mais(95), false)).toBe('1h 35 livres');
  });

  it('chama de conexão quando os dois lados são voo', () => {
    expect(gapLabel(fim, mais(95), true)).toBe('1h 35 de conexão');
  });

  it('mostra intervalo de 23h59', () => {
    expect(gapLabel(fim, mais(1439), false)).toBe('23h 59 livres');
  });

  it('esconde a partir de 24 horas, que já é outro dia da viagem', () => {
    expect(gapLabel(fim, mais(1440), false)).toBeNull();
  });

  it('esconde intervalo negativo, de itens que se sobrepõem', () => {
    expect(gapLabel(fim, mais(-30), false)).toBeNull();
  });
});
