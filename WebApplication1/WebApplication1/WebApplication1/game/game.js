var Length_doll = 0;
var Craet_all_doll_interval;
var Index = 0;
var size_doll = 8;
var revach_dice = 2;
var num_of_dice = 24;
var Minute = 15;
var High = 2;
var start = 23;
var div_point;
var div_hart;
var Minute_creat = 1200;
var Top_doll = 0;
var Top_dice = 138;
var position_doll = 4;
var point = 0;
var point_doll = 0;
var hart = 3;
var level = 1;
var Top = -15 + "vh"
var max = 100;
var sum_point;
var Img_hart = "../מיקי/תמונות למשחק/לב1.PNG";
var Img_point = "../מיקי/תמונות למשחק/אייקון מטבעות.PNG";
var img_game_over = "../מיקי/תמונות למשחק/2020-04-30 (27).gif";
var win1 = /*"../מיקי/תמונות למשחק‏‏unnamed (10) - עותק.gif"*/"../מיקי/2020-05-01.gif";
var Img_of_doll = ["../מיקי/תמונות למשחק/‏‏unnamed (10) - עותק.gif", "../מיקי/תמונות למשחק/unnamed (9).gif"];
var Bool_img = [];
var Mydoll = [];
var Object_dice = [];
var winer = "../saund/alert_drip.wav";
var pus = "../saund/Flash%20Button%20Sounds-13485-Free-Loops.com.mp3";
var game = "../saund/GROOVY2.WAV"; 
function updateLevel() {
    localStorage.setItem('level', level);
    //הגדרת משתנה המחזיק את השלב הגבוה ביותר
    console.log('next game. level is: ' + level);
    var storageLevel = parseInt(localStorage.getItem("maxLevel"));
    if (level < storageLevel)
        return;
    localStorage.setItem('maxLevel', level);

}
function main() {
    console.log(level);
    level = parseInt(localStorage.getItem('level'));
    if (level == 1) {
        localStorage.setItem('hart', 3);
        hart = localStorage.getItem('hart');
    }
    if (!level)
        localStorage.setItem('level', 1)
    //--------------------update params--------------------------
    //point = 0;
    sum_point = localStorage.getItem('sum_point');
    if (!sum_point)
        localStorage.setItem('sum_point', 0);
    Index = 0;
    size_doll = 8;
    Minute = 12;
    Minute_creat = 1200;
    Top_dice = 138;
    position_doll = 4;
    point = 0;
    point_doll = 0;
    //hart = 3;
    Top = -15 + "vh";
    Bool_img = [];
    Mydoll = [];
    Object_dice = [];
    point_doll = 0;
    if (level == 2 || level == 3) {
        Top = -10 + "vh";
        hart = localStorage.getItem('hart');
        position_doll = 3;
        size_doll = 6;
        Minute_creat = 1100;
        Top_dice = 104;
        if (level == 2)
            Minute = 15;
        else
            Minute = 10;
    }
    else if (level == 4 || level == 5) {
        Top = -8 + "vh";
        position_doll = 2;
        hart = localStorage.getItem('hart');
        size_doll = 4;
        Top_dice = 68;
        if (level == 4) {
            Minute = 16;
            Minute_creat = 700;
        }
        else {
            Minute = 10;
            Minute_creat = 600;
        }
    }
    //---------------------------------------------------
    all.innerHTML = "";
    Mixed();
    Create_all_doll();
    Create_dice();
    Top_doll = screen.height - (screen.height - document.getElementsByClassName("dice_grey")[0].offsetTop) - Top_dice;
    Creat_point();
    Creat_hart();
    var a = document.createElement("audio");
    a.loop = "loop";
    a.src = game;
    a.play();
}
function Mixed() {
    var Img, id, index;
    var count = 0, img;
    for (var i = 0; i < 48 / size_doll; i++) {
        index = Math.round(Math.random());
        if (index == 0) {
            Img = Img_of_doll[0];
            id = 0;
            Mydoll.push({ img_url: Img, img_color: id });
        }
        else {
            Img = Img_of_doll[1];
            id = 1;
            Mydoll.push({ img_url: Img, img_color: id })
        }
    }
    img = Mydoll[0].img_url;
    for (var i = 1; i < Mydoll.length; i++) {
        if (Mydoll[i].img_url == img)
            count++;
    }
    if (count == 0 || count > Mydoll.length / 2)
        Mixed();
}
function Create_all_doll() {
    Craet_all_doll_interval = setInterval(function () {
        Create_dol(Index % Mydoll.length);
        Index++;
        if (point_doll == max)
        {
            if (level == 5) {
                sum_point = parseInt(localStorage.getItem('sum_point'));
                sum_point += point;
                localStorage.setItem('sum_point', sum_point);
                window.location = "../win/win.html";
            }
            else
            {
                stop_all_doll();
                win();
                Index = 0;
                point_doll = 0;
            }
            
        }
    }
        , Minute_creat);
}
function Create_dol(Index) {
    var img = document.createElement("img");
    img.src = Mydoll[Index].img_url;
    img.classList.add("img_doll");
    do
        var rand = Math.round(Math.random() * 100) % (48 / size_doll);
    while (Bool_img[rand] == 1)
    Mydoll[Index].position = rand * position_doll;
    img.style.left = start + size_doll * rand + "vw";
    img.style.width = size_doll + "vw";
    Bool_img[rand] = 1;
    Length_doll++;
    if (Length_doll == 48 / size_doll) {
        for (var i = 0; i < 48 / size_doll; i++)
            Bool_img[i] = 0;
        Length_doll = 0;
    }
    img.style.top = Top;
    Mydoll[Index].elem = img;
    Mydoll[Index].mov_interval = setInterval(function () {
        if (MovDall(img) == false)
            Check_doll(Mydoll[Index]);
    }
        , Minute);
    all.appendChild(img);

}
function MovDall(dall) {
    var top = dall.offsetTop
    if (top < Top_doll) {
        top += High;
        dall.style.top = (top + "px");
    }
    else
        return false;
}
function Create_dice() {

    for (var k = 0; k < num_of_dice; k++)
    {

        var Dice = document.createElement("div")
        Object_dice[k] = {};
        Object_dice[k].position = k;
        if (k < 12)
        {
            Dice.classList.add("dice_pink");
            Object_dice[k].color = 1;
        }
        else
        {

            Dice.classList.add("dice_grey");
            Object_dice[k].color = 0;
        }
        Dice.style.left = start + k * revach_dice + "vw";
        Dice.style.top = 85 + "vh";
        Dice.onclick = Swap;
        Object_dice[k].elem = Dice;
        all.appendChild(Dice);
    }
    document.onkeypress = function (e) {
        if (e.keyCode == 32)
            Swap();
    }

}
function Creat_point() {
    div_point = document.createElement("div");
    div_point.classList.add("Point");
    div_point.innerHTML = point;
    all.appendChild(div_point);
    var img_point = document.createElement("img");
    img_point.src = Img_point;
    img_point.classList.add("img_point");
    all.appendChild(img_point);
}
function Creat_hart() {
    div_hart = document.createElement("div");
    div_hart.classList.add("Hart");
    div_hart.innerHTML = hart;
    all.appendChild(div_hart);
    var img_hart = document.createElement("img");
    img_hart.src = Img_hart;
    img_hart.classList.add("img_hart");
    all.appendChild(img_hart);
}
function Swap() {
    for (var i = 0; i < Object_dice.length; i++) {
        if (Object_dice[i].elem.classList[0] == "dice_pink") {
            Object_dice[i].elem.classList.remove("dice_pink");
            Object_dice[i].elem.classList.add("dice_grey");
            Object_dice[i].color = 0;
        }
        else {
            Object_dice[i].elem.classList.remove("dice_grey");
            Object_dice[i].elem.classList.add("dice_pink");
            Object_dice[i].color = 1;
        }
    }
}
function Check_doll(object_doll) {
    if (Object_dice.find(function (dice) { return dice.position == object_doll.position && dice.color == object_doll.img_color })) {
        object_doll.elem.classList.add("doll_noun");
        clearInterval(object_doll.mov_interval);
        point += 5;
        div_point.innerHTML = point;
        point_doll++;
        var Audio = document.createElement("audio");
        Audio.src = winer;
        Audio.pause();
        Audio.play();
    }
    else
    {
        if (hart > 0)
        {
            object_doll.elem.classList.add("doll_noun");
            clearInterval(object_doll.mov_interval);
            hart--;
            localStorage.setItem('hart', hart);
            if (point > 0)
            {
                point -= 5;
            }
            //point_doll++;
            div_hart.innerHTML = hart;
            div_point.innerHTML = point;
            var Audio1 = document.createElement("audio");
            Audio1.src = pus;
            Audio1.pause();
            Audio1.play();
        }
         else
        {
            stop_all_doll();
            game_over();
            Index = 0;
            point_doll = 0;
            localStorage.setItem('maxLevel', 1);
        }
    }
}
function stop_all_doll() {
    clearInterval(Craet_all_doll_interval);
    all.innerHTML = "";
}
function game_over() {
    var img_game_over1 = document.createElement("img");
    img_game_over1.src = img_game_over;
    img_game_over1.classList.add("img_game_over");
    all.appendChild(img_game_over1);
    localStorage.setItem('sum_point', 0);
    create_point_end_game();
    button_exit();
    //button_agein();
    localStorage.setItem('maxLevel', 1);
}
function win() {
    var img_win = document.createElement("img");
    img_win.src = win1;
    img_win.classList.add("img_game_winer");
    all.appendChild(img_win);
    create_point_end_game();
    button_exit();
    button_continua();
    sum_point = parseInt(localStorage.getItem('sum_point'));;
    sum_point += point;
    localStorage.setItem('sum_point', sum_point);
    //update level
    if (level < 5) {
        level++;
        localStorage.setItem('level', level);
        updateLevel();
    }
    else {
        level = 1;
        localStorage.setItem('level', level);
        updateLevel();
    }
}
function create_point_end_game() {
    var div_point = document.createElement("div");
    div_point.classList.add("div_point");

    all.appendChild(div_point);
    var i = 0;
    var clear_point_interval = setInterval(function () {
        div_point.innerHTML = "point: " + i;
        if (i == point)
            clearInterval(clear_point_interval);
        i++;
    }, 10);
}
function button_exit() {
    var exit = document.createElement("a");
    if (hart == 0 && point_doll!=max)
    {
        exit.classList.add("exit1");
    }
    else
    {
        exit.classList.add("exit");
    }
    exit.href = "../level/level.html";
    exit.innerHTML = "exit";
    all.appendChild(exit);
}
function button_agein() {
    var again = document.createElement("div");
    again.classList.add("again");
    again.onclick = new_game;
    again.innerHTML = "play again";
    all.appendChild(again);
}
function button_continua() {
    var continua = document.createElement("div");
    continua.classList.add("continua");
    continua.onclick = next_level;
    if (level == 5)
        continua.innerHTML = "start";
    else
        continua.innerHTML = "level" + " " + (level + 1);
    all.appendChild(continua);
}


function new_game() {
    //level = 1;
    //updateLevel();
    main();
}

function next_level() {
    //level++;
    localStorage.setItem('level', level);
    updateLevel();
    main();
}

