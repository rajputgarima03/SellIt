import React ,{Component} from 'react';
import {Text,View} from 'react-native';
import {connect} from 'react-redux';
import Routes, { RootNavigator } from './SellitApp/Routes'

export default class App extends Component {
   

  render(){
    const Nav= RootNavigator()
    return(
        <Nav/>
    )
  }
}