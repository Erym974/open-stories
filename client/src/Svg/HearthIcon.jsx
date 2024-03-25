import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Animated } from "react-native"

const HearthIcon = ({ isLiked = false }) => {
  const fillAnimation = React.useRef(new Animated.Value(0)).current;
  const strokeAnimation = React.useRef(new Animated.Value(0)).current;

//   React.useEffect(() => {
//     Animated.timing(fillAnimation, {
//       toValue: isLiked ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//     Animated.timing(strokeAnimation, {
//       toValue: isLiked ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   }, [isLiked, fillAnimation]);

//   const fillColor = fillAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["rgb(0,0,0)", "rgb(0,0,0)"],
//   });

//   const stokeColor = strokeAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["rgb(0,0,0)", "rgb(0,0,0)"],
//   });

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      data-name="Layer 2"
      viewBox="0 0 48 48"
    >
      <Path
        d="M15.63 7.15a10.12 10.12 0 0 0-7.86 16.51h0L24 42.71l16.07-18.86.08-.09.08-.1h0A10.13 10.13 0 1 0 24 11.58a10.1 10.1 0 0 0-8.36-4.43Z"
        fill={isLiked ? "red" : "transparent"}
        stroke={isLiked ? "red" : "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HearthIcon;