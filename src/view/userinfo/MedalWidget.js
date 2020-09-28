/*
 * @Author: 
 * @Date: 2020-09-07 15:03:21
 * @LastEditors: your name
 * @LastEditTime: 2020-09-08 15:06:04
 * @Description: file content
 */
'use strict';

import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';
import DesignConvert from '../../utils/DesignConvert';
import { mine_rich_lv, mine_charm_lv } from '../../hardcode/skin_imgs/main';

/**
 * 勋章
 */
export default class MedalWidget extends PureComponent {

    constructor(props) {
        super(props)

        this._width = this.props.width ? this.props.width : DesignConvert.getW(40)
        this._height = this.props.height ? this.props.height : DesignConvert.getH(18)

    }


    render() {

        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >

                {this.props.richLv && this.props.richLv > 0 &&
                    <Image
                        style={{
                            width: this._width,
                            height: this._height,
                            resizeMode: 'contain',
                            marginEnd: this.props.noMargin ? 0 : DesignConvert.getW(5),
                        }}
                        source={mine_rich_lv(this.props.richLv)}
                    />}

                {this.props.charmLv && this.props.charmLv > 0 &&
                    <Image
                        style={{
                            width: this._width,
                            height: this._height,
                            resizeMode: 'contain',
                            marginEnd: this.props.noMargin ? 0 : DesignConvert.getW(5),
                        }}
                        source={mine_charm_lv(this.props.charmLv)}
                    />}

            </View>
        )
    }
}