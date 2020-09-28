/**
 * 我的收益
 */

'use strict';

import React, { PureComponent } from "react";
import BaseView from "../base/BaseView";
import BackTitleView from "../base/BackTitleView";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import { mine_tixian, mine_liushui, mine_zhibojianliushui, mine_duihuan, mine_arrow_right } from '../../hardcode/skin_imgs/mine';

//收益页
export default class AnchorIncomeBill extends BaseView {

    _onBackPress = () => {
        this.popSelf();
    }

    /**
     * 四个记录
     */
    _flowRecord = () => {
        require("../../router/level3_router").showRecordView(require("./RecordView").flowRecord);
    }
    _withdrawalsRecord = () => {
        require("../../router/level3_router").showRecordView(require("./RecordView").withdrawRecord);
    }
    _exchangeRecord = () => {
        require("../../router/level3_router").showRecordView(require("./RecordView").exchangeRecord);
    }
    _liveFlowRecord = () => {
        require("../../router/level3_router").showRecordView(require("./RecordView").liveFlowRecord);
    }

    render() {

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}
            >

                <BackTitleView
                    onBack={this._onBackPress}
                    titleText={'账单'}
                />

                <TouchableOpacity
                    onPress={this._flowRecord}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: DesignConvert.swidth,
                        marginTop: DesignConvert.getH(28),
                    }}
                >
                    <Image
                        source={mine_liushui()}
                        style={{
                            width: DesignConvert.getW(36),
                            height: DesignConvert.getH(36),
                            marginLeft: DesignConvert.getW(24),
                        }}
                    />
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(16),
                            color: '#333333',
                            marginLeft: DesignConvert.getW(12),
                        }}
                    >
                        {'流水明细'}
                    </Text>
                    <Image
                        source={mine_arrow_right()}
                        style={{
                            position: 'absolute',
                            right: DesignConvert.getW(24),
                            top: DesignConvert.getH(11),
                            width: DesignConvert.getW(8),
                            height: DesignConvert.getH(14),
                            tintColor: '#999999',
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this._withdrawalsRecord}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: DesignConvert.swidth,
                        marginTop: DesignConvert.getH(31),
                    }}
                >
                    <Image
                        source={mine_tixian()}
                        style={{
                            width: DesignConvert.getW(36),
                            height: DesignConvert.getH(36),
                            marginLeft: DesignConvert.getW(24),
                        }}
                    />
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(16),
                            color: '#333333',
                            marginLeft: DesignConvert.getW(12),
                        }}
                    >
                        {'提现记录'}
                    </Text>
                    <Image
                        source={mine_arrow_right()}
                        style={{
                            position: 'absolute',
                            right: DesignConvert.getW(24),
                            top: DesignConvert.getH(11),
                            width: DesignConvert.getW(8),
                            height: DesignConvert.getH(14),
                            tintColor: '#999999',
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this._exchangeRecord}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: DesignConvert.swidth,
                        marginTop: DesignConvert.getH(31),
                    }}
                >
                    <Image
                        source={mine_duihuan()}
                        style={{
                            width: DesignConvert.getW(36),
                            height: DesignConvert.getH(36),
                            marginLeft: DesignConvert.getW(24),
                        }}
                    />
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(16),
                            color: '#333333',
                            marginLeft: DesignConvert.getW(12),
                        }}
                    >
                        {'兑换记录'}
                    </Text>
                    <Image
                        source={mine_arrow_right()}
                        style={{
                            position: 'absolute',
                            right: DesignConvert.getW(24),
                            top: DesignConvert.getH(11),
                            width: DesignConvert.getW(8),
                            height: DesignConvert.getH(14),
                            tintColor: '#999999',
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this._liveFlowRecord}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: DesignConvert.swidth,
                        marginTop: DesignConvert.getH(31),
                    }}
                >
                    <Image
                        source={mine_zhibojianliushui()}
                        style={{
                            width: DesignConvert.getW(36),
                            height: DesignConvert.getH(36),
                            marginLeft: DesignConvert.getW(24),
                        }}
                    />
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(16),
                            color: '#333333',
                            marginLeft: DesignConvert.getW(12),
                        }}
                    >
                        {'直播间流水'}
                    </Text>
                    <Image
                        source={mine_arrow_right()}
                        style={{
                            position: 'absolute',
                            right: DesignConvert.getW(24),
                            top: DesignConvert.getH(11),
                            width: DesignConvert.getW(8),
                            height: DesignConvert.getH(14),
                            tintColor: '#999999',
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}