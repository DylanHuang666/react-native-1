/**
 * 退出直播间
 */

'use strict';

import React, { PureComponent } from 'react';
import BaseView from "../base/BaseView";
import { View, ImageBackground, Image, Text, TouchableOpacity } from "react-native";
import DesignConvert from '../../utils/DesignConvert';
import { ic_room_set, ic_pack_room, ic_min_room, ic_report } from '../../hardcode/skin_imgs/room';
import RoomInfoCache from '../../cache/RoomInfoCache';
import { ic_exit_room, } from '../../hardcode/skin_imgs/room_more';

export default class ExitRoomView extends BaseView {

    constructor(props) {
        super(props);
        this._showReport = false;
    }

    _onExit = () => {
        this.popSelf();

        const fnCloseCallerView = this.props.params.fnCloseCallerView;
        require('../../model/room/RoomModel').default.leave();
        fnCloseCallerView && fnCloseCallerView();
    }

    _onMinify = () => {
        this.popSelf();

        const fnCloseCallerView = this.props.params.fnCloseCallerView;
        fnCloseCallerView && fnCloseCallerView();
    }

    _onRoomSet = () => {
        this.popSelf()
        require('../../router/level3_router').oepnRoomSetView()
    }

    _onShowReport = () => {
        this.popSelf()
        require("../../router/level3_router").showReportDialog(RoomInfoCache.roomId);
    }

    _renderItem = (press, img, text) => {
        return (<TouchableOpacity
            onPress={press}
            style={{
                flexDirection: 'row',
            }}>
            <Image
                source={img}
                style={{
                    width: DesignConvert.getW(18),
                    height: DesignConvert.getH(18),
                }} />
            <Text
                style={{
                    marginLeft: DesignConvert.getW(8),
                    fontSize: DesignConvert.getF(12),
                    color: '#121212',
                }}>{text}</Text>
        </TouchableOpacity>)
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={this.popSelf}
            >

                <View
                    style={{
                        position: 'absolute',
                        top: DesignConvert.getH(47.5) + DesignConvert.statusBarHeight,
                        right: DesignConvert.getW(10),
                        width: DesignConvert.getW(106),
                        height: DesignConvert.getH(94),
                        backgroundColor: 'white',
                        borderRadius: DesignConvert.getW(10),
                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#121212',
                        flexDirection: 'column',
                        // alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: DesignConvert.getW(10),
                    }}
                >

                    {this._renderItem(this._onShowReport, ic_report(), '举报')}
                    {this._renderItem(this._onMinify, ic_min_room(), '最小化退出')}
                    {this._renderItem(this._onExit, ic_exit_room(), '退出房间')}

                    {/* <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: DesignConvert.getH(15),
                            paddingBottom: DesignConvert.getH(26),
                            paddingStart: DesignConvert.getW(20),
                            paddingEnd: DesignConvert.getW(20),
                            marginStart: DesignConvert.getW(20),
                            marginEnd: DesignConvert.getW(20),

                        }}
                    > */}

                    {/* {RoomInfoCache.haveRoomPermiss &&
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    marginEnd: DesignConvert.getW(50),
                                }}
                                onPress={this._onRoomSet}
                            >

                                <Image
                                    style={{
                                        width: DesignConvert.getW(40),
                                        height: DesignConvert.getH(40),
                                    }}
                                    source={ic_room_set()}
                                />

                                <Text
                                    style={{
                                        color: '#1D1D1D',
                                        fontSize: DesignConvert.getF(11),
                                        marginTop: DesignConvert.getH(10),
                                    }}
                                >房间设置</Text>

                            </TouchableOpacity>

                        } */}

                    {/* 
                        <TouchableOpacity
                            style={{
                                flex: 1,
                            }}
                            onPress={this._onExit}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: '#F5F5F5',
                                    borderBottomLeftRadius: DesignConvert.getW(10),

                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#1A1A1A',
                                        fontSize: DesignConvert.getF(14),
                                    }}
                                >退出</Text>
                            </View>
                        </TouchableOpacity> */}

                    {/* <TouchableOpacity
                            style={{
                                flex: 1,
                                alignItems: 'center',
                            }}
                            onPress={this._onMinify}
                        >

                            <Image
                                style={{
                                    width: DesignConvert.getW(40),
                                    height: DesignConvert.getH(40),
                                }}
                                source={ic_pack_room()}
                            />

                            <Text
                                style={{
                                    color: '#1D1D1D',
                                    fontSize: DesignConvert.getF(11),
                                    marginTop: DesignConvert.getH(10),
                                }}
                            >收起房间</Text>

                        </TouchableOpacity> */}


                </View>


                {/* <Text
                        style={{
                            padding: DesignConvert.getH(10),
                            fontSize: DesignConvert.getF(16),
                            color: '#7A61FF'
                        }}
                    >取消</Text> */}

                {/* </View> */}



            </TouchableOpacity>
        );
    }
}