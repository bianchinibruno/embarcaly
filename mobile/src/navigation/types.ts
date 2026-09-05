import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Trips: undefined;
  Now: undefined;
  Itinerary: undefined;
  Docs: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  Item: { id: string };
  Passes: undefined;
  /** Sem id, cria. Com id, edita. */
  TripForm: { id?: string };
  ItemForm: { id?: string };
};
