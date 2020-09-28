
/**
 * 房间 -> 在线
 */
'use strict';

import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Modal, PanResponder, Animated } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import BaseView from "../base/BaseView";
import BackTitleView from "../base/BackTitleView";
import RoomInfoCache from '../../cache/RoomInfoCache';
import LinearGradient from 'react-native-linear-gradient';
import SexAgeWidget from '../userinfo/SexAgeWidget';

export default class RoomBlackListView extends BaseView {

    constructor(props) {
        super(props);

        this._alertVisibility = false;

        this._list = [];

        this._roomId = RoomInfoCache.roomId;

        this._extraData = 0;
    }

    componentDidMount() {
        super.componentDidMount();

        this._initData()
    }

    _loadMore = () => {
        if (this._loadMoreEnable) {
            this._initData();
        }
    }

    _initData() {
        //获取玩家基本信息
        // message UserBase {
        //     required string userId = 1;//用户ID
        //     optional string nickName = 2;//用户昵称
        //     optional int32 logoTime = 3;//修改logo的时间 0为没修改过
        //     optional string thirdIconurl = 4;//第三方头像
        //     optional string headFrameId = 5;// 头像框
        //     optional int32 sex = 6; // 姓别 0 未知 1:男 2:女
        //     optional int32 age = 7; //年龄
        //     optional int32 vipLv = 8; //VIP等级
        //     optional string slogan = 9;//
        //     optional int32 contributeLv = 10;// 土豪等级
        //     optional string position = 11;//地标
        //     optional string channelId = 12;//用户渠道id
        //     optional int32 friendStatus = 13;// 好友状态
        // }
        require("../../model/room/BlackListModel").default.getRoomBlackList(this._roomId, this._list.length)
            .then(data => {
                this._loadMoreEnable = data.length != 0;
                if (data.length == 0) {
                    return;
                }

                this._list = this._list.concat(data);
                this._extraData++;
                this.forceUpdate();
            })
    }

    _alertRemove = (userId) => {
        this._removeUserId = userId;
        this._alertVisibility = !this._alertVisibility;
        this.forceUpdate();
    }

    _leave = () => {
        this.popSelf()
    }

    _renderItem = ({ item }) => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(50),
                    alignItems: "center",
                    marginBottom: DesignConvert.getH(25),
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        require("../../router/level2_router").showUserInfoView(item.userId);
                    }}
                >
                    <Image
                        source={{ uri: require("../../configs/Config").default.getHeadUrl(item.userId, item.logoTime, item.thirdIconurl) }}
                        style={{
                            width: DesignConvert.getW(50),
                            height: DesignConvert.getH(50),
                            borderRadius: DesignConvert.getW(25),
                            marginLeft: DesignConvert.getW(23),
                        }}></Image>
                </TouchableOpacity>

                <View
                    style={{
                        marginLeft: DesignConvert.getW(14),
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: "#212121",
                                fontSize: DesignConvert.getF(14),
                                marginRight: DesignConvert.getW(2),

                                maxWidth: DesignConvert.getW(100),
                            }}
                            numberOfLines={1}
                        >{decodeURI(item.nickName)}</Text>

                        <SexAgeWidget 
                            sex={item.sex}
                            age={item.age}
                        />
                    </View>

                    <Text
                        style={{
                            color: "#969696",
                            fontSize: DesignConvert.getF(11),
                            marginTop: DesignConvert.getH(3.5),
                            lineHeight: DesignConvert.getH(15),
                        }}
                    >{`ID: ${item.userId}`}</Text>
                </View>

                <TouchableOpacity
                    onPress={this._fnRemoveUserId.bind(this, item.userId)}
                    style={{
                        position: 'absolute',
                        right: DesignConvert.getW(23),
                        top: DesignConvert.getH(7.5),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#C94CF8', '#9758F8']}

                        style={{
                            width: DesignConvert.getW(60),
                            height: DesignConvert.getH(35),
                            borderRadius: DesignConvert.getW(17),
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: DesignConvert.getF(12),
                            }}
                        >{'解除'}</Text>
                    </LinearGradient>
                    
                </TouchableOpacity>
            </View>
        )
    }

    _remove = () => {
        if (!this._removeUserId) return;

        require("../../model/room/BlackListModel").default._onRemoveBlackList(
            this._removeUserId,
            (bool) => {
                if (bool) {
                    for (let i = 0; i < this._list.length; i++) {
                        if (this._list[i].userId === this._removeUserId) {
                            this._list.splice(i, 1);
                            break;
                        }
                    }
                    this._extraData++;
                    this.forceUpdate();
                }
                this._alertRemove();
            }
        )
    }

    _fnRemoveUserId = (userId) => {
        require("../../model/room/BlackListModel").default._onRemoveBlackList(
            userId,
            (bool) => {
                if (bool) {
                    for (let i = 0; i < this._list.length; i++) {
                        if (this._list[i].userId === userId) {
                            this._list.splice(i, 1);
                            break;
                        }
                    }
                    this._extraData++;
                    this.forceUpdate();
                }
                this._alertRemove();
            }
        )
    }

    _keyExtractor = (item, index) => item.userId;

    render() {

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                }}
            >

                <BackTitleView
                    onBack={this._leave}
                    titleText={'房间黑名单'}
                />

                <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(0.5),
                        backgroundColor: '#F1F1F1',
                        marginBottom: DesignConvert.getH(23.5),
                    }}
                />

                {/* <Text
                    style={{
                        fontSize: DesignConvert.getF(11),
                        color: '#C7C7C7',
                        textAlign: 'center',
                        width: DesignConvert.getW(209),
                        marginTop: DesignConvert.getH(20),
                    }}
                >
                    {'被拉黑的用户无法看到以及进入你创建的房间，也无法关注你或向你发消息。'}
                </Text> */}

                <FlatList
                    data={this._list}
                    renderItem={this._renderItem}
                    extraData={this._extraData}
                    // onEndReached={this._loadMore}
                    // onEndReachedThreshold={0.2}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={this._keyExtractor}
                />

                {/* 移除黑名单的提示弹窗 */}
                {/* <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this._alertVisibility}
                    onRequestClose={() => { }}>
                    <View
                        style={{
                            flex: 1,
                            width: DesignConvert.swidth,
                            height: DesignConvert.sheight,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                width: DesignConvert.getW(268),
                                height: DesignConvert.getH(100),
                                borderRadius: DesignConvert.getW(7),
                                backgroundColor: '#F2F2F2CC',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    width: DesignConvert.getW(268),
                                    height: DesignConvert.getH(56),
                                    lineHeight: DesignConvert.getH(56),
                                    fontSize: DesignConvert.getF(17),
                                    color: '#000000',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                {'是否解除黑名单？'}
                            </Text>
                            <View
                                style={{
                                    width: DesignConvert.getW(268),
                                    height: DesignConvert.getH(0.5),
                                    backgroundColor: '#3C3C43',
                                    opacity: 0.29,
                                }}
                            />
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={this._alertRemove}
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: DesignConvert.getF(16),
                                            color: '#007AFF',
                                        }}
                                    >
                                        {'取消'}
                                    </Text>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        width: DesignConvert.getW(0.5),
                                        height: DesignConvert.getH(43.5),
                                        backgroundColor: '#3C3C43',
                                        opacity: 0.29,
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={this._remove}
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: DesignConvert.getF(16),
                                            color: '#007AFF',
                                        }}
                                    >
                                        {'确定'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal> */}

            </View>
        )
    }
}