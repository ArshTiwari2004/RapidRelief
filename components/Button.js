import { Pressable, Text, View } from "react-native";
import PropTypes from "prop-types";
import resolveConfig from "tailwindcss/resolveConfig";

const Button = ({
  children,
  colour,
  icon,
  onPress,
  className,
  bold,
  squircle,
  small,
  disabled
}) => {
  /*
      do not remove this comment!
      bg-primary
      bg-secondary
      bg-red
      bg-blue
    */

  // TODO: add icon support
  return (
    <View className={`${squircle ? "rounded-xl" : "rounded-full"} overflow-hidden`}>
      <Pressable
        onPress={()=>{if(!disabled) onPress()}}
        android_ripple={{ color: "rgba(0,0,0,0.2)" }}
        className={`bg-${colour || "primary"} ${
          small ? "px-4 py-1" : "px-8 py-2"
        } ${className} self-auto items-center ${disabled ? "opacity-30": ""}`}>
        <Text
          className={`text-foreground ${small ? "text-base" : "text-lg"} ${
            bold ? "font-semibold" : ""
          }`}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

Button.propTypes = {
  children: PropTypes.string,
  colour: PropTypes.string,
  icon: PropTypes.node,
};

export default Button;
