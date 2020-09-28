/**
 * 房间公告界面
 */

'use strict';

import React from 'react';
import BaseView from "../base/BaseView";
import { Text, TouchableOpacity, Image, View, TextInput } from "react-native";
import DesignConvert from '../../utils/DesignConvert';
import RoomInfoCache from '../../cache/RoomInfoCache';
import { ic_trumpet, ic_close_notice, ic_close_white } from '../../hardcode/skin_imgs/room';
import UserInfoCache from '../../cache/UserInfoCache';


export default class RoomNoticeView extends BaseView {

    constructor(props) {
        super(props)

        // this._viewRef = Platform.OS === 'ios' && RoomModel.getBgRef() && findNodeHandle(RoomModel.getBgRef());
        this._txt = RoomInfoCache.roomData ? RoomInfoCache.roomData.notic : '';
        if (this._txt == '' || this._txt == null) this._txt = '欢迎各位小伙伴进入我的房间，喜欢我的记得点歌关注，下次主播开播不迷路额～';

        this._edit = false;
    }

    _onPublish = () => {
        this.popSelf();
        require('../../model/room/RoomModel').modifyNotice(this._txt);
    }


    render() {
        if (true) {
            return (
                <TouchableOpacity
                    onPress={this.popSelf}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, .6)",
                        marginBottom: DesignConvert.getH(50)
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={1}   //禁止点击时动画（闪动）
                        disabled={false}    //禁止点击时响应onPress事件
                        style={{
                            alignItems: "center",
                            width: DesignConvert.getW(315),
                            height: DesignConvert.getH(175),
                            borderRadius: DesignConvert.getW(10),
                            borderWidth: DesignConvert.getW(1.5),
                            borderColor: '#121212',
                            backgroundColor: "#FFFFFF"
                        }}
                    >
                        <Text
                            style={{
                                marginTop: DesignConvert.getH(15),
                                marginBottom: DesignConvert.getH(15),
                                fontSize: DesignConvert.getF(14),
                                color: "#121212"
                            }}
                        >{'房间公告'}</Text>
                        <TouchableOpacity
                            onPress={this.popSelf}
                            style={{
                                position: 'absolute',
                                top: DesignConvert.getH(19),
                                right: DesignConvert.getW(19),
                            }}
                        >
                            <Image
                                source={ic_close_white()}
                                style={{
                                    width: DesignConvert.getW(12),
                                    height: DesignConvert.getH(12),
                                    resizeMode: 'contain',
                                    tintColor: '#121212',
                                }} />
                        </TouchableOpacity>

                        <TextInput
                            multiline={true}
                            style={{
                                width: DesignConvert.getW(275),
                                maxHeight: DesignConvert.getH(62),
                                fontSize: DesignConvert.getF(12),
                                lineHeight: DesignConvert.getF(16.5),
                                color: '#949494',
                                padding:0,
                            }}
                            // placeholder={txt?txt:'欢迎各位小伙伴进入我的房间，喜欢我的记得点歌关注，下次主播开播不迷路额～'}
                            maxLength={150}
                            editable={this._edit ? true : false}
                            value={this._txt}
                            onChangeText={(text) => {
                                console.warn(this._txt, text)
                                this._txt = text;
                                this.forceUpdate();
                            }}
                            textAlignVertical={'top'}
                        />

                        {(UserInfoCache.userId == RoomInfoCache.roomData.createId || RoomInfoCache.roomData.jobId <= 3) &&
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    position: 'absolute',
                                    bottom: DesignConvert.getH(15),
                                }}>

                                {!this._edit && < TouchableOpacity
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: DesignConvert.getW(80),
                                        height: DesignConvert.getH(34),
                                        backgroundColor: "#ECECEC",
                                        borderRadius: DesignConvert.getW(25),
                                        borderWidth: DesignConvert.getW(1.5),
                                        borderColor: '#121212',
                                        marginRight: DesignConvert.getW(50),
                                    }}
                                    onPress={this.popSelf}
                                >
                                    <Text
                                        style={{
                                            fontSize: DesignConvert.getF(14),
                                            color: "#121212"
                                        }}
                                    >取消</Text>
                                </TouchableOpacity>}
                                <TouchableOpacity
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: DesignConvert.getW(80),
                                        height: DesignConvert.getH(34),
                                        backgroundColor: '#8E7AFF',
                                        borderRadius: DesignConvert.getW(25),
                                        borderWidth: DesignConvert.getW(1.5),
                                        borderColor: '#121212',
                                    }}
                                    onPress={this._edit ? this._onPublish :
                                        () => { this._edit = !this._edit; this.forceUpdate(); }}
                                >
                                    <Text
                                        style={{
                                            fontSize: DesignConvert.getF(14),
                                            color: "#FFFFFF"
                                        }}
                                    >{this._edit ? '保存' : '编辑'}</Text>
                                </TouchableOpacity>
                            </View>}
                    </TouchableOpacity>
                </TouchableOpacity >
            )
        }

        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >

                <TouchableOpacity
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.sheight,
                        position: 'absolute',
                    }}
                    onPress={this.popSelf}
                />

                <View
                    style={{
                        width: DesignConvert.getW(270),
                        height: DesignConvert.getH(310),
                        borderTopLeftRadius: DesignConvert.getW(10),
                        borderTopRightRadius: DesignConvert.getW(10),
                        backgroundColor: '#FFFFFF',
                        borderRadius: DesignConvert.getW(15),
                    }}
                >

                    <Image
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: -DesignConvert.getH(41),
                            width: DesignConvert.getW(80.5),
                            height: DesignConvert.getH(69),
                            resizeMode: 'contain'
                        }}
                        source={ic_trumpet()}
                    />



                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: DesignConvert.getH(53)
                        }}
                    >
                        <Text
                            style={{
                                color: '#212121',
                                fontSize: DesignConvert.getF(17),
                            }}
                        >房间公告</Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: DesignConvert.getH(18),
                            right: DesignConvert.getW(18),

                        }}
                        onPress={this.popSelf}
                    >

                        <Image
                            style={{
                                width: DesignConvert.getW(18),
                                height: DesignConvert.getH(18),
                            }}
                            source={ic_close_notice()}
                        />

                    </TouchableOpacity>

                    <View
                        style={{
                            width: DesignConvert.getW(270),
                            height: DesignConvert.getH(1),
                            backgroundColor: '#F6F6F6'
                        }}
                    />

                    <Text
                        style={{
                            flex: 1,
                            marginTop: DesignConvert.getH(11),
                            flexWrap: 'wrap',
                            color: '#686868',
                            fontSize: DesignConvert.getF(12),
                            marginStart: DesignConvert.getW(16.5),
                            marginEnd: DesignConvert.getW(16.5),
                        }}
                    >{this._txt}</Text>

                </View>

            </View >
        )


        // return (
        //     <View
        //         style={{
        //             flex: 1,
        //             width: DesignConvert.swidth,
        //             backgroundColor: "rgba(0,0,0,0)",
        //             flexDirection: "row",
        //         }}
        //     >

        //         <TouchableOpacity
        //             onPress={this.popSelf}
        //             style={{
        //                 width: DesignConvert.getW(117),
        //                 height: DesignConvert.sheight,
        //             }}
        //         />

        //         <View style={{
        //             width: DesignConvert.getW(258),
        //             height: DesignConvert.sheight,
        //             backgroundColor: "#00000066",
        //         }}>

        //             {RoomModel.getBgRef() && Platform.OS === 'ios' ?
        //                 <BlurView
        //                     blurType='dark'
        //                     blurAmount={5}
        //                     viewRef={this._viewRef}
        //                     style={{
        //                         width: '100%',
        //                         height: '100%',
        //                         position: 'absolute',
        //                         top: 0,
        //                         right: 0,
        //                         overflow: 'hidden',
        //                     }}
        //                 />
        //                 : null
        //             }

        //             <View
        //                 style={{
        //                     width: DesignConvert.getW(258),
        //                     marginTop: DesignConvert.getH(40),
        //                     marginBottom: DesignConvert.getH(18),
        //                     alignItems: 'center',
        //                     justifyContent: 'center',
        //                 }}
        //             >
        //                 <Text
        //                     style={{
        //                         color: "#FFFFFF",
        //                         fontSize: DesignConvert.getF(16),
        //                     }}
        //                 >
        //                     {'公告'}
        //                 </Text>
        //             </View>

        //             <View
        //                 style={{
        //                     width: DesignConvert.getW(258),
        //                     height: DesignConvert.getH(0.5),
        //                     backgroundColor: '#F2F2F2',
        //                     opacity: 0.4,
        //                     marginBottom: DesignConvert.getH(20),
        //                 }}
        //             />

        //             <Text
        //                 style={{
        //                     marginStart: DesignConvert.getW(18),
        //                     marginEnd: DesignConvert.getW(18),
        //                     flexWrap: 'wrap',
        //                     color: '#ffffff',
        //                     fontSize: DesignConvert.getF(12),
        //                 }}
        //             >{txt}</Text>
        //         </View>
        //     </View>
        // );
    }
}