import Test from "../testPages/Test";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type TestScreenProps = NativeStackScreenProps<RootStackParamList, 'Test'>;

const TestScreen: React.FC<TestScreenProps> = ({ navigation }) => (
  <Test navigation={navigation} type="tsx" name="Aki" date={21} />
);

export default TestScreen;
