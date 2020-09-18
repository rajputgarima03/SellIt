import { Dimensions,Platform, AsyncStorage} from 'react-native';
export const APIKEY=`AIzaSyCxnVTEAffkqdPw0RsCjUFpggJOr1NkXFc`
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;
export const REFRESH =`https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;
export const FIREBASEURL = `https://sellit-a5576.firebaseio.com`




















export const getOrientation =(value)=>{
return Dimensions.get("window").height >value ? "potrait":"value"
}


export const setOrientationListener =(cb)=>{
    return Dimensions.addEventListener("change",cb)
}


export const removeOrientationListener =()=>{
    return Dimensions.removeEventListener("change")
}

export const getPlatform=()=>{
    if(Platform.OS =='android')
    return "android"
    else
    return "ios"
}


export const setToken=(values,cb)=>{
    
    const dateNow = new Date();
    const expiry = dateNow.getTime() +(3600 * 1000);
    AsyncStorage.multiSet([
    ['@SellIt@token',values.token],
    ['@SellIt@refreshToken',values.refToken],
    ['@SellIt@expireToken',expiry.toString()],
    ['@SellIt@uid',values.uid]
    ]).then(response=()=>{
        cb();
    });
    }


export const getToken=(cb)=>{
    AsyncStorage.multiGet([
    '@SellIt@token',
    '@SellIt@refreshToken',
    '@SellIt@expireToken',
    '@SellIt@uid'
        ]).then((value)=>{
              
            cb(value);
        });
}


export const gridTwoColumns=(list)=>{
 let newArticles=[]
 let articles=list
 let c=1
 let vessel={}
 if(articles){
     
     let l= articles.length
     let x=l;
     articles.forEach(element => {
      
         if(c==1){
        
             vessel['blockOne']= element
             c++
             if(l==1)
             {
            newArticles.push(vessel)
            
             vessel={} 
             }
         }
         else if(c==2)
         {
             vessel['blockTwo']= element
             c=1
             newArticles.push(vessel)
             vessel={}
         }
         l=l-1
     });

 }
 console.log(newArticles)
 
 return newArticles

}