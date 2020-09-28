/*
 * @Author: 
 * @Date: 2020-09-10 15:46:27
 * @LastEditors: your name
 * @LastEditTime: 2020-09-14 17:15:18
 * @Description: file content
 */
'use strict';

import React, { PureComponent } from "react";
import { View, } from "react-native";
import DesignConvert from "../../../utils/DesignConvert";
import _BeckoningItem from './_BeckoningItem';
import { AGORA_ON_AUDIO_VOLUMN_INDICATION } from "../../../hardcode/HNativeEvent";
import { addEventListener, removeEventListener } from "../../../model/agora/AgoraModel";


//todo
//声音波形
export default class _WaveSoundItem extends PureComponent {

    constructor(props) {
        super(props);
        this._bRunning = false;
    }

    componentDidMount() {
        addEventListener(AGORA_ON_AUDIO_VOLUMN_INDICATION, this._onAudioVolumeIndication);
    }

    componentWillUnmount() {
        removeEventListener(AGORA_ON_AUDIO_VOLUMN_INDICATION, this._onAudioVolumeIndication);
    }

    _onAudioVolumeIndication = (map) => {
        if (map[this.props.userId]) {
            if (this._bRunning) {
                return;
            }

            this._bRunning = true;
            this.forceUpdate();

            setTimeout(() => {
                this._bRunning = false;
                this.forceUpdate();
            }, 1000)
        }
    }

    render() {
        if (!this._bRunning) {
            return null;
        }


        return (
            <View
                style={[
                    {
                        position: 'absolute',
                        top: -DesignConvert.getH(3.2),
                        left: -DesignConvert.getW(3.2),
                        width: this.props.width,
                        height: this.props.height,
                        backgroundColor: this.props.sex == 2 ? '#FF65D180' : '#5887FF80',
                        borderRadius: DesignConvert.getW(50),
                    }, 
                    this.props.style
                ]}
            >
            </View>
        );
    }
}
