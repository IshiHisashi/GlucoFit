export type TabParamList = {
  Home: undefined;
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
  Note: {
    initialNote: { title: string; content: string };
    onSave: (note: { title: string; content: string }) => void;
  };
  Article: { url: string; title: string };
  RecentInsights: undefined;
};

export type LoginSignupStackParamList = {
  LoginSignup: undefined;
  Login: undefined;
  Signup: undefined;
};
