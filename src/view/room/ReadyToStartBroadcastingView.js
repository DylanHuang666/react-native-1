/**
 * 开播设置
 */
'use strict';

import React, { PureComponent } from 'react';
import BaseView from "../base/BaseView";
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import DesignConvert from '../../utils/DesignConvert';
import ImagePicker from 'react-native-image-crop-picker';
import { THEME_COLOR } from '../../styles';
import BackTitleView from "../base/BackTitleView";
import LinearGradient from 'react-native-linear-gradient';
import { ic_close, ic_close_white, ic_pic } from '../../hardcode/skin_imgs/room';
import { ttq_agree_icon } from '../../hardcode/skin_imgs/ccc';

class RoomTypeItem extends PureComponent {

    _onPress = () => {
        this.props.onPress(this.props.index, this.props.data);
    }

    render() {

        const textStyle = this.props.selected
            ? {
                color: '#8E7AFF',
                fontSize: DesignConvert.getF(13),
            }
            : {
                color: '#FFFFFF88',
                fontSize: DesignConvert.getF(13),
            };

        return (
            <TouchableOpacity
                style={{
                    marginRight: DesignConvert.getW(18),
                    marginBottom: DesignConvert.getH(12.5),
                }}
                onPress={this._onPress}
            >
                <LinearGradient
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 0.5, y: 0 }}
                    colors={this.props.selected ? ["#FFFFFF", "#FFFFFF"] : ["#00000066", "#00000066"]}
                    style={{
                        width: DesignConvert.getW(68),
                        height: DesignConvert.getH(29),
                        borderRadius: DesignConvert.getW(14.5),
                        borderWidth: DesignConvert.getW(1),
                        borderColor: this.props.selected ? '#8E7AFF' : '#FFFFFF',
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={textStyle}
                    >{this.props.data.type}</Text>
                </LinearGradient>
            </TouchableOpacity>

        );
    }
}

class RoomTypesListView extends PureComponent {

    _onPress = (index, data) => {
        this.props.onChangeRoomType(index, data);
    }

    _renderItems() {
        if (!this.props.datas || this.props.datas.length == 0) {
            return null;
        }

        const ret = [];

        for (let i = 0; i < this.props.datas.length; ++i) {
            ret.push(
                <RoomTypeItem
                    key={i}
                    selected={this.props.selectedIndex == i}
                    index={i}
                    data={this.props.datas[i]}
                    onPress={this._onPress}
                />
            );
        }
        return ret;
    }

    render() {
        return (
            <View
                style={{
                    marginTop: DesignConvert.getW(12),
                    // marginLeft: DesignConvert.getW(15),
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}
            >
                {this._renderItems()}
            </View>
        )
    }
}


export default class ReadyToStartBroadcastingView extends BaseView {

    constructor(props) {
        super(props);
        this._myHead = null;
        this._roomHead = null;

        this._bAgree = true;

        this._iRoomTypeList = null;
        this._selectIndex = 0;
        this._selectData = null;
    }

    componentDidMount() {
        super.componentDidMount();

        require('../../model/user/UserInfoModel').default.getMyHeadUrl(Math.ceil(DesignConvert.toPixel(70)))
            .then(uri => {
                if (uri) {
                    this._myHead = uri;
                    this.forceUpdate();
                }

            });

        require('../../model/room/ReadyToStartBroadcastingModel').default.getInfo()
            .then(data => {
                if (!data) return;
                this._roomOpenInfo = data.roomOpenInfo
                this._iRoomTypeList = data.iRoomTypeList;
                this._selectIndex = data.selectIndex;
                this._selectData = this._iRoomTypeList[this._selectIndex];
                this.forceUpdate();
            });
    }

    onResume(prevView) {
        //判定是否上一个界面是直播间,如果是就关闭自己拉
        if (require('../../router/level2_router').isLiveRoomView(prevView)) {
            this.popSelf();
        }
    }

    _onChangeRoomIcon = async () => {
        let data = await require("../../model/PermissionModel").checkUploadPhotoPermission();
        if (data) {
            let image = await ImagePicker.openPicker({
                mediaType: "photo",
                width: 400,
                height: 400,
                cropping: true,
            });
            this._roomImagPath = image.path;
            this._myHead = { uri: image.path };
            this._roomHead = { uri: image.path };
            this.forceUpdate();
        }
    }

    _onChangeRoomName = s => {
        this._selectData && (this._selectData.roomName = s);
    }

    _onChangeRoomNotice = s => {
        this._selectData && (this._selectData.notice = s);
    }

    _onChangeRoomType = (index, data) => {
        if (this._selectIndex == index) {
            return;
        }

        this._selectIndex = index;
        this._selectData = data;
        this.forceUpdate();
    }

    _onAgree = () => {
        this._bAgree = !this._bAgree;
        this.forceUpdate();
    }

    _onStart = () => {
        if (!this._bAgree) return require('../../view/base/ToastUtil').default.showCenter('请勾选用户许可协议')

        require('../../model/room/ReadyToStartBroadcastingModel').default.start(
            this._selectData,
            this._roomImagPath
        );
    }

    _onOpenAgree = () => {
        // alert('todo: 打开协议');
    }

    render() {
        const roomName = this._selectData ? this._selectData.roomName : '';
        const roomNotic = this._roomOpenInfo ? this._roomOpenInfo.notic : ''
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    paddingLeft: DesignConvert.getW(30),
                }}
            >
                <Image
                    style={{
                        position: 'absolute',
                        flex: 1,
                        width: DesignConvert.swidth,
                        height: DesignConvert.sheight,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                    resizeMode={'cover'}
                    source={require('../../hardcode/skin_imgs/ccc').ttq_open_bg()}
                />

                {/* <BackTitleView
                    onBack={this.popSelf}
                    titleText={'创建房间'}
                    leftImg={require('../../hardcode/skin_imgs/ccc').ttq_left_arrow()}
                    backImgStyle={{
                        tintColor: '#FFFFFF',
                    }}
                    titleTextStyle={{
                        color: '#FFFFFF',
                        fontSize: DesignConvert.getF(18),
                        fontWeight: 'bold',
                    }}
                /> */}
                <TouchableOpacity
                    onPress={this.popSelf}
                    style={{
                        marginTop: DesignConvert.statusBarHeight,
                        height: DesignConvert.getH(44),
                    }}>
                    <Image
                        source={ic_close_white()}
                        style={{
                            position: 'absolute',
                            top: DesignConvert.getH(12),
                            right: DesignConvert.getW(20),
                            width: DesignConvert.getW(21),
                            height: DesignConvert.getH(21),
                            resizeMode: 'center',
                        }} />
                </TouchableOpacity>

                <Text
                    style={{
                        fontSize: DesignConvert.getF(12),
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        marginTop: DesignConvert.getH(20),
                    }}
                >
                    {'房间封面'}
                </Text>

                <TouchableOpacity
                    style={{
                        marginTop: DesignConvert.getH(15),
                        width: DesignConvert.getW(120),
                        height: DesignConvert.getH(120),
                        borderRadius: DesignConvert.getW(15),
                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#FFFFFF',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={this._onChangeRoomIcon}
                >
                    {this._roomHead != null ? <Image
                        style={{
                            width: DesignConvert.getW(120),
                            height: DesignConvert.getH(120),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: DesignConvert.getW(15),
                            borderWidth: DesignConvert.getW(1.5),
                            borderColor: '#FFFFFF',
                        }}
                        source={this._roomHead}
                    /> : <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                            <Image
                                source={ic_pic()}
                                style={{
                                    width: DesignConvert.getW(32),
                                    height: DesignConvert.getH(38.5),
                                    resizeMode: 'contain',
                                }} />
                            <Text
                                style={{
                                    marginTop: DesignConvert.getH(8),
                                    fontSize: DesignConvert.getF(12),
                                    color: '#E6EAF2',
                                }}>上传封面</Text>
                        </View>}


                </TouchableOpacity>

                <Text
                    style={{
                        fontSize: DesignConvert.getF(12),
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        marginTop: DesignConvert.getH(30),
                    }}
                >
                    {'房间名称'}
                </Text>

                {/* <View
                    style={{
                        backgroundColor: '#00000066',
                        width: DesignConvert.getW(185),
                        height: DesignConvert.getH(37),
                        justifyContent: 'center',
                        borderTopRightRadius: DesignConvert.getW(42.5),
                        borderBottomRightRadius: DesignConvert.getW(42.5),
                        marginTop: DesignConvert.getH(12),
                    }}
                > */}
                <TextInput
                    style={{
                        marginTop: DesignConvert.getH(15),
                        color: '#FFFFFF',
                        fontSize: DesignConvert.getF(14),
                        padding: 0,
                        paddingLeft: DesignConvert.getW(15),
                        paddingRight: DesignConvert.getW(8),
                        borderRadius: DesignConvert.getW(10),
                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#FFFFFF',
                        width: DesignConvert.getW(315),
                        height: DesignConvert.getH(50),
                    }}
                    maxLength={20}
                    underlineColorAndroid="transparent"
                    placeholder="给房间取一个好听的名字吧~"
                    placeholderTextColor="#FFFFFF88"
                    selectionColor={THEME_COLOR}
                    editable={Boolean(this._selectData)}
                    defaultValue={roomName}
                    onChangeText={this._onChangeRoomName}
                />
                {/* </View> */}

                <Text
                    style={{
                        fontSize: DesignConvert.getF(12),
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        marginTop: DesignConvert.getH(30),
                    }}
                >
                    {'房间分类'}
                </Text>

                <RoomTypesListView
                    datas={this._iRoomTypeList}
                    selectedIndex={this._selectIndex}
                    onChangeRoomType={this._onChangeRoomType}
                />

                {/* <View
                    style={{
                        position: 'absolute',
                        top: DesignConvert.getH(221),
                        width: DesignConvert.getW(331),
                        height: DesignConvert.getH(192),
                        flexDirection: 'column',
                        // justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: '#D8D8D833',
                        borderRadius: DesignConvert.getW(8),
                        paddingLeft: DesignConvert.getW(18),
                        paddingRight: DesignConvert.getW(18),
                        marginTop: DesignConvert.getH(40),
                    }}
                >

                    <View
                        style={{
                            backgroundColor: '#FFFFFF80',
                            width: DesignConvert.getW(295),
                            height: DesignConvert.getH(0.5)
                        }} />

                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                        }}

                    >
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: DesignConvert.getF(15),
                                marginTop: DesignConvert.getH(10),
                            }}
                        >房间公告：</Text>

                        <TextInput
                            style={{
                                flex: 1,
                                fontSize: DesignConvert.getF(15),
                                color: '#FFFFFF',
                                textAlignVertical: 'top',
                            }}
                            multiline={true}
                            maxLength={150}
                            placeholder='请输入房间公告'
                            placeholderTextColor='#FFFFFF80'
                            defaultValue={decodeURIComponent(roomNotic)}
                            onChangeText={this._onChangeRoomNotice}
                        >

                        </TextInput>

                    </View>
                </View> */}



                <View
                    style={{
                        position: 'absolute',
                        bottom: DesignConvert.getH(110),
                        left: DesignConvert.getW(80.5),
                        width: DesignConvert.swidth,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >

                    {/* <View
                        style={{
                            alignItems: 'center',
                            marginBottom: DesignConvert.getH(14.5),
                        }}
                    > */}
                    <TouchableOpacity
                        onPress={this._onAgree}
                        style={{
                            width: DesignConvert.getW(20),
                            height: DesignConvert.getH(20),
                            borderRadius: DesignConvert.getW(10),
                            borderWidth: DesignConvert.getW(1),
                            borderColor: '#8E7AFF',

                        }}
                    >
                        {this._bAgree && <Image
                            style={{
                                width: DesignConvert.getW(18),
                                height: DesignConvert.getH(18),

                                position: 'absolute',
                                left: 0,
                                top: 0
                            }}
                            source={ttq_agree_icon()}
                        // source={this._bAgree ? require('../../hardcode/skin_imgs/ccc').ttq_agree_icon() : require('../../hardcode/skin_imgs/ccc').ttq_disagree_icon()}
                        />}
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(12),
                            color: 'rgba(255, 255, 255, 0.6)',
                            marginLeft: DesignConvert.getW(4.5),
                        }}
                    >
                        {'开播默认同意遵守'}
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(12),
                                color: '#FFFFFF',
                            }}>《直播管理条例》</Text>
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: DesignConvert.getH(30),
                        left: DesignConvert.getW(57.5),
                    }}
                    onPress={this._onStart}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#8E7AFF', '#C17AFF']}

                        style={{
                            width: DesignConvert.getW(260),
                            height: DesignConvert.getH(50),
                            borderRadius: DesignConvert.getW(25),
                            borderWidth: DesignConvert.getW(1.5),
                            borderColor: '#5F1271',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: DesignConvert.getF(12),
                            }}
                        >{'开始直播'}</Text>
                    </LinearGradient>
                </TouchableOpacity>
                {/* </View> */}

                {/* <View
                    style={{
                        position: 'absolute',
                        bottom: DesignConvert.getHeight(103),
                        left: DesignConvert.getW(77),

                        flexDirection: 'row',
                        // justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <CheckBoxView
                        bChecked={this._bAgree}
                        onPress={this._onAgree}
                    />

                    <Text
                        style={{
                            marginLeft: DesignConvert.getW(8),
                            color: '#19181A',
                            fontSize: DesignConvert.getF(12),
                        }}
                    >开播即表示同意遵守</Text>

                    <TouchableOpacity
                        onPress={this._onOpenAgree}
                    >
                        <Text
                            style={{
                                color: '#1A1A1A',
                                fontSize: DesignConvert.getF(12),
                            }}
                        >《用户许可协议》</Text>
                    </TouchableOpacity>
                </View> */}

            </View>
        );
    }
}