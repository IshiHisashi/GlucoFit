import {
  Button,
  ButtonText,
  CalendarDaysIcon,
  ScrollView,
  Textarea,
  TextareaInput,
  VStack,
} from "@gluestack-ui/themed";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  HStack,
  Box,
  Icon,
  Pressable,
  Text,
  ArrowLeftIcon,
} from "@gluestack-ui/themed";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { StyleSheet } from "react-native";

import PickerOptionCard from "../molcules/PickerOptionCard";
import DurationPicker from "../atoms/DurationPicker";
import { TimesCustom } from "../svgs/svgs";

interface SheetProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<
    SetStateAction<string | { hours: number; minutes: number }>
  >;
  sheetContentType: string;
  title: string;
  optionsArray?: string[];
  value?: string | { hours: number; minutes: number };
}

const Sheet: FC<SheetProps> = (props) => {
  const {
    isOpen,
    onClose,
    setValue,
    sheetContentType,
    title,
    optionsArray,
    value,
  } = props;

  const [note, setNote] = useState(value);

  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={onClose}
      zIndex={999}
      borderRadius={0}
    >
      <ActionsheetBackdrop />
      <ActionsheetContent zIndex={999} p="$4" pb="$8" borderRadius={0}>
        {/* <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper> */}

        <HStack
          justifyContent="space-between"
          alignItems="center"
          width="$full"
          mb="$8"
        >
          <Pressable onPress={() => onClose(false)}>
            <TimesCustom color="#4800FF" size={32} />
          </Pressable>
          <Text fontFamily="$bold" fontSize={20}>
            {title}
          </Text>
          <Box width={32} />
        </HStack>

        {sheetContentType === "picker" && (
          <ScrollView width="$full">
            <VStack space="sm">
              {optionsArray.map((el, index) => (
                <PickerOptionCard
                  key={index}
                  onPress={() => {
                    setValue(el);
                    onClose(false);
                  }}
                  text={el}
                  isSelected={value === el}
                />
              ))}
            </VStack>
          </ScrollView>
        )}

        {sheetContentType === "note" && (
          <>
            <Textarea h={200} mb="$4">
              <TextareaInput
                placeholder="Write your note"
                value={note as string}
                onChangeText={setNote}
              />
            </Textarea>
            <Button
              isDisabled={!note}
              onPress={() => {
                setValue(note as string);
                onClose(false);
              }}
            >
              <ButtonText>Add</ButtonText>
            </Button>
          </>
        )}

        {sheetContentType === "duration" && (
          <DurationPicker value={value} setValue={setValue} onClose={onClose} />
        )}
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default Sheet;
