(() => {
	// 開場時間を開演時間に変更（10分前、3分前、30分前に対応）
	const trimDatetime = (date) => {
		switch (date.getMinutes()) {
			case 20:
			case 50:
				return new Date(date.getTime() + 600000);
			case 27:
			case 57:
				return new Date(date.getTime() + 180000);
			case 30:
				return new Date(date.getTime() + 1800000);
			default:
				return date;
		}
	};
	// 日時の表示形式変換
	const getUTC = (date) => {
		const pad = (n) => {
			return n < 10 ? '0' + n : n;
		}
		return '' +
			date.getUTCFullYear() +
			pad(date.getUTCMonth() + 1) +
			pad(date.getUTCDate()) +
			'T' +
			pad(date.getUTCHours()) +
			pad(date.getUTCMinutes()) +
			pad(date.getUTCSeconds()) +
			'Z';
	};
	// GoogleカレンダーURL作成
	const generateURL = (from, to, title, url) => {
		return 'https://www.google.com/calendar/render?' +
			'action=' + 'TEMPLATE' +
			'&text=' + encodeURIComponent(title) +
			'&dates=' + getUTC(from) + '/' + getUTC(to) +
			'&details=' + encodeURIComponent(url) +
			'&location=' +
			'&trp=true&sf=true&output=xml';
	};
	try {
    const doc = document;
		// エラー処理
		const loc = doc.URL;
		if (loc.indexOf('live.nicovideo.jp/watch/lv') < 0 && loc.indexOf('live.nicovideo.jp/gate/lv') < 0) {
			throw 'このURLでは無効です。';
		}
		let date_published = doc.querySelector('meta[itemprop="datePublished"]');
		if (date_published === null) {
			throw '現在は使用できません。';
		}
		// 開演時間
		let datetime_from = trimDatetime(new Date(date_published.content));
		// 終了時間（1時間後）
		let datetime_to = new Date(datetime_from.getTime() + 3600000);
		// 生放送タイトル・URL
		let live_title = doc.querySelector('meta[property="og:title"]').content;
		let live_url = doc.querySelector('meta[property="og:url"]').content;
		// Googleカレンダーに移動
    let calender_url = generateURL(datetime_from, datetime_to, live_title, live_url);
    windows.open(calender_url, '_blank');
	} catch (e) {
		alert(e);
	}
})();
