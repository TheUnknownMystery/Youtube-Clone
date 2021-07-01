import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { styles } from '../Styles/HomePageStyle'
import { Video } from 'expo-av'
import { AntDesign, Fontisto } from "@expo/vector-icons"

export default class WatchScreen extends React.Component {

 constructor(props) {
  super(props)

  this.state = {

   Item: this.props.navigation.getParam("Details"),
   LikeAnimationName: 'like2',
   UnlikeAnimation: 'dislike2'

  }
 }

 render() {

  const { Item } = this.state

  return (

   <View style={styles.container}>
    <Video

     source={{ uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }}
     style={{ width: "100%", aspectRatio: 16 / 9 }}

     posterSource={{

      uri: Item.thumbnails.high.url

     }}

     posterStyle={{

      resizeMode: "stretch",

     }}

     usePoster={true}
     resizeMode="contain"
     useNativeControls

    />

    <View style={{ marginTop: 7 }}>

     <Text style={{ flexWrap: 'wrap', flexDirection: "row", fontWeight: 'bold', fontSize: 17, marginLeft: 4, color: "white" }}>{this.state.Item.title}</Text>
     <Text style={{ flexWrap: 'wrap', flexDirection: "row", fontWeight: 'bold', fontSize: 13, marginLeft: 4, color: "grey", fontSize: 15, marginTop: 2 }}>{this.state.Item.channelTitle}</Text>

     <View>

     </View>

    </View>

    <View>

     <TouchableOpacity style={{ width: "9%", marginLeft: 10, marginTop: 13 }} onPress={() => {

      this.setState({ LikeAnimationName: 'like1' })

     }}>

      <AntDesign color='white' name={this.state.LikeAnimationName} size={30} />

     </TouchableOpacity >

     <TouchableOpacity style={{ width: "9%", marginLeft: 66, marginTop: -20 }} onPress={() => { this.setState({ UnlikeAnimation: 'dislike1' }) }}>

      <AntDesign color='white' name={this.state.UnlikeAnimation} size={30} />

     </TouchableOpacity>

     <TouchableOpacity style={{ width: "9%", marginLeft: 330, marginTop: -24 }} onPress={() => { this.setState({ UnlikeAnimation: 'dislike1' }) }}>

      <AntDesign color='white' name="menu-fold" size={25} />

     </TouchableOpacity>

     <TouchableOpacity style={{ width: "9%", marginLeft: 130, marginTop: -30 }} onPress={() => { this.setState({ UnlikeAnimation: 'dislike1' }) }}>

      <Fontisto color='white' name="share" size={25} />

     </TouchableOpacity>

    </View>

    <Text style={{ alignSelf: 'center', color: 'white' }}>________________________________________________________</Text>
    <Text style={{ marginLeft: 9, marginTop: 3, fontSize: 15, color: 'lightgrey', fontWeight: 'bold', flexDirection: "row" }}>{this.state.Item.description}</Text>
   </View>

  )
 }
}