import * as React from 'react'
import { Header } from 'react-native-elements'
import { View, Image, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AntDesign, EvilIcons, FontAwesome } from '@expo/vector-icons'

export const YoutubeHeader = (props) => {
 return (

 
   <View>

    <Header

     backgroundColor={"#212121"}

     leftComponent={

      <Image

       style={{ width: 120, height: 25, marginTop: 15 }}
       source={require("../assets/logo.png")}

      />

     }

     centerComponent={

      <EvilIcons

       name="user"
       size={35}
       color='white'

       style={{ marginLeft: 189, marginTop: 13 }}

       onPress={props.onAccountPress}
      />

     }

     rightComponent={

      <AntDesign

       name="search1"
       color={"#fff"}
       size={24}

       style={{ marginRight: 20, marginTop: 16 }}

       onPress={props.onSearchedPress}
      />

     }
    />

   </View>


 )
}