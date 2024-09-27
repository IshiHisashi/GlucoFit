import AnotherTest from "../testPages/AnotherTest";

type TestScreenProps = {
  navigation: undefined;
};

const AnotherTestScreen: React.FC<TestScreenProps> = ({ navigation }) => (
  <AnotherTest navigation={navigation} />
);

export default AnotherTestScreen;
