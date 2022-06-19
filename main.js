status="";
object=[];

function preload()
{

}

function setup()
{
    canvas = createCanvas(500,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectdetector = ml5.objectDetector('cocossd',modelLoaded);
}

function modelLoaded()
{
    console.log("modelLoaded");
    status = true;
}

function draw()
{
    image(video,0,0,500,400);
    objectdetector.detect(video,gotResult);

    if(status !="")
    {
        for(i=0;i<object.length;i++)
        {
            document.getElementById("status").innerHTML = "status: Detected images";
            
            fill("red");
            percent= Math.floor(object[i].confidence*100);
            noFill();
            stroke("red");
            text(object[i].label+""+percent+"%",object[i].x+15,object[i].y+15);
            rect(object[i].x,object[i].y , object[i].width,object[i].height);
        }

    }
}

function gotResult(error,result)
{
    if(error)
    {
        console.log(error);
    }

    else
    {
        console.log(result);
        object = result;
    }
}
