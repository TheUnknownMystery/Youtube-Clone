import * as React from 'react'
import { TextInput, View, KeyboardAvoidingView } from 'react-native'
import { styles } from '../Styles/HomePageStyle'

export const CustomTextInput = (props) => {

 return (

  <View>

   <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>

    <TextInput style={styles.SettingsTextInput}

     placeholder={props.placeholder}
     value = {props.val}
     onChangeText={props.onChangeText}

    />

   </KeyboardAvoidingView>
  </View>

 )

}