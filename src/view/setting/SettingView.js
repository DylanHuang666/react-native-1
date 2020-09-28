/**
 * 设置界面
 */

'use strict';


import React, { PureComponent } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import UserInfoCache from '../../cache/UserInfoCache';
import { icon_next, ic_bind_phonum, set_pwd, set_pay_pwd, set_black_list, set_about, set_exit } from '../../hardcode/skin_imgs/main';
import DesignConvert from '../../utils/DesignConvert';
import BackTitleView from '../base/BackTitleView';
import BaseView from '../base/BaseView';
import ToastUtil from '../base/ToastUtil';
import AnchorIncomeModel from '../../model/anchorincome/AnchorIncomeModel';

class _Item extends PureComponent {

    render() {
        return (
            <TouchableOpacity
                style={[
                    {
                        width: DesignConvert.getW(315),
                        // height: DesignConvert.getH(49),
                        marginVertical:DesignConvert.getH(15),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    },
                    this.props.viewStyle
                ]}
                onPress={this.props.onPress}
            >

                <Image
                    style={{
                        width: DesignConvert.getW(23),
                        height: DesignConvert.getH(23),
                        marginRight:DesignConvert.getW(10),
                        resizeMode:'contain',
                    }}
                    source={this.props.icon}
                />

                <Text
                    style={{
                        flex:1,
                        fontSize: DesignConvert.getF(14),
                        color: '#121212',
                    }}
                >{this.props.text}</Text>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >

                    {this.props.customView}

                    {this.props.rightText ?
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(12),
                                color: (this.props.rightText=='已绑定'||this.props.rightText=='已认证')?'#949494':'#FF5D5D',
                                marginRight: DesignConvert.getW(10),
                            }}
                        >{this.props.rightText}</Text>
                        : null}

                    <Image
                        style={{
                            width: DesignConvert.getW(8),
                            height: DesignConvert.getH(14),
                        }}
                        source={require('../../hardcode/skin_imgs/ccc').c_set_right_arrow()}
                    />
                </View>



                {/* <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(0.5),
                        backgroundColor: '#F6F6F6',
                    }}
                /> */}
            </TouchableOpacity>
        )
    }
}

class _Item2 extends PureComponent {

    render() {
        return (
            <TouchableOpacity
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(66),
                    flexDirection: 'row',
                    // justifyContent: 'flex-start',
                    alignItems: 'center',
                }}

                onPress={this.props.onPress}
            >
                <Text
                    style={{
                        marginLeft: DesignConvert.getW(20),
                        fontSize: DesignConvert.getF(16),
                    }}
                >{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

class _ClearCacheItem extends PureComponent {

    render() {
        //todo
        const casheSize = '????????'

        return (
            <TouchableOpacity
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(52),
                    paddingStart: DesignConvert.getW(18),
                    flexDirection: 'row',
                    // justifyContent: 'flex-start',
                    alignItems: 'center',
                }}

                onPress={this.props.onPress}
            >

                <Image
                    style={{
                        width: DesignConvert.getW(17),
                        height: DesignConvert.getH(17),
                    }}
                    source={this.props.icon}
                />
                <Text
                    style={{
                        marginLeft: DesignConvert.getW(11),
                        fontSize: DesignConvert.getF(15),
                    }}
                >{this.props.text}</Text>

                <Text
                    style={{
                        position: 'absolute',
                        right: DesignConvert.getW(36),

                        fontSize: DesignConvert.getF(12),
                        color: '#333333',
                    }}
                >{casheSize}</Text>

                <Image
                    style={{
                        position: 'absolute',
                        right: DesignConvert.getW(20),
                        top: DesignConvert.getH(20),

                        width: DesignConvert.getW(6),
                        height: DesignConvert.getH(10),
                    }}
                    source={icon_next()}
                />
            </TouchableOpacity>
        )
    }
}


export default class SettingView extends BaseView {

    componentDidMount() {
        super.componentDidMount()

        require("../../model/anchorincome/AnchorIncomeModel").default.getUserCertificationStatus()
            .then(bool => {
                this._hasCertification = bool;
                this.forceUpdate();
            });
    }

    _onBlack = () => {
        //todo
        alert('todo: 查看黑名单');
    }

    _onSetPsw = () => {
        if (!UserInfoCache.phoneNumber) {
            ToastUtil.showCenter("请先绑定手机")
            return
        }
        require("../../router/level3_router").showUpdatePasswordView(require("../setting/UpdatePasswordView").updatePassword);
    }

    onResume() {
        this.forceUpdate();
    }

    _onSetPayPsw = () => {
        if (!UserInfoCache.phoneNumber) {
            ToastUtil.showCenter("请先绑定手机")
            return
        }
        require("../../router/level3_router").showUpdatePasswordView(require("../setting/UpdatePasswordView").updatePayPassword);
    }

    _onChangePhone = () => {
        require('../../model/setting/BindPhoneModel').checkBindPhoneAndShowView();
    }

    _onCertification = () => {
        require("../../router/level2_router").showCertificationPage();
    }

    _onClearCache = () => {
        //todo
        alert('todo: 清除缓存');
    }

    _onAbout = () => {
        require("../../router/level3_router").showAboutUsView();
    }

    _onExit = () => {
        require('../../model/LoginModel').default.logout();
    }

    _renderLine() {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(0.7),
                    backgroundColor: '#F1F1F1',
                }}
            />
        );
    }

    render() {
        // const isCert = AnchorIncomeModel.getUserCertificationStatus() === 2 
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                }}
            >
                <BackTitleView
                    titleText={'设置'}
                    titleTextStyle={{
                        color: 'black'
                    }}
                    onBack={this.popSelf}
                />

                <_Item
                    icon={ic_bind_phonum()}
                    text='手机绑定'
                    onPress={this._onChangePhone}
                    // rightText={UserInfoCache.phoneNumber ? `${UserInfoCache.phoneNumber}` : null}
                    rightText={UserInfoCache.phoneNumber?'已绑定':'去绑定'}
                />


                {/* <_Item
                    text='检查更新'
                    icon={set_update()}
                /> */}

                <_Item
                    icon={set_pwd()}
                    text='登录密码'
                    onPress={this._onSetPsw}
                    // rightText='修改'
                />



                <_Item
                    icon={ic_bind_phonum()}
                    text='实名认证'
                    onPress={this._onCertification}
                    rightText={this._hasCertification ===2 ? '已认证':'去认证'}
                    // customView={
                    //     this._hasCertification === 2 ?
                    //         <View
                    //             style={{
                    //                 flexDirection: 'row',
                    //                 alignItems: 'center',
                    //             }}
                    //         >

                    //             <Text
                    //                 style={{
                    //                     fontSize: DesignConvert.getF(13),
                    //                     color: '#1D1D1D',
                    //                     marginRight: DesignConvert.getW(5),
                    //                 }}
                    //             >{'已认证'}</Text>

                    //             <Image
                    //                 style={{
                    //                     width: DesignConvert.getW(16),
                    //                     height: DesignConvert.getH(16),
                    //                     marginRight: DesignConvert.getW(9.5)
                    //                 }}
                    //                 source={require('../../hardcode/skin_imgs/ccc').c_set_cer_suc()}
                    //             />
                    //         </View>
                    //         : <Text
                    //                 style={{
                    //                     color: '#1D1D1D',
                    //                     fontSize: DesignConvert.getF(13)
                    //                 }}
                    //         >去认证</Text>
                    // }
                />

                

                <_Item
                    icon={set_pay_pwd()}
                    text='设置支付密码'
                    onPress={this._onSetPayPsw}
                />

                {/* <_Item
                    icon={set_black_list()}
                    text='黑名单'
                    onPress={this._onBlack}
                /> */}

                {/* <_Item
                    text='清理内存'
                    onPress={this._onClearCache}
                    rightText='3.4M'
                    viewStyle={{
                        marginTop: DesignConvert.getH(15),
                    }}
                /> */}

                <_Item
                    icon={set_about()}
                    text='关于我们'
                    onPress={this._onAbout}
                />

                <_Item
                    icon={set_exit()}
                    text='退出登录'
                    onPress={this._onExit}/>

                {/* <TouchableOpacity
                    onPress={this._onExit}
                >
                    <LinearGradient
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#00DCFF', '#00D8C9']}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: DesignConvert.getW(240),
                            height: DesignConvert.getH(49),
                            borderRadius: DesignConvert.getW(25),
                            marginTop: DesignConvert.getH(60),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(16),
                                color: '#FFFFFF',
                            }}
                        >{'退出登陆'}</Text>
                    </LinearGradient>
                </TouchableOpacity> */}

            </View>
        )
    }
}