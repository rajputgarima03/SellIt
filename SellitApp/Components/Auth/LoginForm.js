import React ,{Component} from 'react';
import {Text,View,Button,ScrollView,StyleSheet} from 'react-native';
import Input from '../../Util/forms/Input';
import ValidationRules from '../../Util/forms/validationRules'

import {connect} from 'react-redux';
import {signUp,signIn} from '../../Store/Actions/user_actions';
import {bindActionCreators} from 'redux';
import {setToken} from '../../Util/misc'



class LoginForm extends Component {

 state={
     type:"Login",
     action:"Login",
     actionMode:"I want to Register",
     hasError:false,
     form:{
         email:{
             value:"",
             type:"textinput",
             valid:"false",
             rules:{
                 isRequired:true,
                isEmail:false
             }

         },
         password:{
            value:"",
            type:"textinput",
            valid:"false",
            rules:{
                isRequired:true,
                minLength:6
            }


         },
         confirmPassword:{
            value:"",
            type:"textinput",
            valid:"false",
            rules:{
                confirmpass:"password"
            }

         }
     }
 }
 updateInput=(name,value)=>{
     this.setState({
         hasError:false
     })
     
     let formCopy= this.state.form;
     formCopy[name].value=value;
   
     let rules= formCopy[name].rules;
     let valid= ValidationRules(value,rules,formCopy)
     console.log(valid)
     formCopy[name].valid=valid
     this.setState({
         form:formCopy
     })

 }

 changeFormType=()=>{
     const type=this.state.type
     this.setState({
         type:type==="Login"? "Register" :"Login",
         action:type==="Login"? "Register" :"Login",
         actionMode:type==="Login"? "I want to Login" :"I want to Register",
     })
 }

 confirmPassword=()=>(
     this.state.type !="Login" ?
    <Input
    placeholder="Confirm your password"
    type={this.state.form.confirmPassword.type}
    value={this.state.form.confirmPassword.value}
    onChangeText={value=>this.updateInput("confirmPassword",value)}
    secureTextEntry
     />
     :null
 )

 manageAccess =() =>{
     if(!this.props.User.userData.uid){
    this.setState({
       hasError:true 
    })
     }
     else{
    setToken(this.props.User.userData,()=>{
        this.setState({
            hasError:false
         })
         this.props.goNext()
    })
     }
 }


 submitUser =()=>{
    let isFormValid = true;
    let formToSubmit={};
    const formCopy= this.state.form;
  
    for(let key in formCopy)
    {

        if(this.state.type=='Login'){
      if(key != 'confirmPassword'){
          isFormValid=isFormValid &&formCopy[key].valid
          formToSubmit[key] = formCopy[key].value;
      }
        }
        else{
            isFormValid=isFormValid &&formCopy[key].valid
            formToSubmit[key] = formCopy[key].value;
        }
    }
    if (isFormValid)
    {
        if(this.state.type=='Login'){
            this.props.signIn(formToSubmit).then(()=>{
                this.manageAccess()
                console.log(this.props.User)
                console.log("bello")
            })
        }
        else{
            this.props.signUp(formToSubmit).then(()=>{
                this.manageAccess()
                console.log(this.props.User)
                console.log("hello")
            })
        }
    }
    else{
        this.setState({
            hasError:true
        })
    }
 }

 formHasError=()=>(
     this.state.hasError ===true ?
     <View style={styles.errorContainer}>
         <Text style={styles.errorLabel}>Oops! check your information</Text>
         </View>: null
 )


    render(){
        return(
 <View>
     <Input
     placeholder="Enter your email"
     type={this.state.form.email.type}
     autoCapitalize={"none"}
     value={this.state.form.email.value}
     onChangeText={value=>this.updateInput("email",value)}
     keyboardType={"email-address"}
     />

     <Input
     placeholder="Enter your password"
     type={this.state.form.password.type}
     value={this.state.form.password.value}
     onChangeText={value=>this.updateInput("password",value)}
     secureTextEntry
     />
     {this.confirmPassword()}
     {this.formHasError()}
     <View style={this.props.platform ==='android' ? styles.buttonAndroid :styles.buttonIos}>
     <Button 
     title={this.state.action}
     color="#fd9727"
     onPress={this.submitUser}
     />
     </View>

     <View style={this.props.platform ==='android' ? styles.buttonAndroid :styles.buttonIos}>
     <Button 
     title={this.state.actionMode}
     color="grey"
     onPress={this.changeFormType}
     />
     </View>

     <View>
     <Button 
     title="i'll do it later"
     color="grey"
     onPress={this.props.goNext}
     />
     </View>
 </View>
        );
    }
}


const styles = StyleSheet.create({
    buttonAndroid:{
        marginBottom:10,
        marginTop:10
    },
    buttonIos:{
        marginTop:0
    },
    errorContainer:{
  marginBottom:20,
  marginTop:10
    },
    errorLabel:{
        color:"#ff0033",
        fontFamily:"Roboto"
    }
})

function mapStateToProps (state){
    console.log("hellooooo")
    console.log(state.User)
    return{
        User:state.User
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({signUp,signIn},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)