import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createSwitchNavigator} from 'react-navigation';
import {View,Text,StyleSheet,Image,Button} from 'react-native';


import AuthComponent from './Components/Auth/Index';
import Find1 from './Components/Find/Index';;
import Sell1 from './Components/Sell/Index';
import Post from './Components/Posts/Index'
import sideDrawer from './Components/Drawer/Index'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Menu from './Assets/Images/ham.webp';
import Article from './Components/Find/article'



const headConfig={
    headerLayoutPreset:'center',

defaultNavigationOptions:({navigation})=>({
    headerStyle:{
        backgroundColor:"#00ADA9",
        
    },
    headerTitleStyle:{
        fontSize:20,
        fontFamily:'Roboto',
        fontWeight:'bold'
    },
    headerTintColor:'white',
    headerLeft: () => (
  <TouchableOpacity  onPress={()=>{navigation.openDrawer()}} style={styles.Button}> 
       <Image style={styles.menu} source={Menu}/>
      </TouchableOpacity>


        // <Button
        // onPress={()=>{navigation.openDrawer()}}
        //   title="Info"
        //   color="#fff"
        // />
      ), 
})

}

const postStack =  createStackNavigator({
Post:Post,
},headConfig)

const findStack= createStackNavigator({

Find:Find1,
Article:Article
},headConfig)



const sellStack=createStackNavigator({
Sell:Sell1,
},headConfig)




const appStack=createBottomTabNavigator({
    Find: findStack,
    Sell: sellStack
},{
defaultNavigationOptions:({navigation})=>({
    tabBarIcon:({focused,horizontal,tintColor})=>{
    const {routeName} = navigation.state;
    
    let iconName;
    if(routeName==='Sell'){
    iconName=require('./Assets/Images/Dollar.jpeg');
    }
    if(routeName==='Find'){
    
    iconName=require('./Assets/Images/Search.png');
    }
      return(<Image source={iconName} style={{height:20,width:20}}/>)
    },
    tabBarOptions: {
        activeTintColor: '#FFC636',
        
        labelStyle: {
            
        fontFamily:'Roboto',
        fontWeight:'bold'
          },

    }
})
})



const authStack= createStackNavigator({
AuthComponent:AuthComponent},{
    headerMode:'none'
}
)


const RealDrawer = createDrawerNavigator({
        
        Home:appStack,
        FindIt:findStack,
        SellIt:sellStack,
        PostIt:postStack
    },
    {
     
    contentComponent:sideDrawer
        
    }
    
    )

const switchStack = createSwitchNavigator({
    Auth:authStack,
    App:RealDrawer
})


export const RootNavigator=()=>{
return(createAppContainer(switchStack))

}

       

const styles = StyleSheet.create({
    menu:{
        height:20,
        width:20,
        padding:10
    },
    Button:{
        marginLeft:10
    }
})

