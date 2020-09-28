/**
 * 房间设置
 */

'use strict';

import React, { PureComponent } from 'react';
import BaseView from "../base/BaseView";
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import DesignConvert from '../../utils/DesignConvert';
import BackTitleView from '../base/BackTitleView';
import RoomInfoCache from '../../cache/RoomInfoCache';
import { ic_room_movie_open, ic_room_movie_close, ic_next_black } from '../../hardcode/skin_imgs/room_more';
import { ERoomActionType, ERoomModify } from '../../hardcode/ERoom';
import ModelEvent from '../../utils/ModelEvent';
import { EVT_LOGIC_REFRESH_ROOM_MORE } from '../../hardcode/HLogicEvent';
import { THEME_COLOR } from '../../styles';
import ImagePicker from 'react-native-image-crop-picker';
import ToastUtil from '../base/ToastUtil';
import LinearGradient from 'react-native-linear-gradient';

class RoomTypeItem extends PureComponent {

    _onPress = () => {
        this.props.onPress(this.props.index, this.props.data);
    }

    render() {

        const textStyle = this.props.selected
            ? {
                color: '#FFFFFF',
                fontSize: DesignConvert.getF(13),
            }
            : {
                color: '#808080',
                fontSize: DesignConvert.getF(13),
            };

        return (
            <TouchableOpacity
                style={{
                    marginRight: DesignConvert.getW(18),
                    marginBottom: DesignConvert.getH(12.5),
                }}
                onPress={this._onPress}
            >
                <LinearGradient
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 0.5, y: 0 }}
                    colors={this.props.selected ? ["#8A50FC", "#F293FF"] : ["#0000001A", "#0000001A"]}
                    style={{
                        width: DesignConvert.getW(73),
                        height: DesignConvert.getH(24),
                        borderRadius: DesignConvert.getW(12),
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={textStyle}
                    >{this.props.data.type}</Text>
                </LinearGradient>
            </TouchableOpacity>

        );
    }
}


class RoomTypesListView extends PureComponent {

    _onPress = (index, data) => {
        this.props.onChangeRoomType(index, data);
    }

    _renderItems() {
        if (!this.props.datas || this.props.datas.length == 0) {
            return null;
        }

        const ret = [];

        for (let i = 0; i < this.props.datas.length; ++i) {
            ret.push(
                <RoomTypeItem
                    key={i}
                    selected={this.props.selectedIndex == i}
                    index={i}
                    data={this.props.datas[i]}
                    onPress={this._onPress}
                />
            );
        }
        return ret;
    }

    render() {
        return (
            <View
                style={{
                    marginTop: DesignConvert.getW(12),
                    marginLeft: DesignConvert.getW(15),
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}
            >
                {this._renderItems()}
            </View>
        )
    }
}


export default class RoomSetView extends BaseView {

    constructor(props) {
        super(props)

        this._myHead = null;
        this._roomTitle = RoomInfoCache.roomData.roomName
        this._needPwd = RoomInfoCache.roomData.needPassword
        this._roomPwd = RoomInfoCache.roomData.password

        this._iRoomTypeList = null;
        this._selectIndex = 0;
        this._selectData = null;

        require('../../model/user/UserInfoModel').default.getMyHeadUrl(Math.ceil(DesignConvert.toPixel(70)))
            .then(uri => {
                if (uri) {
                    this._myHead = uri;
                    this.forceUpdate();
                }
            });
    }

    componentDidMount() {
        super.componentDidMount()
        ModelEvent.addEvent(null, EVT_LOGIC_REFRESH_ROOM_MORE, this._refresh)

        require('../../model/room/ReadyToStartBroadcastingModel').default.getInfo()
            .then(data => {

                if (!data) return;
                this._iRoomTypeList = data.iRoomTypeList;
                this._selectIndex = data.selectIndex;
                this._selectData = this._iRoomTypeList[this._selectIndex];
                this.forceUpdate();
            });

    }

    componentWillUnmount() {
        super.componentWillUnmount()
        ModelEvent.removeEvent(null, EVT_LOGIC_REFRESH_ROOM_MORE, this._refresh)
    }


    _onChangeRoomIcon = async () => {
        let data = await require("../../model/PermissionModel").checkUploadPhotoPermission();
        if (data) {
            let image = await ImagePicker.openPicker({
                mediaType: "photo",
                width: 400,
                height: 400,
                cropping: true,
            });
            this._roomImagPath = image.path;
            this._myHead = { uri: image.path };
            this.forceUpdate();
        }
    }

    _refresh = () => {
        this.forceUpdate()
    }


    _onManager = () => {
        require("../../router/level3_router").showRoomManagerView(RoomInfoCache.roomId);
    }

    // _onBlack = () => {
    //     require('../../router/level3_router').showRoomBlackListView();
    // }

    _onOpenRoomMovie = () => {
        if (RoomInfoCache.isGiftAnimation) {
            //关闭
            require("../../router/level2_router").showNormInfoDialog("关闭后将看不到礼物特效，运作更加流畅，是否确认关闭礼物特效。",
                "确定", this._onCloseRoomMovie,
                "取消", undefined);
        } else {
            //打开
            require('../../model/room/RoomModel').default.action(ERoomActionType.OPEN_GIFT_ANIMATION, 0, '')
        }
    }

    _onCloseRoomMovie = () => {
        require('../../model/room/RoomModel').default.action(ERoomActionType.CLOSE_GIFT_ANIMATION, 0, '')
    }

    _onBlack = () => {
        require('../../router/level3_router').showRoomBlackListView();
    }

    _onSave = () => {

        if (!this._roomTitle) {
            ToastUtil.showCenter('请输入房间标题')
            return
        }

        if (this._roomPwd && this._roomPwd.length > 0 && this._roomPwd.length < 4) {
            ToastUtil.showCenter('请输入4位房间密码')
            return
        }

        if (this._roomImagPath) {
            require("../../model/UploadModel").default.uploadRoomImage(this._roomImagPath, RoomInfoCache.roomId);
            require('../../model/room/RoomModel').default.modifyRoom(ERoomModify.UPDATE_ROOM_LOGO, '1')
        }

        if (this._roomTitle) {
            require('../../model/room/RoomModel').default.modifyRoom(ERoomModify.UPDATE_ROOM_NAME, this._roomTitle)
        }

        if (this._roomPwd) {
            require('../../model/room/RoomModel').default.modifyRoom(ERoomModify.UPDATE_PASSWORD_KEY, this._roomPwd)
        } else {
            require('../../model/room/RoomModel').default.modifyRoom(ERoomModify.UPDATE_PASSWORD_KEY, '')
        }

        if (this._selectData) {
            require('../../model/room/RoomModel').default.modifyRoom(ERoomModify.UPDATE_ROOM_TYPE, this._selectData._roomType.keyid + '')
        }


        this.popSelf()
    }


    _onChangeRoomName = s => {
        this._roomTitle = s
    }

    _onChangPwd = s => {
        this._roomPwd = s
    }

    _rederCode = () => {
        if (!this._needPwd) {
            return null
        }
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    marginStart: DesignConvert.getW(30),
                }}
            >

                <View
                    style={{
                        position: 'absolute',
                        marginTop: DesignConvert.getH(2),
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}

                >
                    {[0, 1, 2, 3].map(item => {
                        return (
                            <View
                                style={{
                                    width: DesignConvert.getW(50),
                                    height: DesignConvert.getH(50),
                                    borderColor: '#CDCDCD',
                                    borderWidth: DesignConvert.getW(1),
                                    borderRadius: DesignConvert.getW(10),
                                    marginEnd: DesignConvert.getW(10),
                                    marginStart: DesignConvert.getW(10),
                                }}
                            ></View>
                        )
                    })}
                </View>


                <TextInput
                    maxLength={4}
                    textAlign="left"
                    style={{
                        height: DesignConvert.getH(50),
                        letterSpacing: Platform.OS === 'ios' ? DesignConvert.getW(60) : DesignConvert.getW(59),
                        color: 'black',
                        fontSize: DesignConvert.getF(18),
                        // selectionColor: 'red',
                        // backgroundColor: 'red',
                        padding: 0,
                        marginLeft: Platform.OS === 'ios' ? DesignConvert.getW(30) : 0
                    }}

                    selectionColor='#000000'
                    keyboardType='number-pad'
                    underlineColorAndroid="transparent"
                    returnKeyType='next'
                    onChangeText={this._onChangPwd}
                    defaultValue={this._roomPwd}
                // onSubmitEditing={this._onLogin}
                />

            </View>
        )
    }

    _onChangeRoomType = (index, data) => {
        if (this._selectIndex == index) {
            return;
        }

        this._selectIndex = index;
        this._selectData = data;
        this.forceUpdate();
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <BackTitleView
                    titleText={'房间设置'}
                    titleTextStyle={{
                        color: '#212121',
                        fontSize: DesignConvert.getF(18),
                        fontWeight: 'bold',
                    }}
                    rightText={'保存'}
                    rightTextStyle={{
                        color: '#8A50FC',
                        fontSize: DesignConvert.getF(15),
                        fontWeight: 'bold',
                    }}
                    onBack={this.popSelf}
                    onRightPress={this._onSave}
                />

                {/* <View
                    style={{
                        height: DesignConvert.getH(80),
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginStart: DesignConvert.getW(15),
                        marginEnd: DesignConvert.getW(15),
                    }}
                >

                    <Text>房间封面</Text>

                    <View
                        style={{
                            flex: 1,
                        }}
                    />

                    <TouchableOpacity
                        style={{
                            width: DesignConvert.getW(50),
                            height: DesignConvert.getH(50),
                        }}
                        onPress={this._onChangeRoomIcon}
                    >
                        <Image
                            style={{
                                width: DesignConvert.getW(50),
                                height: DesignConvert.getH(50),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: DesignConvert.getW(50),
                            }}
                            source={this._myHead}
                        >
                        </Image>

                    </TouchableOpacity>

                </View> 
                <View
                    style={{
                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(0.5),
                        backgroundColor: '#F6F6F6',
                    }}
                />*/}


                <View

                    style={{
                        height: DesignConvert.getH(50),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingStart: DesignConvert.getW(15),
                        paddingEnd: DesignConvert.getW(15)
                    }}
                >

                    <Text
                        style={{
                            fontSize: DesignConvert.getF(13),
                            color: '#808080',
                            marginEnd: DesignConvert.getW(30),
                        }}
                    >房间名字</Text>


                    <TextInput
                        style={{
                            flex: 1,
                            color: '#212121',
                            fontSize: DesignConvert.getF(14),
                            fontWeight: 'bold',
                            marginTop: DesignConvert.getH(2),
                        }}
                        maxLength={20}
                        underlineColorAndroid="transparent"
                        placeholder="请输入房间标题"
                        placeholderTextColor="#C0C0C0"
                        selectionColor={THEME_COLOR}
                        defaultValue={decodeURIComponent(this._roomTitle)}
                        onChangeText={this._onChangeRoomName}
                    />


                </View>

                <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(1),
                        backgroundColor: '#F6F6F6',
                    }}
                />

                <View
                    style={{
                        height: DesignConvert.getH(50),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingStart: DesignConvert.getW(15),
                        paddingEnd: DesignConvert.getW(15)
                    }}
                >
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(13),
                            color: '#808080',
                            marginEnd: DesignConvert.getW(30),
                        }}>房间密码</Text>

                    <TextInput
                        maxLength={4}
                        style={{
                            flex: 1,
                            height: DesignConvert.getH(50),
                            color: '#212121',
                            fontSize: DesignConvert.getF(14),
                            fontWeight: 'bold',
                        }}
                        selectionColor='#000000'
                        keyboardType='number-pad'
                        underlineColorAndroid="transparent"
                        placeholder='请设置房间密码'
                        placeholderTextColor='#C0C0C0'
                        returnKeyType='next'
                        onChangeText={this._onChangPwd}
                        defaultValue={this._roomPwd}
                    // onSubmitEditing={this._onLogin}
                    />

                </View>


                <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(1),
                        backgroundColor: '#F6F6F6',
                    }}
                />

                <TouchableOpacity
                    style={{
                        height: DesignConvert.getH(50),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingStart: DesignConvert.getW(15),
                        paddingEnd: DesignConvert.getW(15)
                    }}
                    onPress={this._onBlack}
                >
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(13),
                            color: '#808080'
                        }}>房间黑名单</Text>

                    <Image
                        style={{
                            width: DesignConvert.getW(9),
                            height: DesignConvert.getH(16),
                            resizeMode: 'contain',
                        }}
                        source={ic_next_black()}
                    />
                </TouchableOpacity>

                <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(1),
                        backgroundColor: '#F6F6F6',
                    }}
                />

                <View
                    style={{
                        height: DesignConvert.getH(50),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingStart: DesignConvert.getW(15),
                        paddingEnd: DesignConvert.getW(15)
                    }}
                >

                    <Text
                        style={{
                            fontSize: DesignConvert.getF(13),
                            color: '#808080',
                            marginEnd: DesignConvert.getW(30),
                        }}
                    >
                        {'房间类型'}
                    </Text>

                </View>

                <RoomTypesListView
                    datas={this._iRoomTypeList}
                    selectedIndex={this._selectIndex}
                    onChangeRoomType={this._onChangeRoomType}
                />
            </View >
        )
    }
}