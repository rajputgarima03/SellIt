import React ,{Component} from 'react';
import {Text,View,StyleSheet, Image, Linking} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const articleImage=(params)=>(
    <View style={{position:'relative'}}>
        <Image resizeMode="cover" source={{uri:params.image}} style={styles.articleImage}/>
<Text style={styles.priceTag}>${params.price}</Text>
        </View>
)
    
const articleText=(params)=>(
    <View >
        <Text style={styles.articleTitle}>{params.title}</Text>
       
            <Text style={styles.articleDescription}>{params.description}</Text>
            </View>
)

const ownerInfo=(params)=>(
<View style={styles.ownerInfo}>
    <Text style={{marginBottom:10}}>Contact the owner of this article from the email:</Text>
    <Icon.Button
    name="envelope-o"
    color='#00ADA9'
    backgroundColor="#ffffff"
    size={20}
    onPress={()=>openEmail(params)} >
<Text style={{fontSize:20}}>{params.email}</Text>
    </Icon.Button>
    </View>
)

const openEmail=(params)=>{
    Linking.openURL(`mailto:${params.email}?subject=Regarding ${params.title}`)
}

export default class Article extends Component{
    render(){
        const params = this.props.navigation.state.params;
        return(
           <ScrollView  style={styles.articleContainer}>
               <View >
                 {articleImage(params)}
                 {articleText(params)}
                 {ownerInfo(params)}
                   </View>
               </ScrollView>
        )
    }
}

 
const styles= StyleSheet.create({
articleContainer:{
    padding:10,

},
articleImage:{
    width:'100%',
    height:250,
    borderRadius:50,
   
    
},
priceTag:{
    position:'absolute',
    backgroundColor:'#ffc954',
    color:'black',
    padding:10,
    bottom:30,
    left:10,
    fontFamily:'Roboto',
    fontWeight:'bold',
    borderRadius:10,
    fontSize:20
},
articleTitle:{
fontSize:30,
color:'#474143',
fontFamily:'Roboto',
marginTop:20,
fontWeight:'bold'
},
articleDescription:{
fontSize:18,
marginTop:20
},
ownerInfo:{
    marginTop:30,
    paddingTop:10,
    borderTopWidth:1,
    borderTopColor:'lightgrey'
}

})