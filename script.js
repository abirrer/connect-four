//Variables
var columns = $(".connect-four__column");
var tokens = $(".connect-four__token");
var curPlayer = "red";
var victory = $(".victory");
var freeToken = $("#free-token");

//MAIN FUNCTION
columns.on("click", function(e) {
    var emptyToken;
    var tokensInColumn = $(e.currentTarget).find(tokens);

    //Find Empty token
    for (var i = 5; i >= 0; i--) {
        if (
            !tokensInColumn.eq(i).hasClass("red") &&
            !tokensInColumn.eq(i).hasClass("yellow")
        ) {
            emptyToken = tokensInColumn.eq(i);
            break;
        }
    }
    //Add token
    emptyToken.addClass(curPlayer);
    var tokensInRow = $(".row" + i);

    //Defining Diagonal Matches

    //Check for victory & show victory sign
    if (hasCurPlayerWon(tokensInColumn)) {
        showVictory();
        return;
    } else if (hasCurPlayerWon(tokensInRow)) {
        showVictory();
        return;
    } else if (hasCurPlayerWonDiagonally()) {
        showVictory();
        return;
    } else {
        //Switch players
        switchPlayer();
    }

    //Reset board on victory
    $(".victory").on("click", function() {
        //check to understand why yellow wins wraps sometimes
        reset();
    });
    //Reset board on no win
    if ($(".red").length + $(".yellow").length == 42) {
        $(document).on("click", function fn() {
            reset(); //doesn't seem to allow anymore new tokens. so doesn't really reset.
            $(document).off("click", fn);
        });
    }
});
//End of MAIN FUNCTION

//Referenced Equations
function switchPlayer() {
    if (curPlayer == "red") {
        curPlayer = "yellow";
    } else {
        curPlayer = "red";
    }
}

function hasCurPlayerWon(tokens) {
    var str = "";
    for (var i = 0; i < tokens.length; i++) {
        if (tokens.eq(i).hasClass(curPlayer)) {
            str += "w";
            console.log(str);
        } else {
            str += "l";
            console.log(str);
        }
    }
    return str.indexOf("wwww") > -1;
}

function hasCurPlayerWonDiagonally() {
    var diagonalMatches = [
        [0, 7, 14, 21],
        [6, 13, 20, 27],
        [12, 19, 26, 33],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [13, 20, 27, 34],
        [7, 14, 21, 28],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [8, 15, 22, 29],
        [14, 21, 28, 35],
        [20, 27, 34, 41],
        [36, 31, 26, 21],
        [30, 25, 20, 15],
        [24, 19, 14, 9],
        [18, 13, 8, 3],
        [37, 32, 27, 22],
        [31, 26, 21, 16],
        [25, 20, 15, 10],
        [19, 14, 9, 4],
        [38, 33, 28, 23],
        [32, 27, 22, 17],
        [26, 21, 16, 11],
        [20, 15, 10, 5]
    ];
    for (var j = 0; j < diagonalMatches.length; j++) {
        if (
            tokens.eq(diagonalMatches[j][0]).hasClass(curPlayer) &&
            tokens.eq(diagonalMatches[j][1]).hasClass(curPlayer) &&
            tokens.eq(diagonalMatches[j][2]).hasClass(curPlayer) &&
            tokens.eq(diagonalMatches[j][3]).hasClass(curPlayer)
        ) {
            return true;
        }
    }
}

function showVictory() {
    console.log("Victory");
    victory.addClass("on");
    victory
        .html("<h1>" + curPlayer + " wins!<h1>")
        .css({ "font-size": "100px", "z-index": 6, color: curPlayer });
    // freeToken.css({
    //     display: "none"
    // });
}

function reset() {
    victory.removeClass("on");
    $(".connect-four__token").removeClass("red yellow");
    curPlayer = "red";
}

//Animation for dragging tokens before they drop

$(document).on("mouseover", function() {
    freeToken.css({
        display: "block",
        "background-color": curPlayer
    });
});

$(document).on("mousemove", function(e) {
    console.log("mouse move");
    var mouseX = e.pageX - freeToken.outerWidth() / 2;
    var mouseY = e.pageY - freeToken.outerWidth();
    freeToken.css({
        top: mouseY + "px",
        left: mouseX + "px"
    });
});

// var div = document.querySelector("div");
//
// document.addEventListener("mousemove", function(e) {
//     var mouseX = e.clientX - div.clientWidth / 2;
//     var mouseY = e.clientY;
//     div.style.top = mouseY + "px";
//     div.style.left = mouseX + "px";
// });
