function id(element) {
   return document.getElementById(element);
}

function init(){

   id("gotoPage2Butt").addEventListener("click", function(){
      gotoPage2();
      notialert();
      showTimePicker();


  });

  id("gotoPage3Butt").addEventListener("click", function(){
         gotoPage3();
         notialert();
     });

   id("loadListButt").addEventListener("click", function(){
      loadList();
      notialert();
  });

}

function gotoPage2(){
   $.mobile.navigate("#page2", {info:"info goes here"});
}

function gotoPage3(){
   $.mobile.navigate("#page3", {info:"info goes here"});
}


function loadList(){
   var data = {"notifications":["08/12/2017 - 11:30","07/12/2017 - 12:30","22/12/2017 - 15:30"]}

   var myHtml ="";

   for (i=0;i<data.notifications.length;i++){
       myHtml += "<li>" + data.notifications[i] + "</li>";
   }

  id("myList").innerHTML = myHtml;


}
function notialert(){
cordova.plugins.notification.local.schedule({
    title: 'NOTI ALEEERT',
    text: 'IT WORKS OMG',
    foreground: true
});
}

function insertlist(){

  if(($("#DatePrint").text() != "") && ($("#TimePrint").text() != "") ){
      if($("#Task_title").val() != ""){
        //window.alert(DateTime.year+" "+DateTime.month+" "+DateTime.day+" "+DateTime.hour+" "+DateTime.minute);
         // window.alert("la id de la notificacion será: "+Notificationid);
        cordova.plugins.notification.local.schedule({
            id: Notificationid,
            title: $("#Task_title").val(),
            text: 'A partir de las '+DateTime.hour+":"+DateTime.minute,
            smallIcon: 'res://icon_notification.png',
           trigger: { at: new Date(moment(DateTime.year+DateTime.month+DateTime.day+"T"+DateTime.hour+DateTime.minute).format('MMMM DD ,YYYY kk:mm:ss '))}
        });
        insertDB();
      }
      else{
          window.alert("You need to set a Title for your recordatory");
      }
    }
    else{
        window.alert("You need to set a Date and a Time for your recordatory");
    }

};

function showDatePicker(){

    var options = {
    type: 'date',         // 'date' or 'time', required
    date: new Date(),     // date or timestamp, default: current date

};

window.DateTimePicker.pick(options, function (date) {
    $("#DatePrint").empty();
    $("#DatePrint").append(moment(date).format('MMMM Do YYYY'));
    DateTime = {year:moment(date).format('YYYY'),month:moment(date).format('MM'), day:moment(date).format('DD')};
});

}

function showTimePicker(){
    var options = {
    type: 'time',         // 'date' or 'time', required
    date: new Date(),     // date or timestamp, default: current date

};

window.DateTimePicker.pick(options, function (date) {
    $("#TimePrint").empty();
    $("#TimePrint").append(moment(date).format('h:mm a'));
    DateTime.hour = moment(date).format('HH');
    DateTime.minute = moment(date).format('mm');

});

}
