
/**
 * 设置密码页面
 */

'use strict';

import React from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import Config from '../../configs/Config';
import DesignConvert from "../../utils/DesignConvert";
import StringUtil from '../../utils/StringUtil';
import { SubmitButton } from '../anchorincome/VerifyPayPasswordView';
import BackTitleView from "../base/BackTitleView";
import BaseView from "../base/BaseView";
import { THEME_COLOR } from "../../styles";
import LinearGradient from 'react-native-linear-gradient';
import { styles } from "./UpdatePasswordView";


export default class BindPhoneView extends BaseView {
    constructor(props) {
        super(props);

        //如果 0 没绑定手机号则直接绑定，绑定了得先 1 校验后再 2 绑定
        this._type = require("../../cache/UserInfoCache").default.phoneNumber ? 0 : 1;

        this._phoneNum = this._type == 0 ? "" : require("../../cache/UserInfoCache").default.phoneNumber;
        this._code = "";
        this._bChecked = true;

        this._submitEnable = false;

        this._countDown = 60;
        this._codeTimer;

        this._oldCode = "";
    }

    _onBackPress = () => {
        this.popSelf();
    }

    _checkSubmitEnable = () => {
        if (this._phoneNum != "" && this._code != "" && this._bChecked) {
            this._submitEnable = true;
        } else {
            this._submitEnable = false;
        }
    }

    _onChangePhoneNum = (s) => {
        this._phoneNum = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onChangeCode = (s) => {
        this._code = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onAgreePress = () => {
        this._bChecked = !this._bChecked;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onUserProtocolPress = () => {
        alert("H5");
    }


    _onGetCodePress = () => {
        if (!StringUtil.isMobile(this._phoneNum)) {
            require("../base/ToastUtil").default.showCenter("手机号码不正确");
            return
        }
        //校验原手机2  绑定新手机(没绑)8
        require("../../model/setting/BindPhoneModel").default.sendGetMsgCode(this._phoneNum, this._type == 1 ? 2 : 8)
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

        if (!StringUtil.isMobile(this._phoneNum)) {
            require("../base/ToastUtil").default.showCenter("手机号码不正确");
            return
        }
        if (this._type == 0) {
            //直接绑定新手机号
            require("../../model/setting/BindPhoneModel").default.bindMobile(this._phoneNum, this._code)
                .then(data => {
                    if (data) {
                        require("../../cache/UserInfoCache").default.setPhoneNumber(this._phoneNum);
                        require("../base/ToastUtil").default.showCenter("修改成功");
                        this.popSelf();
                    }
                })
        } else if (this._type == 1) {
            //校验原来手机号
            require("../../model/setting/BindPhoneModel").default.checkMatchSms(this._phoneNum, this._code)
                .then(data => {
                    if (data) {
                        this._oldCode = this._code;
                        this._phoneNum = "";
                        this._code = "";

                        this._type = 2;
                        this._checkSubmitEnable();
                        //重置获取验证码按钮
                        clearInterval(this._codeTimer);
                        this._countDown = 60;
                        this.forceUpdate();
                    }
                })
        } else {
            require("../../model/setting/BindPhoneModel").default.changeMobile(this._phoneNum, this._oldCode, this._code)
                .then(data => {
                    if (data) {
                        require("../../cache/UserInfoCache").default.setPhoneNumber(this._phoneNum);
                        require("../base/ToastUtil").default.showCenter("修改成功");
                        this.popSelf();
                    }
                })
        }

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
                                fontSize: DesignConvert.getF(11),
                            }}
                        >获取验证码</Text>
                    </View>
                )
            }
            return (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: DesignConvert.getW(30),
                        bottom: DesignConvert.getH(15),
                    }}
                    onPress={this._onGetCodePress}
                >
                    <LinearGradient
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
                    >
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: DesignConvert.getF(11),
                                textAlign: "center",
                            }}
                        >获取验证码</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )
        } else {
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
                            fontSize: DesignConvert.getF(11),
                        }}
                    >{`${this._countDown}s重试`}</Text>
                </View>
            )
        }
    }

    renderBindTipView = () => {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: this._next ? '#F9F9F9' : '#FFFFFF',
                }}
            >

                {this._next ?
                    <React.Fragment>
                        <Text
                            style={{
                                width: DesignConvert.swidth,
                                paddingLeft: DesignConvert.getW(30),
                                marginTop: DesignConvert.getH(15),

                                fontSize: DesignConvert.getF(13),
                                lineHeight: DesignConvert.getH(18.5),
                                color: '#212121',
                            }}
                        >
                            {`请输入手机:${this._phoneNum} 的验证码`}
                        </Text>

                        <View
                            style={{
                                width: DesignConvert.getW(345),
                                height: DesignConvert.getH(44),
                                backgroundColor: "#FFFFFF",
                                borderRadius: DesignConvert.getW(10),

                                marginTop: DesignConvert.getH(15),
                                paddingLeft: DesignConvert.getW(15),
                                paddingRight: DesignConvert.getW(15),

                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <TextInput
                                style={{
                                    flex: 1,
                                    color: "#212121",
                                    fontSize: DesignConvert.getF(13),
                                    lineHeight: DesignConvert.getH(18.5),
                                }}
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
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Image
                            source={require('../../hardcode/skin_imgs/ccc').ttq_phone_bind_suc()}
                            style={{
                                width: DesignConvert.getW(143),
                                height: DesignConvert.getH(119),
                                marginTop: DesignConvert.getH(50),
                            }}
                        />

                        <Text
                            style={{
                                fontSize: DesignConvert.getF(13),
                                color: '#212121',
                                lineHeight: DesignConvert.getH(18.5),
                                marginTop: DesignConvert.getH(20),
                                textAlign: "center",
                            }}
                        >
                            {`您已绑定手机号码:${this._phoneNum}\n点击下方换绑按钮可更换绑定手机号`}
                        </Text>
                    </React.Fragment>
                }


                <View
                    style={{
                        width: DesignConvert.swidth,

                        alignItems: 'center',

                        position: 'absolute',
                        bottom: DesignConvert.getH(30) + DesignConvert.addIpxBottomHeight(34),
                    }}
                >

                    <View
                        style={{
                            width: DesignConvert.swidth,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: DesignConvert.getH(12.5),
                        }}
                    >
                        <Image
                            source={require('../../hardcode/skin_imgs/ccc').ttq_phone_bind_warn()}
                            style={{
                                width: DesignConvert.getW(16),
                                height: DesignConvert.getH(14),

                                marginLeft: DesignConvert.getW(15),
                            }}
                        />
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(13),
                                color: '#BCBCBC',
                                marginLeft: DesignConvert.getW(5),
                            }}
                        >
                            {'说明'}
                        </Text>
                    </View>

                    <Text
                        style={{
                            width: DesignConvert.getW(345),
                            fontSize: DesignConvert.getF(11),
                            lineHeight: DesignConvert.getH(15),
                            color: '#5B5B5B',

                            marginBottom: DesignConvert.getH(40),
                        }}
                    >
                        {'无法解绑手机号；手机号一旦换绑，则所关联的实名认证手机号、权益兑换手机号将全部更换为新手机号'}
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            if (this._next) {
                                this._onSubmitPress()
                            } else {
                                this._next = true;
                                this.forceUpdate();
                            }
                        }}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={this._next ?
                                (this._submitEnable ? ['#8A50FC', '#F293FF'] : ['#F6F6F6', '#F6F6F6']) :
                                ['#8A50FC', '#F293FF']
                            }
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
                                {this._next ? '下一步' : '更换手机号码'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }

    renderBindPhoneView = () => {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: '#FFFFFF',
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

                        // marginTop: DesignConvert.getH(20),
                        // paddingLeft: DesignConvert.getW(15),
                        // paddingRight: DesignConvert.getW(15),

                        marginTop: DesignConvert.getH(5),
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

                <TouchableOpacity
                    onPress={this._onSubmitPress}
                    // style={{
                    //     position: 'absolute',
                    //     bottom: DesignConvert.getH(30) + DesignConvert.addIpxBottomHeight(34),
                    //     left: DesignConvert.getW(27.5),
                    // }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={this._submitEnable ? ['#8E7AFF', '#C17AFF'] : ['#8E7AFF55', '#C17AFF55']}
                        style={{
                            marginTop:DesignConvert.getH(50),
                            width: DesignConvert.getW(315),
                            height: DesignConvert.getH(50),
                            borderRadius: DesignConvert.getW(25),
                            borderWidth: DesignConvert.getW(1.5),
                            borderColor: '#5F1271',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: DesignConvert.getF(16),
                                textAlign: "center",
                            }}
                        >确认绑定</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }

    renderBindNewPhone = () => {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: '#F9F9F9',
                }}>

                <Text
                    style={{
                        width: DesignConvert.swidth,
                        paddingLeft: DesignConvert.getW(30),
                        marginTop: DesignConvert.getH(15),

                        fontSize: DesignConvert.getF(13),
                        lineHeight: DesignConvert.getH(18.5),
                        color: '#212121',
                    }}
                >
                    {`验证成功，请在下方输入新的手机号并填写验证码`}
                </Text>

                <View
                    style={{
                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(44),
                        backgroundColor: "#FFFFFF",
                        borderRadius: DesignConvert.getW(10),

                        marginTop: DesignConvert.getH(15),
                        paddingLeft: DesignConvert.getW(15),

                        justifyContent: 'center',
                    }}
                >

                    <TextInput
                        style={{
                            flex: 1,
                            color: "#212121",
                            fontSize: DesignConvert.getF(13),
                            lineHeight: DesignConvert.getH(18.5),
                        }}
                        value={this._phoneNum}
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        placeholder="请输入新的手机号"
                        placeholderTextColor="#E6E6E6"
                        returnKeyType='next'
                        onChangeText={this._onChangePhoneNum}
                        maxLength={11}
                        selectionColor={THEME_COLOR}
                    ></TextInput>

                </View>
                <View
                    style={{
                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(44),
                        backgroundColor: "#FFFFFF",
                        borderRadius: DesignConvert.getW(10),

                        marginTop: DesignConvert.getH(20),
                        paddingLeft: DesignConvert.getW(15),
                        paddingRight: DesignConvert.getW(15),

                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TextInput
                        style={{
                            flex: 1,
                            color: "#212121",
                            fontSize: DesignConvert.getF(13),
                            lineHeight: DesignConvert.getH(18.5),
                        }}
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

                <TouchableOpacity
                    onPress={this._onSubmitPress}
                    style={{
                        position: 'absolute',
                        bottom: DesignConvert.getH(30) + DesignConvert.addIpxBottomHeight(34),
                        left: DesignConvert.getW(27.5),
                    }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={this._submitEnable ? ['#8A50FC', '#F293FF'] : ['#E6E6E6', '#E6E6E6']}
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
                                color: "#FFFFFF",
                                fontSize: DesignConvert.getF(16),
                                textAlign: "center",
                            }}
                        >确认绑定</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }

    renderContentView = () => {
        switch (this._type) {
            case 0:
                return this.renderBindPhoneView()
            case 1:
                return this.renderBindTipView()
            case 2:
                return this.renderBindNewPhone()
        }
    }

    render() {

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                }}
            >

                <BackTitleView
                    onBack={this._onBackPress}
                    titleText={"绑定手机号"}
                    titleTextStyle={{
                        color: '#101010',
                        fontSize: DesignConvert.getF(17),
                    }}
                />

                {this.renderContentView()}

            </View>
        )
    }
}
