import { Text } from "react-native";

type TestProps = {
  type: string,
  name: string, 
  date: number,
}

const Test = (props: TestProps) => {
  const {type, name, date} = props

  return (
    <Text>This is test for {type} file done by {name} on Sept/{date}</Text>
  )
}

export default Test;