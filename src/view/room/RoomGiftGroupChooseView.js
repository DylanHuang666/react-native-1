/**
 * 送礼物组选择界面
 */

'use strict';

import React from 'react';
import BaseView from "../base/BaseView";
import { TouchableOpacity, View, Text, ImageBackground } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import ModelEvent from '../../utils/ModelEvent';
import { EVT_LOGIC_CHOOSE_GIFT_NUM } from '../../hardcode/HLogicEvent';
import { THEME_COLOR } from '../../styles';


export default class RoomGiftGroupChooseView extends BaseView {

    _renderItem(group, desc) {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: DesignConvert.getH(15),
                }}
                onPress={() => {
                    //todo
                    ModelEvent.dispatchEntity(null, EVT_LOGIC_CHOOSE_GIFT_NUM, group)
                    this.popSelf()
                }}
            >

                <Text
                    style={{
                        fontSize: DesignConvert.getF(10),
                        lineHeight: DesignConvert.getH(15),
                        color: '#8E7AFF',
                        // fontWeight: 'bold',
                        width: DesignConvert.getW(36),
                        textAlign: 'right',
                    }}
                >
                    {group}
                </Text>

                <Text
                    style={{
                        color: "#FFFFFF",
                        fontSize: DesignConvert.getF(11),
                        lineHeight: DesignConvert.getH(15),
                        marginLeft: DesignConvert.getW(10),
                        textAlign: 'left',
                    }}
                >{desc}</Text>


            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,

                }}
                onPress={this.popSelf}

            >

                <TouchableOpacity
                    style={{
                        flex: 1,
                    }}
                    onPress={this.popSelf}
                />

                <ImageBackground
                    style={{
                        position: 'absolute',
                        width: DesignConvert.getW(101),
                        height: DesignConvert.getH(171),
                        bottom: DesignConvert.getH(43) + DesignConvert.addIpxBottomHeight(34),
                        right: DesignConvert.getW(48.5),
                    }}
                    source={require('../../hardcode/skin_imgs/ccc').ttq_gift_sel_count_bg()}
                >

                    {this._renderItem(99999, '长长久久')}
                    {this._renderItem(1314, '一生一世')}
                    {/* {this._renderItem(666, '大吉大利')} */}
                    {this._renderItem(520, '我爱你')}
                    {/* {this._renderItem(188, '要抱抱')} */}
                    {/* {this._renderItem(66, '一切顺利')} */}
                    {this._renderItem(10, '十全十美')}
                    {this._renderItem(1, '一心一意')}

                </ImageBackground>


            </View>
        );
    }
}