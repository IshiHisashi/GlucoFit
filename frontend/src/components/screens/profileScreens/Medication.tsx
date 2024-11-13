import { SafeAreaView, ScrollView, View, Text, Button, ButtonText, FlatList } from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { Pressable } from "@gluestack-ui/themed";
import { gql, useQuery } from "@apollo/client";

const GET_USERS_MEDICATION = gql`
  query GetUserMedicineList(
    $userId: ID!
  ) {
    getUserMedicineList(
      user_id: $userId
    ) {
      dosage
      log_timestamp
      medicine_name
      unit
      id
    }
  }
`

type MedicationsScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "Medications"
>;

const MedicationScreen = () => {

  const { userId } = useContext(AuthContext);
  const navigation = useNavigation<MedicationsScreenNavigationProps>();
  const [medsData, setMedsData] = useState<any[]>([]);

  const {data, loading, error} = useQuery(GET_USERS_MEDICATION, 
    {
      variables: { userId: userId }
    }
  )

  useEffect(() => {
    if (data?.getUserMedicineList) {
      setMedsData(data.getUserMedicineList);
      console.log(data.getUserMedicineList);
    }
  }, [data])

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Medications"
          // rightIconOnPress={() => {}}
        />
        <ScrollView padding={20}>
          {
            medsData.length > 0 && 
            <FlatList
              data={medsData}
              renderItem={({ item }) => {
                console.log(item);
                return (
                  <View padding={20} backgroundColor="white" borderRadius={10} marginBottom={10}>
                    <Text>Name: { item.medicine_name }</Text>
                    <Text>Dosage: { item.dosage } {item.unit}</Text>
                    <Text>Medication id: { item.id }</Text>
                  </View>
                )
              }}
            />            
          }
          <Pressable 
            onPress={() => navigation?.navigate("EditProfile")}
            backgroundColor="white"
            borderRadius={10}
            padding={20}
          >    
            <Text>Add Medication</Text>    
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default MedicationScreen;