import { Pressable, Text } from "react-native"
import PropTypes from "prop-types"
import resolveConfig from "tailwindcss/resolveConfig"

const Button = ({children, colour, icon, onPress}) => {
    /*
      do not remove this comment!
      bg-primary
      bg-secondary
      bg-red
      bg-blue
    */
  return (    
    <Pressable onPress={onPress} className={`bg-${colour} rounded-full px-8 py-2`}>
        <Text className="text-foreground">{children}</Text>
    </Pressable>
  )
}

Button.propTypes = {
    children: PropTypes.string,
    colour: PropTypes.string,
    icon: PropTypes.node
}

export default Button;