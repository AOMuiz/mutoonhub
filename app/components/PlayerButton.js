import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";

const PlayerButton = (props) => {
  const { iconType, iconSize = 29, iconColor = colors.P50, onPress } = props;
  const getIconName = (type) => {
    switch (type) {
      case "PLAY":
        return "pausecircle";
      case "PAUSE":
        return "play";
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
      size={iconSize}
      color={iconColor}
    />
  );
};

export default PlayerButton;
