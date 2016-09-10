"use strict";function eventCheck(a){var e=a.target,t=e.dataset.operator,l=e.dataset.value,s=a.keyCode,c=a.shiftKey;s?calculator.keyChecker(s,a,c):l?calculator.number(l):e.classList.contains("icon")?calculator.iconsChecker(e):calculator.operator(t)}function NewCalc(){var a=document.getElementsByClassName("btn"),e=document.getElementsByClassName("input-text")[0],t=document.getElementsByClassName("calculator-wrapper")[0],l=document.getElementsByClassName("icon"),s="",c=0,r=!1;this.number=function(a){var t;if(r&&(this.clearDisplay(),r=!1),"."===a){if(e.value.indexOf(".")>-1)return;t="0"===e.value?0+a:e.value+a,e.value=t}else t="0"===e.value?a:e.value+a,e.value=t},this.operator=function(a){if(!r)switch(s){case"+":c+=parseFloat(e.value);break;case"-":c-=parseFloat(e.value);break;case"*":c*=parseFloat(e.value);break;case"/":c/=parseFloat(e.value);break;default:c=parseFloat(e.value)}if("clean"===a&&this.clean(),"minus-plus"===a){var t=parseFloat(e.value);c="-"===t[0]?Number(t.slice(1)):-+Number(t),e.value=c}"percent"===a&&(c=parseFloat(e.value)/100,e.value=c),s&&(e.value=c),s="result"===a?null:a,r=!0},this.clearDisplay=function(){e.value="0"},this.clean=function(){s="",c=0,e.value="0",r=!1},this.keyChecker=function(a,e,t){var l,s={48:['[data-value="0"]',0],49:['[data-value="1"]',1],50:['[data-value="2"]',2],51:['[data-value="3"]',3],52:['[data-value="4"]',4],53:['[data-value="5"]',5],54:['[data-value="6"]',6],55:['[data-value="7"]',7],56:['[data-value="8"]',8],57:['[data-value="9"]',9],45:['[data-value="0"]',0],35:['[data-value="1"]',1],40:['[data-value="2"]',2],34:['[data-value="3"]',3],37:['[data-value="4"]',4],12:['[data-value="5"]',5],39:['[data-value="6"]',6],36:['[data-value="7"]',7],38:['[data-value="8"]',8],33:['[data-value="9"]',9]},c={106:['[data-operator="*"]',"*"],107:['[data-operator="+"]',"+"],109:['[data-operator="-"]',"-"],189:['[data-operator="-"]',"-"],110:['[data-value="."]',"."],190:['[data-value="."]',"."],111:['[data-operator="/"]',"/"],191:['[data-operator="/"]',"/"],8:['[data-operator="clean"]',"clean"],46:['[data-operator="clean"]',"clean"],187:['[data-operator="result"]',"result"],13:['[data-operator="result"]',"result"]};if(a in s){var r=s[a][0];this.number(s[a][1]),l=document.querySelector(r),l.classList.add("btn-active"),setTimeout(function(){l.classList.remove("btn-active")},100)}else a in c&&(r=c[a][0],this.operator(c[a][1]),l=document.querySelector(r),l.classList.add("btn-active"),setTimeout(function(){l.classList.remove("btn-active")},100))},this.iconsChecker=function(a){a.classList.contains("icon-close")?t.classList.toggle("close"):a.classList.contains("icon-turn")?t.classList.toggle("turn"):a.classList.contains("icon-expand")?t.classList.toggle("expand"):t.classList="calculator-wrapper"};for(var u=0;u<a.length;u++)a[u].addEventListener("click",eventCheck);for(window.addEventListener("keydown",eventCheck),u=0;u<l.length;u++)l[u].addEventListener("click",eventCheck)}var calculator=new NewCalc;