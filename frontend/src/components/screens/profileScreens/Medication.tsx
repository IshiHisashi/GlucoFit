import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  ButtonText,
  FlatList,
  Center,
} from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { Pressable } from "@gluestack-ui/themed";
import { gql, useQuery } from "@apollo/client";

const GET_USERS_MEDICATION = gql`
  query GetUserMedicineList($userId: ID!) {
    getUserMedicineList(user_id: $userId) {
      dosage
      log_timestamp
      medicine_name
      unit
      id
    }
  }
`;

type MedicationsScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "Medications"
>;

const MedicationScreen = () => {
  const { userId } = useContext(AuthContext);
  const navigation = useNavigation<MedicationsScreenNavigationProps>();
  const [medsData, setMedsData] = useState<any[]>([]);

  const { data, loading, error, refetch } = useQuery(GET_USERS_MEDICATION, {
    variables: { userId: userId },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data?.getUserMedicineList) {
      setMedsData(data.getUserMedicineList);
    }
  }, [data]);

  // Update data on the screen
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Medications"
          // rightIconOnPress={() => {}}
        />
        {medsData.length > 0 ? (
          <FlatList
            padding={20}
            data={medsData}
            renderItem={({ item }) => {
              console.log(item);
              return (
                <View
                  id="item.id"
                  padding={20}
                  backgroundColor="white"
                  borderRadius={10}
                  marginBottom={10}
                >
                  <Text fontSize={18} fontFamily="$bold" color="black">
                    {item.medicine_name}
                  </Text>
                  <Text fontSize={14}>
                    Dosage: {item.dosage} {item.unit}
                  </Text>
                </View>
              );
            }}
          />
        ) : (
          <Center>
            <Text>No medicine found</Text>
          </Center>
        )}
        <Button
          onPress={() => navigation?.navigate("AddMedecine")}
          bgColor="$blue600"
          borderRadius={30}
          margin={20}
        >
          <ButtonText color="white">Add Medicine</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default MedicationScreen;
