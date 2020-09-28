/**
 * 我的 -> 粉丝或关注列表或好友列表
 */
'use strict';

import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import DesignConvert from '../../../utils/DesignConvert';
import BackTitleView from '../../base/BackTitleView';
import Config from '../../../configs/Config';
import BaseView from '../../base/BaseView';
import ToastUtil from '../../base/ToastUtil';
import { THEME_COLOR } from '../../../styles';
import MedalWidget from '../../userinfo/MedalWidget';
import LinearGradient from 'react-native-linear-gradient';
import { EVT_UPDATE_RELATIONSHIP } from "../../../hardcode/HGlobalEvent";
import ModelEvent from '../../../utils/ModelEvent';
import { RenderSexView } from '../../userinfo/UserInfoView';

import { icon_focused } from '../../../hardcode/skin_imgs/mine';

const [Follow, Fans, Friend] = [486, 777, 999];
export { Follow, Fans, Friend };

export class FList extends PureComponent {
    constructor(props) {
        super(props);

        this._type = this.props.viewType;
        this._list = [];
        this._extraData = 0;
    }

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_UPDATE_RELATIONSHIP, this._iniData);
        this._iniData();
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_UPDATE_RELATIONSHIP, this._iniData);
    }

    getFriendsType = () => {
        switch (this._type) {
            case Follow:
                return 1;
            case Fans:
                return 2;
            case Friend:
                return 3;
        }
    }

    _iniData = () => {
        require('../../../model/message/FriendsModel').default.getFriends(this.getFriendsType())
            .then(data => {
                // console.log("好友", data);
                this._list = data;
                this._extraData++;
                this.forceUpdate();
            });
    }

    getEmptyDesc = () => {
        switch (this._type) {
            case Follow:
                return '快去关注你喜欢的人吧';
            case Fans:
                return '主动关注说不定就有故事了呢？';
            case Friend:
                return '还没有好友哦';
        }
    }

    _renderFooterView = () => {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(50),
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Text
                    style={{
                        color: "#AEAEAE",
                        fontSize: DesignConvert.getF(11),
                    }}>--- 已经到最底部了 ---</Text>
            </View>
        )
    }

    _renderEmptyView = () => {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(520),
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    source={require("../../../hardcode/skin_imgs/message").message_empty()}
                    style={{
                        width: DesignConvert.getW(210),
                        height: DesignConvert.getH(150),
                    }}></Image>
                <Text
                    style={{
                        marginTop: DesignConvert.getH(15),
                        color: "#E6E6E6",
                        fontSize: DesignConvert.getF(13),
                    }}>{this.getEmptyDesc()}
                </Text>
            </View>
        );
    };

    _onItemPress = (item) => {
        require('../../../router/level2_router').showUserInfoView(item.userId);
    };

    _renderHasFocusView = (userId) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this._onAttentionPress(userId, false);
                }}
                style={{
                    position: "absolute",
                    top: DesignConvert.getH(16.5),
                    right: DesignConvert.getW(15),
                    // width: DesignConvert.getW(60),
                    // height: DesignConvert.getH(24),
                    // borderRadius: DesignConvert.getW(20),
                    // borderWidth: DesignConvert.getW(1),
                    // borderColor: '#9B9B9B',
                    // justifyContent: 'center',
                    // alignItems: 'center'
                }}
            >
                <Image
                    source={icon_focused()}
                    style={{
                        width: DesignConvert.getW(53),
                        height: DesignConvert.getH(29),
                        resizeMode: 'contain',
                    }} />
                {/* <LinearGradient
                    start={{ x: 0, y: 0 }}
                    start={{ x: 1, y: 0 }}
                    colors={["#F396FC", "#FFB1CB"]}
                    style={{
                        width: DesignConvert.getW(60),
                        height: DesignConvert.getH(27),
                        borderRadius: DesignConvert.getW(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(11),
                            color: '#FFFFFF',
                            fontWeight: "bold",
                        }}
                    >
                        {'取消关注'}
                    </Text>
                </LinearGradient> */}
            </TouchableOpacity>
        )
    }

    // 0是自己,1是好友,2已关注,3已被关注
    _onAttentionPress = async (userId, bool = true) => {
        let res = require("../../../model/userinfo/UserInfoModel").default.addLover(userId, bool);

        if (res) {
            if (bool) {
                ToastUtil.showCenter("关注成功");
            } else {
                ToastUtil.showCenter("取消关注成功");
            }

            this._iniData();
        } else {
            ToastUtil.showCenter("操作失败");
        }
    }

    _renderUnfocusView = (userId) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this._onAttentionPress(userId, true);
                }}
                style={{
                    position: "absolute",
                    top: DesignConvert.getH(16.5),
                    right: DesignConvert.getW(15),
                    // width: DesignConvert.getW(60),
                    // height: DesignConvert.getH(24),
                    // backgroundColor: THEME_COLOR,
                    // borderRadius: DesignConvert.getW(20),
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // flexDirection: 'row',
                }}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    start={{ x: 1, y: 0 }}
                    colors={["#E85E73", "#E85E73"]}
                    style={{
                        width: DesignConvert.getW(53),
                        height: DesignConvert.getH(29),
                        borderRadius: DesignConvert.getW(16),
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#5F1271',
                    }}>
                    {/* <Image
                    source={require('../../../hardcode/skin_imgs/common').fans_mutual()}
                    style={{
                        width: DesignConvert.getW(13),
                        height: DesignConvert.getH(11),
                    }}
                /> */}
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(12),
                            color: '#FFFFFF',
                            // fontWeight: "bold",
                        }}
                    >
                        {'关注'}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    _renderFriendView = () => {
        return (
            <View
                style={{
                    position: "absolute",
                    top: DesignConvert.getH(16.5),
                    right: DesignConvert.getW(15),
                    // width: DesignConvert.getW(60),
                    // height: DesignConvert.getH(24),
                    // borderRadius: DesignConvert.getW(15),
                    // borderWidth: DesignConvert.getW(1),
                    // borderColor: '#C7C7C7',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // flexDirection: 'row',
                    
                }}
            >

                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    start={{ x: 1, y: 0 }}
                    colors={["#F396FC", "#FFB1CB"]}
                    style={{
                        opacity: 0.5,
                        width: DesignConvert.getW(60),
                        height: DesignConvert.getH(29),
                        borderRadius: DesignConvert.getW(16),
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#5F1271',
                    }}>

                    {/* <Image
                    source={require('../../../hardcode/skin_imgs/main').friend_sign()}
                    style={{
                        width: DesignConvert.getW(11),
                        height: DesignConvert.getH(8),
                        tintColor: "#C7C7C7",
                    }}
                /> */}

                    <Text
                        style={{
                            fontSize: DesignConvert.getF(11),
                            color: '#FFFFFF',
                            fontWeight: "bold",
                        }}
                    >
                        {'互相关注'}
                    </Text>
                </LinearGradient>
            </View>
        )
    }

    // 0是自己,1是好友,2已关注,3已被关注
    renderRightView = (item) => {
        switch (this._type) {
            case Follow:
                if (item.friendStatus == 3) {
                    return this._renderUnfocusView(item.userId)
                } else {
                    return this._renderHasFocusView(item.userId);
                }
            case Fans:
                if (item.friendStatus == 3) {
                    return this._renderUnfocusView(item.userId)
                } else if (item.friendStatus == 1) {
                    return this._renderFriendView()
                } else {
                    return this._renderHasFocusView(item.userId);
                }
            case Friend:
                return this._renderFriendView()
            default:
                return null;
        }
    }

    _renderSexView = (item) => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <View
                    style={{
                        width: DesignConvert.getW(37),
                        height: DesignConvert.getH(15),
                        backgroundColor: item.sex == 2 ? "#FF56AD" : "#4889FF",
                        borderRadius: DesignConvert.getW(15),
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Image
                        source={item.sex == 2 ? require("../../../hardcode/skin_imgs/registered").ic_default_female() : require("../../../hardcode/skin_imgs/registered").ic_default_male()}
                        style={{
                            width: DesignConvert.getW(7),
                            height: DesignConvert.getH(7),
                            marginRight: DesignConvert.getW(3),
                            tintColor: "white",
                        }}
                    ></Image>

                    <Text
                        style={{
                            color: "white",
                            fontSize: DesignConvert.getF(10),
                        }}
                    >{item.age + ""}</Text>
                </View>

                <MedalWidget
                    width={DesignConvert.getW(34)}
                    height={DesignConvert.getH(14)}
                    richLv={item.contributeLv}
                    charmLv={item.charmLv}
                />
            </View>
        )
    }

    _renderItem = ({ item }) => {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(74),
                    paddingHorizontal: DesignConvert.getW(15),
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    onPress={() => {
                        this._onItemPress(item);
                    }}
                >
                    <Image
                        source={{ uri: Config.getHeadUrl(item.userId, item.logoTime, item.thirdIconurl) }}
                        style={{
                            width: DesignConvert.getW(50),
                            height: DesignConvert.getH(50),
                            // marginLeft: DesignConvert.getW(15),
                            // marginRight: DesignConvert.getW(12),
                            borderRadius: DesignConvert.getW(25),
                        }}></Image>
                </TouchableOpacity>

                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        marginHorizontal: DesignConvert.getW(10),
                    }}>
                    {/* <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}> */}
                    <Text
                        numberOfLines={1}
                        style={{
                            color: '#000000FF',
                            fontSize: DesignConvert.getF(14),
                            maxWidth: DesignConvert.getW(150),
                            marginBottom: DesignConvert.getH(5),
                            // marginRight: DesignConvert.getW(5),
                            // fontWeight: "bold",
                        }}>{decodeURI(item.nickName)}</Text>
                    <RenderSexView
                        sex={item.sex}
                        age={item.age}></RenderSexView>

                    {/* <Image
                            source={item.sex == 2 ? require('../../../hardcode/skin_imgs/ccc').ttq_nv()
                                : require('../../../hardcode/skin_imgs/ccc').ttq_nan()}
                            style={{
                                width: DesignConvert.getW(16),
                                height: DesignConvert.getH(16),
                                marginLeft: DesignConvert.getW(5),
                            }}
                        />
                    </View> */}

                    {/* <Text
                        numberOfLines={1}
                        style={{
                            color: '#A3A3A3',
                            fontSize: DesignConvert.getF(11),
                            maxWidth: DesignConvert.getW(150),
                            marginTop: DesignConvert.getH(5),
                        }}>{`ID：${item.userId}`}</Text> */}
                </View>



                {this.renderRightView(item)}

                {/* <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(1),
                        backgroundColor: "#F6F6F6",
                        alignSelf: "center",
                    }}></View> */}
            </View>
        );
    };

    getTitle = () => {
        switch (this._type) {
            case Follow:
                return '关注';
            case Fans:
                return '粉丝';
            case Friend:
                return '好友';
        }
    }

    render() {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={this._list}
                renderItem={this._renderItem}
                extraData={this._extraData}
                ListEmptyComponent={this._renderEmptyView}
                ListFooterComponent={this._renderFooterView}
                style={{
                    flex: 1,
                    marginTop: DesignConvert.getH(5),
                }}
            />
        );
    }
}

export default class FollowAndFansView extends BaseView {
    constructor(props) {
        super(props);

        this._type = this.props.params.viewType;
    }

    _onBackPress = () => {
        this.popSelf();
    };

    getTitle = () => {
        switch (this._type) {
            case Follow:
                return '关注';
            case Fans:
                return '粉丝';
            case Friend:
                return '好友';
        }
    }

    render() {
        // console.log("好友", "viewType", this._type);
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}>

                <BackTitleView
                    titleText={this.getTitle()}
                    onBack={this._onBackPress}
                />

                <FList
                    viewType={this._type} />
            </View>
        );
    }
}
