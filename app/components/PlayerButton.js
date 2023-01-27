import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";

const PlayerButton = (props) => {
  const { iconType, size = 40, iconColor = colors.primary, onPress } = props;
  const getIconName = (type) => {
    switch (type) {
      case "PLAY":
        return "pausecircleo";
      case "PAUSE":
        return "playcircleo";
      case "NEXT":
        return "forward";
      case "PREV":
        return "banckward";
    }
  };
  return (
    <AntDesign
      {...props}
      onPress={onPress}
      name={getIconName(iconType)}
      size={size}
      color={iconColor}
    />
  );
};

export default PlayerButton;
