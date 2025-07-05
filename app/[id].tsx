import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ImageLoadEventData,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Look, useGetQueen } from "../api";
import { FilteringInput } from "../components/FilteringInput";

export default function QueenScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [lookFilter, setLookFilter] = useState("");
  const { data: queen } = useGetQueen();
  const [aspectRatios, setAspectRatios] = useState<{ [key: string]: number }>(
    {}
  );
  const [visibleLooks, setVisibleLooks] = useState<Look[]>([]);

  useEffect(() => {
    if (!queen || !queen.looks) {
      return;
    }

    if (lookFilter) {
      const filtered = queen.looks.filter((look) =>
        look.name.toLowerCase().includes(lookFilter.toLowerCase())
      );
      setVisibleLooks(filtered);
    } else {
      setVisibleLooks(queen.looks);
    }
  }, [lookFilter, queen]);

  const handleImageLoad = (
    imageURL: string,
    event: NativeSyntheticEvent<ImageLoadEventData>
  ) => {
    const { source } = event.nativeEvent;
    const aspectRatio = source.width / source.height;

    setAspectRatios((prev) => ({
      ...prev,
      [imageURL]: aspectRatio,
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {queen && (
        <ScrollView
          className="w-full"
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text className="font-bold text-2xl text-center pt-1 pb-3">
            {queen.name}
          </Text>
          <FilteringInput value={lookFilter} onChange={setLookFilter} />
          {visibleLooks.length === 0 && (
            <Text className="text-center">No Look Found</Text>
          )}
          {visibleLooks.map((look, idx) => {
            return (
              <View
                key={idx}
                className="w-full"
                style={{
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    marginBottom: 5,
                  }}
                >
                  {look.name}
                </Text>
                <Image
                  source={{ uri: look.imageURL }}
                  className="w-full"
                  style={{ aspectRatio: aspectRatios[look.imageURL] ?? 1 }}
                  resizeMode="cover"
                  onLoad={(event: NativeSyntheticEvent<ImageLoadEventData>) =>
                    handleImageLoad(look.imageURL, event)
                  }
                />
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
