import { Text, Pressable, Box, HStack, VStack } from "@gluestack-ui/themed";
import React, { FC } from "react";

import { CheckCustom } from "../svgs/svgs";
import Tab from "../atoms/Tab";

interface MmedicineData {
  id: string;
  medicine_name: string;
  dosage: string;
  unit: string;
  isSelected: boolean;
  onPressMedicine: () => void;
}

interface MedicineListCardProps {
  obj: MmedicineData;
}

const MedicineListCard: FC<MedicineListCardProps> = (props) => {
  const { obj } = props;

  return (
    <Pressable
      onPress={obj.onPressMedicine}
      key={obj.id}
      py="$3"
      borderBottomWidth={1}
      borderBottomColor="#EEEEEE"
    >
      <HStack alignItems="center" justifyContent="space-between">
        <HStack space="sm" alignItems="center">
          <VStack space="sm" alignItems="flex-start">
            <Text
              fontFamily="$bold"
              fontSize={17}
              color={obj.isSelected ? "$neutralDark90" : "$neutralDark10"}
            >
              {obj.medicine_name}
            </Text>

            <Tab
              text={`${obj.dosage}${obj.unit}`}
              isFocused={false}
              isDisabled={!obj.isSelected}
              onPress={() => {}}
              style={{
                height: 24,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 12,
                paddingRight: 12,
              }}
            />
          </VStack>
        </HStack>

        {obj.isSelected && (
          <Box
            width={30}
            height={30}
            borderRadius="$full"
            bg="$primaryIndigo10"
            justifyContent="center"
            alignItems="center"
          >
            <CheckCustom color="#4800FF" size={20} />
          </Box>
        )}
      </HStack>
    </Pressable>
  );
};

export default MedicineListCard;
