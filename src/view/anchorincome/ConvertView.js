/**
 * 回购
 */

'use strict';

import React, { PureComponent } from "react";
import BaseView from "../base/BaseView";
import BackTitleView from "../base/BackTitleView";
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import { COIN_NAME, } from '../../hardcode/HGLobal';
import Config from "../../configs/Config";
import { THEME_COLOR, THEME_COLORS } from "../../styles";
import StringUtil from "../../utils/StringUtil";

export function ThemeBtn(props) {

    const { onPress, txt, containerStyle } = props

    return (
        <TouchableOpacity
            onPress={onPress}
            style={containerStyle}
        >
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#8E7AFF', '#C17AFF']}
                style={{
                    width: DesignConvert.getW(342),
                    height: DesignConvert.getH(47),
                    borderRadius: DesignConvert.getW(40),

                    borderColor: '#5F1271',
                    borderWidth: DesignConvert.getW(1.5),

                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >

                <Text
                    style={{
                        color: '#FFFFFF',
                        fontSize: DesignConvert.getF(14)
                    }}
                >{txt}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )


}

class VerificationButton extends PureComponent {

    _onPress = () => {
        this.props.onPress && this.props.onPress();
    }

    render() {
        if (!this.props.enable) {
            return (
                <View
                    style={{
                        width: DesignConvert.getW(50),
                        // backgroundColor: "rgba(0, 216, 201, 0.5)",
                        borderRadius: DesignConvert.getW(11),
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            color: "#CCCCCC",
                            fontSize: DesignConvert.getF(13),
                            textAlign: "center",
                        }}>验证</Text>
                </View>
            );
        }

        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#F0F0F000', '#FFFFFF00']}
                style={{
                    borderRadius: DesignConvert.getW(11),
                }}
            >
                <TouchableOpacity
                    onPress={this._onPress}
                    style={{
                        width: DesignConvert.getW(50),
                        borderRadius: DesignConvert.getW(11),
                        justifyContent: "center",
                        alignItems: "center",
                    }}>

                    <Text
                        style={{
                            color: "#FFB300",
                            fontSize: DesignConvert.getF(13),
                            textAlign: "center",
                        }}>验证</Text>

                </TouchableOpacity>
            </LinearGradient>
        )
    }
}

//兑换金币
class ExchangeButton extends PureComponent {

    render() {

        return (
            <TouchableOpacity
                onPress={this.props.onPress}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={THEME_COLORS}

                    style={{
                        width: DesignConvert.getW(67),
                        height: DesignConvert.getH(24),
                        borderRadius: DesignConvert.getW(15),
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: DesignConvert.getF(13),
                            fontWeight: "normal",
                        }}
                    >{this.props.btnText}</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

export default class ConVertView extends BaseView {
    constructor(props) {
        super(props);

        this._ID = require("../../cache/UserInfoCache").default.userId;
        this._nickName = "";
        this._money = "";
        this._totalMoney = 0;

        this._recharge = [];
        this._isVerify = false;
        this._password = ''
    }

    _onBackPress = () => {
        this.popSelf();
    }

    _onChangeID = (s) => {
        this._ID = s;
        this._isVerify = false;
        this.forceUpdate();
    }

    _onChangeNickName = (s) => {
        this._nickName = s;
        this.forceUpdate();
    }

    _set2Totalmoney = () => {
        this._money = this._totalMoney + "";
        this.forceUpdate();
    }

    _onChangeMoney = (s = "") => {
        let number = s.replace(/([0-9]+\.[0-9]{2})[0-9]*/, "$1");
        this._money = !isNaN(number) && Number(number) < this._totalMoney ? number : this._totalMoney + "";
        this.forceUpdate();
    }




    _onRepurchasePress = (rechargeId, money) => {
        if (this._totalMoney == 0) {
            require("../base/ToastUtil").default.showCenter("收益不足");
            return
        }
        if (!this._isVerify) {
            require("../base/ToastUtil").default.showCenter("充值id未校验，请检验!");
            return
        }

        if (!rechargeId && money == "") {
            require("../base/ToastUtil").default.showCenter("请输入回购金额");
            return
        }
        if (Number(money) * 100 == 0) {
            require("../base/ToastUtil").default.showCenter("回购金额不正确");
            return
        }
        // require("../../router/level3_router").showVerifyPayPasswordView(rechargeId, Number(money), this._ID);
        if (this._password == "") {
            require("../base/ToastUtil").default.showCenter("请输入密码");
            return
        }
        // console.log("价钱", this.props.params.exchargePrice);
        // console.log("targetId", this.props.params.targetId);
        require("../../model/anchorincome/VerifyPayPasswordModel").default.exchangeGoldShell(rechargeId, this._ID, Number(money) * 100, this._password)
            .then(data => {
                if (data) {
                    require("../base/ToastUtil").default.showCenter("兑换成功");
                }
            })
    };

    _onVerificationPress = () => {
        require('../../model/anchorincome/ConvertModel').default.getUserInfoList(this._ID)
            .then(data => {
                this._nickName = decodeURI(data.nickName);
                this._ID = data.userId;
                this._isVerify = true;
                this.forceUpdate();
            })
            .catch(err => {
                this._nickName = "输入id有误";
                this.forceUpdate();
            })
    }

    onResume() {
        this._initData();
    }

    _onChangePassword = (s) => {
        this._password = s;
        this.forceUpdate();
    }

    _initData = () => {
        require('../../model/anchorincome/ConvertModel').default.getRechargeTableData()
            .then(data => {
                this._recharge = data;
                this.forceUpdate();
            });

        //获取可兑换收益
        require('../../model/anchorincome/ConvertModel').default.getIncomeData()
            .then(data => {
                this._totalMoney = Math.floor(data.balance) / 100;
                this.forceUpdate();
            });

        require('../../model/anchorincome/ConvertModel').default.getUserInfoList(this._ID)
            .then(data => {
                this._nickName = decodeURI(data.nickName);
                this._ID = data.userId;
                this._isVerify = true;
                this.forceUpdate();
            })
            .catch(err => {
                this._nickName = "输入id有误";
                this.forceUpdate();
            })
    }

    componentDidMount() {
        super.componentDidMount();
        this._initData();
    }

    _renderLine = () => {
        return (
            <View
                style={{
                    width: DesignConvert.getW(315),
                    height: DesignConvert.getH(1),
                    backgroundColor: "#F9F9F9",
                    position: "absolute",
                    bottom: 0,
                }}></View>
        )
    }

    _renderItem = ({ item }) => {
        return (
            <View
                style={{
                    width: DesignConvert.getW(315),
                    height: DesignConvert.getH(50),
                    flexDirection: "column",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                    <Image
                        source={require('../../hardcode/skin_imgs/mywallet').ic_diamond()}
                        style={{
                            width: DesignConvert.getW(18),
                            height: DesignConvert.getW(18),
                            marginRight: DesignConvert.getW(5),
                        }} />
                    <Text
                        style={{
                            flex: 1,
                            fontSize: DesignConvert.getF(13),
                            color: "#1D1D1D",
                        }}
                    >{item.desc}</Text>

                    <ExchangeButton
                        btnText={"¥ " + item.price + "元"}
                        onPress={() => {
                            this._onRepurchasePress(item.id, item.price);
                        }} />
                </View>

                {this._renderLine()}
            </View>
        )
    }

    render() {

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#FCFCFC',
                    alignItems: "center",
                }}
            >

                <BackTitleView
                    titleText={`兑换`}
                    onBack={this._onBackPress}
                />

                <View
                    style={{
                        width: DesignConvert.swidth,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: DesignConvert.getW(15),

                        marginTop: DesignConvert.getH(15)
                    }}
                >
                    <Text
                        style={{
                            color: "#121212",
                            fontSize: DesignConvert.getF(14),
                            fontWeight: "normal",
                        }}
                    >当前可兑换收益 (元)：{StringUtil.formatMoney(this._totalMoney)}</Text>

                    {/* <View style={{ flex: 1 }} />

                    <Text
                        style={{
                            color: THEME_COLOR,
                            fontSize: DesignConvert.getF(13),
                            fontWeight: "normal",
                        }}

                    ></Text> */}
                </View>

                {/* ID及验证 */}
                <View
                    style={{
                        alignSelf: 'center',
                        marginTop: DesignConvert.getH(20),

                        width: DesignConvert.getW(342),
                        height: DesignConvert.getH(195),
                        borderRadius: DesignConvert.getW(10),

                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#5F1271',

                        padding: DesignConvert.getW(15),
                        paddingVertical: DesignConvert.getH(5),
                    }}
                >
                    <View
                        style={{
                            width: DesignConvert.getW(315),
                            height: DesignConvert.getH(40),

                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>

                        <Text
                            style={{
                                color: "#949494",
                                fontSize: DesignConvert.getF(14),

                                marginRight: DesignConvert.getW(25),
                            }}
                        >充值ID</Text>

                        <TextInput
                            style={{
                                flex: 1,
                                fontSize: DesignConvert.getF(14),
                                color: '#121212'
                            }}
                            value={this._ID}
                            keyboardType="numeric"
                            underlineColorAndroid="transparent"
                            placeholder="请输入ID"
                            placeholderTextColor="#999999"
                            returnKeyType='next'
                            onChangeText={this._onChangeID}
                            selectionColor={THEME_COLOR}
                        ></TextInput>

                        <VerificationButton
                            onPress={this._onVerificationPress}
                            enable={this._ID != ""} />
                        {this._renderLine()}

                    </View>



                    <View
                        style={{
                            width: DesignConvert.getW(315),
                            height: DesignConvert.getH(40),

                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: "#949494",
                                fontSize: DesignConvert.getF(14),

                                marginRight: DesignConvert.getW(10),
                            }}
                        >昵称验证</Text>

                        <TextInput
                            style={{
                                flex: 1,
                                fontSize: DesignConvert.getF(14),
                                color: this._nickName == "输入id有误" ? "red" : "#121212",
                            }}
                            value={this._nickName}
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            placeholder="请输入昵称"
                            placeholderTextColor="#999999"
                            returnKeyType='next'
                            onChangeText={this._onChangeNickName}
                            selectionColor={THEME_COLOR}
                        ></TextInput>
                        {this._renderLine()}
                    </View>
                    <Text
                        style={{
                            color: "#949494",
                            fontSize: DesignConvert.getF(14),

                            marginRight: DesignConvert.getW(25),
                            marginTop: DesignConvert.getH(15)
                        }}
                    >请输入兑换钻石数量</Text>
                    {/* 兑换金币 */}
                    <View
                        style={{
                            width: DesignConvert.getW(315),
                            height: DesignConvert.getH(40),

                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>


                        <Image
                            source={require('../../hardcode/skin_imgs/record').record_coin()}
                            style={{
                                width: DesignConvert.getW(18),
                                height: DesignConvert.getH(18),

                                marginRight: DesignConvert.getW(8)
                            }}
                        />

                        {/* <Text
                                style={{
                                    marginRight: DesignConvert.getW(5),
                                    color: "#1D1D1D",
                                    fontSize: DesignConvert.getF(13),
                                    fontWeight: "normal",
                                }}
                            >¥</Text> */}

                        <TextInput
                            style={{
                                flex: 1,
                            }}
                            keyboardType="numeric"
                            underlineColorAndroid="transparent"
                            placeholder="请输入金额"
                            placeholderTextColor="#D2D2D2"
                            returnKeyType="done"
                            onChangeText={this._onChangeMoney}
                            value={this._money}
                            selectionColor={THEME_COLOR}
                        ></TextInput>

                        {this._renderLine()}
                        {/* <ExchangeButton
                            btnText="全部兑换"
                            onPress={this._set2Totalmoney} /> */}




                        {/* <ExchangeButton
                            btnText="回购"
                            onPress={() => {
                                this._onRepurchasePress('', this._money);
                            }} /> */}
                    </View>
                    <View
                        style={{
                            width: DesignConvert.getW(315),
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: "#949494",
                                fontSize: DesignConvert.getF(14),

                                marginRight: DesignConvert.getW(25),
                            }}
                        >{`到账${COIN_NAME}：`}{this._money == "" ? "0" : Number(this._money) * 10}</Text>
                        <Text
                            style={{
                                color: '#121212',
                                fontSize: DesignConvert.getF(14),

                                marginRight: DesignConvert.getW(25),
                            }}
                        >{this._money == "" ? "0" : Number(this._money) * 10}</Text>
                    </View>

                </View>


                <View
                    style={{
                        alignSelf: 'center',
                        marginTop: DesignConvert.getH(15),

                        width: DesignConvert.getW(342),
                        height: DesignConvert.getH(50),
                        borderRadius: DesignConvert.getW(10),

                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#5F1271',

                        padding: DesignConvert.getW(15),
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: '#949494',
                            fontSize: DesignConvert.getF(14),
                            marginRight: DesignConvert.getW(10)
                        }}
                    >支付密码</Text>
                    <TextInput
                        style={{
                            flex: 1,
                            fontSize: DesignConvert.getF(14),
                            color: '#121212',

                            padding: 0

                        }}
                        secureTextEntry={true}
                        keyboardType="default"
                        maxLength={6}
                        underlineColorAndroid="transparent"
                        returnKeyType="done"
                        onChangeText={this._onChangePassword}
                        value={this._password}
                        selectionColor={THEME_COLOR}
                    />
                </View>

                <Text
                    style={{
                        width: DesignConvert.swidth,
                        paddingHorizontal: DesignConvert.getW(20),
                        color: "#B8B8B8",
                        fontSize: DesignConvert.getF(11),
                        marginTop: DesignConvert.getH(10),
                    }}>{`注:账户余额可提现，也可兑换${COIN_NAME}，兑换比例1元=10${COIN_NAME}`}</Text>
{/* 
                <TouchableOpacity
                    onPress={() => {
                        this._onRepurchasePress('', this._money);
                    }}
                    style={{
                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(44),
                        justifyContent: "center",
                        alignItems: "center",


                    }}>
                    <Text
                        style={{
                            color: THEME_COLOR,
                            fontSize: DesignConvert.getF(13),
                        }}>{"确认兑换"}</Text>

                </TouchableOpacity> */}
                {/* <FlatList
                    data={this._recharge}
                    showsVerticalScrollIndicator={false}
                    style={{
                        width: DesignConvert.getW(345),
                        backgroundColor: "white",
                        borderRadius: DesignConvert.getW(10),
                        marginTop: DesignConvert.getH(15),
                        paddingHorizontal: DesignConvert.getW(15),
                    }}
                    renderItem={this._renderItem}
                /> */}

                <ThemeBtn
                    onPress={() => {
                        this._onRepurchasePress('', this._money);
                    }}
                    txt="确认兑换"
                    containerStyle={{
                        position: 'absolute',
                        alignSelf: 'center',
                        bottom: DesignConvert.getH(180)
                    }}
                />
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    normalText: {
        color: "#333333",
        fontSize: DesignConvert.getF(16),
        fontWeight: "normal",
    },

    grayline: {
        width: DesignConvert.swidth,
        height: DesignConvert.getBorderWidth(1),
        backgroundColor: "#E4E3E7",
    },

    normalLayout: {
        width: DesignConvert.swidth,
        height: DesignConvert.getH(41),
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: DesignConvert.getW(20),
        paddingRight: DesignConvert.getW(20),
    },

    grayButtonText: {
        color: "#1A1A1A",
        fontSize: DesignConvert.getF(13),
        fontWeight: "normal",
        alignSelf: "center",
    },

    grayButton: {
        height: DesignConvert.getH(26),
        borderRadius: DesignConvert.getW(13),
        backgroundColor: "#E4E3E7",
        paddingLeft: DesignConvert.getW(15),
        paddingRight: DesignConvert.getW(15),
    },

    container: {
        flex: 1,
        justifyContent: 'center'
    },
});