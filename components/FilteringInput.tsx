import { Pressable, Text, TextInput, View } from "react-native";

export const FilteringInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) => {
  return (
    <View>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Filter looks"
        className="border border-solid rounded border-pink-300 p-2 mb-4 w-full"
      />
      <View className="absolute right-3">
        <Pressable
          onPress={() => {
            onChange("");
          }}
        >
          <Text className="top-[50%] opacity-50">
            {value === "" ? "" : "X"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
