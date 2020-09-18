import React ,{Component} from 'react';
import {Text,View,ScrollView,StyleSheet,Button,ActivityIndicator, Modal} from 'react-native';
import {connect} from 'react-redux';
import {autoSignIn} from '../../Store/Actions/user_actions';
import {getToken,setToken} from '../../Util/misc';
import Input from '../../Util/forms/Input';
import ValidationRules from '../../Util/forms/validationRules'
import Icon from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import {addArticle,resetArticles} from '../../Store/Actions/article_actions';
import ImagePicker from 'react-native-image-picker';
 class SellComponent extends Component {
          
      state={
        errorArray:[],
        loading:true,
        isAuth:false,
        hasError:false,
        modalVisibile:false,
        modalSuccess:false,
        form:{
            category:{
                value:"",
                name:"category",
                type:"picker",
                valid:"false",
                options:['options','Sports','Music','Clothing','Electronics'],
                rules:{
                    isRequired:true,
                  
                },
                errorMsg:"Choose a category"
   
            },
            title:{
              value:"",
              name:"title",
              type:"textinput",
              valid:"false",
              rules:{
                isRequired:true,
                maxLength:50
              },
              errorMsg:"Add a title of maximum 50 characters"
            },
            description:{
              value:"",
              name:"description",
              type:"textinput",
              valid:"false",
              rules:{
                isRequired:true,
                maxLength:200
              },
              errorMsg:"Add a description of maximum 200 characters"
            },
            price:{
              value:"",
              name:"price",
              type:"textinput",
              valid:"false",
              rules:{
                isRequired:true,
                
              },
              errorMsg:"Add a price "
            },
            email:{
              value:"",
              name:"email",
              type:"textinput",
              valid:"false",
              rules:{
                isRequired:true,
                isEmail:true
              },
              errorMsg:"Add a valid email"
            },
            image:{
              value:"",
              name:"image",
              type:"textinput",
              valid:"false",
              rules:{
                isRequired:true,
               
              },
              errorMsg:"Add an image"

            }
          }
      }
       manageAcces( loading,isAuth){
            this.setState({
              loading,
              isAuth
            })
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
  submitFormHandler=()=>{
                let isFormValid= true
                let dataToSubmit ={}
                const formCopy = this.state.form

                for(let key in formCopy){
                  isFormValid=isFormValid && formCopy[key].valid
                  dataToSubmit[key]= this.state.form[key].value
                }
                if(isFormValid== true)
                {
                  this.setState({
                    loading:false,
                    // hasError:false,
                    // modalSuccess:true
                  })

               getToken((value)=>{
                const dateNow = new Date()
                const expiration = dateNow.getTime()
                const form = {
                  ...dataToSubmit,
                  uid:value[3][1]
                }
                console.log("yuppp check is on,,,,")
                console.log(expiration)
                console.log(value)
                if(expiration> value[2][1])
                {
                  this.props.autoSignIn(value[1][1]).then(()=>{
                 this.setToken(this.props.User.userData,()=>{
                   this.props.addArticle(form,value[0][1]).then(()=>{
                    this.setState({ modalSuccess:true})
                    
                   })
                  
                 })
                  })
                }
                else{
                  this.props.addArticle(form,value[0][1]).then(()=>{
                    this.setState({ modalSuccess:true})
                    
                   })
                }
               } )

                }
                else{
                let errorArray =[]
                for(let key in formCopy)
                {
                  
                  if(formCopy[key].valid == "false"){
                    console.log(formCopy[key].errorMsg)
                    errorArray.push(formCopy[key].errorMsg)
                    
                  }
                }
              this.setState({
                hasError:true,
                loading:false,
                modalVisibile:true,
                errorArray
              })


    
    }

  }

  showError=(errors)=>(
      errors ? errors.map((item,key)=>(
      <Text key={key} style={styles.errorText}> *{item}</Text>
      )): null
  )

clearError=()=>{
      this.setState({
        hasError:false,
        modalVisibile:false,
        errorArray:[]
      })
}

clearSuccess=()=>{
        
      const formCopy= this.state.form
      for(let key in formCopy)
      {
        formCopy[key].valid=false
        formCopy[key].value=""
      }
      this.setState({
        hasError:false,
        modalSuccess:false,
        errorArray:[],
      
      })
      this.props.resetArticles()
      this.props.navigation.navigate('App')


}

addAvatar=()=>{
  ImagePicker.showImagePicker({},response=>{
    
    if(response.didCancel){
      console.warn("really")
    }
    else if(response.error)
    {
      console.warn(response.error)
    }
    else{
      const value= this.state.form.image.value
      
      this.updateInput("image",response.uri)
    }
  })
  
}


componentDidMount(){
  
          const  User= this.props.User;
        
          getToken((value)=>{
        
            if (value[0][1]==null) {
            
              this.manageAcces(false,false)
              
            } else {
              
          this.props.autoSignIn(value[1][1]).then(()=>{
            if (!this.props.User.userData.token) {
              
              this.manageAcces(false,false)
            } else { 

              setToken(this.props.User.userData,()=>{
                this.manageAcces(false,true)
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
        </View>)
      }
      else{

                   if(this.state.isAuth){
                 return(
                                  <ScrollView style={{backgroundColor:"white "}}>
                                              <View style={styles.formContainer}>
                                                    <View style={{alignItems:"center",flex:1}}>
                                                          <Text style={styles.mainTitle} >Sell Your Item</Text>
                                                      </View>

                                                      <View style={{flex:1,alignItems:'center',flexDirection:'row'}}>
                                                           <View style={{flex:1}}>
                                                                <Text>Select a Category:</Text>
                                                             </View>
                                                            <View style={{flex:1}}>
                                                                  <Input
                                                                    placeholder="Select category"
                                                                    type={this.state.form.category.type}
                                                                    value={this.state.form.category.value}
                                                                    onValueChange={value=>this.updateInput("category",value)}
                                                                    options={this.state.form.category.options}
                                                                    
                                                                    />

                                                             </View>
                                                        </View>

                                                     <View style={{flex:1,alignItems:'center'}}>
                                                          <Text style={styles.secondTitle}>Describe what you want to sell</Text>
                                                     </View>
                                                    <View>
                                                        <Text>Add the title, be descriptive:</Text>
                                                        <Input
                                                                    placeholder="Enter a title"
                                                                    type={this.state.form.title.type}
                                                                    value={this.state.form.title.value}
                                                                    onChangeText={value=>this.updateInput("title",value)}
                                                                    overrideStyle={styles.inputText}
                                                                  /> 
                                                                  
                                                                  
                                                      </View>
                                                     <View>
                                                      <Input
                                                                    placeholder="Enter the description"
                                                                    type={this.state.form.description.type}
                                                                    value={this.state.form.description.value}
                                                                    onChangeText={value=>this.updateInput("description",value)}
                                                                    multiline={true}
                                                                    numberOfLine={4}
                                                                    overrideStyle={styles.inputTextMulti}
                                                                    /> 
                                                      </View>
                                              <View>
                                                <Text style={{marginTop:20}}>Add the price in Rupee: </Text>
                                                <Input
                                                                    placeholder="Enter the price"
                                                                    type={this.state.form.price.type}
                                                                    value={this.state.form.price.value}
                                                                    onChangeText={value=>this.updateInput("price",value)}
                                                                  overrideStyle={styles.inputText}
                                                                  keyboardType={"numeric"}
                                                                    /> 
                                                </View>


                                                    <View style={{alignItems:'center',marginTop:30,justifyContent:'center'}}>
                                                    
                                                    <Icon.Button  name="camera" size={18} color="black" onPress={()=>{this.addAvatar()}} backgroundColor='#D8D8D8'>
                                                    <Text style={styles.buttonText}>Add image</Text>
                                                        </Icon.Button>
                                                    </View>

                                                <View style={{flex:1,alignItems:'center'}}>
                                                <Text style={styles.secondTitle}>Add your contact details</Text>
                                                </View>
                                                <View>
                                                  <Text>Enter the email:</Text>
                                                  <Input
                                                                    placeholder="Enter your email"
                                                                    type={this.state.form.email.type}
                                                                    value={this.state.form.email.value}
                                                                    onChangeText={value=>this.updateInput("email",value)}
                                                                  overrideStyle={styles.inputText}
                                                                  keyboardType={"email-address"}
                                                                  autoCapitalize={"none"}
                                                                    /> 
                                                  </View>
                                                  {
                                                    !this.state.loading ? <View style={{ justifyContent:'center',alignItems:'center',marginTop:30}}>
                                            <Button title='Post it' color="#fd9727" onPress={this.submitFormHandler}/></View>
                                                    : null
                                                  }

                                          <Modal animationType="slide"
                                          visible={this.state.modalVisibile} onRequestClose={()=>{}} >
                                              <View style={{flex:1,alignItems:'center',backgroundColor:"white",justifyContent:'flex-end'}}>
                                              <Icon name="frown-o" size={50} color="#fd9727"></Icon>
                                                <Text style={styles.errorTitle}>Oops!!! check your information</Text> 
                                                </View>
                                                <View style={{flex:3,backgroundColor:"white",padding:20}}>
                                                <View style={styles.errorBlock}>
                                                  {this.showError(this.state.errorArray)}
                                                  </View>
                                                 <View style={{ justifyContent:'center',alignItems:'center',marginTop:30}}>
                                                  <Button title="Got it"  color="#ff9e54" onPress={this.clearError} />
                                                 </View>
                                              </View>
                                              </Modal>


                                              
                                          <Modal animationType="slide"
                                          visible={this.state.modalSuccess} onRequestClose={()=>{}} >
                                              <View style={{flex:1,alignItems:'center',backgroundColor:"#f2ebeb",justifyContent:'center',paddingTop:50}}>
                                              <Icon name="smile-o" size={100} color="#fd9727"></Icon>
                                                <Text style={styles.SuccessTitle}>Good Job!!!</Text> 
                                              
                                              <Button title="Return"  color="#ffc954" onPress={()=>{this.clearSuccess()}} />
                                              
                                              </View>
                                              </Modal>

                                                </View>
                                </ScrollView>
              )
                   }





//not auth part

                   else{
                     return(
                              <View style={styles.notAuth}>
                                
                                <View style={{marginBottom:50}}> 
                                <Icon name="frown-o" size={100} color="#ffc954"></Icon>
                                  </View> 
                                  <View style={{marginBottom:10}}>
                                    <Text style={styles.notAuthText}> We are sorry, you need to be 
                                    logged in to sell items</Text>
                                    </View>
                                    <Button title='Login/Register' color="#fd9727" onPress={()=>{this.props.navigation.navigate('Auth')}}/>
                            
                                  
                                    </View>
                     )
                   }

     
 
      }
    

  }
}




const styles= StyleSheet.create({
          notAuth:{
            justifyContent:'center',
            alignItems:'center',
            flex:1,
          
          },
          notAuthText:{
            fontFamily:'Roboto',
            fontWeight:'bold',
            fontSize:15
          },
          formContainer:{
        padding:10,
        flex:1,
        flexDirection:'column'
          },
          mainTitle:{
            fontSize:30,
            fontFamily:"Roboto",
            fontWeight:'bold',
            color:'#00ADA9'
          },
          secondTitle:{
            fontSize:20,
            fontFamily:"Roboto",
            fontWeight:'bold',
            color:'#00ADA9',
            marginBottom:30,
            marginTop:30
          },
          inputText:{
            padding:10,
            borderBottomWidth:0,
            backgroundColor:"#D8D8D8"
          },
          inputTextMulti:{
            padding:10,
            borderBottomWidth:0,
            backgroundColor:"#D8D8D8",
            minHeight:100
          },
          errorText:{
            fontSize:18,
            fontFamily:"Roboto",
            fontWeight:'bold',
            color:'black'
          },
          errorTitle:{
            fontSize:20,
            fontFamily:"Roboto",
            fontWeight:'bold',
            color:'#99060d',
            marginBottom:30,
            marginTop:30
          },
          SuccessTitle:{
            fontSize:20,
            fontFamily:"Roboto",
            fontWeight:'bold',
            color:'#00ADA9',
            marginBottom:30,
            marginTop:30
          },
          errorBlock:{
          borderRadius:20,
          padding:20,
          borderColor:"#99060d",
          
          borderWidth:5
          },
          buttonText:{
            fontSize:15,
            fontFamily:'Roboto',
            fontWeight:'normal',
            color:'grey',
            marginLeft:5,
            paddingLeft:10
          },
})


function mapStateToProps (state){
  console.log(state);
  return{
    User: state.User,
    Articles:state.Articles
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addArticle,autoSignIn,resetArticles},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SellComponent)