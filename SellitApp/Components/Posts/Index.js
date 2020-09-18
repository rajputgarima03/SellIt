import React ,{Component} from 'react';
import {Text,View, StyleSheet,Image,Alert,RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserPost,deleteUserPost} from '../../Store/Actions/user_actions';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
 class PostComponent extends Component {

  state={
    posts:[],
    id:'',
    refreshing:false
  }
  deletePost=(id)=>{
this.props.deleteUserPost(id,this.props.User.userData).then(()=>{
  console.log("after everything")
  const uid= this.props.User.userData.uid
  this.props.getUserPost(uid)

})

  }

  delete=(id)=>{
    Alert.alert(
        'Delete?',
        'Sure you want to Delete?',
        [
            {
                text: 'cancel',
                onPress: () => {
                  this.setState({id:''})
                },
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                  this.setState({
                    id
                  })
                 this.deletePost(id)

                },
            },
        ],
        { cancelable: false }
    );
 }






   itemImage=(item)=>(
    <View style={{flex:1}}>
        <Image resizeMode="cover"  source={{uri:`${item.image}`}}  style={styles.itemImage}/>
        <Text style={styles.delete} onPress={()=>{this.delete(item.id)}}>Delete</Text>
        
    </View>
)

itemText=(item)=>(
  <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>
              {item.title}
          </Text>
          <Text style={styles.itemPrice}>
          $ {item.price}
          </Text>
   </View>  
)



  showPost=(post)=>(
  post ? post.map(item =>(
    <View style={styles.block}>
      <TouchableOpacity style={{justifyContent:'center',}}>
    
      {this.itemImage(item)}
      {this.itemText(item)}
      
        </TouchableOpacity>
      </View>
    
  ))  : null

    
  )


_onRefresh=()=>{
  this.setState({refreshing: true});
  const uid=this.props.User.userData.uid
this.props.getUserPost(uid)
this.setState({
  
  refreshing:false
})
}

componentDidMount(){
const uid=this.props.User.userData.uid
this.props.getUserPost(uid)

}

componentWillReceiveProps(nextProps){
  if(nextProps.User.userPosts){
    this.setState({
      posts:nextProps.User.userPosts
    })
  }
}

  render(){
    return(
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
      <View style={styles.container}>
    <View style={{flex:1,marginBottom:30,alignItems:'center'}}>
      <Text style={styles.heading}>You have {this.state.posts.length} Post</Text>
      </View>
    {this.showPost(this.state.posts)}
    </View>
    </ScrollView>
    );
  }
}

function mapStateToProps(state){
  console.log("in posts",state)
  return{
    User:state.User,
    
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getUserPost,deleteUserPost},dispatch)
}


const styles= StyleSheet.create({
  container:{
flex:1,
padding:10
  },
  heading:{
    fontSize:20,
    fontFamily:"Roboto",
    fontWeight:'bold',
    color:'#00ADA9',
    marginBottom:30,
    
  },
  itemImage:{
    width:'100%',
    height:200,
    borderRadius:30,
    borderColor:"black",
    position:'relative',
    borderColor:"#ffc954",
    borderWidth:1
    
    
    
} ,
itemTextContainer:{
  padding:10,
  borderLeftWidth:4,
  borderLeftColor:'#ff9e54',
  borderRadius:10,
  borderRightWidth:4,
  borderRightColor:'#ff9e54',
  marginTop:10
},
itemTitle:{
  marginBottom:5,
  color:'#4C4C4C',
fontFamily:'Roboto',
  fontWeight:'bold'
},
itemPrice:{
  marginBottom:5,
  color:'#00ada9',
fontFamily:'Roboto',
  fontWeight:'bold'
},
block:{
  paddingLeft:30,
  paddingRight:30,
marginBottom:30

},
delete:{
  position:'absolute',
  backgroundColor:'#ff9e54',
  color:'black',
  padding:10,
  bottom:30,
  left:10,
  fontFamily:'Roboto',
  fontWeight:'normal',
  borderRadius:10,
  fontSize:15
}
})

export default connect(mapStateToProps,mapDispatchToProps)(PostComponent)