song="";
status="";
objects=[];

function preload(){
    song=loadSound("Alarma.mp3");
}


function setup(){
    canvas=createCanvas(350,350);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(350,350);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Estatus:detectando objetos";
}

function modelLoaded(){
    console.log("!Modelo cargado¡");
    status=true;
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}


function draw(){
    image(video,0,0,350,350);

    if(status !=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResults);
        for(i=0;i <objects.length; i++){
            document.getElementById("status").innerHTML="status detectado";
            document.getElementById("number_of_objects").innerHTML="numero de objetos detectados"+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].heigth);
            if(objects[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML="Se encontro el bebe";
                console.log("stop");
                song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML="No se encontro el bebe";
                console.log("play");
                song.play();
            }
        }
        if(objects.length==0){
            document.getElementById("number_of_objects").innerHTML="No se encontro el bebe";
            console.log("play");
            song.play();
        }
    }
}