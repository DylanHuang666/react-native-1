'use strict';

import React, { PureComponent } from "react";
import { Text } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";



export default class _PublicScreenMessageTipsItem extends PureComponent {

    render() {
        return (
            <Text
                style={{
                    marginTop: DesignConvert.getH(6),
                    marginBottom: DesignConvert.getH(6),

                    flexWrap: 'wrap',

                    maxWidth: DesignConvert.getW(256),
                    minWidth: DesignConvert.getW(100),

                    color: 'white',
                    fontSize: DesignConvert.getF(11),

                    backgroundColor: '#00000033',
                    borderRadius: DesignConvert.getW(4),
                    padding: DesignConvert.getW(10),
                    includeFontPadding: false,
                }}

            >{this.props.data}</Text>

        )
    }
}
