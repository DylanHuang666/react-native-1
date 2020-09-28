/**
 * 房间公告编辑界面
 */

'use strict';

import React from 'react';
import BaseView from "../base/BaseView";
import { View, Image, Text, TouchableOpacity, TextInput, findNodeHandle, Platform, Keyboard, ImageBackground, KeyboardAvoidingView } from "react-native";
import DesignConvert from '../../utils/DesignConvert';
import { ic_closed } from '../../hardcode/skin_imgs/mywallet';
import RoomInfoCache from '../../cache/RoomInfoCache';
import RoomModel from '../../model/room/RoomModel';
import { BlurView } from 'react-native-blur'
import LinearGradient from 'react-native-linear-gradient';
import Config from '../../configs/Config';
import { THEME_COLOR } from '../../styles';
import KeyboardAvoidingViewExt from '../base/KeyboardAvoidingViewExt';
import BackTitleView from '../base/BackTitleView';

export default class RoomEditNoticeView extends BaseView {

    constructor(props) {
        super(props);

        this._notice = RoomInfoCache.roomData ? RoomInfoCache.roomData.notic : '';

        this._viewRef = Platform.OS === 'ios' && RoomModel.getBgRef() && findNodeHandle(RoomModel.getBgRef());
        this._marginTop = 0;
    }

    _onChangeText = s => {
        this._notice = s;

        this.forceUpdate();
    }

    componentDidMount() {
        super.componentDidMount();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        if (Platform.OS == 'ios') {
            this._marginTop = DesignConvert.getH(50);
            this.forceUpdate();
        }
    }

    _keyboardDidHide = () => {
        //软键盘隐藏
        if (Platform.OS == 'ios') {
            this._marginTop = 0;
            this.forceUpdate();
        }

    }

    _onPublish = () => {
        this.popSelf();
        require('../../model/room/RoomModel').modifyNotice(this._notice);
    }

    render() {

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'F0F2F5',
                }}
            >

                <BackTitleView
                    onBack={this.popSelf}
                    titleText={'设置房间公告'}
                    rightText={'保存'}
                    rightTextStyle={{
                        color: THEME_COLOR
                    }}
                    onRightPress={this._onPublish}
                />

                <Text
                    style={{
                        color: '#BCBCBC',
                        fontSize: DesignConvert.getF(11),
                        margin: DesignConvert.getW(15),
                    }}
                >
                    {`提示：用户进入房间即可看到这段公告`}
                </Text>

                <TextInput
                    style={{
                        height: DesignConvert.getH(200),
                        fontSize: DesignConvert.getF(13),
                        textAlignVertical: 'top',
                        color: 'black',
                        marginStart: DesignConvert.getW(15),
                        marginEnd: DesignConvert.getW(15),
                        marginTop: DesignConvert.getH(6),
                    }}
                    multiline={true}
                    maxLength={150}
                    defaultValue={this._notice}
                    underlineColorAndroid="transparent"
                    placeholder='输入公告'
                    placeholderTextColor='#808080'
                    onChangeText={this._onChangeText}
                    selectionColor={THEME_COLOR}
                />


                <Text
                    style={{
                        position: 'absolute',
                        right: DesignConvert.getW(17),
                        bottom: DesignConvert.getH(12),
                        color: '#C8C8C8',
                        fontSize: DesignConvert.getF(10),
                    }}
                >最多可输入150个字</Text>
            </View>
        );

        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.sheight,
                    backgroundColor: "rgba(0,0,0,0)",
                    flexDirection: "row",
                    marginTop: this._marginTop,
                }}
            >

                <TouchableOpacity
                    onPress={this.popSelf}
                    style={{
                        width: DesignConvert.getW(117),
                        height: DesignConvert.sheight,
                    }}
                />

                <View style={{
                    width: DesignConvert.getW(258),
                    height: DesignConvert.sheight,
                    backgroundColor: "#00000066",
                }}>

                    {RoomModel.getBgRef() && Platform.OS === 'ios' ?
                        <BlurView
                            blurType='dark'
                            blurAmount={5}
                            viewRef={this._viewRef}
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                overflow: 'hidden',
                            }}
                        />
                        : null
                    }

                    <View
                        style={{
                            width: DesignConvert.getW(258),
                            marginTop: DesignConvert.getH(40),
                            marginBottom: DesignConvert.getH(18),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: DesignConvert.getF(16),
                            }}
                        >
                            {'公告'}
                        </Text>

                        <TouchableOpacity
                            onPress={this._onPublish}
                            style={{
                                position: 'absolute',
                                right: DesignConvert.getW(18),
                                top: DesignConvert.getH(1),
                            }}
                        >
                            <Text
                                style={{
                                    color: "#CFBAFF",
                                    fontSize: DesignConvert.getF(12),
                                }}
                            >
                                {'发布'}
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View
                        style={{
                            width: DesignConvert.getW(258),
                            height: DesignConvert.getH(0.5),
                            backgroundColor: '#F2F2F2',
                            opacity: 0.4,
                            marginBottom: DesignConvert.getH(20),
                        }}
                    />

                    <TextInput
                        style={{
                            marginLeft: DesignConvert.getW(19),
                            width: DesignConvert.getW(220),
                            fontSize: DesignConvert.getF(12),
                            lineHeight: DesignConvert.getH(18),
                            textAlignVertical: 'top',
                            color: '#FFFFFF',
                            height: DesignConvert.getH(360),
                        }}
                        multiline={true}
                        maxLength={200}
                        defaultValue={this._notice}
                        underlineColorAndroid="transparent"
                        placeholder="输入有趣的话题，可以提高活跃度哦~"
                        placeholderTextColor="#CCCCCC"
                        onChangeText={this._onChangeText}
                    />
                </View>
            </View>
        );
    }
}