

const validation=(value,rules,form)=>{
let valid=true;
for(let rule in rules){
    switch(rule){
        case "isRequired":
       valid=valid&& validationRequired(value)
        break;
        case "isEmail":
            valid=valid && validationEmail(value)
            break;
        case "minLength":
            valid=valid && validationMin(value,rules[rule])
            break;
            case "confirmpass":
             valid=valid && validationPassword(value,form[rules.confirmpass].value)    
            break;
            case "maxLength":
                valid=valid && validationMax(value,rules[rule])
        default:
            valid=true;
    }
}
return valid;
}

const validationRequired= (value)=>{
if(value !='')
return true
else 
return false 
}

const validationEmail=(email)=>{
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(String(email).toLocaleLowerCase());    
}

const validationMin=(value,min)=>{
if(value.length >=min)
return true
else
return false
}
const validationMax=(value,max)=>{
    if(value.length <=max)
return true
else
return false
}


const validationPassword=(con,pass)=>{
    if(con===pass)
    return true
    else
    return false
}
export default validation