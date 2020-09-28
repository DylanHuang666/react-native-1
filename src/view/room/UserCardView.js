/**
 * 用户资料卡片
 */

'use strict';

import React,
{ PureComponent } from 'react';
import BaseView from '../base/BaseView';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import DesignConvert from '../../utils/DesignConvert';
import ToastUtil from '../base/ToastUtil';
import Config from '../../configs/Config';
import {
    ic_send_gift,
    ic_open_chat,
    ic_send_goldshell,
    ic_close_usercard,
    icon_give,
    bg_user_card,
    ic_lover,
    ic_loved,
} from '../../hardcode/skin_imgs/room';
import RoomInfoCache from '../../cache/RoomInfoCache';
import LinearGradient from 'react-native-linear-gradient';
import SexAgeWidget from '../userinfo/SexAgeWidget';
import MedalWidget from '../userinfo/MedalWidget';
import { THEME_COLOR } from '../../styles';
import { sex_female, sex_male } from '../../hardcode/skin_imgs/common';
import UserInfoCache from '../../cache/UserInfoCache';
import _IDItem from './item/_IDItem';


export default class UserCardView extends BaseView {

    constructor(props) {
        super(props);


        this._userId = this.props.params.userId;
        this._cutenumber = null//靓号
        this._cuteIcon = null//靓号icon
        this._nickName = '昵称加载中';
        this._richLv = 1;
        this._charmLv = 1;
        this._friendStatus = true;
        this._fansNum = 0;//粉丝数
        this._myLoves = 0//关注数
        this._slogan = '太赖了，什么都没留下～'//签名
        this._sex = 1
        this._age = 1

        //转赠权限
        this._hadSendGoldPermiss = false;

        //查询是否有转赠权限
        require('../../model/mine/MyWalletModel').default.getMoneyGivingList()
            .then(data => {
                if (this._havaSendPermiss == data) {
                    return;
                }
                this._hadSendGoldPermiss = data;
                this.forceUpdate();
            });

        require('../../model/userinfo/UserInfoModel').default.getPersonPage(this._userId)
            .then(data => {
                if (data) {
                    this._nickName = decodeURIComponent(data.nickName);
                    this._richLv = data.contributeLv;
                    this._charmLv = data.charmLv;
                    this._fansNum = data.friends;
                    this._myLoves = data.myLoves
                    this._slogan = data.slogan
                    this._sex = data.sex
                    this._age = data.age
                    this._friendStatus = require('../../model/userinfo/UserInfoModel').default.isAddLover(data.friendStatus);
                    this._userHeadUrl = Config.getHeadUrl(this._userId, data.logoTime, data.thirdIconurl);
                    this.forceUpdate();
                }
            });
        require('../../model/userinfo/UserInfoModel').default.getGoodId(this._userId)
            .then(data => {
                console.log('靓号信息===》', data)
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
    }

    _toChat = () => {
        this.popSelf();
        require('../../router/level2_router').showChatView(this._userId, decodeURI(this._nickName), false);
    };

    _addLover = () => {
        if (this._friendStatus) {
            //取消关注
            return
        }

        this._friendStatus = require('../../model/userinfo/UserInfoModel').default.addLover(this._userId, true);
        if (this._friendStatus) {
            ToastUtil.showCenter('关注成功');
        }
        this.forceUpdate();
    };

    _openUserInfo = () => {
        this.popSelf();
        require('../../router/level2_router').showUserInfoView(this._userId);
    };

    _report = () => {
        require("../../router/level3_router").showReportDialog(this._userId, 1);

    }

    _sendGift = () => {
        //查询用户是否在麦上
        let _index = -1

        RoomInfoCache.roomData.infos.forEach((element, index) => {
            // console.log('查询用户是否在麦上', element, this._userId)
            if (element && element.base && element.base.userId == this._userId) {
                _index = index
            }
        })

        //是否是主麦
        if (RoomInfoCache.mainMicUserInfo.userId == this._userId) {
            _index = 0
        }

        if (_index == -1) {
            ToastUtil.showCenter('该用户不在麦上,只能给麦上嘉宾送礼哦~')
            return
        }

        this.popSelf();
        require('../../router/level3_router').showRoomGiftPanelView(this._userId)
    };

    //转赠
    _sendGoldShell = () => {
        this.popSelf();
        // require('../../model/mine/MyWalletModel').default.onWalletSendGoldShell(this._userId);
        require('../../model/mine/MyWalletModel').default.onLiveSendGoldShell(this._userId, this._nickName, this._userHeadUrl);
    };

    _renderItem = (press, color, img, text) => {
        return (
            <TouchableOpacity
                onPress={press}
                style={{
                    width: DesignConvert.getW(74),
                    height: DesignConvert.getH(34),
                    paddingHorizontal: DesignConvert.getW(12),
                    borderRadius: DesignConvert.getW(17),
                    borderWidth: DesignConvert.getW(1.5),
                    borderColor: '#121212',
                    backgroundColor: color,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Image
                    source={img}
                    style={{
                        width: DesignConvert.getW(21),
                        height: DesignConvert.getH(21),
                        resizeMode: 'contain',
                    }}
                />
                <Text
                    style={{
                        marginLeft: DesignConvert.getW(5),
                        fontSize: DesignConvert.getF(12),
                        color: '#FFFFFF',
                    }}>{text}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                onPress={this.popSelf}
            >

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        width: DesignConvert.swidth,
                        height: DesignConvert.sheight,
                    }}
                    onPress={this.popSelf}
                />



                <View
                    style={{
                        position: 'absolute',
                        left: DesignConvert.getW(47.5),
                        top: DesignConvert.getH(220),
                        width: DesignConvert.getW(280),
                        height: DesignConvert.getH(182),
                        backgroundColor: '#FFFFFF',
                        borderRadius: DesignConvert.getW(10),
                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#121212',
                        alignItems: 'center',
                    }}
                >

                    {/* <TouchableOpacity
                        style={{
                            width: DesignConvert.getW(45),
                            height: DesignConvert.getH(27),
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#D8D8D8',
                            borderTopRightRadius: DesignConvert.getW(15),
                            borderBottomLeftRadius: DesignConvert.getW(15),
                            position: 'absolute',
                            right: 0,
                        }}
                        onPress={this._report}
                    >
                        <Text
                            style={{
                                color: '#686868',
                                fontSize: DesignConvert.getF(12),
                            }}
                        >举报</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        onPress={this._openUserInfo}
                        style={{
                            position: 'absolute',
                            top: DesignConvert.getH(-28),
                            width: DesignConvert.getH(66),
                        }}>
                        <Image
                            source={{ uri: this._userHeadUrl }}
                            style={{

                                height: DesignConvert.getW(66),
                                borderRadius: DesignConvert.getW(33),
                                borderWidth: DesignConvert.getW(1.5),
                                borderColor: '#FFFFFF',
                            }}>
                        </Image>
                    </TouchableOpacity>

                    <Text
                        style={{
                            marginTop: DesignConvert.getH(43),
                            marginBottom: DesignConvert.getH(3.5),
                            fontSize: DesignConvert.getF(14),
                            color: '#121212',
                        }}
                        numberOfLines={1}
                    >{this._nickName}</Text>

                    <_IDItem
                        id={this._cutenumber ? this._cutenumber : this._userId} />

                    <View
                        style={{
                            marginTop: DesignConvert.getH(8),
                            flexDirection: 'row'
                        }}>

                        <SexAgeWidget
                            age={this._age}
                            sex={this._sex} />

                        <View style={{ width: DesignConvert.getW(5) }} />

                        <MedalWidget
                            richLv={this._richLv}
                            charmLv={this._charmLv} />
                    </View>



                    {/* <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: DesignConvert.getH(20),
                            width: DesignConvert.getW(230),
                            height: DesignConvert.getH(37),
                            backgroundColor: '#FFFFFF',
                            borderRadius: DesignConvert.getW(8),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={this._openUserInfo}>
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(13),
                                color: 'black',
                                fontWeight: 'bold'
                            }}
                        >去逛逛ta的主页</Text>
                    </TouchableOpacity> */}




                    {/* <Text
                        numberOfLines={1}
                        style={{
                            position: 'absolute',
                            left: DesignConvert.getW(15),
                            top: DesignConvert.getH(52),
                            fontSize: DesignConvert.getF(11),
                            width: DesignConvert.getW(236),
                            color: '#686868',
                        }}
                    >签名：{this._slogan}</Text> */}




                    {/* <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: DesignConvert.getH(20),
                            marginStart: DesignConvert.getW(10),
                            marginEnd: DesignConvert.getW(10),
                        }}>


                        <Text
                            style={{
                                flex: 1,
                                fontSize: DesignConvert.getF(16),
                                color: 'black',
                                textAlign: 'center',
                            }}
                        >{this._myLoves}</Text>


                        <Text
                            style={{
                                flex: 1,
                                fontSize: DesignConvert.getF(16),
                                color: 'black',
                                textAlign: 'center',
                            }}
                        >{this._fansNum}</Text>

                    </View>


                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: DesignConvert.getH(3),
                            marginStart: DesignConvert.getW(10),
                            marginEnd: DesignConvert.getW(10),
                        }}
                    >

                        <Text
                            style={{
                                flex: 1,
                                fontSize: DesignConvert.getF(9),
                                color: '#AEAEAE',
                                textAlign: 'center',
                            }}
                        >关注</Text>

                        <Text
                            style={{
                                flex: 1,
                                fontSize: DesignConvert.getF(9),
                                color: '#AEAEAE',
                                textAlign: 'center',
                            }}
                        >粉丝</Text>

                    </View> */}


                    <View
                        style={{
                            width: DesignConvert.getW(280),
                            marginTop: DesignConvert.getH(20),
                            paddingHorizontal: DesignConvert.getW(this._hadSendGoldPermiss ? 19 : 35),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        {this._renderItem(this._toChat, '#8E7AFF', ic_open_chat(), '聊天')}
                        {this._renderItem(this._sendGift, '#EA554E', ic_send_gift(), '送礼')}
                        {this._userHeadUrl && this._hadSendGoldPermiss && this._renderItem(this._sendGoldShell, '#F4B845', ic_send_goldshell(), '转增')}

                    </View>

                    {/* {!this._friendStatus && */}

                    {RoomInfoCache.createUserInfo.userId != this._userId &&
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: DesignConvert.getH(15),
                                right: DesignConvert.getW(this._friendStatus ? 15 : 20),
                                alignItems: 'center',
                            }}
                            disabled={this._friendStatus}
                            onPress={this._addLover}>

                            <Image
                                style={{
                                    width: DesignConvert.getW(21),
                                    height: DesignConvert.getH(21),
                                    resizeMode: 'contain',
                                }}
                                source={this._friendStatus ? ic_loved() : ic_lover()}
                            />
                            <Text
                                style={{
                                    marginTop: DesignConvert.getH(5),
                                    fontSize: DesignConvert.getF(10),
                                    color: '#CCCCCC',
                                    textAlign: 'center',
                                }}>{this._friendStatus ? '已关注' : '关注'}</Text>

                        </TouchableOpacity>
                    }
                    {/* } */}

                </View>

            </View >
        );
    }

}


class _SendGoldShell extends PureComponent {


    constructor(props) {
        super(props);

        //指定转赠id
        this._userId = this.props.userId;
        this._nickName = this.props.nickName;
        this._userHeadUrl = this.props.userHeadUrl;

        //转赠权限
        this._hadSendGoldPermiss = false;

        //查询是否有转赠权限
        require('../../model/mine/MyWalletModel').default.getMoneyGivingList()
            .then(data => {
                if (this._havaSendPermiss == data) {
                    return;
                }
                this._hadSendGoldPermiss = data;
                this.forceUpdate();
            });
    }

    //转赠
    _sendGoldShell = () => {
        this.props.popSelf();
        // require('../../model/mine/MyWalletModel').default.onWalletSendGoldShell(this._userId);
        require('../../model/mine/MyWalletModel').default.onLiveSendGoldShell(this._userId, this._nickName, this._userHeadUrl);
    };


    render() {

        if (!this._hadSendGoldPermiss) {
            return null;
        }

        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: DesignConvert.getH(10),
                }}
                onPress={this._sendGoldShell}
            >

                <Image
                    style={{
                        width: DesignConvert.getW(69),
                        height: DesignConvert.getH(31),
                        resizeMode: 'contain',
                    }}
                    source={ic_send_goldshell()}
                />

            </TouchableOpacity>

        );
    }
}
