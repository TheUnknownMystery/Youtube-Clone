import * as React from 'react'
import { View, Text, Image, TextInput, ToastAndroid, KeyboardAvoidingView } from 'react-native'
import { AuthStyles } from '../../Styles/AuthStyles'
import { styles } from '../../Styles/HomePageStyle'
import firebase from 'firebase'
import db from '../../config'
import { AuthPressable } from '../../components/AuthPressable'

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            Email: "",
            Password: "",
            UserName: ""

        }
    }


    SignUp = async(Email, Password, username) => {

        if (Email && Password && username) {

            firebase.auth().createUserWithEmailAndPassword(Email, Password)
                .then((response) => {

                    db.collection("Users").add({

                        "Email": Email,
                        "Password": Password,
                        "user_name": username

                    })
                })
        }
    }

    Login = async (Email, Password, username) => {

        if (Email && Password && username) {

            try {

                const Response = await firebase.auth().signInWithEmailAndPassword(Email, Password)

                if (Response) {

                    this.props.navigation.navigate("Home")
                    ToastAndroid.show("Logged in sucssfully", ToastAndroid.LONG)
                }
            }
            catch (error) {

                ToastAndroid.show(error.code, ToastAndroid.LONG)

            }
        }
        else {

            console.log("")

        }


    }

    render() {
        return (

            <View style={styles.container}>

                <Image

                    style={{ width: 200, height: 45, marginTop: "19%", alignSelf: 'center' }}
                    source={require("../../assets/logo.png")}

                />

                <Text style={{ letterSpacing: 3, color: 'white', fontSize: 18, alignSelf: 'center', marginTop: 10 }}>Login/SignUp to continue</Text>


                <TextInput

                    style={AuthStyles.TextInput}
                    placeholder="Email"

                    onChangeText={(text) => {

                        this.setState({ Email: text })

                    }}
                />

                <TextInput

                    style={AuthStyles.TextInput}
                    placeholder="password"

                    onChangeText={(text) => {

                        this.setState({ Password: text })

                    }}
                />

                <TextInput

                    style={AuthStyles.TextInput}
                    placeholder="cool-username"

                    onChangeText={(text) => {

                        this.setState({

                            UserName: text

                        })

                    }}
                />

                <AuthPressable

                    title="Login"

                    onPress={() => {

                        this.Login(this.state.Email, this.state.Password, this.state.UserName)

                    }}
                />

                <AuthPressable

                    title="Sign Up"

                    onPress={() => {

                        this.SignUp(this.state.Email, this.state.Password, this.state.UserName)

                    }}
                />
            </View>

        )
    }
}