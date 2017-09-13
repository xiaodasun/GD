/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import GDCommunalNavBar from '../main/GDCommunalNavBar';


export default class GDSearch extends Component {

    static propTypes = {
        name: PropTypes.string,
        id: PropTypes.number,
    };

    renderLeftItem(){
        return (
            <TouchableOpacity>
                <Image source={{uri: 'hot_icon_20x20'}} style={styles.navbarLeftItemStyle} />
            </TouchableOpacity>
        )
    }
    renderTitleItem(){
        return (
            <TouchableOpacity>
                <Image source={{uri: 'navtitle_abroad_down_66x20'}} style={styles.navbarTitleItemStyle} />
            </TouchableOpacity>
        )
    }
    renderRightItem(){
        return (
            <TouchableOpacity>
                <Image source={{uri: 'search_icon_20x20'}} style={styles.navbarRightItemStyle} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <GDCommunalNavBar
                    leftItem={() => this.renderLeftItem()}
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
        backgroundColor: 'gray',
    },
    navbarLeftItemStyle:{
        width: 20,
        height: 20,
        marginLeft: 15,
    },
    navbarTitleItemStyle: {
        width: 66,
        height: 20,
    },
    navbarRightItemStyle: {
        width: 20,
        height: 20,
        marginRight: 15,
    }
});

