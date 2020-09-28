
/**
 * 我的 -> 编辑资料
 */

'use strict';

import React, { PureComponent, Component } from "react";
import BaseView from "../base/BaseView";
import BackTitleView from "../base/BackTitleView";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal, ImageBackground, TextInput, CameraRoll, ScrollView, } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import Config from '../../configs/Config';
import StatusBarView from '../base/StatusBarView';
import ModelEvent from "../../utils/ModelEvent";
import { EVT_LOGIC_UPDATE_USER_INFO, } from "../../hardcode/HLogicEvent";
import ImagePicker from 'react-native-image-crop-picker';
import CryptoJS from 'crypto-js';
import { upload_photo } from "../../hardcode/skin_imgs/main";
import { photo_edit } from "../../hardcode/skin_imgs/mine";
import DatePicker from 'react-native-date-picker';
import { birthday, slogan, area, nickName } from "./UserInfoEditDetailView";
import ToastUtil from "../base/ToastUtil";
import KeyboardAvoidingViewExt from "../base/KeyboardAvoidingViewExt";

class _Item extends PureComponent {

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[{
                    // width: DesignConvert.swidth,
                    // minHeight: DesignConvert.getH(65),
                    flexDirection: "row",
                    alignItems: "center",
                    // paddingHorizontal: DesignConvert.getW(15),
                    marginVertical: DesignConvert.getH(15),
                }, this.props.style]}>

                <Text
                    numberOfLines={1}
                    style={{
                        flex: 1,
                        color: "#212121",
                        fontSize: DesignConvert.getF(14),
                    }}>{this.props.title}</Text>

                <Text
                    numberOfLines={1}
                    style={{
                        color: this.props.textColor || "#949494FF",
                        fontSize: DesignConvert.getF(14),
                        marginRight: DesignConvert.getW(10),
                        // textAlign: "left"
                    }}>{this.props.content}</Text>

                <Image
                    source={require("../../hardcode/skin_imgs/main").ic_next_white()}
                    style={{
                        width: DesignConvert.getW(8),
                        height: DesignConvert.getH(14),
                        display: !this.props.showArrowRight ? "flex" : "none",
                        tintColor: "#999999",
                    }}></Image>

                {/* <View
                    style={{
                        position: 'absolute',
                        width: DesignConvert.getW(343),
                        height: DesignConvert.getH(0.5),
                        backgroundColor: '#F8F8F8',
                        left: DesignConvert.getW(15),
                        bottom: 0,
                    }}
                /> */}

            </TouchableOpacity>
        )
    }
}

export default class UserInfoEditView extends BaseView {
    constructor(props) {
        super(props);

        this._HeaderPath = "";
        this._photoId = "";
        this._slogan = "";
    }

    _onBackPress = () => {
        this.popSelf();
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }

    _onSavePress = () => {
        //TODO:保存
        require("../../model/user_info_edit/UserInfoEditModel").default.modifyUserInfo(this._nickName, this._sex, this._birthday, this._HeaderPath != "", this._photoId, this._position, this._slogan, 190, this._origNickName != this._nickName)
            .then(data => {
                if (data) {
                    ModelEvent.dispatchEntity(null, EVT_LOGIC_UPDATE_USER_INFO, null);
                    ToastUtil.showCenter("修改成功");
                    this.popSelf();
                }
            })

    }

    _onNickNamePress = () => {
        require("../../router/level3_router").showUserInfoEditDetailView(nickName, this._nickName, this._setNickName);
    }


    _setNickName = (s) => {
        this._nickName = s;
        this.forceUpdate();
    }

    _showeEditSexDialog = () => {
        require("../../router/level3_router").showeEditSexDialog(this._sex, this._onSexPress);
    }

    _onSexPress = (i) => {
        // if (this._sex == 1) {
        //     this._sex = 2;
        // } else {
        //     this._sex = 1;
        // }
        this._sex = i
        this.forceUpdate();
    }

    _onAreaPress = () => {
        require("../../router/level3_router").showUserInfoEditDetailView(area, this._position, this._setArea);
    }

    _setArea = (s) => {
        this._position = s;
        this.forceUpdate();
    }

    _onBirthdayPress = () => {
        require("../../router/level3_router").showDatePickerDialog(this._setBirthday, "YYYY-MM-DD");
        // require("../../router/level3_router").showUserInfoEditDetailView(birthday, this._birthday, this._setBirthday);
    }

    _setBirthday = (s) => {
        this._birthday = s;
        this.forceUpdate();
    }


    _onSloganPress = () => {
        require("../../router/level3_router").showUserInfoEditDetailView(slogan, this._slogan, this._setSlogan);
    }

    _setSlogan = (s) => {
        this._slogan = s;
        this.forceUpdate();
    }

    _openCameralRoll = async () => {
        let data = await require("../../model/PermissionModel").checkUploadPhotoPermission();
        if (data) {
            let image = await ImagePicker.openPicker({
                mediaType: "photo",
                width: 400,
                height: 400,
                cropping: true,
            });
            // console.log("找图片", image);
            //TODO:这个是通过图片本地路径拿到MD5，需要引进库
            this._photoId = new Date().getTime() + "";
            let res = await require("../../model/UploadModel").default.uploadImage(image.path);
            // console.log("上传图片", res.url);
            this._HeaderPath = image.path;
            this.forceUpdate();
        }
    }

    _initData() {
        require("../../model/user_info_edit/UserInfoEditModel").default.getPersonPage()
            .then(data => {
                // console.log("编辑资料", data);
                this._userId = data.userId;
                this._origNickName = decodeURI(data.nickName);
                this._nickName = this._origNickName;
                this._avatar = require("../../configs/Config").default.getHeadUrl(data.userId, data.logoTime, data.thirdIconurl);
                this._sex = data.sex;
                this._position = data.position;
                this._birthday = data.birthday;
                this._slogan = data.slogan;
                this.forceUpdate();
            });
    }

    componentDidMount() {
        super.componentDidMount();

        this._initData();
    }

    renderLine = () => {
        return (
            <View
                style={{
                    width: DesignConvert.getW(345),
                    height: DesignConvert.getH(0.5),
                    marginLeft: DesignConvert.getW(15),
                    backgroundColor: '#F1F1F1',
                }}
            />
        )
    }

    render() {

        return (
            <KeyboardAvoidingViewExt
                behavior="height"
                style={{
                    flex: 1,
                    backgroundColor: "white",
                }}>
                <View

                    style={{
                        flex: 1,
                        backgroundColor: "white",
                    }}>

                    <BackTitleView
                        onBack={this._onBackPress}
                        titleText="编辑资料"
                        // rightText="完成"
                        onRightPress={this._onSavePress} />

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: 'center',
                        }}
                        style={{
                            flex: 1,
                            backgroundColor: "white",
                        }}>

                        {/* <TouchableOpacity
                            onPress={this._openCameralRoll}
                            style={{
                                width: DesignConvert.swidth,
                                height: DesignConvert.getH(74),
                                flexDirection: "row",
                                alignItems: "center",
                                paddingHorizontal: DesignConvert.getW(15),
                            }}>

                            <Text
                                style={{
                                    flex: 1,
                                    color: "#B8B8B8",
                                    fontSize: DesignConvert.getF(13),
                                }}>{"头像"}</Text>

                            <Image
                                source={this._HeaderPath ? { uri: this._HeaderPath } : this._avatar ? { uri: this._avatar } : upload_photo()}
                                style={{
                                    width: DesignConvert.getW(44),
                                    height: DesignConvert.getH(44),
                                    borderRadius: DesignConvert.getW(44),
                                    marginRight: DesignConvert.getW(10),
                                }}></Image>

                            <Image
                                source={require("../../hardcode/skin_imgs/main").ic_next_white()}
                                style={{
                                    width: DesignConvert.getW(8),
                                    height: DesignConvert.getH(14),
                                    display: !this.props.showArrowRight ? "flex" : "none",
                                    tintColor: "#999999",
                                }}></Image>

                            <View
                                style={{
                                    position: 'absolute',
                                    width: DesignConvert.getW(343),
                                    height: DesignConvert.getH(0.5),
                                    backgroundColor: '#F8F8F8',
                                    left: DesignConvert.getW(29),
                                    bottom: 0,
                                }}
                            />

                        </TouchableOpacity> */}

                        <TouchableOpacity
                            style={{
                                width: DesignConvert.getW(100),
                                height: DesignConvert.getH(100),
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: DesignConvert.getH(15),
                                // marginLeft: DesignConvert.getH(143),
                                // marginBottom: DesignConvert.getH(15),
                            }}
                            onPress={this._openCameralRoll}
                        >
                            <Image
                                source={this._HeaderPath ? { uri: this._HeaderPath } : this._avatar ? { uri: this._avatar } : upload_photo()}
                                style={{
                                    width: DesignConvert.getW(100),
                                    height: DesignConvert.getH(100),
                                    borderRadius: DesignConvert.getW(10),
                                }}></Image>
                            <Text
                                style={{
                                    position: 'absolute',
                                    top: DesignConvert.getH(3),
                                    left: DesignConvert.getW(3),
                                    width: DesignConvert.getW(30),
                                    height: DesignConvert.getH(16),
                                    borderRadius: DesignConvert.getW(5),
                                    backgroundColor: '#12121277',
                                    color: '#FFFFFF',
                                    fontSize: DesignConvert.getF(10),
                                    textAlign: 'center',
                                }}>头像</Text>

                            {/* <Image
                                source={photo_edit()}
                                style={{
                                    width: DesignConvert.getW(15),
                                    height: DesignConvert.getH(15),
                                    position: "absolute",
                                    right: DesignConvert.getH(4),
                                    bottom: DesignConvert.getH(4),
                                }}></Image> */}
                        </TouchableOpacity>

                        {/* {this.renderLine()}

                        <Text
                            style={{
                                width: DesignConvert.swidth,
                                marginTop: DesignConvert.getH(19),
                                marginBottom: DesignConvert.getH(19),
                                marginLeft: DesignConvert.getH(15),
                                color: "#212121",
                                fontSize: DesignConvert.getF(13),
                                fontWeight: "bold",
                            }}>昵称</Text>

                        <TextInput
                            style={{
                                width: DesignConvert.swidth,
                                height: DesignConvert.getH(50),
                                color: "#6D6D6D",
                                fontSize: DesignConvert.getF(15),
                                paddingLeft: DesignConvert.getW(15),
                                paddingRight: DesignConvert.getW(15),
                                backgroundColor: "white",
                            }}
                            selectionColor="#7C2AF8"
                            value={this._nickName}
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            placeholder={"支持表情、符号，12字符以内"}
                            placeholderTextColor="#CCCCCC"
                            returnKeyType="next"
                            onChangeText={this._setNickName}
                            maxLength={12}
                        ></TextInput>


                        {this.renderLine()}

                        <Text
                            style={{
                                width: DesignConvert.swidth,
                                marginTop: DesignConvert.getH(19),
                                marginBottom: DesignConvert.getH(19),
                                marginLeft: DesignConvert.getH(15),
                                color: "#212121",
                                fontSize: DesignConvert.getF(13),
                                fontWeight: "bold",
                            }}>出生日期</Text>

                        <TouchableOpacity
                            onPress={this._onBirthdayPress}>
                            <Text
                                style={{
                                    width: DesignConvert.swidth,
                                    marginBottom: DesignConvert.getH(15),
                                    marginLeft: DesignConvert.getH(15),
                                    color: "#6D6D6D",
                                    fontSize: DesignConvert.getF(15),
                                }}>{this._birthday}</Text>
                        </TouchableOpacity>

                        {this.renderLine()}




                        <Text
                            style={{
                                width: DesignConvert.swidth,
                                marginTop: DesignConvert.getH(19),
                                marginBottom: DesignConvert.getH(19),
                                marginLeft: DesignConvert.getH(15),
                                color: "#212121",
                                fontSize: DesignConvert.getF(13),
                                fontWeight: "bold",
                            }}>性别</Text>

                        <TouchableOpacity
                            onPress={this._onSexPress}>
                            <Text
                                style={{
                                    width: DesignConvert.swidth,
                                    marginBottom: DesignConvert.getH(15),
                                    marginLeft: DesignConvert.getH(15),
                                    color: "#6D6D6D",
                                    fontSize: DesignConvert.getF(15),
                                }}>{this._sex == 1 ? "男" : "女"}</Text>
                        </TouchableOpacity>

                        {this.renderLine()}



                        <Text
                            style={{
                                width: DesignConvert.swidth,
                                marginTop: DesignConvert.getH(19),
                                marginBottom: DesignConvert.getH(19),
                                marginLeft: DesignConvert.getH(15),
                                color: "#212121",
                                fontSize: DesignConvert.getF(13),
                                fontWeight: "bold",
                            }}>个性签名</Text>


                        <TextInput
                            style={{
                                width: DesignConvert.swidth,
                                height: DesignConvert.getH(120),
                                color: "#6D6D6D",
                                fontSize: DesignConvert.getF(15),
                                paddingLeft: DesignConvert.getW(15),
                                paddingRight: DesignConvert.getW(15),
                                backgroundColor: "white",

                            }}
                            selectionColor="#7C2AF8"
                            textAlignVertical="top"
                            multiline
                            value={this._slogan}
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            placeholder={"个性签名会让更多人喜欢你哦~"}
                            placeholderTextColor="#CCCCCC"
                            returnKeyType="next"
                            onChangeText={this._setSlogan}
                            maxLength={40}
                        ></TextInput>

                        {this.renderLine()}

                        <Text
                            style={{
                                color: "#CCCCCC",
                                fontSize: DesignConvert.getF(13),
                                marginTop: DesignConvert.getW(10),
                                paddingLeft: DesignConvert.getW(15),
                                marginBottom: DesignConvert.getH(120),
                            }}
                        >{`${this._slogan.length}/40`}</Text> */}

                        <View
                            style={{
                                marginTop: DesignConvert.getH(30),
                                width: DesignConvert.getW(345),
                                // height:DesignConvert.getH(210),
                                borderRadius: DesignConvert.getW(10),
                                borderWidth: DesignConvert.getW(1.5),
                                borderColor: '#5F1271FF',
                                paddingVertical: DesignConvert.getH(5),
                                paddingLeft: DesignConvert.getW(20),
                                paddingRight: DesignConvert.getW(15),
                            }}>
                            <_Item
                                title="昵称"
                                content={this._nickName}
                                onPress={this._onNickNamePress}></_Item>

                            <_Item
                                title="生日"
                                content={this._birthday}
                                onPress={this._onBirthdayPress}></_Item>


                            <_Item
                                title="性别"
                                content={this._sex == 1 ? "男" : "女"}
                                onPress={this._showeEditSexDialog}></_Item>


                            {/* <_Item
                    title="地区"
                    content={this._position}
                    onPress={this._onAreaPress}></_Item> */}





                            <_Item
                                title="个性签名(选填)"
                                content={this._slogan || '这个人太懒了'}
                                // textColor={this._slogan ? '#333333' : '#999999'}
                                onPress={this._onSloganPress}
                            ></_Item>
                        </View>

                        <TouchableOpacity
                            onPress={this._onSavePress}
                            style={{
                                marginTop: DesignConvert.getH(50),
                                alignItems: 'center',

                            }}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#8E7AFFFF', '#C17AFFFF']}
                                style={{
                                    width: DesignConvert.getW(315),
                                    height: DesignConvert.getH(50),
                                    borderRadius: DesignConvert.getW(25),
                                    borderWidth: DesignConvert.getW(1.5),
                                    borderColor: '#5F1271FF',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text style={{
                                    fontSize: DesignConvert.getF(14),
                                    color: '#FFFFFFFF',
                                }}>保存</Text></LinearGradient>
                        </TouchableOpacity>


                    </ScrollView>
                </View>
            </KeyboardAvoidingViewExt>
        )
    }
}