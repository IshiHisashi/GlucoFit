import Test from "../testPages/Test";

type TestScreenProps = {
  navigation: undefined;
};

const TestScreen: React.FC<TestScreenProps> = ({ navigation }) => (
  <Test navigation={navigation} type="tsx" name="Aki" date={21} />
);

export default TestScreen;
