import React from "react";
import { Box, Button, ButtonText, Center, Text } from "@gluestack-ui/themed";

type TestProps = {
  navigation: any,
  type: string,
  name: string,
  date: number,
}

const Test: React.FC<TestProps> = ({ navigation, type, name, date }) => {
  return (
    <Box>
      <Center>
        <Text my={10}>
          This is test for {type} file done by {name} on Sept/{date}
        </Text>
        <Button>
          <ButtonText
            onPress={() => {
              navigation.navigate("Another");
            }}
          >
            To another test page
          </ButtonText>
        </Button>
      </Center>
    </Box>
  );
};

export default Test;
