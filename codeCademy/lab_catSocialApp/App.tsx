import React from "react";
import { ScrollView, Text, View } from "react-native";

import Card from "./components/Card";
import Post from "./components/Post";
import data from "./data/data";
import type { User, Post as PostType, Featured } from "./data/data";

const HomeScreen = () => (
  <ScrollView>
    <Text>Stories</Text>
    <ScrollView horizontal>
      {(data.users as User[]).map((user) => (
        <Card key={user.id} avatar={user.avatar} name={user.name} />
      ))}
    </ScrollView>
    <Text>Featured</Text>
    {(data.featured as Featured[]).map((post) => (
      <Post
        key={post.id}
        image={post.image}
        title={post.title}
        description={post.description}
        friend={post.friend}
      />
    ))}

    <Text>My Feed</Text>
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
  <View style={{ flex: 1 }}>
    <HomeScreen />
  </View>
);

export default App;
