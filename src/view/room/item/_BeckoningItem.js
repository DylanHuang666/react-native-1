/*
 * @Author: 
 * @Date: 2020-09-10 15:46:27
 * @LastEditors: your name
 * @LastEditTime: 2020-09-10 16:21:58
 * @Description: file content
 */
'use strict';

import React, { PureComponent } from "react";
import { View, Image, Text } from "react-native";
import DesignConvert from "../../../utils/DesignConvert";
import { ic_beckoning } from "../../../hardcode/skin_imgs/room";
import LinearGradient from "react-native-linear-gradient";

//todo
//心动值显示
export default class _BeckoningItem extends PureComponent {

    render() {
        //todo
        const bMale = this.props.bMale;
        const num = this.props.num;

        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#121212', '#121212']}
                style={{
                    height: DesignConvert.getH(14),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center',
                    borderRadius: DesignConvert.getW(10),
                    paddingHorizontal:DesignConvert.getW(3),
                }}
            >
                <Image
                    style={{
                        width: DesignConvert.getW(7),
                        height: DesignConvert.getH(7),
                        // marginStart: DesignConvert.getW(1),
                        marginEnd: DesignConvert.getW(2),
                    }}
                    source={ic_beckoning()}
                />

                <Text
                    style={{
                        fontSize: DesignConvert.getF(11),
                        color: 'white',
                        // marginEnd:DesignConvert.getW(4.5),
                    }}
                >{num}</Text>
            </LinearGradient>
        );
    }
}