import React, { useContext } from "react";
import { View, Text, Image, Center } from "@gluestack-ui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { TabParamList } from "../../../types/navigation";
import { useMutation } from "@apollo/client";
import { useOnboarding } from "../../../context/OnboardingContext";
import {
  UPDATE_USER_MUTATION,
  ADD_MEDICINE_MUTATION,
  badges,
} from "../../../utils/query/onboardingQuery";
import { AuthContext } from "../../../context/AuthContext";
import GlucoButton from "../../atoms/GlucoButton";

type Props = NativeStackScreenProps<TabParamList>;

const AllDoneScreen: React.FC<Props> = ({ navigation }) => {
  const { onboardingData } = useOnboarding();
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [addMedicineToList] = useMutation(ADD_MEDICINE_MUTATION);
  const { userId } = useContext(AuthContext);
  const handleOnPress = async () => {
    try {
      const { data: updateUserData } = await updateUser({
        variables: {
          id: userId,
          name: onboardingData?.name,
          // birthday: onboardingData?.birthday,
          height: onboardingData?.height,
          weight: onboardingData?.weight,
          diabates_type: onboardingData?.diabates_type,
          maximum_bsl: onboardingData?.maximum_bsl,
          minimum_bsl: onboardingData?.minimum_bsl,
          notificaiton: onboardingData?.notification,
          badges: badges.length > 0 ? badges : [],
        },
      });
      console.log(`user updated : ${updateUserData}`);

      if (onboardingData.medicine_name) {
        const { data: addMedicineData } = await addMedicineToList({
          variables: {
            user_id: userId,
            medicine_name: onboardingData?.medicine_name,
            // log_timestamp: onboardingData?.log_timestamp,
          },
        });
        console.log(`medicine registered : ${addMedicineData}`);
      }
      navigation.navigate("Home");
    } catch (error: any) {
      console.log(onboardingData);
      console.error("Error details:", JSON.stringify(error, null, 2));
    }
  };

  return (
    <View>
      <Center p={16} flexDirection="column" gap={16} height="100%">
        <Image
          source={require("../../../../assets/allset.png")}
          resizeMode="contain"
          mx="auto"
          width={200}
          height={200}
          alt="Character is winking during the onboarding process"
        />
        <Text color="$neutralDark90" fontFamily="$bold" fontSize={28}>
          {`You’re all set, ${onboardingData.name}!`}
        </Text>
        <Text color="$neutralDark60" textAlign="center">
          You’re ready for personalized insights and a healthier journey with
          GlucoFit.
        </Text>
      </Center>
      <View position="absolute" bottom={30} width="100%" paddingHorizontal={28}>
        <GlucoButton
          buttonType="primary"
          text="Continue"
          isFocused={false}
          isDisabled={false}
          onPress={handleOnPress}
        />
      </View>
    </View>
  );
};

export default AllDoneScreen;
