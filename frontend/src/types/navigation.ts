export type TabParamList = {
  Home: { mutatedLog?: string; insight?: any };
  Insights: undefined;
  FAB: undefined;
  TestStack: undefined;
  Logs: undefined;
};

export type AppStackParamList = {
  Tabs: { screen?: keyof TabParamList; mutatedLog?: string };
  CarbsLog: { mutatedLog?: string };
  ActivityLog: { mutatedLog?: string };
  MedicineLog: { mutatedLog?: string };
  GlucoseLog: { mutatedLog?: string };
  AutoLog: { mutatedLog?: string };
  Note: {
    initialNote: { title: string; content: string };
    onSave: (note: { title: string; content: string }) => void;
  };
  Article: { url: string; title: string };
  RecentInsights: undefined;
  Result: { BGL: number; fromAuto: boolean };
};

export type LoginSignupStackParamList = {
  LoginSignup: undefined;
  Login: undefined;
  Signup: undefined;
};
