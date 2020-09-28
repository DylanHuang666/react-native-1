'use strict'

import Config from "../../configs/Config";
import DesignConvert from "../../utils/DesignConvert";

export const room_hot = () => require('../../../images/main/room_hot.png');

export const float_btn_bg = () => require('../../../images/main/float_btn_bg.png');

export const room_closed = () => require('../../../images/main/room_closed.png');

export const play = () => require('../../../images/main/play.png');//({uri: Config.getRNImageUrl('main/play.png', 0)});

export const bg = () => require('../../../images/main/bg.png');

export const home = () => require('../../../images/main/home.png');

export const home_sel = () => require('../../../images/main/home_sel.png');

export const rank = () => require('../../../images/main/rank.png');

export const rank_sel = () => require('../../../images/main/rank_sel.png');

export const message = () => require('../../../images/main/message.png');

export const message_sel = () => require('../../../images/main/message_sel.png');

export const mine = () => require('../../../images/main/mine.png');

export const mine_sel = () => require('../../../images/main/mine_sel.png');

export const ic_gold = () => require('../../../images/ic_gold.png')

/**
 * HomePage
 */
export const banner_demo = () => require('../../../images/main/home/banner-demo.png');

export const ic_search = () => require('../../../images/main/home/ic_search.png');

export const ic_open = () => require('../../../images/main/home/ic_open.png');

export const ic_headlines = () => require('../../../images/main/home/ic_headlines.png');

export const ic_rank = () => require('../../../images/main/home/ic_rank.png');

export const lock = () => require('../../../images/main/home/lock.png');

export const card_bottom_bg = () => require('../../../images/main/home/card_bottom_bg.png');

export const no_live = () => require('../../../images/main/home/no_live.png');

export const no_live2 = () => require('../../../images/main/home/no_live2.png');

export const live_status_white = () => require('../../../images/main/home/live_status_white.gif');

export const home_bg_top = () => require('../../../images/main/home/home_bg_top.png');

export const room_type_bg = () => require('../../../images/main/home/room_type_bg.png');

export const room_type_bg1 = () => require('../../../images/main/home/room_type_bg1.png');


/**
 * MinePage
 */
export const icon_next = () => require('../../../images/mine/icon_next.png');

export const user_info_edit = () => require('../../../images/mine/user_info_edit.png');


export const mine_top_bg = () => require('../../../images/mine/top_bg.png');

export const mine_bottom_bg = () => require('../../../images/mine/bottom_bg.png');

export const mine_icon_copy = () => require('../../../images/mine/icon_copy.png');

export const mine_rich_lv = (richLv) => ({ uri: Config.getRNImageUrl("rich_lv/" + (richLv > 60 ? 60 : richLv) + "@2x.png", 11) });

export const mine_charm_lv = (charmLv) => ({ uri: Config.getRNImageUrl("charm_lv/" + (charmLv > 60 ? 60 : charmLv) + "@2x.png", 11) });

export const mine_coin_bg = () => require('../../../images/mine/mine_coin_borad.png');

export const mine_icon_income = () => require('../../../images/mine/icon_income.png');

export const mine_icon_level = () => require('../../../images/mine/icon_level.png');

export const mine_icon_help = () => require('../../../images/mine/icon_help.png');

export const mine_icon_setting = () => require('../../../images/mine/mine_icon_setting.png');

export const mine_icon_wallet = () => require('../../../images/mine/mine_icon_wallet.png');

export const mine_icon_rank = () => require('../../../images/mine/mine_icon_rank.png');

export const mine_icon_benefit = () => require('../../../images/mine/mine_icon_benefit.png');

export const upload_photo = () => require('../../../images/mine/upload_photo.png');

export const mine_board_money = () => require('../../../images/mine/mine_board_money.png');

export const mine_room = () => require('../../../images/mine/mine_room.png');

export const mine_home = () => require('../../../images/mine/mine_home.png');

export const mine_about = () => require('../../../images/mine/mine_about.png');

export const mine_reload = () => require('../../../images/mine/mine_reload.png');

export const mine_cert_name = () => require('../../../images/mine/mine_cert_name.png');

export const mine_bindphone = () => require('../../../images/mine/mine_bindphone.png');

export const mine_setpsw = () => require('../../../images/mine/mine_setpsw.png');

export const mine_pay_psw = () => require('../../../images/mine/mine_pay_psw.png');

export const mine_arrow_right = () => require('../../../images/mine/mine_arrow_right.png');



//我的等级
export const ic_first = () => require('../../../images/leveldescription/ic_first.png');

export const ic_second = () => require('../../../images/leveldescription/ic_second.png');

export const ic_third = () => require('../../../images/leveldescription/ic_third.png');

export const ic_doubt = () => require('../../../images/leveldescription/ic_doubt.png');

export const ic_rank_exp = () => require('../../../images/leveldescription/ic_rank_exp.png');

export const level_charm_top_bg = () => require('../../../images/leveldescription/level_charm_top_bg.png');

export const level_rich_top_bg = () => require('../../../images/leveldescription/level_rich_top_bg.png');

export const level_charm_bg = () => require('../../../images/leveldescription/level_charm_bg.png');

export const level_rich_bg = () => require('../../../images/leveldescription/level_rich_bg.png');

export const level_rich_level = () => require('../../../images/leveldescription/level_rich_level.png');

export const level_rich_entry = () => require('../../../images/leveldescription/level_rich_entry.png');

export const level_charm_level = () => require('../../../images/leveldescription/level_charm_level.png');

export const level_rich_detail = () => Config.getRNImageUrl("leveldescription/level_rich_detail.png", 2, 2804, 14516);

export const level_charm_detail = () => Config.getRNImageUrl("leveldescription/level_charm_detail.png", 2, 2804, 14516);

/**
 * Rank
 */
export const rank_middle_bg = () => require('../../../images/rankpage/middle_bg.png');

export const rank_no_1 = () => require('../../../images/rankpage/no_1.png');

export const rank_no_2 = () => require('../../../images/rankpage/no_2.png');

export const rank_no_3 = () => require('../../../images/rankpage/no_3.png');
//头条
export const rank_in_the_room = () => require('../../../images/rankpage/in_the_room.png');

export const aboutus_logo = () => require('../../../images/logo.png');

export const page_close_ic = () => require('../../../images/page_close_ic.png');


/**
 * Message
 */
export const ic_more = () => require('../../../images/message/ic_more.png');

export const friend_sign = () => require('../../../images/message/friend_sign.png');

export const no_friend2 = () => require('../../../images/message/no_friend2.png');

export const no_message = () => require('../../../images/message/no_message.png');

export const no_official_message = () => require('../../../images/message/no_official_message.png');

export const ic_customer_service = () => require('../../../images/message/ic_customer_service.png');

export const ic_offical_sign = () => require('../../../images/message/ic_offical_sign.png');

export const ic_offical_message = () => require('../../../images/message/ic_offical_message.png')

export const msg_arrow_right = () => require('../../../images/message/msg_arrow_right.png');

export const rank_bg_icon = () => require('../../../images/main/rank_bg_icon.png');

export const rank_orange_bg_icon = () => require('../../../images/main/rank_orange_bg_icon.png');

export const rank_top_bg = () => require('../../../images/main/rank_top_bg.png');

export const gongxian_hot = () => require('../../../images/main/gongxian_hot.png');

export const meili_hot = () => require('../../../images/main/meili_hot.png');

export const rank_three = () => require('../../../images/main/rank_three.png');

export const rank_two = () => require('../../../images/main/rank_two.png');

export const rank_one = () => require('../../../images/main/rank_one.png');

export const gx_hot = () => require('../../../images/main/gx_hot.png');


/**
 * setting
 */
export const set_pwd = () => require('../../../images/setting/ic_pwd.png');

export const set_pay_pwd = () => require('../../../images/setting/ic_pay_pwd.png');

export const set_clean = () => require('../../../images/setting/ic_clean.png');

export const set_update = () => require('../../../images/setting/ic_update.png');

export const set_black_list = () => require('../../../images/setting/ic_black_list.png');

export const set_about = () => require('../../../images/setting/ic_about.png');

export const set_cer = () => require('../../../images/setting/ic_cer.png');

export const set_exit = () => require('../../../images/setting/ic_exit.png');

export const ic_next_white = () => require('../../../images/ic_next_white.png');

export const ic_zadan_logo = () => require('../../../images/ic_zadan_logo.png');

export const ic_bind_phonum = () => require('../../../images/setting/ic_bind_phonum.png');
