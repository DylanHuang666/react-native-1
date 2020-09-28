/**
 * 主界面 -> 首页 -> Item
 */
'use strict';

import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, FlatList, ScrollView, RefreshControl, StatusBar } from 'react-native';
import DesignConvert from '../../../utils/DesignConvert';
import LinearGradient from 'react-native-linear-gradient';


export function TouchImg(props) {

    const { imgStyle, containerStyle, source, onPress } = props

    return (
        <TouchableOpacity
            onPress={onPress}
            style={containerStyle}
        >

            <Image
                style={imgStyle}
                source={source}
            />


        </TouchableOpacity>
    )
}