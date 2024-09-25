import React from 'react';
import { Box, Center, Text, ExternalLinkIcon, Icon } from '@gluestack-ui/themed';
import { useLayoutEffect } from 'react'

type TestProps = {
  navigation: undefined,
}

const AnotherTest: React.FC<TestProps> = ({navigation}) => {

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => <Icon as={ExternalLinkIcon} />
  //   })
  //   return () => {}
  // }, [navigation])

  return (
    <Box>
      <Center>
        <Text >Just another test page. Nothing to do here.</Text>
      </Center>
    </Box>
  )
}

export default AnotherTest;