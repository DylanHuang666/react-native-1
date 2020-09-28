/**
 * 钻石转赠dialog
 */

'use strict';

import React, { PureComponent, Component } from "react";
import BaseView from "../base/BaseView";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ImageBackground } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import Config from '../../configs/Config';
import ToastUtil from "../base/ToastUtil";
import ModelEvent from "../../utils/ModelEvent";
import { EVT_LOGIC_UPDATE_GOLDBELL_INFO } from "../../hardcode/HLogicEvent";
import { COIN_NAME, } from '../../hardcode/HGLobal';
import KeyboardAvoidingViewExt from "../base/KeyboardAvoidingViewExt";
import { THEME_COLOR } from "../../styles";
import { giftGoldRecord } from "../anchorincome/RecordView";
import { ic_close_send } from "../../hardcode/skin_imgs/room";

/**
 * 校验按钮
 */
class VerificationButton extends PureComponent {

    _onPress = () => {
        this.props.onPress && this.props.onPress();
    }

    render() {
        if (!this.props.enable) {
            return (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={["#FF836E00", "#FF685000"]}
                    style={{
                        width: DesignConvert.getW(38),
                        height: DesignConvert.getH(24),
                        opacity: 0.5,
                        borderRadius: DesignConvert.getW(9),
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            color: THEME_COLOR,
                            fontSize: DesignConvert.getF(12),
                        }}
                    >效验</Text>
                </LinearGradient>
            );
        }

        return (
            <TouchableOpacity
                onPress={this._onPress}>

                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={["#FF836E00", "#FF685000"]}
                    style={{
                        width: DesignConvert.getW(38),
                        height: DesignConvert.getH(24),
                        borderRadius: DesignConvert.getW(9),
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            color: THEME_COLOR,
                            fontSize: DesignConvert.getF(12),
                        }}
                    >效验</Text>
                </LinearGradient>

            </TouchableOpacity>
        )
    }
}
export default class DiamondGiftDialog extends BaseView {
    constructor(props) {
        super(props);

        this._ID = "";
        this._nickName = "";
        this._amount = "";
        this._payPassword = "";
        this._isVerify = false;
        this._maxAmount = 0;
        this._submitEnable = false;
    }

    _onBackPress = () => {
        this.popSelf();
    }

    _checkSubmitEnable = () => {
        if (this._ID == "" || this._nickName == "" || this._amount == "" || this._payPassword == "" || !this._isVerify) {
            this._submitEnable = false;
        } else {
            this._submitEnable = true;
        }
        this.forceUpdate();
    }

    _onChangeID = (s) => {
        this._ID = s;
        this._isVerify = false;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onChangeNickName = (s) => {
        this._nickName = s;
        this._isVerify = false;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onChangeAmount = (s) => {
        // console.log("验证数字", parseInt(s));
        if (!parseInt(s)) {
            // console.log("true", this._amount);
            this._amount = "";
        } else {
            this._amount = parseInt(s) + "";
        }
        this._amount = this._amount > this._maxAmount ? this._maxAmount + "" : this._amount;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onChangePayPassword = (s) => {
        this._payPassword = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    componentDidMount() {
        super.componentDidMount()
        this._initData();
    }

    _initData() {
        require("../../model/BagModel").default.getWallet()
            .then(data => {
                this._maxAmount = data.goldShell;
                this.forceUpdate();
            })
    }

    _positivePress = () => {
        require("../../model/mine/MyWalletModel").default.sendGoldShell(this._ID, parseInt(this._amount), this._payPassword, this._nickName)
            .then(data => {
                if (data) {
                    this.popSelf();
                    ToastUtil.showCenter("转赠成功")
                }
            })
    }

    _checkPress = () => {
        require('../../model/anchorincome/ConvertModel').default.getUserInfoList(this._ID)
            .then(data => {
                this._nickName = decodeURI(data.nickName);
                this._ID = data.userId;
                this._isVerify = true;
                this._checkSubmitEnable();
                this.forceUpdate();
            })
            .catch(err => {
                this._nickName = "输入id有误";
                this.forceUpdate();
            })
    }

    _renderSubmitBtn = () => {
        if (this._submitEnable) {
            return (
                <TouchableOpacity
                    style={{
                        width: DesignConvert.getW(98),
                        height: DesignConvert.getH(32),
                        borderRadius: DesignConvert.getW(20),

                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#5F1271',

                        justifyContent: 'center',
                        alignItems: 'center',

                        marginTop: DesignConvert.getH(20),

                        backgroundColor: '#FF64EA',
                    }}
                    onPress={this._positivePress}>

                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontSize: DesignConvert.getF(12)
                        }}
                    >确认转赠</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View
                    style={{
                        width: DesignConvert.getW(98),
                        height: DesignConvert.getH(32),
                        borderRadius: DesignConvert.getW(20),

                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#5F1271',

                        justifyContent: 'center',
                        alignItems: 'center',

                        marginTop: DesignConvert.getH(20),

                        backgroundColor: '#FF64EA',
                    }}>

                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontSize: DesignConvert.getF(12)
                        }}
                    >确认转赠</Text>
                </View>
            )
        }
    }

    _onGiftRecordPress = () => {
        this.popSelf();
        // require("../../router/level3_router").showTabRecordView(giftGoldRecord);
        require("../../router/level3_router").showRecordView(giftGoldRecord);
    }

    render() {
        return (
            <KeyboardAvoidingViewExt
                behavior="height"
                style={{
                    flex: 1,
                }}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.sheight,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            // width: DesignConvert.getW(320),
                            // height: DesignConvert.getH(430),
                            // borderRadius: DesignConvert.getW(10),
                            // backgroundColor: "white",
                        }}>

                        <ImageBackground
                            source={require("../../hardcode/skin_imgs/mywallet").gift_dialog_bg()}
                            style={{
                                width: DesignConvert.getW(282),
                                height: DesignConvert.getH(363),
                                alignItems: 'center',
                            }}>

                            <Text
                                style={{
                                    color: "#FFFFFF",
                                    fontSize: DesignConvert.getF(17),
                                    marginTop: DesignConvert.getH(27),

                                    fontWeight: 'bold'
                                }}>转增</Text>
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    top: DesignConvert.getH(31),
                                    right: DesignConvert.getW(15),
                                }}
                                onPress={this._onHistory}
                            >
                                <Text
                                    style={{
                                        color: "#5F1271",
                                        fontSize: DesignConvert.getF(12),

                                        fontWeight: 'bold'

                                    }}>转赠记录</Text>
                            </TouchableOpacity>





                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                    width: DesignConvert.getW(210),
                                    height: DesignConvert.getH(34),
                                    borderRadius: DesignConvert.getW(20),

                                    backgroundColor: '#FFFFFF',
                                    marginTop: DesignConvert.getH(30),
                                }}>
                                <Text
                                    style={{
                                        color: '#949494',
                                        marginStart: DesignConvert.getW(10),
                                        fontSize: DesignConvert.getF(12),
                                    }}>用户ID:</Text>

                                <TextInput
                                    style={{
                                        flex: 1,
                                        height: DesignConvert.getH(39),
                                        fontSize: DesignConvert.getF(11),
                                    }}
                                    value={this._ID}
                                    keyboardType="numeric"
                                    underlineColorAndroid="transparent"
                                    // placeholder="请输入用户的ID"
                                    placeholderTextColor='#D2D2D2'
                                    returnKeyType='next'
                                    onChangeText={this._onChangeID}
                                    selectionColor={THEME_COLOR}
                                ></TextInput>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                    width: DesignConvert.getW(210),
                                    height: DesignConvert.getH(34),
                                    borderRadius: DesignConvert.getW(20),

                                    backgroundColor: '#FFFFFF',
                                    marginTop: DesignConvert.getH(15),
                                }}>
                                <Text
                                    style={{
                                        color: '#949494',
                                        marginStart: DesignConvert.getW(10),
                                        fontSize: DesignConvert.getF(12),
                                    }}>昵称:</Text>

                                <TextInput
                                    style={{
                                        color: this._nickName == "输入id有误" ? "red" : "#000000",
                                        flex: 1,
                                        height: DesignConvert.getH(39),
                                        fontSize: DesignConvert.getF(11),
                                    }}
                                    value={this._nickName}
                                    keyboardType="default"
                                    underlineColorAndroid="transparent"
                                    // placeholder="点击校验确认昵称是否一致"
                                    placeholderTextColor='#D2D2D2'
                                    returnKeyType='next'
                                    onChangeText={this._onChangeNickName}
                                    selectionColor={THEME_COLOR}
                                ></TextInput>


                                <View
                                    style={{
                                        position: "absolute",
                                        top: DesignConvert.getH(4),
                                        right: DesignConvert.getW(6),
                                    }}>
                                    <VerificationButton
                                        onPress={this._checkPress}
                                        enable={this._ID != ""} />
                                </View>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                    width: DesignConvert.getW(210),
                                    height: DesignConvert.getH(34),
                                    borderRadius: DesignConvert.getW(20),

                                    backgroundColor: '#FFFFFF',
                                    marginTop: DesignConvert.getH(15),
                                }}>

                                <Text
                                    style={{
                                        color: '#949494',
                                        marginStart: DesignConvert.getW(10),
                                        fontSize: DesignConvert.getF(12),
                                    }}
                                >转增金币:</Text>
                                <TextInput
                                    style={{
                                        flex: 1,
                                        height: DesignConvert.getH(39),
                                        fontSize: DesignConvert.getF(11),
                                    }}
                                    value={this._amount}
                                    keyboardType="numeric"
                                    underlineColorAndroid="transparent"
                                    // placeholder={`请输入${COIN_NAME}数量`}
                                    placeholderTextColor='#D2D2D2'

                                    returnKeyType='next'
                                    onChangeText={this._onChangeAmount}
                                    selectionColor={THEME_COLOR}
                                >
                                </TextInput>
                                <Text
                                    style={{
                                        fontSize: DesignConvert.getF(12),
                                        color: '#585858',
                                        marginEnd: DesignConvert.getW(10),
                                    }}
                                >
                                    {COIN_NAME}
                                </Text>


                            </View>


                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                    width: DesignConvert.getW(210),
                                    height: DesignConvert.getH(34),
                                    borderRadius: DesignConvert.getW(20),

                                    backgroundColor: '#FFFFFF',
                                    marginTop: DesignConvert.getH(15),
                                }}>
                                <Text
                                    style={{
                                        color: '#949494',
                                        marginStart: DesignConvert.getW(10),
                                        fontSize: DesignConvert.getF(12),
                                    }}>支付密码</Text>

                                <TextInput
                                    style={{
                                        flex: 1,
                                        height: DesignConvert.getH(39),
                                        fontSize: DesignConvert.getF(11),
                                    }}
                                    value={this._payPassword}
                                    keyboardType="default"
                                    underlineColorAndroid="transparent"
                                    // placeholder="请输入支付密码"
                                    placeholderTextColor='#D2D2D2'

                                    returnKeyType='next'
                                    onChangeText={this._onChangePayPassword}
                                    secureTextEntry={true}
                                    selectionColor={THEME_COLOR}
                                ></TextInput>
                            </View>

                            {this._renderSubmitBtn()}



                        </ImageBackground>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: DesignConvert.getH(105),

                            width: DesignConvert.getW(34),
                            height: DesignConvert.getH(34),

                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={this.popSelf}
                    >
                        <Image
                            style={{
                                width: DesignConvert.getW(34),
                                height: DesignConvert.getH(34),
                            }}
                            source={ic_close_send()}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </KeyboardAvoidingViewExt>
        )
    }
}

export const styles = StyleSheet.create({
    line: {
        backgroundColor: "#DDDDDD",
        width: DesignConvert.getW(180),
        height: DesignConvert.getBorderWidth(1),
        position: "absolute",
        bottom: 0,
        left: DesignConvert.getW(97),
    },
})