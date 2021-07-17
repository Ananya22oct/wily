import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput,Image, TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase'

export default class LogInScreen extends React.Component{
    constructor(){
        super();

        this.state={
            emailId:'',
            password:'',
        }
    }

     login=async(emailId,password)=>{
        if(emailId && password){
            try{
                const response=await firebase.auth().signInWithEmailAndPassword(emailId,password)
                if(response){
                    this.props.navigation.navigate('Transaction');
                }

            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found':
                        alert("user does not exist")
                        break;
                    case 'auth/invalid-email':
                        alert("incorrect email or password")    
                }
            }
          
        }
        else{
            alert("enter emailId or password")
        }
     }
    render(){
        return(
            <KeyboardAvoidingView style={styles.container}>

             <View>
              <Image
                source={require("../assets/booklogo.jpg")}
                style={{width:200, height: 200}}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>Wily</Text>
            </View>

          <View style={styles.container}>
              <TextInput style={styles.loginbox}
                         placeholder="abc@example.com"
                         keyboardType="email-address"
                         onChangeText={(text)=>{
                             this.setState({
                                 emailId:text
                             })
                         }}>
             </TextInput>

              <TextInput style={styles.loginbox}
                         placeholder="password"
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({
                                password:text
                            })
                        }}>

              </TextInput>

              <TouchableOpacity style={styles.button}
                                onPress={()=>{
                                    this.login(this.state.emailId,this.state.password)
                                }}>

            <Text style={{textAlign:'center'}}>Log In</Text>                    
              
              </TouchableOpacity>
          </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    button:{
        height:30,
        width:90,
        borderWidth:1,
        marginTop:20,
        paddingTop:5,
        borderRadius:1,
    },
    loginbox:{
      width:300,
      height:40,
      borderWidth:1.5,
      fontSize:20,
      margin:10,
      paddingLeft:10,
    },
})