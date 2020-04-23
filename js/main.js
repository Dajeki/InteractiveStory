let zIndexCurrent = 1;
let currentPage = 0;

let imgURLs = ["img/Page7.png", "img/CowsVoiceUnanswered.png", "img/CowsVoiceanswered.png", "img/Page5.png", 
                "img/DucksVoiceUnanswered.png", "img/DucksVoiceanswered.png", "img/Page3.png", 
                "img/ChickensVoiceUnanswered.png", "img/ChickensVoiceanswered.png", "img/Page1.png", 
                "img/FrontCover.png", "img/Chick.png", "img/Duck.png", "img/Cow.png", "img/background.svg"];

let audioURLs = ["https://freesound.org/data/previews/73/73573_877451-lq.mp3", "Sounds/Duck-quacking-sound.mp3",
                "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-audio-hero/audio_hero_Cow_DIGIC10_23_340.mp3?_=7"];

function setupBookClasses() {
    $(".Book").children("div").each(function(index, elem) {
        if (index % 2 == 0){
            $(this).addClass("oddPage closeOddPage preload");
        }
        else {
            $(this).addClass("evenPage closeEvenPage");
        }
    });
}



function setupBookAnimation() { 
    $(".Book div").click(function(e) {
        var eventObject = $(this);
        /*nerd stats for what is being clicked weirdly it is only clicking even elements?*/
        console.log(e);

        //going fowards and since the first page is on the bottom, we need previous child turned when clicked
        if (eventObject.hasClass("evenPage")){
                eventObject.removeClass("closeEvenPage").addClass('openEvenPage').css('z-index', zIndexCurrent++);
                eventObject.prev("div").removeClass("closeOddPage").addClass('openOddPage').css('z-index', zIndexCurrent++);
                // setTimeout(function(eventObject){ eventObject.prev("div").toggleClass('hiddenToggle'); }, 500, eventObject);
                currentPage += 2;
        }
        //! FOR SOME REASON CAN ONLY GET EVEN EVENT CLICK (Acceptable because our drag is on that side as well so we still have access to it)
        else {
                eventObject.removeClass("openOddPage").addClass("closeOddPage").css('z-index', '');
                eventObject.next("div").removeClass("openEvenPage").addClass("closeEvenPage").css('z-index', '');
                zIndexCurrent -= 2;
                currentPage -= 2;
        }
    });
}

function setupAnimationHold() {
    //So animation doesnt fire on load. Looks weird having all odd 
    //pages turning when starting up the page
    
    $(".oddPage").removeClass("preload");
    $(".oddPage, .evenPage").css("transition", "transform .5s ease-in-out");
}

function setupAnimalSounds() {
    //I figured this setting up everything was adiquette for preload of audio

    var chickAudio = document.createElement("audio");
    chickAudio.src = "https://freesound.org/data/previews/73/73573_877451-lq.mp3";
    chickAudio.volume = 0.3;
    chickAudio.loop = true;

    $("#Chick").mouseover((e) => {
        chickAudio.play();
    })
    $("#Chick").mouseout((e) => {
        chickAudio.pause();
    })

    var duckAudio = document.createElement("audio");
    duckAudio.src = "Sounds/Duck-quacking-sound.mp3";
    duckAudio.volume = 0.05;
    duckAudio.loop = true;

    $("#Duck").mouseover((e) => {
        duckAudio.play();
    })
    $("#Duck").mouseout((e) => {
        duckAudio.pause();
    })
    
    var cowAudio = document.createElement("audio");
    cowAudio.src = "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-audio-hero/audio_hero_Cow_DIGIC10_23_340.mp3?_=7";
    cowAudio.volume = 0.1;
    cowAudio.loop = true;

    $("#Cow").mouseover((e) => {
        cowAudio.play();
    })
    $("#Cow").mouseout((e) => {
        cowAudio.pause();
    })
}

function setupPiecesDrag() {
    $( "#Chick" ).draggable({
        containment: "body",
        scroll: false,
        revert: 'valid',
    });
    //dropable on unanswered chick picture
    $( "#chickUnAns" ).droppable( 
    { 
        accept:"#Chick", 
        drop : function(e) { 
            
            console.log(currentPage);
            if(currentPage == 2) {
                $('#answerOne').animate({ opacity: 1 }, { duration: 3000 });
                $("#Chick").fadeOut("slow");
            }
            else {
                return false;
            }
        }
    });
    

    $( "#Duck" ).draggable({
        containment: "body",
        scroll: false,
        revert: "valid"
    });
    //dropable on unanswered duck picture
    $( "#duckUnAns" ).droppable( 
    { 
        accept:"#Duck", 
        drop :function(e) { 
            console.log(currentPage);
            e.preventDefault();
            if(currentPage == 4) {
                $('#answerTwo').animate({ opacity: 1 }, { duration: 3000 });
                $("#Duck").fadeOut("slow");
            }
            else {
                return false;
            }
        }
    });


    $( "#Cow" ).draggable({
        containment: "body",
        scroll: false,
        revert: "valid"
    });
    //dropable on unanswered chick picture
    $( "#cowUnAns" ).droppable( 
    { 
        accept:"#Cow", 
        drop :function(e) { 
            console.log(currentPage);
            if(currentPage == 6) {
                $('#answerThree').animate({ opacity: 1 }, { duration: 3000 });
                $("#Cow").fadeOut("slow");
            }
            else {
                return false;
            }
        }
    });
}


function preloadMedia( Media, typeData ){
    for (let data = 0; data < Media.length; ++data)
    {
        if (typeData.toLowerCase() == 'audio')
        {
                console.log("Loading audio at: " + Media[data]);
                new Audio(Media[data]);           
        }
        else if (typeData.toLowerCase() == 'img')
        {          
                console.log("Loading image at: " + Media[data]);
                (new Image()).url = Media[data];        
        }
    }
}

preloadMedia( audioURLs, 'audio' );
preloadMedia( imgURLs , 'img' );