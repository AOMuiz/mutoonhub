import { StyleSheet, Dimensions, View } from "react-native";
// import Pdf from "react-native-pdf";

const ReadBook = ({ route }) => {
  const bookUri = route.params;
  const source = {
    uri: bookUri,
    cache: true,
  };
  return (
    <View style={styles.container}>
      {/* <Pdf
        source={source}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      /> */}
    </View>
  );
};

export default ReadBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
