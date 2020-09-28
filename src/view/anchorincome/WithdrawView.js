
/**
 * 提现页
 */

'use strict';

import React, { PureComponent } from "react";
import BaseView from "../base/BaseView";
import BackTitleView from "../base/BackTitleView";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, Keyboard } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import Config from '../../configs/Config';
import { styles } from './ConvertView';
import { SubmitButton } from './VerifyPayPasswordView';
import UserInfoCache from "../../cache/UserInfoCache";
import ToastUtil from "../base/ToastUtil";
import { THEME_COLOR } from "../../styles";

export default class WithdrawView extends BaseView {
    constructor(props) {
        super(props);

        this._realName = "";
        this._aliPayAccount = "";
        this._money = "";
        this._payPassword = "";

        this._totalMoney = this.props.params.accountMoney;
        this._maxCatchValue = this.props.params.maxCatchValue;

        this._submitEnable = false;
    }

    _onBackPress = () => {
        this.popSelf();
    }

    componentDidMount() {
        super.componentDidMount();
        require('../../model/anchorincome/WithdrawModel').getLocalSaveBankInfo()
            .then(data => {
                if (!data) return;

                this._realName = decodeURIComponent(data.accountName);
                this._aliPayAccount = data.account;
                this.forceUpdate();
            })
    }

    _checkSubmitEnable = () => {
        if (this._realName != "" && this._aliPayAccount != "" && this._money != "" && this._payPassword != "") {
            this._submitEnable = true;
        } else {
            this._submitEnable = false;
        }
    }

    _onChangeRealName = (s) => {
        this._realName = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onChangeAliPayAccount = (s) => {
        this._aliPayAccount = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _set2Totalmoney = () => {
        if (this._totalMoney > this._maxCatchValue) {
            this._money = this._maxCatchValue + "";
        } else {
            this._money = this._totalMoney + "";
        }
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onChangeMoney = (s = "") => {
        let number = s.replace(/([0-9]+\.[0-9]{2})[0-9]*/, "$1");
        this._money = !isNaN(number) && Number(number) < this._totalMoney ? number : this._totalMoney > this._maxCatchValue ? this._maxCatchValue + "" : this._totalMoney + "";
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onChangePayPassword = (s) => {
        this._payPassword = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _getNameInput = ref => {
        this._nameInputRef = ref
    }
    _getNameInputFocus = () => {
        this._nameInputRef.focus()
    }
    _getPayInpt = ref => {
        this._payInptRef = ref

    }

    _getInputFocus = () => {
        this._payInptRef.focus()
    }

    _onForgetPasswordPress = () => {
        if (!UserInfoCache.phoneNumber) {
            ToastUtil.showCenter("请先绑定手机")
            return
        }
        require("../../router/level3_router").showUpdatePasswordView(require("../setting/UpdatePasswordView").updatePayPassword);
    }

    _onSubmitPress = () => {
        Keyboard.dismiss()
        require('../../model/anchorincome/WithdrawModel').default.applyExpense(this._realName, this._aliPayAccount, this._payPassword, Number(this._money) * 100)
            .then(data => {
                if (data) {
                    require("../base/ToastUtil").default.showCenter("提现申请已提交，正在审核中");
                    this.popSelf();
                }
            })
    }

    _onAgreeProtocol = () => {

    }

    render() {

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}>

                <BackTitleView
                    titleText={"提现"}
                    onBack={this._onBackPress}
                />
                <View
                    style={{
                        marginTop: DesignConvert.getH(15),

                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(120),

                        alignSelf: 'center'
                    }}
                >
                    <Image
                        source={require("../../hardcode/skin_imgs/anchorincome").withdraw_top_bg()}
                        style={{
                            position: 'absolute',

                            width: DesignConvert.getW(345),
                            height: DesignConvert.getH(120),

                            resizeMode: 'contain'
                        }}></Image>
                    <Image
                        source={require("../../hardcode/skin_imgs/anchorincome").icon_report2()}
                        style={{
                            position: 'absolute',
                            top: DesignConvert.getW(15),
                            left: DesignConvert.getW(15),

                            width: DesignConvert.getW(23),
                            height: DesignConvert.getW(23),
                        }}></Image>
                    <Text
                        style={{
                            position: 'absolute',
                            top: DesignConvert.getW(18.5),
                            left: DesignConvert.getW(48),

                            color: '#FFFFFF',
                            fontSize: DesignConvert.getF(12)
                        }}
                    >可提现金额(元)</Text>
                    <Text
                        style={{
                            position: 'absolute',
                            top: DesignConvert.getW(53),
                            alignSelf: 'center',

                            color: '#FFFFFF',
                            fontSize: DesignConvert.getF(28),
                        }}
                    >{this._totalMoney}</Text>
                </View>
                <View
                    style={{
                        alignSelf: 'center',
                        marginTop: DesignConvert.getH(15),

                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(50),
                        borderRadius: DesignConvert.getW(10),

                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#5F1271',

                        paddingHorizontal: DesignConvert.getW(15),
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: '#949494',
                            fontSize: DesignConvert.getF(14),
                            marginRight: DesignConvert.getW(20)
                        }}
                    >真实姓名</Text>
                    <TextInput
                        ref={this._getNameInput}

                        style={{
                            flex: 1,
                            fontSize: DesignConvert.getF(14),
                            color: '#121212',

                            padding: 0

                        }}
                        keyboardType="default"
                        maxLength={6}
                        underlineColorAndroid="transparent"
                        returnKeyType="done"
                        onChangeText={this._onChangeRealName}
                        value={this._realName}
                        selectionColor={THEME_COLOR}
                    />
                    <Text
                        onPress={this._getNameInputFocus}
                        style={{
                            color: '#FFB300',
                            fontSize: DesignConvert.getF(14),
                            marginRight: DesignConvert.getW(10)
                        }}
                    >修改</Text>
                </View>
                <View
                    style={{
                        alignSelf: 'center',
                        marginTop: DesignConvert.getH(15),

                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(50),
                        borderRadius: DesignConvert.getW(10),

                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#5F1271',

                        paddingHorizontal: DesignConvert.getW(15),
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: '#949494',
                            fontSize: DesignConvert.getF(14),
                            marginRight: DesignConvert.getW(20)
                        }}
                    >银行卡号</Text>
                    <TextInput
                        ref={this._getPayInpt}
                        style={{
                            flex: 1,
                            fontSize: DesignConvert.getF(14),
                            color: '#121212',

                            padding: 0

                        }}
                        keyboardType="default"
                        underlineColorAndroid="transparent"
                        returnKeyType="done"
                        onChangeText={this._onChangeAliPayAccount}
                        value={this._aliPayAccount}
                        selectionColor={THEME_COLOR}
                    />
                    <Text
                        onPress={this._getInputFocus}
                        style={{
                            color: '#FFB300',
                            fontSize: DesignConvert.getF(14),
                            marginRight: DesignConvert.getW(10)
                        }}
                    >修改</Text>
                </View>


                <View
                    style={{
                        alignSelf: 'center',
                        marginTop: DesignConvert.getH(15),

                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(124),
                        borderRadius: DesignConvert.getW(10),

                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#5F1271',

                        padding: DesignConvert.getW(15),
                    }}
                >
                    <Text
                        style={{
                            color: '#949494',
                            fontSize: DesignConvert.getF(14),
                            marginRight: DesignConvert.getW(10)
                        }}
                    >提现金额</Text>

                    <View
                        style={{

                            width: DesignConvert.getW(315),
                            height: DesignConvert.getH(34),

                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                marginRight: DesignConvert.getW(5),
                                color: "#121212",
                                fontSize: DesignConvert.getF(17),
                                fontWeight: "Bold",
                            }}
                        >¥</Text>
                        <TextInput
                            style={{
                                width: DesignConvert.getW(160),
                                padding: 0
                            }}
                            keyboardType="numeric"
                            underlineColorAndroid="transparent"
                            placeholder="最低提现金额100元"
                            placeholderTextColor="#CCCCCC"
                            returnKeyType="done"
                            onChangeText={this._onChangeMoney}
                            value={this._money}
                        ></TextInput>
                        <View
                            style={{
                                width: DesignConvert.getW(315),
                                height: DesignConvert.getH(1),
                                backgroundColor: "#F9F9F9",
                                position: "absolute",
                                bottom: 0,
                            }}></View>
                    </View>

                    <TouchableOpacity
                        style={{
                            flex: 1,
                            flexDirection: "row-reverse",

                            marginTop: DesignConvert.getH(15)
                        }}
                        onPress={this._set2Totalmoney}
                    >
                        <Text
                            style={{
                                color: "#FFB300",
                                fontSize: DesignConvert.getF(14),
                            }}
                        >全部提现</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        alignSelf: 'center',
                        marginTop: DesignConvert.getH(20),

                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(50),
                        borderRadius: DesignConvert.getW(10),

                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#5F1271',

                        padding: DesignConvert.getW(15),
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
                    >支付密码</Text>


                    <TextInput
                        style={{
                            flex: 1,
                            fontSize: DesignConvert.getF(14),
                            color: '#121212',
                            fontWeight: 'bold',
                            padding: 0,
                        }}
                        secureTextEntry={true}
                        keyboardType="default"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#999999"
                        returnKeyType='next'
                        onChangeText={this._onChangePayPassword}
                        value={this._payPassword}
                    ></TextInput>

                </View>



                {/* <TouchableOpacity
                    style={{
                        flexDirection: "row-reverse",
                    }}
                    onPress={this._onForgetPasswordPress}
                >
                    <Text
                        style={{
                            color: "#A055FF",
                            fontSize: DesignConvert.getF(10),
                            marginTop: DesignConvert.getH(10),
                            marginRight: DesignConvert.getW(20),
                        }}
                    >忘记密码？</Text>
                </TouchableOpacity> */}

                <SubmitButton
                    enable={this._submitEnable}
                    btnText="提现"
                    onPress={this._onSubmitPress}
                    style={{
                        alignSelf: 'center',
                        marginTop: DesignConvert.getH(30)
                    }}
                ></SubmitButton>

                {/* <View
                    style={{
                        marginTop: DesignConvert.getH(30),
                        flexDirection: "row",
                        justifyContent: "center",
                    }}>
                    <Text
                        style={{
                            marginLeft: DesignConvert.getW(8),
                            color: "#1A1A1A",
                            fontSize: DesignConvert.getF(11),
                        }}
                    >我已阅读并同意</Text>

                    <TouchableOpacity
                        onPress={this._onAgreeProtocol}
                    >
                        <Text
                            style={{
                                color: "#1A1A1A",
                                fontSize: DesignConvert.getF(11),
                            }}
                        >《云账户提现协议》</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        )
    }
}