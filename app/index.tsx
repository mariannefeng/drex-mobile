import { useEffect, useState } from "react";
import { ImageBackground, ScrollView } from "react-native";
import "../global.css";

import { router } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { QueenSummary, useGetQueens } from "../api";
import { FilteringInput } from "../components/FilteringInput";

export default function HomeScreen() {
  const [filter, setFilter] = useState("");
  const [visibleQueens, setVisibleQueens] = useState<QueenSummary[]>([]);
  const { data: queens } = useGetQueens();

  useEffect(() => {
    if (queens) {
      if (filter) {
        const filtered = queens.filter((queen) =>
          queen.name.toLowerCase().includes(filter.toLowerCase())
        );
        setVisibleQueens(filtered);
      } else {
        setVisibleQueens(queens);
      }
    }
  }, [filter, queens]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="mt-5"
        style={{
          paddingHorizontal: 20,
          width: "100%",
        }}
      >
        <FilteringInput value={filter} onChange={setFilter} />
        {visibleQueens.length === 0 && (
          <Text className="text-center">No Queen Found</Text>
        )}
        {visibleQueens.map((queen: QueenSummary) => (
          <TouchableOpacity
            key={queen.id}
            onPress={() => {
              router.push(`/${queen.id}`);
            }}
          >
            <View className="mb-3">
              <View className="rounded-lg overflow-hidden relative h-24">
                <ImageBackground
                  source={{ uri: queen.profileImageUrl }}
                  className="absolute opacity-20 inset-0"
                />
                <View className="flex-1 pl-3 pb-2 justify-end">
                  <Text className="text-2xl text-black font-bold">
                    {queen.name}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
