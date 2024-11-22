import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  VStack,
  HStack,
  Icon,
  ChevronRightIcon,
} from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { gql, useQuery } from "@apollo/client";

const GET_USER_NAME = gql`
  query GetUser($userId: ID!) {
    getUser(id: $userId) {
      name
    }
  }
`;

type ProfileScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "Profile"
>;

const ProfileScreen = () => {
  const { userId } = useContext(AuthContext);
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const [userName, setUserName] = useState<string>("");

  const { data, loading, error, refetch } = useQuery(GET_USER_NAME, {
    variables: { userId: userId },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data?.getUser?.name) {
      setUserName(data.getUser.name);
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
          text="My Account"
          // rightIconOnPress={() => {}}
        />
        <ScrollView padding={20} showsVerticalScrollIndicator={false}>
          <Pressable
            onPress={() => navigation?.navigate("EditProfile")}
            backgroundColor="white"
            borderRadius={10}
            padding={20}
            marginBottom={20}
          >
            <Text fontSize={20} fontFamily="$bold" color="black">
              {userName !== "" ? userName : "loading"}
            </Text>
            <Text fontSize={14}>Edit Profile</Text>
          </Pressable>
          <VStack
            backgroundColor="white"
            borderRadius={10}
            paddingHorizontal={20}
            paddingVertical={10}
            marginBottom={20}
          >
            <Text
              paddingVertical={15}
              fontSize={20}
              fontFamily="$bold"
              color="black"
            >
              Health
            </Text>
            <Pressable
              paddingVertical={15}
              borderBottomColor="$coolGray200"
              borderBottomWidth={1}
              onPress={() => navigation?.navigate("HealthData")}
            >
              <HStack justifyContent="space-between" width="100%">
                <Text fontSize={17} fontFamily="$semibold" color="black">
                  Health Data
                </Text>
                <Icon as={ChevronRightIcon} size="xl" />
              </HStack>
            </Pressable>
            <Pressable
              paddingVertical={15}
              borderBottomColor="$coolGray200"
              borderBottomWidth={1}
              onPress={() => navigation?.navigate("Medications")}
            >
              <HStack justifyContent="space-between" width="100%">
                <Text fontSize={17} fontFamily="$semibold" color="black">
                  Medication
                </Text>
                <Icon as={ChevronRightIcon} size="xl" />
              </HStack>
            </Pressable>
            <Pressable
              paddingVertical={15}
              onPress={() => navigation?.navigate("DevAndApp")}
            >
              <HStack justifyContent="space-between" width="100%">
                <Text fontSize={17} fontFamily="$semibold" color="black">
                  Dev and Apps
                </Text>
                <Icon as={ChevronRightIcon} size="xl" />
              </HStack>
            </Pressable>
          </VStack>
          <VStack
            backgroundColor="white"
            borderRadius={10}
            paddingHorizontal={20}
            paddingVertical={10}
            marginBottom={40}
          >
            <Text
              paddingVertical={15}
              fontSize={20}
              fontFamily="$bold"
              color="black"
            >
              General
            </Text>
            <Pressable
              paddingVertical={15}
              borderBottomColor="$coolGray200"
              borderBottomWidth={1}
              onPress={() => navigation?.navigate("NotifSettings")}
            >
              <HStack justifyContent="space-between" width="100%">
                <Text fontSize={17} fontFamily="$semibold" color="black">
                  Notification
                </Text>
                <Icon as={ChevronRightIcon} size="xl" />
              </HStack>
            </Pressable>
            <Pressable
              paddingVertical={15}
              borderBottomColor="$coolGray200"
              borderBottomWidth={1}
              onPress={() => navigation?.navigate("Security")}
            >
              <HStack justifyContent="space-between" width="100%">
                <Text fontSize={17} fontFamily="$semibold" color="black">
                  Security
                </Text>
                <Icon as={ChevronRightIcon} size="xl" />
              </HStack>
            </Pressable>
          </VStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
