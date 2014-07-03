(function(d){
var e = d.getElementById('bn_gbox').getElementsByTagName('meta');
var date_from = trimDate(new Date(e[1].content));
var date_to = new Date(date_from.getTime() + 3600000);
var meta = d.getElementsByTagName('head')[0].getElementsByTagName('meta');
var title;
var c = 0;
while(meta.length > c + 1){
	if(meta[c].getAttribute("property") === 'og:title'){
		title = meta[c].content;
		break;
	}
	c++;
}
function trimDate(date){
	var minite = date.getMinutes();
	var new_date = date;
	switch(minite) {
		case 20:
		case 50:
			new_date = new Date(date.getTime() + 600000);
			break;
		case 27:
		case 57:
			new_date = new Date(date.getTime() + 180000);
			break;
		case 30:
			new_date = new Date(date.getTime() + 1800000);
			break;
	}
	return new_date;
}
var getUTC = function(date){
	return date.getUTCFullYear() +
		zerofill(date.getUTCMonth()+1) +
		zerofill(date.getUTCDate()) +
		'T' +
		zerofill(date.getUTCHours()) +
		zerofill(date.getUTCMinutes()) +
		zerofill(date.getUTCSeconds()) +
		'Z';
};
var zerofill = function(num){
	return ('0'+num).slice(-2);
};
var getURL = function(from, to, text){
  return 'http://www.google.com/calendar/event?' +
  'action=' + 'TEMPLATE' +
  '&text='  + encodeURIComponent(text) +
  '&dates=' + getUTC(from) + '/' + getUTC(to) +
  '&trp='   + 'false';
  '&sprop=&sprop=name:';
};
d.location = getURL(date_from, date_to, title);
})(document);
