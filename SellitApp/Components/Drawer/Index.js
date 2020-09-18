import React ,{Component} from 'react';
import {Text,View,StyleSheet, Image, Button,AsyncStorage,Alert} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
 class sideDrawer extends Component {

navigationToScreen=(route)=>()=>{
  // alert("got it")
  // console.warn(route)
 // this.props.navigation.navigate('FindIt')
const navigateAction = NavigationActions.navigate({
  routeName:route
});
this.props.navigation.dispatch(navigateAction);
}


state={
  buttons:[
    {
      value:'Home',
      icon:'home',
      shouldGoto:'FindIt',
      typeLink:'tab',
      index:0,
      privacy:false
    },
    {
      value:'Sell',
      icon:'dollar',
      shouldGoto:'SellIt',
      typeLink:'tab',
      index:1,
      privacy:false
    },
    {
      value:'My Posts',
      icon:'th-list',
      shouldGoto:'PostIt',
      typeLink:'view',
      index:null,
      privacy:true
    },
    {
      value:'Logout',
      icon:'sign-out',
      privacy:true
    }

  ]
}
showButton =(buttons)=>(

  buttons.map((button)=>{
    if(!button.privacy){
      return this.makeButton(button)
    }
   else{
     if(this.props.User.userData)
     {
       if(button.value=='Logout'){
         return this.makeButton2(button)
       }
       else
         return this.makeButton(button)
     }
   }
    })
)

makeButton2=(button)=>{
  return(
  <Icon.Button  name={button.icon} size={18} color="#ffff" onPress={()=>{this.logout()}}
    backgroundColor='#474143' >
        <Text style={styles.buttonText}>{button.value}</Text>
      </Icon.Button>
  )
}

makeButton=(button)=>{
  return(
    <Icon.Button  name={button.icon} size={18} color="#ffff" onPress={this.navigationToScreen(button.shouldGoto)}
    backgroundColor='#474143' >
        <Text style={styles.buttonText}>{button.value}</Text>
      </Icon.Button>
    
    )  }

    logout=()=>{
      Alert.alert(
          'Logout?',
          'Sure you want to logout?',
          [
              {
                  text: 'cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
              },
              {
                  text: 'OK',
                  onPress: () => {
                      // Redux function clear all
                      AsyncStorage.clear().then(this.props.navigation.navigate('Auth'))
                  },
              },
          ],
          { cancelable: false }
      );
   }

    // 
  render(){
    return(  
      
      <View style={styles.Container}>
        <View style={styles.buttonContainer}> 
        <View style={{alignItems:'flex-end',marginBottom:5}}>
          <Icon.Button name="arrow-left"size={18}  onPress={()=>{this.props.navigation.closeDrawer()}} backgroundColor='#474143' iconStyle={{width:15}}/>
          </View>
         
         {this.showButton(this.state.buttons)}
       
         
          </View>
        </View>
    );
  }
}


const styles= StyleSheet.create({
Container:{
  backgroundColor:'#474143',
  flex:1
},
buttonContainer:{
padding :10,
marginTop:20
},
buttonText:{
  fontSize:13,
  fontFamily:'Roboto',
  fontWeight:'bold',
  color:'#ffff',
  marginLeft:5,
  paddingLeft:10
},

})

function mapStateToProps(state){
  
  return{
    User:state.User
}

}
export default connect (mapStateToProps,null)(sideDrawer)