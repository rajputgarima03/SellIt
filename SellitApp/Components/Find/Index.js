import React ,{Component} from 'react';
import {Text,View,StyleSheet,RefreshControl} from 'react-native';
import HorizontalScroll from './horizontalScroll'
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getArticles} from '../../Store/Actions/article_actions'
import {gridTwoColumns} from '../../Util/misc'
import Icon  from 'react-native-vector-icons/FontAwesome';
import BlogItem from './blogItem';
class FindComponent extends Component {

state={
  categories:['All','Sports','Music','Clothing','Electronics'],
  categorySelected:'All',
  articles:[],
  isLoading:true,
  refreshing:false
}
updateCategoryHandler=(value)=>{
  this.setState({
    categorySelected:value,
    isLoading:true,
    articles:[]
  })
  this.props.getArticles(value).then(()=>{
    const newArticles = gridTwoColumns(this.props.Articles.list)
   
    this.setState({
      articles:newArticles,
      isLoading:false
    })
  })
}

goNext=(item)=>{
  console.log("so its working",item)
  this.props.navigation.navigate('Article',{...item})
}

showArticle=()=>(
  this.state.articles.map((item,i)=>(
<BlogItem 
iteration={i}
item={item}
key={`column-head${i}`}
goNext={this.goNext}
/>
  ))
)

_onRefresh=()=>{
  this.setState({refreshing: true});
  this.props.getArticles('All').then(()=>{
      
    const newArticles = gridTwoColumns(this.props.Articles.list)
    console.log(newArticles)
    this.setState({
      articles:newArticles,
      isLoading:false,
      refreshing:false
    })

})
}

componentDidMount(){
      this.props.getArticles('All').then(()=>{
      
        const newArticles = gridTwoColumns(this.props.Articles.list)
        console.log(newArticles)
        this.setState({
          articles:newArticles,
          isLoading:false
        })
    
  })
}
  render(){
    return(
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      } >
        <View style={styles.container}>
            <HorizontalScroll categories={this.state.categories}
            categorySelected={this.state.categorySelected}
            updateCategoryHandler ={this.updateCategoryHandler}/>
          </View>
          {
          this.state.isLoading ? <View style={styles.isLoading}>
            <Icon name='gears' size={30} color="lightgrey"></Icon>
            <Text style={{color:"lightgrey"}}>Loading...</Text></View>:null
          }

          <View style={styles.articleContainer}>
          <View style={{flex:1}}>
             {this.showArticle()}
            </View>
            </View>
        </ScrollView>
    ); 
  } 
}

const styles= StyleSheet.create({
  container:{
    marginTop:5
  },
  isLoading:{
    flex:1,
    marginTop:50,
    alignItems:"center"
  },
  articleContainer:{
    padding:10,
    flex:1,
    justifyContent:'space-between',
    flexDirection:'row'
  }

})

function mapStateToProps(state){
  console.log(state)
  return{
    Articles:state.Articles
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({getArticles},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(FindComponent)