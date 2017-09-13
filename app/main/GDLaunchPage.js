import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import Main from './GDMain';

const { width, height } = Dimensions.get('window');

export default class GDLaunchPage extends Component {

    componentDidMount(){
        setTimeout(()=>{
            this.props.navigator.replace({
                component: Main
            })
        }, 1500);
    }

    render(){
        return (
            <Image source={{uri: 'launchimage'}} style={styles.imageStyle} />
        )
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        width: width,
        height: height,
    }
});