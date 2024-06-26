import { Text, View } from "react-native";
import "react-native-gesture-handler";
import Navigation from "./navigation";
import { store } from "./store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
