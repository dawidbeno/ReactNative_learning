import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";

import Card from "./components/Card";
import Post from "./components/Post";
import data from "./data/data";
import type { User, Post as PostType, Featured } from "./data/data";


const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    margin: 8,
    fontWeight: 'bold',
  }
});

const HomeScreen = () => (
  <ScrollView>
    <Text style={styles.heading}>Stories</Text>
    <ScrollView horizontal>
      {(data.users as User[]).map((user) => (
        <Card key={user.id} avatar={user.avatar} name={user.name} />
      ))}
    </ScrollView>
    <Text style={[styles.heading, {color: 'blue'}]}>Featured</Text>
    {(data.featured as Featured[]).map((post) => (
      <Post
        key={post.id}
        image={post.image}
        title={post.title}
        description={post.description}
        friend={post.friend}
      />
    ))}

    <Text style={styles.heading}>My Feed</Text>
    {(data.posts as PostType[]).map((post) => (
      <Post
        key={post.id}
        image={post.image}
        title={post.title}
        description={post.description}
        friend={post.friend}
      />
    ))}
  </ScrollView>
);

const App = () => (
  <View style={{ flex: 1, paddingTop: 50, backgroundColor: '#FAFAFA' }}>
    <HomeScreen />
  </View>
);


export default App;