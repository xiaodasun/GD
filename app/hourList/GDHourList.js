/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import GDCommunalNavBar from '../main/GDCommunalNavBar';


export default class GDHourList extends Component {

    renderTitleItem(){
        return (
            <TouchableOpacity>
                <Image source={{uri: 'navtitle_rank_106x20'}} style={styles.navbarTitleItemStyle} />
            </TouchableOpacity>
        )
    }
    renderRightItem(){
        return (
            <TouchableOpacity>
                <Text style={styles.navbarRightItemStyle}>设置</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <GDCommunalNavBar
                    titleItem={() => this.renderTitleItem()}
                    rightItem={() => this.renderRightItem()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    navbarTitleItemStyle: {
        width: 106,
        height: 20,
        marginLeft: 50
    },
    navbarRightItemStyle: {
        fontSize: 17,
        color: 'rgba(123,188,114,1.0)',
        marginRight: 15,
    }
});

