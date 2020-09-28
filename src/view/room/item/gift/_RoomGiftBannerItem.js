'use strict';

import React, { PureComponent } from "react";
import { Image, Text, Animated, Easing, View } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";
import {
    ic_gift_banner,
    ic_gift_gift
} from '../../../../hardcode/skin_imgs/room_gift';
import Config from "../../../../configs/Config";

/* <_RoomGiftBannerItem
    key={key}
    item={vo}
    onEnd={this._onPlayEnd}
/> */

export default class _RoomGiftBannerItem extends PureComponent {

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
        this._startAnimated()
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
        const fromUserBase = this.props.item.data.fromUserBase
        const receiverInfo = this.props.item.receiverInfo

        const senderNamwe = decodeURIComponent(fromUserBase.nickName);
        const senderHeadUrl = Config.getHeadUrl(fromUserBase.userId, fromUserBase.logoTime, fromUserBase.thirdIconurl, 60)
        // const senderIsMale = this.props.item.data.fromUserBase.sex == ESex_Type_MALE;
        const recieverName = decodeURIComponent(receiverInfo.toNickName);
        const receiverHeadUrl = Config.getHeadUrl(receiverInfo.toUserId, receiverInfo.logoTime, receiverInfo.thirdIconurl, 60)
        // const recieverIsMale = this.props.item.receiverInfo.toSex == ESex_Type_MALE;
        // const boxDrawable = this.props.item.giftData ? ({ uri: Config.getGiftUrl(this.props.item.giftData.giftid, this.props.item.giftData.alterdatetime) }) : null;
        const giftName = this.props.item.giftData ? this.props.item.giftData.giftname : '';
        const giftUrl = Config.getGiftUrl(this.props.item.giftData.giftid, this.props.item.giftData.alterdatetime.toDateTimeTick())
        // const bShowPrice = true;//todo 暂时写死显示吧
        // const giftPrice = this.props.item.data.price;
        const groupNum = this.props.item.data.groupNum;
        const giftNum = this.props.item.data.giftNum;
        // const bWorld = this.props.item.data.broadcastType == 2;

        const gift = giftName || "礼物";
        // const price = bShowPrice ? `(${giftPrice}${COIN_NAME})` : "";
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: DesignConvert.getH(130) + DesignConvert.statusBarHeight,
                    left: DesignConvert.getW(18),
                    width: DesignConvert.getW(370),
                    height: DesignConvert.getH(90),
                    flexDirection: 'row',
                    alignItems: 'center',
                    transform: [{
                        translateX: this._translateXValue
                    }],
                }}
            >

                <Image
                    resizeMode="contain"
                    source={ic_gift_banner()}
                    style={{
                        position: 'absolute',
                        width: DesignConvert.getW(370),
                        height: DesignConvert.getH(90),
                    }}
                />

                {/* <Image
                    style={{
                        width: DesignConvert.getW(30.5),
                        height: DesignConvert.getH(30.5),
                        resizeMode: 'contain',
                        borderRadius: DesignConvert.getW(20),
                        marginStart: DesignConvert.getW(8),
                    }}
                    source={{ uri: senderHeadUrl }}
                /> */}
                <Text
                    style={{
                        marginLeft:DesignConvert.getW(42),
                        fontSize: DesignConvert.getF(12),
                        color: "#FFFFFF",
                    }}>哇塞，</Text>

                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: DesignConvert.getF(12),
                        color: '#FFE8B1',
                        maxWidth: DesignConvert.getW(80),
                    }}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >{`${senderNamwe}`}
                </Text>

                <Text
                    style={{
                        fontSize: DesignConvert.getF(11),
                        color: '#FFFFFF',
                    }}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >送给</Text>

                {/* <Image
                    style={{
                        width: DesignConvert.getW(33),
                        height: DesignConvert.getH(33),
                        resizeMode: 'contain',
                        borderRadius: DesignConvert.getW(50),
                    }}
                    source={{ uri: receiverHeadUrl }}
                /> */}

                <Text
                    numberOfLines={1}
                    style={{
                        color: '#FFE8B1',
                        fontSize: DesignConvert.getF(12),
                        maxWidth: DesignConvert.getW(80),
                    }}
                >{recieverName}</Text>

                {/* <Image
                    style={{
                        width: DesignConvert.getW(31),
                        height: DesignConvert.getH(31),
                        resizeMode: 'contain',
                    }}
                    source={{ uri: giftUrl }}
                /> */}

                <Text
                    style={{
                        fontSize: DesignConvert.getF(12),
                        color: '#FFFFFF'
                    }}
                >{gift}x{groupNum * giftNum}</Text>

            </Animated.View>
        );
    }
}