import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from '../Styles/HomePageStyle';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';
import { CardStyles } from '../Styles/CardStyles';
import { TouchableOpacity, TextInput } from 'react-native';

export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {

      All_Videos: "",
      Request: "",

    }
  }

  getYoutubeData = async (REQ) => {

    const Api_url = await "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=" + REQ + "&safeSearch=none&type=video&videoType=episode&key=AIzaSyBOLZNRU19kD9XAk0Iqz9lQZhlS6GzUBwQ"

    fetch(Api_url)
      .then((response) => response.json())
      .then((response_json) => {

        this.setState({

          All_Videos: response_json.items,

        })

      })
      .catch((error) => {

        alert("ERR: " + error)

      })
  }

  componentDidMount() {

    this.getYoutubeData()

  }

  render() {
    return (

      <View style={styles.container} >

        <TextInput

          style={styles.SearchBar}
          placeholder="search here.."

          onChangeText={(text) => {

            this.setState({

              Request: text

            })

          }}
        />

        <TouchableOpacity style={{ alignSelf: 'center', marginTop: -30, marginLeft: 350 }} onPress={() => {

          this.getYoutubeData(this.state.Request)

        }}>

          <AntDesign color="white" name="search1" size={23} />

        </TouchableOpacity>

        <TouchableOpacity style={{ alignSelf: 'center', marginTop: -23, marginLeft: 250 }} onPress={() => {

          this.props.navigation.navigate("Home")

        }}>

          <AntDesign color="white" name="arrowleft" size={23} />

        </TouchableOpacity>

        <StatusBar hidden />

        <FlatList

          data={this.state.All_Videos}
          keyExtractor={(i, x) => x.toString()}
          renderItem={({ item }) => {

            const Item = item.snippet

            return (

              <TouchableOpacity onPress={() => {

                this.props.navigation.navigate("WatchScreen", { "Details": Item })

              }}>
                <View>

                  <Image

                    style={CardStyles.Card}
                    source={{ uri: Item.thumbnails.medium.url }}

                  />

                  <Text style={CardStyles.BottomTitle}>{Item.title}</Text>
                  <Text style={CardStyles.ChannelName}>{Item.channelTitle}</Text>
                  <Text style={CardStyles.ChannelName, { marginLeft: 9, color: 'grey' }}>{Item.publishedAt}</Text>

                </View>

              </TouchableOpacity>

            )

          }
          }

        />

      </View >

    );
  }
}

//{item.snippet.channelId}