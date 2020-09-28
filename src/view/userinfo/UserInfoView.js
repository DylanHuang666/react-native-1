
/**
 * 首页 -> 个人主页
 */
'use strict';

import React, { PureComponent, Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, Clipboard, Animated, DevSettings, Platform, StyleSheet } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator, ViewPager } from 'rn-viewpager';
import LinearGradient from 'react-native-linear-gradient';
import DesignConvert from '../../utils/DesignConvert';
import Config from '../../configs/Config';
import BackTitleView from '../base/BackTitleView';
import StatusBarView from "../base/StatusBarView";
import BaseView from '../base/BaseView';
import { ic_back_black } from "../../hardcode/skin_imgs/common";
import ToastUtil from "../base/ToastUtil";
import ModelEvent from "../../utils/ModelEvent";
import { EVT_LOGIC_UPDATE_USER_INFO } from "../../hardcode/HLogicEvent";
import UserInfoCache from '../../cache/UserInfoCache';
import { bg_cover, icon_copy, mine_info_bg, no_gift_bg, gift_bg, ic_focus, gift_icon } from '../../hardcode/skin_imgs/user_info';
import { user_bg_cover, icon_woman, icon_man } from '../../hardcode/skin_imgs/mine';
import { back_white } from '../../hardcode/skin_imgs/anchorincome';
import MedalWidget from './MedalWidget';

export default class UserInfoView extends BaseView {
    constructor(props) {
        super(props);

        this._userId = this.props.params.userId;
        this._cutenumber = null//靓号
        this._cuteIcon = null//靓号icon
        this._isMyself = this._userId == UserInfoCache.userId;
        this._cuteNumber = null;
        this._userInfo = undefined;
        this._isAttention = false;
        this._isPullBlack = false;
        this._avatar = null;

        this._nickName = "暂无昵称";
        this._richLv = 1;
        this._charmLv = 1;
        this._myLoves = 0;
        this._fans = 0;
        this._sex = 1;
        this._age = 18;
        this._birthday = "";

        this._giftList = [];
        this._alpha = 0;
        this._isTop = true;
        // 所在房间的相关信息
        this._userRoomInfo = null;
        this._userRoomType = null;
        this._userRoomLiverName = null;
        this._userRoomLiverId = null;
        this._userRoomOnline = 0;

        this._showUserInfo = true;
        this._height = 0;
    }

    _onBackPress = () => {
        this.popSelf();
    }

    _onMenuPress = () => {
        if (this._isMyself) {
            require("../../router/level2_router").showUserInfoEditView();
        } else {
            require("../../router/level3_router").showInfoDialog(this._pullBlackPressPress, this._reportPress, this._isAttention ? this._cancelAttentionPress : undefined, this._isPullBlack)
        }
    }

    _onCopyPress = () => {
        Clipboard.setString(this._userId);
        ToastUtil.showCenter("复制成功");
    }

    _onChatPress = () => {
        require("../../router/level2_router").showChatView(this._userId, decodeURI(this._userInfo.nickName), false);
    }

    //举报
    _reportPress = () => {
        require("../../router/level3_router").showReportDialog(this._userId, 1);
    }

    _pullBlackPressPress = async (action) => {
        // 操作类型：true-拉黑 false-解除拉黑
        let res = require("../../model/userinfo/UserInfoModel").default.pullBlackStatus(this._userId, action);

        if (res) {
            this._isPullBlack = action;
        } else {
            this._isAttention = !action;
        }
        this._initData();
        this.forceUpdate();
    }

    _cancelAttentionPress = async () => {
        let res = require("../../model/userinfo/UserInfoModel").default.addLover(this._userId, false);

        if (res) {
            this._isAttention = false;
        } else {
            this._isAttention = true;
        }
        this._initData();
    }

    _onAttentionPress = async () => {
        if (this._isAttention) return
        let res = require("../../model/userinfo/UserInfoModel").default.addLover(this._userId, true);

        if (res) {
            ToastUtil.showCenter("关注成功");
            this._isAttention = true;
        } else {
            ToastUtil.showCenter("关注失败");
            this._isAttention = false;
        }
        ModelEvent.dispatchEntity(null, EVT_LOGIC_UPDATE_USER_INFO, null);
        this.forceUpdate();
    }

    _setHeight = ({ nativeEvent: { layout: { x, y, width, height } } }) => {
        this._height = height;
        this.forceUpdate()
    };

    _renderEmptyView = () => {
        return (
            <View
                // source={no_gift_bg()}
                style={{
                    width: DesignConvert.getW(347),
                    height: DesignConvert.getH(224),
                    justifyContent: "center",
                    alignItems: "center",
                    resizeMode: 'contain',
                    // marginTop: DesignConvert.getH(13),
                }}>
                <Image
                    style={{
                        width: DesignConvert.getW(82),
                        height: DesignConvert.getH(82),
                    }}
                    source={require("../../hardcode/skin_imgs/user_info").no_gift()}
                />
                <Text
                    style={{
                        marginTop: DesignConvert.getH(10),
                        fontSize: DesignConvert.getF(12),
                        color: '#CCCCCC',
                    }}>暂无内容</Text>
            </View>
        )
    }

    _renderItem = ({ item }) => {
        return (
            <View
                style={{
                    marginTop: DesignConvert.getH(10),
                    marginHorizontal: DesignConvert.getW(14),
                    alignItems: 'center',
                    width: DesignConvert.getW(80),
                    // height: DesignConvert.getH(80),
                    // margin: DesignConvert.getW(5),
                    justifyContent: "center",
                }}>
                {/* <View
                    style={{
                        width: DesignConvert.getW(73),
                        height: DesignConvert.getH(73),
                        backgroundColor: '#F6F6F6',
                        borderRadius: DesignConvert.getW(50),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                > */}
                <Image
                    resizeMode="contain"
                    source={{ uri: Config.getGiftUrl(item.giftId, item.logoTime) }}
                    style={{
                        width: DesignConvert.getW(80),
                        height: DesignConvert.getH(80),
                    }}></Image>
                {/* </View> */}



                <Text
                    numberOfLines={1}
                    style={{
                        color: "#121212",
                        width: DesignConvert.getW(80),
                        fontSize: DesignConvert.getF(14),
                        marginTop: DesignConvert.getH(5),
                        textAlign: "center",
                    }}>{item.giftname}</Text>

                <Text
                    style={{
                        color: "#949494",
                        fontSize: DesignConvert.getF(11),
                        marginTop: DesignConvert.getH(2),
                    }}>X{item.num}</Text>
            </View>
        )
    }
    // 个性签名区域
    _renderPersonalSignature = () => {
        return (
            <View
                style={{
                    marginTop: DesignConvert.getH(20),
                    marginLeft: DesignConvert.getW(24),
                    display: this._isMyself ? 'none' : 'flex'
                }}
            >
                <Text
                    style={{
                        color: '#333333',
                        fontSize: DesignConvert.getF(13)
                    }}
                >填写个性签名更容易获得别人的关注哦</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: DesignConvert.getH(9)
                    }}
                >
                    <Text
                        style={{
                            paddingRight: DesignConvert.getW(5),
                            paddingLeft: DesignConvert.getW(5),
                            fontSize: DesignConvert.getF(8),
                            color: '#FFFFFF',
                            borderRadius: DesignConvert.getW(3),
                            backgroundColor: '#31DDC1',
                            marginRight: DesignConvert.getW(6)
                        }}
                    >可爱</Text>
                    <Text
                        style={{
                            paddingRight: DesignConvert.getW(5),
                            paddingLeft: DesignConvert.getW(5),
                            fontSize: DesignConvert.getF(8),
                            color: '#FFFFFF',
                            borderRadius: DesignConvert.getW(3),
                            backgroundColor: '#5AC4FF',
                            marginRight: DesignConvert.getW(6)
                        }}
                    >甜美声优</Text>
                    <Text
                        style={{
                            paddingRight: DesignConvert.getW(5),
                            paddingLeft: DesignConvert.getW(5),
                            fontSize: DesignConvert.getF(8),
                            color: '#FFFFFF',
                            borderRadius: DesignConvert.getW(3),
                            backgroundColor: '#FFB95D',
                            marginRight: DesignConvert.getW(6)
                        }}
                    >清新</Text>
                </View>
            </View>
        )
    }

    // 所在房间区域
    _renderRomm = () => {
        if (!this._userInfo || !this._userInfo.roomId) {
            return null
        }
        return (
            <TouchableOpacity
                style={{
                    marginTop: DesignConvert.getH(20),
                    marginLeft: DesignConvert.getW(24),
                    display: this._isMyself ? 'none' : 'flex',
                    // position: 'relative',
                    // zIndex: 123
                }}
                onPress={this._entryRoom}
            >
                <Text
                    style={{
                        color: '#333333',
                        fontSize: DesignConvert.getF(13)
                    }}
                >所在房间</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: DesignConvert.getH(12)
                    }}
                >
                    <Image
                        source={{
                            uri: !this._userRoomLiver ? "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3577141119,761328819&fm=26&gp=0.jpg" :
                                Config.getHeadUrl(this._userRoomLiver.userId, this._userRoomLiver.logoTime, this._userRoomLiver.thirdIconurl, DesignConvert.getW(60))
                        }}
                        style={{
                            width: DesignConvert.getW(60),
                            height: DesignConvert.getH(60),
                            borderRadius: DesignConvert.getW(30),
                        }}
                    ></Image>
                    <View
                        style={{
                            justifyContent: 'space-between',
                            marginLeft: DesignConvert.getW(12)
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={["#C748FF", "#932EFF"]}
                                style={{
                                    width: DesignConvert.getW(28),
                                    height: DesignConvert.getH(14),
                                    marginRight: DesignConvert.getW(6),
                                    marginTop: DesignConvert.getH(1),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: DesignConvert.getW(4)
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: DesignConvert.getF(10),
                                        color: '#FFFFFF'
                                    }}
                                >心动</Text>
                            </LinearGradient>
                            <Text
                                style={{
                                    fontSize: DesignConvert.getF(14),
                                    color: '#333333'
                                }}
                            >{!this._userInfo || !this._userInfo.roomId ? "不在房间内" : decodeURI(this._userInfo.roomName)}</Text>
                        </View>
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(12),
                                color: '#999999'
                            }}
                        >{!this._userRoomLiver ? "不在房间内" : '[房主]' + decodeURI(this._userRoomLiver.nickName)}</Text>
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(12),
                                color: '#999999'
                            }}
                        >{!this._userRommOnlineNum ? '不在房间内' : '人气' + this._userRommOnlineNum}</Text>
                    </View>

                </View>
            </TouchableOpacity >
        )

    }

    _onCacheUpdated = () => {
        this.forceUpdate();
    }

    _initData = () => {
        require('../../model/userinfo/UserInfoModel').default.getGoodId(this._userId)
            .then(data => {
                if (data) {
                    //设置靓号
                    this._cutenumber = data.cutenumber
                    this._cuteIcon = data.icon
                } else {
                    //没有靓号
                    this._cutenumber = null
                    this._cuteIcon = null
                }
                this.forceUpdate()
            })
        require("../../model/userinfo/UserInfoModel").default.getPersonPage(this._userId)
            .then(data => {
                if (!data) {
                    ToastUtil.showBottom("获取信息失败");
                }
                this._userInfo = data;
                this._nickName = decodeURI(data.nickName);
                this._richLv = data.contributeLv;
                this._charmLv = data.charmLv;
                this._myLoves = data.myLoves;
                this._fans = data.friends;
                this._sex = data.sex;
                this._avatar = { uri: require("../../configs/Config").default.getHeadUrl(data.userId, data.logoTime, data.thirdIconurl) };
                this._age = data.age;
                this._birthday = data.birthday;
                this._isAttention = this._userInfo.friendStatus == 1 || this._userInfo.friendStatus == 2;
                this._isPullBlack = this._userInfo.pullBlackStatus == 6;
                this._slogan = this._userInfo.slogan;
                this.forceUpdate();
                if (!data.roomId) return null
                require("../../model/userinfo/UserInfoModel").default.getUserRoom(data.roomId)
                    .then(data => {
                        if (!data) {
                            // ToastUtil.showBottom("获取信息失败");
                            return null
                        }
                        this._userRoomInfo = data;
                        // console.log('房间信息', 'roomtype', decodeURI(data.roomType))
                        this._userRoomType = data.roomType;
                        this._userRoomLiverName = data.anchorData.nickName;
                        this._userRoomInfo = data.anchorData;
                        this.forceUpdate();
                    })
                require("../../model/userinfo/UserInfoModel").default.getUserRoomOnline(data.roomId)
                    .then(data => {
                        if (!data) {
                            // ToastUtil.showBottom("获取信息失败");
                            return null
                        }
                        this._userRoomOnline = data.onlineNum;
                        this.forceUpdate();
                    })

            });
        require("../../model/userinfo/UserInfoModel").default.getReceiveGiftsByChange(this._userId)
            .then(data => {
                this._giftList = data;
                this.forceUpdate();
            });
    }

    _onScroll = ({
        nativeEvent: {
            contentInset: { bottom, left, right, top },
            contentOffset: { x, y },
            zoomScale
        }
    }) => {
        // console.log("_onScroll", y);
        if (y <= 70) {
            this._alpha = y / 70;
            // console.log("this._alpha", this._alpha);
            this._isTop = y <= 0;
            this.forceUpdate();
        } else {
            this._alpha = 1;
            this.forceUpdate();
        }
    }

    _entryRoom = () => {
        require('../../model/room/RoomModel').default.enterLiveRoom(this._userInfo.roomId, 0);
    }

    componentDidMount() {
        super.componentDidMount();

        ModelEvent.addEvent(null, EVT_LOGIC_UPDATE_USER_INFO, this._initData);
        this._initData();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        ModelEvent.removeEvent(null, EVT_LOGIC_UPDATE_USER_INFO, this._initData);
    }

    _renderMyInfo = () => {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    // height: DesignConvert.getH(135),
                    // borderTopLeftRadius: DesignConvert.getW(20),
                    // borderTopRightRadius: DesignConvert.getW(20),
                    // backgroundColor: '#FFFFFF',
                    // paddingLeft: DesignConvert.getW(30),
                    flexDirection: 'row',
                    marginTop: DesignConvert.getH(69) + DesignConvert.statusBarHeight,
                    paddingHorizontal: DesignConvert.getW(15),
                }}
            >
                <TouchableOpacity
                    style={{
                        // position: 'absolute',
                        // top: DesignConvert.getHeight(-60),
                        // left: DesignConvert.getW(30),
                        borderRadius: DesignConvert.getW(10),
                    }}
                    onPress={this._onAvatarPress}
                >
                    <Image
                        source={this._avatar}
                        style={{
                            // resizeMode: 'stretch',
                            width: DesignConvert.getW(80),
                            height: DesignConvert.getH(80),
                            borderRadius: DesignConvert.getW(40),
                            borderWidth: DesignConvert.getW(1.5),
                            borderColor: '#FFFFFF'
                        }}
                    />
                    {this._userRoomInfo && <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#8E7AFF', '#C17AFF']}
                        style={{
                            width: DesignConvert.getW(49),
                            height: DesignConvert.getH(23),
                            borderRadius: DesignConvert.getW(12),
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: DesignConvert.getH(-8),
                            left: DesignConvert.getW(16),
                        }}>
                        <View style={{
                            width: DesignConvert.getW(5),
                            height: DesignConvert.getH(5),
                            borderRadius: DesignConvert.getW(5),
                            backgroundColor: '#4CF267',
                        }} />
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(12),
                                color: '#FFFFFF',
                                marginLeft: DesignConvert.getW(6),
                            }}>在线</Text>
                    </LinearGradient>}
                </TouchableOpacity>
                <View
                    style={{
                        marginLeft: DesignConvert.getW(10),
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: DesignConvert.getH(5),
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            numberOfLines={1}
                            style={{
                                maxWidth: DesignConvert.getW(200),
                                color: "#FFFFFF",
                                fontSize: DesignConvert.getF(14),
                                // fontWeight: "bold",
                            }}>{this._nickName}
                        </Text>
                        {this._renderMySex()}
                    </View>

                    {this._renderIcon()}

                    {this._renderMyId()}

                    {/* <Text
                        numberOfLines={2}
                        style={{
                            maxWidth: DesignConvert.getW(309.5),
                            marginTop: DesignConvert.getH(10),
                            color: '#212121',
                            fontSize: DesignConvert.getF(13),
                            lineHeight: DesignConvert.getH(18.5),
                        }}
                    >签名：{this._slogan ? this._slogan : '这个人还什么都没有留下~'}</Text>
                    {this._renderFansAndFouc()} */}
                </View>
            </View>
        )
    }

    _renderMySex = () => {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={this._sex === 2 ? ['#65C5FFFF', '#8BDAFFFF'] : ['#65C5FF', '#8BDAFF']}
                style={{
                    width: DesignConvert.getW(34),
                    height: DesignConvert.getH(18),
                    marginLeft: DesignConvert.getW(5),
                    borderRadius: DesignConvert.getW(9),
                    borderWidth: DesignConvert.getW(1.5),
                    borderColor: '#5F1271',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    source={this._sex === 2 ? require("../../hardcode/skin_imgs/mine").mine_female() : require("../../hardcode/skin_imgs/mine").mine_male()}
                    style={{
                        marginRight: DesignConvert.getW(3),
                        width: DesignConvert.getW(9),
                        height: DesignConvert.getHeight(9),
                        // resizeMode: 'contain'
                    }}
                />
                <Text style={{
                    fontSize: DesignConvert.getF(11),
                    color: '#FFFFFF',
                }}>{this._age}</Text>
            </LinearGradient>
        )
    }

    _renderIcon = () => {
        return (
            <View
                style={{
                    marginTop: DesignConvert.getH(9),
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                {/* {this._renderMySex()} */}
                <Image
                    source={this._userInfo ? require('../../hardcode/skin_imgs/main').mine_rich_lv(this._userInfo.contributeLv) : {}}
                    style={{
                        width: DesignConvert.getW(46),
                        height: DesignConvert.getH(17),
                        marginRight: DesignConvert.getW(5),
                        resizeMode: 'contain'
                    }}
                />
                <Image
                    source={this._userInfo ? require('../../hardcode/skin_imgs/main').mine_charm_lv(this._userInfo.charmLv) : {}}
                    style={{
                        width: DesignConvert.getW(46),
                        height: DesignConvert.getH(17),
                        marginRight: DesignConvert.getW(5),
                        resizeMode: 'contain'
                    }}
                />
            </View>
        )

    }

    _renderMyId = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // width: DesignConvert.swidth,
                    // justifyContent: 'flex-end',
                    // paddingRight: DesignConvert.getW(15),
                    marginTop: DesignConvert.getH(8),
                }}
            >
                <View
                    style={{
                        width: DesignConvert.getW(21),
                        height: DesignConvert.getH(21),
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: DesignConvert.getW(5),
                        display: this._cuteIcon ? 'flex' : 'none',
                    }}
                >
                    <Image
                        style={{
                            width: DesignConvert.getW(21),
                            height: DesignConvert.getH(21),
                            resizeMode: 'contain',
                        }}
                        source={{ uri: this._cuteIcon }}
                    />
                </View>
                {/* <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#8A50FC', '#DD56FF']}
                    style={{
                        flexDirection: 'row',
                        width: DesignConvert.getW(105),
                        height: DesignConvert.getH(21),
                        borderRadius: DesignConvert.getW(5),
                        alignItems: 'center',
                    }}
                > */}
                <Text
                    style={{
                        fontSize: DesignConvert.getF(11),
                        fontWeight: "normal",
                        color: 'rgba(255, 255, 255, 1)',
                        borderRadius: DesignConvert.getW(4),
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        paddingHorizontal: DesignConvert.getW(3),
                    }}>ID</Text>
                <Text
                    style={{
                        fontSize: DesignConvert.getF(11),
                        fontWeight: "normal",
                        color: 'rgba(255, 255, 255, 1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        borderRadius: DesignConvert.getW(4),
                        paddingHorizontal: DesignConvert.getW(5),
                        marginLeft: DesignConvert.getW(5),
                    }}>{this._cutenumber ? this._cutenumber : this._userId}</Text>
                {/* <View
                        style={{
                            width: DesignConvert.getW(1),
                            height: DesignConvert.getH(12),
                            backgroundColor: 'rgba(255, 255, 255, 0.6)'
                        }}
                    /> */}
                <TouchableOpacity
                    style={{
                        paddingLeft: DesignConvert.getW(3),
                    }}
                    onPress={this._onCopyPress}>
                    <Image
                        source={icon_copy()}
                        style={{
                            marginLeft: DesignConvert.getW(5),
                            width: DesignConvert.getW(12),
                            height: DesignConvert.getH(12),
                            resizeMode: 'contain',
                        }} />
                    {/* <Text
                            style={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: DesignConvert.getF(11)
                            }}
                        >复制</Text> */}
                </TouchableOpacity>
                {/* </LinearGradient> */}
            </View>
        )
    }

    _renderFansAndFouc = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: DesignConvert.getH(8),
                    // position: 'absolute',
                    // top: DesignConvert.getH(15),
                    // right: DesignConvert.getW(25)
                }}
            >


                <TouchableOpacity
                    onPress={this._onMyLovesPress}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text
                        style={{
                            marginBottom: DesignConvert.getH(3),
                            color: "#1D1D1D",
                            fontSize: DesignConvert.getF(13),
                            fontWeight: "bold",
                        }}>{this._myLoves}</Text>

                    <Text
                        style={{
                            color: "#A3A3A3",
                            fontSize: DesignConvert.getF(10),
                        }}>关注</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this._onFansPress}
                    style={{
                        marginLeft: DesignConvert.getW(40),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text
                        style={{
                            marginBottom: DesignConvert.getH(3),
                            color: "#1D1D1D",
                            fontSize: DesignConvert.getF(13),
                            fontWeight: "bold",
                        }}>{this._fans}</Text>

                    <Text
                        style={{
                            color: "#A3A3A3",
                            fontSize: DesignConvert.getF(10),
                        }}>粉丝</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _renderUserId = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: DesignConvert.getH(5)
                }}
            >
                <Text
                    style={{
                        width: DesignConvert.getW(12),
                        height: DesignConvert.getH(12),
                        borderRadius: DesignConvert.getW(2),
                        backgroundColor: '#00D8C9',

                        color: '#FFFFFF',
                        fontSize: DesignConvert.getF(9),
                        textAlign: 'center',
                        display: this._cutenumber ? 'flex' : 'none'
                    }}
                >靓</Text>
                <Text
                    style={{
                        fontSize: DesignConvert.getF(13),
                        color: '#B8B8B8',
                    }}>ID:{this._cutenumber ? this._cutenumber : this._userId}</Text>
                <TouchableOpacity
                    style={{
                        marginLeft: DesignConvert.getW(5),
                        marginTop: DesignConvert.getH(4)
                    }}
                    onPress={this._onCopyPress}>
                    <Image
                        source={require("../../hardcode/skin_imgs/main").mine_icon_copy()}
                        style={{
                            width: DesignConvert.getW(10),
                            height: DesignConvert.getH(10),
                            tintColor: "#666666",
                        }}></Image>
                </TouchableOpacity>
            </View>

        )
    }

    _renderUserIcon = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    // borderRadius: DesignConvert.getF(15),
                    marginTop: DesignConvert.getH(10)
                }}
            >
                <View
                    style={{
                        width: DesignConvert.getW(34),
                        height: DesignConvert.getH(14),
                        backgroundColor: this._userInfo && this._userInfo.sex === 2 ? '#FF65B2' : '#3BACFF',
                        // backgroundColor: 'red',
                        marginRight: DesignConvert.getW(5),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: DesignConvert.getF(7),
                    }}
                >
                    <Image
                        source={this._userInfo ? this._userInfo.sex === 2 ? require("../../hardcode/skin_imgs/registered").ic_default_female() : require("../../hardcode/skin_imgs/registered").ic_default_male() : require("../../hardcode/skin_imgs/registered").ic_default_male()}
                        style={{
                            width: DesignConvert.getW(8),
                            height: DesignConvert.getH(8),
                            tintColor: 'white'
                        }}></Image>

                    <Text
                        style={{
                            color: "#FFFFFF",
                            fontSize: DesignConvert.getF(10),
                            marginLeft: DesignConvert.getW(5),
                        }}>{!this._userInfo ? "18岁" : this._userInfo.age}</Text>
                </View>
                <Image
                    source={require("../../hardcode/skin_imgs/main").mine_rich_lv(!this._userInfo ? 1 : this._userInfo.contributeLv)}
                    style={{
                        width: DesignConvert.getW(31),
                        height: DesignConvert.getH(14),
                        marginRight: DesignConvert.getW(5),
                        resizeMode: 'contain'
                    }}></Image>

                <Image
                    source={require("../../hardcode/skin_imgs/main").mine_charm_lv(!this._userInfo ? 1 : this._userInfo.charmLv)}
                    style={{
                        width: DesignConvert.getW(31),
                        height: DesignConvert.getH(14),
                        resizeMode: 'contain'
                    }}></Image>
            </View>
        )
    }

    _renderMyLoveAndMyFriend = () => {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: DesignConvert.getH(28),
                    right: DesignConvert.getW(15),
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end'
                }}
            >

                <View
                    style={{
                        display: this._isMyself ? 'flex' : 'none',
                        alignItems: 'flex-end'
                    }}
                >
                    <Text
                        style={{
                            color: '#1D1D1D',
                            fontSize: DesignConvert.getF(13),
                        }}
                    >{!this._userInfo ? 0 : this._userInfo.myLoves}</Text>
                    <Text
                        style={{
                            color: '#B8B8B8',
                            fontSize: DesignConvert.getF(11),
                            marginTop: DesignConvert.getH(5)
                        }}
                    >关注</Text>
                </View>

                <Text
                    style={{
                        color: '#1D1D1D',
                        fontSize: DesignConvert.getF(13),
                        marginTop: DesignConvert.getH(15)
                    }}
                >{!this._userInfo ? 0 : this._userInfo.friends}</Text>
                <Text
                    style={{
                        color: '#B8B8B8',
                        fontSize: DesignConvert.getF(11),
                        marginTop: DesignConvert.getH(5)
                    }}
                >粉丝</Text>
            </View>
        )
    }

    _renderFocusButton = () => {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: DesignConvert.getH(15),
                    right: DesignConvert.getW(15),
                }}
            >
                <TouchableOpacity
                    style={{

                        flexDirection: 'row',
                        borderRadius: DesignConvert.getW(11),
                        borderWidth: this._isAttention ? DesignConvert.getW(1) : 0,
                        borderColor: this._isAttention ? '#D2D2D2' : ''
                    }}
                    onPress={this._onAttentionPress}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={this._isAttention ? ["white", "white"] : ["#00DCFF", "#00D8C9"]}
                        style={{
                            width: DesignConvert.getW(48),
                            height: DesignConvert.getW(22),
                            borderRadius: DesignConvert.getW(11),
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: this._isMyself ? 'none' : 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Image
                            source={require("../../hardcode/skin_imgs/user_info").info_follow()}
                            style={{
                                width: DesignConvert.getW(10),
                                height: DesignConvert.getH(10),
                                resizeMode: 'contain',
                                display: this._isAttention ? 'none' : 'flex',
                                marginRight: DesignConvert.getW(3)
                            }}
                        ></Image>
                        <Text
                            style={{
                                color: this._isAttention ? '#D2D2D2' : '#FFFFFF',
                                fontSize: DesignConvert.getF(11),
                            }}
                        >{this._isAttention ? '已关注' : '关注'}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }

    _renderRoomInfo = () => {
        if (this._isMyself) return null
        return (
            <TouchableOpacity
                onPress={this._entryRoom}
                style={{
                    marginTop: DesignConvert.getH(25),
                    marginLeft: DesignConvert.getW(20),
                    display: !this._userInfo || !this._userInfo.roomId ? "none" : "flex",
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <Image
                        style={{
                            width: DesignConvert.getW(22),
                            height: DesignConvert.getH(22),
                            resizeMode: 'contain'
                        }}
                        source={require("../../hardcode/skin_imgs/user_info").right_bar_bg()}
                    />
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(13),
                            color: 'rgba(29, 29, 29, 1)',
                            marginLeft: DesignConvert.getW(10),
                        }}
                    >
                        Ta正在玩的聊天室
                                </Text>
                </View>
                <View
                    style={{
                        marginTop: DesignConvert.getH(25),
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}
                >
                    <Image
                        source={{
                            uri: !this._userRoomInfo ? "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3577141119,761328819&fm=26&gp=0.jpg" :
                                Config.getHeadUrl(this._userRoomInfo.userId, this._userRoomInfo.logoTime, this._userRoomInfo.thirdIconurl, DesignConvert.getW(50))
                        }}
                        style={{
                            width: DesignConvert.getW(60),
                            height: DesignConvert.getH(60),
                            resizeMode: 'contain'
                        }}
                    />
                    <View
                        style={{
                            marginLeft: DesignConvert.getW(10),

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
                                    paddingLeft: DesignConvert.getW(5),
                                    paddingRight: DesignConvert.getW(5),
                                    marginTop: DesignConvert.getH(1),
                                    width: DesignConvert.getW(34),
                                    height: DesignConvert.getH(18),
                                    borderWidth: DesignConvert.getW(1),
                                    borderColor: 'rgba(255, 136, 188, 1)',
                                    borderRadius: DesignConvert.getF(5),
                                    textAlign: 'center',
                                    // justifyContent: 'center',
                                    color: 'rgba(255, 136, 188, 1)',
                                    fontSize: DesignConvert.getF(11)
                                }}
                            >
                                {/* {this._userRoomType} */}
                                        情感
                                    </Text>
                            <Text
                                numberOfLines={1}
                                style={{
                                    marginLeft: DesignConvert.getW(10),
                                    color: "rgba(29, 29, 29, 1)",
                                    fontSize: DesignConvert.getF(11),
                                }}>{!this._userInfo || !this._userInfo.roomId ? "1232" : decodeURI(this._userInfo.roomName)}</Text>
                        </View>


                        <Text
                            style={{
                                color: 'rgba(174, 174, 174, 1)',
                                fontSize: DesignConvert.getF(11),
                                marginTop: DesignConvert.getH(12)
                            }}
                        >
                            [房主]{this._userRoomLiverName ? decodeURI(this._userRoomLiverName) : ''}
                        </Text>


                    </View>
                    <View
                        style={{
                            marginLeft: DesignConvert.getW(90),
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: 'rgba(122, 97, 255, 1)',
                                fontSize: DesignConvert.getF(13)
                            }}
                        >{this._userRoomOnline ? this._userRoomOnline : ''}</Text>
                        <Text
                            style={{
                                color: 'rgba(174, 174, 174, 1)',
                                fontSize: DesignConvert.getF(11)
                            }}
                        >
                            在线
                                        </Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }
    render() {
        const headImg = !this._userInfo ? "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3577141119,761328819&fm=26&gp=0.jpg" :
            Config.getHeadUrl(this._userInfo.userId, this._userInfo.logoTime, this._userInfo.thirdIconurl)
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    marginTop: Platform.OS === 'ios' ? -DesignConvert.statusBarHeight : 0,
                }}>
                <ScrollView
                    style={{
                    }}
                    onScroll={this._onScroll}
                    showsVerticalScrollIndicator={false}>
                    {/* <View
                        style={{
                            width: DesignConvert.swidth,
                            height: DesignConvert.getH(374),
                            marginBottom: DesignConvert.getH(24)
                        }}> */}
                    <ImageBackground
                        // source={require('../../hardcode/skin_imgs/main').mine_top_bg()}
                        source={{ uri: headImg }}
                        style={{
                            width: DesignConvert.getW(375),
                            height: DesignConvert.getH(260),
                            alignItems: 'center',
                        }}>

                        {this._renderMyInfo()}
                        {/* {this._renderMyId()} */}

                        {/* <View
                            style={{
                                width: DesignConvert.getW(345),
                                height: DesignConvert.getH(139),
                                borderRadius: DesignConvert.getW(10),
                                marginTop: DesignConvert.getH(166),
                                paddingLeft: DesignConvert.getW(15),
                                backgroundColor: 'white'
                            }}
                        >
                            <Image
                                source={{
                                    uri: headImg
                                }}
                                style={{
                                    position: 'absolute',
                                    borderWidth: DesignConvert.getW(1),
                                    borderColor: 'white',
                                    left: DesignConvert.getW(15),
                                    top: DesignConvert.getH(-30),
                                    width: DesignConvert.getW(60),
                                    height: DesignConvert.getH(60),
                                    borderRadius: DesignConvert.getW(40)
                                }}
                            />
                            <Text
                                numberOfLines={1}
                                style={{
                                    color: "#1D1D1D",
                                    maxWidth: DesignConvert.getW(150),
                                    fontSize: DesignConvert.getF(15),
                                    marginRight: DesignConvert.getW(13),
                                    fontWeight: "bold",
                                    marginTop: DesignConvert.getH(40)
                                }}>{!this._userInfo ? "" : decodeURI(this._userInfo.nickName)}</Text>

                            {this._renderUserId()}
                            {this._renderUserIcon()}
                            {this._renderMyLoveAndMyFriend()}
                            <Text
                                numberOfLines={1}
                                style={{
                                    width: DesignConvert.getW(320),
                                    color: '#878787',
                                    fontSize: DesignConvert.getF(11),
                                    marginTop: DesignConvert.getH(11)
                                }}
                            >{!this._userInfo ? "喜欢我就关注我吧~" : this._userInfo.slogan}</Text>
                            {this._renderFocusButton()}
                        </View> */}
                    </ImageBackground>

                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: DesignConvert.getH(20),
                            paddingLeft: DesignConvert.getW(18),
                        }}>
                        <Text
                            onPress={() => { this._showUserInfo = !this._showUserInfo; this.forceUpdate(); }}
                            style={this._showUserInfo ? styles.selected : styles.unselect}>资料</Text>
                        <View style={{ width: DesignConvert.getW(15) }} />
                        <Text
                            onPress={() => { this._showUserInfo = !this._showUserInfo; this.forceUpdate() }}
                            style={!this._showUserInfo ? styles.selected : styles.unselect}>礼物墙</Text>
                    </View>
                    <View style={{
                        width: DesignConvert.getW(12),
                        height: DesignConvert.getH(5),
                        marginTop: DesignConvert.getH(2),
                        marginLeft: DesignConvert.getW(this._showUserInfo ? 26 : 74),
                        backgroundColor: '#8E7AFF',
                        borderRadius: DesignConvert.getW(3),
                    }} />

                    <View
                        style={{
                            flex: 1,
                            // height: DesignConvert.sheight - DesignConvert.getH(325),
                            // borderRadius: DesignConvert.getW(10),
                            width: DesignConvert.swidth,
                            // display: 'none'
                            // backgroundColor: '#F9F9F9',
                        }}>


                        {/* 用户所在房间信息 */}
                        {/* {this._renderRoomInfo()} */}

                        {/* <Image
                                source={require("../../hardcode/skin_imgs/user_info").gift_icon()}
                                style={{
                                    width: DesignConvert.getW(22),
                                    height: DesignConvert.getH(22)
                                }}
                            ></Image> */}
                        {/* <Text
                            style={{
                                marginLeft: DesignConvert.getW(30),
                                marginTop: DesignConvert.getH(10),
                                marginBottom: DesignConvert.getH(15),
                                color: "#212121",
                                fontSize: DesignConvert.getF(13),
                                // fontWeight: "bold",
                                marginLeft: DesignConvert.getW(10),
                            }}>礼物墙 ({this._giftList ? this._giftList.length : 10})</Text> */}
                        {/* <View
                            style={{
                                width: DesignConvert.swidth,
                                height: DesignConvert.getH(25),
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    color: '#C9C9C9',
                                    fontSize: DesignConvert.getF(10)
                                }}
                            >收到的礼物</Text>
                        </View> */}
                        {this._showUserInfo && <View
                            style={{ flex: 1, marginTop: DesignConvert.getH(15), paddingHorizontal: DesignConvert.getW(13), }}>
                            <Image
                                source={this._avatar}
                                style={{
                                    width: DesignConvert.getW(100),
                                    height: DesignConvert.getH(100),
                                    borderRadius: DesignConvert.getW(10),
                                    marginLeft: DesignConvert.getW(5),
                                }} />
                            <ImageBackground
                                source={mine_info_bg()}
                                style={{
                                    marginTop: DesignConvert.getH(13),
                                    width: DesignConvert.getW(347),
                                    height: DesignConvert.getH(221),
                                    paddingTop: DesignConvert.getH(31),
                                    paddingBottom: DesignConvert.getH(30),
                                    paddingLeft: DesignConvert.getW(17),
                                    paddingRight: DesignConvert.getW(22),
                                }}>
                                <Text style={styles.user_info_text}>昵称：{this._nickName}</Text>
                                <Text style={styles.user_info_text}>生日：{this._birthday}</Text>
                                <Text style={styles.user_info_text}>性别：{this._sex == 2 ? '女' : '男'}</Text>
                                <Text style={styles.user_info_text}>个性签名：{this._slogan}</Text>
                            </ImageBackground>
                        </View>}
                        {!this._showUserInfo &&
                            <View
                                // source={this._giftList.length == 0 ? no_gift_bg() : gift_bg()}
                                // source={gift_bg()}
                                style={{
                                    marginTop: DesignConvert.getH(28),
                                    marginHorizontal: DesignConvert.getW(13),
                                    width: DesignConvert.getW(347),
                                    // height: this._height,
                                    // height: DesignConvert.getH(this._giftList.length == 0 ? 224 : 447),
                                    // resizeMode: 'contain',
                                    paddingTop: this._giftList.length == 0 ? 0 : DesignConvert.getH(16),
                                    paddingBottom: this._giftList.length == 0 ? 0 : DesignConvert.getH(16),
                                    paddingHorizontal: this._giftList.length == 0 ? 0 : DesignConvert.getH(12),
                                    backgroundColor: '#FDF6F8',
                                    borderRadius: DesignConvert.getW(10),
                                    borderWidth: DesignConvert.getW(1.5),
                                    borderColor: '#5F1271',
                                }}>
                                <Image
                                    source={gift_icon()}
                                    style={{
                                        position: 'absolute',
                                        top: DesignConvert.getH(-15),
                                        left: DesignConvert.getW(-2),
                                        width: DesignConvert.getW(59),
                                        height: DesignConvert.getH(30),
                                    }} />
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    numColumns={3}
                                    data={this._giftList}
                                    renderItem={this._renderItem}
                                    ListEmptyComponent={this._renderEmptyView}
                                    initialNumToRender={6}
                                    onLayout={this._setHeight}
                                    scrollEnabled={true}
                                    style={{
                                        // width: DesignConvert.getW(347),
                                        // height: DesignConvert.getH(this._giftList.length == 0 ? 224 : 447),
                                        // minHeight: DesignConvert.getH(250),
                                        // marginTop: DesignConvert.getH(25),

                                    }} /></View>}

                        <View
                            style={{
                                height: DesignConvert.getH(80),
                            }}
                        />

                    </View>
                    {/* <View
                        style={{
                            backgroundColor: 'white',
                            marginTop: DesignConvert.getH(20),
                            flexDirection: "row",
                            alignItems: "baseline",
                            marginLeft: DesignConvert.getW(20),
                        }}> */}


                    {/* <Text
                                style={{
                                    color: "#1A1A1A",
                                    fontSize: DesignConvert.getF(18),
                                    fontWeight: "bold",
                                    marginRight: DesignConvert.getW(8),
                                    textAlign: "center",
                                }}>{!this._userInfo ? 0 : this._userInfo.myLoves}</Text> */}

                    {/* <Text
                                style={{
                                    color: "#666666",
                                    fontSize: DesignConvert.getF(11),
                                    marginRight: DesignConvert.getW(18),
                                    textAlign: "center",
                                }}>关注</Text> */}
                    {/* </View> */}
                </ScrollView>
                {/* 顶部动画区域 */}
                <Animated.View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(80),
                        backgroundColor: this._isTop ? "rgba(255, 255, 255, 0)" : "white",
                        // backgroundColor: "red",
                        position: 'absolute',
                        top: Platform.OS === 'ios' ? DesignConvert.statusBarHeight : 0,
                        opacity: this._isTop ? 1 : this._alpha,
                    }}>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            width: DesignConvert.getW(40),
                            top: DesignConvert.getH(40),
                            alignItems: 'center',
                        }}
                        onPress={this._onBackPress}
                    >
                        <Image
                            style={{
                                width: DesignConvert.getW(12),
                                height: DesignConvert.getH(21),
                                resizeMode: 'contain',
                                tintColor: this._isTop ? "white" : "black",
                            }}
                            // source={ic_back_black()}
                            source={back_white()}
                        />
                    </TouchableOpacity>
                    {/* <Text
                        style={{
                            position: 'absolute',
                            left: DesignConvert.getW(154),
                            top: DesignConvert.getH(40),
                            color: this._isTop ? '#FFFFFF' : 'black',
                            fontSize: DesignConvert.getF(18),
                        }}
                    >
                        {this._isMyself ? '我的主页' : ''}
                    </Text> */}
                    <TouchableOpacity
                        style={{
                            minWidth: DesignConvert.getW(44),
                            minHeight: DesignConvert.getH(26),
                            borderRadius: DesignConvert.getW(13),
                            borderWidth: DesignConvert.getW(1),
                            borderColor: '#FFFFFF',
                            // backgroundColor: 'rgba(33, 33, 33, 0.3)',
                            position: 'absolute',
                            right: DesignConvert.getW(20),
                            top: DesignConvert.getH(40),
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={this._onMenuPress}
                    >
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: DesignConvert.getF(12),
                            }}
                        >{this._isMyself ? "编辑" : "更多"}</Text>
                    </TouchableOpacity>
                    {/* 进入编辑页面按钮 */}
                    {/* <TouchableOpacity
                        style={{
                            minWidth: DesignConvert.getW(11),
                            minHeight: DesignConvert.getH(21),
                            position: 'absolute',
                            right: DesignConvert.getW(20),
                            top: DesignConvert.getH(40),
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={this._onMenuPress}
                    >
                        <Image
                            style={{
                                width: DesignConvert.getW(this._isMyself ? 20 : 24),
                                height: DesignConvert.getH(this._isMyself ? 20 : 5),
                                tintColor: this._isTop ? "white" : "black",
                                resizeMode: 'contain'
                            }}
                            source={this._isMyself ? null : require("../../hardcode/skin_imgs/user_info").ic_menu()}
                        />
                    </TouchableOpacity> */}
                </Animated.View>
                {
                    !this._isMyself ?
                        <View
                            style={{
                                width: DesignConvert.getW(320),
                                height: DesignConvert.getH(50),
                                borderRadius: DesignConvert.getW(30),
                                backgroundColor: '#FFFFFF',
                                marginLeft: DesignConvert.getW(26.5),
                                position: 'absolute',
                                bottom: DesignConvert.getH(10) + DesignConvert.addIpxBottomHeight(),
                                flexDirection: 'row',
                            }}
                        >

                            <TouchableOpacity
                                onPress={this._onAttentionPress}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                    backgroundColor: this._isAttention ? '#ECECEC' : '#E85E73',
                                    width: DesignConvert.getW(140),
                                    height: DesignConvert.getH(44),
                                    borderRadius: DesignConvert.getW(22),
                                    borderWidth: DesignConvert.getW(1.5),
                                    borderColor: '#121212',

                                }}
                            >
                                {!this._isAttention && <Image
                                    // source={this._isAttention ? require("../../hardcode/skin_imgs/user_info").ic_already_focus() : require("../../hardcode/skin_imgs/user_info").ic_focus()}
                                    source={ic_focus()}
                                    style={{
                                        width: DesignConvert.getW(16),
                                        height: DesignConvert.getH(16),
                                    }}></Image>}

                                <Text
                                    style={{


                                        color: this._isAttention ? '#949494' : "#FFFFFF",
                                        marginLeft: this._isAttention ? DesignConvert.getW(5) : 0,
                                        fontSize: DesignConvert.getF(14),
                                        textAlign: 'center',
                                    }}>{this._isAttention ? "已关注" : "关注"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this._onChatPress}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                    backgroundColor: '#8876F7',
                                    width: DesignConvert.getW(140),
                                    height: DesignConvert.getH(44),
                                    borderRadius: DesignConvert.getW(22),
                                    borderWidth: DesignConvert.getW(1.5),
                                    borderColor: '#121212',
                                    marginLeft: DesignConvert.getW(30),
                                }}
                            >
                                <Image
                                    source={require("../../hardcode/skin_imgs/user_info").ic_chat()}
                                    style={{
                                        width: DesignConvert.getW(16),
                                        height: DesignConvert.getH(16),
                                    }}></Image>

                                <Text
                                    style={{
                                        color: "#FFFFFF",
                                        marginLeft: this._isAttention ? DesignConvert.getW(5) : 0,
                                        fontSize: DesignConvert.getF(14),
                                        textAlign: 'center',
                                    }}>私聊</Text>
                            </TouchableOpacity>
                        </View>
                        : null
                }

            </View >
        )
    }
}

export class RenderSexView extends PureComponent {
    render() {
        return (<LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={this.props.sex === 2 ? ['#FF759A', '#FF95B2'] : ['#65C5FF', '#8BDAFF']}
            style={{
                width: DesignConvert.getW(34),
                height: DesignConvert.getH(18),
                // marginLeft: DesignConvert.getW(5),
                borderRadius: DesignConvert.getW(9),
                borderWidth: DesignConvert.getW(1.5),
                borderColor: '#5F1271',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Image
                source={this.props.sex === 2 ? icon_woman() : icon_man()}
                style={{
                    marginRight: DesignConvert.getW(3),
                    width: DesignConvert.getW(9),
                    height: DesignConvert.getHeight(9),
                    resizeMode: 'contain',
                }}
            />
            <Text style={{
                fontSize: DesignConvert.getF(11),
                color: '#FFFFFF',
            }}>{this.props.age}</Text>
        </LinearGradient>)
    }
}

const styles = StyleSheet.create({
    selected: {
        fontSize: DesignConvert.getF(14),
        fontWeight: 'bold',
        color: '#121212',
    },
    unselect: {
        fontSize: DesignConvert.getF(12),
        fontWeight: 'normal',
        color: '#949494',
    },
    user_info_text: {
        marginTop: DesignConvert.getH(15),
        fontSize: DesignConvert.getF(14),
        lineHeight:DesignConvert.getH(20),
        fontWeight: 'bold',
        color: '#121212',
    },
})