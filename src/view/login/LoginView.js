/**
 * 登陆界面
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
import {
    LOGIN_PRE,
    LOGIN_BY_CODE,
    LOGIN_BY_PASSWORD,
} from './PasswordLoginView';
import { bg_login, icon_login, icon_phone, icon_lock } from '../../hardcode/skin_imgs/login';

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
                <Text
                    style={{
                        marginTop: DesignConvert.getHeight(14),
                        marginLeft: DesignConvert.getW(12),
                        color: '#AEAEAE',
                        fontSize: DesignConvert.getF(14),
                    }}
                >获取验证码</Text>
            );
        }

        if (this._countDown != 60) {
            return (
                <View>
                    <Text
                        style={{
                            marginTop: DesignConvert.getHeight(14),
                            marginLeft: DesignConvert.getW(12),
                            color: '#AEAEAE',
                            fontSize: DesignConvert.getF(14),
                        }}
                    >
                        获取验证码
                    </Text>
                    <Text
                        style={{
                            marginLeft: DesignConvert.getW(12),
                            fontSize: DesignConvert.getF(9),
                            color: '#1D1D1D'
                        }}
                    >{this._countDown}s后重试</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                style={{
                    marginTop: DesignConvert.getHeight(14),
                    marginLeft: DesignConvert.getW(12),
                    backgroundColor: ''
                }}
                onPress={this._onPress}
            >
                <Text
                    style={{
                        color: '#7A61FF',
                        fontSize: DesignConvert.getF(14),
                    }}
                >获取验证码</Text>
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
                        marginTop: DesignConvert.getHeight(20),
                    }}
                    onPress={this._onPress}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['#A695FF', '#7A61FF']}
                        style={{
                            width: DesignConvert.getW(280),
                            height: DesignConvert.getH(44),
                            borderRadius: DesignConvert.getW(10),
                            // flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: DesignConvert.getF(16),
                            }}
                        >立即进入</Text>
                    </LinearGradient>
                </TouchableOpacity>

            );
        }

        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#D2D2D2', '#D2D2D2']}
                style={{
                    marginTop: DesignConvert.getHeight(21),
                    width: DesignConvert.getW(280),
                    height: DesignConvert.getH(44),
                    borderRadius: DesignConvert.getW(10),
                    // flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: DesignConvert.getF(16),
                    }}
                >登 录</Text>
            </LinearGradient>
        )
    }
}


export default class LoginView extends BaseView {

    constructor(props) {
        super(props);

        this._phoneNum = '';
        this._code = '';
        this._bAgree = true;
        this._switchPage = LOGIN_PRE;
    }

    componentDidMount() {
        super.componentDidMount();

        require('../../model/PermissionModel').checkAppBasePermission();
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

    _onAccountCode = () => {
        require("../../router/level1_router").showPasswordLoginView(LOGIN_BY_CODE);
    }

    _onAccountPsw = () => {
        require("../../router/level1_router").showPasswordLoginView(LOGIN_BY_PASSWORD);
    }

    _onAgree = () => {
        this._bAgree = !this._bAgree;
        this.forceUpdate();
    }

    _onOpenAgree = () => {
        //TODO:
        // alert('todo: 打开用户协议界面');
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
        return null;
        // if (Platform.OS === "ios") return null
        // return (
        //     <TouchableOpacity
        //         style={{
        //             marginTop: DesignConvert.getH(30),
        //             alignSelf: "center",
        //             // flexDirection: 'column',
        //             // justifyContent: 'flex-start',

        //         }}
        //         onPress={this._onWechat}
        //     >
        //         <Image
        //             style={{
        //                 width: DesignConvert.getW(35),
        //                 height: DesignConvert.getH(35),
        //             }}
        //             source={require('../../hardcode/skin_imgs/login').wx()}
        //         />
        //         {this._renderLastLogin(false)}
        //     </TouchableOpacity>
        // );
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
    _rednerFormInput(bIsMobile) {
        if (this._switchPage == LOGIN_PRE) {
            return (
                <View
                    style={{
                        width: DesignConvert.swidth,
                        alignItems: "center",
                        marginTop:DesignConvert.getH(303),
                        marginBottom:DesignConvert.getH(80),
                    }}>

                    <TouchableOpacity
                        onPress={this._onAccountCode}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={["#FFFFFF", "#FFFFFF"]}
                            style={{
                                width: DesignConvert.getW(180),
                                height: DesignConvert.getH(44),
                                borderRadius: DesignConvert.getW(41),
                                borderWidth:DesignConvert.getW(1.5),
                                borderColor:'#5F1271',
                                justifyContent: "center",
                                flexDirection: 'row',
                                alignItems: "center",
                            }}>

                            <Image
                                style={{
                                    width: DesignConvert.getW(21),
                                    height: DesignConvert.getH(21),
                                    resizeMode: 'contain',
                                }}
                                source={icon_phone()}
                            />
                            <Text
                                style={{
                                    color: "#8E7AFF",
                                    fontSize: DesignConvert.getF(13),
                                    marginStart: DesignConvert.getW(5),
                                }}>快速登陆</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this._onAccountPsw}>
                        <View
                            style={{
                                backgroundColor:'#FFFFFF',
                                width: DesignConvert.getW(180),
                                height: DesignConvert.getH(44),
                                marginTop:DesignConvert.getH(20),
                                borderRadius: DesignConvert.getW(41),
                                borderWidth:DesignConvert.getW(1.5),
                                borderColor:'#5F1271',
                                justifyContent: "center",
                                flexDirection: 'row',
                                alignItems: "center",
                            }}>
                            <Image
                                style={{
                                    width: DesignConvert.getW(21),
                                    height: DesignConvert.getH(21),
                                    resizeMode: 'contain',
                                }}
                                source={icon_lock()}
                            />
                            <Text
                                style={{
                                    color: "#8E7AFF",
                                    fontSize: DesignConvert.getF(13),
                                    marginStart: DesignConvert.getW(5),
                                }}>密码登陆</Text>
                        </View>
                    </TouchableOpacity>


                    {/* {this._renderWechat()} */}
                </View>
            )
        }
        if (this._switchPage == LOGIN_BY_CODE) {
            return (
                <View>
                    <View
                        style={{
                            marginTop: DesignConvert.getHeight(50),
                            width: DesignConvert.getW(280),
                            height: DesignConvert.getH(44),
                            backgroundColor: '#FAF9FF',
                            borderRadius: DesignConvert.getW(10),
                            flexDirection: 'row',
                            // justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                marginLeft: DesignConvert.getW(15),
                                color: '#AEAEAE',
                                fontSize: DesignConvert.getF(14),
                            }}
                        >+86</Text>
                        <Image
                            style={{
                                width: DesignConvert.getW(11),
                                height: DesignConvert.getH(6),
                                marginLeft: DesignConvert.getW(10),
                            }}
                            source={require('../../hardcode/skin_imgs/login').icon_letter()}
                        />
                        <View
                            style={{
                                marginLeft: DesignConvert.getW(16),
                                height: DesignConvert.getH(18),
                                width: DesignConvert.getW(1),
                                backgroundColor: '#6D6D6D',
                            }}
                        />

                        <TextInput
                            style={{
                                marginLeft: DesignConvert.getW(12),
                                fontSize: DesignConvert.getF(12),
                                width: DesignConvert.getW(265),
                            }}
                            maxLength={11}
                            keyboardType='numeric'
                            underlineColorAndroid="transparent"
                            placeholder="输入手机号"
                            placeholderTextColor="#D2D2D2"
                            returnKeyType='next'
                            onChangeText={this._onChangePhone}
                            selectionColor={THEME_COLOR}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: DesignConvert.getHeight(20),
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: DesignConvert.getW(200),
                                height: DesignConvert.getH(44),
                                backgroundColor: '#FAF9FF',
                                borderRadius: DesignConvert.getW(10),
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <TextInput
                                style={{
                                    marginLeft: DesignConvert.getW(15),
                                    width: DesignConvert.getW(265),
                                    fontSize: DesignConvert.getF(12),
                                }}
                                maxLength={6}
                                keyboardType='number-pad'
                                underlineColorAndroid="transparent"
                                placeholder="输入验证码"
                                placeholderTextColor="#D2D2D2"
                                returnKeyType='next'
                                onChangeText={this._onChangeCode}
                                selectionColor={THEME_COLOR}
                            />
                        </View>
                        <GetCodeButton
                            onPress={this._onGetCode}
                            enable={bIsMobile}
                        />
                    </View>
                </View>
            )
        }

        // 使用账号密码登陆的时候
        return (
            <View>
                <View
                    style={{
                        marginTop: DesignConvert.getHeight(50),
                        width: DesignConvert.getW(280),
                        height: DesignConvert.getH(44),
                        backgroundColor: '#FAF9FF',
                        borderRadius: DesignConvert.getW(10),
                        flexDirection: 'row',
                        // justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >

                    <TextInput
                        style={{
                            marginLeft: DesignConvert.getW(12),
                            width: DesignConvert.getW(265),
                            color: '#D2D2D2',
                            fontSize: DesignConvert.getF(12),
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
                </View>
                <View
                    style={{
                        marginTop: DesignConvert.getHeight(20),
                        width: DesignConvert.getW(280),
                        height: DesignConvert.getH(44),
                        backgroundColor: '#FAF9FF',
                        borderRadius: DesignConvert.getW(10),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <TextInput
                        style={{
                            marginLeft: DesignConvert.getW(15),
                            fontSize: DesignConvert.getF(12),
                            width: DesignConvert.getW(265),
                        }}
                        keyboardType={Platform.OS === "ios" ? "default" : 'number-pad'}
                        underlineColorAndroid="transparent"
                        placeholder="输入密码"
                        placeholderTextColor="#D2D2D2"
                        returnKeyType='next'
                        onChangeText={this._onChangeCode}
                        selectionColor={THEME_COLOR}
                    />
                </View>
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
                    marginTop: DesignConvert.getH(30),
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                <Text
                    style={{
                        color: '#666666',
                        fontSize: DesignConvert.getF(12)
                    }}
                    source={require('../../hardcode/skin_imgs/login').bg()}
                    resizeMode='contain'
                >
                    登陆即同意
                    </Text>
                <TouchableOpacity
                    onPress={this._onOpenAgree}
                >
                    <Text
                        style={{
                            color: THEME_COLOR,
                            fontSize: DesignConvert.getF(12)
                        }}
                        textDecorationLine="underline"
                    >《用户协议》</Text>
                </TouchableOpacity>
                <Text
                    style={{
                        color: '#666666',
                        fontSize: DesignConvert.getF(12)
                    }}
                >和</Text>
                <TouchableOpacity
                    onPress={this._onOpenAgree}
                >
                    <Text
                        style={{
                            color: THEME_COLOR,
                            fontSize: DesignConvert.getF(12)
                        }}
                        textDecorationLine="underline"
                    >《隐私权政策》</Text>
                </TouchableOpacity>
            </View>
        )
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
            <ImageBackground
                resizeMode="cover"
                source={bg_login()}
                style={{
                    width: DesignConvert.swidth,
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    paddingTop: Platform.OS === 'ios' ? -DesignConvert.statusBarHeight : 0,
                    alignItems: 'center',
                }}>

                <Text
                    style={{
                        width: DesignConvert.swidth,
                        fontSize: DesignConvert.getF(24),
                        color: '#FFFFFF',
                        paddingStart: DesignConvert.getW(20),
                        marginTop: DesignConvert.getH(40) + DesignConvert.statusBarHeight,
                    }}
                >Hello！</Text>

                <Text
                    style={{
                        width: DesignConvert.swidth,
                        fontSize: DesignConvert.getF(24),
                        color: '#FFFFFF',
                        paddingStart: DesignConvert.getW(20),
                        marginTop: DesignConvert.getH(8),
                    }}
                >欢迎加入恋恋星球</Text>

                <Text
                    style={{
                        width: DesignConvert.swidth,
                        paddingStart: DesignConvert.getW(20),
                        fontSize: DesignConvert.getF(14),
                        marginTop: DesignConvert.getH(8),
                        color: '#FFFFFF'
                    }}
                >
                    {`登陆即表示同意恋恋星球的`}

                    <Text
                        style={{
                            fontSize: DesignConvert.getF(14),
                            color: '#FFE8B1'
                        }}
                    >
                        {`《服务和隐私条款》`}
                    </Text>
                </Text>

                {/* <Image
                    style={{
                        width: DesignConvert.getW(125),
                        height: DesignConvert.getH(163),
                        marginTop: DesignConvert.getH(79),
                    }}
                    source={icon_login()}
                /> */}

                {/* <Text
                    style={{
                        color: '#1D1D1D',
                        fontSize: DesignConvert.getF(18),
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}
                >{this._switchPage == LOGIN_BY_CODE ? '登陆注册' : '密码登陆'}</Text> */}

                {this._rednerFormInput(bIsMobile)}

                {/* <LoginButton
                    onPress={this._onLogin}
                    enable={bIsMobile && bValidCode && this._bAgree}
                /> */}

                {/* {this._renderGuestLogin()} */}


                {/* {this._rednerAgreeInfo()} */}
                {/* {this._renderQQ()} */}


                {/* {this._renderAgree()} */}


            </ImageBackground>
        )
    }
}