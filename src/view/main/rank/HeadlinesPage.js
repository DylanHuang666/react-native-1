
/**
 *  榜单 -> 头条
 */
'use strict';

import React, { PureComponent } from "react";
import { View, FlatList, Text, Image, TouchableOpacity, } from "react-native";
import { ViewPager, PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import LinearGradient from 'react-native-linear-gradient';
import DesignConvert from "../../../utils/DesignConvert";
import Config from "../../../configs/Config";
import ModelEvent from "../../../utils/ModelEvent";
import { EVT_LOGIC_UPDATE_RANK_PAGE_INDEX } from "../../../hardcode/HLogicEvent";
import HGlobal from "../../../hardcode/HGLobal";
import RoomInfoCache from "../../../cache/RoomInfoCache";
import {
    ic_headline,
    double_arrow_right,
    ic_hot,
} from "../../../hardcode/skin_imgs/headline";
import HeadlinesItem from "./item/HeadlinesItem";


export default class HeadlinesPage extends PureComponent {

    constructor(props) {
        super(props);

        this._list = [];

        this._isLoading = false;
    }

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_LOGIC_UPDATE_RANK_PAGE_INDEX, this._initData);
        this._initData();
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_LOGIC_UPDATE_RANK_PAGE_INDEX, this._initData);
    }

    _onRefresh = () => {
        this._isLoading = true;
        this.forceUpdate();
        this._initData();
    }


    _initData = () => {
        require("../../../model/main/RankPageModel").default.getSmashList()
            .then(data => {
                this._list = data;
                // console.log("刷新头条", data)
                this._isLoading = false;
                this.forceUpdate();
            });
    }


    _renderItem = ({ item, index }) => (
        <HeadlinesItem
            item={item}
        />
    )

    _renderEmptyView = () => {
        return (
            <View style={{
                height: DesignConvert.getH(30),
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <Text style={{
                    color: '#999999',
                    fontSize: DesignConvert.getH(14),
                    marginTop: DesignConvert.getH(5),
                    marginBottom: DesignConvert.getH(15),
                }}
                ></Text>
            </View>
        )
    }

    _renderHeadView = () => {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(54),
                    paddingHorizontal: DesignConvert.getW(15),
                    flexDirection: "row",
                    alignItems: "center",
                }}>

                <Image
                    source={ic_headline()}
                    style={{
                        width: DesignConvert.getW(16),
                        height: DesignConvert.getH(16),
                        marginRight: DesignConvert.getW(10),
                    }}></Image>

                <Text
                    style={{
                        color: "#212121",
                        fontSize: DesignConvert.getF(13),
                    }}>
                    {"最新头条记录"}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <FlatList
                style={[
                    {
                        width: DesignConvert.swidth,
                        marginTop: DesignConvert.getH(10)
                    },
                    // {
                    //     marginBottom: DesignConvert.getH(45) + DesignConvert.addIpxBottomHeight(),
                    // }, 
                    this.props.style
                ]}
                data={this._list}
                renderItem={this._renderItem}
                refreshing={this._isLoading}
                onRefresh={this._onRefresh}
                // ListHeaderComponent={this._renderHeadView}
                ListFooterComponent={this._renderEmptyView}
                showsVerticalScrollIndicator={false}
                initialNumToRender={9}
            />
        );
    }
}
