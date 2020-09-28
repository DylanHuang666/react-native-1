/**
 * 排麦面板
 */

'use strict';

import React, { PureComponent } from "react";
import BaseView from "../base/BaseView";
import { View, TouchableOpacity, FlatList, Text, Image, Animated, Platform } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import RoomInfoCache from "../../cache/RoomInfoCache";
import { ERoomActionType, ERoomModify } from "../../hardcode/ERoom";
import Config from "../../configs/Config";
import LinearGradient from "react-native-linear-gradient";
import ToastUtil from "../base/ToastUtil";
import ModelEvent from "../../utils/ModelEvent";
import { EVT_UPDATE_ROOM_DATA } from "../../hardcode/HGlobalEvent";
import MicQueModel from "../../model/room/MicQueModel";
import MedalWidget from "../userinfo/MedalWidget";
import { ic_mic_null } from "../../hardcode/skin_imgs/default";
import { THEME_COLOR } from "../../styles";
import { ic_remove_mic_que } from "../../hardcode/skin_imgs/room";


export default class MicQueView extends BaseView {


    constructor(props) {
        super(props)

        this._roomMode = RoomInfoCache.roomData.roomMode //房间发言模式:0自由,1非自由
        this._micQues = RoomInfoCache.roomData.micQues
        this._micQueNum = this._micQues.length
        this._nullMicNum = RoomInfoCache.NullMicNum

        this._selfInMicQue = MicQueModel.selfInMicQue()//自己是否在排麦列表

    }

    componentDidMount() {
        super.componentDidMount();
        //监听房间数据变化，因为排麦数据是在房间数据里的
        ModelEvent.addEvent(null, EVT_UPDATE_ROOM_DATA, this._onRefresh)
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        ModelEvent.removeEvent(null, EVT_UPDATE_ROOM_DATA, this._onRefresh)
    }

    _onRefresh = () => {
        this._roomMode = RoomInfoCache.roomData.roomMode //房间发言模式:0自由,1非自由
        this._micQues = RoomInfoCache.roomData.micQues
        this._micQueNum = this._micQues.length
        this._selfInMicQue = MicQueModel.selfInMicQue()
        this.forceUpdate()
    }

    _onChangeRoomMode = () => {
        if (this._roomMode == 0) {
            require('../../model/room/RoomModel').default.modifyRoom(ERoomModify.UPDATE_ROOM_MODE_KEY, '1')
                .then(data => {
                    if (data) {
                        this._roomMode = 1
                        this.forceUpdate()
                    }
                })
        } else {
            require('../../model/room/RoomModel').default.modifyRoom(ERoomModify.UPDATE_ROOM_MODE_KEY, '0')
                .then(data => {
                    if (data) {
                        this._roomMode = 0
                        this.forceUpdate()
                    }
                })
        }
    }

    _removeQue = (userId) => {
        //移除
        require('../../model/room/MicQueModel').default.removeUser(userId)
    }

    _upMic = (userId) => {
        //抱上麦
        require('../../model/room/MicQueModel').default.upMicUser(userId)
    }

    _cancelMicQue = () => {
        //取消连麦
        require('../../model/room/MicQueModel').default.cancelMicQue()
    }

    _joinMicQue = () => {
        //加入连麦
        require('../../model/room/MicQueModel').default.joinMicQue()
    }

    _cleanMicQue = () => {
        //一键清空
        require('../../model/room/MicQueModel').default.cleanList()
    }

    _randomUpMic = () => {
        //随机上麦
        require('../../model/room/MicQueModel').default.randomUpMic()
    }

    _openAnim = () => {

    }


    _closeAnim = () => {

    }
    render() {

        const _height = 300
        const _bottom = DesignConvert.addIpxBottomHeight()

        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                }}
            >

                <TouchableOpacity
                    style={{
                        flex: 1,
                        width: DesignConvert.swidth,
                    }}
                    onPress={this.popSelf}
                />

                <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(_height),

                        borderTopLeftRadius: DesignConvert.getW(10),
                        borderTopRightRadius: DesignConvert.getW(10),
                        backgroundColor: '#FFFFFF',

                        alignItems: 'center'
                    }}>

                    <Text
                        style={{
                            position: 'absolute',
                            top: DesignConvert.getH(15),

                            color: '#212121',
                            fontSize: DesignConvert.getF(15),
                            fontWeight: 'bold'
                        }}
                    // >排麦({this._micQueNum})</Text>
                    >排麦列表</Text>
                    <Text
                        style={{
                            position: 'absolute',
                            top: DesignConvert.getH(17),
                            left: DesignConvert.getW(15),

                            fontSize: DesignConvert.getF(12),
                            color: '#949494',
                        }}
                    >还可以同时连麦{this._nullMicNum}人</Text>






                    {/* {RoomInfoCache.haveRoomPermiss  &&

                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: DesignConvert.getH(15),
                                    right: DesignConvert.getW(20),
                                    width: DesignConvert.getW(45),
                                    height: DesignConvert.getH(25),
                                    backgroundColor: this._roomMode == 0 ? '#D2D2D2' : '#A695FF',
                                    borderRadius: DesignConvert.getW(50),
                                }}
                                onPress={this._onChangeRoomMode}
                            >

                                {this._roomMode == 0 &&
                                    <View
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            width: DesignConvert.getW(25),
                                            height: DesignConvert.getH(25),
                                            backgroundColor: 'white',
                                            borderRadius: DesignConvert.getW(25),
                                        }}
                                    />
                                }

                                {this._roomMode == 1 &&
                                    <View
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                            width: DesignConvert.getW(25),
                                            height: DesignConvert.getH(25),
                                            backgroundColor: 'white',
                                            borderRadius: DesignConvert.getW(25),
                                        }}
                                    />}
                                <Text
                                    style={{
                                        marginEnd: DesignConvert.getW(18),
                                        color: '#A055FF'
                                    }}
                                >{this._roomMode == 0 ? '开启连麦' : '关闭连麦'}</Text>

                            </TouchableOpacity>

                        } */}




                    {this._micQues.length > 0 &&
                        <FlatList
                            style={{
                                flex: 1,
                                height: DesignConvert.getH(120),
                                marginTop: DesignConvert.getH(45)
                            }}
                            data={this._micQues}
                            renderItem={this._renderItem}
                        />
                    }


                    {!this._selfInMicQue && !RoomInfoCache.haveRoomPermiss &&
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                bottom: DesignConvert.getH(30),

                                // width: DesignConvert.getW(312),
                                // height: DesignConvert.getH(44),
                                // borderRadius: DesignConvert.getW(24),
                                // borderWidth: DesignConvert.getW(1.5),
                                // borderColor: '#121212',

                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={this._joinMicQue}
                        >

                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#8E7AFF', '#C17AFF']}
                                style={{
                                    width: DesignConvert.getW(312),
                                    height: DesignConvert.getH(44),
                                    borderRadius: DesignConvert.getW(24),
                                    borderWidth: DesignConvert.getW(1.5),
                                    borderColor: '#121212',

                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontSize: DesignConvert.getF(14),
                                        color: 'white'
                                    }}
                                >申请上麦</Text>
                            </LinearGradient>
                        </TouchableOpacity>}

                    {this._selfInMicQue && <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: DesignConvert.getH(30),

                            // width: DesignConvert.getW(312),
                            // height: DesignConvert.getH(44),
                            // borderRadius: DesignConvert.getW(24),
                            // borderWidth: DesignConvert.getW(1.5),
                            // borderColor: '#121212',

                            justifyContent: 'center',
                            alignItems: 'center',

                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={this._cancelMicQue}

                    >

                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#8E7AFF', '#C17AFF']}
                            style={{
                                width: DesignConvert.getW(312),
                                height: DesignConvert.getH(44),
                                borderRadius: DesignConvert.getW(24),
                                borderWidth: DesignConvert.getW(1.5),
                                borderColor: '#121212',


                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: DesignConvert.getF(14),
                                    color: 'white'
                                }}
                            >取消排麦</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    }



                    <View
                        style={{
                            // width: DesignConvert.swidth,
                            // height: DesignConvert.getH(36),
                            // marginBottom: _bottom,
                            // justifyContent: 'center',
                        }}>





                        {/* {RoomInfoCache.haveRoomPermiss && this._micQueNum > 0 &&

                            <LinearGradient
                                start={{ x: 0, y: 1 }}
                                end={{ x: 0, y: 0 }}
                                colors={['#FF658A', '#FFB4C6']}
                                style={{
                                    width: DesignConvert.getW(120),
                                    height: DesignConvert.getH(36),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: DesignConvert.getW(50),
                                    marginStart: DesignConvert.getW(32.5),
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: DesignConvert.getF(15),
                                        color: 'white',
                                    }}
                                    onPress={this._cleanMicQue}
                                >一键清空</Text>
                            </LinearGradient>

                        } */}

                        {/* {RoomInfoCache.haveRoomPermiss && this._micQueNum > 0
                            && <LinearGradient
                                start={{ x: 0, y: 1 }}
                                end={{ x: 0, y: 0 }}
                                colors={['#7A61FF', '#AB9BFF']}
                                style={{
                                    position: 'absolute',
                                    right: DesignConvert.getW(32),
                                    borderRadius: DesignConvert.getW(50),
                                    width: DesignConvert.getW(160),
                                    height: DesignConvert.getH(36),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{

                                        fontSize: DesignConvert.getF(13),
                                        textAlign: 'center',
                                        textAlignVertical: 'center',
                                        color: 'white'
                                    }}
                                    onPress={this._randomUpMic}
                                >随机上麦</Text>
                            </LinearGradient>
                        } */}

                    </View>


                </View>

            </View >
        )
    }

    _renderItem = ({ item, index }) => {

        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(60),
                }}
            >

                <View
                    style={{
                        width: DesignConvert.getW(39),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                    <Text
                        style={{

                            fontSize: DesignConvert.getF(15),
                            color: '#212121',
                        }}
                    >{index + 1}</Text>
                </View>

                <Image
                    style={{
                        borderRadius: DesignConvert.getW(50),
                        width: DesignConvert.getW(39),
                        height: DesignConvert.getH(39),
                    }}
                    source={{ uri: Config.getHeadUrl(item.userId, item.logoTime, item.thirdIconurl, 40) }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        height: DesignConvert.getH(39),
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginStart: DesignConvert.getW(7),
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: DesignConvert.getF(12),
                            color: '#212121',
                            textAlignVertical: 'center',
                            maxWidth: DesignConvert.getW(120),

                            marginRight: DesignConvert.getW(5)
                        }}
                    >{decodeURIComponent(item.nickName)}</Text>
                    {/* 
                    <Text
                        style={{
                            color: '#A3A3A3',
                            fontSize: DesignConvert.getF(11),
                        }}
                    >
                        {`ID：${item.userId}`}
                    </Text> */}

                    {/* <SexAgeWidget
                        sex={item.sex}
                        age={item.age}
                    /> */}

                    <MedalWidget
                        width={DesignConvert.getW(40)}
                        height={DesignConvert.getH(18)}
                        richLv={item.contributeLv}
                    // charmLv={20}
                    />

                </View>

                {/* <Text
                    style={{
                        position: 'absolute',
                        bottom: DesignConvert.getH(11),
                        left: DesignConvert.getW(87.5),
                        fontSize: DesignConvert.getF(11),
                        color: '#FFFFFF80',
                    }}
                >ID:{item.userId}</Text> */}

                {RoomInfoCache.haveRoomPermiss &&
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',

                            position: 'absolute',
                            right: DesignConvert.getW(83)
                        }}
                        onPress={() => {
                            this._removeQue(item.userId)
                        }}
                    >
                        <Image
                            style={{
                                width: DesignConvert.getW(27),
                                height: DesignConvert.getH(27),
                                resizeMode: 'contain',
                            }}
                            source={ic_remove_mic_que()}
                        />

                        {/* <Text
                            style={{
                                color: 'white',
                                fontSize: DesignConvert.getF(11),
                            }}
                        >移除</Text> */}
                    </TouchableOpacity>
                }

                {RoomInfoCache.haveRoomPermiss &&
                    <TouchableOpacity
                        style={{

                            position: 'absolute',
                            right: DesignConvert.getW(15),

                            borderWidth: DesignConvert.getW(1.5),
                            borderColor: '#5F1271',

                            width: DesignConvert.getW(50),
                            height: DesignConvert.getH(21),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: DesignConvert.getW(50),
                        }}
                        onPress={() => {
                            this._upMic(item.userId)
                        }}
                    >

                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#FFB300', '#FFB300']}
                            style={{
                                position: 'absolute',
                                width: DesignConvert.getW(65),
                                height: DesignConvert.getH(27),
                                borderRadius: DesignConvert.getW(50),

                                borderWidth: DesignConvert.getW(1.5),
                                borderColor: '#5F1271',
                            }}
                        />

                        <Text
                            style={{
                                fontSize: DesignConvert.getF(12),
                                color: 'white'
                            }}

                        >抱上麦</Text>
                    </TouchableOpacity>}

            </View >
        )
    }
}