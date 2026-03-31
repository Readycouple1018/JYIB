/**
 * Classic Elegant Wedding Invitation
 * Enhanced Script (BGM + Kakao + Swipe + PinchZoom)
 */

(function () {
'use strict';

/* ===================================================
Utility
=================================================== */

const $ = (s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];

function formatDate(dateStr,timeStr){
const d=new Date(`${dateStr}T${timeStr}:00`);
const days=['일','월','화','수','목','금','토'];
const year=d.getFullYear();
const month=d.getMonth()+1;
const date=d.getDate();
const day=days[d.getDay()];
const hours=d.getHours();
const minutes=d.getMinutes();
const period=hours<12?'오전':'오후';
const h12=hours%12||12;
const minuteStr=minutes>0?` ${minutes}분`:'';
return `${year}년 ${month}월 ${date}일 ${day}요일 ${period} ${h12}시${minuteStr}`;
}

function getWeddingDateTime(){
return new Date(`${CONFIG.wedding.date}T${CONFIG.wedding.time}:00`);
}

/* ===================================================
BGM
=================================================== */

let bgm;

function initBGM(){
bgm=$("#bgm");
const toggle=$("#musicToggle");

if(!bgm)return;

bgm.volume=0.35;

if(toggle){
toggle.addEventListener("click",()=>{
if(bgm.paused){
bgm.play().catch(()=>{});
toggle.textContent="🎵";
}else{
bgm.pause();
toggle.textContent="🔇";
}
});
}
}

/* ===================================================
Curtain
=================================================== */

function initCurtain(){

const curtain=$("#curtain");
const btn=$("#curtainBtn");
const namesEl=$("#curtainNames");

if(CONFIG.useCurtain===false){
curtain.style.display="none";
initPetals();
return;
}

namesEl.textContent=`${CONFIG.groom.name}  &  ${CONFIG.bride.name}`;

btn.addEventListener("click",()=>{

curtain.classList.add("is-open");
document.body.classList.remove("no-scroll");

if(bgm){
bgm.play().catch(()=>{});
}

setTimeout(()=>{
curtain.classList.add("is-hidden");
initPetals();
},1400);

});

document.body.classList.add("no-scroll");
}

/* ===================================================
Petals
=================================================== */

function initPetals(){

const canvas=$("#petalCanvas");
if(!canvas)return;

const ctx=canvas.getContext("2d");

let width,height;

function resize(){
width=canvas.width=window.innerWidth;
height=canvas.height=window.innerHeight;
}

resize();
window.addEventListener("resize",resize);

class Petal{

constructor(){this.reset(true)}

reset(init=false){
this.x=Math.random()*width;
this.y=init?Math.random()*height*-1:-20;
this.size=8+Math.random()*10;
this.speedY=0.5+Math.random()*1;
this.speedX=-0.3+Math.random()*0.6;
this.rotation=Math.random()*Math.PI*2;
this.rotSpeed=(Math.random()-0.5)*0.02;
this.opacity=0.2+Math.random()*0.4;
}

update(){
this.y+=this.speedY;
this.x+=this.speedX;
this.rotation+=this.rotSpeed;
if(this.y>height+20)this.reset();
}

draw(){

ctx.save();

ctx.translate(this.x,this.y);
ctx.rotate(this.rotation);

ctx.globalAlpha=this.opacity;
ctx.fillStyle="#e8c8b0";

ctx.beginPath();
ctx.moveTo(0,0);
ctx.bezierCurveTo(10,-15,15,-10,20,0);
ctx.bezierCurveTo(15,10,10,10,0,0);
ctx.fill();

ctx.restore();
}

}

const petals=[];
for(let i=0;i<25;i++)petals.push(new Petal());

function animate(){
ctx.clearRect(0,0,width,height);
petals.forEach(p=>{
p.update();
p.draw();
});
requestAnimationFrame(animate);
}

animate();

}

/* ===================================================
Hero
=================================================== */

function initHero(){
$("#heroPhoto").src="images/hero/1.jpg";
$("#heroNames").textContent=`${CONFIG.groom.name} · ${CONFIG.bride.name}`;
$("#heroDate").textContent=formatDate(CONFIG.wedding.date,CONFIG.wedding.time);
$("#heroVenue").textContent=CONFIG.wedding.venue;
}

/* ===================================================
Countdown
=================================================== */

function initCountdown(){

const target=getWeddingDateTime();

function update(){

const now=new Date();
const diff=target-now;

if(diff<=0)return;

const days=Math.floor(diff/(1000*60*60*24));
const hours=Math.floor((diff/(1000*60*60))%24);
const minutes=Math.floor((diff/(1000*60))%60);
const seconds=Math.floor((diff/1000)%60);

$("#countDays").textContent=days;
$("#countHours").textContent=String(hours).padStart(2,"0");
$("#countMinutes").textContent=String(minutes).padStart(2,"0");
$("#countSeconds").textContent=String(seconds).padStart(2,"0");

}

update();
setInterval(update,1000);

}

/* ===================================================
Gallery + Modal
=================================================== */

let modalImages=[];
let modalIndex=0;

function openPhotoModal(images,index){

modalImages=images;
modalIndex=index;

showModalImage();

$("#photoModal").classList.add("is-open");
document.body.classList.add("no-scroll");

}

function closePhotoModal(){
$("#photoModal").classList.remove("is-open");
document.body.classList.remove("no-scroll");
}

function showModalImage(){

const img=$("#modalImg");

img.src=modalImages[modalIndex];

$("#modalCounter").textContent=
`${modalIndex+1} / ${modalImages.length}`;

}

/* swipe */

let startX=0;
let startY=0;

function initSwipe(){

const container=$("#modalContainer");

container.addEventListener("touchstart",e=>{
startX=e.touches[0].clientX;
startY=e.touches[0].clientY;
},{passive:true});

container.addEventListener("touchend",e=>{

const endX=e.changedTouches[0].clientX;
const endY=e.changedTouches[0].clientY;

const diffX=startX-endX;
const diffY=startY-endY;

if(Math.abs(diffX)>50 && Math.abs(diffX)>Math.abs(diffY)){

if(diffX>0)modalNavigate(1);
else modalNavigate(-1);

}

},{passive:true});

}

function modalNavigate(dir){

const newIndex=modalIndex+dir;

if(newIndex>=0 && newIndex<modalImages.length){
modalIndex=newIndex;
showModalImage();
}

}

/* pinch zoom */

function initPinchZoom(){

const img=$("#modalImg");

let scale=1;
let startDist=0;

img.addEventListener("touchstart",e=>{

if(e.touches.length===2){

const dx=e.touches[0].pageX-e.touches[1].pageX;
const dy=e.touches[0].pageY-e.touches[1].pageY;

startDist=Math.sqrt(dx*dx+dy*dy);

}

},{passive:true});

img.addEventListener("touchmove",e=>{

if(e.touches.length===2){

const dx=e.touches[0].pageX-e.touches[1].pageX;
const dy=e.touches[0].pageY-e.touches[1].pageY;

const dist=Math.sqrt(dx*dx+dy*dy);

scale=dist/startDist;

img.style.transform=`scale(${scale})`;

}

},{passive:true});

img.addEventListener("touchend",()=>{

img.style.transform="scale(1)";
scale=1;

});

}

/* ===================================================
Kakao Share
=================================================== */

function initKakaoShare(){

if(typeof Kakao==="undefined")return;

if(!Kakao.isInitialized()){
Kakao.init(CONFIG.kakaoKey);
}

const btn=$("#kakaoShareBtn");
if(!btn)return;

btn.addEventListener("click",()=>{

Kakao.Share.sendDefault({

objectType:"feed",

content:{
title:`${CONFIG.groom.name} ♥ ${CONFIG.bride.name} 결혼합니다`,
description:CONFIG.meta.description,
imageUrl:`${location.origin}/images/og/1.jpg`,
link:{
mobileWebUrl:location.href,
webUrl:location.href
}
}

});

});

}

/* ===================================================
Init
=================================================== */

function init(){

initBGM();
initCurtain();
initHero();
initCountdown();

initSwipe();
initPinchZoom();
initKakaoShare();

}

if(document.readyState==="loading"){
document.addEventListener("DOMContentLoaded",init);
}else{
init();
}

})();
