'use strict';

import React, { PureComponent } from "react";
import { View, TouchableOpacity, Text, Image, Platform, ImageBackground } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";
import HGlobal, { COIN_NAME, ESex_Type_MALE } from "../../../../hardcode/HGLobal";
import LinearGradient from "react-native-linear-gradient";
import Config from "../../../../configs/Config";

export default class _PublicScreenMessageBingoItem extends PureComponent {

    _onSender = () => {
        const userbase = this.props.item.vo.data.smashUserBase
        require('../../../../model/room/RoomUserClickModel').onClickUser(userbase.userId, decodeURIComponent(userbase.nickName))
    }


    render() {

        //砸蛋结果广播
        // message SmashEggResultBroadcast {
        // 	optional UserResult.UserBase smashUserBase = 1;// 砸蛋用户信息
        // 	repeated ReceiveGiftInfo giftList = 2;//中奖礼物列表
        // 	optional int32 broadcastType = 3;//播放类型:0公屏显示,1房间跑道,2全服跑道,3:全服公屏流水
        // 	optional int32 action = 4;//砸蛋动作(0:自动砸,1:单砸,10:十砸,100:百砸)	
        //     optional string eggType = 5; //蛋的类型(1:铁蛋 2:银蛋 3:金蛋) 
        //     optional string roomId = 6; //砸蛋所在房间Id	
        //     optional string roomName = 7; //砸蛋所在房间名称
        // }

        // 礼物信息
        // message ReceiveGiftInfo {
        // 	required string giftId = 1;//礼物ID
        // 	required int64 num = 2;//数量
        // 	required int32 price = 3;//价格(用户排序用)
        // 	optional string name = 4;//名称
        // }

        //获取玩家基本信息
        // message UserBase {
        // 	required string userId = 1;//用户ID
        // 	optional string nickName = 2;//用户昵称
        // 	optional int32 logoTime = 3;//修改logo的时间 0为没修改过
        // 	optional string thirdIconurl = 4;//第三方头像
        // 	optional string headFrameId = 5;// 头像框
        // 	optional int32 sex = 6; // 姓别 0 未知 1:男 2:女
        //     optional int32 age = 7; //年龄
        //     optional int32 vipLv = 8; //VIP等级
        // 	optional string slogan = 9;//
        // 	optional int32 contributeLv = 10;// 土豪等级
        // 	optional string position = 11;//地标
        // 	optional string channelId = 12;//用户渠道id
        // 	optional int32 friendStatus = 13;// 好友状态
        // }

        // *  data: SmashEggResultBroadcast,
        // *  giftVo: ReceiveGiftInfo,

        const bWorld = this.props.item.isWorld;
        let smashUserName = decodeURIComponent(this.props.item.vo.data.smashUserBase.nickName);
        if (smashUserName.length > 4) smashUserName = smashUserName.slice(0, 4) + '...';
        const smashUserIsMale = this.props.item.vo.data.smashUserBase.sex == ESex_Type_MALE;
        const giftName = this.props.item.vo.giftVo.name;
        const giftNum = this.props.item.vo.giftVo.num
        const price = this.props.item.vo.giftVo.price;
        const giftUrl = Config.getGiftUrl(this.props.item.vo.giftVo.giftId, this.props.item.vo.giftVo.alterdatetime)

        const minPrice = 0;//todo 这个需要数值


        if (true) return (<ImageBackground
            source={require('../../../../hardcode/skin_imgs/room_more').ic_bg_zadan1()}
            style={{
                marginTop: DesignConvert.getH(10),
                width: DesignConvert.getW(263),
                height: DesignConvert.getH(53),
                paddingTop: DesignConvert.getH(5),
                paddingLeft: DesignConvert.getW(8),
            }}>
            <Text
                style={{
                    color: '#FFFFFF',
                    fontSize: DesignConvert.getF(12),
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
                onPress={this._onSender}
            >
                哇噢~ {` ${smashUserName}`}
                <Text
                    style={{
                        color: '#FFE8B1',
                        fontSize: DesignConvert.getF(12),
                    }}
                    onPress={this._onSender}
                >{HGlobal.EGG_ACTION_NAME}

                </Text> </Text>

            <Text
                style={{
                    color: '#FFE8B1',
                    fontSize: DesignConvert.getF(12),
                }}
                onPress={this._onSender}
            >
                <Text
                    style={{
                        color: '#FFFFFF',
                        fontSize: DesignConvert.getF(12),
                    }}
                    onPress={this._onSender}
                >中了</Text>
                {`${giftName}(${price}`}

                <Text
                    style={{
                        color: 'FFE8B1',
                        fontSize: DesignConvert.getF(12),
                    }}
                >x{giftNum})</Text>


            </Text>

            {/* {
                    boxDrawable
                        ? ( */}
            <View
                style={{
                    position: 'absolute',
                    top: DesignConvert.getH(10),
                    right: DesignConvert.getW(7),
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <Image
                    // resizeMode={'repeat'}
                    source={{ uri: giftUrl }}
                    style={{
                        width: DesignConvert.getW(37),
                        height: DesignConvert.getH(37),
                        resizeMode: 'contain',
                    }}
                />

                <Text
                    style={{
                        fontSize: DesignConvert.getF(14),
                        color: '#FFE8B1',
                        fontWeight: 'bold',
                        marginLeft: DesignConvert.getW(3),
                    }}>x{giftNum}</Text>
            </View>
        </ImageBackground>
        )

        if (Platform.OS === 'android') {

            return (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#E6B3F2', '#9DABFD']}
                    style={{
                        marginTop: DesignConvert.getH(5),
                        marginBottom: DesignConvert.getH(5),
                        maxWidth: DesignConvert.getW(260),
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        alignItems: 'baseline',
                        padding: DesignConvert.getW(2),
                        borderTopLeftRadius: DesignConvert.getW(2),
                        borderTopRightRadius: DesignConvert.getW(9),
                        borderBottomLeftRadius: DesignConvert.getW(9),
                        borderBottomRightRadius: DesignConvert.getW(9),
                    }}
                >

                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#5C1B8C', '#2F1784']}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            flexWrap: 'wrap',
                            alignItems: 'baseline',
                            padding: DesignConvert.getW(2),
                            borderTopLeftRadius: DesignConvert.getW(2),
                            borderTopRightRadius: DesignConvert.getW(8),
                            borderBottomLeftRadius: DesignConvert.getW(8),
                            borderBottomRightRadius: DesignConvert.getW(8),
                        }}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#935FC5', '#5E48B3']}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                flexWrap: 'wrap',
                                alignItems: 'baseline',
                                padding: DesignConvert.getW(5),
                                borderTopLeftRadius: DesignConvert.getW(2),
                                borderTopRightRadius: DesignConvert.getW(7),
                                borderBottomLeftRadius: DesignConvert.getW(7),
                                borderBottomRightRadius: DesignConvert.getW(7),
                            }}
                        >

                            <Text
                                style={{
                                    flexWrap: 'wrap',
                                    // borderLeftWidth: DesignConvert.getW(1),
                                    // borderTopWidth: DesignConvert.getH(2),
                                    // borderRightWidth: DesignConvert.getW(1),
                                    // borderBottomWidth: DesignConvert.getH(2),
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    fontSize: DesignConvert.getF(10),
                                    color: '#FFFFFF',
                                    // alignItems: 'center',
                                }}
                            >
                                {
                                    bWorld
                                        ? (
                                            '【喜提全服】 恭喜 '
                                        )
                                        : (
                                            ' 恭喜 '
                                        )
                                }


                                <Text
                                    onPress={this._onSender}
                                    style={{
                                        color: smashUserIsMale ? "#FFFFFF" : "#FFFFFF",
                                        fontSize: DesignConvert.getF(10),
                                    }}
                                >{smashUserName}</Text>

                                {HGlobal.EGG_ACTION_NAME}
                                {`获得 `}
                                {giftName}
                                {`(${price})`}
                                {`x${giftNum}`}
                                <Image
                                    style={{
                                        width: DesignConvert.getW(18),
                                        height: DesignConvert.getH(18),
                                        resizeMode: 'cover'
                                    }}
                                    source={{ uri: giftUrl }}
                                />
                            </Text>

                        </LinearGradient>
                    </LinearGradient>

                </LinearGradient>
            )

        }
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#E6B3F2', '#9DABFD']}
                style={{
                    marginTop: DesignConvert.getH(5),
                    marginBottom: DesignConvert.getH(5),
                    maxWidth: DesignConvert.getW(260),
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    padding: DesignConvert.getW(2),
                    borderTopLeftRadius: DesignConvert.getW(2),
                    borderTopRightRadius: DesignConvert.getW(9),
                    borderBottomLeftRadius: DesignConvert.getW(9),
                    borderBottomRightRadius: DesignConvert.getW(9),
                }}
            >

                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#5C1B8C', '#2F1784']}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        alignItems: 'baseline',
                        padding: DesignConvert.getW(2),
                        borderTopLeftRadius: DesignConvert.getW(2),
                        borderTopRightRadius: DesignConvert.getW(8),
                        borderBottomLeftRadius: DesignConvert.getW(8),
                        borderBottomRightRadius: DesignConvert.getW(8),
                    }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#935FC5', '#5E48B3']}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            flexWrap: 'wrap',
                            alignItems: 'baseline',
                            padding: DesignConvert.getW(5),
                            borderTopLeftRadius: DesignConvert.getW(2),
                            borderTopRightRadius: DesignConvert.getW(7),
                            borderBottomLeftRadius: DesignConvert.getW(7),
                            borderBottomRightRadius: DesignConvert.getW(7),
                        }}
                    >

                        <Text
                            style={{
                                flexWrap: 'wrap',
                                // borderLeftWidth: DesignConvert.getW(1),
                                // borderTopWidth: DesignConvert.getH(2),
                                // borderRightWidth: DesignConvert.getW(1),
                                // borderBottomWidth: DesignConvert.getH(2),
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                fontSize: DesignConvert.getF(10),
                                color: '#FFFFFF',
                                // alignItems: 'center',
                            }}
                        >
                            {
                                bWorld
                                    ? (
                                        '【喜提全服】 恭喜 '
                                    )
                                    : (
                                        ' 恭喜 '
                                    )
                            }


                            <Text
                                onPress={this._onSender}
                                style={{
                                    color: smashUserIsMale ? "#FFFFFF" : "#FFFFFF",
                                    fontSize: DesignConvert.getF(10),
                                }}
                            >{smashUserName}</Text>

                            {HGlobal.EGG_ACTION_NAME}
                            {`获得 `}
                            {giftName}
                            {`(${price})`}
                            {`x${giftNum}`}

                        </Text>

                        <Image
                            style={{
                                width: DesignConvert.getW(18),
                                height: DesignConvert.getH(18),
                                resizeMode: 'cover'
                            }}
                            source={{ uri: giftUrl }}
                        />

                    </LinearGradient>
                </LinearGradient>

            </LinearGradient>
        )


    }
}
