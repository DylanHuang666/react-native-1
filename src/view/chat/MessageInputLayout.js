/**
 * 消息输入
 */
'use strict';

import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, TextInput, Keyboard, PanResponder, CameraRoll, ImageBackground, Platform } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import DesignConvert from "../../utils/DesignConvert";
import Config from "../../configs/Config";
import ToastUtil from "../base/ToastUtil";
import StatusBarView from "../base/StatusBarView";
import BaseView from "../base/BaseView";
import { ic_emoji, ic_photo, ic_expand, ic_collapse, ic_voice, ic_keyboard, chat_luckymoney, chat_photo } from "../../hardcode/skin_imgs/chat";
import ImagePicker from 'react-native-image-crop-picker';
import { THEME_COLOR, THEME_COLORS } from "../../styles";
import EmojiView from "./EmojiView";

class _SendBtn extends PureComponent {

    render() {
        if (this.props.enable) {
            return (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 0
                    }}
                    onPress={this.props.onPress}>
                    <Image
                        source={require('../../hardcode/skin_imgs/chat').chat_send_btn()}
                        style={{
                            width: DesignConvert.getW(28),
                            height: DesignConvert.getH(28),
                            resizeMode: 'contain'

                        }}
                    />
                    {/* <LinearGradient
                        angle={90}
                        colors={THEME_COLORS}
                        style={{
                            width: DesignConvert.getW(54),
                            height: DesignConvert.getH(37),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: DesignConvert.getW(20),
                        }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: DesignConvert.getF(13),
                            }}>{this.props.text}</Text>
                    </LinearGradient> */}
                </TouchableOpacity>
            )
        } else {
            return (
                <LinearGradient
                    angle={90}
                    colors={['#ffffff00', '#ffffff00']}
                    style={{
                        position: 'absolute',
                        right: 0
                        // opacity: 0.5,
                        // width: DesignConvert.getW(54),
                        // height: DesignConvert.getH(37),
                        // justifyContent: "center",
                        // alignItems: "center",
                        // borderRadius: DesignConvert.getW(20),
                    }}>
                    <Image
                        source={require('../../hardcode/skin_imgs/chat').chat_send_btn()}
                        style={{
                            width: DesignConvert.getW(28),
                            height: DesignConvert.getH(28),
                            resizeMode: 'contain'
                        }}
                    />
                    {/* <Text
                        style={{
                            color: "white",
                            fontSize: DesignConvert.getF(13),
                        }}>{this.props.text}</Text> */}
                </LinearGradient>
            )
        }
    }
}

const [AUDIO, TEXT] = ["AUDIO", "TEXT"];
export default class MessageInputLayout extends PureComponent {
    constructor(props) {
        super(props);

        this._textMessgae = "";
        this.inputType = TEXT;

        this._isRecording = false;
        this._maxDy = DesignConvert.getH(70);
        this._panResponder = PanResponder.create({
            // 返回ture时，表示该组件愿意成为触摸事件的响应者，如触摸点击。默认返回false。
            onStartShouldSetPanResponder: () => true,
            // 返回ture时，表示该组件愿意成为触摸(滑屏)事件的响应者，如触摸滑屏，默认返回false。
            onMoveShouldSetPanResponder: () => true,
            // 与onStartShouldSetPanResponder相同，当此组件A里包含了子组件B也为触摸事件响应者时，若此时设为true，则父组件A优先级更高
            onStartShouldSetPanResponderCapture: () => true,
            // 与onMoveShouldSetPanResponder相同，当此组件A里包含了子组件B也为触摸事件响应者时，若此时设为true，则父组件A优先级更高
            onMoveShouldSetPanResponderCapture: () => true,
            // 手势刚开始触摸(即刚接触屏幕时)时，若响应成功则触发该事件
            onPanResponderGrant: (evt, gestureState) => {
                this._isRecording = true;
                this.forceUpdate();
            },
            // 手势刚开始触摸(即刚接触屏幕时)时，若响应失败则触发该事件，失败原因有可能是其它组件正在响应手势且不肯放权
            onResponderReject: (evt, gestureState) => { },
            // 手势滑动时触发该事件
            onPanResponderMove: (evt, gestureState) => {
                if (-gestureState.dy > this._maxDy) {
                    // console.log("外面啦", gestureState.dx);
                    this._cancelAudio = true;
                } else {
                    // console.log("录音", gestureState.dx);
                    this._cancelAudio = false;
                }
            },
            // 手势松开时触发该事件
            onPanResponderRelease: (evt, gestureState) => {
                if (this._cancelAudio) {
                    // console.log("取消发送");
                } else {
                    // console.log("发送");
                }
                this._isRecording = false;
                this.forceUpdate();
            },
            // 当其它组件需要响应手势时，此时为ture则表示本组件愿意放权给其它组件响应；为false时表示不放权，依然由本组件来响应手势事件
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            // 当组件响应放权后(即由其它组件拿到了手势响应权)触发该事件
            onPanResponderTerminate: (evt, gestureState) => { }
        });


        this._isShowMore = false;


        //显示EmojiView
        this._bShowEmojiView = false;
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _onChangeText = (s) => {
        this._textMessgae = s;
        this.forceUpdate();
    }

    _SendMessage = () => {
        if (!this.props.isGroup) {
            require("../../model/chat/ChatModel").sendC2CMessage(this.props.id, [[1, this._textMessgae]])
                .then(data => {
                    if (data) {
                        //发送成功
                        this._textMessgae = "";
                        this.forceUpdate();
                    } else {
                        //发送失败
                    }
                })
        } else {
            require("../../model/chat/ChatModel").sendGroupMessage(this.props.id, [[1, this._textMessgae]])
                .then(data => {
                    if (data) {
                        //发送成功
                        this._textMessgae = "";
                        this.forceUpdate();
                    } else {
                        //发送失败
                    }
                })
        }


    }

    _onFocus = () => {
        // if (Platform.OS == "ios") {
        //     return
        // }
        this._bShowEmojiView = false;
        this.forceUpdate();
    }

    _onAdioOrKeyBoardChangePress = () => {
        if (this.inputType == TEXT) {
            Keyboard.dismiss();
            this.inputType = AUDIO;
        } else {
            this.inputType = TEXT;
        }
        this.forceUpdate();
    }

    _onMoreChangePress = () => {
        Keyboard.dismiss();
        this._isShowMore = !this._isShowMore;
        this.forceUpdate();
    }

    _onLuckMoneyPress = async () => {
        Keyboard.dismiss();

        let res = await require('../../model/mine/MyWalletModel').default.getMoneyGivingList()
        if (res) {
            require('../../model/mine/MyWalletModel').default.onLiveSendGoldShell(this.props.id, this.props.nickName, this.props.headUrl)
        } else {
            ToastUtil.showCenter("请联系运营配置权限");
        }

        this.forceUpdate();
    }

    _openCameralRoll = async () => {
        let data = await require("../../model/PermissionModel").checkUploadPhotoPermission();
        if (data) {
            let image = await ImagePicker.openPicker({
                mediaType: "photo",
                width: 300,
                height: 400,
                cropping: false,
            });
            // console.log("找图片", image);
            // let res = await require("../../model/UploadModel").default.uploadImage(image.path);
            /**
             * {    cropRect: { y: 1, height: 215, width: 161, x: 24 },
                    modificationDate: '1588692919000',
                    width: 300,
                    size: 14801,
                    mime: 'image/jpeg',
                    height: 400,
                    path: 'file:///storage/emulated/0/Android/data/com.xstudio.tiaotiaotang2/files/Pictures/728735ad-0046-4b58-a54c-4ed6f34a6486.jpg' 
                }
             */
            let path = image.path.replace("file:///", "//");
            // console.log("新的路径", path);
            if (!this.props.isGroup) {
                require("../../model/chat/ChatModel").sendC2CMessage(this.props.id, [[2, path, 0]]);
            } else {
                require("../../model/chat/ChatModel").sendGroupMessage(this.props.id, [[2, path, 0]]);
            }
        }
    }

    _showEmoji = () => {

        Keyboard.dismiss();
        this._bShowEmojiView = !this._bShowEmojiView;
        this.forceUpdate();
    }

    _renderInput = () => {
        if (this.inputType == TEXT) {
            return (
                <View
                    style={{
                        width: DesignConvert.getW(234),
                        height: DesignConvert.getH(37),

                        flexDirection: "row",
                        alignItems: "center",

                        backgroundColor: "#F9F9F9",


                        paddingHorizontal: DesignConvert.getW(10),
                        marginLeft: DesignConvert.getW(15),

                        borderRadius: DesignConvert.getW(18)
                    }}>
                    <TextInput
                        numberOfLines={1}
                        style={{
                            flex: 1,
                            color: "#000000",
                            fontSize: DesignConvert.getF(13),
                            height: DesignConvert.getH(37),

                            marginRight: DesignConvert.getW(15),

                            paddingVertical: 0,
                            paddingHorizontal: DesignConvert.getW(10),

                        }}
                        value={this._textMessgae}
                        keyboardType="default"
                        returnKeyType="send"
                        underlineColorAndroid="transparent"
                        placeholder="请输入消息..."
                        placeholderTextColor="#CCCCCC"
                        onChangeText={this._onChangeText}
                        selectionColor={THEME_COLOR}
                        onFocus={this._onFocus}
                    // returnKeyType="send"
                    // onSubmitEditing={this._SendMessage}
                    ></TextInput>

                    <_SendBtn
                        text="发送"
                        onPress={this._SendMessage}
                        enable={this._textMessgae != ""}></_SendBtn>
                </View>
            )
        } else {
            return (
                <View
                    {...this._panResponder.panHandlers}
                    style={{
                        width: DesignConvert.getW(230),
                        height: DesignConvert.getW(36),
                        backgroundColor: this._isRecording ? "#CCCCCC" : "#F5F5F5",
                        borderRadius: DesignConvert.getW(19),
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        left: DesignConvert.getW(20),
                        top: DesignConvert.getH(11),
                    }}>
                    <Text
                        style={{
                            color: "#000000",
                            fontSize: DesignConvert.getF(12),
                        }}>{this._isRecording ? "松开 结束" : "按住 讲话"}</Text>
                </View>
            )
        }
    }

    _keyboardDidShow = () => {
        this._isShowMore = false;
        this.forceUpdate();
    }

    _keyboardDidHide = () => {
        //软键盘隐藏
    }

    _addEmoji = s => {
        this._textMessgae = this._textMessgae + s;
        this.forceUpdate();
    }
    render() {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,

                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        width: DesignConvert.swidth,
                        minHeight: DesignConvert.getH(49) + DesignConvert.addIpxBottomHeight() + DesignConvert.getH(20),

                        paddingBottom: DesignConvert.addIpxBottomHeight() + DesignConvert.getH(20),
                        paddingTop: DesignConvert.getH(10),

                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    {/* <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(1),
                        marginBottom: DesignConvert.getH(5),
                    }}></View> */}
                    <TouchableOpacity
                        onPress={this._onLuckMoneyPress}
                        style={{
                            // position: "absolute",
                            // left: DesignConvert.getW(52),
                            // top: DesignConvert.getH(11),
                            marginLeft: DesignConvert.getW(15)
                        }}>
                        <Image
                            source={chat_luckymoney()}
                            style={{
                                width: DesignConvert.getW(22),
                                height: DesignConvert.getH(22),
                            }}></Image>
                    </TouchableOpacity>
                    {this._renderInput()}
                    <TouchableOpacity
                        onPress={this._showEmoji}
                        style={{
                            marginHorizontal: DesignConvert.getW(15),
                        }}>
                        <Image
                            source={ic_emoji()}
                            style={{
                                width: DesignConvert.getW(22),
                                height: DesignConvert.getH(22),
                            }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._openCameralRoll}
                        style={{

                        }}>
                        <Image
                            source={chat_photo()}
                            style={{
                                width: DesignConvert.getW(22),
                                height: DesignConvert.getH(22),
                            }}></Image>
                    </TouchableOpacity>
                </View>
                {/* <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(44),
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: DesignConvert.addIpxBottomHeight(),
                        backgroundColor: "white",
                    }}>





                    <TouchableOpacity
                        onPress={this._onAdioOrKeyBoardChangePress}
                        style={{
                            marginLeft: DesignConvert.getW(12),
                            marginRight: DesignConvert.getW(12),
                        }}>
                        <Image
                            source={this.inputType == TEXT ? ic_voice() : ic_voice()}
                            style={{
                                width: DesignConvert.getW(36),
                                height: DesignConvert.getH(36),
                            }}></Image>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={this._onMoreChangePress}
                        style={{
                            position: "absolute",
                            left: DesignConvert.getW(20),
                            top: DesignConvert.getH(11),
                        }}>
                        <Image
                            source={this._isShowMore ? ic_expand() : ic_expand()}
                            style={{
                                width: DesignConvert.getW(36),
                                height: DesignConvert.getH(36),
                            }}></Image>
                    </TouchableOpacity>
                </View> */}

                {/* <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(90),
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#F5F5F5",
                        display: this._isShowMore ? "flex" : "none",
                    }}>

                    <TouchableOpacity
                        onPress={this._openCameralRoll}
                        style={{
                            marginLeft: DesignConvert.getW(15),
                            marginRight: DesignConvert.getW(37),
                        }}>
                        <Image
                            source={ic_photo()}
                            style={{
                                width: DesignConvert.getW(50),
                                height: DesignConvert.getH(50),
                            }}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this._showEmoji}
                        style={{
                            marginRight: DesignConvert.getW(37),
                        }}>
                        <Image
                            source={ic_emoji()}
                            style={{
                                width: DesignConvert.getW(50),
                                height: DesignConvert.getH(50),
                            }}></Image>
                    </TouchableOpacity>
                </View> */}
                { this._bShowEmojiView && <EmojiView
                    callBack={this._addEmoji}
                />}
                {/* <EmojiView
                    callBack={this._addEmoji}
                    containerStyle={{
                        display: this._bShowEmojiView ? "flex" : "none",
                    }}
                /> */}
            </View>
        )
    }
}