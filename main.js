objects=[];
status="";
function setup(){
    canvas=createCanvas(640, 420);
    canvas.center();
    objectdetected=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}
img="";

function preload(){
    img=loadImage("dog_cat.jpg");
}

function draw(){
    image(img, 0, 0, 640, 420);
   if(status !=""){
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status:object detected";
        fill("#FF0000");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
   } 

}
function modelLoaded(){
    console.log("model is loaded");
    status=true;
    objectdetected.detect(img, gotResult);
}
function gotResult(error, results){
if(error){
    console.log(error);
}
console.log(results);
objects=results;
}