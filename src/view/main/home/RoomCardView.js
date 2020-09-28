
/**
 * 主界面 -> 首页 ->viewPager
 */
'use strict';

import React, { PureComponent, Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, FlatList, } from 'react-native';
import DesignConvert from '../../../utils/DesignConvert';
import Config from '../../../configs/Config';
import RoomCardItem from './RoomCardItem';
import HomePageModel from '../../../model/main/HomePageModel';
import ModelEvent from "../../../utils/ModelEvent";
import { EVT_LOGIC_ROOM_REFRESH_ROOM, } from "../../../hardcode/HLogicEvent";
import LinearGradient from 'react-native-linear-gradient';
import RoomInfoCache from '../../../cache/RoomInfoCache';
import RoomModel from '../../../model/room/RoomModel';

export default class RoomCardView extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            roomList: [],
        }
        this._loadMoreEnable = false;
    }

    componentDidMount() {
        // console.log("房间类型", this.props.roomType)
        //房间信息
        // message RoomInfo {
        // 	required string roomId = 1;//房间id
        // 	optional string roomName = 2;//房间名字
        // 	optional string createId = 3;//房主ID(厅的话是创厅会长id)
        // 	optional int32 onlineNum = 4;//在线人数
        // 	optional UserResult.UserBase base = 5;//主播用户基本信息(厅的话是当前大头位主播信息)
        // 	optional bool password = 6;//是否上锁
        // 	optional int32 roomType = 7;//房间类型
        // 	optional int32 lableId = 8;//房间标签Id
        // 	optional int32 logoTime = 9;//房间修改logo的时间 0为没修改过
        // 	optional UserResult.UserBase micUserBase = 10;//(男女)用户视觉不同的(异性)麦上嘉宾信息
        // 	optional bool homoMicUser = 11;//同性麦位上是否有人(true:有 false:没有)
        // 	optional int32 favourType = 12;//收藏类型(1:我关注的主播 2:我收藏的厅)
        // }
        ModelEvent.addEvent(null, EVT_LOGIC_ROOM_REFRESH_ROOM, this._initData);
        this._initData();
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_LOGIC_ROOM_REFRESH_ROOM, this._initData);
    }

    _initData = async () => {
        const roomList = await HomePageModel.getFunRoomList(this.props.roomType, true);
        // console.log("房间", roomList)
        if (roomList.length > 0) {
            this._loadMoreEnable = true;
        } else {
            this._loadMoreEnable = false;
        }
        this.setState({
            roomList,
        })

        //返回高度
        this._getHeightCallBack();
    }

    _getHeightCallBack = () => {
        let key = Date.now();
        // console.log('=======1', '_getHeightCallBack', key, Boolean(this.props.index && this.props.getHeightCallBack))
        let height = Math.ceil(this.state.roomList.length / 2.0) * DesignConvert.getH(230) + DesignConvert.getH(40);
        this.props.getHeightCallBack && this.props.getHeightCallBack(height, this.props.index, key)
    }

    _getRoomType = (roomType) => {
        let roomTypeName = "其他";
        this.props.roomTypeList.forEach(element => {
            if (roomType == element.id) {
                roomTypeName = element.type;
            }
        });
        return roomTypeName;
    }

    _onRefresh = () => {
        // this._initData();
        this.props.onRefreshData();
    }

    _loadMore = async () => {
        if (this._loadMoreEnable) {
            let roomList = await HomePageModel.getFunRoomList(this.props.roomType, false);
            if (roomList.length > 0) {
                this._loadMoreEnable = true;
                this.setState({
                    roomList,
                })
                //返回高度
                this._getHeightCallBack();
            } else {
                this._loadMoreEnable = false;
            }
        }
    }

    _renderItem = ({ item }) => {
        return (
            <RoomCardItem 
                data={item}
                getRoomType={this._getRoomType}/>
        )
    }

    _renderEmptyView = () => {
        return (
            <View
                style={[{
                    height: DesignConvert.getH(200),
                    // width: DesignConvert.swidth,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }, this.props.style]}>
                <Image
                    source={require('../../../hardcode/skin_imgs/main.js').no_live2()}
                    style={{
                        width: DesignConvert.getW(156),
                        height: DesignConvert.getH(96.5),
                    }}></Image>
                <Text style={{
                    marginTop: DesignConvert.getH(16.5),
                    color: '#797979',
                    fontSize: DesignConvert.getF(15),
                }}>暂无主播开播，去其他分类看看吧
                </Text>
            </View>
        );
    };

    _onScroll = ({
        nativeEvent: {
            contentInset: { bottom, left, right, top },
            contentOffset: { x, y },
            zoomScale
        }
    }) => {
        // console.log("_onScroll", y);
        this.props.onScroll(y);
    }

    render() {
        return (
            <FlatList
                onScroll={this._onScroll}
                numColumns={2}
                data={this.state.roomList}
                renderItem={this._renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={this._renderEmptyView}
                onRefresh={this._onRefresh}
                refreshing={false}
                onEndReached={this._loadMore}
                onEndReachedThreshold={0.2}
                initialNumToRender={6}
                scrollEnabled={false}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                }}
                style={{
                    flex: 1,
                    width: DesignConvert.swidth,
                    paddingHorizontal: DesignConvert.getW(15),
                }}
                ListFooterComponent={(
                    <View
                        style={{
                            height: DesignConvert.getH(100),
                        }}></View>
                )} />
        )
    }

}
