import React ,{Component} from 'react';
import {Text,View,Button,ScrollView,StyleSheet, ActivityIndicator} from 'react-native';
import Logo from './Logo';
import LoginPanel from './LoginPanel';
import {getOrientation,setOrientationListener,removeOrientationListener,getPlatform,getToken,setToken} from '../../Util/misc'
import {connect} from 'react-redux';
import {autoSignIn} from '../../Store/Actions/user_actions';
import {bindActionCreators} from 'redux';
 class AuthComponent extends Component {
  
  constructor(props){
    super(props)
    this.state={
      platform:getPlatform(),
      orientation:getOrientation(500),
      logoAnimation:false,
      loading:false
    }
  setOrientationListener(this.changeOrientation)
  }

  changeOrientation=()=>{
 this.setState({
  orientation:getOrientation(500)
 })
  }

  showLogin=()=>{
    this.setState({
      logoAnimation:true 
    })
  }

  goNext=()=>{
    this.props.navigation.navigate('App')
  }

  componentWillUnmount(){
removeOrientationListener()
  }

componentDidMount(){
getToken((value)=>{
  console.log(value)
if(value[0][1]==null)
this.setState({loading:false})
 
else{
  this.props.autoSignIn(value[1][1]).then(()=>{
    if(!this.props.User.userData.token)
    {
      this.setState({loading:false}) 
    }
    else{
      setToken(this.props.User.userData,()=>{
        this.goNext()
      })
    }
  })
}

})
}


  render(){
    if(this.state.loading){
      return(
        <View style={styles.loading}>
          <ActivityIndicator/>
          </View>
      )
    }
    else{
      return(
        <ScrollView style={{backgroundColor:"#fff",flex:1}}>
        <View style={styles.container}>
         <Logo
         showLogin={this.showLogin}
         orientation={this.state.orientation}
         />
        
         <LoginPanel
         platform={this.state.platform}
          orientation={this.state.orientation}
          show={this.state.logoAnimation}
          goNext={this.goNext}
          />
           
        </View>
        
        </ScrollView>
      );
    }
    
  }
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    height:800,
    alignItems:'center'
    
  },
  loading:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }


}) 

function mapStateToProps(state){
  return{
    User:state.User
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({autoSignIn},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthComponent)

