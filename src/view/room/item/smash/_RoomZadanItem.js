'use strict';

import React, { PureComponent } from "react";
import { Image, Text, Animated, Easing, View } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";
import {
    ic_zadan_banner,
    ic_gift_gift,
    ic_zadan_full_service,
    ic_x,
    ic_0,
    ic_1,
    ic_2,
    ic_3,
    ic_4,
    ic_5,
    ic_6,
    ic_7,
    ic_8,
    ic_9
} from '../../../../hardcode/skin_imgs/room_gift';
import Config from "../../../../configs/Config";
import { ic_rank_cup, bg_rank_enter } from "../../../../hardcode/skin_imgs/room";
import LinearGradient from "react-native-linear-gradient";
import HGlobal, { COIN_NAME } from "../../../../hardcode/HGLobal";



export default class _RoomZadanItem extends PureComponent {

    constructor(props) {
        super(props);

        this._translateXValue = new Animated.Value(DesignConvert.swidth)     // 起始值

        this._firstStopValue = DesignConvert.getW(4.5);                     // 两秒的出场地方
        this._firstStopDuration = 2000;     // 两秒的出场时间

        this._secondDuration = 1000;    // 出场后停留一秒

        this._toRightValue = DesignConvert.getW(80 + 4.5); // 向右走80个单位
        this._toRightDuration = 1000;     // 移动80个单位的时长

        this._endLeaveValue = -DesignConvert.swidth;                         // 最终值
        this._endLeaveDuration = 4000;      // 花费4秒离开界面
    }

    componentDidMount() {
        this._startAnimated();
    }

    componentWillUnmount() {
        this._isCompUnmount = true;
        this._stopAnimated();
    }

    _stopAnimated = () => {
        this.animate && this.animate.stop();
        this.animate = null;
    }

    _startAnimated = () => {
        // 0 -> 2   从左到右
        // 2 -> 3    停留
        // 3 -> 4   向左移动 80  个单位
        // 4 -> 8   向右移动 到左面

        this._translateXValue.setValue(DesignConvert.swidth);         // 起始值

        this.animate = Animated.sequence(
            [
                Animated.timing(
                    this._translateXValue,
                    {
                        toValue: this._firstStopValue,
                        duration: this._firstStopDuration,
                        easing: Easing.linear,
                        isInteraction: false,
                        useNativeDriver: true,
                    }
                ),
                Animated.delay(this._secondDuration),
                Animated.timing(
                    this._translateXValue,
                    {
                        toValue: this._toRightValue,
                        duration: this._toRightDuration,
                        easing: Easing.linear,
                        isInteraction: false,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this._translateXValue,
                    {
                        toValue: this._endLeaveValue,
                        duration: this._endLeaveDuration,
                        easing: Easing.linear,
                        isInteraction: false,
                        useNativeDriver: true,
                    }
                ),
            ]
        )

        this.animate.start(
            endState => {
                if (this._isCompUnmount) return;

                if (endState.finished) {
                    this._stopAnimated();

                    this.props.onEnd(this.props.keyIndex);
                }
            }
        );
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

        // *  data: SmashEggResultBroadcast,
        // *  giftVo: ReceiveGiftInfo,

        const smashUserBase = this.props.item.data.smashUserBase

        let senderName = decodeURIComponent(smashUserBase.nickName);
        if (senderName.length > 5) senderName = senderName.slice(0, 4) + '...';
        const senderHeadUrl = Config.getHeadUrl(smashUserBase.userId, smashUserBase.logoTime, smashUserBase.thirdIconurl, 100)
        // const senderIsMale = this.props.item.data.smashUserBase.sex == ESex_Type_MALE;
        const giftName = this.props.item.giftVo.name;
        const bShowPrice = true;//todo 暂时写死显示吧
        const giftPrice = this.props.item.giftVo.price;

        const num = this.props.item.giftVo.num;
        const numImg = [ic_0(), ic_1(), ic_2(), ic_3(), ic_4(), ic_5(), ic_6(), ic_7(), ic_8(), ic_9()];
        let flag1, flag2, flag3;
        if (num > 9 && num<=99) { flag1 = num / 10; flag2 = num % 10; }
        else if (num > 99) { flag1 = num / 100; flag2 = num % 100 / 10; flag3 = num % 10; }
        else flag1 = num;
        
        // const img1 = numImg[num];
        // const roomName = this.props.item.data.roomName;

        const gift = giftName || "礼物";
        this._giftUrl = Config.getGiftUrl(this.props.item.giftVo.giftId, this.props.item.giftVo.alterdatetime)
        const price = bShowPrice ? `(${giftPrice}${COIN_NAME})` : "";

        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: DesignConvert.getH(250) + DesignConvert.statusBarHeight,
                    left: DesignConvert.getW(18),
                    // width: DesignConvert.getW(345),
                    height: DesignConvert.getH(51),
                    flexDirection: 'row',
                    alignItems: 'center',
                    transform: [
                        { translateX: this._translateXValue },
                    ]
                }}
            >

                {/* <View
                    style={{
                        width: DesignConvert.getW(65),
                        height: DesignConvert.getH(65),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}> */}

                {/* </View> */}

                <Image
                    source={ic_zadan_full_service()}
                    style={{
                        position: 'absolute',
                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(50),
                        resizeMode: 'contain',
                    }}
                />
                <Image
                    style={{
                        width: DesignConvert.getW(34),
                        height: DesignConvert.getH(34),
                        marginLeft: DesignConvert.getH(17),
                        borderRadius: DesignConvert.getW(30),
                    }}
                    source={{ uri: senderHeadUrl }}
                />
                <View
                    style={{
                        marginLeft: DesignConvert.getW(15),
                    }}>

                    <Text
                        numberOfLines={1}
                        style={{
                            color: '#FFE8B1',
                            fontSize: DesignConvert.getF(12),
                            textAlignVertical: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            // maxWidth: DesignConvert.getW(70),
                        }}
                    >
                        {senderName}

                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: DesignConvert.getF(12),
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                            }}
                        >
                            {`在`}
                            {`${HGlobal.EGG_ACTION_NAME}`}
                            {`中抽中了`}
                        </Text>
                    </Text>

                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontSize: DesignConvert.getF(12),
                            marginTop: DesignConvert.getH(5),
                        }}
                    >稀有礼物
                    <Text
                            style={{
                                color: '#FFE8B1',
                                fontSize: DesignConvert.getF(12),
                            }}>{`${gift}(${price})`}</Text></Text>


                </View>


                <Image
                    style={{
                        marginLeft: DesignConvert.getW(15),
                        width: DesignConvert.getW(34),
                        height: DesignConvert.getH(34),
                        resizeMode: 'contain',
                    }}
                    source={{ uri: this._giftUrl }}
                >
                </Image>

                <Image
                    source={ic_x()}
                    style={{
                        width: DesignConvert.getW(9),
                        height: DesignConvert.getH(18),
                        marginLeft: DesignConvert.getW(9.5),
                        marginTop: DesignConvert.getH(13.5),
                        resizeMode: 'center',
                    }}
                />
                <Image
                    source={numImg[flag1]}
                    style={{
                        marginLeft: DesignConvert.getW(1.5),
                        height: DesignConvert.getH(42.5),
                        width: DesignConvert.getW(18),
                        resizeMode: 'center',
                    }} />
                {flag2 != null && <Image
                    source={numImg[flag2]}
                    style={{
                        marginLeft: DesignConvert.getW(1.5),
                        height: DesignConvert.getH(42.5),
                        width: DesignConvert.getW(18),
                        resizeMode: 'center',
                    }} />}

                {flag3 != null && <Image
                    source={numImg[flag3]}
                    style={{
                        marginLeft: DesignConvert.getW(1.5),
                        height: DesignConvert.getH(42.5),
                        width: DesignConvert.getW(18),
                        resizeMode: 'center',
                    }} />}


            </Animated.View>
        );
    }
}