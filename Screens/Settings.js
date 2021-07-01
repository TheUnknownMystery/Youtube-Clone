import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../Styles/HomePageStyle';
import { CustomTextInput } from '../components/CustomTextInput';
import { StatusBar } from 'expo-status-bar';

import db from '../config'
import firebase from 'firebase';

export default class Settings extends React.Component {

  constructor() {
    super()

    this.state = {

      Current_Email: firebase.auth().currentUser.email,
      Email: '',
      Password: "",
      User_Name: ""

    }
  }

  getUserDetials = async () => {

    db.collection("Users").where("Email", '==', this.state.Current_Email).get()
      .then(snapshot => {

        snapshot.forEach(doc => {

          this.setState({

            Email: doc.data().Email,
            Password: doc.data().Password,
            User_Name: doc.data().user_name

          })
        })
      })
  }

  componentDidMount = () => {

    this.getUserDetials()

  }

  render() {
    var { Email, Password, User_Name } = this.state
    return (

      <View style={styles.container} >

        <View style={{ marginTop: 110 }}>

          <Text style={{ alignSelf: 'center', justifyContent: 'center', fontSize: 20, color: 'grey', letterSpacing: 2 }}>Update your Account</Text>

        </View>

        <View style={{ marginTop: 60 }}>

          <CustomTextInput

            placeholder="Email"
            val={Email}

          />


          <CustomTextInput

            placeholder="Password"
            val={Password}

          />


          <CustomTextInput

            placeholder="user-name"
            val={User_Name}

            onChangeText={(text) => {

             this.setState({User_Name: text})

            }}
          />

          <TouchableOpacity style={styles.GoBackButton} onPress={() => {

            this.props.navigation.navigate("Home")

          }}>

            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Go Back</Text>

          </TouchableOpacity>
          <StatusBar hidden />
        </View>
      </View >
    );
  }
}

