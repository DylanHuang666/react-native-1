'use strict';

import React, { PureComponent } from "react";
import { View, Image, TouchableOpacity, Text, TextInput, Keyboard } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";
import { ic_chat } from "../../../../hardcode/skin_imgs/room";
import { ic_emoji, ic_photo } from "../../../../hardcode/skin_imgs/chat";
import LinearGradient from "react-native-linear-gradient";
import Config from "../../../../configs/Config";
import { THEME_COLOR } from "../../../../styles";


let _content = '';

export default class _RoomTypingItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
        // Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
    }

    componentWillUnmount() {
        // Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow)
        // Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide)
    }

    _onChangeText = (txt) => {
        _content = txt;
    }

    _clickEmoji = () => {
        //TODO:
        // alert('点击了表情')
    }

    _clickPicture = () => {
        //TODO:
        // alert('点击了图片')
    }

    _clickSend = () => {
        if (!_content) {
            return;
        }

        this._keyboardDidHide();

        require("../../../../model/chat/ChatModel").sendRoomPublicScreenText(_content);
        _content = "";
    }

    // _keyboardDidShow = (e) => {
    //     if (!e) return;
    //     if (!e.endCoordinates) return;

    //     const _keyboardHeight = e.endCoordinates.height;
    //     if (!_keyboardHeight) return;

    //     this._viewRef && this._viewRef.setNativeProps(
    //         {
    //             style: {
    //                 bottom: _keyboardHeight
    //             }
    //         }
    //     )
    // }

    _keyboardDidHide = () => {
        require('../../../../utils/ModelEvent').default.dispatchEntity(
            null,
            require('../../../../hardcode/HLogicEvent').EVT_LOGIC_UPDATE_ROOM_KEYBOARD_CHANGE,
            false
        )
    }

    render() {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.sheight,
                    position: 'absolute',
                    bottom: 0,
                }}>

                <TouchableOpacity
                    onPress={this._keyboardDidHide}
                    style={{
                        flex: 1,
                    }}></TouchableOpacity>
                <View
                    ref={ref => this._viewRef = ref}
                    style={{
                        width: DesignConvert.swidth,
                        backgroundColor: '#ECECEC',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={this._clickEmoji}
                        style={{
                            display: 'none',
                            marginLeft: DesignConvert.getW(5),
                            marginRight: DesignConvert.getW(5),
                        }}
                    >
                        <Image
                            style={{
                                width: DesignConvert.getW(30),
                                height: DesignConvert.getH(30),
                            }}
                            source={ic_emoji()}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this._clickPicture}
                        style={{
                            display: 'none',
                            marginLeft: DesignConvert.getW(5),
                            marginRight: DesignConvert.getW(5),
                        }}
                    >
                        <Image
                            style={{
                                width: DesignConvert.getW(30),
                                height: DesignConvert.getH(30),
                            }}
                            source={ic_photo()}
                        />
                    </TouchableOpacity>

                    <View
                        style={{
                            flex: 1,
                            marginStart: DesignConvert.getW(17),
                            marginEnd: DesignConvert.getW(17),
                            justifyContent: 'center'
                        }}
                    >
                        <TextInput
                            style={{
                                minHeight: DesignConvert.getH(50),
                                fontSize: DesignConvert.getF(14),
                                color: 'black',
                                padding: DesignConvert.getW(0),
                            }}
                            placeholder='和大家说点什么'
                            placeholderTextColor='#B9B9B9'
                            underlineColorAndroid="transparent"
                            returnKeyType='send'
                            defaultValue={_content}
                            autoFocus={true}
                            onChangeText={this._onChangeText}
                            selectionColor={THEME_COLOR}
                            onSubmitEditing={this._clickSend}
                        />
                    </View>

                    {/* <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#9758F8', '#C94CF8']}
                        style={{
                            borderRadius: DesignConvert.getW(9),
                            marginLeft: DesignConvert.getW(15),
                            marginRight: DesignConvert.getW(15),
                        }}
                    >
                        <TouchableOpacity
                            onPress={this._clickSend}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: DesignConvert.getW(60),
                                height: DesignConvert.getH(30),
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: DesignConvert.getF(12),
                                    color: 'white',
                                }}
                            >发送</Text>
                        </TouchableOpacity>
                    </LinearGradient> */}

                </View>
            </View>
        );
    }
}