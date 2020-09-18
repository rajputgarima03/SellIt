import React ,{Component} from 'react';
import {Text,View,Button,TextInput,StyleSheet, Picker} from 'react-native';
import { connect } from 'react-redux';



const input=(props)=>{
let template=null
console.log(props)
switch(props.type){
    case "textinput":
                    template= <TextInput
                    underlineColorAndroid="transparent"
                    {...props}
                    style={[styles.input,props.overrideStyle]}
                    />
                   break;
    case "picker":
          template=<Picker selectedValue={props.value} {...props}  style={[styles.input1,props.overrideStyle]}>
          {
              props.options.map((item,i)=>(
                  <Picker.item  key={i} value={item} label={item}  />
              ))
          }
                  </Picker>
                  break;
     default:
         return template              

}
return template
}


const styles = StyleSheet.create({
    input:{
        width:"100%",
        borderBottomWidth:2,
        borderBottomColor:"#eaeaea",
        fontSize:18,
        padding:5,
        marginTop:10
    },
    input1:{
        width:"100%",
        borderBottomWidth:2,
        borderBottomColor:"#eaeaea",
        fontSize:18,
        padding:5,
        marginTop:10,
        borderRadius:100
    }
})


export default input;