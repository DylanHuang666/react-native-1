/*
 * @Author: 
 * @Date: 2020-09-10 15:46:27
 * @LastEditors: your name
 * @LastEditTime: 2020-09-14 10:52:35
 * @Description: file content
 */
'use strict';

import React, { PureComponent } from "react";
import { View, Image, Text, TouchableOpacity, ImageBackground } from "react-native";
import DesignConvert from "../../../utils/DesignConvert";
import { ic_rank_cup, bg_rank_enter } from "../../../hardcode/skin_imgs/room";
import RoomInfoCache from '../../../cache/RoomInfoCache';
import { ic_next_white } from "../../../hardcode/skin_imgs/main";
import LinearGradient from "react-native-linear-gradient";

export default class _RankListItem extends PureComponent {


    _onOpenRank = () => {
        require("../../../router/level3_router").showRoomRankPage(RoomInfoCache.roomId, this._toTop);
    }

    // _toTop = () => {
    //     require("../../../router/level3_router").showRoomGiftPanelView();
    // }

    render() {
        return (
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    width: DesignConvert.getW(68),
                    height: DesignConvert.getH(28),
                    top: DesignConvert.getH(10) + DesignConvert.statusBarHeight,
                    right: DesignConvert.getW(56),
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}
                onPress={this._onOpenRank}
            >

                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#FFAE80', '#FE84DC']}
                    style={{
                        position: 'absolute',
                        width: DesignConvert.getW(68),
                        height: DesignConvert.getH(28),
                        borderRadius: DesignConvert.getW(20),
                    }}
                />

                <Image
                    style={{
                        width: DesignConvert.getW(24),
                        height: DesignConvert.getH(24),
                        resizeMode: 'contain',
                    }}
                    source={ic_rank_cup()}
                />
                <Text
                    style={{
                        color: "#FFFFFF",
                        fontSize: DesignConvert.getF(11),
                        textAlign: "center",
                        marginStart: DesignConvert.getW(2.5),
                    }}>贡献榜</Text>
            </TouchableOpacity>
        )
    }
}