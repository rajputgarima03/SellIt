import React ,{Component} from 'react';
import {Text,View,Button,ScrollView,StyleSheet,Animated,Image} from 'react-native';
import BackImage from '../../Assets/Images/loginPanel.jpg';
import LoginForm from './LoginForm'
export default class LoginPanel extends Component {

state={
    backImage: new Animated.Value(0),
    inputForm: new Animated.Value(0),
    animFinish:false
}

componentWillReceiveProps(nextProps){
    if(nextProps.show && !this.state.animFinish){
        Animated.parallel([
            Animated.timing(this.state.backImage,{
                toValue:1,
                duration:1000,

            }),
            Animated.timing(this.state.inputForm,{
                toValue:1,
                duration:1500,
                
            })
        ]).start(
            this.setState({
                animFinish:true
            })
        )
    }
}

    render(){
        return(
            <View >
            <Animated.View style={{
                opacity:this.state.backImage
            }}>
                <Image source={BackImage} resizeMode={'contain'} 
                style={this.props.orientation ==='potrait' ? styles.imageP : styles.imageL}/>
                </Animated.View>
                
                <Animated.View style={{
                opacity:this.state.inputForm,
                top:this.state.inputForm.interpolate({
                    inputRange:[0,1],
                    outputRange:[100,30]
                })
            }} >
                    <LoginForm
                    platform={this.props.platform}
                    goNext={this.props.goNext}
                    />
                    </Animated.View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
imageP:{
    width:270,
    height:150
},
imageL:{
    width:270,
    height:0
}
}) 