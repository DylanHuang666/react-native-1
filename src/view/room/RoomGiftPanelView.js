/**
 * 房间礼物面板
 */

'use strict';

import React, { PureComponent } from 'react';
import BaseView from "../base/BaseView";
import { View, Image, Text, TouchableOpacity, ScrollView, Animated, Easing, ImageBackground } from "react-native";
import DesignConvert from '../../utils/DesignConvert';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import * as Progress from '../base/react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import ModelEvent from "../../utils/ModelEvent";
import RoomInfoCache from "../../cache/RoomInfoCache";
import {
    EVT_LOGIC_UPDATE_COMBO_SHOW,
    EVT_LOGIC_UPDATE_GIFT_PANEL_CONIN_NUM,
    EVT_LOGIC_UPDATE_GIFT_FLY,
    EVT_LOGIC_UPDATE_COMBO_TIME,
    EVT_LOGIC_UPDATE_DO_SEND_GIFT,
    EVT_LOGIC_CHANGE_GIFT_TAB,
    EVT_UPDATE_WALLET,
    EVT_LOGIC_CHOOSE_GIFT_NUM,
} from '../../hardcode/HLogicEvent';
import Config from '../../configs/Config';
import {
    ic_gift_gift,
    ic_all_bg,
    ic_bg_top,
    ic_bg_bottom,
    ic_gift_border,
    ic_send_btn,
    ic_send_left,
    ic_gift_combo,
    ic_combo_bg,
    ic_price_diamond,
    ic_gift_main_mic,
    ic_next_recharge,
    ic_select_group,
} from '../../hardcode/skin_imgs/room_gift';
import _RoomGiftFlyAnimateItem from './item/_RoomGiftFlyAnimateItem';
import GiftModel from "../../model/room/GiftModel";
import ToastUtil from '../base/ToastUtil';
import { ic_gold } from '../../hardcode/skin_imgs/main';
import { THEME_COLOR } from '../../styles';
import { COIN_NAME } from '../../hardcode/HGLobal';


/**
 * todo
 * 1. 选择赠送的组数
 * 2. 565 567行
 */

function _getHeadIcon() {
    //UserInfo
    const createUserInfo = RoomInfoCache.createUserInfo;
    if (!createUserInfo) {
        const roomOwnerInfo = RoomInfoCache.ownerUserInfo;
        if (!roomOwnerInfo) {
            return null;
        }

        return { uri: Config.getHeadUrl(roomOwnerInfo.userId, roomOwnerInfo.logoTime, roomOwnerInfo.thirdIconurl) };
    }

    return {
        uri: Config.getRoomCreateLogoUrl(
            RoomInfoCache.roomData.logoTime,
            RoomInfoCache.roomData.roomId,
            createUserInfo.userId,
            createUserInfo.logoTime,
            createUserInfo.thirdIconurl
        )
    }
}

function _getDesc(index) {
    switch (index) {
        case 1:
            return '1';
        case 2:
            return '2';
        case 3:
            return '3';
        case 4:
            return '4';
        case 5:
            return '5';
        case 6:
            return '6';
        case 7:
            return '7';
        case 8:
            return '8';
    }
}

function _getAllMicData() {
    let ret = [];
    if (RoomInfoCache.mainMicUserInfo) {
        ret.push({
            micPostion: 0,
            userId: RoomInfoCache.mainMicUserInfo.userId,
            desc: '房主',
            imageUri: { uri: Config.getHeadUrl(RoomInfoCache.mainMicUserInfo.userId, RoomInfoCache.mainMicUserInfo.logoTime, RoomInfoCache.mainMicUserInfo.thirdIconurl) },
        })
    }
    if (RoomInfoCache.roomData) {
        for (let i = 0; i < 8; i++) {
            const micInfo = RoomInfoCache.roomData.infos[i];
            if (micInfo && micInfo.base) {
                ret.push({
                    micPostion: i + 1,
                    userId: micInfo.base.userId,
                    desc: _getDesc(i + 1),
                    imageUri: { uri: Config.getHeadUrl(micInfo.base.userId, micInfo.base.logoTime, micInfo.base.thirdIconurl) }
                })
            }
        }
    }

    return ret;
}

export default class RoomGiftPanelView extends BaseView {

    constructor(props) {
        super(props)

        this._nowSelectId = this.props.params.userId
    }

    _onClose = () => {
        this.popSelf();
    }

    render() {

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                }}
            >

                {/*顶部区域 点击关闭面板*/}
                <TouchableOpacity
                    style={{
                        flex: 1,
                    }}
                    onPress={this._onClose}
                />

                {/*礼物面板区域*/}
                <View
                    style={{
                        width: DesignConvert.swidth,
                    }}
                >

                    {/*礼物面板 礼物区域 263*/}
                    <_GiftList
                        onClose={this._onClose}
                        nowSelectId={this._nowSelectId}
                    />

                    {/*礼物面板 连击组件 143*/}
                    <_ComboWidget />

                </View>

                <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.addIpxBottomHeight(34),
                        backgroundColor: '#17192B',
                    }}
                />

                {/*礼物面板 送礼到麦位的动画 全屏*/}
                <_RoomGiftFlyAnimateItem />

            </View >

        );
    }
}

let _allMaiSel = false;
let _nowSelectId = '';

class _MaiListWidget extends PureComponent {

    constructor(props) {
        super(props);

        _allMaiSel = false;
        _nowSelectId = this.props.nowSelectId;

        this._allMicList = _getAllMicData();

        if (this._allMicList.length) {

            if (!_nowSelectId) {
                _nowSelectId = this._allMicList[0].userId;
            }
        }
    }

    _isBeSelect = (id) => {
        return _allMaiSel || (_nowSelectId == id);
    }

    _clickAllMai = () => {
        _allMaiSel = !_allMaiSel;
        this.forceUpdate();
    }

    _clickMaiPosition = (id) => {
        _nowSelectId = id;
        this.forceUpdate();
    }

    render() {
        if (this._allMicList.length == 0) return null;

        const _micView = this._allMicList.map(item => {
            const _itemID = item.userId;
            const _desc = item.desc;
            return (
                <TouchableOpacity
                    key={_itemID}
                    onPress={this._clickMaiPosition.bind(this, _itemID)}
                    style={{
                        width: DesignConvert.getW(30),
                        height: DesignConvert.getH(30),
                        marginRight: DesignConvert.getW(13),
                    }}
                >

                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={this._isBeSelect(_itemID) ? ['#8E7AFF', '#C17AFF'] : ['transparent', 'transparent']}
                        style={{
                            width: DesignConvert.getW(28),
                            height: DesignConvert.getH(28),
                            borderRadius: DesignConvert.getW(15),
                            borderWidth: DesignConvert.getW(1),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={item.imageUri}
                            style={{
                                width: DesignConvert.getW(28),
                                height: DesignConvert.getH(28),
                                borderRadius: DesignConvert.getW(14),
                            }}
                        />
                    </LinearGradient>

                    {_desc === '房主' ? this._isBeSelect(_itemID) && <Image
                        source={require('../../hardcode/skin_imgs/ccc').ttq_gift_room_perm()}
                        style={{
                            // display:this._isBeSelect(_itemID)?'flex':'none',
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: DesignConvert.getW(11),
                            height: DesignConvert.getH(11),
                        }} /> : <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={this._isBeSelect(_itemID) ? ['#8E7AFF', '#C17AFF'] : ['#121212', '#121212']}
                            style={{
                                height: DesignConvert.getH(11),
                                borderRadius: DesignConvert.getW(6),
                                // width: _desc === '房主' ? DesignConvert.getW(23) : DesignConvert.getW(10),
                                width: DesignConvert.getW(11),
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                // left: _desc === '房主' ? DesignConvert.getW(3.5) : 0,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: DesignConvert.getF(9),
                                    color: '#FFFFFF',
                                }}
                            >
                                {_desc}
                            </Text>
                        </LinearGradient>}


                </TouchableOpacity>
            )
        })

        return (
            <View
                style={{
                    height: DesignConvert.getH(60),
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#17192B',
                    borderRadius: DesignConvert.getW(10),
                    // marginTop: DesignConvert.getH(15),
                    marginBottom: DesignConvert.getH(5),
                }}
            >

                <Text
                    style={{
                        lineHeight: DesignConvert.getH(30),
                        color: '#D5CEFF',
                        fontSize: DesignConvert.getF(10),
                        textAlign: 'center',
                        marginLeft: DesignConvert.getW(15),
                        marginRight: DesignConvert.getW(5),
                    }}
                >送给：</Text>

                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                >

                    {_micView}

                </ScrollView>

                {/* 全麦字 */}
                <TouchableOpacity
                    onPress={this._clickAllMai}
                    style={{
                        position: 'absolute',
                        right: DesignConvert.getW(15),
                        marginVertical: DesignConvert.getH(19.5),
                        marginLeft: DesignConvert.getW(20),
                    }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={!_allMaiSel ? ['#8E7AFF', '#C17AFF'] : ['#FFFFFF4C', '#FFFFFF4C']}
                        style={{
                            width: DesignConvert.getW(41),
                            height: DesignConvert.getH(21),
                            borderRadius: DesignConvert.getW(30),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(10),
                                color: '#FFFFFF',
                            }}
                        >全选</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>

        )
    }
}

const TAB_GIFT = 1;     // 礼物(对应充值按钮)
const TAB_BAG = 2;      // 背包 (对应一键全赏)
class _GiftList extends PureComponent {

    constructor(props) {
        super(props);

        this._nowSelectId = this.props.nowSelectId
        this._selectGiftId = '';
        this._selectGiftTab = TAB_GIFT;
        this.initPage = 0;

        this._giftList = null;
        this._bagList = null;

        this._giftNum = 1

        // 这两个是请求回来的原始数据 没加工的
        this._originGiftList = null;
        this._originBagList = null;
    }

    componentDidMount() {
        this._requestData(true);

        ModelEvent.addEvent(null, EVT_LOGIC_UPDATE_DO_SEND_GIFT, this._clickSendGift2)
        ModelEvent.addEvent(null, EVT_LOGIC_CHOOSE_GIFT_NUM, this._chooseGiftNume)
    }

    componentWillUnmount() {
        this._isCompUnmount = true

        ModelEvent.removeEvent(null, EVT_LOGIC_UPDATE_DO_SEND_GIFT, this._clickSendGift2)
        ModelEvent.removeEvent(null, EVT_LOGIC_CHOOSE_GIFT_NUM, this._chooseGiftNume)
    }

    /*-------------------------------函数区域-------------------------------- */

    _handleListData = (list) => {
        if (!list || list.length == 0) return null;
        let ret = [];
        // 列表长度
        let len = list.length;
        // 一页显示八个礼物
        const num = 8;
        // 总共有多少页
        const pageCount = (len % num == 0) ? (len / num) : (Math.floor((len / num) + 1))
        for (let i = 0; i < pageCount; i++) {
            ret.push(list.slice(i * num, i * num + num))
        }
        return ret;
    }

    _requestData = async (bSetSelectGiftId) => {
        let ret;
        try {
            ret = await GiftModel.giftAndBagList();

        } catch (error) {
            return;
        }
        if (this._isCompUnmount) return;

        ModelEvent.dispatchEntity(
            null,
            EVT_LOGIC_UPDATE_GIFT_PANEL_CONIN_NUM,
            { totalCoin: ret.bagTotalPrice }
        )

        this._originGiftList = ret.giftList;
        this._originBagList = ret.bagList;
        this._giftList = this._handleListData(this._originGiftList)
        this._bagList = this._handleListData(this._originBagList);


        this._groupNum = 1

        bSetSelectGiftId && this._setSelectGiftId()

        this.forceUpdate();
    }

    _clickGift = (giftItem) => {
        if (this._selectGiftId == giftItem.giftid) {
            return;
        }
        // 切换礼物的时候 关闭连击组件
        ModelEvent.dispatchEntity(null, EVT_LOGIC_UPDATE_COMBO_SHOW, false);
        this._selectGiftId = giftItem.giftid;
        this.forceUpdate();
    }

    _isGiftItemBeSelect = (giftItemId) => {
        return this._selectGiftId == giftItemId;
    }

    _onPageSelected = ({ position, offset }) => {
        this.initPage = position;
    }

    _clickGiftTab = (tabNum) => {
        if (this._selectGiftTab == tabNum) return;

        // 切换tab的时候 关闭连击组件
        ModelEvent.dispatchEntity(null, EVT_LOGIC_UPDATE_COMBO_SHOW, false);
        ModelEvent.dispatchEntity(null, EVT_LOGIC_CHANGE_GIFT_TAB, this._selectGiftTab)

        if (this.initPage != 0) {
            this.initPage = 0
            // 因为是重用控件 切换tab时要回到第一页
            this._viewPagerRef && this._viewPagerRef.setPageWithoutAnimation(this.initPage);
        }
        this._selectGiftTab = tabNum;

        this._requestData(true)

        this.forceUpdate();
    }

    _getOriginGiftList = () => {
        switch (this._selectGiftTab) {
            case TAB_GIFT:
                return this._originGiftList;
            case TAB_BAG:
                return this._originBagList;
            default:
                return null;
        }
    }

    _setSelectGiftId = () => {
        const l = this._getOriginGiftList();
        if (l && l.length) {
            this._selectGiftId = l[0].giftid;
        }
    }

    _isTabBeSelect = (tabNum) => {
        return this._selectGiftTab == tabNum;
    }

    _getNowShowList = (tabNum) => {
        switch (tabNum) {
            case TAB_GIFT:
                return this._giftList;
            case TAB_BAG:
                return this._bagList;
            default:
                return null;
        }
    }

    _getGiftImg = (giftItem) => {
        return { uri: Config.getGiftUrl(giftItem.giftid, giftItem.alterdatetime.toDateTimeTick()) };
    }

    /**
     * 这里如果有函数根据礼物id去获取礼物的vo最好了   
     * 我在礼物面板是没有保存礼物列表的字典的
     */
    _getNowSelectGiftItem = () => {
        const l = this._getOriginGiftList();
        if (!l || l.length == 0) return null;

        for (let i = 0; i < l.length; i++) {
            const _vo = l[i];
            if (_vo.giftid == this._selectGiftId) {
                return _vo;
            }
        }
    }

    _getMicVo = (id) => {
        const _allMicList = _getAllMicData();
        for (let i = 0; i < _allMicList.length; i++) {
            if (_allMicList[i].userId === id) {
                return _allMicList[i];
            }
        }
    }

    _chooseGiftNume = (data) => {
        this._giftNum = data
        // console.log('_giftNum B ----- ' + this._giftNum)
        this.forceUpdate()
    }

    _clickSendGift2 = (data) => {
        this._groupNum = data
        this._clickSendGift()
    }

    _clickSendGift = async () => {
        if (!this._selectGiftId) return;

        const _giftItem = this._getNowSelectGiftItem();

        if (!_giftItem) return;

        if (!_allMaiSel && !_nowSelectId) {
            return;
        }

        const giftImageUri = this._getGiftImg(_giftItem);

        const _allMicList = _getAllMicData();
        let userIds = [];
        let flyArr = [];
        let totalPrice = 0;
        if (_allMaiSel) {
            _allMicList.map(item => {
                userIds.push(item.userId);
                flyArr.push({
                    micPostion: item.micPostion,
                    imageUri: giftImageUri,
                })
                totalPrice += _giftItem.price;
            })
        } else {
            const _micVo = this._getMicVo(_nowSelectId);
            if (!_micVo) return;
            userIds.push(_nowSelectId);
            flyArr.push({
                micPostion: _micVo.micPostion,
                imageUri: giftImageUri,
            })
            totalPrice += _giftItem.price;
        }

        await GiftModel.sendGifts(
            userIds,
            _giftItem.giftid,
            this._giftNum,// giftNum,
            RoomInfoCache.roomId,
            this._groupNum,// groupNum
        ).then(data => {
            if (data) {

                this._requestData()
                // 执行飞行动画
                ModelEvent.dispatchEntity(null, EVT_LOGIC_UPDATE_GIFT_FLY, flyArr);
                // 手动扣减金币数额
                ModelEvent.dispatchEntity(null, EVT_LOGIC_UPDATE_GIFT_PANEL_CONIN_NUM, { diffCoin: -totalPrice })
                // 显示连击组件
                ModelEvent.dispatchEntity(null, EVT_LOGIC_UPDATE_COMBO_SHOW, true);
            }
        })
    }


    _sendAllGfitAndActivityGift = async () => {
        GiftModel.sendAllMyPkgGIfts(_nowSelectId, RoomInfoCache.roomId, false)
            .then(data => {

                if (data) {
                    const _micData = this._getMicVo(_nowSelectId);
                    if (!_micData) return;

                    // for (let i = 0; i < this._bagList.length; i++) {
                    //     const giftItem = this._bagList[i];
                    //     const flyArr = [{
                    //         micPostion: _micData.micPostion,
                    //         imageUri: this._getGiftImg(giftItem)
                    //     }]
                    //     setTimeout(() => {
                    //         // 执行飞行动画
                    //         ModelEvent.dispatchEntity(null, EVT_LOGIC_UPDATE_GIFT_FLY, flyArr);
                    //     }, i * 100)
                    // }
                    this._requestData();
                }
            })
    }

    _sendAllGift = async () => {
        GiftModel.sendAllMyPkgGIfts(_nowSelectId, RoomInfoCache.roomId, true)
            .then(data => {

                if (data) {
                    const _micData = this._getMicVo(_nowSelectId);

                    if (!_micData) return;
                    // for (let i = 0; i < this._bagList.length; i++) {
                    //     const giftItem = this._bagList[i];
                    //     const flyArr = [{
                    //         micPostion: _micData.micPostion,
                    //         imageUri: this._getGiftImg(giftItem)
                    //     }]
                    //     setTimeout(() => {
                    //         // 执行飞行动画
                    //         ModelEvent.dispatchEntity(null, EVT_LOGIC_UPDATE_GIFT_FLY, flyArr);
                    //     }, i * 100)
                    // }
                    this._requestData();
                }
            })
    }



    _clickRechargeOrSend = async () => {
        if (this._selectGiftTab == 1) {
            // 关闭自己 再打开充值页
            this.props.onClose && this.props.onClose();
            require("../../router/level2_router").showMyWalletView();
        } else {
            const bagList = this._getOriginGiftList();
            if (!bagList || bagList.length == 0) {
                ToastUtil.showCenter('背包礼物空空如也')
                return;
            }

            if (_allMaiSel) {
                require("../../view/base/ToastUtil").default.showCenter('一键全赏不能送全麦');
                return;
            }
            if (!_nowSelectId) {
                require("../../view/base/ToastUtil").default.showCenter('没有选中人');
                return;
            }

            try {
                if (await GiftModel.checkBagIncludeActivityGift()) {
                    require("../../router/level2_router").showNormInfoDialog('当前包裹中含有活动礼物，是否确定全部送出？',
                        "确定", this._sendAllGfitAndActivityGift,
                        "取消", undefined);
                } else {
                    require("../../router/level2_router").showNormInfoDialog('是否确定赠送所有背包礼物',
                        "确定", this._sendAllGift,
                        "取消", undefined);
                }
            } catch (error) {
                return;
            }

        }
    }

    _onGroupChoose = () => {
        require('../../router/level3_router').showRoomGiftGroupChooseView();
    }


    /*------------------------------渲染区域--------------------------------- */

    render() {
        const _nowShowGiftList = this._getNowShowList(this._selectGiftTab);

        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    borderTopLeftRadius: DesignConvert.getW(15),
                    borderTopRightRadius: DesignConvert.getW(15),
                }}
            >
                {/*礼物面板 Tab区域 50*/}
                {/* <View
                    style={{
                        flexDirection: 'row',
                        height: DesignConvert.getH(51),
                        alignItems: 'center',
                    }}
                >

                    <TouchableOpacity
                        style={{
                            height: DesignConvert.getH(51),
                            paddingStart: DesignConvert.getW(15),
                            paddingEnd: DesignConvert.getW(15),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={this._clickGiftTab.bind(this, TAB_GIFT)}
                    >
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(12),
                                color: this._isTabBeSelect(TAB_GIFT) ? '#FFFFFF' : '#FFFFFF80',
                                fontWeight: this._isTabBeSelect(TAB_GIFT) ? 'bold' : 'normal',
                                fontSize: this._isTabBeSelect(TAB_GIFT) ? DesignConvert.getF(14) : DesignConvert.getF(14),
                            }}
                        >
                            {'礼物'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            height: DesignConvert.getH(51),
                            paddingStart: DesignConvert.getW(15),
                            paddingEnd: DesignConvert.getW(15),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={this._clickGiftTab.bind(this, TAB_BAG)}
                    >
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(12),
                                color: this._isTabBeSelect(TAB_BAG) ? '#FFFFFF' : '#FFFFFF80',
                                fontWeight: this._isTabBeSelect(TAB_BAG) ? 'bold' : 'normal',
                                fontSize: this._isTabBeSelect(TAB_BAG) ? DesignConvert.getF(14) : DesignConvert.getF(14),
                            }}
                        >
                            {'背包'}
                        </Text>
                    </TouchableOpacity>

                </View> */}

                {/*礼物面板 麦位区域 57*/}
                <_MaiListWidget
                    nowSelectId={this._nowSelectId}
                />

                {/*礼物面板 礼物区域 50*/}
                <View
                    style={{
                        // flexDirection: 'row',
                        backgroundColor: '#17192B',
                        borderTopLeftRadius: DesignConvert.getW(10),
                        borderTopRightRadius: DesignConvert.getW(10),
                        height: DesignConvert.getH(261),
                    }}
                >
                    <View
                        style={{
                            marginTop: DesignConvert.getH(15),
                            marginHorizontal: DesignConvert.getW(15),
                            marginBottom: DesignConvert.getH(10),
                            flexDirection: 'row',
                            // width: DesignConvert.getW(64),

                            // height: DesignConvert.getH(200),
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                // width: DesignConvert.getW(60),
                                // height: DesignConvert.getH(45),
                                // borderTopRightRadius: DesignConvert.getW(15),
                                // borderBottomRightRadius: DesignConvert.getW(15),
                                // justifyContent: 'center',
                                alignItems: 'center',
                                // backgroundColor: this._isTabBeSelect(TAB_GIFT) ? '#362165' : 'transparent',
                                // marginTop: DesignConvert.getH(17.5),
                            }}
                            onPress={this._clickGiftTab.bind(this, TAB_GIFT)}
                        >
                            <Text
                                style={{
                                    fontSize: DesignConvert.getF(14),
                                    fontWeight: 'bold',
                                    color: this._isTabBeSelect(TAB_GIFT) ? '#FFFFFF' : '#FFFFFF4C',
                                }}
                            >
                                {'礼物'}
                            </Text>
                            {this._isTabBeSelect(TAB_GIFT) && <View
                                style={{
                                    width: DesignConvert.getW(8),
                                    height: DesignConvert.getH(3),
                                    marginTop: DesignConvert.getH(2),
                                    borderRadius: DesignConvert.getW(3),
                                    backgroundColor: '#FFFFFF',
                                }} />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                // width: DesignConvert.getW(60),
                                // height: DesignConvert.getH(45),
                                // borderTopRightRadius: DesignConvert.getW(15),
                                // borderBottomRightRadius: DesignConvert.getW(15),
                                // justifyContent: 'center',
                                alignItems: 'center',
                                // backgroundColor: this._isTabBeSelect(TAB_BAG) ? '#362165' : 'transparent',
                                // marginTop: DesignConvert.getH(42.5),
                                marginLeft: DesignConvert.getW(20),
                            }}
                            onPress={this._clickGiftTab.bind(this, TAB_BAG)}
                        >
                            <Text
                                style={{
                                    fontSize: DesignConvert.getF(14),
                                    fontWeight: 'bold',
                                    color: this._isTabBeSelect(TAB_BAG) ? '#FFFFFF' : '#FFFFFF4C',
                                }}
                            >
                                {'背包'}
                            </Text>
                            {this._isTabBeSelect(TAB_BAG) && <View
                                style={{
                                    width: DesignConvert.getW(8),
                                    height: DesignConvert.getH(3),
                                    marginTop: DesignConvert.getH(2),
                                    borderRadius: DesignConvert.getW(3),
                                    backgroundColor: '#FFFFFF',
                                }} />}
                        </TouchableOpacity>

                        <_BagValue onPress={this._clickRechargeOrSend} />

                    </View>
                    {
                        _nowShowGiftList && (
                            <IndicatorViewPager
                                ref={ref => this._viewPagerRef = ref}
                                style={{
                                    width: '100%',
                                    height: DesignConvert.getH(200),
                                    overflow: 'hidden',
                                }}
                                initialPage={this.initPage}
                                onPageSelected={this._onPageSelected}
                                indicator={this._renderDotIndicator(_nowShowGiftList.length)}>
                                {
                                    _nowShowGiftList.map((pageData, pageIndex) => {
                                        return this._renderGiftItem(pageData, pageIndex)
                                    })
                                }
                            </IndicatorViewPager>
                        )
                    }

                </View>

                {/*礼物面板 充值区域 60*/}
                <View
                    style={{
                        flexDirection: 'row',
                        // height: DesignConvert.getH(30),
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#17192B',
                        paddingBottom: DesignConvert.getH(15),
                    }}
                >

                    <_CoinWidget />

                    {/* <_BagValue
                        onPress={this._clickRechargeOrSend}
                    /> */}

                    {/* {this._selectGiftTab == TAB_GIFT && */}

                    <TouchableOpacity
                        onPress={this._clickRechargeOrSend}
                        style={{
                            height: DesignConvert.getH(30),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: DesignConvert.getW(10),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(13),
                                color: '#8E7AFF',
                            }}
                        >去充值</Text>
                        <Image
                            source={require('../../hardcode/skin_imgs/ccc').ttq_gift_recharge_icon()}
                            style={{
                                width: DesignConvert.getW(4),
                                height: DesignConvert.getH(7),
                                marginLeft: DesignConvert.getW(3),
                            }}
                        />
                    </TouchableOpacity>
                    {/* } */}

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            position: 'absolute',
                            right: DesignConvert.getW(15),
                            bottom: DesignConvert.getH(15),
                        }}
                    >
                        <TouchableOpacity
                            onPress={this._onGroupChoose}
                        >

                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 0 }}
                                colors={['#8E7AFF', '#C17AFF']}
                                style={{
                                    width: DesignConvert.getW(61),
                                    height: DesignConvert.getH(24),
                                    borderBottomLeftRadius: DesignConvert.getW(16.5),
                                    borderTopLeftRadius: DesignConvert.getW(16.5),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: -1,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        width: DesignConvert.getW(59),
                                        height: DesignConvert.getH(22),
                                        borderBottomLeftRadius: DesignConvert.getW(15.5),
                                        borderTopLeftRadius: DesignConvert.getW(15.5),
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        marginRight: -1,
                                        backgroundColor: '#17192B',
                                    }}
                                >
                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: 'center',
                                            fontSize: DesignConvert.getF(11),
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        x{this._giftNum}
                                    </Text>

                                    <Image
                                        source={require('../../hardcode/skin_imgs/ccc').ttq_gift_count_arrow()}
                                        style={{
                                            width: DesignConvert.getW(7),
                                            height: DesignConvert.getH(4),
                                            marginRight: DesignConvert.getW(8),
                                            resizeMode: 'contain',
                                        }}
                                    />
                                </View>

                            </LinearGradient>

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._clickSendGift}
                        >
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#8E7AFF', '#C17AFF']}
                                style={{
                                    width: DesignConvert.getW(50),
                                    height: DesignConvert.getH(24),
                                    borderBottomRightRadius: DesignConvert.getW(16.5),
                                    borderTopRightRadius: DesignConvert.getW(16.5),
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#FFFFFF',
                                        fontSize: DesignConvert.getF(11)
                                    }}
                                >送礼</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }

    _renderDotIndicator = (pageCount) => {
        return (
            <PagerDotIndicator
                pageCount={pageCount}
                style={{
                    width: DesignConvert.swidth,
                    position: 'absolute',
                    bottom: 0,
                }}
                dotStyle={{
                    width: DesignConvert.getW(6),
                    height: DesignConvert.getH(6),
                    borderRadius: DesignConvert.getW(3),
                    backgroundColor: '#FFFFFF4C',
                    marginHorizontal: DesignConvert.getW(4),
                }}
                selectedDotStyle={{
                    backgroundColor: '#FFFFFF',
                    width: DesignConvert.getW(6),
                    height: DesignConvert.getH(6),
                    borderRadius: DesignConvert.getW(3),
                    marginHorizontal: DesignConvert.getW(4),
                }}
            />
        )
    }

    _renderGiftItem = (pageData, pageIndex) => {
        let pageGiftViews = pageData.map(giftItem => {
            const _giftItemId = giftItem.giftid;
            return (
                <TouchableOpacity
                    onPress={this._clickGift.bind(this, giftItem)}
                    key={_giftItemId}
                    style={{
                        width: DesignConvert.getW(81),
                        height: DesignConvert.getH(81),
                        alignItems: "center",
                        marginHorizontal: (DesignConvert.swidth - DesignConvert.getW(324)) / 8,
                        // marginRight: DesignConvert.getW(7),
                        // marginBottom: DesignConvert.getH(11),
                        // backgroundColor: this._isGiftItemBeSelect(_giftItemId) ? '#362165' : '#0D091A',
                        borderWidth: this._isGiftItemBeSelect(_giftItemId) ? DesignConvert.getW(1.5) : 0,
                        borderRadius: DesignConvert.getW(10),
                        borderColor: this._isGiftItemBeSelect(_giftItemId) ? '#8E7AFF' : 'transparent',
                        paddingVertical: DesignConvert.getH(5),
                    }}
                >
                    <View
                        style={{

                        }}
                    >

                        <Image
                            source={this._getGiftImg(giftItem)}
                            style={{
                                width: DesignConvert.getW(36),
                                height: DesignConvert.getH(36),
                                resizeMode: 'contain',
                            }}
                        />
                        {giftItem.isActivity && this._isTabBeSelect(TAB_BAG) && <ImageBackground
                            source={require('../../hardcode/skin_imgs/room').activity_icon()}

                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: DesignConvert.getW(24),
                                height: DesignConvert.getH(13),

                                borderTopRightRadius: DesignConvert.getW(5),
                                borderBottomLeftRadius: DesignConvert.getW(5),

                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    color: '#FFFFFF',
                                    fontSize: DesignConvert.getF(9)
                                }}
                            >锦鲤</Text>
                        </ImageBackground>}
                    </View>

                    <Text
                        style={{
                            fontSize: DesignConvert.getF(10),
                            marginTop: DesignConvert.getH(5),
                            color: '#FFFFFF'
                        }}
                    >
                        {giftItem.giftname}
                    </Text>

                    {/* <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: DesignConvert.getH(3),
                        }}
                    >
                        <Image
                            source={require('../../hardcode/skin_imgs/ccc').ttq_gift_coin()}
                            style={{
                                width: DesignConvert.getW(10),
                                height: DesignConvert.getH(10),
                            }}
                        /> */}
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(10),
                            color: '#FFFFFF',
                            marginTop: DesignConvert.getH(2),
                        }}
                    >
                        {`${giftItem.price}${COIN_NAME}`}
                    </Text>
                    {/* </View> */}


                    {giftItem.count > 0 && this._selectGiftTab != TAB_GIFT && (
                        <View
                            style={{
                                position: 'absolute',
                                top: DesignConvert.getH(3),
                                right: DesignConvert.getW(4),
                                // minWidth: DesignConvert.getW(18),
                                // height: DesignConvert.getH(18),
                                justifyContent: 'center',
                                alignItems: 'center',
                                // backgroundColor: '#7141D3',
                                // borderTopRightRadius: DesignConvert.getW(6),
                                // borderBottomLeftRadius: DesignConvert.getW(7),
                            }}
                        >
                            <Text
                                style={{
                                    color: '#8E7AFF',
                                    fontSize: DesignConvert.getF(10),
                                }}
                            >x{giftItem.count}</Text>
                        </View>

                    )}

                    {/* ic_price_diamond */}


                    {/* {
                        this._isGiftItemBeSelect(_giftItemId) ?
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                colors={['#5EFEFE', '#3FC2F3']}
                                style={{
                                    position: 'absolute',
                                    top: DesignConvert.getH(22),
                                    left: DesignConvert.getH(21),
                                    width: DesignConvert.getW(9),
                                    height: DesignConvert.getH(9),
                                    borderRadius: DesignConvert.getW(2),
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#333333',
                                        fontSize: DesignConvert.getF(6)
                                    }}
                                >连</Text>
                            </LinearGradient>
                            : null
                    } */}
                </TouchableOpacity>
            )
        })
        return (
            <View
                // 这个key可以考虑用加上tabid
                key={pageIndex}
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    height: DesignConvert.getH(208),
                }}
            >
                {pageGiftViews}
            </View>
        )
    }

}

class _CoinWidget extends PureComponent {

    constructor(props) {
        super(props);

        this._selectGiftTab = 0
        this._walletPrice = 0

        require('../../model/BagModel').default.getWallet()
            .then(data => {
                if (data) {
                    this._walletPrice = data.goldShell
                    this.forceUpdate()
                }
            })

    }

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_UPDATE_WALLET, this._updateWllet)
        ModelEvent.addEvent(null, EVT_LOGIC_UPDATE_GIFT_PANEL_CONIN_NUM, this._updateCoin)
        ModelEvent.addEvent(null, EVT_LOGIC_CHANGE_GIFT_TAB, this._changeTab)
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_UPDATE_WALLET, this._updateWllet)
        ModelEvent.removeEvent(null, EVT_LOGIC_UPDATE_GIFT_PANEL_CONIN_NUM, this._updateCoin)
        ModelEvent.removeEvent(null, EVT_LOGIC_CHANGE_GIFT_TAB, this._changeTab)
    }

    _updateWllet = (data) => {
        this._walletPrice = data
        this.forceUpdate()
    }

    _changeTab = (data) => {
        this._selectGiftTab = data
        this.forceUpdate()
    }


    /**
     * totalCoin 如果有这个值 直接替换
     * 否则 根据diffCoin 在原始的金币数额做手动加减 
     * diffCoin 可以是正值 也可以是负值
     */
    _updateCoin = ({ totalCoin, diffCoin }) => {
        // this.forceUpdate();
    }

    render() {
        // if (this._selectGiftTab == 1) {
        //     return null
        // }

        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: DesignConvert.getW(15),
                    height: DesignConvert.getH(30),
                }}
            >
                <Image
                    source={require('../../hardcode/skin_imgs/ccc').ttq_gift_coin()}
                    style={{
                        width: DesignConvert.getW(16),
                        height: DesignConvert.getH(16),
                    }}
                />
                <Text
                    style={{
                        fontSize: DesignConvert.getF(13),
                        color: '#FFFFFF',
                        marginLeft: DesignConvert.getW(5)
                    }}>{this._walletPrice}</Text>

            </View>
        )
    }
}



class _BagValue extends PureComponent {

    constructor(props) {
        super(props);

        this._selectGiftTab = 0
        this._walletPrice = 0
        this._bagTotalPrice = 0;

        require('../../model/BagModel').default.getWallet()
            .then(data => {
                if (data) {
                    this._walletPrice = data.goldShell
                    this.forceUpdate()
                }
            })

    }

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_UPDATE_WALLET, this._updateWllet)
        ModelEvent.addEvent(null, EVT_LOGIC_UPDATE_GIFT_PANEL_CONIN_NUM, this._updateCoin)
        ModelEvent.addEvent(null, EVT_LOGIC_CHANGE_GIFT_TAB, this._changeTab)
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_UPDATE_WALLET, this._updateWllet)
        ModelEvent.removeEvent(null, EVT_LOGIC_UPDATE_GIFT_PANEL_CONIN_NUM, this._updateCoin)
        ModelEvent.removeEvent(null, EVT_LOGIC_CHANGE_GIFT_TAB, this._changeTab)
    }

    _updateWllet = (data) => {
        this._walletPrice = data
        this.forceUpdate()
    }

    _changeTab = (data) => {
        this._selectGiftTab = data
        this.forceUpdate()
    }


    /**
     * totalCoin 如果有这个值 直接替换
     * 否则 根据diffCoin 在原始的金币数额做手动加减 
     * diffCoin 可以是正值 也可以是负值
     */
    _updateCoin = ({ totalCoin, diffCoin }) => {
        if (totalCoin) {
            this._bagTotalPrice = totalCoin;
        } else {
            this._bagTotalPrice += diffCoin;
            if (this._bagTotalPrice < 0) {
                this._bagTotalPrice = 0;
            }
        }
        this.forceUpdate();
    }

    render() {
        if (this._selectGiftTab != 1) {
            return null
        }

        return (


            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    width: DesignConvert.getW(284),
                    paddingHorizontal: DesignConvert.getW(15),
                    // height: DesignConvert.getH(30),
                }}
            >
                {/* <Image
                    source={require('../../hardcode/skin_imgs/ccc').ttq_gift_coin()}
                    style={{
                        width: DesignConvert.getW(14),
                        height: DesignConvert.getH(14),
                    }}
                /> */}


                <TouchableOpacity
                    onPress={this.props.onPress}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#8E7AFF', '#C17AFF']}
                        style={{
                            width: DesignConvert.getW(52),
                            height: DesignConvert.getH(21),
                            borderRadius: DesignConvert.getW(30),

                            alignItems: 'center',
                            justifyContent: 'center',

                        }}
                    >
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(10),
                                color: '#FFFFFF',
                            }}
                        >
                            {'一键全送'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Text
                    style={{
                        fontSize: DesignConvert.getF(10),
                        // fontWeight: 'bold',
                        color: '#FFFFFF',
                        // marginLeft: DesignConvert.getW(5)
                    }}>总价值：{this._bagTotalPrice ? this._bagTotalPrice : 0}{COIN_NAME}</Text>

            </View>

        )
    }
}


class _ComboWidget extends PureComponent {

    constructor(props) {
        super(props);

        this._comboShow = false;     // 是否显示连击面板

        this._scaleValue = new Animated.Value(0.4);
        this._opacityValue = new Animated.Value(0);
        this._rotateValue = new Animated.Value(1);
    }

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_LOGIC_UPDATE_COMBO_SHOW, this.changeComboShow)
    }

    componentWillUnmount() {
        this._isCompUnmount = true;

        this._stopAppearAnimate();
        this._stopDisappearAnimate();

        ModelEvent.removeEvent(null, EVT_LOGIC_UPDATE_COMBO_SHOW, this.changeComboShow)
    }

    changeComboShow = (bool) => {
        if (this._comboShow == bool) return;

        if (bool) {
            this._comboShow = bool;
            this.forceUpdate();

            // 不可以直接播出场动画  等待界面刷新完毕之后再执行出场动画
            setTimeout(() => {
                if (this._isCompUnmount) return;
                this._startAppearAnimate();
            }, 50)
        } else {
            // 执行消失动画
            this._startDisappearAnimate()
        }
    }

    // 出场是 单位:帧
    // 1秒30帧算  1帧大约33毫秒
    // 0 -> 8   40%放大到110%   反旋转45度   透明度 0->1
    // 8 -> 12  缩放到100%
    _startAppearAnimate = () => {
        this._scaleValue.setValue(0.4);
        this._opacityValue.setValue(0);
        this._rotateValue.setValue(1);

        const oneFrame = 33;        // 一帧

        this._appearAnimate = Animated.sequence([
            Animated.parallel([
                // 40%放大到110%
                Animated.timing(
                    this._scaleValue,
                    {
                        toValue: 1.1,
                        duration: oneFrame * 8,
                        easing: Easing.linear,
                        isInteraction: false,
                        useNativeDriver: true,
                    }
                ),
                // 反旋转45度
                Animated.timing(
                    this._rotateValue,
                    {
                        toValue: 0,
                        duration: oneFrame * 8,
                        easing: Easing.linear,
                        isInteraction: false,
                        useNativeDriver: true,
                    }
                ),
                // 整体透明度 变为 100%
                Animated.timing(
                    this._opacityValue,
                    {
                        toValue: 1,
                        duration: oneFrame * 8,
                        easing: Easing.linear,
                        isInteraction: false,
                        useNativeDriver: true,
                    }
                ),
            ]),
            // 缩小到100%
            Animated.timing(
                this._scaleValue,
                {
                    toValue: 1,
                    duration: oneFrame * 4,
                    easing: Easing.linear,
                    isInteraction: false,
                    useNativeDriver: true,
                }
            ),
        ])

        this._appearAnimate.start(
            endState => {
                if (this._isCompUnmount) return;

                if (endState.finished) {
                    this._stopAppearAnimate();

                    ModelEvent.dispatchEntity(null, EVT_LOGIC_UPDATE_COMBO_TIME)
                }
            }
        )
    }

    _stopAppearAnimate = () => {
        this._appearAnimate && this._appearAnimate.stop();
        this._appearAnimate = null;
    }

    // 消失是 单位:帧
    // 1秒30帧算  1帧大约33毫秒
    // 0 -> 4   放大到 110%
    // 4 -> 8   旋转 45度, 缩小到 75%
    // 8 -> 12  缩小到 40%
    // 整体透明度 变为 0%
    _startDisappearAnimate = () => {
        this._scaleValue.setValue(1);
        this._opacityValue.setValue(1);
        this._rotateValue.setValue(0);

        const oneFrame = 33;        // 一帧

        this._disappearAnimate = Animated.parallel([
            Animated.sequence([
                // 放大到 110%
                Animated.timing(
                    this._scaleValue,
                    {
                        toValue: 1.1,
                        duration: oneFrame * 4,
                        easing: Easing.linear,
                        isInteraction: false,
                        useNativeDriver: true,
                    }
                ),

                // 同时 旋转45读 缩小到 75%
                Animated.parallel([
                    Animated.timing(
                        this._scaleValue,
                        {
                            toValue: 0.75,
                            duration: oneFrame * 4,
                            easing: Easing.linear,
                            isInteraction: false,
                            useNativeDriver: true,
                        }
                    ),
                    // 旋转 45度
                    Animated.timing(
                        this._rotateValue,
                        {
                            toValue: 1,
                            duration: oneFrame * 4,
                            easing: Easing.linear,
                            isInteraction: false,
                            useNativeDriver: true,
                        }
                    )
                ]),
                // 缩小到 40%
                Animated.timing(
                    this._scaleValue,
                    {
                        toValue: 0.4,
                        duration: oneFrame * 4,
                        easing: Easing.linear,
                        isInteraction: false,
                        useNativeDriver: true,
                    }
                ),
            ]),
            // 整体透明度 变为 0%
            Animated.timing(
                this._opacityValue,
                {
                    toValue: 0,
                    duration: oneFrame * 12,
                    easing: Easing.linear,
                    isInteraction: false,
                    useNativeDriver: true,
                }
            )
        ])

        this._disappearAnimate.start(
            endState => {
                if (this._isCompUnmount) return;

                if (endState.finished) {
                    this._stopDisappearAnimate();

                    this._comboShow = false;

                    this.forceUpdate();
                }
            }
        )
    }

    _stopDisappearAnimate = () => {
        this._disappearAnimate && this._disappearAnimate.stop();
        this._disappearAnimate = null;
    }

    _clickGroup = (groupNum) => {

        // 重置倒计时
        ModelEvent.dispatchEntity(null, EVT_LOGIC_UPDATE_COMBO_TIME)

        // 发送礼物
        ModelEvent.dispatchEntity(null, EVT_LOGIC_UPDATE_DO_SEND_GIFT, groupNum)
    }

    render() {
        if (!this._comboShow) return null;

        return (
            <Animated.View
                style={{
                    width: DesignConvert.getW(143),
                    height: DesignConvert.getH(143),
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    transform: [
                        { scale: this._scaleValue },
                        {
                            rotate: this._rotateValue.interpolate({
                                inputRange: [0, 1],//输入值
                                outputRange: ['0deg', '-45deg'] //输出值
                            })
                        },
                    ],
                    opacity: this._opacityValue,
                }}
            >

                <Image
                    source={ic_combo_bg()}
                    style={{
                        width: DesignConvert.getW(143),
                        height: DesignConvert.getH(143),
                        position: 'absolute',
                    }}
                />

                {/* 1 */}
                <TouchableOpacity
                    onPress={this._clickGroup.bind(this, 1)}
                    style={{
                        position: 'absolute',
                        right: DesignConvert.getW(13),
                        top: DesignConvert.getH(34),
                        width: DesignConvert.getW(30),
                        height: DesignConvert.getH(30),
                        borderRadius: DesignConvert.getW(15),
                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#FFFFFF',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: THEME_COLOR,
                    }}
                >
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(15),
                            color: '#FFFFFF',
                        }}
                    >
                        {'1'}
                    </Text>
                </TouchableOpacity>

                {/* 10 */}
                <TouchableOpacity
                    onPress={this._clickGroup.bind(this, 10)}
                    style={{
                        position: 'absolute',
                        right: DesignConvert.getW(52),
                        top: DesignConvert.getH(34),
                        width: DesignConvert.getW(30),
                        height: DesignConvert.getH(30),
                        borderRadius: DesignConvert.getW(15),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: THEME_COLOR,
                    }}
                >
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(15),
                            color: '#FFFFFF',
                        }}
                    >
                        {'10'}
                    </Text>
                </TouchableOpacity>

                {/* 66 */}
                <TouchableOpacity
                    onPress={this._clickGroup.bind(this, 66)}
                    style={{
                        position: 'absolute',
                        right: DesignConvert.getW(79),
                        top: DesignConvert.getH(61),
                        width: DesignConvert.getW(30),
                        height: DesignConvert.getH(30),
                        borderRadius: DesignConvert.getW(15),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: THEME_COLOR,
                    }}
                >
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(15),
                            color: '#FFFFFF',
                        }}
                    >
                        {'66'}
                    </Text>
                </TouchableOpacity>

                {/* 199 */}
                <TouchableOpacity
                    onPress={this._clickGroup.bind(this, 199)}
                    style={{
                        position: 'absolute',
                        right: DesignConvert.getW(79),
                        top: DesignConvert.getH(100),
                        width: DesignConvert.getW(30),
                        height: DesignConvert.getH(30),
                        borderRadius: DesignConvert.getW(15),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: THEME_COLOR,
                    }}
                >
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(15),
                            color: '#FFFFFF',
                        }}
                    >
                        {'199'}
                    </Text>
                </TouchableOpacity>

                {/* 连击 */}
                <CircleProgress onClickCombo={this._clickGroup} />

            </Animated.View>
        )
    }
}

class CircleProgress extends PureComponent {

    constructor(props) {
        super(props);

        this._pTime = null;
        this._totalTime = 5;       // 倒计时总时间
        this._currentTime = 0;      // 当前的时间
        this._currentProgress = this._currentTime / this._totalTime;
        this._intervalTime = 200;    // 轮训间隔   这个间隔可以根据总时间长度来调整
    }

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_LOGIC_UPDATE_COMBO_TIME, this._resetComboTime)
    }

    componentWillUnmount() {
        this._isCompUnmount = true;

        this._clearPTime()

        ModelEvent.removeEvent(null, EVT_LOGIC_UPDATE_COMBO_TIME, this._resetComboTime)
    }

    _resetComboTime = () => {
        this._startPTime()
    }

    _startPTime = () => {
        this._currentTime = 0;

        this._currentProgress = this._currentTime / this._totalTime;
        const rate = (1 - this._currentProgress) / ((this._totalTime - this._currentTime) * (1000 / this._intervalTime))
        this._clearPTime();
        this._pTime = setInterval(() => {
            this._currentProgress += rate;
            if (this._currentProgress >= 1) {

                this._clearPTime()
                ModelEvent.dispatchEntity(null, EVT_LOGIC_UPDATE_COMBO_SHOW, false);
            }
            this.forceUpdate();
        }, this._intervalTime)
    }

    _clearPTime = () => {
        if (this._pTime) {
            clearInterval(this._pTime);
            this._pTime = null;
        }
    }

    _clickCombo = () => {
        this.props.onClickCombo && this.props.onClickCombo(1);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this._clickCombo}
                style={{
                    position: 'absolute',
                    right: DesignConvert.getW(13),
                    bottom: DesignConvert.getH(13),
                    width: DesignConvert.getW(60),
                    height: DesignConvert.getH(60),
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                activeOpacity={1.0}
            >

                {this._currentProgress >= 1 ? null :
                    <Progress.Circle
                        unfilledColor={'#4A4152'}   		// 剩余进度的颜色
                        color={'#FFDF5F'}           				// 颜色
                        progress={this._currentProgress}
                        size={DesignConvert.getW(60)}
                        style={{
                            position: 'absolute'
                        }}
                        thickness={DesignConvert.getW(3)}              // 内圆厚度
                        direction={"clockwise"}    // 方向		PropTypes.oneOf(['clockwise', 'counter-clockwise']),
                        borderWidth={0}          // 边框
                    />
                }

                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[THEME_COLOR, THEME_COLOR]}
                    style={{
                        width: DesignConvert.getW(50),
                        height: DesignConvert.getH(50),
                        borderRadius: DesignConvert.getW(25),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={ic_gift_combo()}
                        style={{
                            width: DesignConvert.getW(37.5),
                            height: DesignConvert.getH(18),
                        }}
                    />
                </LinearGradient>

            </TouchableOpacity>
        )
    }
}