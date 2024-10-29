import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { View, Text, ScrollView } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const BslRangeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [multiSliderValue, setMultiSliderValue] = useState<number[]>([
    1.1, 33.3,
  ]);
  const nonCollidingMultiSliderValuesChange = (values: any) =>
    setMultiSliderValue(values);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <View>
      <OnbordingLayout
        comment="Let’s start with your personal details for smarter insights"
        supplimentalComment="Your personal information will help us tailor insights to better support your health journey."
        progressValue={75}
        onPress={() => navigation.navigate("ConnectIhelathScreen")}
      >
        <Text textAlign="center">Dual-slider will be here...hold on</Text>
        <View mx="auto" p={20} mt={30}>
          <MultiSlider
            values={[multiSliderValue[0], multiSliderValue[1]]}
            sliderLength={Dimensions.get("window").width * 0.75}
            onValuesChange={nonCollidingMultiSliderValuesChange}
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
          <View flexDirection="row" justifyContent="space-between">
            <Text>1.1</Text>
            <Text>33.3</Text>
          </View>
        </View>
      </OnbordingLayout>
    </View>
  );
};

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

export default BslRangeScreen;
