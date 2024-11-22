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
    <SafeAreaView backgroundColor="white">
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Medications"
          // rightIconOnPress={() => {}}
        />
        {medsData.length > 0 ? (
          <FlatList
            borderTopColor="#ECE5FF" 
            borderTopWidth={1}
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
                  borderWidth={1}
                  borderColor="#ECE5FF"
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
          <Center borderTopColor="#ECE5FF" borderTopWidth={1}>
            <Text>No medicine found</Text>
          </Center>
        )}
        <Button
          onPress={() => navigation?.navigate("AddMedecine")}
          bgColor="#4800FF"
          borderRadius={30}
          margin={20}
          height={52}
        >
          <ButtonText fontSize={17} fontFamily="$bold" color="white">Add Medicine</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default MedicationScreen;
