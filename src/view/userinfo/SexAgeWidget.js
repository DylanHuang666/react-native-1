/*
 * @Author: 
 * @Date: 2020-09-10 15:46:27
 * @LastEditors: your name
 * @LastEditTime: 2020-09-11 18:12:46
 * @Description: file content
 */
'use strict';

import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DesignConvert from '../../utils/DesignConvert';
import { sex_female, sex_male } from "../../hardcode/skin_imgs/common";

export default class SexAgeWidget extends PureComponent {

    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={this._sex === 2 ? ['#65C5FFFF', '#8BDAFFFF'] : ['#65C5FF', '#8BDAFF']}
                style={[{
                    width: DesignConvert.getW(34),
                    height: DesignConvert.getH(18),
                    marginLeft: DesignConvert.getW(5),
                    borderRadius: DesignConvert.getW(9),
                    borderWidth: DesignConvert.getW(1.5),
                    borderColor: '#5F1271',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }, this.props.style]}>
                <Image
                    source={this.props.sex == 2 ? require("../../hardcode/skin_imgs/mine").mine_female() : require("../../hardcode/skin_imgs/mine").mine_male()}
                    style={{
                        marginRight: DesignConvert.getW(3),
                        width: DesignConvert.getW(9),
                        height: DesignConvert.getH(9),

                    }}></Image>

                {this.props.age ? (
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(11),
                            color: '#FFFFFF',
                        }}
                    >
                        {`${this.props.age}`}
                    </Text>
                ) : null}

            </LinearGradient>
        )
    }
}