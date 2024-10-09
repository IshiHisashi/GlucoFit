import React, { Dispatch, FC, SetStateAction, useState } from "react";
import {
  HStack,
  Icon,
  Pressable,
  Text,
  Box,
  ScrollView,
  ArrowLeftIcon,
  Textarea,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { Animated, Modal, Platform, StyleSheet, View } from "react-native";
import { TextareaInput } from "@gluestack-ui/themed";

interface SheetProps {
  isSheetOpen: boolean;
  closeSheet(): void;
  setValue: Dispatch<SetStateAction<string>>;
  translateY: Animated.Value;
  sheetContentType: string;
  optionsArray?: string[];
  value?: string;
}

const Sheet: FC<SheetProps> = (props) => {
  const {
    optionsArray,
    isSheetOpen,
    closeSheet,
    setValue,
    translateY,
    sheetContentType,
    value,
  } = props;
  const [note, setNote] = useState(value);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isSheetOpen}
      onRequestClose={closeSheet}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[styles.modalContent, { transform: [{ translateY }] }]}
        >
          <HStack
            justifyContent="space-between"
            alignItems="center"
            style={styles.modalHeader}
          >
            <Pressable onPress={closeSheet}>
              <Icon as={ArrowLeftIcon} size="sm" />
            </Pressable>
            <Text style={styles.modalTitle}>
              {sheetContentType === "note" ? "Add Notes" : "Time period"}
            </Text>
            <Box width={24} />
          </HStack>

          {sheetContentType === "picker" && (
            <ScrollView style={styles.scrollView}>
              {optionsArray.map((period) => (
                <Pressable
                  key={period}
                  onPress={() => {
                    setValue(period);
                    closeSheet();
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
                  closeSheet();
                }}
              >
                <ButtonText>Add</ButtonText>
              </Button>
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: "80%",
  },
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
