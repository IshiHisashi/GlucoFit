import AnotherTest from "../testPages/AnotherTest";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type AnotherScreenProps = NativeStackScreenProps<RootStackParamList, 'Another'>;

const AnotherTestScreen: React.FC<AnotherScreenProps> = ({ navigation }) => (
  <AnotherTest navigation={navigation} />
);

export default AnotherTestScreen;
