/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    DeviceEventEmitter,
} from 'react-native';

// 第三方
import {PullList} from 'react-native-pull';
// 引用外部文件
import CommunalNavBar from '../main/GDCommunalNavBar';
import CommunalHotCell from '../main/GDCommunalHotCell';
import NoDataView from '../main/GDNoDataView';
import HTTPBase from '../http/HTTPBase';

const {width, height} = Dimensions.get('window');

export default class GDHalfHourHot extends Component {

    // 构造
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            loaded: false,
        };
        this.fetchData = this.fetchData.bind(this);
    }

    static defaultProps = {
        removeModal: {

        }
    };

    // 网络请求
    fetchData(resolve){
        setTimeout(()=>{
            HTTPBase.get('http://guangdiu.com/api/gethots.php')
                .then((responseData) => {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(responseData.data),
                        loaded: true,
                    });
                    if(resolve !== undefined){
                        setTimeout(() => {
                            resolve();  // 关闭菊花动画
                        }, 1000)
                    }
                })
                .catch((error) => {console.log(error)})
                .done()
        },2000);

    }

    popToHome(data){
        this.props.removeModal(data);
    }

    renderTitleItem(){
        return (
            <Text style={styles.navbarTitleItemStyle}>近半小时热门</Text>
        )
    }
    renderRightItem(){
        return (
            <TouchableOpacity
                onPress={() => {this.popToHome(false)}}
            >
                <Text style={styles.navbarRightItemStyle}>关闭</Text>
            </TouchableOpacity>
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
                />
            )
        }
    }

    // 返回 ListView 头部
    renderHeader(){
        {/*顶部提示*/}
        return (
            <View style={styles.headerPromptStyle}>
                <Text>根据每条折扣的点击进行统计，每5分钟更新一次</Text>
            </View>
        );
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

    componentWillMount(){
        DeviceEventEmitter.emit('isHiddenTabBar', true);
    }

    componentDidMount(){
        this.fetchData();
    }

    componentWillUnmount(){
        DeviceEventEmitter.emit('isHiddenTabBar', false);
    }

    render() {
        return (
            <View style={styles.container}>
                {/*导航栏样式*/}
                <CommunalNavBar
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
    },
    navbarTitleItemStyle: {
        fontSize: 17,
        color: 'black',
        marginLeft: 50,
    },
    navbarRightItemStyle: {
        fontSize: 17,
        color: 'rgba(123,188,114,1.0)',
        marginRight: 15,
    },
    headerPromptStyle: {
        height: 44,
        width: width,
        backgroundColor: 'rgba(239,239,239,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listViewStyle: {
        width: width,
    }
});

