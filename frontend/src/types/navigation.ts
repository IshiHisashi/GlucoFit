export type TabParamList = {
  Home: undefined;
  Insights: undefined;
  FAB: undefined;
  TestStack: undefined;
  Logs: undefined;
};

export type AppStackParamList = {
  Tabs: { screen?: keyof TabParamList };
  CarbsLog: undefined;
  ActivityLog: undefined;
  MedicineLog: undefined;
  GlucoseLog: undefined;
};
