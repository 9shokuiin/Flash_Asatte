console.log("js読み込み成功");

//スタートボタン押下時の画面遷移
const startButton = document.getElementById("start__button"); 
const startForm = document.getElementById("start__form");
const startGame = document.getElementById("start__game");

startButton.addEventListener('click',function(){ 
    console.log('スタートボタンが押されました');
    start__form.classList.add("none");
    startGame.classList.remove("none");
})



//------------回答、フラッシュ時の日付計算--------------------------------------


let today = new Date();
let today_year = today.getFullYear();
let today_month = today.getMonth() + 1;
let today_date = today.getDate();
let today_day = today.getDay();


//ホームに今日の日付表示
console.log(today);
document.getElementById('today__year').textContent = today_year;
document.getElementById('today__month').textContent = today_month;
document.getElementById('today__date').textContent = today_date;

//念のため今日の日付を出しておくよ
console.log('今日',today);
console.log(today_year,'年');
console.log(today_month,'月');
console.log(today_date, '日');
console.log(today_day, '曜日');

//一昨日～明後日の日付の配列
const random_days = [-2, -1, 1, 2];

//上記配列からランダムに要素を拾う。randomで出た0-1の小数に配列数をかけ、floorで整数に
let gapday1 = random_days[Math.floor(Math.random()*random_days.length)];
let gapday2 = random_days[Math.floor(Math.random()*random_days.length)];
let gapday3 = random_days[Math.floor(Math.random()*random_days.length)];
let gapday4 = random_days[Math.floor(Math.random()*random_days.length)];

//念のため上記の差を出しておくよ
console.log('日付の差', gapday1,gapday2,gapday3,gapday4);

//フラッシュ時に表示する文字を変数に格納する
const daylist = ['一昨日','昨日','存在しない今日','明日','明後日'];
const dayresult1 = daylist[gapday1 + 2];
const dayresult2 = daylist[gapday2 + 2];
const dayresult3 = daylist[gapday3 + 2];
const dayresult4 = daylist[gapday4 + 2];

//回答になる日付を計算する
today.setDate(today_date + gapday1 + gapday2 + gapday3 + gapday4);
let result_year = today.getFullYear();
let result_month = today.getMonth() + 1;
let result_date = today.getDate();
let result_day = today.getDay();

//回答の日付を出しておく
console.log('回答',result_month,result_date)

//HTMLをフラッシュ時表示の文字に書き換える
document.getElementById('flash__1').textContent = dayresult1;
document.getElementById('flash__2').textContent = dayresult2;
document.getElementById('flash__3').textContent = dayresult3;
document.getElementById('flash__4').textContent = dayresult4;



//--------------------選択肢の計算----------------------------------------



let fakedaylist = [-4,-3,-2,-1,1,2,3,4];
let fdllength = fakedaylist.length;

//Fisher-Yatesシャッフルアルゴリズム
while (fdllength) {
    var j = Math.floor( Math.random() * fdllength );
    var t = fakedaylist[--fdllength];
    fakedaylist[fdllength] = fakedaylist[j];
    fakedaylist[j] = t;
}
console.log(fakedaylist);

//シャッフルされた数字の最初の3つを取り出す
let fakeresult = fakedaylist.slice(0,3);
console.log("選択肢",fakeresult);



//偽の選択肢をつくる
let correctlongoption = new Date(today);
let correctmonth = correctlongoption.getMonth() + 1;
let correctdate = correctlongoption.getDate();
let correctoption = [correctmonth,'月',correctdate,'日'];
console.log("正解",correctmonth,correctdate);

let fakelongoption1 = new Date(today);
fakelongoption1.setDate(today.getDate() + fakeresult[0]); 
let fakemonth1 = fakelongoption1.getMonth() + 1;
let fakedate1 = fakelongoption1.getDate();
let fakeoption1 = [fakemonth1,'月',fakedate1,'日'];
console.log("選択肢1",fakemonth1,fakedate1);


let fakelongoption2 = new Date(today);
fakelongoption2.setDate(today.getDate() + fakeresult[1]); 
let fakemonth2 = fakelongoption2.getMonth() + 1;
let fakedate2 = fakelongoption2.getDate();
let fakeoption2 = [fakemonth2,'月',fakedate2,'日'];
console.log("選択肢2",fakemonth2,fakedate2);


let fakelongoption3 = new Date(today);
fakelongoption3.setDate(today.getDate() + fakeresult[2]); 
let fakemonth3 = fakelongoption3.getMonth() + 1;
let fakedate3 = fakelongoption3.getDate();
let fakeoption3 = [fakemonth3,'月',fakedate3,'日'];
console.log("選択肢3",fakemonth3,fakedate3);


//選択肢をランダムな位置に表示したいので、4つの回答をシャッフルし、
//偽選択肢と回答をランダムにボタンにする
let orderlist = [fakeoption1,fakeoption2,fakeoption3,correctoption];
let orderlength = orderlist.length;

//Fisher-Yatesシャッフルアルゴリズム
while (orderlength) {
    var j = Math.floor( Math.random() * orderlength );
    var t = orderlist[--orderlength];
    orderlist[orderlength] = orderlist[j];
    orderlist[j] = t;
}


//ボタンに格納
let option1 = orderlist[0].join('');
let option2 = orderlist[1].join('');
let option3 = orderlist[2].join('');
let option4 = orderlist[3].join('');

document.getElementById('option1').textContent = option1;
document.getElementById('option2').textContent = option2;
document.getElementById('option3').textContent = option3;
document.getElementById('option4').textContent = option4;


//誤りのときボタンの色を変える
const correctText = correctoption.join("");
const buttons = [
    document.getElementById('option1'),
    document.getElementById('option2'),
    document.getElementById('option3'),
    document.getElementById('option4')
]
const buttonLength = buttons.length;

//正解のものを格納する変数
let correctPin = null;

//正誤判定
for(i=0; i<buttonLength; i++){
    const optionJudge = buttons[i].textContent;
    if(optionJudge == correctText){
        correctPin = buttons[i];
        console.log("correctPinで判定した正解の選択肢",correctPin);
    }
}


//---------------------------------当たりはずれ表示----------------------------



const resultMaru = document.getElementById('resultMaru');
const resultBatu = document.getElementById('resultBatu');

//正誤の判定、forで一つずつ見る
var i = 0;
buttons.forEach(i => {
    i.addEventListener('click',function(){
        const selectedtext = this.textContent;

        if (selectedtext == correctText){
            resultMaru.classList.add('on');
            console.log('正解');
        }
        else{
            resultBatu.classList.add('on');
            console.log('不正解');
        }

        //正解を変数に入れとく
        correctPin.classList.add('correctAnswer')
        const againButton = document.getElementById('againButton');
        againButton.classList.add('on');
        document.getElementById('option1').disabled = true;
        document.getElementById('option2').disabled = true;
        document.getElementById('option3').disabled = true;
        document.getElementById('option4').disabled = true;
    })
});



//--------------フラッシュアニメーション-------------
//要素の数を取得
const flash_objects = document.querySelectorAll('.flash__obj');
const flash_objCount = flash_objects.length;
console.log(flash_objCount);


function flashAnimation(){
    const background = document.getElementById('flash');
    const optionsDisplay = document.getElementById('option');
    background.classList.add('background-on');

    for(let i=0; i<flash_objCount; i++){
        if(i<3){
            setTimeout(() => {
                flash_objects[i].classList.add('animation');
            }, 1000 * (i + 1));
            setTimeout(() => {
                flash_objects[i].classList.remove('animation');
            }, 1000 * (i + 2));
            
        }
        else{
            setTimeout(() => {
                flash_objects[i].classList.add('animation');
            }, 3500 + 350 * ((i-2)+1));
            setTimeout(() => {
                flash_objects[i].classList.remove('animation');
            }, 3500 + 350 * ((i-2)+1.8));
        }}

        setTimeout(() => {
                background.classList.remove('background-on');
                background.classList.add('delete');//ガチでバカだけどもうわからん。たぶん子要素をいじればもっとスマートに行く
                optionsDisplay.classList.add('on');
            }, 3500 + 650 * ((i+2)+2));
}

//背景の黒
function flashAreaOn(){
    const flashArea = document.getElementById('flash');
    flashArea.classList.add('on');
}

startButton.addEventListener('click',flashAreaOn);
startButton.addEventListener('click',flashAnimation);



//------------------正誤判定-------------


//--------------もう一回ボタン-----------