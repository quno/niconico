(function(d){
try{
	//エラー処理
	if(location.toString().indexOf('live.nicovideo.jp/watch/lv') < 0 && location.toString().indexOf('live.nicovideo.jp/gate/lv') < 0) throw 'このURLでは無効です。';
	var date_published = d.querySelector('meta[itemprop="datePublished"]');
	if(date_published === null) throw '現在は使用できません。';
	//開演時間
	var date_from = trimDate(new Date(date_published.content));
	//終了時間（1時間後）
	var date_to = new Date(date_from.getTime() + 3600000);
	//生放送タイトル・URL
	var title = d.querySelector('meta[property="og:title"]').content;
	var url = d.querySelector('meta[property="og:url"]').content;
	//Googleカレンダーに移動
	location.href = getURL(date_from, date_to, title, url);
}catch(e){
	console.error(e);
}
//開場時間を開演時間に変更（10分前、3分前、30分前に対応）
function trimDate(date){
	switch(date.getMinutes()){
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
}
//日時の表示形式変換
function getUTC(date){
	function pad(n){ return n < 10 ? '0'+n : n; }
	return date.getUTCFullYear() +
		pad(date.getUTCMonth()+1) +
		pad(date.getUTCDate()) +
		'T' +
		pad(date.getUTCHours()) +
		pad(date.getUTCMinutes()) +
		pad(date.getUTCSeconds()) +
		'Z';
}
//GoogleカレンダーURL作成
function getURL(date_from, date_to, title, url){
  return 'https://www.google.com/calendar/render?' +
  'action='    + 'TEMPLATE' +
  '&text='     + encodeURIComponent(title) +
  '&dates='    + getUTC(date_from) + '/' + getUTC(date_to) +
  '&details='  + encodeURIComponent(url) +
  '&location=' +
  '&trp=true&sf=true&output=xml';
};
})(document);
