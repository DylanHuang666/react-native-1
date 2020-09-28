/**
 * 我的收益
 */

'use strict';

import React, { PureComponent } from "react";
import { Image, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { COIN_NAME } from '../../hardcode/HGLobal';
import DesignConvert from "../../utils/DesignConvert";
import StringUtil from "../../utils/StringUtil";
import BackTitleView from "../base/BackTitleView";
import BaseView from "../base/BaseView";
import { flowRecord } from './RecordView';

//兑换金币
class ExchangeButton extends PureComponent {
    /**
     * 判断是否绑定手机
     * 判断是否设置支付密码
     * 然后跳转兑换页
     */
    _exchangePress = () => {
        require('../../model/anchorincome/AnchorIncomeModel').default.onClickExchange()
    }

    render() {

        return (
            <TouchableOpacity
                style={{
                    position: "absolute",
                    top: DesignConvert.getH(30),
                    left: DesignConvert.getW(53),
                }}
                onPress={this._exchangePress}
            >
                <View
                    style={{
                        width: DesignConvert.getW(120),
                        height: DesignConvert.getH(30),
                        backgroundColor: 'tranparent',

                        borderRadius: DesignConvert.getW(20),
                        borderColor: '#FEA136',
                        borderWidth: DesignConvert.getBorderWidth(1),

                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: '#FEA136',
                            fontSize: DesignConvert.getF(13),
                            fontWeight: "normal",
                        }}
                    >{`兑换${COIN_NAME}`}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

//提现
class WithdrawButton extends PureComponent {

    render() {

        return (
            <TouchableOpacity
                style={{
                    position: "absolute",
                    top: DesignConvert.getH(30),
                    right: DesignConvert.getW(53),
                }}
                onPress={this.props.onPress}
            >
                <View
                    style={{
                        width: DesignConvert.getW(120),
                        height: DesignConvert.getH(30),
                        backgroundColor: '#FEA136',

                        borderRadius: DesignConvert.getW(20),

                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: DesignConvert.getF(13),
                            fontWeight: "normal",
                        }}
                    >收益提现</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

class RecordBtn extends PureComponent {

    render() {
        return (
            <TouchableOpacity
                style={{
                    alignItems: "center",
                    width: DesignConvert.getW(345),
                    height: DesignConvert.getH(60),
                    borderRadius: DesignConvert.getW(20),
                    paddingHorizontal: DesignConvert.getW(15),
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    marginBottom: DesignConvert.getH(12),
                }}
                onPress={this.props.onPress}
            >
                <Image
                    source={this.props.img}
                    style={{
                        width: DesignConvert.getW(36),
                        height: DesignConvert.getW(36),
                        marginRight: DesignConvert.getW(12),
                    }} />
                <Text
                    style={{
                        color: "#1D1D1D",
                        fontSize: DesignConvert.getF(13),
                    }}
                >{this.props.text}</Text>

                <Image
                    style={{
                        position: 'absolute',
                        right: DesignConvert.getW(13),
                        width: DesignConvert.getW(7),
                        height: DesignConvert.getH(12.5),
                        resizeMode: 'contain',
                    }}
                    source={this.props.openImg}
                />
            </TouchableOpacity>
        )
    }
}

//收益页
export default class AnchorIncomeView extends BaseView {

    constructor(props) {
        super(props);

        this._weekEarning = 0;
        this._accountMoney = 0;

        this._minCatchValue = 100;
        this._maxCatchValue = 10000;

        this._selectedRecord = flowRecord;
    }

    _onBackPress = () => {
        this.popSelf();
    }

    _explanationPress = () => {
        require("../../router/level2_router").showInfoDialog("1.发起提现后，下个工作日到账；\n2.目前平台提现不需要收取手续费，\n后续手续费费率会根据相关政策。");
    }

    /**
     * 四个记录
     */
    _flowRecord = () => {
        require("../../router/level3_router").showRecordView(require("./RecordView").flowRecord);
    }
    _withdrawalsRecord = () => {
        require("../../router/level3_router").showRecordView(require("./RecordView").withdrawRecord);
    }
    _exchangeRecord = () => {
        require("../../router/level3_router").showRecordView(require("./RecordView").exchangeRecord);
    }
    _liveFlowRecord = () => {
        require("../../router/level3_router").showRecordView(require("./RecordView").liveFlowRecord);
    }

    onResume() {
        this._initData();
    }

    componentDidMount() {
        super.componentDidMount();

        this._initData();
        require('../../model/anchorincome/AnchorIncomeModel').default.getPublicConfigTableData()
            .then(data => {
                if (!data) {
                    return;
                }

                this._minCatchValue = data.minCatch;
                this._maxCatchValue = data.maxCatch;
                this.forceUpdate();
            });
    }

    _initData = () => {
        require('../../model/anchorincome/AnchorIncomeModel').default.getIncomeData()
            .then(data => {
                this._weekEarning = Math.floor(data.weekLiveEarn) / 100;
                this._accountMoney = Math.floor(data.balance) / 100;
                this._dayLiveRecv = Math.floor(data.dayLiveRecv) / 100;
                this._dayLiveEarn = Math.floor(data.dayLiveEarn) / 100;
                this._totalLiveEarn = Math.floor(data.totalLiveEarn) / 100;
                this.forceUpdate();
            });
    }

    _incomeDetail = () => {
        // require("../../router/level2_router").showAnchorIncomeBill();
        require("../../router/level3_router").showRecordDialog();
    }

    _withdrawPress = () => {
        require('../../model/anchorincome/AnchorIncomeModel').default.toWithdraw(this._accountMoney, this._minCatchValue, this._maxCatchValue);
    }

    _topBar = () => {
        return (
            <View
                style={{
                    flex: 1,
                    marginTop: DesignConvert.getH(16)
                }}>

                <View
                    style={{
                        justifyContent: "center",
                        paddingLeft: DesignConvert.getW(60)
                    }}>
                    <Text
                        style={{
                            color: "#E8FFFD",
                            fontSize: DesignConvert.getF(10),
                        }}
                    >{"可提现金额 (元)"}</Text>

                    <Text
                        style={{
                            color: "white",
                            fontSize: DesignConvert.getF(13),
                            marginTop: DesignConvert.getH(3),
                        }}
                    >{StringUtil.formatMoney(this._accountMoney)}</Text>
                </View>

                <View
                    style={{
                        flex: 1,
                        // paddingLeft: DesignConvert.getW(18),
                        alignItems: "center",
                        flexDirection: "row",
                    }}>
                    <View
                        style={{
                            marginLeft: DesignConvert.getW(32),
                        }}>

                        <Text
                            style={{
                                color: "#E8FFFD",
                                fontSize: DesignConvert.getF(10),
                            }}
                        >{"总收益 (元)"}</Text>

                        <Text
                            style={{
                                color: "white",
                                fontSize: DesignConvert.getF(13),
                                fontWeight: "bold",
                                marginTop: DesignConvert.getH(3),
                            }}
                        >{StringUtil.formatMoney(this._totalLiveEarn)}</Text>
                    </View>

                    <View
                        style={{
                            marginLeft: DesignConvert.getW(18),
                            justifyContent: "center",
                        }}>
                        <Text
                            style={{
                                color: "#E8FFFD",
                                fontSize: DesignConvert.getF(10),
                            }}
                        >{"本日收益 (元)"}</Text>

                        <Text
                            style={{
                                color: "white",
                                fontSize: DesignConvert.getF(13),
                                fontWeight: "bold",
                                marginTop: DesignConvert.getH(3),
                            }}
                        >{StringUtil.formatMoney(this._dayLiveEarn)}</Text>


                    </View>
                </View>
            </View>
        )
    }

    render() {

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#F9F9F9',
                    alignItems: 'center',
                }}
            >
                <BackTitleView
                    titleText={'我的收益'}
                    onBack={this._onBackPress}
                    titleTextStyle={{
                        fontWeight: 'normal',
                        color: 'black'
                    }}
                />

                <ImageBackground
                    source={require('../../hardcode/skin_imgs/record').benefit_bg()}
                    style={{
                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(120),
                        marginTop: DesignConvert.getH(15),
                    }}
                >
                    {this._topBar()}

                </ImageBackground>

                <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(110),
                    }}>
                    <ExchangeButton />

                    <WithdrawButton
                        onPress={this._withdrawPress} />
                </View>

                <View
                    style={{
                        width: DesignConvert.swidth,
                        marginTop: DesignConvert.getH(30),
                        alignItems: 'center',
                    }}>
                    <RecordBtn
                        img={require("../../hardcode/skin_imgs/anchorincome").exchange_record()}
                        openImg={require("../../hardcode/skin_imgs/anchorincome").live_record_enter()}
                        text="兑换记录"
                        onPress={this._exchangeRecord} />

                    <RecordBtn
                        img={require("../../hardcode/skin_imgs/anchorincome").draw_record()}
                        openImg={require("../../hardcode/skin_imgs/anchorincome").live_record_enter()}
                        text="提现记录"
                        onPress={this._withdrawalsRecord} />

                    <RecordBtn
                        img={require("../../hardcode/skin_imgs/anchorincome").turnover_record()}
                        text="流水记录"
                        openImg={require("../../hardcode/skin_imgs/anchorincome").live_record_enter()}
                        onPress={this._flowRecord} />

                    <RecordBtn
                        img={require("../../hardcode/skin_imgs/anchorincome").live_record()}
                        openImg={require("../../hardcode/skin_imgs/anchorincome").live_record_enter()}
                        text="直播间流水"
                        onPress={this._liveFlowRecord} />
                </View>

            </View>
        )
    }
}
