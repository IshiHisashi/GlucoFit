import { SafeAreaView, ScrollView, View, Text, Button, ButtonText } from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";
import PressableOption from "../../atoms/PressableOption";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Dimensions } from "react-native";
import InputFieldGeneral from "../../atoms/InputFieldGeneral";

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

const UPDATE_USER_HEALTH_DATA = gql`
  mutation UpdateUser(
    $userId: ID!, 
    $diabatesType: Int, 
    $maximumBsl: Float, 
    $minimumBsl: Float, 
    $height: Float, 
    $weight: Float
  ) {
    updateUser(
      id: $userId, 
      diabates_type: $diabatesType, 
      maximum_bsl: $maximumBsl, 
      minimum_bsl: $minimumBsl, 
      height: $height, 
      weight: $weight
    ) {
      diabates_type
      height
      weight
      minimum_bsl
      maximum_bsl
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
  const [diabetesType, setDiabetesType] = useState<string>("1");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [initialMaxBsl, setInitialMaxBsl] = useState<number>(0);
  const [initialMinBsl, setInitialMinBsl] = useState<number>(0);
  const [initialDiabetesType, setInitialDiabetesType] = useState<string>("1");
  const [initialWeight, setInitialWeight] = useState<string>("");
  const [initialHeight, setInitialHeight] = useState<string>("");

  const {data, loading, error} = useQuery(GET_USER_HEALTH_DATA, 
    {
      variables: { userId: userId }
    }
  )
  const [updateUserHealthData] = useMutation(UPDATE_USER_HEALTH_DATA);

  useEffect(() => {
    if (data?.getUser) {
      setMaxBsl(data.getUser.maximum_bsl);
      setMinBsl(data.getUser.minimum_bsl);
      setWeight(String(data.getUser.weight));
      setHeight(String(data.getUser.height));
      setDiabetesType(String(data.getUser.diabates_type));

      setInitialMaxBsl(data.getUser.maximum_bsl);
      setInitialMinBsl(data.getUser.minimum_bsl);
      setInitialWeight(String(data.getUser.weight));
      setInitialHeight(String(data.getUser.height));
      setInitialDiabetesType(String(data.getUser.diabates_type));
    }
  }, [data])

  const handleDiabetesOption = (type: string) => {
    setDiabetesType(type);
  }

  const handleSliderChange = (values: number[]) => {
    const [newMinBsl, newMaxBsl] = values;
    setMinBsl(newMinBsl);
    setMaxBsl(newMaxBsl);
  };

  const handleSubmit = async () => {
    try {
      const intDiabetesType = parseInt(diabetesType);
      const floadHeight = Math.round(parseFloat(height) * 100) / 100;
      const floatWeight = Math.round(parseFloat(weight) * 100) / 100;

      const updatedData = await updateUserHealthData({
        variables: {
          userId: userId, 
          diabatesType: intDiabetesType, 
          maximumBsl: maxBsl, 
          minimumBsl: minBsl, 
          height: floadHeight, 
          weight: floatWeight
        }
      })
      console.log("Updated health data: ", updatedData);

      setInitialDiabetesType(diabetesType);
      setInitialMinBsl(minBsl);
      setInitialMaxBsl(maxBsl);
      setInitialHeight(height);
      setInitialWeight(weight);

    } catch (e) {
      console.error("Error updating health data:", e);
    }
  }

  const isChanged =
    diabetesType !== initialDiabetesType ||
    minBsl !== initialMinBsl ||
    maxBsl !== initialMaxBsl ||
    height !== initialHeight ||
    weight !== initialWeight

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Health Data"
          // rightIconOnPress={() => {}}
        />
        <ScrollView padding={20}>
          <Text fontSize={14} color="black" fontFamily="$bold" marginBottom={10}>Diabetes Type</Text>
          <View flexDirection="row" flexWrap="nowrap" gap={16}>
            <View flexBasis={40} flexGrow={1}>
              <PressableOption
                selectedOption={diabetesType}
                onSelect={handleDiabetesOption}
                value="2"
                label="Pre-diabetic"
              />
            </View>
            <View flexBasis={40} flexGrow={1}>
              <PressableOption
                selectedOption={diabetesType}
                onSelect={handleDiabetesOption}
                value="1"
                label="Type 2"
              />              
            </View>
          </View>
          <Text fontSize={14} color="black" fontFamily="$bold" marginTop={20}>Blood Glucose Goal</Text>
          <Text fontSize={12} marginBottom={10}>Set your taget blood glucose range in mmol/L</Text>
          <View mx="auto" p={20} mt={30}>
            <MultiSlider
              values={[minBsl, maxBsl]}
              sliderLength={Dimensions.get("window").width * 0.75}
              onValuesChange={handleSliderChange}
              selectedStyle={{ backgroundColor: "#4800FF", height: 6 }}
              trackStyle={{
                backgroundColor: "#CCB7FF",
                height: 6,
                borderRadius: 1000,
              }}
              min={1.1}
              max={33.3}
              step={0.1}
              allowOverlap={false}
              snapped
              isMarkersSeparated={true}
              markerStyle={{
                height: 30,
                width: 30,
                borderWidth: 7,
                borderRadius: 50,
                backgroundColor: "white",
                borderColor: "#4800FF",
              }}
              customMarkerLeft={(e) => {
                return <CustomMarker currentValue={e.currentValue} />;
              }}
              customMarkerRight={(e) => {
                return <CustomMarker currentValue={e.currentValue} />;
              }}
            />            
          </View>
          <View marginBottom={20}>
            <InputFieldGeneral
              label="Height"
              value={height}
              onChangeText={setHeight}
              isRequired={false}
              isDisabled={false}
              isInvalid={false}
              unit="cm"
            />
          </View>
          <View marginBottom={20}>
            <InputFieldGeneral
              label="Weight"
              value={weight}
              onChangeText={setWeight}
              isRequired={false}
              isDisabled={false}
              isInvalid={false}
              unit="kg"
            />            
          </View>
          <Button onPress={handleSubmit} isDisabled={!isChanged}>
            <ButtonText>
              Save
            </ButtonText>
          </Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const CustomMarker = ({ currentValue }: { currentValue: number }) => {
  return (
    <View
      alignItems="center"
      justifyContent="center"
      position="absolute"
      style={{
        alignItems: "center", // Ensure the marker is centered
        justifyContent: "center",
        position: "absolute",
        transform: [{ rotate: "90deg" }],
      }}
    >
      {/* Marker dot */}
      <View
        h={20}
        w={20}
        mb={-35.5}
        ml={5}
        borderRadius={15}
        bg="#4800FF"
        borderWidth={4}
        borderColor="white"
      ></View>
      {/* marker label */}
      <View
        w={50}
        h={50}
        bg="white"
        borderRadius={10}
        p={5}
        position="relative"
        mr={80}
        justifyContent="center"
        sx={{
          transform: [{ rotate: "180deg" }], // Custom style using sx prop
        }}
      >
        <Text
          w="100%"
          textAlign="center"
          color="#404040"
          sx={{
            transform: [{ rotate: "90deg" }], // Custom style using sx prop
          }}
        >
          {currentValue.toFixed(1)}
        </Text>

        {/* Arrow under the tooltip */}
        <View
          position="absolute"
          left={-10}
          top={25}
          w={0}
          h={0}
          bgColor="transparent"
          borderStyle="solid"
          borderTopWidth={10}
          borderRightWidth={10}
          borderRightColor="transparent"
          borderTopColor="white"
          sx={{
            transform: [{ rotate: "90deg" }], // Custom style using sx prop
          }}
        />
        <View
          position="absolute"
          left={-10}
          top={15}
          w={0}
          h={0}
          bgColor="transparent"
          borderStyle="solid"
          borderTopWidth={10}
          borderRightWidth={10}
          borderRightColor="transparent"
          borderTopColor="white"
          sx={{
            transform: [{ rotate: "180deg" }], // Custom style using sx prop
          }}
        />
      </View>
    </View>
  );
};

export default HealthDataScreen;