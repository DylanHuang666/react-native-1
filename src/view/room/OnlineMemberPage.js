
/**
 * 房间 -> 在线
 */
'use strict';

import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Modal, PanResponder, Animated, findNodeHandle, Platform } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import DesignConvert from "../../utils/DesignConvert";
import BaseView from "../base/BaseView";
import RoomInfoCache from '../../cache/RoomInfoCache';
import RoomModel, { isUserOnSeat, getUserSeatPosition } from '../../model/room/RoomModel';
import { BlurView } from 'react-native-blur'
import MedalWidget from "../userinfo/MedalWidget";
import SexAgeWidget from "../userinfo/SexAgeWidget";
import { ic_in_mic } from "../../hardcode/skin_imgs/room";
import { THEME_COLOR } from "../../styles";
import { ERoomActionType } from '../../hardcode/ERoom';
import UserInfoCache from '../../cache/UserInfoCache';

export default class OnlineMemberPage extends BaseView {
    constructor(props) {
        super(props);

        this._roomId = this.props.params.roomId;
        this._dialogVisable = true;

        this._viewRef = Platform.OS === 'ios' && RoomModel.getBgRef() && findNodeHandle(RoomModel.getBgRef());

        this._list = [];
        this.start = 1;

        this._loadMoreEnable = true;
        this._left = 20;

        this._extraData = 0;
    }

    componentDidMount() {
        super.componentDidMount();
        this.start = 1;
        this._initData()
    }

    _dismissDia = () => {
        // this._dialogVisable = false;
        // this.forceUpdate();
        this.popSelf();
    }

    _loadMore = () => {
        if (this._loadMoreEnable) {
            this._initData();
        }
    }

    _initData() {
        require("../../model/room/RoomManagerModel").default.getOnlineMembers(this._roomId, this.start)
            .then(data => {
                if (this.start == 1) {
                    this._list = data;
                } else {
                    this._list = this._list.concat(data);
                }
                // console.log("在线人员", data);
                // this._list = [{base: {userId: "7529881", nickName: "活泼的北极熊", logoTime: 72478346, thirdIconurl: "84", sex: 2, age: 26, contributeLv: 1}, onMic: true}, {base: {userId: "7529881", nickName: "活泼的北极熊", logoTime: 72478346, thirdIconurl: "84", sex: 1, age: 26, contributeLv: 1}, onMic: false}]
                this._loadMoreEnable = data.length != 0;
                this.start += 22;
                this.forceUpdate();
            })
    }

    _renderItem = ({ item, index }) => {

        const inMic = isUserOnSeat(item.base.userId)

        return (
            <TouchableOpacity
                onPress={() => {
                    this.popSelf();
                    require('../../model/room/RoomUserClickModel').onClickUser(item.base.userId, item.base.nickName)
                    // require("../../router/level2_router").showUserInfoView(item.base.userId);
                }}
                style={{
                    width: DesignConvert.getW(345),
                    height: DesignConvert.getH(59),
                    flexDirection: "row",
                    alignItems: "center",
                    // borderBottomWidth: DesignConvert.getH(0.5),
                    // borderBottomColor: '#F6F6F6',
                }}
            >

                <View>
                    <Image
                        source={{ uri: require("../../configs/Config").default.getHeadUrl(item.base.userId, item.base.logoTime, item.base.thirdIconurl) }}
                        style={{
                            width: DesignConvert.getW(39),
                            height: DesignConvert.getH(39),
                            borderRadius: DesignConvert.getW(20),
                        }}
                    />

                    {/* <Image
                        source={item.base.sex == 2 ? require('../../hardcode/skin_imgs/ccc').ttq_nv() : require('../../hardcode/skin_imgs/ccc').ttq_nan()}
                        style={{
                            width: DesignConvert.getW(12),
                            height: DesignConvert.getH(12),
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                        }}
                    /> */}
                </View>
                <Text
                    style={{
                        color: "#121212",
                        fontSize: DesignConvert.getF(12),

                        marginHorizontal: DesignConvert.getW(5),
                        marginLeft: DesignConvert.getW(10)
                    }}
                >{decodeURIComponent(item.base.nickName)}</Text>
                <MedalWidget
                    width={DesignConvert.getW(40)}
                    height={DesignConvert.getH(18)}
                    richLv={item.base.contributeLv}
                // charmLv={item.base.charmLv}
                />
                <View
                    style={{
                        flex: 1,
                        marginLeft: DesignConvert.getW(15),
                        height: DesignConvert.getH(59),
                    }}
                >



                    <View
                        style={{
                            flexDirection: 'row',

                            alignSelf: 'center'
                        }}
                    >

                        {/* {item.jobId == 1 || item.jobId == 2 &&
                            <LinearGradient
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                colors={['#FFB0B0', '#FB53A7']}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: DesignConvert.getW(27),
                                    height: DesignConvert.getH(13),
                                    borderRadius: DesignConvert.getW(2),
                                    marginRight: DesignConvert.getW(5),
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: DesignConvert.getF(9),
                                        color: '#FFFFFF'
                                    }}
                                >{'房主'}</Text>
                            </LinearGradient>
                        }

                        {item.jobId == 3 &&
                            <LinearGradient
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                colors={['#00B2FC', '#0AF8BC']}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: DesignConvert.getW(27),
                                    height: DesignConvert.getH(13),
                                    borderRadius: DesignConvert.getW(2),
                                    marginRight: DesignConvert.getW(5),
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: DesignConvert.getF(9),
                                        color: '#FFFFFF'
                                    }}
                                >{'管理'}</Text>
                            </LinearGradient>
                        } */}



                        {/* {inMic &&
                            <LinearGradient
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                colors={['#A055FF', '#6B77FF']}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: DesignConvert.getW(27),
                                    height: DesignConvert.getH(13),
                                    borderRadius: DesignConvert.getW(2),
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: DesignConvert.getF(9),
                                        color: '#FFFFFF'
                                    }}
                                >麦上</Text>
                            </LinearGradient>
                        } */}
                    </View>
                </View>

                {/* {RoomInfoCache.haveRoomPermiss && RoomInfoCache.jobId < item.jobId && item.base.userId !== UserInfoCache.userId ?
                    (
                        inMic ? (

                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: DesignConvert.getH(17),
                                    right: 0,
                                }}
                                onPress={() => {
                                    //下麦
                                    RoomModel.action(ERoomActionType.MIC_DOWN, item.base.userId, getUserSeatPosition(item.base.userId), 'true');
                                    // 暂时先这样子搞
                                    setTimeout(() => {
                                        this._extraData++;
                                        this.forceUpdate();
                                    }, 500)
                                }}
                            >
                                <LinearGradient
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 1, y: 0.5 }}
                                    colors={['#8A50FC', '#F293FF']}
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: DesignConvert.getW(60),
                                        height: DesignConvert.getH(25),
                                        borderRadius: DesignConvert.getW(12),

                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: DesignConvert.getF(12),
                                            color: '#FFFFFF'
                                        }}
                                    >下麦</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                        ) : (
                                item.jobId == 4 ?
                                    <TouchableOpacity
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                        }}
                                        onPress={() => {
                                            require('../../model/room/MicQueModel').default.upMicUser(item.base.userId)
                                            // 暂时先这样子搞
                                            setTimeout(() => {
                                                this._extraData++;
                                                this.forceUpdate();
                                            }, 500)
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: DesignConvert.getF(12),
                                                color: '#8A50FC',
                                                lineHeight: DesignConvert.getH(59),
                                                textAlign: 'center',
                                            }}
                                        >抱TA上麦</Text>
                                    </TouchableOpacity>
                                    : null
                            )
                    )
                    : null
                } */}

            </TouchableOpacity>
        )
    }

    _keyExtractor = (item, index) => item.base.userId;

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    width: DesignConvert.swidth,
                    overflow: 'hidden',
                }}
            >
                <TouchableOpacity
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.sheight - DesignConvert.getH(410),
                    }}
                    onPress={this.popSelf}
                />

                <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(410) + DesignConvert.addIpxBottomHeight(),

                        borderTopLeftRadius: DesignConvert.getW(10),
                        borderTopRightRadius: DesignConvert.getH(10),

                        backgroundColor: 'white',
                        alignItems: 'center',
                    }}
                >

                    <Text
                        style={{
                            color: '#121212',
                            fontSize: DesignConvert.getF(14),
                            fontWeight: 'bold',

                            alignSelf: 'center',
                            marginTop: DesignConvert.getH(15)

                        }}
                    >{`在线用户`}</Text>
                    <TouchImg
                        source={require('../../hardcode/skin_imgs/main').page_close_ic()}
                        onPress={this.popSelf}
                        imgStyle={{
                            width: DesignConvert.getW(12),
                            height: DesignConvert.getH(12)
                        }}
                        containerSty={{
                            position: 'absolute',
                            right: DesignConvert.getW(15),
                            top: DesignConvert.getH(19)
                        }}
                    />
                    <FlatList
                        data={this._list}
                        renderItem={this._renderItem}
                        onEndReached={this._loadMore}
                        onEndReachedThreshold={0.2}
                        showsVerticalScrollIndicator={false}
                        extraData={this._extraData}
                        keyExtractor={this._keyExtractor}
                    >
                    </FlatList>


                </View>
            </View>
        )
    }
}

export function TouchImg(props) {

    const { onPress, imgStyle, containerSty, source } = props

    return (
        <TouchableOpacity
            onPress={onPress}
            style={containerSty}
        >
            <Image
                source={source}
                style={imgStyle}
            />
        </TouchableOpacity>
    )


}