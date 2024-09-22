import React from 'react';
import { Box, Button, ButtonText, Center, Text } from '@gluestack-ui/themed';


type RootStackParamList = {
  Another: undefined; // Define your other screen(s) here
};

type TestProps = {
  type: string,
  name: string, 
  date: number,
  navigation: undefined,
}

const Test: React.FC<TestProps> = ({navigation, type, name, date}) => {

  return (
    <Box>
      <Center>
        <Text my={10}>This is test for {type} file done by {name} on Sept/{date}</Text>
        <Button>
          <ButtonText
            // onPress={() => {
            //   navigation.navigate('Another')
            // }}
            // variant='link'
          >
            To another test page
          </ButtonText>
        </Button>
      </Center>
    </Box>
  )
}

export default Test;