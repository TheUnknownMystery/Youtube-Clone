import * as React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { CardStyles } from '../Styles/CardStyles';
import { styles } from '../Styles/HomePageStyle';
import { StatusBar } from 'expo-status-bar'
import { YoutubeHeader } from '../components/youtubeHomeHeader';


export default class Explore extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

      All_Videos: "",
      isLoaded: true

    }
  }

  getYoutubeData = async () => {

    const Api_url = await "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=song&safeSearch=none&type=video&videoType=episode&key=AIzaSyBOLZNRU19kD9XAk0Iqz9lQZhlS6GzUBwQ"

    fetch(Api_url)
      .then((response) => response.json())
      .then((response_json) => {

        this.setState({

          All_Videos: response_json.items,
          isLoaded: false

        })
      })
      .catch((e) => {

        alert(e)

      })
  }

  componentDidMount = () => {

    this.getYoutubeData()

  }

  render() {
    return (

      <View style={styles.container}>

        { /*youtube header component*/
     /*../components/yotubeHeader*/}

        <View>

          <YoutubeHeader

            onAccountPress={() => {

              this.props.navigation.navigate("Settings")

            }}

            onSearchedPress={() => {

              this.props.navigation.navigate("SearchScreen")

            }}

          />

          <View>

            <FlatList

              data={this.state.All_Videos}
              keyExtractor={(i, x) => x.toString()}
              renderItem={({ item }) => {

                const Item = item.snippet
                const Time = Item.publishTime[12] + Item.publishTime[13] + Item.publishTime[15] + Item.publishTime[16] + Item.publishTime[17]

                return (

                  <View>

                    <TouchableOpacity onPress={() => {

                      this.props.navigation.navigate("WatchScreen",{"Details": Item})

                    }}> 
                      <View>

                        <Image

                          style={CardStyles.Card}
                          source={{ uri: Item.thumbnails.medium.url }}

                        />

                        <Text style={CardStyles.BottomTitle}>{Item.title}</Text>
                        <Text style={CardStyles.ChannelName}>{Item.channelTitle}</Text>
                        <Text style={CardStyles.ChannelName, { marginLeft: 9, color: 'grey' }}>{Time}</Text>

                      </View>

                    </TouchableOpacity>


                  </View>
                )
              }}
            />

          </View>

          <StatusBar hidden />

        </View>

      </View >

    )
  }
}
