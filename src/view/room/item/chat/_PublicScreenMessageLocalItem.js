'use strict';

import React, { PureComponent } from "react";
import { Text, View, Image, ImageBackground } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";
import LinearGradient from "react-native-linear-gradient";


export default class _PublicScreenMessageLocalItem extends PureComponent {

    render() {
        return (
            <View
                style={{
                    marginTop: DesignConvert.getH(6),
                    marginBottom: DesignConvert.getH(6),
                    backgroundColor: 'rgba(0, 0, 0, .2)',
                    // maxWidth: DesignConvert.getW(256),
                    // minWidth: DesignConvert.getW(100),
                    // backgroundColor: '#FFFFFF19',
                    // borderRadius: DesignConvert.getW(4),
                    // padding: DesignConvert.getW(10),
                    // flexWrap: 'wrap',
                    // flexDirection: 'row',
                    // justifyContent: 'flex-start',
                    // alignItems: 'center',
                    borderRadius: DesignConvert.getW(17),
                    width: DesignConvert.getW(265),
                    minHeight: DesignConvert.getH(50),
                    padding: DesignConvert.getW(15),
                    alignItems: 'flex-start',
                }}
            >
                {/* <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: DesignConvert.getW(49),
                        marginTop: DesignConvert.getH(11),
                    }}
                >
                    <Text
                        style={{

                            color: 'rgba(255, 255, 255, .5)',
                            fontSize: DesignConvert.getF(11),
                        }}
                    >恋恋星球</Text>
                    <Image
                        source={require("../../../../hardcode/skin_imgs/room_more").ic_office_msg()}
                        style={{
                            marginLeft: DesignConvert.getW(5),
                            width: DesignConvert.getW(25),
                            height: DesignConvert.getH(14)
                        }}
                    >
                    </Image>
                </View> */}


                {/* <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#DDC0FF', '#AC85FF']}
                    style={{
                        marginLeft: DesignConvert.getW(33),
                        marginTop: DesignConvert.getH(4),

                        borderRadius: DesignConvert.getW(4),

                        // justifyContent: 'center',
                        // alignItems: 'center',
                    }}
                > */}
                <Text
                    style={{
                        color: '#FFFFFF',

                        maxWidth: DesignConvert.getW(256),

                        fontSize: DesignConvert.getF(13),
                        includeFontPadding: false,

                        flexWrap: 'wrap',

                        // marginLeft: DesignConvert.getW(49),
                    }}
                >
                    {this.props.data}
                        {/* 欢迎来到恋恋星球，恋恋星球倡导绿色
                        直播，内容包含低俗、暴露、政治
                        等都将会被封号，直播内容将24小
                        时巡查。 */}
                    </Text>
                {/* </LinearGradient> */}

                {/* <View
                    style={{
                        marginLeft: DesignConvert.getW(33),
                        marginTop: DesignConvert.getH(4),

                        backgroundColor: '#FFFFFF19',
                        borderRadius: DesignConvert.getW(4),

                        // justifyContent: 'center',
                        // alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: '#39FFDA',

                            maxWidth: DesignConvert.getW(256),

                            fontSize: DesignConvert.getF(12),
                            includeFontPadding: false,

                            flexWrap: 'wrap',

                            margin: DesignConvert.getW(9),
                        }}
                    >{this.props.data}</Text>
                </View> */}

                {/* <Image
                    style={{
                        position: 'absolute',
                        top: DesignConvert.getH(10),
                        left: DesignConvert.getW(10),
                        width: DesignConvert.getW(34),
                        height: DesignConvert.getH(34),
                    }}
                    source={require("../../../../hardcode/skin_imgs/common").ic_logo_circle()}
                /> */}

            </View>

        )
    }
}
