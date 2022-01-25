import React from "react";
import { Text, View } from "react-native";
import Swiper from "react-native-swiper";

function CourseSwiper({
  courseSlide,
  onIndexChange,
  tab,
  numberOfSlides,
  children,
}: React.PropsWithChildren<{
  courseSlide: number;
  tab: number;
  numberOfSlides: number;
  onIndexChange: (index: number) => void;
}>) {
  return (
    <Swiper
      showsButtons={true}
      showsPagination={false}
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
            fontFamily: "Roboto-Regular",
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
            fontFamily: "Roboto-Regular",
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
