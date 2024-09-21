import React from 'react';
import { Text } from "react-native";

type TestProps = {
  type: string,
  name: string, 
  date: number,
}

const Test: React.FC<TestProps> = ({type, name, date}) => {

  return (
    <Text>This is test for {type} file done by {name} on Sept/{date}</Text>
  )
}

export default Test;