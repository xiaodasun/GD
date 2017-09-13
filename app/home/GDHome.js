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
    ListView,
    Dimensions,
    ActivityIndicator,
    Modal,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

// 第三方
import {PullList} from 'react-native-pull';
// 引用外部文件
import CommunalNavBar from '../main/GDCommunalNavBar';
import CommunalHotCell from '../main/GDCommunalHotCell';
import NoDataView from '../main/GDNoDataView';
import HalfHourHot from './GDHalfHourHot';
import Search from './GDSearch';
import HTTPBase from '../http/HTTPBase';


const {width, height} = Dimensions.get('window');

export default class GDHome extends Component {

    // 构造
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            loaded: false,
            isModal: false,
        };
        this.fetchData = this.fetchData.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }


    // 网络请求
    fetchData(resolve){

        let params = { "count": 20, "mall": "京东商城" };

        HTTPBase.post('http://guangdiu.com/api/getlist.php', params, {})
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.data),
                    loaded: true,
                });
                if(resolve !== undefined){
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }
            })
            .catch((error) => {
                console.log('error', error)
            })
            .done();

        /*
        let formData = new FormData();
        formData.append("count", "10");
        formData.append("mall", "京东商城");
        setTimeout(() => {
            fetch('http://guangdiu.com/api/getlist.php', {
                method: 'POST',
                headers: {},
                body: formData,
            })
                .then((response) => response.json())
                .then((responseData) => {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(responseData.data),
                        loaded: true,
                    });
                    if(resolve !== undefined){
                        setTimeout(() => {
                            resolve();
                        }, 1000);
                    }
                })
                .done();
        })
        */
    }

    // 跳转到'近半小时热门页面'
    pushToHalfHourHot(){
        this.setState({
            isModal: true,
        })
    }

    // 跳转到'搜索页面'
    pushToSearch(){
        this.props.navigator.push({
            component: Search,
        })
    }

    // 返回左边按钮
    renderLeftItem(){
        return (
            <TouchableOpacity
                onPress={() => {this.pushToHalfHourHot()}}
            >
                <Image source={{uri: 'hot_icon_20x20'}} style={styles.navbarLeftItemStyle} />
            </TouchableOpacity>
        )
    }

    // 返回中间按钮
    renderTitleItem(){
        return (
            <TouchableOpacity>
                <Image source={{uri: 'navtitle_home_down_66x20'}} style={styles.navbarTitleItemStyle} />
            </TouchableOpacity>
        )
    }

    // 返回右边按钮
    renderRightItem(){
        return (
            <TouchableOpacity
                onPress={()=>{this.pushToSearch()}}
            >
                <Image source={{uri: 'search_icon_20x20'}} style={styles.navbarRightItemStyle} />
            </TouchableOpacity>
        )
    }

    // 下拉加载更多数据
    loadMore(){
        fetch('http://guangdiu.com/api/gethots.php')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.data),
                    loaded: true,
                })
            }).done();
    }

    renderFooter(){
        return (
            <View style={{height: 100}}>
                <ActivityIndicator />
            </View>
        )
    }

    // 根据网络状态决定是否渲染 ListView
    renderListView(){
        if(this.state.loaded === false){
            return (
                <NoDataView />
            )
        } else {
            return (
                <PullList
                    onPullRelease={(resolve) => this.fetchData(resolve)}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    showsHorizontalScrollIndicator={false}
                    style={styles.listViewStyle}
                    initialListSize={5}
                    renderHeader={this.renderHeader}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={60}
                    renderFooter={this.renderFooter}
                />
            )
        }
    }

    // 返回每一行 cell 的样式
    renderRow(rowData){
        return (
            <CommunalHotCell
                image={rowData.image}
                title={rowData.title}
            />
        )
    }


    componentDidMount(){
        this.fetchData();
    }

    onRequestClose(){
        this.setState({
            isModal: false,
        })
    }

    closeModal(data){
        this.setState({
            isModal: data
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {/*初始化模态*/}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isModal}
                    onRequestClose={this.onRequestClose()}
                >
                    <HalfHourHot removeModal={(data)=>this.closeModal(data)} />
                </Modal>
                <CommunalNavBar
                    leftItem={() => this.renderLeftItem()}
                    titleItem={() => this.renderTitleItem()}
                    rightItem={() => this.renderRightItem()}
                />
                {/*根据网络状态决定是否渲染 ListView*/}
                {this.renderListView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
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
    },
    listViewStyle: {
        width: width,
    }
});

