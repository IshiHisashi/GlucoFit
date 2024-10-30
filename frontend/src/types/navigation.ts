export type TabParamList = {
  Home: { mutatedLog?: string; insight?: any };
  Insights: undefined;
  FAB: undefined;
  TestStack: undefined;
  Logs: undefined;
};

export type AppStackParamList = {
  Tabs: { screen?: keyof TabParamList; mutatedLog?: string };
  CarbsLog: { logId?: string };
  ActivityLog: { logId?: string };
  MedicineLog: { logId?: string };
  GlucoseLog: { logId?: string };
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
