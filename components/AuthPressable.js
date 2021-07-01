import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AuthStyles } from '../Styles/AuthStyles'

export const AuthPressable = (props) => {
 return (

  <TouchableOpacity style={AuthStyles.Login} onPress={props.onPress}>

   <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{props.title}</Text>

  </TouchableOpacity>

 )
}