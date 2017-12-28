// Dit script is voor bewegende ballen //
$(function() {
  var d = function() {};
  $(document).delegate(".b-ball_bounce", "mouseenter", function() {
    b(this);
    m(this)
  }).delegate(".b-ball_bounce .b-ball__right", "mouseenter", function(i) {
    i.stopPropagation();
    b(this);
    m(this)
  });

  function f() {
    var i = "ny2012.swf";
    i = i + "?nc=" + (new Date().getTime());
    swfobject.embedSWF(i, "z-audio__player", "1", "1", "9.0.0", null, {}, {
      allowScriptAccess: "always",
      hasPriority: "true"
    })
  }

  function h(i) {
    if ($.browser.msie) {
      return window[i]
    } else {
      return document[i]
    }
  }
  window.flashInited = function() {
    d = function(j) {
      try {
        h("z-audio__player").playSound(j)
      } catch (i) {}
    }
  };
  if (window.swfobject) {
    window.setTimeout(function() {
      $("body").append('<div class="g-invisible"><div id="z-audio__player"></div></div>');
      f()
    }, 100)
  }
  var l = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\"];
  var k = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];
  var g = 36;
  var a = {};
  for (var e = 0, c = l.length; e < c; e++) {
    a[l[e].charCodeAt(0)] = e
  }
  for (var e = 0, c = k.length; e < c; e++) {
    a[k[e].charCodeAt(0)] = e
  }
  $(document).keypress(function(j) {
    var i = $(j.target);
    if (!i.is("input") && j.which in a) {
      d(a[j.which])
    }
  });

  function b(n) {
    if (n.className.indexOf("b-ball__right") > -1) {
      n = n.parentNode
    }
    var i = /b-ball_n(\d+)/.exec(n.className);
    var j = /b-head-decor__inner_n(\d+)/.exec(n.parentNode.className);
    if (i && j) {
      i = parseInt(i[1], 10) - 1;
      j = parseInt(j[1], 10) - 1;
      d((i + j * 9) % g)
    }
  }

  function m(j) {
    var i = $(j);
    if (j.className.indexOf(" bounce") > -1) {
      return
    }
    i.addClass("bounce");

    function n() {
      i.removeClass("bounce").addClass("bounce1");

      function o() {
        i.removeClass("bounce1").addClass("bounce2");

        function p() {
          i.removeClass("bounce2").addClass("bounce3");

          function q() {
            i.removeClass("bounce3")
          }
          setTimeout(q, 300)
        }
        setTimeout(p, 300)
      }
      setTimeout(o, 300)
    }
    setTimeout(n, 300)
  }
});
//####################################### EIND ######################################//

// Dit script is voor sneuw //

var snowmax=35;
var snowcolor=new Array("#000000","#DDDDFF","#CCCCDD","#F3F3F3","#F0FFFF","#FFFFFF","#EFF5FF")
var snowtype=new Array("Arial Black","Arial Narrow","Times","Comic Sans MS");
var snowletter="Codegorilla";
var sinkspeed=0.6; 
var snowmaxsize=40;
var snowminsize=8;
var snowingzone=1;
  
  
var snow=new Array();
var marginbottom;
var marginright;
var timer;
var i_snow=0;
var x_mv=new Array();
var crds=new Array();
var lftrght=new Array();
var browserinfos=navigator.userAgent;
var ie5=document.all&&document.getElementById&&!browserinfos.match(/Opera/);
var ns6=document.getElementById&&!document.all;
var opera=browserinfos.match(/Opera/);
var browserok=ie5||ns6||opera;
function randommaker(range) {
    rand=Math.floor(range*Math.random());
    return rand;
}
function initsnow() {
    if (ie5 || opera) {
        marginbottom=document.body.clientHeight;
        marginright=document.body.clientWidth;
    }
    else if (ns6) {
        marginbottom=window.innerHeight;
        marginright=window.innerWidth;
    }
    var snowsizerange=snowmaxsize-snowminsize;
    for (i=0;i<=snowmax;i++) {
        crds[i]=0;
        lftrght[i]=Math.random()*15;
        x_mv[i]=0.03+Math.random()/10;
        snow[i]=document.getElementById("s"+i);
        snow[i].style.fontFamily=snowtype[randommaker(snowtype/length)];
        snow[i].size=randommaker(snowsizerange)+snowminsize;
        snow[i].style.fontSize=snow[i].size+"px";
        snow[i].style.color=snowcolor[randommaker(snowcolor.length)];
        snow[i].sink=sinkspeed*snow[i].size/5;
        if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size)}
        if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
        if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
        if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
        snow[i].posy=randommaker(2*marginbottom-marginbottom-2*snow[i].size);
        snow[i].style.left=snow[i].posx+"px";
        snow[i].style.top=snow[i].posy+"px";
    }
    movesnow();
}
function movesnow() {
    for(i=0;i<=snowmax;i++) {
        crds[i]+=x_mv[i];
        snow[i].posy+=snow[i].sink;
        snow[i].style.left=snow[i].posx+lftrght[i]*Math.sin(crds[i])+"px";
        snow[i].style.top=snow[i].posy+"px";
        if (snow[i].posy>=marginbottom-2*snow[i].size || parseInt(snow[i].style.left)>(marginright-3*lftrght[i])) {
            if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size)}
            if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
            if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
            if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
            snow[i].posy=0;
        }
    }
    var timer=setTimeout("movesnow()",50);
}
for (i=0;i<=snowmax;i++) {
    document.write("<span id='s"+i+"' style='position:absolute;top:-"+snowmaxsize+"px;'>"+snowletter+"</span>");
}
if (browserok) {
    window.onload=initsnow;
}

// Dit script is voor brandende BOORCAM vuur //
var handle = false;
var textBrightness = 50;
var fireCount = 6;
var fireDelta = new Array();
var step = 0;
var angle = 0;
var radius = 6;

function animate()
{
    fireDelta[fireCount - step] = Math.random() * 2 - 1;
    var e = document.getElementById("fire");
    var s = "";
    for (var i = 0; i < fireCount; i++)
    {
        if (s) s += ", ";
        s += Math.round(fireDelta[(i + fireCount - step) % fireCount] * i) + "px " + (-2 * i -1) + "px " + (2 + i) + "px ";
        s += "rgb(255, " + (255 - i * Math.floor(255 / (fireCount - 1))) + ", 0)";
    }
    e.style.textShadow = s;
    /* We need to change something, else the shadow will not be re-rendered. This bug was fixed in Opera 10.5. */
    e.style.color = "rgb(" +
        (textBrightness + step % 2) + ", " +
        textBrightness + ", " +
        textBrightness + ")";
    step = (step + 1) % fireCount;

     /* RGB */
    angle -= 0.4;
    if (angle <= 0) angle = Math.PI * 2;
    var e = document.getElementById("rgb");
    var s =
        Math.round(Math.sin(angle) * radius) + "px " +
        Math.round(Math.cos(angle) * radius) + "px 4px #33F, " +
        Math.round(Math.sin(angle + Math.PI * 4 / 3) * radius) + "px " +
        Math.round(Math.cos(angle + Math.PI * 4 / 3) * radius) + "px 4px #F00, " +
        Math.round(Math.sin(angle + Math.PI * 2 / 3) * radius) + "px " +
        Math.round(Math.cos(angle + Math.PI * 2 / 3) * radius) + "px 4px #0F0";
    e.style.textShadow = s;
    /* We need to change something, else the shadow will not be re-rendered. This bug was fixed in Opera 10.5. */
    e.style.color = "rgb(" + (255 - step % 2) + ", 255, 255)";
}

function toggleAnimation()
{
    for (var i = 0; i < fireCount; i++)
        fireDelta[i] = Math.random() * 2 - 1;
    if (handle)
    {
        window.clearInterval(handle);
        handle = false;
    }
    else
        handle = window.setInterval(function() { animate(); }, 100);
    return false;
}

toggleAnimation();

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

