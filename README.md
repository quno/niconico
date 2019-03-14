niconico
========

* nicobml.js

ニコニコ生放送の予定をGoogleカレンダーに追加するブックマークレット。  
nicobml.jsを外部JSとしてブックマークレットで呼び出す仕組み。  
以下のような放送予定のURLで起動する。（放送中/終了は無効）  
	・http://live.nicovideo.jp/watch/lv0000000000  
	・http://live.nicovideo.jp/gate/lv0000000000  

### 使い方

1. 下記のコードをブックマークとして登録
```
javascript:(()=>{let%20d=document;let%20script=d.createElement('script');script.setAttribute('src','https://cdn.jsdelivr.net/gh/quno/niconico@latest/nicobml.js');d.body.appendChild(script);})();
```
2. 生放送のページでブックマークレットを起動
