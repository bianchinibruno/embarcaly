import { VERSO } from '../verso';
import { flightTimeline } from '../timeline';
import type { Item } from '../types';

const d = (iso: string) => new Date(`${iso}:00`);

/**
 * Chaves que as telas pedem ao verso. Um verbete que some daqui vira uma
 * folha em branco atrás do bilhete — o (i) abre e não explica nada.
 */
const CHAVES_DAS_TELAS = ['pnr', 'pass', 'gate', 'gateChange', 'connection', 'delay'];

describe('verso do bilhete', () => {
  it('tem verbete para todo marco da linha do tempo', () => {
    const voo: Item = {
      id: 'f1',
      type: 'air',
      title: 'Voo',
      start: d('2026-10-03T08:40'),
      checkinOpen: d('2026-10-02T08:40'),
      arriveBy: d('2026-10-03T06:40'),
      checkinClose: d('2026-10-03T07:40'),
      boarding: d('2026-10-03T08:05'),
      gateClose: d('2026-10-03T08:25'),
      pass: 'carrier',
    };
    for (const passo of flightTimeline(voo)) {
      if (!passo.info) continue;
      expect(Object.keys(VERSO)).toContain(passo.info);
    }
  });

  it('tem verbete para toda chave que as telas abrem', () => {
    for (const chave of CHAVES_DAS_TELAS) {
      expect(VERSO[chave]).toBeDefined();
    }
  });

  it('responde as três perguntas em todo verbete: o que é, por que importa, o que fazer', () => {
    for (const [chave, v] of Object.entries(VERSO)) {
      expect(v.title.trim().length).toBeGreaterThan(0);
      expect(v.headline.trim().length).toBeGreaterThan(0);
      // Corpo curto demais não explica nada a quem nunca viajou.
      expect(v.body.trim().length).toBeGreaterThan(40);
      expect(chave).toMatch(/^[a-zA-Z]+$/);
    }
  });

  it('nunca deixa um título extra sem o texto que ele anuncia', () => {
    for (const v of Object.values(VERSO)) {
      expect(Boolean(v.extraTitle)).toBe(Boolean(v.extraBody));
    }
  });
});
