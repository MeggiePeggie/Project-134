song = "";
status1 = "";
objects = [];

function preload()
{
    song = loadSound('suad.mp3');
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(status1 != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status1").innerHTML = "Status: Object Dectcted";

            fill();
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person")
            {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                console.log("stop");
                song.stop();
            }
            else
            {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                console.log("play");
                song.play();
            }
        }

        if(objects.length == 0)
        {
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            console.log("play");
            song.play();
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!")
    status1 = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status1").innerHTML = "Status: Detecting Objects";
}