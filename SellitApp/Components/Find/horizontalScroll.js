import React ,{Component} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';


const categoriesIcon =(value)=>{
    let name=''
    switch(value){
        case 'All': name='circle-o-notch'
                    break; 
        case 'Sports': name='soccer-ball-o'
                    break;
        case 'Music': name='music'
                    break;  
        case 'Clothing': name='shopping-bag'
                    break; 
        case 'Electronics': name='tv'
                    break; 
        default: name=''
                   
    }
    return name
}


export default class HorizontalScroll extends Component {

generateIcons=(categories)=>{
if(categories){
       
        return(
            categories.map(item=>(
                <View style={{marginRight:15}} key={item }>
                <Icon.Button name={categoriesIcon(item)}
                iconStyle={{marginRight:10,marginLeft:3}}
                size={20}
                backgroundColor={this.props.categorySelected != item ?'#A9A9A9':'#ffc954'}
                borderRadius={100}
                onPress={()=>this.props.updateCategoryHandler(item)}>
            <Text style={{color:"#fff",marginRight:5}}>{item}</Text>
                </Icon.Button>
                </View>
            ))
        )
    
}
}



  render(){
    return(
      <ScrollView
      decelerationRate={0}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      snapToInterval={200} >

<View style={styles.scrollContainer}>
    {this.generateIcons(this.props.categories)}
</View>

          </ScrollView>
    );
  }
}
const styles= StyleSheet.create({
scrollContainer:{
    flex:1,
    flexDirection:'row',
    width:'100%',
    padding:10
}
})