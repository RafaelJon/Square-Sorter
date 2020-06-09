var a = []

var counter = [];

var count = 0;

var movement = 0;

var color =[]

function getRandomColor() {
    for (let index = 0; index < 7; index++) {
        
        var letters = '0123456789ABCDEF';
        var colorhex = '#';
        for (var i = 0; i < 6; i++) {
          colorhex += letters[Math.floor(Math.random() * 16)];
        }
        color.push(colorhex)
    }
}

getRandomColor();

function tile(){
    movement = 0;
    count = parseInt(document.getElementById("map_input").value);
    var container = document.getElementById("game_container");
    container.innerHTML = "";
    var tr = document.createElement("tr")
    tr.id = "table";
    container.appendChild(tr);
    document.getElementById("table").innerHTML = "";
    for (let index = 0; index < count; index++) {
       a.push(index);
       counter[index] = 0;       
    }

    var tr = document.createElement("tr")
    var td = document.createElement("td")
    td.innerHTML = "";    
    
    tr.appendChild(td)
    for (let col = 0; col < count; col++) {
        var td = document.createElement("td")
        td.innerHTML = "↑";
        td.className = "button-arrow"
        td.onclick = function(){swap(col, 1);};
        tr.appendChild(td)
    }
    var td = document.createElement("td")
    td.innerHTML = "";
    tr.appendChild(td)
    document.getElementById("table").appendChild(tr);
    for (let row = 0; row < count; row++) {
        tr = document.createElement("tr")
        td = document.createElement("td")
        td.innerHTML = "←";
        td.className = "button-arrow"
        td.onclick = function(){swap(row, 3);};
        tr.appendChild(td)
        for (let col = 0; col < count; col++) {
            td = document.createElement("td")
            td.id = "box_" + row + col;
            tr.appendChild(td);
        }      
        td = document.createElement("td")
        td.innerHTML = "→";
        td.className = "button-arrow"
        td.onclick = function(){swap(row, 4);};
        tr.appendChild(td)  ;
        document.getElementById("table").appendChild(tr);
    }
    tr = document.createElement("tr")
    td = document.createElement("td")
    td.innerHTML = "";
    tr.appendChild(td)
    for (let col = 0; col < count; col++) {
        td = document.createElement("td")
        td.innerHTML = "↓";
        td.className = "button-arrow"
        td.onclick = function(){swap(col, 2);};
        tr.appendChild(td)
    }
    td = document.createElement("td")
    td.innerHTML = "";
    tr.appendChild(td)
    document.getElementById("table").appendChild(tr);
    init();
}

function init(){
    var row = 0;
    var col = 0;
    while( col < count && row < count){
        var index = Math.floor(Math.random() * a.length);
        var target = document.getElementById("box_"+row+col);
        target.innerHTML = a[index];
        
        target.style.backgroundColor = color[a[index]];
        target.style.color = color[target.innerHTML];
        col++;
        counter[index] = counter[index] + 1;

        if(counter[index] == count){
            a.splice(index, 1);
            counter.splice(index,1);
        }

        if(col == count){
            row++;
            col = 0;
        }
    }
}

function swap(pos, move){
    // var pos = parseInt(document.getElementById("pos_input").value);
    movement++
    var temp = -1;

    if(move == 1){
        temp = document.getElementById("box_0"+pos).innerHTML;
    }
    else if(move == 2){
        temp = document.getElementById("box_"+(count - 1)+pos).innerHTML;
    }
    else if(move == 3){
        temp = document.getElementById("box_"+pos+"0").innerHTML;
    }
    else{
        temp = document.getElementById("box_"+pos+(count - 1)).innerHTML;
    }

    for (let index = 0; index < count - 1; index++) {
        if(move == 1 || move == 3){
            var x, y;
            var x_plus = 0;
            var y_plus = 0;
            if(move == 1){
                x = index;
                y = pos;
                x_plus = 1;
            }
            else{
                x = pos;
                y = index;
                y_plus = 1;
            }
            var target = document.getElementById("box_"+(x)+(y));
            var x_final = (x+x_plus)
            var y_final = (y+y_plus)
            var control = document.getElementById("box_"+x_final+y_final);
            target.innerHTML = control.innerHTML;
            target.style.backgroundColor = color[target.innerHTML];
            target.style.color = color[target.innerHTML];
            if(index == count - 2){
                if(move == 1){
                    x = count - 1;
                    y = pos;
                }
                else{
                    x = pos
                    y = count - 1
                }
                target = document.getElementById("box_"+(x)+(y));
                target.innerHTML = temp;
                target.style.backgroundColor = color[target.innerHTML];
                target.style.color = color[target.innerHTML];
            }
        }
        else{
            var i = count - 1 - index;

            var x, y;
            var x_plus = 0;
            var y_plus = 0;
            if(move == 2){
                x = i;
                y = pos;
                x_plus = -1;
            }
            else{
                x = pos;
                y = i;
                y_plus = -1;
            }
            var target = document.getElementById("box_"+(x)+(y));
            var x_final = (x+x_plus)
            var y_final = (y+y_plus)
            var control = document.getElementById("box_"+x_final+y_final);
            target.innerHTML = control.innerHTML;
            target.style.backgroundColor = color[target.innerHTML ];
            target.style.color = color[target.innerHTML];
            if(index == count - 2){
                if(move == 2){
                    x = 0
                    y = pos
                }
                else{
                    x = pos
                    y = 0
                }
                target = document.getElementById("box_"+(x)+(y));
                target.innerHTML = temp;
                target.style.backgroundColor = color[target.innerHTML];
                target.style.color = color[target.innerHTML];
            }
        }        
    }
    checkWin();
}

function checkHorizontal(){
    var score = 0;
    for (let index = 0; index < count; index++) {
        var counter = 0;
        var temp = parseInt(document.getElementById("box_"+index+"0").innerHTML);
        for (let col = 0; col < count; col++) {
            var target = parseInt(document.getElementById("box_"+index+col).innerHTML);
            if(target == temp){
                counter++;
            }
        }
        if(counter == count){
            score++;
        }
    }
    if(score == count){
        var container = document.getElementById("game_container");
        container.innerHTML = ""
        var win = document.createElement("h3");
        win.innerHTML = "You win, total move : " + movement
        container.appendChild(win);
    }
    else{
        checkVertical();
    }
}

function checkVertical(){
    var score = 0;
    for (let index = 0; index < count; index++) {
        var counter = 0;
        var temp = parseInt(document.getElementById("box_0"+index).innerHTML);
        for (let row = 0; row < count; row++) {
            var target = parseInt(document.getElementById("box_"+row+index).innerHTML);
            if(target == temp){
                counter++;
            }
        }
        if(counter == count){
            score++;
        }
    }
    if(score == count){
        var container = document.getElementById("game_container");
        container.innerHTML = ""
        var win = document.createElement("h3");
        win.innerHTML = "You win, total move : " + movement
        container.appendChild(win);
    }
    
}

function checkWin(){
    checkHorizontal();

}

tile();