import * as React from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../Styles/HomePageStyle';
import { YoutubeHeader } from '../components/youtubeHomeHeader';
import { StatusBar } from 'expo-status-bar';
import { CardStyles } from '../Styles/CardStyles';

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

      isLoaded: false,
      All_Videos: "",
      PageInfo: ""

    }
  }

  getYoutubeData = async () => {

    const Api_url = await "https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=rating&q=songs&safeSearch=moderate&type=video&videoDefinition=standard&videoEmbeddable=videoEmbeddableUnspecified&key=AIzaSyBOLZNRU19kD9XAk0Iqz9lQZhlS6GzUBwQ"

    fetch(Api_url)
      .then((response) => response.json())
      .then((response_json) => {

        this.setState({

          isLoaded: true,
          All_Videos: response_json.items,
          PageInfo: response_json.pageInfo

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

      <View style={styles.container} >

        <StatusBar hidden />

        {/*youtube header component*/}
        {/*../components/yotubeHeader*/}

        <YoutubeHeader

          onAccountPress={() => {

            this.props.navigation.navigate("Settings")

          }}

          onSearchedPress={() => {

            this.props.navigation.navigate("SearchScreen")

          }}

        />

        <Text style = {{fontWeight: 'bold',color: 'lightgrey',fontSize: 14,marginTop: 12}}>{"Total Results: " + this.state.PageInfo.totalResults}</Text>
        {/*rendering the list of items using */}

        <FlatList

          data={this.state.All_Videos}
          keyExtractor={(i, x) => i.toString() + x.toString()}
          renderItem={({ item }) => {

            const Item = item.snippet
            const Time = Item.publishTime[12] + Item.publishTime[13] + Item.publishTime[15]

            return (

              <View style={{ marginTop: 10 }}>

                <TouchableOpacity onPress={() => {

                  this.props.navigation.navigate("WatchScreen", { "Details": Item })

                }}>

                  <View>

                    <Image

                      style={{ width: "100%", aspectRatio: 16 / 9 }}
                      source={{ uri: Item.thumbnails.medium.url }}

                    />

                  </View>


                  <View>

                    <Text style={CardStyles.BottomTitle}>{Item.title}</Text>
                    <Text style={CardStyles.ChannelName}>{Item.channelTitle + " • " + Time}</Text>

                  </View>

                </TouchableOpacity>


              </View>


            )

          }}
        />

      </View>
    )
  }
}