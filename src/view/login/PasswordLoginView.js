/**
 * 登陆界面2
 */

'use strict';

import React, { PureComponent } from 'react';
import BaseView from "../base/BaseView";
import LinearGradient from 'react-native-linear-gradient';
import { View, Image, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView, Platform } from "react-native";
import DesignConvert from '../../utils/DesignConvert';
import Config from '../../configs/Config';
import KeyboardAvoidingViewExt from '../base/KeyboardAvoidingViewExt';
import { THEME_COLOR } from '../../styles';
import BackTitleView from '../base/BackTitleView';
import { bg_login, icon_show_psw, icon_hide_psw } from '../../hardcode/skin_imgs/login';

class GetCodeButton extends PureComponent {
    constructor(props) {
        super(props);

        this._countDown = 60;
    }

    _onPress = () => {
        this.props.onPress && this.props.onPress();
        this._codeTimer = setInterval(() => {
            this._countDown--;
            if (this._countDown < 1) {
                this._countDown = 60;
                clearInterval(this._codeTimer);
            }
            this.forceUpdate();
        }, 1000);
    }

    componentWillUnmount() {
        this._codeTimer && clearInterval(this._codeTimer);
    }

    render() {
        if (!this.props.enable) {
            return (
                <View
                    style={{
                        width: DesignConvert.getW(74),
                        height: DesignConvert.getH(24),
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        right: DesignConvert.getW(15),
                        marginVertical: DesignConvert.getH(13),
                    }}>

                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#8E7AFF', '#A67AFF']}
                        style={{
                            // position: 'absolute',
                            width: DesignConvert.getW(74),
                            height: DesignConvert.getH(24),
                            borderRadius: DesignConvert.getW(15),
                            justifyContent: "center",
                            alignItems: "center",
                            borderColor: '#5F1271',
                            borderWidth: DesignConvert.getW(1.5),
                        }} >

                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: DesignConvert.getF(11),
                            }}
                        >获取验证码</Text></LinearGradient>
                </View>
            );
        }

        if (this._countDown != 60) {
            return (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#ECECEC', '#ECECEC']}
                    style={{
                        width: DesignConvert.getW(74),
                        height: DesignConvert.getH(24),
                        borderRadius: DesignConvert.getW(15),
                        opacity: 0.7,
                        justifyContent: "center",
                        alignItems: "center",
                        position: 'absolute',
                        marginVertical: DesignConvert.getH(13),
                        right: DesignConvert.getW(15),
                    }}>
                    <Text
                        style={{
                            color: "#949494",
                            fontSize: DesignConvert.getF(11),
                        }}
                    >{this._countDown}s后重试</Text>
                </LinearGradient>
            );
        }

        return (
            <TouchableOpacity
                style={{
                    width: DesignConvert.getW(74),
                    height: DesignConvert.getH(24),
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    right: DesignConvert.getW(15),
                    top: DesignConvert.getH(13),
                }}
                onPress={this._onPress}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#8E7AFF', '#A67AFF']}
                    style={{
                        // position: 'absolute',
                        width: DesignConvert.getW(74),
                        height: DesignConvert.getH(24),
                        borderRadius: DesignConvert.getW(15),
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: '#5F1271',
                        borderWidth: DesignConvert.getW(1.5),
                    }} >

                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontSize: DesignConvert.getF(11),
                        }}
                    >获取验证码</Text></LinearGradient>
            </TouchableOpacity>
        )
    }
}

class LoginButton extends PureComponent {

    _onPress = () => {
        this.props.onPress && this.props.onPress();
    }

    render() {
        if (this.props.enable) {
            return (
                <TouchableOpacity
                    style={{
                        marginHorizontal: DesignConvert.getW(52),
                        marginTop: DesignConvert.getHeight(40),
                        width: DesignConvert.getW(240),
                        height: DesignConvert.getH(50),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={this._onPress}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#8E7AFF', '#A67AFF']}
                        style={{
                            position: 'absolute',
                            width: DesignConvert.getW(240),
                            height: DesignConvert.getH(50),
                            borderRadius: DesignConvert.getW(41),
                            // flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: DesignConvert.getW(1.5),
                            borderColor: '#5F1271',
                        }}
                    />

                    <Text
                        style={{
                            color: 'white',
                            fontSize: DesignConvert.getF(16),
                        }}
                    >登陆</Text>
                </TouchableOpacity>

            );
        }

        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#8E7AFF55', '#A67AFF55']}
                style={{
                    marginTop: DesignConvert.getHeight(40),
                    marginHorizontal: DesignConvert.getW(52),
                    width: DesignConvert.getW(240),
                    height: DesignConvert.getH(50),
                    borderRadius: DesignConvert.getW(41),
                    // flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: DesignConvert.getW(1.5),
                    borderColor: '#5F1271',
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: DesignConvert.getF(16),
                    }}
                >登陆</Text>
            </LinearGradient>
        )
    }
}


export const [LOGIN_PRE, LOGIN_BY_CODE, LOGIN_BY_PASSWORD] = ["LOGIN_PRE", "LOGIN_BY_CODE", "LOGIN_BY_PASSWORD"]
export default class PasswordLoginView extends BaseView {

    constructor(props) {
        super(props);

        this._phoneNum = '';
        this._code = '';
        this._bAgree = true;
        this._switchPage = this.props.params.viewType;
        this._showPsw = false;
    }

    _onGetCode = () => {
        require('../../model/LoginModel').default.getSmsByPhoneLogin(this._phoneNum);
    }

    _onChangePhone = (s) => {
        this._phoneNum = s;
        this.forceUpdate();
    }

    _onChangeCode = (s) => {
        this._code = s;
        this.forceUpdate();
    }

    _onLogin = () => {
        if (this._switchPage == LOGIN_BY_CODE) return require('../../model/LoginModel').default.loginByMobile(this._phoneNum, this._code);
        require("../../model/LoginModel").default.loginByPsw(this._phoneNum, this._code);
    }

    _onGuestLogin = async () => {
        require('../../model/LoginModel').default.newDeviceLogin();
    }

    _onWechat = () => {
        require('../../model/LoginModel').default.wechatLogin();
    }

    _onQQ = () => {
        //todo
        alert('todo: 登陆QQ');
    }

    _onAccountPsw = () => {
        require("../../router/level1_router").showPasswordLoginView();
    }

    _onAgree = () => {
        this._bAgree = !this._bAgree;
        this.forceUpdate();
    }

    _onOpenAgree = () => {
        //TODO:
        // alert('todo: 打开用户协议界面');
    }

    _onSwithPage = (pageType) => {
        this._switchPage = pageType;
        this._phoneNum = '';
        this._code = '';
        this.forceUpdate()
    }

    _renderGuestLogin() {

        if (!this._bAgree) {
            return null;
        }

        return (
            <TouchableOpacity
                style={{
                    marginLeft: DesignConvert.getW(149),
                    marginTop: DesignConvert.getHeight(21),
                }}
                onPress={this._onGuestLogin}
            >
                <Text
                    style={{
                        color: 'red',
                        fontSize: DesignConvert.getF(13),
                    }}
                >游客账号登陆</Text>

            </TouchableOpacity>

        )
    }

    _renderLastLogin(b) {
        if (!b) {
            return null;
        }

        return (
            <ImageBackground
                style={{
                    position: 'absolute',

                    width: DesignConvert.getW(56),
                    height: DesignConvert.getH(23),

                    // flexDirection: 'column',
                    // justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
                source={require('../../hardcode/skin_imgs/login').question()}
            >
                <Text
                    style={{
                        marginTop: DesignConvert.getH(3),

                        color: 'black',
                        fontSize: DesignConvert.getF(10),
                    }}
                >上次登陆</Text>
            </ImageBackground>
        );
    }

    _renderWechat() {
        if (Platform.OS === "ios") return null
        return (
            <TouchableOpacity
                style={{
                    marginTop: DesignConvert.getH(30),
                    alignSelf: "center",
                    // flexDirection: 'column',
                    // justifyContent: 'flex-start',

                }}
                onPress={this._onWechat}
            >
                <Image
                    style={{
                        width: DesignConvert.getW(35),
                        height: DesignConvert.getH(35),
                    }}
                    source={require('../../hardcode/skin_imgs/login').wx()}
                />
                {this._renderLastLogin(false)}
            </TouchableOpacity>
        );
    }

    _renderQQ() {
        return null;
        // return (
        //     <TouchableOpacity
        //         style={{
        //             position: 'absolute',
        //             bottom: DesignConvert.getHeight(95),
        //             left: DesignConvert.getW(159),

        //             width: DesignConvert.getW(50),
        //             height: DesignConvert.getH(80),

        //             // flexDirection: 'column',
        //             // justifyContent: 'flex-start',
        //             alignItems: 'center',
        //         }}
        //         onPress={this._onQQ}
        //     >
        //         <Image
        //             style={{
        //                 marginTop: DesignConvert.getH(23),
        //                 width: DesignConvert.getW(34),
        //                 height: DesignConvert.getH(34),
        //             }}
        //             source={require('../../hardcode/skin_imgs/login').icon_qq()}
        //         />
        //         <Text
        //             style={{
        //                 marginTop: DesignConvert.getH(8),
        //                 color: '#F5F2FF',
        //                 fontSize: DesignConvert.getF(10),
        //             }}
        //         >QQ登陆</Text>

        //         {this._renderLastLogin(false)}
        //     </TouchableOpacity>
        // );
    }
    _rednerFormInput(bIsMobile, bValidCode) {

        if (this._switchPage == LOGIN_BY_CODE) {
            return (
                <View
                    style={{
                        flex: 1,
                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(540),
                        marginTop: DesignConvert.getH(30),
                        backgroundColor: '#FFFFFF',
                        borderRadius: DesignConvert.getW(20),
                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#5F1271',
                        paddingStart: DesignConvert.getW(30),
                        paddingEnd: DesignConvert.getW(30),
                        alignItems: 'center',
                    }}>

                    <Text
                        style={{
                            color: '#121212',
                            width: DesignConvert.getW(285),
                            fontSize: DesignConvert.getF(14),
                            marginTop: DesignConvert.getH(40),
                            paddingStart: DesignConvert.getW(10),
                        }}
                    >{`手机号`}</Text>

                    <TextInput
                        style={{
                            width: DesignConvert.getW(285),
                            height: DesignConvert.getH(50),
                            backgroundColor: '#F8F8F8',
                            borderRadius: DesignConvert.getW(10),
                            fontSize: DesignConvert.getF(13),
                            paddingHorizontal: DesignConvert.getW(15),
                            marginTop: DesignConvert.getH(8),
                        }}
                        maxLength={11}
                        keyboardType='numeric'
                        underlineColorAndroid="transparent"
                        placeholder='请输入新的手机号'
                        placeholderTextColor="#E6E6E6"
                        returnKeyType='next'
                        onChangeText={this._onChangePhone}
                        selectionColor={THEME_COLOR}
                    />

                    <Text
                        style={{
                            color: '#212121',
                            width: DesignConvert.getW(285),
                            fontSize: DesignConvert.getF(13),
                            marginTop: DesignConvert.getH(24),
                            paddingStart: DesignConvert.getW(10),
                        }}
                    >{`验证码`}</Text>

                    <View
                        style={{
                            marginTop: DesignConvert.getHeight(8),
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: DesignConvert.getW(285),
                            height: DesignConvert.getH(50),
                            paddingHorizontal: 0,
                        }}>


                        <TextInput
                            style={{
                                width: DesignConvert.getW(285),
                                height: DesignConvert.getH(50),
                                backgroundColor: '#F8F8F8',
                                borderRadius: DesignConvert.getW(10),
                                fontSize: DesignConvert.getF(13),
                                paddingHorizontal: DesignConvert.getW(15),
                            }}
                            maxLength={6}
                            keyboardType='number-pad'
                            underlineColorAndroid="transparent"
                            placeholder="输入验证码"
                            placeholderTextColor="#E6E6E6"
                            returnKeyType='next'
                            onChangeText={this._onChangeCode}
                            selectionColor={THEME_COLOR}
                        />

                        <GetCodeButton
                            onPress={this._onGetCode}
                            enable={bIsMobile}
                        />
                    </View>

                    <View
                        style={{
                            width: DesignConvert.getW(285),
                            flexDirection: 'row',
                            // justifyContent: 'space-between',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >

                        <Text
                            style={{
                                fontSize: DesignConvert.getF(11),
                                color: '#8E7AFF',
                                padding: DesignConvert.getW(10),
                                textAlign: 'center',
                                marginTop: DesignConvert.getH(12),
                            }}
                            onPress={this._onSwitch}
                        >{`密码登陆`}</Text>


                    </View>

                    <LoginButton
                        onPress={this._onLogin}
                        enable={bIsMobile && bValidCode && this._bAgree}
                    />

                    <Text
                        style={{
                            fontSize: DesignConvert.getF(11),
                            color: '#BCBCBC',
                            marginTop: DesignConvert.getH(8),
                        }}
                    >
                        {`温馨提示:登陆即视为自动注册账号`}
                    </Text>
                </View>
            )
        }

        // 使用账号密码登陆的时候
        return (
            <View
                style={{
                    flex: 1,
                    width: DesignConvert.getW(345),
                    height: DesignConvert.getH(540),
                    marginTop: DesignConvert.getH(30),
                    backgroundColor: '#FFFFFF',
                    borderRadius: DesignConvert.getW(20),
                    borderWidth: DesignConvert.getW(1.5),
                    borderColor: '#5F1271',
                    paddingStart: DesignConvert.getW(30),
                    paddingEnd: DesignConvert.getW(30),
                    alignItems: 'center',
                }}>

                <Text
                    style={{
                        color: '#212121',
                        width: DesignConvert.getW(285),
                        fontSize: DesignConvert.getF(13),
                        marginTop: DesignConvert.getH(40),
                        paddingStart: DesignConvert.getW(10),
                    }}
                >{`手机号或ID`}</Text>

                <TextInput
                    style={{
                        width: DesignConvert.getW(285),
                        height: DesignConvert.getH(50),
                        backgroundColor: '#FBFBFB',
                        borderRadius: DesignConvert.getW(10),
                        fontSize: DesignConvert.getF(13),
                        paddingHorizontal: DesignConvert.getW(15),
                        marginTop: DesignConvert.getH(8),
                    }}
                    maxLength={11}
                    keyboardType='number-pad'
                    underlineColorAndroid="transparent"
                    placeholder="输入手机号或者ID"
                    placeholderTextColor="#D2D2D2"
                    returnKeyType='next'
                    onChangeText={this._onChangePhone}
                    selectionColor={THEME_COLOR}
                />

                <Text
                    style={{
                        color: '#212121',
                        width: DesignConvert.getW(285),
                        fontSize: DesignConvert.getF(13),
                        marginTop: DesignConvert.getH(24),
                        paddingStart: DesignConvert.getW(10),
                    }}
                >{`密码`}</Text>


                <View
                    style={{
                        marginTop: DesignConvert.getHeight(8),
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: DesignConvert.getW(285),
                        height: DesignConvert.getH(50),
                    }}>

                    <TextInput
                        style={{
                            width: DesignConvert.getW(285),
                            height: DesignConvert.getH(50),
                            backgroundColor: '#FBFBFB',
                            borderRadius: DesignConvert.getW(10),
                            paddingHorizontal: DesignConvert.getW(15),
                            fontSize: DesignConvert.getF(13),
                        }}
                        keyboardType="default"
                        underlineColorAndroid="transparent"
                        placeholder='请输入您的密码'
                        placeholderTextColor="#D2D2D2"
                        returnKeyType='next'
                        onChangeText={this._onChangeCode}
                        selectionColor={THEME_COLOR}
                        secureTextEntry={!this._showPsw ? true : false}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            this._showPsw = !this._showPsw;
                            this.forceUpdate();
                        }}
                        style={{
                            position: 'absolute',
                            right: DesignConvert.getW(25),
                            top: DesignConvert.getH(15),
                        }}>

                        <Image
                            source={this._showPsw ? icon_show_psw() : icon_hide_psw()}
                            style={{

                                width: DesignConvert.getW(20),
                                height: DesignConvert.getH(20),
                            }} /></TouchableOpacity>

                </View>

                <View
                    style={{
                        width: DesignConvert.getW(285),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                    <Text
                        style={{
                            fontSize: DesignConvert.getF(11),
                            color: '#8E7AFF',
                            padding: DesignConvert.getW(10),
                            textAlign: 'center',
                            marginTop: DesignConvert.getH(12),
                        }}
                        onPress={this._onSwitch}
                    >{`快速登陆`}</Text>


                    {/* <Text
                        style={{
                            fontSize: DesignConvert.getF(11),
                            color: '#BCBCBC',
                            padding: DesignConvert.getW(10),
                        }}
                    >
                        {`忘记密码？`}
                    </Text> */}


                </View>

                <LoginButton
                    onPress={this._onLogin}
                    enable={bIsMobile && bValidCode && this._bAgree}
                />
                <Text
                    style={{
                        fontSize: DesignConvert.getF(11),
                        color: '#BCBCBC',
                        marginTop: DesignConvert.getH(8),
                    }}
                >
                    {`温馨提示:登陆即视为自动注册账号`}
                </Text>
            </View>
        )
    }

    _renderAgree() {
        const CheckBoxView = require('../base/CheckBoxView').default;

        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: DesignConvert.getHeight(47),
                    left: DesignConvert.getW(97),

                    flexDirection: 'row',
                    // justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <CheckBoxView
                    bChecked={this._bAgree}
                    onPress={this._onAgree}
                />

                <Text
                    style={{
                        marginLeft: DesignConvert.getW(8),
                        color: 'white',
                        fontSize: DesignConvert.getF(11),
                    }}
                >我已阅读并同意</Text>

                <TouchableOpacity
                    onPress={this._onOpenAgree}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: DesignConvert.getF(11),
                        }}
                    >《用户许可协议》</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _rednerAgreeInfo() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    height: DesignConvert.getH(97),
                }}
            >
                <Text
                    style={{
                        position: 'absolute',
                        bottom: DesignConvert.getH(20),
                        color: '#FFFFFF',
                        fontSize: DesignConvert.getF(11)
                    }}
                    source={require('../../hardcode/skin_imgs/login').bg()}
                    resizeMode='contain'
                >
                    {`登陆即表示您已同意`}
                    <Text
                        style={{
                            color: '#FFE8B1',
                            fontSize: DesignConvert.getF(11)
                        }}
                        textDecorationLine="underline"
                    >《用户协议》</Text>

                    <Text
                        style={{
                            color: '#FFE8B1',
                            fontSize: DesignConvert.getF(11)
                        }}
                        textDecorationLine="underline"
                    >《隐私条款》</Text>
                    {`和`}
                    <Text
                        style={{
                            color: '#FFE8B1',
                            fontSize: DesignConvert.getF(11)
                        }}
                        textDecorationLine="underline"
                        onPress={this._onOpenAgree}

                    >《儿童隐私政策》</Text>


                </Text>
            </View>
        )
    }

    _onSwitch = () => {
        if (this._switchPage == LOGIN_BY_CODE) {
            this._switchPage = LOGIN_BY_PASSWORD
            // require("../../router/level1_router").showPasswordLoginView(LOGIN_BY_PASSWORD);
        } else {
            this._switchPage = LOGIN_BY_CODE
            // require("../../router/level1_router").showPasswordLoginView(LOGIN_BY_CODE);
        }
        this.forceUpdate()
    }

    render() {
        const StringUtil = require("../../utils/StringUtil").default;

        const bValidCode = this._switchPage == LOGIN_BY_CODE ? this._code.length == 6 : this._code.length >= 6 && this._code.length <= 16
        const bIsMobile = this._switchPage == LOGIN_BY_CODE ? StringUtil.isMobile(this._phoneNum) : this._phoneNum.length >= 6
        // if (this._switchPage) {
        //     const bValidCode = this._code.length == 6;
        //     const bIsMobile = StringUtil.isMobile(this._phoneNum);
        // } else {}
        // const bValidCode = this._code.length >= 6 && this._code.length <= 16;
        // const bIsMobile = this._phoneNum.length >= 6;
        return (
            <KeyboardAvoidingViewExt
                behavior="height"
                style={{
                    width: DesignConvert.swidth,
                    flex: 1,
                }}>

                <ImageBackground
                    resizeMode="cover"
                    source={bg_login()}
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.sheight,
                        backgroundColor: '#FFFFFF',
                        paddingTop: Platform.OS === 'ios' ? -DesignConvert.statusBarHeight : 0,
                        alignItems: 'center',
                    }}>


                    <TouchableOpacity
                        style={{
                            width: DesignConvert.swidth,
                            // height: DesignConvert.getH(97),
                            marginTop: DesignConvert.statusBarHeight + DesignConvert.getH(30),
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(27),
                                color: '#FFFFFF',
                                marginStart: DesignConvert.getW(30),
                            }}
                        >{this._switchPage == LOGIN_BY_CODE ? '快速登陆' : '密码登陆'}</Text>
                    </TouchableOpacity>

                    {this._rednerFormInput(bIsMobile, bValidCode)}



                    {/* {this._renderGuestLogin()} */}


                    {this._rednerAgreeInfo()}
                    {/* {this._renderQQ()} */}


                    {/* {this._renderAgree()} */}


                </ImageBackground>


            </KeyboardAvoidingViewExt>
        )
    }
}