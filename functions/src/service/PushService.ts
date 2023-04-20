import * as functions from 'firebase-functions';
import { getMessaging, Message } from 'firebase-admin/messaging';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../lib/SupabaseSchema';

export default class PushService {
  supabase: SupabaseClient | undefined;

  setSupabase(url: string, secretKey: string) {
    if (this.supabase != undefined) return;
    console.log('connect to supabase');
    this.supabase = createClient<Database>(
      url, secretKey
    );
  }

  public async sendPush() {
    if (this.supabase == undefined) return false;

    // データ取得
    const date = new Date();
    date.setMinutes(date.getMinutes() - 5);
    const noticeList = await this.supabase
      .from('v_notice_push')
      .select('*')
      .filter('created_at', 'gte', date.toISOString());
    functions.logger.info('date >= ' + date.toISOString());
    functions.logger.info('notice count: ' + noticeList.data?.length);

    if (noticeList.data == null || noticeList.data.length == 0) {
      functions.logger.info('no notice data');
      return true;
    }

    // Push送信
    const messaging = getMessaging();
    const messageList: Message[] = [];
    for (const notice of noticeList.data) {
      if (notice.fcm_tokens == null) continue;

      let body = '';
      switch (notice.notice_type) {
        case 200:
          body =
            notice.user_name +
            'さんが部屋"' +
            notice.room_title +
            '"を作りました';
          break;
        case 300:
          body =
            notice.user_name +
            'さんが部屋"' +
            notice.room_title +
            '"に参加しました';
          break;
        case 302:
          body =
            notice.user_name +
            'さんが部屋"' +
            notice.room_title +
            '"へのお誘いを断りました';
          break;
        case 310:
          body = '部屋"' + notice.room_title + '"へのお誘いが来ています！';
          break;
      }
      if (body == '') continue;

      for (const token of notice.fcm_tokens) {
        functions.logger.info(
          'type: ' + notice.notice_type + ' token: ' + token.substring(0, 6)
        );
        messageList.push({
          notification: { body: body },
          token: token,
        });
      }
    }

    await messaging.sendAll(messageList);

    // データ更新
    functions.logger.info(noticeList.data.map((notice) => notice.notice_id));
    await this.supabase
      .from('notice')
      .update({ pushed: true })
      .in(
        'notice_id',
        noticeList.data.map((notice) => notice.notice_id)
      );

    return true;
  }
}
