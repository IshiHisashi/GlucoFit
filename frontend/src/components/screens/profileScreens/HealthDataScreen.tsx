import { SafeAreaView, ScrollView, View, Text, Button, ButtonText } from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { gql, useQuery } from "@apollo/client";

const GET_USER_HEALTH_DATA = gql`
  query GetUser(
    $userId: ID!
  ) {
    getUser(
      id: $userId
    ) {
      weight
      maximum_bsl
      minimum_bsl
      height
      diabates_type
    }
  }
`

type HealthDataScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "HealthData"
>;

const HealthDataScreen = () => {

  const { userId } = useContext(AuthContext);
  const navigation = useNavigation<HealthDataScreenNavigationProps>();
  const [maxBsl, setMaxBsl] = useState<number>(0);
  const [minBsl, setMinBsl] = useState<number>(0);
  const [diabetesType, setDiabetesType] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);


  const {data, loading, error} = useQuery(GET_USER_HEALTH_DATA, 
    {
      variables: { userId: userId }
    }
  )

  useEffect(() => {
    console.log(data)
    if (data?.getUser?.maximum_bsl) {
      setMaxBsl(data.getUser.maximum_bsl);
    }
    if (data?.getUser?.minimum_bsl) {
      setMinBsl(data.getUser.minimum_bsl);
    }
    if (data?.getUser?.weight) {
      setWeight(data.getUser.weight);
    }
    if (data?.getUser?.height) {
      setHeight(data.getUser.height);
    }
    if (data?.getUser?.diabates_type) {
      setDiabetesType(data.getUser.diabates_type);
    }
  }, [data])

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Edit Profile"
          // rightIconOnPress={() => {}}
        />
        <ScrollView padding={20}>
          <Text>max: { maxBsl }</Text>
          <Text>min: { minBsl }</Text>
          <Text>type: { diabetesType }</Text>
          <Text>height: { height }</Text>
          <Text>weight: { weight }</Text>
          <Button>
            <ButtonText>
              Save
            </ButtonText>
          </Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HealthDataScreen;