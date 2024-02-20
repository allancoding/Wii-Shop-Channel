//
//  Sound Effect ID
//
var cSE_Slide  = 1 ;
var cSE_Forcus = 2 ;
var cSE_Decide = 3 ;
var cSE_Cancel = 4 ;
var cSE_Choise = 5 ;
var cSE_Error  = 6 ;
var cSE_AddPoint  = 7 ;

//
//  JavaScript Object
//
var snd = new wiiSound();

//
//  snd.playSE( soundeffectid );
//
//
//  snd.playBGM() : play BGM
//

function wiiFocusSound() {
    if (snd) { snd.playSE( cSE_Forcus ); }
}
function wiiSelectSound() {
    if (snd) { snd.playSE( cSE_Decide ); }
}
function wiiCancelSound() {
    if (snd) { snd.playSE( cSE_Cancel ); }
}



// Error Check
soundCheck = true;

