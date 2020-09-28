/**
 * 首页 -> 搜索
 */
'use strict';

import React, { PureComponent, Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, StyleSheet } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator, ViewPager } from 'rn-viewpager';
import LinearGradient from 'react-native-linear-gradient';
import DesignConvert from '../../utils/DesignConvert';
import Config from '../../configs/Config';
import UserItem from './UserItem';
import RoomCardItem from '../main/home/RoomCardItem';
import StatusBarView from "../base/StatusBarView";
import BaseView from '../base/BaseView';
import { ic_back_black } from '../../hardcode/skin_imgs/common';
import { live_status_white } from '../../hardcode/skin_imgs/main';
import ToastUtil from '../base/ToastUtil';
import ModelEvent from '../../utils/ModelEvent';
import { EVT_LOGIC_UPDATE_USER_INFO } from '../../hardcode/HLogicEvent';
import { THEME_COLOR } from '../../styles';
import RoomInfoCache from '../../cache/RoomInfoCache';
import { LIBRARY } from 'react-native-sound';


class _TagItem extends PureComponent {

    _onChangeText = () => {
        // console.log("_onChangeText");
        this.props.onPress && this.props.onPress(this.props.tagText);
    };

    render() {
        return (
            <TouchableOpacity
                onPress={this._onChangeText}>
                <Text
                    style={{
                        color: '#808080',
                        marginLeft: DesignConvert.getW(15),
                        marginRight: DesignConvert.getW(15),
                        marginTop: DesignConvert.getH(5),
                        marginBottom: DesignConvert.getH(5),
                        paddingLeft: DesignConvert.getW(10),
                        paddingRight: DesignConvert.getW(10),
                        paddingTop: DesignConvert.getH(5),
                        paddingBottom: DesignConvert.getH(5),
                        backgroundColor: '#F2F2F2',
                        borderRadius: DesignConvert.getW(4),
                    }}>{this.props.tagText}</Text>
            </TouchableOpacity>
        );
    }
}

export default class SearchView extends BaseView {

    constructor(props) {
        super(props);

        this._searchKey = '';
        this._userList = [];
        this._start = 1;
        this._end = 10;
        this._loadMoreEnable = false;
        this._roomList = [];
        this._index = 0;
        this._roomLoadMoreEnable = false;

        this._searchList = [];

        this._isShowRecord = true;
        //找房间        找主播
        this.selectTab = 0;
    }

    _onBackPress = () => {
        this.popSelf();
    };

    _onChangeSearchKey = (s) => {
        this._searchKey = s;
        this._isShowRecord = true;
        if (this._searchKey == '') {
            this.forceUpdate();
            this._updateSearchRecord();
        } else {
            this.forceUpdate();
        }

    };

    _onSearchTagPress = (s) => {
        this._searchKey = s;
        this._onSearch();

    };

    _updateSearchRecord() {
        // require('../../model/SearchModel').default.getSearchKeyStorage(this._searchKey)
        //     .then(data => {
        //         this._searchList = data;
        //         this.forceUpdate();
        //     });
    }

    _initUserData = () => {
        require('../../model/SearchModel').default.searchUserInfoList(this._searchKey, this._start, this._end)
            .then(data => {
                // console.log("_onSearch", data);
                if (this._start > 1) {
                    this._userList = this._userList.concat(data);
                } else {
                    this._userList = data;
                }
                this._start += 10;
                this._end += 10;
                this._loadMoreEnable = data.length > 0;
                this.forceUpdate();
            });
    };

    _initRoomData = () => {
        require('../../model/SearchModel').default.searchRoom(this._searchKey, this._index)
            .then(data => {
                // console.log("searchRoom", data);
                if (this._index > 0) {
                    this._roomList = this._roomList.concat(data);
                } else {
                    this._roomList = data;
                }
                this._index = this._index + this._roomList.length;
                this._roomLoadMoreEnable = data.length > 0;
                this.forceUpdate();
            });
    };

    _onSearch = () => {
        if (!this._searchKey) {
            return;
        }
        this._isShowRecord = false;
        this._start = 1;
        this._end = 10;
        this._initUserData();

        this._index = 0;
        this._initRoomData();
        require('../../model/SearchModel').default.saveSearchKeyStorage(this._searchKey);
    };

    _onClosedPress = () => {
        this._searchKey = '';
        this.forceUpdate();
        // this._updateSearchRecord();
    };

    _getRoomType = (roomType) => {
        let roomTypeName = '其他';
        this._roomTypeList.forEach(element => {
            if (roomType == element.id) {
                roomTypeName = element.type;
            }
        });
        return roomTypeName;
    };

    componentDidMount() {
        super.componentDidMount();
        require('../../model/main/HomePageModel').default.getRoomTypeList()
            .then(list => {
                this._roomTypeList = list;
                this.forceUpdate();
            });

        this._updateSearchRecord();
    }

    _loadMore = () => {
        if (this._loadMoreEnable) {
            this._initUserData();
        }
    };

    _roomLoadMore = () => {
        if (this._roomLoadMoreEnable) {
            this._initRoomData();
        }
    };


    _enterLiveRoom = (item) => {

        //在房间
        if (RoomInfoCache.isInRoom && item.roomId == RoomInfoCache.roomId) {
            require('../../model/room/RoomModel').getRoomDataAndShowView(RoomInfoCache.roomId);
            return;
        }

        require('../../model/room/RoomModel').default.enterLiveRoom(item.roomId, '')
    }
    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this._enterLiveRoom(item)
                }}
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(65),
                    paddingHorizontal: DesignConvert.getW(15),
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <Image
                    source={{ uri: Config.getRoomCreateLogoUrl(item.logoTime, item.roomId, item.base.userId, item.base.logoTime, item.base.thirdIconurl) }}
                    style={{
                        width: DesignConvert.getW(50),
                        height: DesignConvert.getH(50),
                        borderRadius: DesignConvert.getW(25),
                        marginRight: DesignConvert.getW(10),
                    }}>
                </Image>

                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        height: DesignConvert.getH(65),
                    }}>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <Image
                            source={require("../../hardcode/skin_imgs/search").ic_lock()}
                            style={{
                                width: DesignConvert.getW(14),
                                height: DesignConvert.getH(14),
                                marginRight: DesignConvert.getW(5),
                                display: item.password ? "flex" : "none",
                            }}>
                        </Image>

                        <Text
                            numberOfLines={1}
                            style={{
                                width:DesignConvert.getW(200),
                                color: "#121212",
                                fontSize: DesignConvert.getF(14),
                            }}>{decodeURI(item.roomName)}</Text>
                    </View>

                    <View
                        style={{
                            marginTop: DesignConvert.getH(7),
                            flexDirection: "row",
                            alignItems: "center",
                            height: DesignConvert.getH(15),
                        }}>

                        <View
                            style={{
                                width: DesignConvert.getW(5),
                                height: DesignConvert.getH(5),
                                borderRadius: DesignConvert.getW(5),
                                backgroundColor: '#4CF267',
                                marginRight: DesignConvert.getW(3),
                            }} />

                        <Text
                            style={{
                                color: "#949494",
                                fontSize: DesignConvert.getF(11),
                            }}>在线{`\tID:${item.roomId}`}</Text>
                    </View>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        // top: DesignConvert.getH(6.5),
                        right: DesignConvert.getW(15),
                        height:DesignConvert.getH(65),
                        alignItems:'center',
                        justifyContent:'center',
                    }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#8E7AFF', '#C17AFF']}
                        style={{
                            width: DesignConvert.getW(70),
                            height: DesignConvert.getH(29),
                            borderRadius: DesignConvert.getW(16),
                            borderWidth: DesignConvert.getW(1.5),
                            borderColor: '#5F1271',
                            alignItems:'center',
                            flexDirection:'row',
                        }}>
                            <Image
                                source={require('../../hardcode/skin_imgs/ccc').ttq_in_room()}
                                style={{
                                    width:DesignConvert.getW(16),
                                    height:DesignConvert.getH(16),
                                }}/>
                            <Text
                                style={{
                                    marginLeft:DesignConvert.getW(5),
                                    fontSize:DesignConvert.getF(11),
                                    color:'#FFFFFF',
                                }}>在房间</Text>
                        </LinearGradient>
                </View>
            </TouchableOpacity>
            // <RoomCardItem
            //     data={item}
            //     getRoomType={this._getRoomType} />
        )
    };
    _renderEmptyView = () => {
        return (
            <View
                style={{
                    height: DesignConvert.getH(200),
                    // width: DesignConvert.swidth,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    source={require('../../hardcode/skin_imgs/main').no_live2()}
                    style={{
                        width: DesignConvert.getW(109),
                        height: DesignConvert.getH(96.5),
                    }}></Image>
                <Text style={{
                    marginTop: DesignConvert.getH(16.5),
                    color: '#797979',
                    fontSize: DesignConvert.getF(15),
                }}>搜不到聊天室
                </Text>
            </View>
        );
    };
    _renderEmptyViewUser = () => {
        return (
            <View
                style={{
                    height: DesignConvert.getH(200),
                    // width: DesignConvert.swidth,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    source={require('../../hardcode/skin_imgs/main').no_live()}
                    style={{
                        width: DesignConvert.getW(109),
                        height: DesignConvert.getH(96.5),
                    }}></Image>
                <Text style={{
                    marginTop: DesignConvert.getH(16.5),
                    color: '#797979',
                    fontSize: DesignConvert.getF(15),
                }}>搜不到用户
                </Text>
            </View>
        );
    };

    _renderUserItem = ({ item }) => {
        return (
            <UserItem
                data={item} />
        )
    };

    _keyUserExtractor = (item, index) => item.base.userId;

    _keyRoomExtractor = (item, index) => item.roomId;

    _getViewPager = (ref) => {
        this.viewPager = ref;
    }

    _onPagerSelected = (e) => {
        this.selectTab = e.position;
        this.forceUpdate();
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                }}>

                <StatusBarView />


                <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(44),
                        // marginTop: DesignConvert.getH(20),
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>

                    <TouchableOpacity
                        style={{
                            marginLeft: DesignConvert.getW(15),
                        }}
                        onPress={this.popSelf}
                    >

                        <Image
                            source={ic_back_black()}
                            style={{
                                width: DesignConvert.getW(20),
                                height: DesignConvert.getH(20),
                            }} />
                    </TouchableOpacity>

                    <View
                        style={{
                            width: DesignConvert.getW(267),
                            height: DesignConvert.getH(34),
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: DesignConvert.getW(10),
                            backgroundColor: "#F9F9F9",
                            borderRadius: DesignConvert.getW(17),
                            marginLeft: DesignConvert.getH(15),
                        }}>



                        {/* <Image
                            source={require("../../hardcode/skin_imgs/search").ic_search()}
                            style={{
                                width: DesignConvert.getW(14),
                                height: DesignConvert.getH(14),
                                marginRight: DesignConvert.getW(10),
                            }}></Image> */}

                        <TextInput
                            style={{
                                flex: 1,
                                height: DesignConvert.getH(27),
                                color: "#1A1A1A",
                                fontSize: DesignConvert.getF(13),
                                // marginRight: DesignConvert.getW(10),
                                padding: 0,
                            }}
                            placeholder="搜索房间名称、用户昵称或ID"
                            value={this._searchKey}
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#CCCCCC"
                            returnKeyType="search"
                            onChangeText={this._onChangeSearchKey}
                            selectionColor={THEME_COLOR}
                            onSubmitEditing={this._onSearch}
                            text
                        ></TextInput>

                        <TouchableOpacity
                            onPress={this._onClosedPress}
                            style={{
                                width: DesignConvert.getW(16),
                                height: DesignConvert.getH(16),
                            }}>
                            <Image
                                style={{
                                    width: DesignConvert.getW(16),
                                    height: DesignConvert.getH(16),
                                }}
                                source={require("../../hardcode/skin_imgs/search").ic_gray_closed()}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: DesignConvert.getH(12),
                            minWidth: DesignConvert.getW(60),
                            flexDirection: "row-reverse",
                        }}
                        onPress={this._onSearch}
                    >

                        <Text
                            style={{
                                color: THEME_COLOR,
                                fontSize: DesignConvert.getF(14),
                                marginRight: DesignConvert.getW(15),
                            }}>搜索</Text>
                    </TouchableOpacity>

                </View>

                {/* <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(50),
                        flexDirection: "row",
                    }}>

                    <TouchableOpacity
                        onPress={() => {
                            this.selectTab = 0;
                            this.forceUpdate();
                            this.viewPager && this.viewPager.setPage(0);
                        }}
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}> */}

                {/* </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.selectTab = 1;
                            this.forceUpdate();
                            this.viewPager && this.viewPager.setPage(1);
                        }}
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}> */}
                {/* </TouchableOpacity>
                </View> */}

                {/* <ViewPager
                    initialPage={this.selectTab}
                    ref={this._getViewPager}
                    onPageSelected={this._onPagerSelected}
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.sheight - DesignConvert.getH(114) - DesignConvert.statusBarHeight,
                    }}> */}


                {/* <View> */}

                <FlatList
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={6}
                    data={this._roomList}
                    renderItem={this._renderItem}
                    numColumns={2}
                    keyExtractor={this._keyRoomExtractor}
                    ListEmptyComponent={this._renderEmptyView}
                    onEndReached={this._roomLoadMore}
                    onEndReachedThreshold={0.2}
                    // onLayout
                    ListHeaderComponent={<Text
                        style={styles._text}>房间</Text>}
                    style={{
                        width: DesignConvert.swidth,
                        // height:
                    }}
                />
                {/* </View> */}




                {/* <View> */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    // initialNumToRender={5}
                    data={this._userList}
                    renderItem={this._renderUserItem}
                    ListHeaderComponent={<Text
                        style={styles._text}>用户</Text>}
                    keyExtractor={this._keyUserExtractor}
                    ListEmptyComponent={this._renderEmptyViewUser}
                    onEndReached={this._loadMore}
                    onEndReachedThreshold={0.2}
                    style={{
                        width: DesignConvert.swidth,
                        marginTop: DesignConvert.getH(10),
                        // paddingLeft: DesignConvert.getW(13),
                        // paddingRight: DesignConvert.getW(6),
                    }}
                />
                {/* </View> */}

                {/* </ViewPager> */}

                {/* {(!this._userList || this._userList.length === 0 || this.selectTab == 0) ? null :
                    <View>
                        <Text
                            style={{
                                color: 'rgba(33, 33, 33, 1)',
                                fontSize: DesignConvert.getF(15),
                                marginLeft: DesignConvert.getW(20),
                                marginTop: DesignConvert.getH(20),
                                marginBottom: DesignConvert.getH(8),
                                fontWeight: 'bold',
                            }}>用户</Text>

                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            // horizontal={true}
                            // initialNumToRender={5}
                            data={this._userList}
                            renderItem={this._renderUserItem}
                            keyExtractor={this._keyUserExtractor}
                            // ListEmptyComponent={this._renderEmptyViewUser}
                            onEndReached={this._loadMore}
                            onEndReachedThreshold={0.2}
                            style={{
                                width: DesignConvert.swidth,
                                paddingLeft: DesignConvert.getW(13),
                                paddingRight: DesignConvert.getW(6),
                            }}
                        />
                    </View>
                }

                {(!this._roomList || this._roomList.length === 0 || this.selectTab == 1) ? null :
                    <View
                        style={{
                            flex: 1,
                            width: DesignConvert.swidth,
                        }}
                    >
                        <Text
                            style={{
                                color: 'rgba(33, 33, 33, 1)',
                                fontSize: DesignConvert.getF(15),
                                marginLeft: DesignConvert.getW(20),
                                marginTop: DesignConvert.getH(23),
                                marginBottom: DesignConvert.getH(15),
                                fontWeight: 'bold',
                            }}>房间</Text>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            initialNumToRender={6}
                            data={this._roomList}
                            renderItem={this._renderItem}
                            numColumns={2}
                            keyExtractor={this._keyRoomExtractor}
                            // ListEmptyComponent={this._renderEmptyViewUser}
                            onEndReached={this._roomLoadMore}
                            onEndReachedThreshold={0.2}
                            style={{

                                paddingLeft: DesignConvert.getW(20),
                                paddingRight: DesignConvert.getW(20),
                            }}
                        />
                    </View>
                } */}
            </View >
        );
    }
}

const styles = StyleSheet.create({
    _text: {
        fontSize: DesignConvert.getF(14),
        fontWeight: 'bold',
        color: "#140B37",
        marginTop: DesignConvert.getH(20),
        marginLeft: DesignConvert.getW(15),
        marginBottom: DesignConvert.getH(15),
    },
})
