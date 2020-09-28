/**
 * 主界面 -> 首页 -> 在线房间列表
 */
'use strict';

import moment from 'moment';
import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
// import LinearGradient from 'react-native-linear-gradient';
// import HClientTables from '../../../hardcode/HClientTables';
import DesignConvert from '../../../utils/DesignConvert';
import { THEME_COLOR } from '../../../styles';

const TabItem = props => {
    const { isSelected, index, title, onPress } = props;

    const itemClick = () => {
        onPress(title, index);
    }

    return (
        <TouchableOpacity
            style={{
                marginRight: DesignConvert.getW(20),

                backgroundColor: isSelected ? null : null,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onPress={itemClick}
        >
            <Text
                style={{
                    color: isSelected ? '#121212' : '#121212',
                    fontSize: isSelected ? DesignConvert.getF(17) : DesignConvert.getF(14),
                    fontWeight: isSelected ? "bold" : "normal",
                }}
            >{title}</Text>
            {isSelected && <View
                style={{
                    width: DesignConvert.getW(12),
                    height: DesignConvert.getH(5),
                    borderRadius: DesignConvert.getW(5),

                    backgroundColor: '#8E7AFF',

                    marginTop: DesignConvert.getH(3)
                }}
            />}
        </TouchableOpacity>
    );
};

export default class RoomTabs extends React.Component {
    constructor(props) {
        super(props);

        this.defaultSelected = props.defaultSelected;
        this.items = props.items;
        this.itemClick = props.itemClick;
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.defaultSelected = nextProps.defaultSelected;
        this.items = nextProps.items;
        return true;
    }

    _scrollToItem = () => {
        this._scrollView && this._scrollView.scrollTo({ x: this.defaultSelected * DesignConvert.getW(40), y: 0, animated: false })
    }

    render() {
        this._scrollToItem();
        return (
            <View
                style={[{
                    width: DesignConvert.swidth,
                    marginTop: DesignConvert.getH(15)
                }, this.props.style]}>
                <ScrollView
                    ref={ref => {
                        this._scrollView = ref;
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingLeft: DesignConvert.getW(15),
                    }}>
                    {this.items.map((item, i) => (
                        <TabItem
                            key={i}
                            index={i}
                            title={item.type}
                            isSelected={this.defaultSelected == i}
                            onPress={this.itemClick} />
                    ))}

                </ScrollView>
            </View>
        )
    }
}
