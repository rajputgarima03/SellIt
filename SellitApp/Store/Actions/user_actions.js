import {REGISTER_USER,SIGN_USER,AUTO_SIGN_IN,GET_USER_POST,DELETE_USER_POST} from '../type';
import axios from 'axios';
import {SIGNUP,SIGNIN,REFRESH,FIREBASEURL} from '../../Util/misc';



export function signUp(data){
    const request = axios({
method:'POST',
url:SIGNUP,
data:{
email: data.email,
password:data.password,
returnSecureToken:true
},
headers:{
    "Content-Type":"application/json"
}
    }).then(response =>{
    
        
        return response.data
    }).catch(e=>{
        console.log("error")
        return false
    })


    return{
        type:"REGISTER_USER",
        payload:request
    }

}

export function signIn(data){

const request = axios({
    method:'POST',
    url:SIGNIN,
    data:{
        email: data.email,
        password:data.password,
        returnSecureToken:true
        },
        headers:{
            "Content-Type":"application/json"
        }
}).then(response =>{  
    return response.data
}).catch(e=>{
    console.log("error")
    return false
})
    return{
        type:"SIGN_USER",
        payload: request
    }
}


export function autoSignIn(refToken){

    const request= axios({
        method:"POST",
        url:REFRESH,
        data:"grant_type=refresh_token&refresh_token="+refToken,
    header:{
      "Content-Type"  :"application/x-www-form-urlencode"
    }
    }).then(response=>{
        return response.data
    }).catch(e=>{
        return false
    })

    return{
        type:"AUTO_SIGN_IN",
        payload:request
    }
}



export function getUserPost(UID){
    const request = axios(`${FIREBASEURL}/articles.json?orderBy=\"uid\"&equalTo=\"${UID}\"`)
     .then(response=> {
         console.log("in response",response)
         let articles=[]
         for(let key in response.data){
             articles.push({...response.data[key],id : key})
         }
         console.log("in articles",articles)
         return articles
     })
return{
    type:GET_USER_POST,
    payload:request
}








}


export const deleteUserPost=(POSTID,USERDATA)=>{
const promise= new Promise((resolve,reject)=>{
const URL=`${FIREBASEURL}/articles/${POSTID}.json`

console.log("inside delete user post")
const request = axios({
    method:'DELETE',
    url:`${URL}?auth=${USERDATA.token}`
}).then(response =>{
    console.log("after response")
    resolve({deletePost:true})
}).catch()

})

return{
    type:DELETE_USER_POST,
    payload:promise
}

}