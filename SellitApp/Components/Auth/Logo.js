import React ,{Component} from 'react';
import {Text,View,Button,ScrollView,StyleSheet,Animated,Easing} from 'react-native';

export default class Logo extends Component {

 state={
   sellAnime: new Animated.Value(0),
   itAnime: new Animated.Value(0)
 }

componentWillMount(){
  Animated.sequence([
    Animated.timing(this.state.sellAnime,{
      toValue:1,
      duration:1000,
      easing:Easing.easeOutCubic
    }),
    Animated.timing(this.state.itAnime,{
      toValue:1,
      duration:1000,
      easing:Easing.easeOutCubic
    }),
    
  ]).start(()=>{
    this.props.showLogin()
  })
}


  render(){
    
    return(
      
    
      <View >
       <View style={
         this.props.orientation==='potrait' ? styles.logoStylesPotrait : styles.logoStylesLandscape
       } >
       <Animated.View style={{
         opacity:this.state.sellAnime,
         top:this.state.sellAnime.interpolate({
           inputRange:[0,1],
           outputRange:[100,0]
           
         })
       }}>
       <Text style={styles.sell}>Sell</Text>
         </Animated.View>
         <Animated.View style={{
           opacity:this.state.itAnime
         }}>
           <Text style={styles.it}>It</Text>
           </Animated.View>

         </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({

  logoStylesPotrait:{
    flex:1,
    backgroundColor:'#fff',
    marginTop:50,
    flexDirection:'row',
    maxHeight:100
    
  },
   logoStylesLandscape:{
    flex:1,
    backgroundColor:'#fff',
    marginTop:20,
    flexDirection:'row',
    maxHeight:50
    
  },
  sell:{
  fontSize:40,
  color:"#555555",
  fontFamily:"Roboto"
  },
  it:{
    fontSize:40,
    color:"#00ADA9",
    fontFamily:"Roboto"
  }


})  