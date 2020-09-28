
/**
 * 设置密码页面
 */

'use strict';

import React, { PureComponent, Component } from "react";
import BaseView from "../base/BaseView";
import BackTitleView from "../base/BackTitleView";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal, ImageBackground, TextInput } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import Config from '../../configs/Config';
import { SubmitButton } from '../anchorincome/VerifyPayPasswordView';
import ToastUtil from "../base/ToastUtil";
import StringUtil from '../../utils/StringUtil';
import CodeInputWidget from './CodeInputWidget';
import UserInfoCache from "../../cache/UserInfoCache";
import { THEME_COLOR } from "../../styles";
import { open_eye } from "../../hardcode/skin_imgs/login";
import UpdatePasswordModel from "../../model/setting/UpdatePasswordModel";
const [updatePassword, updatePayPassword] = [233, 666];
export { updatePassword, updatePayPassword };



export default class UpdatePasswordView extends BaseView {
    constructor(props) {
        super(props);

        this._phoneNum = UserInfoCache.phoneNumber;
        this._setpassword = UserInfoCache.setpassword;    //是否已设置登录密码
        this._setPayPassword = UserInfoCache.setPayPassword;  //是否已设置支付密码
        this._code = "";
        this._passWord = "";
        this._passWordAgain = "";

        this._isSetPsW = false;

        this._submitEnable = false;

        this._pswA = false;
        this._pswB = true;

        this._countDown = 60;
        this._codeTimer;
        this._isChangePwd = this.props.params.viewType == updatePassword;

        this._showTip = false;
    }

    _onBackPress = () => {
        this.popSelf();
    }
    _isShowPswA = () => {
        this._pswA = !this._pswA
        this.forceUpdate()
    }
    _isShowPswB = () => {
        this._pswB = !this._pswB
        this.forceUpdate()
    }
    _checkSubmitEnable = () => {
        if (this._setpassword && this._phoneNum != "" && this._code != "" && this._passWord != "" && this._passWordAgain != "") {
            this._submitEnable = true;
        }
        else if (!this._setpassword && this._phoneNum != "" && this._passWord != "" && this._passWordAgain != "") {
            this._submitEnable = true;
        } else {
            this._submitEnable = false;
        }
    }

    _onChangeCode = (s) => {
        this._code = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onChangePassWord = (s) => {
        this._passWord = s;
        this._passWordAgain = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onChangePassWordAgain = (s) => {
        this._passWordAgain = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onGetCodePress = () => {
        require("../../model/setting/UpdatePasswordModel").default.sendGetMsgCode(this._phoneNum)
            .then(data => {
                if (data) {
                    this._codeTimer = setInterval(() => {
                        this._countDown--;
                        if (this._countDown < 1) {
                            this._countDown = 60;
                            clearInterval(this._codeTimer);
                        }
                        this.forceUpdate();
                    }, 1000);
                }
            })

    }

    _onSubmitPress = () => {
        if (!this._submitEnable) return;

        if (this._passWord != this._passWordAgain) {
            ToastUtil.showCenter("密码不一致");
            return
        }

        if (this._isChangePwd) {

            //匹配6-16位纯数字
            let regex = /\d{6,16}$/;
            if (regex.test(this._passWord)) {
                this._showTip = true;
                ToastUtil.showCenter('您设置的密码过于简单，使用数字、字母、符号混合的密码更安全哦')
                this.forceUpdate();
                return;
            }

            require("../../model/setting/UpdatePasswordModel").default.updatePasswor(this._passWord, this._code)
                .then(data => {
                    if (data) {
                        ToastUtil.showCenter("修改成功");
                        this.popSelf();
                    }
                })
        } else {
            require("../../model/setting/UpdatePasswordModel").default.setPayPassword(this._passWord, this._code)
                .then(data => {
                    if (data) {
                        ToastUtil.showCenter("修改成功");
                        require("../../cache/UserInfoCache").default.setPayPasswordTrue();
                        this.popSelf();
                    }
                })
        }

    }

    async componentDidMount() {
        super.componentDidMount();
        this._isSetPsW = await UpdatePasswordModel.isSetPayPassword()
        this.forceUpdate()
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        clearInterval(this._codeTimer);
    }

    _renderGetCode() {
        if (this._countDown == 60) {
            if (!StringUtil.isMobile(this._phoneNum)) {
                return (
                    <View
                        style={{
                            position: 'absolute',
                            right: DesignConvert.getW(30),
                            bottom: DesignConvert.getH(15),
                            width: DesignConvert.getW(74),
                            height: DesignConvert.getH(24),
                            backgroundColor: "#F6F6F6",
                            borderRadius: DesignConvert.getW(10),
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Text
                            style={{
                                color: "#BCBCBC",
                                fontSize: DesignConvert.getF(14),
                            }}
                        >获取验证码</Text>
                    </View>
                )
            }
            return (
                <TouchableOpacity
                    style={{

                        position: 'absolute',
                        bottom: DesignConvert.getH(15),
                        right: DesignConvert.getW(30),
                    }}
                    onPress={this._onGetCodePress}
                >
                    {/* <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#8A50FC', '#F293FF']}
                        style={{
                            width: DesignConvert.getW(74),
                            height: DesignConvert.getH(24),
                            borderRadius: DesignConvert.getW(10),

                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    > */}
                    <Text
                        style={{
                            color: "#8E7AFF",
                            fontSize: DesignConvert.getF(14),
                            textAlign: "center",
                        }}
                    >获取验证码</Text>
                    {/* </LinearGradient> */}
                </TouchableOpacity>
            )
        } else {
            return (
                <View
                    style={{
                        position: 'absolute',
                        bottom: DesignConvert.getH(15),
                        right: DesignConvert.getW(30),
                        width: DesignConvert.getW(74),
                        height: DesignConvert.getH(24),
                        backgroundColor: "#F6F6F6",
                        borderRadius: DesignConvert.getW(10),
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            color: "#BCBCBC",
                            fontSize: DesignConvert.getF(14),
                        }}
                    >{`${this._countDown}s重试`}</Text>
                </View>
            )
        }
    }

    _renderButton = (text) => {
        return (<TouchableOpacity
            disabled={!this._submitEnable}
            onPress={this._onSubmitPress}
            style={{ marginTop: DesignConvert.getH(50) }}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={this._submitEnable ? ['#8E7AFF', '#C17AFF'] : ['#8E7AFF55', '#C17AFF55']}
                style={{
                    width: DesignConvert.getW(315),
                    height: DesignConvert.getH(50),
                    borderRadius: DesignConvert.getW(25),
                    borderWidth: DesignConvert.getW(1.5),
                    borderColor: '#5F1271',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{ fontSize: DesignConvert.getF(14), color: '#FFFFFF' }}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>)
    }

    renderSetPwdView = () => {
        return (<View
            style={{ alignItems: 'center' }}>
            <TextInput
                value={this._passWord}
                secureTextEntry={!this._pswA}
                keyboardType="default"
                underlineColorAndroid="transparent"
                placeholder="请输入登陆密码"
                placeholderTextColor="#CCCCCC"
                returnKeyType='next'
                onChangeText={this._onChangePassWord}
                maxLength={16}
                selectionColor={THEME_COLOR}
                style={styles.tp_style} />
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: DesignConvert.getW(30),
                    top: DesignConvert.getH(31),
                }}
                onPress={this._isShowPswA}
            >
                <Image
                    source={this._pswA ? require('../../hardcode/skin_imgs/login').open_eye() : require('../../hardcode/skin_imgs/login').close_eye()}
                    style={{
                        width: DesignConvert.getW(18),
                        height: DesignConvert.getH(18),
                        resizeMode: 'contain',
                    }}
                />
            </TouchableOpacity>

            {this._showTip && <Text
                numberOfLines={2}
                style={{
                    marginTop: DesignConvert.getH(15),
                    fontSize: DesignConvert.getF(12),
                    lineHeight: DesignConvert.getF(16.5),
                    color: '#8E7AFF',
                    width: DesignConvert.getW(310),
                    textAlign: 'center',
                }}>您设置的密码过于简单，使用数字、字母、符号混合的密码更安全哦</Text>}
            {this._renderButton('完成')}
        </View>)
    }

    renderChangePwdView = () => {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: '#F9F9F9',
                }}>

                <View
                    style={{
                        // width: DesignConvert.getW(345),
                        // height: DesignConvert.getH(44),
                        // backgroundColor: "#FFFFFF",
                        // borderRadius: DesignConvert.getW(10),

                        // marginTop: DesignConvert.getH(30),
                        // paddingLeft: DesignConvert.getW(15),

                        justifyContent: 'center',
                    }}
                >

                    <TextInput
                        style={styles.tp_style}
                        value={this._phoneNum}
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        placeholder="请输入手机号码"
                        placeholderTextColor="#E6E6E6"
                        returnKeyType='next'
                        onChangeText={this._onChangePhoneNum}
                        maxLength={11}
                        selectionColor={THEME_COLOR}
                    ></TextInput>
                </View>

                <View
                    style={{
                        // width: DesignConvert.getW(345),
                        // height: DesignConvert.getH(44),
                        // backgroundColor: "#FFFFFF",
                        // borderRadius: DesignConvert.getW(10),

                        marginTop: DesignConvert.getH(5),
                        // paddingLeft: DesignConvert.getW(15),
                        // paddingRight: DesignConvert.getW(15),

                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TextInput
                        style={styles.tp_style}
                        value={this._code}
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        placeholder="请输入验证码"
                        placeholderTextColor="#CCCCCC"
                        returnKeyType='next'
                        onChangeText={this._onChangeCode}
                        maxLength={6}
                        selectionColor={THEME_COLOR}
                    ></TextInput>

                    {this._renderGetCode()}

                </View>

                <View
                    style={{
                        // width: DesignConvert.getW(345),
                        // height: DesignConvert.getH(44),
                        // backgroundColor: "#FFFFFF",
                        // borderRadius: DesignConvert.getW(10),

                        marginTop: DesignConvert.getH(5),
                        // paddingLeft: DesignConvert.getW(15),
                        // paddingRight: DesignConvert.getW(15),

                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TextInput
                        style={styles.tp_style}
                        value={this._passWord}
                        secureTextEntry={!this._pswA}
                        keyboardType="default"
                        underlineColorAndroid="transparent"
                        placeholder= {this._isChangePwd? "请输入新的登陆密码":'请输入支付密码'}
                        placeholderTextColor="#CCCCCC"
                        returnKeyType='next'
                        onChangeText={this._onChangePassWord}
                        maxLength={16}
                        selectionColor={THEME_COLOR}
                    ></TextInput>

                    {/* <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: DesignConvert.getW(15),
                            top: DesignConvert.getH(12),
                        }}
                        onPress={this._isShowPswA}
                    >
                        <Image
                            source={this._pswA ? require('../../hardcode/skin_imgs/login').open_eye() : require('../../hardcode/skin_imgs/login').close_eye()}
                            style={{
                                width: DesignConvert.getW(20),
                                height: DesignConvert.getH(20)
                            }}
                        />
                    </TouchableOpacity> */}
                </View>

                {/* <View
                    style={{
                        width: DesignConvert.getW(270),
                        height: DesignConvert.getH(48),
                        backgroundColor: "#FAF9FF",
                        borderRadius: DesignConvert.getW(10),
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: DesignConvert.getW(24),
                        paddingRight: DesignConvert.getW(24),
                        marginTop: DesignConvert.getH(18),
                    }}
                >
                    <TextInput
                        style={{
                            width: DesignConvert.getW(270),
                            color: "#1A1A1A",
                            fontSize: DesignConvert.getF(15),
                            marginRight: DesignConvert.getW(10),
                        }}
                        value={this._passWordAgain}
                        secureTextEntry={!this._pswB}
                        keyboardType="default"
                        underlineColorAndroid="transparent"
                        placeholder="请再次输入您的密码"
                        placeholderTextColor="#CCCCCC"
                        returnKeyType="done"
                        onChangeText={this._onChangePassWordAgain}
                        maxLength={16}
                        selectionColor={THEME_COLOR}
                    ></TextInput>
                    <TouchableOpacity
                        onPress={this._isShowPswB}
                        style={{
                            position: 'absolute',
                            right: DesignConvert.getW(15),
                            top: DesignConvert.getH(12),
                        }}
                    >
                        <Image
                            source={this._pswB ? require('../../hardcode/skin_imgs/login').open_eye() : require('../../hardcode/skin_imgs/login').close_eye()}
                            style={{

                                width: DesignConvert.getW(20),
                                height: DesignConvert.getH(20)
                            }}
                        />
                    </TouchableOpacity>
                </View> */}

                {this._renderButton('确认修改')}


                {/* <TouchableOpacity
                    style={{
                        width: DesignConvert.swidth,

                        alignItems: 'center',

                        position: 'absolute',
                        bottom: DesignConvert.getH(30) + DesignConvert.addIpxBottomHeight(34),
                    }}
                    onPress={this._onSubmitPress}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={this._submitEnable ? ['#8A50FC', '#F293FF'] : ['#F6F6F6', '#F6F6F6']}
                        style={{
                            width: DesignConvert.getW(320),
                            height: DesignConvert.getH(50),
                            borderRadius: DesignConvert.getW(20),

                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(16),
                                color: '#FFFFFF',
                            }}
                        >
                            {'确认设置'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity> */}
            </View>
        )
    }


    renderSetPayPwdView = () => {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: '#F9F9F9',
                }}>

                <Text
                    style={{
                        marginTop: DesignConvert.getH(15),

                        textAlign: 'center',
                        width: DesignConvert.swidth,
                        fontSize: DesignConvert.getF(14),
                        color: '#121212',
                        lineHeight: DesignConvert.getH(18.5),
                    }}
                >
                    {`已绑定手机号:+86 ${this._phoneNum}`}
                </Text>

                <View
                    style={{
                        // width: DesignConvert.getW(345),
                        // height: DesignConvert.getH(44),
                        // backgroundColor: "#FFFFFF",
                        // borderRadius: DesignConvert.getW(10),

                        // marginTop: DesignConvert.getH(20),
                        // paddingLeft: DesignConvert.getW(15),
                        // paddingRight: DesignConvert.getW(15),

                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TextInput
                        style={styles.tp_style}
                        value={this._code}
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        placeholder="请输入验证码"
                        placeholderTextColor="#CCCCCC"
                        returnKeyType='next'
                        onChangeText={this._onChangeCode}
                        maxLength={6}
                        selectionColor={THEME_COLOR}
                    ></TextInput>

                    {this._renderGetCode()}

                </View>

                <TextInput
                    secureTextEntry
                    style={styles.tp_style}
                    value={this._passWord}
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    placeholder="请输入新的支付密码"
                    placeholderTextColor="#CCCCCC"
                    returnKeyType='next'
                    onChangeText={this._onChangePassWord}
                    maxLength={6}
                    selectionColor={THEME_COLOR}
                ></TextInput>

                {this._renderButton('确认设置')}

                {/* <Text
                    style={{
                        marginTop: DesignConvert.getH(20),
                        marginBottom: DesignConvert.getH(10),

                        textAlign: 'center',
                        width: DesignConvert.swidth,
                        fontSize: DesignConvert.getF(13),
                        color: '#212121',
                        lineHeight: DesignConvert.getH(18.5),
                    }}
                >
                    {`请输入六位数支付密码`}
                </Text>

                <CodeInputWidget
                    codeChange={(v) => {
                        this._passWord = v;
                        this._passWordAgain = v;
                        this._checkSubmitEnable();
                        this.forceUpdate();
                    }}
                /> */}

                <TouchableOpacity
                    style={{
                        width: DesignConvert.swidth,

                        alignItems: 'center',

                        position: 'absolute',
                        bottom: DesignConvert.getH(30) + DesignConvert.addIpxBottomHeight(34),
                    }}
                    onPress={this._onSubmitPress}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={this._submitEnable ? ['#8A50FC', '#F293FF'] : ['#F6F6F6', '#F6F6F6']}
                        style={{
                            width: DesignConvert.getW(320),
                            height: DesignConvert.getH(50),
                            borderRadius: DesignConvert.getW(20),

                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(16),
                                color: '#FFFFFF',
                            }}
                        >
                            {'确认'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }

    render() {

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}
            >

                <BackTitleView
                    onBack={this._onBackPress}
                    titleText={this._isChangePwd ? this._setpassword ? "设置登陆密码" : '修改登陆密码'
                        : this._setpassword ? "设置支付密码" : '修改支付密码'}
                    titleTextStyle={{
                        color: '#212121',
                        fontSize: DesignConvert.getF(18),
                    }}
                />

                {this._isChangePwd ?
                    !this._setpassword ? this.renderSetPwdView() : this.renderChangePwdView()
                    : !this._setPayPassword ? this.renderSetPayPwdView() : this.renderChangePwdView()
                }

            </View>
        )
    }
}

export const styles = StyleSheet.create({
    tp_style: {
        marginHorizontal: DesignConvert.getW(15),
        marginTop: DesignConvert.getH(15),
        paddingHorizontal: DesignConvert.getW(15),
        width: DesignConvert.getW(345),
        height: DesignConvert.getH(50),
        borderRadius: DesignConvert.getW(10),
        borderWidth: DesignConvert.getW(1.5),
        borderColor: '#5F1271',

        color: "#212121",
        fontSize: DesignConvert.getF(13),
        lineHeight: DesignConvert.getH(18.5),
    },
})