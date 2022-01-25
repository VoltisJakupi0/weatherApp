import React from "react";
import { Text, View } from "react-native";
import Swiper from "react-native-swiper";

function CourseSwiper({
  onIndexChange,
  tab,
  numberOfSlides,
  children,
}: React.PropsWithChildren<{
  tab: number;
  numberOfSlides: number;
  onIndexChange: (index: number) => void;
}>) {
  return (
    <Swiper
      showsButtons={false}
      showsPagination={true}
      loadMinimal
      loadMinimalSize={numberOfSlides}
      buttonWrapperStyle={[
        {
          backgroundColor: "#E4E7E9",
          paddingBottom: 10,
          height: 47,
          zIndex: 1000,
          bottom: 0,
          top: undefined,
        },
      ]}
      onIndexChanged={onIndexChange}
      loop={false}
      index={tab}
      nextButton={
        <Text
          style={{
            paddingLeft: 45,
            paddingBottom: 10,
            paddingRight: 23,
            color: "#0000008A",
            fontSize: 16,
          }}
        >
          {"Next"}
        </Text>
      }
      prevButton={
        <Text
          style={{
            paddingLeft: 23,
            paddingBottom: 10,
            paddingRight: 45,
            color: "#0000008A",
            fontSize: 16,
          }}
        >
          {"Previous"}
        </Text>
      }
    >
      {children}
    </Swiper>
  );
}

export default CourseSwiper;
