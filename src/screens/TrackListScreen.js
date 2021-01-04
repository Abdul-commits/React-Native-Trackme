import React, { useEffect, useContext } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
 
import { ListItem } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
 
const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);
 
  useEffect(() => {
    navigation.setParams({
      callMe: dispatchFromButton
    });
  }, []);
 
  const dispatchFromButton = () => {
    fetchTracks();
  };
 
  return (
    <>
      <FlatList
        data={state}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { _id: item._id })
              }
            >
              <ListItem chevron title={item.name} />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};
 
TrackListScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Tracks",
    headerRight: (
      <TouchableOpacity
        style={styles.headerIcon}
        onPress={() => navigation.state.params.callMe()}
      >
        <FontAwesome name="refresh" size={20} />
      </TouchableOpacity>
    )
  };
};
 
const styles = StyleSheet.create({});
 
export default TrackListScreen;
