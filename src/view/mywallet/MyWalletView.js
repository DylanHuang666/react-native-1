/**
 * 我的 -> 钱包
 */

'use strict';

import React, { PureComponent, Component } from "react";
import BaseView from "../base/BaseView";
import LinearGradient from 'react-native-linear-gradient';
import { View, Image, Text, TouchableOpacity, ScrollView, ImageBackground, FlatList, Platform } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import Config from '../../configs/Config';
import { SubmitButton } from '../anchorincome/VerifyPayPasswordView';
import ModelEvent from "../../utils/ModelEvent";
import { EVT_UPDATE_WALLET } from "../../hardcode/HLogicEvent";
import UserInfoCache from "../../cache/UserInfoCache";
import ToastUtil from "../base/ToastUtil";
import { COIN_NAME, } from '../../hardcode/HGLobal';
import BackTitleView from '../base/BackTitleView';
import StringUtil from "../../utils/StringUtil";
import { income_menu } from "../../hardcode/skin_imgs/anchorincome";
import { record_coin } from "../../hardcode/skin_imgs/record";
import { rechargeRecord, giftGoldRecord } from "../anchorincome/RecordView";
import StatusBarView from "../base/StatusBarView";
import { ic_back_black } from "../../hardcode/skin_imgs/common";
import { THEME_COLOR, LINEARGRADIENT_COLOR } from "../../styles";

class WalletTitleView extends PureComponent {


    render() {
        return (
            <View>
                <StatusBarView />

                <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(44),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}
                >

                    <Text
                        numberOfLines={1}
                        style={{
                            maxWidth: DesignConvert.getW(200),
                            fontWeight: 'bold',
                            color: !this.props.tintColor ? '#212121' : this.props.tintColor,
                            fontSize: DesignConvert.getF(16),
                        }}
                    >{this.props.titleText}</Text>

                    <TouchableOpacity
                        style={{
                            height: DesignConvert.getH(44),
                            position: 'absolute',
                            left: 0,
                            justifyContent: 'center',
                        }}
                        onPress={this.props.onBack}
                    >
                        <Image
                            style={{
                                width: DesignConvert.getW(12),
                                height: DesignConvert.getH(21),
                                marginLeft: DesignConvert.getW(15),
                                marginEnd: DesignConvert.getW(15),
                                tintColor: !this.props.tintColor ? null : this.props.tintColor,
                            }}
                            source={ic_back_black()}
                        />
                    </TouchableOpacity>

                    {this.props.rightText ? (
                        <TouchableOpacity
                            onPress={this.props.onRightPress}
                            style={{
                                position: 'absolute',
                                right: DesignConvert.getW(10),
                                top: DesignConvert.getH(10),
                                minWidth: DesignConvert.getW(30),
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: DesignConvert.getW(15),
                            }}
                        >
                            <Text
                                style={{
                                    color: !this.props.tintColor ? "#AEAEAE" : '#AEAEAE',
                                    fontSize: DesignConvert.getF(13),
                                }}
                            >{!this.props.rightText ? "" : this.props.rightText}</Text>
                        </TouchableOpacity>
                    ) : null}

                    {this.props.rightImg ? (
                        <TouchableOpacity
                            style={{
                                height: DesignConvert.getH(44),
                                position: 'absolute',
                                right: 0,
                                justifyContent: 'center',
                            }}
                            onPress={this.props.onRightPress}
                        >
                            <Image
                                style={[{
                                    width: DesignConvert.getW(17),
                                    height: DesignConvert.getH(20),
                                    marginLeft: DesignConvert.getW(15),
                                    marginEnd: DesignConvert.getW(15),
                                    tintColor: !this.props.tintColor ? null : this.props.tintColor,
                                }, this.props.rightImgStyle]}
                                source={this.props.rightImg}
                            />
                        </TouchableOpacity>
                    ) : null}
                </View>

                {!this.props.tintColor ? (
                    <View
                        style={{
                            width: DesignConvert.swidth,
                            height: DesignConvert.getH(0.5),
                            backgroundColor: "#F1F1F1",
                        }}
                        onPress={this.props.onRightPress}
                    ></View>
                ) : null}
            </View>
        );
    }
}

/**
 * 方的确认按钮
 */
export class WalletSubmitButton extends PureComponent {

    _onPress = () => {
        this.props.onPress && this.props.onPress();
    }

    render() {
        if (!this.props.enable) {
            return (
                <View
                    style={[{
                        width: DesignConvert.getW(320),
                        height: DesignConvert.getH(50),
                        borderRadius: DesignConvert.getW(30),
                        marginTop: DesignConvert.getH(30),
                        backgroundColor: 'rgba(255, 154, 65, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: "center",
                    }, this.props.style]}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: DesignConvert.getF(15),
                            fontWeight: "normal",
                        }}
                    >{this.props.btnText}</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                style={[{
                    marginTop: DesignConvert.getH(30),
                    alignSelf: "center",
                }, this.props.style]}
                onPress={this.props.onPress}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={LINEARGRADIENT_COLOR}

                    style={{
                        width: DesignConvert.getW(320),
                        height: DesignConvert.getH(50),
                        borderRadius: DesignConvert.getW(30),


                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#5F1271'
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: DesignConvert.getF(16),
                                fontWeight: "normal",
                            }}
                        >{this.props.btnText}</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

//选择样式的充值表
export class SelectedChargeList extends PureComponent {
    constructor(props) {
        super(props);

        this._chargeList = [];
    }

    _selectedItem = (item) => {
        //TODO:设置选择item,回调
        this._selected.checked = false;
        this._selected = item;
        this._selected.checked = true;

        if (this.props.selectedItem != undefined) {
            this.props.selectedItem(item);
        }
        this.forceUpdate();
    }

    componentDidMount() {
        require("../../model/mine/MyWalletModel").default.getRecharge()
            .then(data => {
                if (!data) {
                    return
                }
                // console.log("充值额度", data);
                data.forEach(element => {
                    element.checked = false;
                    element.key = element.id;
                });
                this._chargeList = data;
                if (this._chargeList.length > 0) {
                    this._selected = this._chargeList[0];
                    this._selectedItem(this._selected);
                }
                this.forceUpdate();
            })
    }


    _renderItem = ({ item, index }) => {

        // if (item.checked) {
        //     return (
        //         <TouchableOpacity
        //             onPress={() => {
        //                 this._selectedItem(item);
        //             }}>

        //             <ImageBackground
        //                 source={require("../../hardcode/skin_imgs/mywallet").selected_bg()}
        //                 style={{
        //                     width: DesignConvert.getW(177),
        //                     height: DesignConvert.getH(82),
        //                     margin: DesignConvert.getW(9),
        //                     paddingTop: DesignConvert.getH(20),
        //                     paddingLeft: DesignConvert.getW(21),
        //                     flexDirection: "row",
        //                 }}>

        //                 <Image
        //                     source={record_coin()}
        //                     style={{
        //                         width: DesignConvert.getW(22),
        //                         height: DesignConvert.getH(22),
        //                         marginRight: DesignConvert.getW(5),
        //                     }}></Image>

        //                 <View>
        //                     <View
        //                         style={{
        //                             flexDirection: "row",
        //                             alignItems: "center",
        //                         }}>

        //                         <Text
        //                             style={{
        //                                 color: item.checked ? "#1D1D1D" : "#AEAEAE",
        //                                 fontSize: DesignConvert.getF(20),
        //                                 includeFontPadding: false,
        //                             }}>{item.goldShell}</Text>

        //                         <Text
        //                             style={{
        //                                 color: item.checked ? "#6D6D6D" : "#AEAEAE",
        //                                 fontSize: DesignConvert.getF(11),
        //                             }}>{COIN_NAME}</Text>
        //                     </View>

        //                     <Text
        //                         style={{
        //                             color: item.checked ? "#AEAEAE" : "#6D6D6D",
        //                             fontSize: DesignConvert.getF(12),
        //                             marginTop: DesignConvert.getH(6),
        //                         }}>
        //                         <Text
        //                             style={{
        //                                 color: item.checked ? "#1D1D1D" : "#C7C7C7",
        //                                 fontSize: DesignConvert.getF(12),
        //                                 marginTop: DesignConvert.getH(6),
        //                             }}>{`${StringUtil.formatMoney(item.price)}`}</Text>

        //                         元
        //                     </Text>
        //                 </View>
        //             </ImageBackground>
        //         </TouchableOpacity>
        //     )
        // }
        return (
            <TouchableOpacity
                onPress={() => {
                    this._selectedItem(item);
                }}
                style={{
                    marginRight: (index + 1) % 3 === 0 ? 0 : DesignConvert.getW(15),
                    marginBottom: DesignConvert.getH(26),

                    width: DesignConvert.getW(105),
                    height: DesignConvert.getH(70),
                    borderRadius: DesignConvert.getW(35),

                    borderWidth: item.checked ? DesignConvert.getW(1) : 0,
                    borderColor: '#5F1271',

                    backgroundColor: item.checked ? "#EAE6FF" : "#F9F8FF",

                    alignItems: "center",
                    justifyContent: 'center'
                }}>



                <View
                    style={{
                        alignSelf: 'center',
                        marginTop: DesignConvert.getH(10),

                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source={require('../../hardcode/skin_imgs/record').record_coin()}
                        style={{
                            width: DesignConvert.getW(18),
                            height: DesignConvert.getH(18),
                            marginRight: DesignConvert.getW(5),
                        }} />
                    <Text
                        style={{
                            alignSelf: 'center',

                            color: '#121212',

                            fontSize: DesignConvert.getF(14),
                            fontWeight: 'bold'
                        }}
                    >{item.goldShell}</Text>
                </View>

                {/* 
                <Text
                    style={{
                        flex: 1,
                        color: "#8A50FC",
                        fontSize: DesignConvert.getF(13),
                    }}>{`${item.goldShell}${COIN_NAME}`}</Text> */}

                <Text
                    style={{
                        marginTop: DesignConvert.getH(6),

                        color: "#949494",
                        fontSize: DesignConvert.getF(12),
                    }}>

                    {`${StringUtil.formatMoney(item.price)}元`}
                </Text>
                {/* <View
                    style={{
                        width: DesignConvert.getW(20),
                        height: DesignConvert.getH(20),
                        borderColor: '#E6E6E6',
                        borderRadius: DesignConvert.getW(10),
                        borderWidth: DesignConvert.getW(1),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {
                        item.checked && <Image
                            source={require('../../hardcode/skin_imgs/record').record_select()}
                            style={{

                                width: DesignConvert.getW(21),
                                height: DesignConvert.getH(21),
                            }}
                        />
                    }

                </View> */}
            </TouchableOpacity>
        )
    }

    render() {
        // console.log("充值表更新", this._chargeList);
        return (
            <FlatList
                data={this._chargeList}
                renderItem={this._renderItem}
                style={{
                    marginLeft: DesignConvert.getW(15),
                    marginTop: DesignConvert.getH(15)
                }}
                numColumns={3}
                extraData={this._selected}></FlatList>
        )
    }
}

//充值表
class ChargeList extends PureComponent {
    constructor(props) {
        super(props);

        this._payType = 0;
        this._chargeList = [];
    }

    _onItemPress = (item) => {
        require("../../model/pay/PayModel").default.toPay(this._payType, item);
        this.forceUpdate();
    }

    componentDidMount() {
        require("../../model/mine/MyWalletModel").default.getRecharge()
            .then(data => {
                if (!data) {
                    return
                }
                // console.log("充值额度", data);
                data.forEach(element => {
                    element.checked = false;
                    element.key = element.id;
                });
                this._chargeList = data;
                this.forceUpdate();
            })

        require("../../model/mine/MyWalletModel").default.getPayType()
            .then(data => {
                [this._alipay, this._wechat, this._union] = data;
                if (this._alipay) {
                    this._payType = 1;
                } else if (this._wechat) {
                    this._payType = 2;
                } else if (this._union) {
                    this._payType = 3;
                }
                this.forceUpdate();
            })
    }


    _renderItem = ({ item }) => {
        return (
            <View
                style={{
                    width: DesignConvert.getW(327),
                    height: DesignConvert.getH(56),
                    borderWidth: DesignConvert.getW(1),
                    borderColor: "#F9F4FF",
                    backgroundColor: "#F9F4FF",
                    borderRadius: DesignConvert.getW(6),
                    paddingLeft: DesignConvert.getW(18),
                    paddingRight: DesignConvert.getW(18),
                    marginLeft: DesignConvert.getW(24),
                    marginTop: DesignConvert.getH(18),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}>

                <Image
                    source={require("../../hardcode/skin_imgs/mywallet").ic_diamond()}
                    style={{
                        width: DesignConvert.getW(20),
                        height: DesignConvert.getH(16),
                        marginRight: DesignConvert.getH(6),
                    }}></Image>

                <Text
                    style={{
                        flex: 1,
                        color: "#1A1A1A",
                        fontSize: DesignConvert.getF(16),
                    }}>{item.goldShell + COIN_NAME}</Text>

                <Text
                    style={{
                        color: "#A055FF",
                        fontSize: DesignConvert.getF(12),
                        marginRight: DesignConvert.getH(15),
                    }}>{item.price + "元"}</Text>

                <TouchableOpacity
                    onPress={() => {
                        this._onItemPress(item);
                    }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={["#7479FF", "#B785FF"]}
                        style={{
                            width: DesignConvert.getW(67),
                            height: DesignConvert.getH(28),
                            borderRadius: DesignConvert.getW(4),
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: DesignConvert.getF(12),
                            }}>购买</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        // console.log("充值表更新",this._chargeList);
        return (
            <FlatList
                data={this._chargeList}
                renderItem={this._renderItem}
                extraData={this._selected}
                ListFooterComponent={
                    <View
                        style={{
                            height: DesignConvert.getH(120),
                        }}></View>
                }></FlatList>
        )
    }
}

const [ALIPAY, BANK, WECHAAT] = [555, 778, 996];
class _PayItem extends PureComponent {
    constructor(props) {
        super(props);

    }

    _getIcon = () => {
        // console.log("_getIcon", this.props.type);
        switch (this.props.type) {
            case ALIPAY:
                return require("../../hardcode/skin_imgs/mywallet").ic_alipay();
            case BANK:
                return require("../../hardcode/skin_imgs/mywallet").ic_pay_bank();
            case WECHAAT:
                return require("../../hardcode/skin_imgs/mywallet").ic_pay_wechat();
        }
    }

    _getText = () => {
        switch (this.props.type) {
            case ALIPAY:
                return "支付宝支付";
            case BANK:
                return "银联支付";
            case WECHAAT:
                return "微信支付";
        }
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    width: DesignConvert.getW(100),
                    height: DesignConvert.getH(40),
                    borderWidth: DesignConvert.getW(1),
                    borderColor: this.props.isChecked ? "#FA495F" : "#E5E5E5",
                    backgroundColor: this.props.isChecked ? "#FFD0DC" : "white",
                    borderRadius: DesignConvert.getW(6),
                    margin: DesignConvert.getW(12),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    display: !this.props.isHide ? "flex" : "none",
                }}>
                <Image
                    source={this._getIcon()}
                    style={{
                        width: DesignConvert.getW(this.props.type == BANK ? 22 : 16),
                        height: DesignConvert.getH(this.props.type == BANK ? 14 : 16),
                        marginRight: DesignConvert.getW(5),
                    }}></Image>

                <Text
                    style={{
                        color: "#1A1A1A",
                        fontSize: DesignConvert.getF(13),
                    }}>{this._getText()}</Text>
            </TouchableOpacity>
        )
    }
}


export default class MyWalletView extends BaseView {

    constructor(props) {
        super(props);

        this._accountMoney = 123456;
        this._payType = 0;
        this._giftEnable = false;
    }

    _onBackPress = () => {
        this.popSelf();
    }

    _onChargePress = () => {
        require("../../router/level3_router").showRecordView(rechargeRecord);
    }

    _onGiftRecordPress = () => {
        require("../../router/level3_router").showRecordView(giftGoldRecord);
    }

    _onRechargeRecordPress = () => {
        require("../../router/level3_router").showRecordView(rechargeRecord);
        // if(this._giftEnable) {
        //     require("../../router/level3_router").showTabRecordView(rechargeRecord);
        //     return
        // }
        // require("../../router/level3_router").showRecordView(rechargeRecord);
    }

    _onExchangePress = () => {
        require("../../router/level3_router").showConVertView();
    }

    _onGiftPress = () => {
        require('../../model/mine/MyWalletModel').default.onWalletSendGoldShell()
    }

    _selectedItem = (item) => {
        this.selectedRecharge = item;
        this.forceUpdate();
    }

    _onSubmitPress = () => {
        require("../../router/level3_router").showPaySelectedDialog(StringUtil.formatMoney(this.selectedRecharge.price), this._Pay);
        // require("../../model/pay/PayModel").default.toPay(this._payType, this.selectedRecharge);
    }

    _Pay = (payType) => {
        require("../../model/pay/PayModel").default.toPay(payType, this.selectedRecharge);
    }

    _onAliPayPress = () => {
        this._payType = 1;
        this.forceUpdate();
    }

    _onWetChatPress = () => {
        this._payType = 2;
        this.forceUpdate();
    }

    _onBankPress = () => {
        this._payType = 3;
        this.forceUpdate();
    }

    _update = () => {
        require("../../model/BagModel").default.getWallet()
            .then(data => {
                this._accountMoney = data.goldShell;
                this.forceUpdate();
            })
    }

    _initData = () => {
        require("../../model/mine/MyWalletModel").default.getMoneyGivingList()
            .then(data => {
                if (this._giftEnable == data) {
                    return;
                }
                this._giftEnable = data;
                this.forceUpdate();
            })

        require("../../model/BagModel").default.getWallet()
            .then(data => {
                this._accountMoney = data.goldShell;
                this.forceUpdate();
            })

        require("../../model/mine/MyWalletModel").default.getPayType()
            .then(data => {
                [this._alipay, this._wechat, this._union] = data;
                if (this._alipay) {
                    this._payType = 1;
                } else if (this._wechat) {
                    this._payType = 2;
                } else if (this._union) {
                    this._payType = 3;
                }
                this.forceUpdate();
            })
    }

    onResume() {
        this._update();
    }

    componentDidMount() {
        super.componentDidMount();
        ModelEvent.addEvent(null, EVT_UPDATE_WALLET, this._update);
        this._initData();
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_UPDATE_WALLET, this._update);
        super.componentWillUnmount();
    }
    render() {

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#F9F9F9',
                }}>

                <WalletTitleView
                    titleText={'我的钱包'}
                    onBack={this.popSelf}
                    rightText={'消费记录'}
                    onRightPress={this._onRechargeRecordPress}
                />

                {/* <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(78),
                        flexDirection: "row",
                        marginTop: DesignConvert.getH(10),
                        paddingHorizontal: DesignConvert.getW(15),
                    }}>
                    <View
                        style={{
                            flex: 1,
                            alignSelf: "flex-end",
                            flexDirection: "row",
                            alignItems: "center",
                        }}>

                        <Text
                            style={{
                                color: "#1D1D1D",
                                fontSize: DesignConvert.getF(13),
                                marginRight: DesignConvert.getW(10),
                            }}>账户余额:</Text>

                        <Image
                            source={record_coin()}
                            style={{
                                width: DesignConvert.getW(22),
                                height: DesignConvert.getH(22),
                                marginRight: DesignConvert.getW(5),
                            }}></Image>

                        <Text
                            style={{
                                color: "#1D1D1D",
                                fontSize: DesignConvert.getF(20),
                            }}>{StringUtil.formatMoney(this._accountMoney, 0)}</Text>
                    </View>

                    <View
                        style={{
                            height: DesignConvert.getH(78),
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <TouchableOpacity
                            onPress={this._onGiftPress}
                            style={{
                                width: DesignConvert.getW(60),
                                height: DesignConvert.getH(24),
                                borderRadius: DesignConvert.getW(5),
                                borderColor: "#7A61FF",
                                borderWidth: DesignConvert.getW(1),
                                display: this._giftEnable ? "flex" : "none",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <Text
                                style={{
                                    color: "#7A61FF",
                                    fontSize: DesignConvert.getF(11),
                                }}>转 赠</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._onGiftRecordPress}
                            style={{
                                width: DesignConvert.getW(60),
                                height: DesignConvert.getH(24),
                                borderRadius: DesignConvert.getW(5),
                                borderColor: "#7A61FF",
                                borderWidth: DesignConvert.getW(1),
                                display: this._giftEnable ? "flex" : "none",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: DesignConvert.getH(10),
                            }}>
                            <Text
                                style={{
                                    color: "#7A61FF",
                                    fontSize: DesignConvert.getF(11),
                                    // textDecorationLine: "underline",
                                }}>转赠记录</Text>
                        </TouchableOpacity>
                    </View>

                </View> */}

                <ImageBackground
                    source={require("../../hardcode/skin_imgs/mywallet").board_bg()}
                    style={{
                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(120),
                        padding: DesignConvert.getW(20),
                        marginLeft: DesignConvert.getW(12)
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                            // width: DesignConvert.getW(240)
                        }}
                    >
                        <Image
                            source={record_coin()}
                            style={{
                                width: DesignConvert.getW(22),
                                height: DesignConvert.getH(22),
                                marginRight: DesignConvert.getW(5),
                            }}></Image>
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: DesignConvert.getF(13),
                                // position: "absolute",
                                // left: DesignConvert.getW(43),
                                // top: DesignConvert.getH(34),
                            }}
                        >{`${COIN_NAME}余额`}</Text>
                    </View>

                    <View
                        style={{
                            width: DesignConvert.getW(100),
                            height: DesignConvert.getH(31),
                            marginTop: DesignConvert.getH(16),
                            borderRadius: DesignConvert.getW(10),
                            justifyContent: 'center',
                        }}
                    >


                        <Text
                            style={{
                                minWidth: DesignConvert.getW(60),
                                borderRadius: DesignConvert.getW(10),
                                paddingTop: Platform.OS === "ios" ? DesignConvert.getH(6) : 0,
                                height: DesignConvert.getH(31),
                                textAlignVertical: 'center',
                                backgroundColor: 'rgba(33, 33, 33, 0.3)',
                                textAlign: 'center',
                                color: "#FFFFFF",
                                fontSize: DesignConvert.getF(16),
                                // fontWeight: "bold",
                                // position: "absolute",
                                // left: DesignConvert.getW(43),
                                // top: DesignConvert.getH(57),
                            }}
                        >{StringUtil.formatMoney(this._accountMoney, 0)}</Text>
                    </View>
                    {/* <TouchableOpacity
                        onPress={this._onGiftPress}
                        style={{
                            minidth: DesignConvert.getW(60),
                            height: DesignConvert.getH(24),
                            backgroundColor: "tranparent",
                            borderRadius: DesignConvert.getW(15),
                            borderColor: "white",
                            borderWidth: DesignConvert.getW(1),
                            marginTop: DesignConvert.getH(10),
                            display: this._giftEnable ? "flex" : "none",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: DesignConvert.getF(11),
                            }}>{`${COIN_NAME}转增`}</Text>
                    </TouchableOpacity> */}

                    {/* <View
                        style={{
                            position: "absolute",
                            right: DesignConvert.getW(27),
                            top: DesignConvert.getH(35),
                        }}>
                        <TouchableOpacity
                            onPress={this._onGiftPress}
                            style={{
                                width: DesignConvert.getW(70),
                                height: DesignConvert.getH(26),
                                borderRadius: DesignConvert.getW(13),
                                borderColor: "#FFFFFF",
                                borderWidth: DesignConvert.getW(1),
                                display: this._giftEnable ? "flex" : "none",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <Text
                                style={{
                                    color: "#FFFFFF",
                                    fontSize: DesignConvert.getF(14),
                                }}>转 赠</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={this._onGiftRecordPress}
                        style={{
                            position: "absolute",
                            right: DesignConvert.getW(40),
                            top: DesignConvert.getH(78),
                        }}>
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: DesignConvert.getF(11),
                                textDecorationLine: "underline",
                                display: this._giftEnable ? "flex" : "none",
                            }}>转赠记录</Text>
                    </TouchableOpacity> */}


                </ImageBackground>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                    }}>

                    <Text
                        style={{
                            color: "#AEAEAE",
                            fontSize: DesignConvert.getF(12),
                            marginTop: DesignConvert.getH(20),
                            marginLeft: DesignConvert.getW(12),
                        }}>{`选择充值金额`}</Text>

                    {/* <ChargeList /> */}

                    <SelectedChargeList
                        selectedItem={this._selectedItem} />

                    {/* <Text
                        style={{
                            color: "#808080",
                            fontSize: DesignConvert.getF(12),
                            marginTop: DesignConvert.getH(10),
                            marginLeft: DesignConvert.getW(27),
                        }}>支付方式</Text>

                    <View
                        style={{
                            width: DesignConvert.swidth,
                            height: DesignConvert.getH(70),
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}>

                        <_PayItem
                            isHide={!this._alipay}
                            type={ALIPAY}
                            onPress={this._onAliPayPress}
                            isChecked={this._payType == 1} />

                        <_PayItem
                            isHide={!this._wechat}
                            type={WECHAAT}
                            onPress={this._onWetChatPress}
                            isChecked={this._payType == 2} />

                        <_PayItem
                            isHide={!this._union}
                            type={BANK}
                            onPress={this._onBankPress}
                            isChecked={this._payType == 3} />
                    </View> */}
                </ScrollView>

                {/* <SubmitButton
                    enable={true}
                    btnText="立即支付"
                    onPress={this._onSubmitPress}
                    style={{
                        marginTop: DesignConvert.getH(20),
                        marginBottom: DesignConvert.getH(20) + DesignConvert.addIpxBottomHeight(),
                    }}></SubmitButton> */}

                <WalletSubmitButton
                    enable={true}
                    btnText={this.selectedRecharge && this.selectedRecharge.price ? `支付${StringUtil.formatMoney(this.selectedRecharge.price)}元` : "确认充值"}
                    onPress={this._onSubmitPress}
                    style={{
                        marginTop: DesignConvert.getH(20),
                        marginBottom: DesignConvert.getH(20) + DesignConvert.addIpxBottomHeight(),
                    }}></WalletSubmitButton>
            </View>

        )
    }
}