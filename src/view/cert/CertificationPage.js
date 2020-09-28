/**
 * 实名认证 上传身份证
 */
'use strict';

import React, { PureComponent } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DesignConvert from '../../utils/DesignConvert';
import BackTitleView from '../base/BackTitleView';
import BaseView from '../base/BaseView';
import ImagePicker from 'react-native-image-crop-picker';
import ToastUtil from "../base/ToastUtil";
import StringUtil from "../../utils/StringUtil";
import UserInfoCache from "../../cache/UserInfoCache";



//审核状态  0:审核中， 1:认证不通过，2:认证通过 -1 还未实名认证
let _certificationStatus = -1;

class GetCodeButtons extends PureComponent {
    constructor(props) {
        super(props);

        this._countDown = 60;
    }

    _onPress = () => {
        this.props.onPress && this.props.onPress();
        if (!this.props.isMySelf) return
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
            );
        }

        if (this._countDown != 60) {
            return (
                <View
                    style={{
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
            );
        }

        return (
            <TouchableOpacity
                onPress={this._onPress}
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
    }
}

export default class CertificationPage extends BaseView {
    constructor(props) {
        super(props);


        this._realName = "";
        this._IDCard = "";

        this._fontPath = "";
        this._backPath = "";
        this._isAgree = false;
        this._phoneNum = '';
        this._certCode = '';

        this._step = 1;

        this._submitEnable = false;
        this._pictureEnable = false;

        this._resultText = ['系统审核中...', '系统审核通过', '系统审核未通过'];
        this._resultBottomText = ['预计24小时内审核完成\n如有疑问，请联系官方客服',
            '您的身份信息已审核通过',
            '您的身份信息审核失败\n请您重新上传信息'];
        this._resultImg = [require("../../hardcode/skin_imgs/ccc").ttq_cert_ing(),
        require("../../hardcode/skin_imgs/ccc").ttq_cert_suc(),
        require("../../hardcode/skin_imgs/ccc").ttq_cert_fail()];
    }

    componentDidMount() {
        super.componentDidMount();

        require("../../model/anchorincome/AnchorIncomeModel").default.getUserCertificationStatus()
            .then(status => {
                _certificationStatus = status;
                if (!this._isCompUnmount) {
                    this.forceUpdate();
                }
            });
    }

    componentWillUnmount() {
        super.componentWillUnmount();

        this._isCompUnmount = true;
    }

    _checkSubmitEnable = () => {
        // this._submitEnable = this._realName && this._IDCard && StringUtil.isMobile(this._phoneNum) && StringUtil.isIDCardNO(this._IDCard) && this._certCode.length === 6;
        this._submitEnable = this._realName && this._IDCard && StringUtil.isIDCardNO(this._IDCard);
    }

    _checkPictureEnable = () => {
        this._pictureEnable = this._fontPath !== '' && this._fontPath !== '';
        this.forceUpdate()
    }

    _onBackPress = () => {
        this.popSelf();
    }

    _onChangeRealName = (s) => {
        this._realName = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _changeAgree = () => {
        this._isAgree = !this._isAgree
        this._checkSubmitEnable();

        this.forceUpdate()
    }

    _toAgreePage = () => {
        alert('to du something')
    }

    _onChangeIDCard = (s) => {
        this._IDCard = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onChangePhone = (s) => {
        this._phoneNum = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onChangeCode = (s) => {
        this._certCode = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _clickFontPic = async () => {
        let data = await require("../../model/PermissionModel").checkUploadPhotoPermission();
        if (data) {
            let image = await ImagePicker.openPicker({
                mediaType: "photo",
                width: 400,
                height: 300,
                cropping: true,
            });
            // console.log("拍照", image);
            let res = await require("../../model/UploadModel").default.uploadCertificationImage(image.path, true);
            // console.log("上传身份证正面", res.url);
            this._fontPath = image.path;
            this._checkPictureEnable()
            this.forceUpdate();
        }
    }

    _clickBackPic = async () => {
        let data = await require("../../model/PermissionModel").checkUploadPhotoPermission();
        if (data) {
            let image = await ImagePicker.openPicker({
                mediaType: "photo",
                width: 400,
                height: 300,
                cropping: true,
            });
            // console.log("拍照", image);
            let res = await require("../../model/UploadModel").default.uploadCertificationImage(image.path, false);
            // console.log("上传身份证反面", res.url);
            this._backPath = image.path;
            this._checkPictureEnable()
            this.forceUpdate();
        }
    }

    _commitAudit = () => {
        if (!this._fontPath) {
            ToastUtil.showCenter("请上传正面身份证")
            return
        }
        if (!this._backPath) {
            ToastUtil.showCenter("请上传反面身份证")
            return
        }
        if (!this._realName) {
            ToastUtil.showCenter("请输入真实姓名")
            return
        }
        if (!this._IDCard) {
            ToastUtil.showCenter("请输入身份证号码")
            return
        }
        require("../../model/anchorincome/CertificationModel").default.saveUserCertification(this._IDCard, this._realName, this._certCode)
            .then(data => {
                if (data) {
                    ToastUtil.showCenter("提交成功")
                    // this.popSelf();
                    this._step = 3;
                    this.forceUpdate();
                }
            });
    }
    _onGetCode = () => {
        if (UserInfoCache.phoneNumber !== this._phoneNum) return ToastUtil.showCenter("请输入与注册手机号一致的号码")
        require('../../model/LoginModel').default.getSmsByPhoneLogin(this._phoneNum);
    }
    //更新页面
    // _getRealNameIDCard = (realName, IDCard) => {
    //     this.showInputView = false;
    //     this._realName = realName;
    //     this._IDCard = IDCard;
    //     this.forceUpdate();
    // }

    _renderNotice = () => {
        return (
            <View
                style={{
                    marginLeft: DesignConvert.getW(15),
                }}
            >
                <Text
                    style={{
                        fontSize: DesignConvert.getF(13),
                        color: '#C7C7C7',
                        marginTop: DesignConvert.getH(9),
                        marginBottom: DesignConvert.getH(5),
                    }}
                >

                </Text>
                <Text
                    style={{
                        color: '#D2D2D2',
                        fontSize: DesignConvert.getF(11)
                    }}
                > 1.该认证仅支持中国内地用户(不含港澳台地区)。</Text>
                <Text
                    style={{
                        color: '#D2D2D2',
                        fontSize: DesignConvert.getF(11)
                    }}
                >2.请确保填写的身份证信息真实并与本人一致。</Text>
                <Text
                    style={{
                        color: '#D2D2D2',
                        fontSize: DesignConvert.getF(11)
                    }}
                >3.您的身份信息仅用于身份验证，未经本人同意的情况下，不会用于其他用途。</Text>
                <Text
                    style={{
                        color: '#D2D2D2',
                        fontSize: DesignConvert.getF(11)
                    }}
                >4.一个身份信息最多只可对1个账号进行实名验证。</Text>
                <Text
                    style={{
                        color: '#D2D2D2',
                        fontSize: DesignConvert.getF(11)
                    }}
                >5.实名认证后不支持解除认证功能。</Text>
            </View>
        )
    }

    _renderAgree = () => {
        return (
            <View
                style={{
                    marginTop: DesignConvert.getH(11),
                    marginLeft: DesignConvert.getW(20),
                    flexDirection: 'row'
                }}
            >
                <TouchableOpacity
                    onPress={
                        this._changeAgree
                    }
                >
                    <Image
                        source={this._isAgree ? require('../../hardcode/skin_imgs/ccc').c_agree() : require('../../hardcode/skin_imgs/ccc').c_disagree()}
                        style={{
                            width: DesignConvert.getW(14),
                            height: DesignConvert.getH(14),
                            resizeMode: 'contain',
                            marginRight: DesignConvert.getW(5)
                        }}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: DesignConvert.getF(11),
                        color: '#B8B8B8FF'
                    }}
                >
                    我已同意{'  '}
                </Text>
                <TouchableOpacity
                    onPress={this._toAgreePage}
                >
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(11),
                            color: '#00D8C9FF'
                        }}
                    >
                        《恋恋星球直播协议》
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderStepView = () => {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    marginTop: DesignConvert.getH(30),
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        height: DesignConvert.getH(14),

                    }}
                >
                    <Image
                        source={require('../../hardcode/skin_imgs/ccc').ttq_cert_dot_line()}
                        style={{
                            width: DesignConvert.getW(262),
                            height: DesignConvert.getH(2),
                            alignSelf: "center",
                        }}
                    />

                    {
                        this._step == 1 && _certificationStatus == -1 ?
                            <Image
                                source={require('../../hardcode/skin_imgs/ccc').ttq_cert_now_step()}
                                style={{
                                    width: DesignConvert.getW(14),
                                    height: DesignConvert.getH(14),
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                }}
                            />
                            :
                            <View
                                style={{
                                    width: DesignConvert.getW(7),
                                    height: DesignConvert.getH(7),
                                    borderRadius: DesignConvert.getW(4),

                                    backgroundColor: '#8A50FC',

                                    position: 'absolute',
                                    left: 0,
                                    top: DesignConvert.getH(3.5),
                                }}
                            />
                    }

                    {
                        this._step == 2 && _certificationStatus == -1 ?
                            <Image
                                source={require('../../hardcode/skin_imgs/ccc').ttq_cert_now_step()}
                                style={{
                                    width: DesignConvert.getW(14),
                                    height: DesignConvert.getH(14),
                                    position: 'absolute',
                                    left: DesignConvert.getW(128),
                                    top: 0,
                                }}
                            />
                            :
                            <View
                                style={{
                                    width: DesignConvert.getW(7),
                                    height: DesignConvert.getH(7),
                                    borderRadius: DesignConvert.getW(4),

                                    backgroundColor: '#8A50FC',

                                    position: 'absolute',
                                    left: DesignConvert.getW(131),
                                    top: DesignConvert.getH(3.5),
                                }}
                            />
                    }

                    {
                        _certificationStatus != -1 ?
                            <Image
                                source={require('../../hardcode/skin_imgs/ccc').ttq_cert_now_step()}
                                style={{
                                    width: DesignConvert.getW(14),
                                    height: DesignConvert.getH(14),
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                }}
                            />
                            :
                            <View
                                style={{
                                    width: DesignConvert.getW(7),
                                    height: DesignConvert.getH(7),
                                    borderRadius: DesignConvert.getW(4),

                                    backgroundColor: '#8A50FC',

                                    position: 'absolute',
                                    right: 0,
                                    top: DesignConvert.getH(3.5),
                                }}
                            />
                    }
                </View>

                <View
                    style={{
                        width: DesignConvert.getW(308),
                        marginTop: DesignConvert.getH(8),

                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(13),
                            lineHeight: DesignConvert.getH(18.5),
                            color: this._step == 1 ? '#212121' : '#BCBCBC'
                        }}
                    >
                        {'信息填写'}
                    </Text>

                    <Text
                        style={{
                            fontSize: DesignConvert.getF(13),
                            lineHeight: DesignConvert.getH(18.5),
                            color: this._step == 2 ? '#212121' : '#BCBCBC'
                        }}
                    >
                        {'上传证件照'}
                    </Text>

                    <Text
                        style={{
                            fontSize: DesignConvert.getF(13),
                            lineHeight: DesignConvert.getH(18.5),
                            color: this._step == 3 ? '#212121' : '#BCBCBC'
                        }}
                    >
                        {'系统审核'}
                    </Text>
                </View>
            </View>
        )
    }

    _unCertificateView = () => {
        // const bIsMobile =  StringUtil.isMobile(this._phoneNum)
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#FFFFFF",
                    alignItems: 'center',
                }}>

                <BackTitleView
                    titleText={"实名认证"}
                    onBack={this._onBackPress}
                    titleTextStyle={{
                        color: '#212121',
                        fontSize: DesignConvert.getF(18),
                    }}
                />

                {/* {this.renderStepView()} */}

                {this._step == 1 ?
                    <View>
                        <View
                            style={{
                                marginTop: DesignConvert.getH(15),
                                padding: DesignConvert.getW(15),
                                // marginHorizontal:DesignConvert.getW(15),
                                // width:DesignConvert.getW(345),
                                borderWidth: DesignConvert.getW(1.5),
                                borderRadius: DesignConvert.getW(10),
                                backgroundColor: '#F0EEFE',
                                borderColor: '#5F1271',
                            }}>
                            <Text style={{
                                fontSize: DesignConvert.getF(14),
                                fontWeight: 'bold',
                                color: '#8E7AFF',
                            }}><Image
                                    style={{
                                        width: DesignConvert.getW(22),
                                        height: DesignConvert.getH(22),
                                        resizeMode: 'center',
                                    }}
                                    source={require('../../hardcode/skin_imgs/ccc').ttq_cert_tip()} />  温馨提示</Text>
                            <Text
                                numberOfLines={2}
                                style={{
                                    marginTop: DesignConvert.getH(10),
                                    fontSize: DesignConvert.getF(12),
                                    lineHeight: DesignConvert.getH(20),
                                    color: '#8E7AFF',
                                    maxWidth: DesignConvert.getW(315),
                                }}>请务必保证身份信息填写正确，并且与本人身份一致，认证不通过将无法使用充值功能</Text>
                        </View>

                        <View
                            style={{
                                width: DesignConvert.getW(345),
                                // height: DesignConvert.getH(234),
                                borderRadius: DesignConvert.getW(10),
                                backgroundColor: '#FFFFFF',

                                marginTop: DesignConvert.getH(15),
                                // marginLeft: DesignConvert.getW(15),
                                padding: DesignConvert.getW(15),
                                borderWidth: DesignConvert.getW(1.5),
                                borderColor: '#5F1271',
                            }}
                        >
                            {/* <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: DesignConvert.getW(315),
                                height: DesignConvert.getH(58.5),
                            }}
                        > */}

                            <Text
                                style={{
                                    width: DesignConvert.getW(82),
                                    fontSize: DesignConvert.getF(14),
                                    color: '#121212',
                                }}
                            >
                                {"姓名"}
                            </Text>

                            <TextInput
                                style={{
                                    // flex:1,
                                    color: "#121212",
                                    fontSize: DesignConvert.getF(14),
                                    marginTop: DesignConvert.getH(10),
                                    padding: 0,
                                }}
                                value={this._realName}
                                keyboardType="default"
                                underlineColorAndroid="transparent"
                                placeholder="请输入您的姓名"
                                placeholderTextColor="#CCCCCC"
                                returnKeyType='next'
                                onChangeText={this._onChangeRealName}
                            ></TextInput>

                            <View
                                style={{
                                    marginHorizontal: DesignConvert.getW(15),
                                    width: DesignConvert.getW(315),
                                    height: DesignConvert.getH(1),
                                    backgroundColor: '#F9F9F9',
                                    marginTop: DesignConvert.getH(5),
                                    // position: 'absolute',
                                    // bottom: 0,
                                }}
                            />
                            {/* </View> */}

                            {/* <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: DesignConvert.getW(315),
                                height: DesignConvert.getH(58.5),
                            }}
                        > */}
                            <Text
                                style={{
                                    width: DesignConvert.getW(82),
                                    fontSize: DesignConvert.getF(14),
                                    color: '#121212',
                                    marginTop: DesignConvert.getH(20),
                                }}
                            >
                                {"身份证"}
                            </Text>

                            <TextInput
                                style={{
                                    color: "#121212",
                                    fontSize: DesignConvert.getF(14),
                                    marginTop: DesignConvert.getH(10),
                                    padding: 0,
                                }}
                                value={this._IDCard}
                                keyboardType="default"
                                underlineColorAndroid="transparent"
                                placeholder="请输入您的身份证号码"
                                placeholderTextColor="#CCCCCC"
                                returnKeyType='next'
                                onChangeText={this._onChangeIDCard}
                            ></TextInput>

                            <View
                                style={{
                                    marginHorizontal: DesignConvert.getW(15),
                                    width: DesignConvert.getW(315),
                                    height: DesignConvert.getH(1),
                                    backgroundColor: '#F9F9F9',
                                    marginTop: DesignConvert.getH(5),
                                }}
                            />

                            <View style={{ height: DesignConvert.getH(30) }} />

                            {this._renderButton()}

                            {/* </View> */}

                            {/* <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: DesignConvert.getW(315),
                                height: DesignConvert.getH(58.5),
                            }}
                        >

                            <Text
                                style={{
                                    width: DesignConvert.getW(82),
                                    fontSize: DesignConvert.getF(13),
                                    lineHeight: DesignConvert.getH(18.5),
                                    color: '#212121',
                                }}
                            >
                                {"手机号码"}
                            </Text>

                            <TextInput
                                style={{
                                    flex: 1,
                                    color: "#212121",
                                    fontSize: DesignConvert.getF(13),
                                    lineHeight: DesignConvert.getH(18.5),
                                }}
                                maxLength={11}
                                value={this._phoneNum}
                                keyboardType="default"
                                underlineColorAndroid="transparent"
                                placeholder="请输入手机号"
                                placeholderTextColor="#BCBCBC"
                                returnKeyType='next'
                                onChangeText={this._onChangePhone}
                            ></TextInput>

                            <View
                                style={{
                                    width: DesignConvert.getW(315),
                                    height: DesignConvert.getH(1),
                                    backgroundColor: '#F6F6F6',
                                    position: 'absolute',
                                    bottom: 0,
                                }}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: DesignConvert.getW(315),
                                height: DesignConvert.getH(58.5),
                            }}
                        >

                            <Text
                                style={{
                                    width: DesignConvert.getW(82),
                                    fontSize: DesignConvert.getF(13),
                                    lineHeight: DesignConvert.getH(18.5),
                                    color: '#212121',
                                }}
                            >
                                {"手机验证码"}
                            </Text>

                            <TextInput
                                style={{
                                    flex: 1,
                                    color: "#212121",
                                    fontSize: DesignConvert.getF(13),
                                    lineHeight: DesignConvert.getH(18.5),
                                }}
                                maxLength={6}
                                value={this._certCode}
                                keyboardType="default"
                                underlineColorAndroid="transparent"
                                placeholder="请输入验证码"
                                placeholderTextColor="#BCBCBC"
                                returnKeyType='next'
                                onChangeText={this._onChangeCode}
                            ></TextInput>

                            <GetCodeButtons
                                onPress={this._onGetCode}
                                enable={StringUtil.isMobile(this._phoneNum)}
                                isMySelf={UserInfoCache.phoneNumber == this._phoneNum}
                            />

                        </View> */}
                        </View>

                    </View>
                    : null
                }

                {this._step == 2 ?
                    <React.Fragment>
                        <View
                            style={{
                                margin: DesignConvert.getW(15),
                                width: DesignConvert.getW(345),
                                height: DesignConvert.getH(32.5),
                                borderRadius: DesignConvert.getW(10),
                                borderWidth: DesignConvert.getW(1.5),
                                borderColor: '#5F1271',
                                backgroundColor: '#FFF2F2',
                                justifyContent: 'center',
                            }}>
                            <Text style={{
                                fontSize: DesignConvert.getF(12),
                                color: '#949494',
                                marginLeft: DesignConvert.getW(10),
                            }}>
                                <Image
                                    source={require('../../hardcode/skin_imgs/ccc').ttq_cert_tip2()}
                                    style={{
                                        width: DesignConvert.getW(16),
                                        height: DesignConvert.getH(16),
                                        resizeMode: 'contain',
                                    }} />
                                {'\t拍摄或上传身份证原件照片，确保照片完整清晰。'}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: DesignConvert.getW(345),
                                // height: DesignConvert.getH(120),
                                borderRadius: DesignConvert.getW(10),
                                borderWidth: DesignConvert.getW(1.5),
                                borderColor: '#5F1271',
                                backgroundColor: '#FFF2F2',
                                justifyContent: 'center',
                                alignItems: 'center',
                                // paddingLeft: DesignConvert.getW(30),
                                // paddingRight: DesignConvert.getW(29),
                            }}
                        >
                            {/* <View> */}
                            <Text
                                style={{
                                    marginTop: DesignConvert.getH(30),
                                    marginBottom: DesignConvert.getH(9),
                                    fontSize: DesignConvert.getF(14),
                                    fontWeight: 'bold',
                                    color: '#121212',
                                }}
                            >
                                {'上传身份证人像面'}
                            </Text>
                            {/* <Text
                                    style={{
                                        fontSize: DesignConvert.getF(11),
                                        lineHeight: DesignConvert.getH(15),
                                        color: '#BCBCBC',

                                        marginTop: DesignConvert.getH(5),
                                    }}
                                >
                                    {'上传您的身份证人像面'}
                                </Text> */}
                            {/* </View> */}

                            <TouchableOpacity
                                onPress={this._clickFontPic}
                            >
                                <Image
                                    source={!this._fontPath ? require('../../hardcode/skin_imgs/ccc').ttq_cert_font_pic() : { uri: this._fontPath }}
                                    style={{
                                        width: DesignConvert.getW(192),
                                        height: DesignConvert.getH(122),
                                        resizeMode: 'contain',
                                        borderRadius: DesignConvert.getW(10),
                                    }}
                                />
                                {
                                    this._fontPath ?
                                        <Image
                                            source={require('../../hardcode/skin_imgs/ccc').ttq_cert_checked()}
                                            style={{
                                                width: DesignConvert.getW(60),
                                                height: DesignConvert.getH(60),

                                                position: 'absolute',
                                                left: DesignConvert.getW(66),
                                                top: DesignConvert.getH(31),
                                            }}
                                        />
                                        : null
                                }
                            </TouchableOpacity>
                            {/* </View>

                        <View
                            style={{
                                width: DesignConvert.getW(345),
                                height: DesignConvert.getH(120),
                                borderRadius: DesignConvert.getW(20),
                                backgroundColor: '#FFFFFF',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',

                                marginTop: DesignConvert.getH(15),
                                alignSelf: "center",

                                paddingLeft: DesignConvert.getW(30),
                                paddingRight: DesignConvert.getW(29),
                            }}
                        > */}
                            {/* <View> */}
                            <Text
                                style={{
                                    marginTop: DesignConvert.getH(34),
                                    marginBottom: DesignConvert.getH(9),
                                    fontSize: DesignConvert.getF(14),
                                    fontWeight: 'bold',
                                    color: '#121212',
                                }}
                            >
                                {'上传身份证国徽面'}
                            </Text>
                            {/* <Text
                                    style={{
                                        fontSize: DesignConvert.getF(11),
                                        lineHeight: DesignConvert.getH(15),
                                        color: '#BCBCBC',

                                        marginTop: DesignConvert.getH(5),
                                    }}
                                >
                                    {'上传您的身份证国徽面'}
                                </Text>
                            </View> */}

                            <TouchableOpacity
                                style={{
                                    marginBottom: DesignConvert.getH(38.5),
                                }}
                                onPress={this._clickBackPic}
                            >
                                <Image
                                    source={!this._backPath ? require('../../hardcode/skin_imgs/ccc').ttq_cert_back_pic() : { uri: this._backPath }}
                                    style={{
                                        width: DesignConvert.getW(192),
                                        height: DesignConvert.getH(122),
                                        borderRadius: DesignConvert.getW(10),
                                        resizeMode: 'contain',
                                    }}
                                />
                                {
                                    this._backPath ?
                                        <Image
                                            source={require('../../hardcode/skin_imgs/ccc').ttq_cert_checked()}
                                            style={{
                                                width: DesignConvert.getW(60),
                                                height: DesignConvert.getH(60),

                                                position: 'absolute',
                                                left: DesignConvert.getW(66),
                                                top: DesignConvert.getH(31),
                                            }}
                                        />
                                        : null
                                }
                            </TouchableOpacity>
                        </View>

                    </React.Fragment>
                    : null
                }

                {this._step == 3 ?
                    this._renderResult()
                    // <View
                    //     style={styles._border}
                    // >
                    //     <Image
                    //         source={require("../../hardcode/skin_imgs/ccc").ttq_cert_ing()}
                    //         style={{
                    //             width: DesignConvert.getW(100),
                    //             height: DesignConvert.getH(94.96),
                    //             marginTop: DesignConvert.getH(40),
                    //             resizeMode: 'contain',
                    //         }}
                    //     />
                    //     <Text
                    //         style={{
                    //             fontSize: DesignConvert.getF(14),
                    //             fontWeight: 'bold',
                    //             color: '#121212',
                    //             marginTop: DesignConvert.getH(12),
                    //         }}
                    //     >
                    //         {'系统审核中...'}
                    //     </Text>
                    //     <Text
                    //         style={{
                    //             fontSize: DesignConvert.getF(11),
                    //             lineHeight: DesignConvert.getH(15),
                    //             color: '#949494',
                    //             marginTop: DesignConvert.getH(8),
                    //             textAlign: 'center',
                    //         }}
                    //     >
                    //         {'预计24小时内审核完成\n如有疑问，请联系官方客服'}
                    //     </Text>
                    // </View>
                    : null
                }

                {this._step == 1 || this._step == 2 ?
                    <View
                        style={{
                            position: 'absolute',
                            bottom: DesignConvert.getH(30) + DesignConvert.addIpxBottomHeight(34),
                        }}
                    >

                        {/* {this._step == 2 ?
                            <React.Fragment>
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
                                        alignSelf: "center",
                                        marginBottom: DesignConvert.getH(40),

                                        fontSize: DesignConvert.getF(11),
                                        lineHeight: DesignConvert.getH(15),
                                        color: '#5B5B5B',
                                    }}
                                >
                                    {'1.您的身份证信息用途仅为身份核实，请放心添加\n2.未成年信息不会通过官方认证\n3.一个身份证/手机号码最多为5个账号作实名认证'}
                                </Text>
                            </React.Fragment>
                            : null
                        } */}

                        {this._step != 1 && this._renderButton()}
                    </View>
                    : null
                }
            </View>
        )
    }

    _renderButton = () => {
        return (<TouchableOpacity
            // disabled={this._submitEnable}
            onPress={() => {
                if (this._step == 1) {
                    if (!this._submitEnable) return;

                    this._step = 2;
                    this.forceUpdate();
                    return;
                }
                if (this._step == 2) {
                    if (!this._pictureEnable) return;
                    _certificationStatus=0;
                    this._commitAudit();
                    return;
                }
            }}
            style={{
                alignItems: 'center'
            }}
        >
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={
                    this._step == 1 ? (this._submitEnable ? ['#8E7AFF', '#C17AFF'] : ['#C17AFF55', '#C17AFF55'])
                        : this._pictureEnable ? ['#8E7AFF', '#C17AFF'] : ['#C17AFF55', '#C17AFF55']
                }
                style={{
                    width: DesignConvert.getW(315),
                    height: DesignConvert.getH(50),
                    borderRadius: DesignConvert.getW(25),
                    borderWidth: DesignConvert.getW(1.5),
                    borderColor: '#5F1271',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        color: "#FFFFFF",
                        fontSize: DesignConvert.getF(16),
                        textAlign: "center",
                    }}
                >
                    {this._step == 1 ? '下一步' : '确认提交'}
                </Text>
            </LinearGradient>
        </TouchableOpacity>)
    }

    _renderResult = () => {
        return (<View
            style={styles._border}
        >
            <Image
                // source={require("../../hardcode/skin_imgs/ccc").ttq_cert_ing()}
                source={this.getImageByCertificationStatus()}
                style={{
                    width: DesignConvert.getW(100),
                    height: DesignConvert.getH(94.96),
                    marginTop: DesignConvert.getH(40),
                    resizeMode: 'contain',
                }}
            />
            <Text
                style={{
                    fontSize: DesignConvert.getF(14),
                    fontWeight: 'bold',
                    color: '#121212',
                    marginTop: DesignConvert.getH(12),
                }}
            >
                {this.getTextByCertificationStatus()}
            </Text>
            <Text
                style={{
                    fontSize: DesignConvert.getF(11),
                    lineHeight: DesignConvert.getH(15),
                    color: '#949494',
                    marginTop: DesignConvert.getH(8),
                    textAlign: 'center',
                }}
            >
                {this.getText2ByCertificationStatus()}
            </Text>
        </View>)
    }

    //审核状态  0:审核中， 1:认证不通过，2:认证通过
    getImageByCertificationStatus = () => {
        switch (_certificationStatus) {
            case 0:
                return require("../../hardcode/skin_imgs/ccc").ttq_cert_ing()
            case 1:
                return require("../../hardcode/skin_imgs/ccc").ttq_cert_fail()
            case 2:
                return require("../../hardcode/skin_imgs/ccc").ttq_cert_suc()
            default:
                return null;
        }
    }

    getTextByCertificationStatus = () => {
        switch (_certificationStatus) {
            case 0:
                return '系统审核中...'
            case 1:
                return '系统审核未通过'
            case 2:
                return '系统审核通过'
            default:
                return '';
        }
    }

    getText2ByCertificationStatus = () => {
        switch (_certificationStatus) {
            case 0:
                return '预计24小时内审核完成\n如有疑问，请联系官方客服'
            case 1:
                return '您的身份信息审核失败\n请您重新上传信息'
            case 2:
                return '您的身份信息已审核通过'
            default:
                return '';
        }
    }

    _centificationResult = () => {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#FFFFFF",
                    alignItems: "center",
                }}>

                <BackTitleView
                    titleText={"实名认证"}
                    onBack={this._onBackPress}
                />

                {/* {this.renderStepView()} */}
                {this._renderResult()}

                {/* <Image
                    source={this.getImageByCertificationStatus()}
                    style={{
                        width: _certificationStatus == 0 ? DesignConvert.getW(130) : DesignConvert.getW(143),
                        height: DesignConvert.getH(119),
                        marginTop: DesignConvert.getH(120),
                    }}
                />

                <Text
                    style={{
                        fontSize: DesignConvert.getF(13),
                        lineHeight: DesignConvert.getH(18.5),
                        color: '#212121',
                        marginTop: DesignConvert.getH(20),
                        textAlign: 'center',
                    }}
                >
                    {this.getTextByCertificationStatus()}
                </Text>

                <Text
                    style={{
                        fontSize: DesignConvert.getF(11),
                        lineHeight: DesignConvert.getH(15),
                        color: '#BCBCBC',
                        marginTop: DesignConvert.getH(8),
                        textAlign: 'center',
                    }}
                >
                    {this.getText2ByCertificationStatus()}
                </Text> */}

                {_certificationStatus == 1 || _certificationStatus == 2 ?
                    <TouchableOpacity
                        onPress={() => {
                            if (_certificationStatus == 1) {
                                _certificationStatus = -1;
                                this.forceUpdate();
                                return;
                            }
                            if (_certificationStatus == 2) {
                                this.popSelf()
                                return;
                            }
                        }}
                        style={{
                            position: 'absolute',
                            bottom: DesignConvert.getH(30) + DesignConvert.addIpxBottomHeight(34),
                            left: DesignConvert.getW(27.5),
                        }}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={
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
                                    color: "#FFFFFF",
                                    fontSize: DesignConvert.getF(16),
                                    textAlign: "center",
                                }}
                            >
                                {_certificationStatus == 1 ? '重新上传' : '确认'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    : null
                }

            </View>
        )
    }


    render() {
        if (_certificationStatus == -1) {
            return this._unCertificateView()
        } else {
            return this._centificationResult();
        }
    }
}

const styles = StyleSheet.create(
    {
        _border: {
            width: DesignConvert.getW(345),
            height: DesignConvert.getH(234),
            margin: DesignConvert.getW(15),
            borderRadius: DesignConvert.getW(10),
            borderWidth: DesignConvert.getW(1.5),
            borderColor: '#5F1271',
            alignItems: 'center',
        }
    }
)