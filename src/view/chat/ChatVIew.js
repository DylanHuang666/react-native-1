/**
 * 消息List -> 会话
 */
'use strict';

import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import DesignConvert from "../../utils/DesignConvert";
import Config from "../../configs/Config";
import ToastUtil from "../base/ToastUtil";
import StatusBarView from "../base/StatusBarView";
import BaseView from "../base/BaseView";
import BackTitleView from "../base/BackTitleView";
import MessageLayout from "./MessageLayout";
import { ic_back_black } from "../../hardcode/skin_imgs/common";
import { ic_menu } from "../../hardcode/skin_imgs/user_info";
import { ic_setting, ic_attend_status, chat_titlebar_bg } from "../../hardcode/skin_imgs/chat";
import MessageInputLayout from "./MessageInputLayout";
import EmojiView from "./EmojiView";
import UserInfoCache from "../../cache/UserInfoCache";
import KeyboardAvoidingViewExt from '../base/KeyboardAvoidingViewExt';

class _TitleView extends PureComponent {

    render() {
        return (
            <View>
                <StatusBarView />

                <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(44),
                        backgroundColor: "white",
                        flexDirection: 'row',
                        justifyContent: "center",
                        alignItems: 'center',
                    }}
                >

                    <Text
                        numberOfLines={1}
                        style={{
                            fontWeight: 'bold',
                            color: '#101010',
                            fontSize: DesignConvert.getF(17),
                            maxWidth: DesignConvert.getW(200)
                        }}
                    >{this.props.titleText}</Text>

                    {/* <LinearGradient
                        colors={["#00DCFF", "#00D8C9"]}
                        style={{
                            width: DesignConvert.getW(48),
                            height: DesignConvert.getH(22),
                            borderRadius: DesignConvert.getW(11),
                            justifyContent: "center",
                            alignItems: "center",
                            display: this.props.isAttend ? "flex" : "none",
                        }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: DesignConvert.getF(11),
                            }}>+ 关注</Text>
                    </LinearGradient> */}


                    {/* <Image
                        style={{
                            width: DesignConvert.getW(42),
                            height: DesignConvert.getH(18),
                            marginLeft: DesignConvert.getW(7),
                            display: this.props.isAttend ? "flex" : "none",
                        }}
                        source={ic_attend_status()}
                    /> */}

                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: DesignConvert.getH(12),
                            minWidth: DesignConvert.getW(60),
                        }}
                        onPress={this.props.onBack}
                    >
                        <Image
                            style={{
                                width: DesignConvert.getW(20),
                                height: DesignConvert.getH(20),
                                marginLeft: DesignConvert.getW(20),
                            }}
                            source={ic_back_black()}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={{
                            height: DesignConvert.getH(44),
                            position: 'absolute',
                            right: 0,
                            minWidth: DesignConvert.getW(60),
                            alignItems: "center",
                            flexDirection: "row-reverse",

                        }}
                        onPress={this.props.onMenu}
                    >
                        <Image
                            style={{
                                width: DesignConvert.getW(23),
                                height: DesignConvert.getH(5),
                                marginRight: DesignConvert.getW(20),

                                tintColor: 'black',

                                display: this.props.isShowSetting ? "flex" : "none",

                                resizeMode: 'contain',
                            }}
                            source={ic_menu()}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export class BaseChatView extends PureComponent {
    constructor(props) {
        super(props);

        this._userInfo;
    }

    componentDidMount() {
        this._initData();
    }

    _initData() {
        //TODO:消息已读
        require("../../model/chat/ChatModel").setReadMsg(this.props.isGroup, this.props.id);
        if (!this.props.isGroup) {
            require("../../model/userinfo/UserInfoModel").default.getPersonPage(this.props.id)
                .then(data => {
                    this._userInfo = data;
                    // console.log("用户资料",  this._userInfo)
                    this.forceUpdate();
                })
        }
    }

    _renderInput = () => {
        if (this.props.id != UserInfoCache.officialGroupId && this.props.id != "10003") {
            return (
                <MessageInputLayout
                    isGroup={this.props.isGroup}
                    id={this.props.id}
                    headUrl={this.props.headUrl}
                    nickName={this.props.nickName}
                    isShowOverlay={this.props.isShowOverlay} />
            )
        } else {
            return (
                <View></View>
            )
        }
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}>

                <MessageLayout
                    isGroup={this.props.isGroup}
                    id={this.props.id}
                    isShowOverlay={this.props.isShowOverlay} ></MessageLayout>

                {this._renderInput()}

                {/* <EmojiView /> */}
            </View>
        )
    }
}

export default class ChatView extends BaseView {


    _onChatSettingPress = () => {
        require("../../router/level3_router").showChatSettingView(this.props.params.isGroup, this.props.params.id);
    }

    componentDidMount() {
        super.componentDidMount()
    }

    render() {
        return (
            <KeyboardAvoidingViewExt
                behavior="height"
                style={{
                    flex: 1,
                    backgroundColor: "white",
                }}>

                {/* <BackTitleView
                    titleText={this.props.params.nickName}
                    onBack={this.popSelf}
                    rightImg={this.props.params.id != UserInfoCache.officialGroupId ? ic_menu() : null}
                    onRightPress={this._onChatSettingPress}
                    rightImgStyle={{
                        width: DesignConvert.getW(24),
                        height: DesignConvert.getH(5),
                    }}
                /> */}

                <_TitleView
                    onBack={this.popSelf}
                    onMenu={this._onChatSettingPress}
                    titleText={this.props.params.nickName}
                    userID={this.props.params.id}
                    isAttend={this._userInfo ? this._userInfo.friendStatus == 1 || this._userInfo.friendStatus == 2 : false}
                    isShowSetting={this.props.params.id != UserInfoCache.officialGroupId}></_TitleView>

                <BaseChatView
                    id={this.props.params.id}
                    nickName={this.props.params.nickName}
                    // headUrl={Config.getHeadUrl(this._userId, data.logoTime, data.thirdIconurl)}
                    headUrl={this.props.params.headUrl}
                    isGroup={this.props.params.isGroup} />
            </KeyboardAvoidingViewExt>
        )
    }
}