import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Trips: undefined;
  Now: undefined;
  Itinerary: undefined;
  Socorro: undefined;
  Docs: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  Item: { id: string };
  Passes: undefined;
  /** Sem id, cria. Com id, edita. */
  TripForm: { id?: string };
  ItemForm: { id?: string };
  /** Registrar ou remover o atraso de uma reserva. */
  DelayForm: { id: string };
};
