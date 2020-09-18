import React from 'react';
import {Text,View,StyleSheet, Image} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';



const BlogItem=(props)=>{
console.log("inside the block item")
console.log(props)

    const itemText=(item)=>(
        <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>
                    {item.title}
                </Text>
                <Text style={styles.itemPrice}>
                $ {item.price}
                </Text>
         </View>  
    )
    const itemImage=(item)=>(
        <View style={{flex:1}}>
            <Image resizeMode="cover"  source={{uri:`${item.image}`}}  style={styles.itemImage}/>
        </View>
    )
 
const ShadowRoot=(item,goNext)=>(
    item.blockTwo ? <TouchableOpacity onPress={()=>goNext(item.blockTwo)} style={{flex:2,width:175}} >
    <View style={[styles.blockGrid,styles.blockGridRight]}>
    {itemImage(item.blockTwo)}
    {itemText(item.blockTwo)}
    </View>
</TouchableOpacity> : <TouchableOpacity style={{flex:2,width:175}} >
    <View style={[styles.blockGrid,styles.blockGridRight]}>
        <Text style={{color:'white'}}>.</Text>
        </View>
        </TouchableOpacity> 
)
const block=({item,i,goNext})=>(
    
    <View style={styles.blockRow}>
            <TouchableOpacity onPress={()=>goNext(item.blockOne)} style={{flex:2,marginBottom:5,width:175}}>
                    <View style={[styles.blockGrid,styles.blockGridLeft]}>
                    {itemImage(item.blockOne)}
                    {itemText(item.blockOne)}
                    </View>
                </TouchableOpacity>
                {ShadowRoot(item,goNext)}
                
        </View>
)


    return(
    <View style={{flex:1}}>{block(props)}</View>
    )
}
 

const styles= StyleSheet.create({
    blockRow:{
        flexDirection:'row',
        flex:1,
        justifyContent:"space-around",
        marginBottom:5,
        
    },
    itemImage:{
        width:'100%',
        height:200,
        borderRadius:30
        
    } ,
    itemTextContainer:{
        padding:10,
        borderLeftWidth:4,
        borderLeftColor:'#ffc954',
        borderRadius:10
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
    blockGrid:{
        backgroundColor:"#f1f1f1",
        
    },
    blockGridLeft:{
marginRight:2.5
    },
    blockGridRight:{
marginLeft:2.5
    }
})

export default BlogItem;
//ed9b79