import {
  Button,
  ButtonText,
  ScrollView,
  Textarea,
  TextareaInput,
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

interface SheetProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string>>;
  sheetContentType: string;
  title: string;
  optionsArray?: string[];
  value?: string;
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
    <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent zIndex={999}>
        {/* <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper> */}
        <ActionsheetItem>
          <ActionsheetItemText>here</ActionsheetItemText>
        </ActionsheetItem>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          style={styles.modalHeader}
        >
          <Pressable onPress={onClose}>
            <Icon as={ArrowLeftIcon} size="sm" />
          </Pressable>
          <Text style={styles.modalTitle}>{title}</Text>
          <Box width={24} />
        </HStack>

        {sheetContentType === "picker" && (
          <ScrollView style={styles.scrollView}>
            {optionsArray.map((period) => (
              <Pressable
                key={period}
                onPress={() => {
                  setValue(period);
                  onClose();
                }}
                style={styles.optionContainer}
              >
                <HStack alignItems="center">
                  <Box style={styles.circle} />
                  <Text>{period}</Text>
                </HStack>
              </Pressable>
            ))}
          </ScrollView>
        )}

        {sheetContentType === "note" && (
          <>
            <Textarea h={200} mb="$4">
              <TextareaInput
                placeholder="Write your note"
                value={note}
                onChangeText={setNote}
              />
            </Textarea>
            <Button
              isDisabled={!note}
              onPress={() => {
                setValue(note as string);
                onClose();
              }}
            >
              <ButtonText>Add</ButtonText>
            </Button>
          </>
        )}
      </ActionsheetContent>
    </Actionsheet>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    marginBottom: 20,
  },
  optionContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    marginRight: 15,
  },
});

export default Sheet;
