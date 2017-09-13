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
    Image,
    Platform,
    DeviceEventEmitter,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

import Home from '../home/GDHome';
import HT from '../ht/GDHt';
import HourList from '../hourList/GDHourList';

// 引入第三方框架
import TabNavigator from 'react-native-tab-navigator';

export default class GDMain extends Component {

    // ES6
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home',
            isHiddenTabBar: false,
        }
    }

    // 设置 Navigator 跳转动画
    setNavAnimationType(route){
        if(route.animationType) {   //  有值
            let conf = route.animationType;
            conf.gestures = null;
            return conf;
        } else {
            return Navigator.SceneConfigs.PushFromRight;
        }
    }

    // 返回TabBar的Item
    renderTabBarItem(title, selectedTab, image, selectedImage, component){
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={title}
                renderIcon={() => <Image source={{uri:image}} style={styles.tabbarIconStyle} />}
                renderSelectedIcon={() => <Image source={{uri:selectedImage}} style={styles.tabbarIconStyle} />}
                // badgeText="6"
                selectedTitleStyle={{color: 'black'}}
                onPress={() => this.setState({selectedTab:selectedTab})}
            >
                <Navigator
                    initialRoute={{
                        name: selectedTab,
                        component: component
                    }}

                    configureScene={(route) => this.setNavAnimationType(route)}

                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator} />
                    }}
                />
            </TabNavigator.Item>
        )
    }

    componentWillMount(){
        DeviceEventEmitter.emit('isHiddenTabBar', true);
    }
    tongZhi(data){
        this.setState({
            isHiddenTabBar: data
        })
    }
    componentDidMount(){
        this.subscription = DeviceEventEmitter.addListener('isHiddenTabBar', (data) => {this.tongZhi(data)});
    }
    componentWillUnmount(){
        this.subscription.remove();
    }

    render() {
        return (
            <TabNavigator
                tabBarStyle={this.state.isHiddenTabBar !== true ? {} : {height: 0, overflow: 'hidden'}}
                sceneStyle={this.state.isHiddenTabBar !== true ? {} : {paddingBottom: 0}}
            >
                {/* 首页 */}
                {this.renderTabBarItem('首页', 'home', 'tabbar_home_30x30', 'tabbar_home_selected_30x30', Home)}
                {/* 海淘 */}
                {this.renderTabBarItem('海淘', 'ht', 'tabbar_abroad_30x30', 'tabbar_abroad_selected_30x30', HT)}
                {/* 小时风云榜 */}
                {this.renderTabBarItem('小时风云榜', 'hourlist', 'tabbar_rank_30x30', 'tabbar_rank_selected_30x30', HourList)}
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabbarIconStyle: {
        width: Platform.OS === 'ios' ? 30 : 25,
        height: Platform.OS === 'ios' ? 30 : 25
    }
});

