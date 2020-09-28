'use strict'

import Config from "../../configs/Config";

export const ic_cer_back = () => Config.getRNImageUrl('certification/ic_cer_back.png', 0);

export const ic_cer_font = () => Config.getRNImageUrl('certification/ic_cer_font.png', 0);

export const ic_pic = () => ({uri: Config.getRNImageUrl('certification/ic_pic.png', 0)});

export const ic_report = () => ({uri: Config.getRNImageUrl('certification/ic_report.png', 0)});
