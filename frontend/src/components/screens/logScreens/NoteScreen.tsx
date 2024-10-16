import {
  Box,
  Button,
  ButtonText,
  Input,
  InputField,
  ScrollView,
  Textarea,
  TextareaInput,
  View,
  VStack,
} from "@gluestack-ui/themed";
import React, { FC, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppStackParamList } from "../../../types/navigation";
import ButtonFixedBottom from "../../molcules/ButtonFixedBottom";

type NoteScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "Note"
>;

type NoteScreenRouteProps = {
  initialNote: { title: string; content: string };
  onSave: (note: { title: string; content: string }) => void;
};

const NoteScreen: FC = () => {
  const navigation = useNavigation<NoteScreenNavigationProps>();
  const route = useRoute();
  const { initialNote, onSave } = route.params as NoteScreenRouteProps;

  const [title, setTitle] = useState(initialNote.title);
  const [content, setContent] = useState(initialNote.content);

  const handleSave = () => {
    onSave({ title, content });
    navigation.goBack();
  };

  return (
    <View h="$full">
      <ScrollView h="$full">
        <VStack h="$full" style={{ height: 600 }}>
          <Input size="md" w="$full" borderWidth={0}>
            <InputField
              placeholder="Title"
              fontSize="$lg"
              fontWeight="$bold"
              value={title}
              onChangeText={setTitle}
            />
          </Input>

          <Textarea flex={1} mb="$4" borderWidth={0}>
            <TextareaInput
              placeholder="Write your note"
              value={content}
              onChangeText={setContent}
            />
          </Textarea>
        </VStack>
        <View h={120} />
      </ScrollView>

      <ButtonFixedBottom
        onPress={handleSave}
        isDisabled={!(title && content)}
        text="Save"
      />
    </View>
  );
};

export default NoteScreen;
