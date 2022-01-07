



// Establish a Socket.io connection
const socket = io('https://portal.myfixbot.com', {
  transports: ['websocket'],
  rejectUnauthorized: false
});
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();
var user = '';
var cords = [];
var poly;
var dve;
var acc_data = '';
var myData = {};
var timer = '';
var count = 0;
var page = window.location.href.split('/')[window.location.href.split('/').length - 1];
// var components = {
//     overview : {
//         cards: {
//             explorer : {
//                 base: document.getElementById('explorer'),
//                 tags: ['status','carpic','carname','cardetails'],
//                 children: {
//                     status : document.getElementById('status',),
//                     carpic : document.getElementById('carpic',),
//                     carname : document.getElementById('carname',),
//                     cardetails : document.getElementById('cardetails'),
//                 }
                
//             },
//             healthStatus : {
//                 base: document.getElementById('healthStatus'),
//                 tags: ['visitor','healthcat1','healthcat2','healthcat3', 'healthExpand'],
//                 children: {
//                     healthChart: document.getElementById('visitor'),
//                     healthcat1 : document.getElementById('healthcat1',),
//                     healthcat2 : document.getElementById('healthcat2',),
//                     healthcat3 : document.getElementById('healthcat3',),
//                     healthExpand : document.getElementById('healthExpand'),
//                 }
//             },
//             alarms : {
//                 base: document.getElementById('alarms'),
//                 tags: ['alarm1','alarm2','alarm3','alarm4'],
//                 children: {
//                     alarm1: document.getElementById('alarm1').children[0],
//                     alarm2 : document.getElementById('alarm2',).children[0],
//                     alarm3 : document.getElementById('alarm3',).children[0],
//                     alarm4 : document.getElementById('alarm4',).children[0],
//                 }
//             },
//             feeds : {
//                 base: document.getElementById('feeds'),
//                 tags: ['feed1','feed2','feed3','feed4','feed5'],
//                 children: {
//                     feed1: document.getElementById('feed1').children[0],
//                     feed2 : document.getElementById('feed2',).children[0],
//                     feed3 : document.getElementById('feed3',).children[0],
//                     feed4 : document.getElementById('feed4',).children[0],
//                     feed5: document.getElementById('feed5').children[0]
//                 }
//             },
//             engineData : {
//                 base: document.getElementById('engineData'),
//                 tags: ['card1','card2','card3','card4'],
//                 children: {
//                     card1: {
//                         name: document.getElementById('engineData').children[0].children[0].children[0].children[0].children[0],
//                         value: document.getElementById('engineData').children[0].children[0].children[0].children[0].children[2],
//                         label: document.getElementById('engineData').children[0].children[0].children[0].children[0].children[3],
//                         percent: document.getElementById('engineData').children[0].children[0].children[0].children[1].children[0],
//                     },
//                     card2: {
//                         name: document.getElementById('engineData').children[1].children[0].children[0].children[0].children[0],
//                         value: document.getElementById('engineData').children[1].children[0].children[0].children[0].children[2],
//                         label: document.getElementById('engineData').children[1].children[0].children[0].children[0].children[3],
//                         percent: document.getElementById('engineData').children[1].children[0].children[0].children[1].children[0],

//                     },
//                     card3: {
//                         name: document.getElementById('engineData').children[2].children[0].children[0].children[0].children[0],
//                         value: document.getElementById('engineData').children[2].children[0].children[0].children[0].children[2],
//                         label: document.getElementById('engineData').children[2].children[0].children[0].children[0].children[3],
//                         percent: document.getElementById('engineData').children[2].children[0].children[0].children[1].children[0],

//                     },
//                     card4: {
//                         name: document.getElementById('engineData').children[3].children[0].children[0].children[0].children[0],
//                         value: document.getElementById('engineData').children[3].children[0].children[0].children[0].children[2],
//                         label: document.getElementById('engineData').children[3].children[0].children[0].children[0].children[3],
//                         percent: document.getElementById('engineData').children[3].children[0].children[0].children[1].children[0],

//                     },
//                 }
//             },
//             mapNavigator : {
//                 base: document.getElementById('mapNavigator'),
//                 tags: ['map','location','status','address','options'],
//                 children: {
//                     map : document.getElementById('mapNavigator').children[0].children[0],
//                     location : document.getElementById('mapNavigator').children[0].children[1],
//                     status : document.getElementById('mapNavigator').children[0].children[2],
//                     address : document.getElementById('mapNavigator').children[0].children[3],
//                     options: {
//                         locationHistory : document.getElementById('mapNavigator').children[0].children[4].children[0].children[0].children[0].children[0].children[2].children[0],
//                         geoFence : document.getElementById('mapNavigator').children[0].children[4].children[1].children[0].children[0].children[0].children[2].children[0],
//                         goingSomewhere : document.getElementById('mapNavigator').children[0].children[4].children[2].children[0].children[0].children[0].children[2].children[0]
//                     }
                    


//                 }
//             },
//             healthSummary : {
//                 base: document.getElementById('healthSummary'),
//                 tags: ['car', 'faults','stats','reminders'],
//                 children: {
//                     car: {
//                         name: document.getElementById('healthSummary').children[1].children[0].children[0].children[1].children[0],
//                         id: document.getElementById('healthSummary').children[1].children[0].children[0].children[1].children[1],
//                     },
//                     faults:{


//                     },
//                     stats:{

//                     },
//                     reminders:{

//                     }
//                 }
//             }
//         }

//     },
//     maps : {

//     },
//     faultchecker: {

//     }
// }


client.configure(feathers.socketio(socket));
// Use localStorage to store our login token
client.configure(feathers.authentication());

const getCredentials = () => {
    const user = {
      email: document.getElementById('Uname').value,
      password: document.getElementById('Upass').value
    };
  return user;
};

// Log in either using the given email/password or the token from storage
const login = async credentials => {
    try {
      if(!credentials) {
        // Try to authenticate using an existing token
        await client.reAuthenticate();
      } else {
        // Otherwise log in with the `local` strategy using the credentials we got
        await client.authenticate({
          strategy: 'local',
          ...credentials
        });
        
      }
      user = await client.authenticate();
      console.log(user.user._id);
      clearInterval(timer)
      timer = setInterval(function(){ showProgress('note', 'login') }, 1000);
  
      // If successful, show the chat page
    //   showChat();
    } catch(error) {
      // If we got an error, show the login page
    //   showLogin(error);
        switch(error.name){
            case 'NotAuthenticated': {
                // window.location.assign("pages-login.html.htm");
                if(document.getElementById('note') !== undefined){
                    document.getElementById('note').innerHTML = error.message;
                }
                
                console.log(error.message);
            }
            break;
        }
        // console.log(error);
    }
    
};

const addEventListener = (selector, event, handler) => {
    document.addEventListener(event, async ev => {
      if (ev.target.closest(selector)) {
        handler(ev);
      }
    });
};
  
  // "Signup and login" button click handler
addEventListener('#signup', 'click', async () => {
    // For signup, create a new user and then log them in
    const credentials = getCredentials();
      
    // First create the user
    await client.service('users').create(credentials);
    // If successful log them in
    await login(credentials);
    // user = credentials;

});
  
  // "Login" button click handler
addEventListener('#login', 'click', async () => {
    const user = getCredentials();
  
    await login(user);
    console.log(user);
    // timer = setInterval(function(){ showProgress('note', 'login') }, 1000);
    
    
});
  

  // "Logout" button click handler
addEventListener('#logout', 'click', async () => {
  await client.logout();
});

var payNow = function(){
    window.location.assign("https://paystack.com/pay/fixbotday1");
};

var storeml = function(){
    var emal = document.getElementById('eml').value;
    if(emal.split('@').length > 1){
        var dir = firebase.database().ref().child("public/FIXBOT/Interested People/");
        var dt = {};
        
        var el = "";
        for (it in emal.split('@')[0].split('.')){
            el += emal.split('@')[0].split('.')[it]    
        }
        
        
        
        dt[el] = {
            "Verified": "No",
            "No of Messages sent": "0",
            'email': emal,
        };
        console.log('hi there')
        
        dir.update(dt, function (error) {
            if (error) {
                confirm("Something went wrong, Try again");

                console.log(error);
            } else {
                if (confirm("Thank you for signing up to get early access to Fixbot. We’ll contact you with information on the next steps.In the meantime, help us spread the word by clicking OK.")){
                    window.location.assign("https://twitter.com/intent/tweet?text=I just signed up for early access to @FixBotHQ. Stop the guess work, monitor your car's health status the smart way.\r\n %0A%0A%23FixBot%20%23Telematics");
                };
            }
        });
    }
    else{
        alert("That's not a valid email.");
    }
    
};
 


var showProgress = function(element, type){
    if(type == 'login'){
        evnts = [
            "Fetching Data.....",
            "Data Fetch Complete",
            "Setting up the Dashboard..."
        ];
        if(page.split(".")[0].indexOf('login') !== -1){
            document.getElementById(element).innerHTML = evnts[count];
            if(count > evnts.length){
                clearInterval(timer);
                client.service('dbapi').get({}).then(dt => {
                    acc_data = dt;
                    console.log(acc_data);
                    switch (acc_data.account.cls.toLowerCase()) {
                        case "fixbotadmin": {
                            window.location.assign("indexFixbotAdmin.html");
                        }
                        break;
                        case "admin": {
                            window.location.assign("indexAdmin.html");
                        }
                        break;
                        default:{
                            console.log(acc_data.account.cls);
                        }
    
                    }
                })
                
            }
        }
        else{
            console.log(evnts[count])
            clearInterval(timer);
        }
        count++;
        
        
    }
    
}
// var fetch_ele = function(page, widget, component){
//     var parent = '';
//     switch(page.toLowerCase()){
//         case 'overview': {
//             switch(widget){
//                 case 'cards': {
//                     switch(component){
//                         case 'explorer': {
//                             parent = {
//                                 'main' : components.overview.cards.explorer.base,
//                                 'children' : components.overview.cards.explorer.children

//                             } 
                            
//                             break;
//                         }
//                         case 'healthStatus':{
//                             parent = components.overview.cards.explorer.base
//                             break;
//                         }
//                         case 'alarms': {
//                             parent = components.overview.cards.alarms.base
                            
            

//                             break;
//                         }
//                         case 'feeds':{
//                             parent = components.overview.cards.feeds.base
                            
                            
//                             break;
//                         }
//                         case 'engineData': {
//                             parent = components.overview.cards.engineData.base
                            
            

//                             break;
//                         }
//                         case 'mapNavigator':{
//                             parent = components.overview.cards.mapNavigator.base
                            
                            
//                             break;
//                         }
//                         case 'healthSummary': {
//                             parent = components.overview.cards.healthSummary.base
                            
            

//                             break;
//                         }
                        
                        
//                         default: {
            

//                             break;
//                         }
//                     }
                    

//                     break;
//                 }
//                 default: {
//                     parent = []
//                     Object.keys(components[page].cards).forEach(ele => {
//                         parent.push(
//                             {
//                                 'card' : components[page].cards[ele].base,
//                                 'children': components[page].cards[ele].children
//                             }
//                         )
//                     })
//                     break;
//                 }

//             }

//             break;
//         }
//         case 'map': {
            

//             break;
//         }
//         case 'faultcheck': {
            

//             break;
//         }
//         default: {
            

//             break;
//         }
        
//     }
//     return parent;
// };
console.log('awrccdsevzdfd');
  
//   // "Send" message form submission handler
// addEventListener('#send-message', 'submit', async ev => {
//     // This is the message text input field
//   // //console.log(clientInformation.clipboard.readText());
//   const input = document.querySelector('[name="text"]');
  
//   ev.preventDefault();
//   // console.log(user.user._id)
//     // Create a new message and then clear the input field
//   await client.service('messages').create({
//     text: input.value,
//     // userId: user.user._id

//   });
  
//   input.value = '';
// });


if(login()){
    if(page.split(".").includes('login') !== false){
        console.log(page.split(".").includes('login'));
    }
    else if (page.split(".").includes("indexAdmin") !== false) {
        client.authenticate().then(usr => {
            client.service('dbapi').get({}).then(snap => {
                console.log(snap);
                var myData = snap[usr.user.email];
                var fnam = document.getElementsByClassName("fnam");
                var nam = document.getElementsByClassName("nam");
                var namclass = document.getElementById("namclass");
                var carpic = document.getElementById("carpic");
                var cardetails = document.getElementById("cardetails");
                var namsubstart = document.getElementById("namsubstart");
                var namsubexp = document.getElementById("namsubexp");
                var namsubbal = document.getElementsByClassName("namsubbal");
                var eml = document.getElementsByClassName("eml");
                var phnnum = document.getElementsByClassName("phnnum");
                var add = document.getElementsByClassName("add");
                var assets = document.getElementById("assetz");
                var carname = document.getElementById("carname");
                var asset = document.getElementById("asset");
                var namuserovw = document.getElementById("namuserovw");
                var namcarsubs = document.getElementById("namcarsubs");
                var namassets = document.getElementById("namassets");
                var sngnam = document.getElementById("sngnam");
                var sngnamcond = document.getElementById("sngnamcond");
                var sngnamdet = document.getElementById("sngnamdet");
                var namcarmodel = document.getElementById("namcarmodel");
                var namtrackmap = document.getElementById("namtrackmap");
                var namwindspeed = document.getElementById("namwindspeed");
                var namtotalmileage = document.getElementById("namtotalmileage");
                var namtotalcrashes = document.getElementById("namtotalcrashes");
                var runningspeed = document.getElementById("runningspeed");
                var throttleopeningwidth = document.getElementById("throttleopeningwidth");
                var engineload = document.getElementById("engineload");
                var coolanttemperature = document.getElementById("coolanttemperature");
                var instantenousfuelconsumption = document.getElementById("instantenousfuelconsumption");
                var averagefuelconsumption = document.getElementById("averagefuelconsumption");
                var drivingrange = document.getElementById("drivingrange");
                var totalmileage = document.getElementById("totalmileage");
                var singlefuelconsumptionvol = document.getElementById("singlefuelconsumptionvol");
                var totalfuelconsumptionvol = document.getElementById("totalfuelconsumptionvol");
                var currenterrorcodenos = document.getElementById("currenterrorcodenos");
                var harshaccelerationno = document.getElementById("harshaccelerationno");
                var harshbrakeno = document.getElementById("harshbrakeno");
                var drivingbehaviourdata = document.getElementById("drivingbehaviourdata");
                var batteryvoltage = document.getElementById("batteryvoltage");
                var enginespeed = document.getElementById("enginespeed");
                var batteryvoltagebar = document.getElementById("batteryvoltagebar");
                var enginespeedbar = document.getElementById("enginespeedbar");
                var runningspeedbar = document.getElementById("runningspeedbar");
                var throttleopeningwidthbar = document.getElementById("throttleopeningwidthbar");
                var engineloadbar = document.getElementById("engineloadbar");
                var coolanttemperaturebar = document.getElementById("coolanttemperaturebar");
                var instantenousfuelconsumptionbar = document.getElementById("instantenousfuelconsumptionbar");
                var averagefuelconsumptionbar = document.getElementById("averagefuelconsumptionbar");
                var drivingrangebar = document.getElementById("drivingrangebar");
                var totalmileagebar = document.getElementById("totalmileagebar");
                var singlefuelconsumptionvolbar = document.getElementById("singlefuelconsumptionvolbar");
                var totalfuelconsumptionvolbar = document.getElementById("totalfuelconsumptionvolbar");
                var currenterrorcodenosbar = document.getElementById("currenterrorcodenosbar");
                var harshaccelerationnobar = document.getElementById("harshaccelerationnobar");
                var harshbrakenobar = document.getElementById("harshbrakenobar");
                var namign = document.getElementById("namign");
                var namdrivtim = document.getElementById("namdrivtim");
                var namidltim = document.getElementById("namidltim");       
                var namhotstarts = document.getElementById("namhotstarts");
                var namavgspeed = document.getElementById("namavgspeed");
                var namhighestspeed = document.getElementById("namhighestspeed");
                var namengrotation = document.getElementById("namengrotation");
                var namharshaccel = document.getElementById("namharshaccel");
                var namharshbraking = document.getElementById("namharshbraking");
                var namignbar = document.getElementById("namignbar");
                var namdrivtimbar = document.getElementById("namdrivtimbar");
                var namidltimbar = document.getElementById("namidltimbar");
                var namhotstartsbar = document.getElementById("namhotstartsbar");
                var namavgspeedbar = document.getElementById("namavgspeedbar");
                var namhighestspeedbar = document.getElementById("namhighestspeedbar");
                var namengrotationbar = document.getElementById("namengrotationbar");
                var namharshaccelbar = document.getElementById("namharshaccelbar");
                var namharshbrakingbar = document.getElementById("namharshbrakingbar");
                var map = document.getElementById("map");
                
                var weekly = [];
                for (it in nam) {                        
                    if (snap !== undefined) {
                        nam[it].innerHTML = snap.account.username;
                    }
                    else {
                        nam[it].innerHTML = "Not Set";
                    }
    
                }
                cardetails.innerHTML = snap.devices[0].reg_id;
                var timer = setTimeout(function () {
                    var deve = document.getElementById('pointer');
                    var sta = document.getElementById('status');
                    sta.innerText = "Initializing...";
                    deve.style.background = "grey";
                }, 3000);
                dve = snap.devices[0]["Device data"];
                console.log(dve);
                var lon = document.getElementById("Lon");
                var lat = document.getElementById("Lat");
                // if(dve.CarMD !== undefined){
                //     carpicurl = dve.CarMD.Vimg;
                //     carpic.src = carpicurl;
                // }
            
                map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: 10, lng: 10 },
                    zoom: 8,
                });
                mark = new google.maps.Marker({ position: { lat: dve.location.latitude, lng: dve.location.longitude }, map: map, animation: google.maps.Animation.DROP });
                var latLng = new google.maps.LatLng(dve.location.latitude, dve.location.longitude); //Makes a latlng
                map.panTo(latLng);
                map.addListener("center_changed", () => {
                    // 3 seconds after the center of the map has changed, pan back to the
                    // marker.
                    window.setTimeout(() => {
                        map.panTo(latLng);
                    }, 3000);
                });
                mark.addListener("click", () => {
                    map.setZoom(15);
                    map.setCenter(latLng);
                });
                runningspeed.innerText = dve.canbus.running_speed;
                coolanttemperature.innerText = dve.canbus.coolant_temp;
                totalfuelconsumptionvol.innerText = dve.canbus.total_fuel_consumption_vol;
                batteryvoltage.innerText = dve.canbus.battery_voltage;
                var gaugeChart = echarts.init(document.getElementById('gauge-chart'));
                option = {
                    tooltip: {
                        formatter: "{a} <br/>{b} : {c}%"
                    }
                    , toolbox: {
                        show: false
                        , feature: {
                            mark: {
                                show: true
                            }
                            , restore: {
                                show: true
                            }
                            , saveAsImage: {
                                show: true
                            }
                        }
                    }
                    , series: [
                        {
                            name: '', 
                            type: 'gauge',
                            splitNumber: 0, // 分割段数，默认为5
                            axisLine: { // 坐标轴线
                                lineStyle: { // 属性lineStyle控制线条样式
                                    color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                    width: 20
                                }
                            }
                            , axisTick: { // 坐标轴小标记
                                splitNumber: 0, // 每份split细分多少段
                                length: 12, // 属性length控制线长
                                lineStyle: { // 属性lineStyle控制线条样式
                                    color: 'auto'
                                }
                            }
                            , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    color: 'auto'
                                }
                            }
                            , splitLine: { // 分隔线
                                show: false, // 默认显示，属性show控制显示与否
                                length: 50, // 属性length控制线长
                                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                    color: 'auto'
                                }
                            }
                            , pointer: {
                                width: 5
                                , color: '#54667a'
                            }
                            , title: {
                                show: false
                                , offsetCenter: [0, '-40%'], // x, y，单位px
                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    fontWeight: 'bolder'
                                }
                            }
                            , detail: {
                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    color: 'auto'
                                    , fontSize: '14'
                                    , fontWeight: 'bolder'
                                }
                            }
                            , data: [{
                                value: parseInt(dve.canbus.running_speed), 
                                name: 'Speed'
                            }]
                        }
                    ]
                };
                timeTicket = setInterval(function () {
                    // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                    gaugeChart.setOption(option, true);
                }, 2000)
                // use configuration item and data specified to show chart
                gaugeChart.setOption(option, true), $(function () {
                    function resize() {
                        setTimeout(function () {
                            gaugeChart.resize()
                        }, 100)
                    }
                    $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                });

                //Canbus Data
                console.log(getpcnt("batteryvoltage", dve.canbus.battery_voltage, "val"));
                batteryvoltagebar.innerHTML = `<div data-label="${getpcnt("batteryvoltage", dve.canbus.battery_voltage, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("batteryvoltagebar", dve.canbus.battery_voltage, "bar")}"></div>`;
                coolanttemperaturebar.innerHTML = `<div data-label="${getpcnt("coolanttemperature", dve.canbus.coolant_temp, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("coolanttemperature", dve.canbus.coolant_temp, "bar")}"></div>`;
                totalfuelconsumptionvolbar.innerHTML = `<div data-label="${getpcnt("totalfuelconsumptionvol", dve.canbus.total_fuel_consumption_vol, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("totalfuelconsumptionvol", dve.canbus.total_fuel_consumption_vol, "bar")}"></div>`;
                
                //Drvier behaviour

                namign.innerText = dve["driver behavior"].total_ignition_no;
                namdrivtim.innerText = dve["driver behavior"].total_driving_time;
                namidltim.innerText = dve["driver behavior"].total_idling_time;
                namhotstarts.innerText = dve["driver behavior"].average_hot_start_time;
                namavgspeed.innerText = dve["driver behavior"].average_speed;
                namhighestspeed.innerText = dve["driver behavior"].history_highest_speed;
                namengrotation.innerText = dve["driver behavior"].history_highest_rotation;
                namharshaccel.innerText = dve["driver behavior"].total_harsh_acceleration_no;
                namharshbraking.innerText = dve["driver behavior"].total_harsh_brake_no;
                console.log(parseFloat(dve.canbus.engine_load))
                $("#namignbar").addClass("label-info");
                $("#namdrivtimbar").addClass("label-info");
                $("#namidltimbar").addClass("label-info");
                $("#namhotstartsbar").addClass("label-info");
                $("#namavgspeedbar").addClass("label-info");
                $("#namhighestspeedbar").addClass("label-info");
                $("#namengrotationbar").addClass("label-info");
                $("#namharshaccelbar").addClass("label-info");
                $("#namharshbrakingbar").addClass("label-info");
                namignbar.innerText = "Normal";
                namdrivtimbar.innerText = "Normal";
                namidltimbar.innerText = "Normal";
                namhotstartsbar.innerText = "Normal";
                namavgspeedbar.innerText = "Normal";
                namhighestspeedbar.innerText = "Normal";
                namengrotationbar.innerText = "Normal";
                namharshaccelbar.innerText = "Normal";
                namharshbrakingbar.innerText = "Normal";
                
                //Fault Check

                var recvd = document.getElementById('recvd');
                var recvdtime = document.getElementById('recvdtime');
                var recvderr = document.getElementById('recvderr');
                var recvderrcond = document.getElementById('recvderrcond');
                var recvdsum = document.getElementById('recvdsum');
                recvderr.innerHTML = "Scanning for Faults";
                recvderrcond.innerHTML = "loading...";
                recvdsum.innerHTML = "Please wait while our system checks your car for faults..."
                // console.log(dat);
                client.service('dbapi').on('value', function(dat){
                    clearTimeout(timer);
                    var dev = document.getElementById('pointer');
                    var stat = document.getElementById('status');
                    dev.style.background = "green";
                    
                    if((dve.location.latitude !== dat.devices[0]["Device data"].location.latitude || dve.location.longitude !== dat.devices[0]["Device data"].location.longitude) == true || parseInt(dat.devices[0]["Device data"].canbus.running_speed) !== 0){
                        stat.innerText = "Online and Moving";
                    }
                    else{
                        stat.innerText = "Online and Not Moving";
                    }
                    
                    
                    timer = setTimeout(function (){
                        dev.style.background = "grey";
                        stat.innerText = "Offline";
                    }, 10000);
                    console.log(dat);
                    
                    
                    dve = dat.devices[0]["Device data"];
                    recvderr.innerHTML = "No Faults Found";
                    recvderrcond.innerHTML = "Okay";
                    recvdsum.innerHTML = "Your Car is currently fault free, Carry on and Drive Safely."
                    $('#recvderrcond').removeClass('label-light-info');
                    $('#recvderrcond').addClass('label-info');
                    mark = new google.maps.Marker({ position: { lat: dve.location.latitude, lng: dve.location.longitude }, map: map });
                    var latLng = new google.maps.LatLng(dve.location.latitude, dve.location.longitude); //Makes a latlng
                    map.panTo(latLng);
                    map.addListener("center_changed", () => {
                        // 3 seconds after the center of the map has changed, pan back to the
                        // marker.
                        window.setTimeout(() => {
                            map.panTo(latLng);
                        }, 10000);
                    });
                    mark.addListener("click", () => {
                        map.setZoom(15);
                        map.setCenter(latLng);
                    });
                    runningspeed.innerText = dve.canbus.running_speed;
                    coolanttemperature.innerText = dve.canbus.coolant_temp;
                    totalfuelconsumptionvol.innerText = dve.canbus.total_fuel_consumption_vol;
                    batteryvoltage.innerText = dve.canbus.battery_voltage;

                    option = {
                        tooltip: {
                            formatter: "{a} <br/>{b} : {c}%"
                        }
                        , toolbox: {
                            show: false
                            , feature: {
                                mark: {
                                    show: true
                                }
                                , restore: {
                                    show: true
                                }
                                , saveAsImage: {
                                    show: true
                                }
                            }
                        }
                        , series: [
                            {
                                name: '', 
                                type: 'gauge',
                                splitNumber: 0, // 分割段数，默认为5
                                axisLine: { // 坐标轴线
                                    lineStyle: { // 属性lineStyle控制线条样式
                                        color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                        width: 20
                                    }
                                }
                                , axisTick: { // 坐标轴小标记
                                    splitNumber: 0, // 每份split细分多少段
                                    length: 12, // 属性length控制线长
                                    lineStyle: { // 属性lineStyle控制线条样式
                                        color: 'auto'
                                    }
                                }
                                , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                        color: 'auto'
                                    }
                                }
                                , splitLine: { // 分隔线
                                    show: false, // 默认显示，属性show控制显示与否
                                    length: 50, // 属性length控制线长
                                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                        color: 'auto'
                                    }
                                }
                                , pointer: {
                                    width: 5
                                    , color: '#54667a'
                                }
                                , title: {
                                    show: false
                                    , offsetCenter: [0, '-40%'], // x, y，单位px
                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                        fontWeight: 'bolder'
                                    }
                                }
                                , detail: {
                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                        color: 'auto'
                                        , fontSize: '14'
                                        , fontWeight: 'bolder'
                                    }
                                }
                                , data: [{
                                    value: parseInt(dve.canbus.running_speed), 
                                    name: 'Speed'
                                }]
                            }
                        ]
                    };
                    timeTicket = setInterval(function () {
                        // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                        gaugeChart.setOption(option, true);
                    }, 2000)
                    // use configuration item and data specified to show chart
                    gaugeChart.setOption(option, true), $(function () {
                        function resize() {
                            setTimeout(function () {
                                gaugeChart.resize()
                            }, 100)
                        }
                        $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                    });
    
                    //Canbus Data
                    console.log(getpcnt("batteryvoltage", dve.canbus.battery_voltage, "val"));
                    batteryvoltagebar.innerHTML = `<div data-label="${getpcnt("batteryvoltage", dve.canbus.battery_voltage, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("batteryvoltagebar", dve.canbus.battery_voltage, "bar")}"></div>`;
                    coolanttemperaturebar.innerHTML = `<div data-label="${getpcnt("coolanttemperature", dve.canbus.coolant_temp, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("coolanttemperature", dve.canbus.coolant_temp, "bar")}"></div>`;
                    totalfuelconsumptionvolbar.innerHTML = `<div data-label="${getpcnt("totalfuelconsumptionvol", dve.canbus.total_fuel_consumption_vol, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("totalfuelconsumptionvol", dve.canbus.total_fuel_consumption_vol, "bar")}"></div>`;
                    
                    //Drvier behaviour
    
                    namign.innerText = dve["driver behavior"].total_ignition_no;
                    namdrivtim.innerText = dve["driver behavior"].total_driving_time;
                    namidltim.innerText = dve["driver behavior"].total_idling_time;
                    namhotstarts.innerText = dve["driver behavior"].average_hot_start_time;
                    namavgspeed.innerText = dve["driver behavior"].average_speed;
                    namhighestspeed.innerText = dve["driver behavior"].history_highest_speed;
                    namengrotation.innerText = dve["driver behavior"].history_highest_rotation;
                    namharshaccel.innerText = dve["driver behavior"].total_harsh_acceleration_no;
                    namharshbraking.innerText = dve["driver behavior"].total_harsh_brake_no;
                    console.log(parseFloat(dve.canbus.engine_load))
                    $("#namignbar").addClass("label-info");
                    $("#namdrivtimbar").addClass("label-info");
                    $("#namidltimbar").addClass("label-info");
                    $("#namhotstartsbar").addClass("label-info");
                    $("#namavgspeedbar").addClass("label-info");
                    $("#namhighestspeedbar").addClass("label-info");
                    $("#namengrotationbar").addClass("label-info");
                    $("#namharshaccelbar").addClass("label-info");
                    $("#namharshbrakingbar").addClass("label-info");
                    namignbar.innerText = "Normal";
                    namdrivtimbar.innerText = "Normal";
                    namidltimbar.innerText = "Normal";
                    namhotstartsbar.innerText = "Normal";
                    namavgspeedbar.innerText = "Normal";
                    namhighestspeedbar.innerText = "Normal";
                    namengrotationbar.innerText = "Normal";
                    namharshaccelbar.innerText = "Normal";
                    namharshbrakingbar.innerText = "Normal";

                

                    
                
                })
            });
        })

    }
    else if (page.split(".").includes("indexAdminMaps") !== false) {
        client.authenticate().then(usr => {
            client.service('dbapi').get({}).then(snap => {
                var zoom = 8;
                var lon = document.getElementById("Lon");
                var lat = document.getElementById("Lat");
                var timer = setTimeout(function () {
                    var deve = document.getElementById('pointer');
                    var sta = document.getElementById('status');
                    sta.innerText = "Initializing...";
                    deve.style.background = "yellow";
                }, 3000);
                dve = snap.devices[0]["Device data"];
                map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: 10, lng: 10 },
                    zoom: zoom,
                });
                poly = new google.maps.Polyline({
                    strokeColor: "#000000",
                    strokeOpacity: 1.0,
                    strokeWeight: 3,
                });
                poly.setMap(map);
                var carimg = "./fixbotimg/car.jpg";
                if(dve.carmd.image !== undefined){
                    carimg = dve.carmd.image.image;
                }
                
                
                const contentString =
                    '<div style="max-width: 400px ">' +
                    '<div class="card-body">' +
                    '<div id="content" >' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    
                    '<div id="bodyContent">' +
                    '<div class="d-flex flex-row">' +
                            `<div class="card" style="max-width: 30%; border-radius: 20px; overflow: hidden; padding: 1px; margin-right: 20px;"><img src=${carimg}></div>` +
                                '<div class="m-l-10 align-self-center">' +
                                    '<h3 class="m-b-0 font-lgiht">Your Car</h3>' +
                                    '<h5 class="text-muted m-b-0">Your Car\'s current location </h5>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        
                        
                        
                        `<h3><strong>Speed: </strong>${dve.canbus.running_speed}</h3>`+
                        `<h3><strong>Battery Voltage: </strong>${dve.canbus.battery_voltage}</h3>`+
                        `<h3><strong>Fuel Level: </strong>${dve.canbus.coolant_temp}</h3>`+
                        `<h3>See your Details @, <a href="https://myfixbot.com/indexAdminFaults">here</a> </h3>` 
                        
                        
                    
                    
                    "</div>" +
                    "</div>" +
                    "</div>" 

                ;
                const infowindow = new google.maps.InfoWindow({
                    content: contentString,
                });
                mark = new google.maps.Marker({ position: { lat: dve.location.latitude, lng: dve.location.longitude }, map: map, animation: google.maps.Animation.DROP});
                var latLng = new google.maps.LatLng(dve.location.latitude, dve.location.longitude); //Makes a latlng

                map.panTo(latLng);
                var tog = false;
                map.addListener("center_changed", () => {
                    // 3 seconds after the center of the map has changed, pan back to the
                    // marker.
                    window.setTimeout(() => {
                        if(!tog){
                            map.panTo(latLng);
                        }
                        
                    }, 3000);
                });
                
                mark.addListener("click", () => {
                    tog = !tog;
                    if(tog){
                        infowindow.open(map, mark);
                    }
                    else{
                        infowindow.close(map, mark);
                    }
                    // map.setZoom(15);
                    // map.setCenter(latLng);

                    

                });

                map.addListener("click", addLatLng);
                
                data = dve.logs;
                var positio = [];
                var cnt = 0;
                loci = {};
                loc = [];
                
                for (i in data){
                    cnt++;
                    if(cnt < 10){
                        if(data[i].data.action == 'ping'){
                            
                            // insrt(loci, [
                            //     data[i].date.split(' ')[2],
                            //     data[i].date.split(' ')[1],
                            //     data[i].date.split(' ')[0],
                            //     data[i].time.split(':')[0],
                            //     data[i].time.split(':')[1],
                            //     data[i].time.split(':')[2]
                            // ], {
                            //     lat: data[i].data.data.latitude,
                            //     lng: data[i].data.data.longitude
                            // });
                            loc.push({
                                lat: data[i].data.data.latitude,
                                lng: data[i].data.data.longitude
                            });

                            
                               
                            
                            
                        }
                        else if(data[i].data.location == undefined){

                            // insrt(loc, [
                            //     data[i].date.split(' ')[2],
                            //     data[i].date.split(' ')[1],
                            //     data[i].date.split(' ')[0],
                            //     data[i].time.split(':')[0],
                            //     data[i].time.split(':')[1],
                            //     data[i].time.split(':')[2]
                            // ], {
                            //     lat: data[i].data.data.latitude,
                            //     lng: data[i].data.data.longitude
                            // });
                            loc.push({
                                lat: data[i].data.data.latitude,
                                lng: data[i].data.data.longitude
                            });
                        }

                    
                    }
                    else{
                        // console.log(i);
                        break;
                    }
                    
                    
                }

                const flightPath = new google.maps.Polyline({
                    path: loc,
                    geodesic: false,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 10,
                });
                
                flightPath.setMap(map);
                var latLnge = new google.maps.LatLng(loc[0].lat, loc[0].lng); //Makes a latlng
                for(u in loc){
                    if(u < loc.length){
                        new google.maps.Marker({ position: { lat: loc[u].lat, lng: loc[u].lng }, map: map, animation: google.maps.Animation.DROP});
                        
                    }
                    
                }
                map.setZoom(15);
                map.panTo(latLnge);

                client.service('dbapi').on('value', function(dat){
                    
                    clearTimeout(timer);
                    var dev = document.getElementById('pointer');
                    var stat = document.getElementById('status');
                    dev.style.background = "green";
                    if((dve.location.latitude !== dat.devices[0]["Device data"].location.latitude || dve.location.longitude !== dat.devices[0]["Device data"].location.longitude) == true || parseInt(dat.devices[0]["Device data"].canbus.running_speed) !== 0){
                        stat.innerText = "Online and Moving";
                    }
                    else{
                        stat.innerText = "Online and Not Moving";
                    }
                    
                    
                    timer = setTimeout(function (){
                        dev.style.background = "grey";
                        stat.innerText = "Offline";
                    }, 10000);
                    
                    
                    dve = dat.devices[0]["Device data"];
                    if(dve.carmd.image !== undefined){
                        carimg = dve.carmd.image.image;
                    }
                    
                    // map = new google.maps.Map(document.getElementById("map"), {
                    //     center: { lat: 10, lng: 10 },
                    //     zoom: zoom,
                    // });
                    
                    const contentString =
                        '<div style="max-width: 400px ">' +
                        '<div class="card-body">' +
                        '<div id="content" >' +
                        '<div id="siteNotice">' +
                        "</div>" +
                        
                        '<div id="bodyContent">' +
                        '<div class="d-flex flex-row">' +
                            `<div class="card" style="max-width: 30%; border-radius: 20px; overflow: hidden; padding: 1px; margin-right: 20px;"><img src=${carimg}></div>` +
                                    '<div class="m-l-10 align-self-center">' +
                                        '<h3 class="m-b-0 font-lgiht">Your Car</h3>' +
                                        '<h5 class="text-muted m-b-0">Your Car\'s current location </h5>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            
                            
                            
                            `<p><strong>Speed: </strong>${dve.canbus.running_speed}</p>`+
                            `<p><strong>Battery Voltage: </strong>${dve.canbus.battery_voltage}</p>`+
                            `<p><strong>Fuel Level: </strong>${dve.canbus.coolant_temp}</p>`+
                            '<p>See your Details @, <a href="https://myfixbot.com/indexAdminFaults">' 
                            
                            
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" 

                    ;
                    const infowindow = new google.maps.InfoWindow({
                        content: contentString,
                    });
                    mark = new google.maps.Marker({ position: { lat: dve.location.latitude, lng: dve.location.longitude }, map: map });
                    var latLng = new google.maps.LatLng(dve.location.latitude, dve.location.longitude); //Makes a latlng

                    map.panTo(latLng);
                    var tog = false;
                    map.addListener("center_changed", () => {
                        // 3 seconds after the center of the map has changed, pan back to the
                        // marker.
                        window.setTimeout(() => {
                            if(!tog){
                                map.panTo(latLng);
                            }
                            
                        }, 3000);
                    });
                    
                    mark.addListener("click", () => {
                        tog = !tog;
                        if(tog){
                            infowindow.open(map, mark);
                        }
                        else{
                            infowindow.close(map, mark);
                        }
                        // map.setZoom(15);
                        // map.setCenter(latLng);

                        

                    });
                
                })
            });
        })
    }
    else if (page.split(".")[0].indexOf("indexAdminFaults") !== -1) {
        client.authenticate().then(usr => {
            client.service('dbapi').get({}).then(snap => {
                console.log(snap);
                var myData = snap[usr.user.email];
                var cardetails = document.getElementById("cardetails");
                var carname = document.getElementById("carname");
                var canbus_cat = document.getElementById('namdbdaye');
                var error_cdes = document.getElementById('namdbday');
                var runningspeed = document.getElementById("runningspeed");
                var throttleopeningwidth = document.getElementById("throttleopeningwidth");
                var engineload = document.getElementById("engineload");
                var coolanttemperature = document.getElementById("coolanttemperature");
                var instantenousfuelconsumption = document.getElementById("instantenousfuelconsumption");
                var averagefuelconsumption = document.getElementById("averagefuelconsumption");
                var drivingrange = document.getElementById("drivingrange");
                var totalmileage = document.getElementById("totalmileage");
                var singlefuelconsumptionvol = document.getElementById("singlefuelconsumptionvol");
                var totalfuelconsumptionvol = document.getElementById("totalfuelconsumptionvol");
                var currenterrorcodenos = document.getElementById("currenterrorcodenos");
                var harshaccelerationno = document.getElementById("harshaccelerationno");
                var harshbrakeno = document.getElementById("harshbrakeno");
                var drivingbehaviourdata = document.getElementById("drivingbehaviourdata");
                var batteryvoltage = document.getElementById("batteryvoltage");
                var enginespeed = document.getElementById("enginespeed");
                var batteryvoltagebar = document.getElementById("batteryvoltagebar");
                var enginespeedbar = document.getElementById("enginespeedbar");
                var runningspeedbar = document.getElementById("runningspeedbar");
                var throttleopeningwidthbar = document.getElementById("throttleopeningwidthbar");
                var engineloadbar = document.getElementById("engineloadbar");
                var coolanttemperaturebar = document.getElementById("coolanttemperaturebar");
                var instantenousfuelconsumptionbar = document.getElementById("instantenousfuelconsumptionbar");
                var averagefuelconsumptionbar = document.getElementById("averagefuelconsumptionbar");
                var drivingrangebar = document.getElementById("drivingrangebar");
                var totalmileagebar = document.getElementById("totalmileagebar");
                var singlefuelconsumptionvolbar = document.getElementById("singlefuelconsumptionvolbar");
                var totalfuelconsumptionvolbar = document.getElementById("totalfuelconsumptionvolbar");
                var currenterrorcodenosbar = document.getElementById("currenterrorcodenosbar");
                var harshaccelerationnobar = document.getElementById("harshaccelerationnobar");
                var harshbrakenobar = document.getElementById("harshbrakenobar");
                var namign = document.getElementById("namign");
                var namdrivtim = document.getElementById("namdrivtim");
                var namidltim = document.getElementById("namidltim");       
                var namhotstarts = document.getElementById("namhotstarts");
                var namavgspeed = document.getElementById("namavgspeed");
                var namhighestspeed = document.getElementById("namhighestspeed");
                var namengrotation = document.getElementById("namengrotation");
                var namharshaccel = document.getElementById("namharshaccel");
                var namharshbraking = document.getElementById("namharshbraking");
                var namignbar = document.getElementById("namignbar");
                var namdrivtimbar = document.getElementById("namdrivtimbar");
                var namidltimbar = document.getElementById("namidltimbar");
                var namhotstartsbar = document.getElementById("namhotstartsbar");
                var namavgspeedbar = document.getElementById("namavgspeedbar");
                var namhighestspeedbar = document.getElementById("namhighestspeedbar");
                var namengrotationbar = document.getElementById("namengrotationbar");
                var namharshaccelbar = document.getElementById("namharshaccelbar");
                var namharshbrakingbar = document.getElementById("namharshbrakingbar");
                var canbus_cards = document.getElementsByClassName('canbus');
                var gaugeCharts = document.getElementsByClassName('gauge-charts');
                var errcodno = document.getElementById('errcodno');
                var er = document.getElementById('er');
                var errecv = document.getElementById('errecv');
                var carmd_make = document.getElementById('carmd_make');
                var carmd_model = document.getElementById('carmd_model');
                var carmd_year = document.getElementById('carmd_year');
                var carmd_trans = document.getElementById('carmd_trans');
                var carmd_manu = document.getElementById('carmd_manu');
                var carmd_engine = document.getElementById('carmd_engine');
                var carmd_mkmod = document.getElementById('carmd_mkmod');
                var carmd_yr = document.getElementById('carmd_yr');
                var carmd_mk = document.getElementById('carmd_mk');
                var cooling_sys = document.getElementById('cooling_sys');
                var engine_health = document.getElementById('engine_health');
                var maint = document.getElementById('maint');
                var power = document.getElementById('power');

                var recvderr = document.getElementById('recvderr');
                var recvderrcond = document.getElementById('recvderrcond');
                var recvdsum = document.getElementById('recvdsum');
                var difficulty = document.getElementById('difficulty');
                var hours = document.getElementById('hours');
                var labour_cst = document.getElementById('labour_cst');
                var part_cst = document.getElementById('part_cst');
                var total_cst = document.getElementById('total_cst');
                var partnos = document.getElementById('partnos');
                var partsno = document.getElementById('partsno');
                var healthStats = document.getElementById('healthStatus');
                var car_imgs = document.getElementsByClassName('car_img');


                var gCharts = [];
                // gaugeCharts.forEach(i => {
                //     console.log(i);
                // });
                for(chart in gaugeCharts){
                    if(chart < gaugeCharts.length){
                        gCharts.push(echarts.init(gaugeCharts[chart]));
                    }
                    
                    
                    
                }
                
            
                // console.log(snap.devices);
                cardetails.innerHTML = snap.devices[0].reg_id;
                var timer = setTimeout(function () {
                    var deve = document.getElementById('pointer');
                    var sta = document.getElementById('status');
                    sta.innerText = "Initializing...";
                    deve.style.background = "grey";
                    }, 3000);
                dve = snap.devices[0]["Device data"];
                
                
                for(card in canbus_cards){
                    if(card < canbus_cards.length){
                        canbus_cards[card].style.display = 'none';
                    }
                    
                }
                
                if(dve.canbus !== 'Unavailable'){
                    //canbus
                    runningspeed.innerText = dve.canbus.running_speed;
                    coolanttemperature.innerText = dve.canbus.coolant_temp;
                    totalfuelconsumptionvol.innerText = dve.canbus.total_fuel_consumption_vol;
                    batteryvoltage.innerText = dve.canbus.battery_voltage;
                    throttleopeningwidth.innerText = dve.canbus.throttle_opening_width;
                    engineload.innerText = dve.canbus.engine_load;
                    instantenousfuelconsumption.innerText = dve.canbus.instantenous_fuel_consumption;
                    averagefuelconsumption.innerText = dve.canbus.average_fuel_consumption;
                    drivingrange.innerText = dve.canbus.driving_range;
                    totalmileage.innerText = dve.canbus.total_mileage;
                    singlefuelconsumptionvol.innerText = dve.canbus.single_fuel_consumption_vol;
                    currenterrorcodenos.innerText = dve.canbus.current_error_code_nos;
                    harshaccelerationno.innerText = dve.canbus.harsh_acceleration_no;
                    harshbrakeno.innerText = dve.canbus.harsh_brake_no;
                    enginespeed.innerText = dve.canbus.engine_speed;

                    batteryvoltagebar.innerHTML = `<div data-label="${getpcnt("batteryvoltage", dve.canbus.battery_voltage, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("batteryvoltagebar", dve.canbus.battery_voltage, "bar")}"></div>`;
                    coolanttemperaturebar.innerHTML = `<div data-label="${getpcnt("coolanttemperature", dve.canbus.coolant_temp, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("coolanttemperature", dve.canbus.coolant_temp, "bar")}"></div>`;
                    totalfuelconsumptionvolbar.innerHTML = `<div data-label="${getpcnt("totalfuelconsumptionvol", dve.canbus.total_fuel_consumption_vol, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("totalfuelconsumptionvol", dve.canbus.total_fuel_consumption_vol, "bar")}"></div>`;
                    // enginespeedbar.innerHTML = `<div data-label="${getpcnt("enginespeed", dve.canbus.engine_speed, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("enginespeed", dve.canbus.engine_speed, "bar")}"></div>`;
                    throttleopeningwidthbar.innerHTML = `<div data-label="${getpcnt("throttleopeningwidth", dve.canbus.throttle_opening_width, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("throttleopeningwidth", dve.canbus.throttle_opening_width, "bar")}"></div>`;
                    engineloadbar.innerHTML = `<div data-label="${getpcnt("engineload", dve.canbus.engine_load, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("engineload", dve.canbus.engine_load, "bar")}"></div>`;
                    instantenousfuelconsumptionbar.innerHTML = `<div data-label="${getpcnt("instantenousfuelconsumption", dve.canbus.instantenous_fuel_consumption, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("instantenousfuelconsumption", dve.canbus.instantenous_fuel_consumption, "bar")}"></div>`;
                    averagefuelconsumptionbar.innerHTML = `<div data-label="${getpcnt("averagefuelconsumption", dve.canbus.average_fuel_consumption, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("averagefuelconsumption", dve.canbus.average_fuel_consumption, "bar")}"></div>`;
                    // drivingrangebar.innerHTML = `<div data-label="${getpcnt("drivingrange", dve.canbus.driving_range, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("drivingrange", dve.canbus.driving_range, "bar")}"></div>`;
                    // totalmileagebar.innerHTML = `<div data-label="${getpcnt("totalmileage", dve.canbus.total_mileage, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("totalmileage", dve.canbus.total_mileage, "bar")}"></div>`;
                    singlefuelconsumptionvolbar.innerHTML = `<div data-label="${getpcnt("singlefuelconsumptionvol", dve.canbus.single_fuel_consumption_vol, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("singlefuelconsumptionvol", dve.canbus.single_fuel_consumption_vol, "bar")}"></div>`;
                    currenterrorcodenosbar.innerHTML = `<div data-label="${getpcnt("currenterrorcodenos", dve.canbus.current_error_code_nos, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("currenterrorcodenos", dve.canbus.current_error_code_nos, "bar")}"></div>`;
                    harshaccelerationnobar.innerHTML = `<div data-label="${getpcnt("harshaccelerationno", dve.canbus.harsh_acceleration_no, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("harshaccelerationno", dve.canbus.harsh_acceleration_no, "bar")}"></div>`;
                    harshbrakenobar.innerHTML = `<div data-label="${getpcnt("harshbrakeno", dve.canbus.harsh_brake_no, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("harshbrakeno", dve.canbus.harsh_brake_no, "bar")}"></div>`;

                    switch(canbus_cat.value){
                        case 'fuel_con': {
                            var crds = document.getElementsByClassName(canbus_cat.value);
                            for(crd in crds){
                                if(crd < crds.length){
                                    crds[crd].style.display = 'flex';
                                }
                                
                            };
                            break;
                        }
                        case 'temp_read': {
                            var crds = document.getElementsByClassName(canbus_cat.value);
                            for(crd in crds){
                                if(crd < crds.length){
                                    crds[crd].style.display = 'flex';
                                }
                                
                            };
                            break;
                        }
                        case 'driv_spd': {
                            var crds = document.getElementsByClassName(canbus_cat.value);
                            for(crd in crds){
                                if(crd < crds.length){
                                    crds[crd].style.display = 'flex';
                                }
                                
                            };
                            if(gCharts.length > 1){
                                for(chrt in gCharts){
                                    if(chrt < gCharts.length){
                                        switch(chrt.toString()){
                                            case '0': {
                                                option = {
                                                    tooltip: {
                                                        formatter: "{a} <br/>{b} : {c}%"
                                                    }
                                                    , toolbox: {
                                                        show: false
                                                        , feature: {
                                                            mark: {
                                                                show: true
                                                            }
                                                            , restore: {
                                                                show: true
                                                            }
                                                            , saveAsImage: {
                                                                show: true
                                                            }
                                                        }
                                                    }
                                                    , series: [
                                                        {
                                                            name: '', 
                                                            type: 'gauge',
                                                            splitNumber: 0, // 分割段数，默认为5
                                                            axisLine: { // 坐标轴线
                                                                lineStyle: { // 属性lineStyle控制线条样式
                                                                    color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                                                    width: 20
                                                                }
                                                            }
                                                            , axisTick: { // 坐标轴小标记
                                                                splitNumber: 0, // 每份split细分多少段
                                                                length: 12, // 属性length控制线长
                                                                lineStyle: { // 属性lineStyle控制线条样式
                                                                    color: 'auto'
                                                                }
                                                            }
                                                            , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                    color: 'auto'
                                                                }
                                                            }
                                                            , splitLine: { // 分隔线
                                                                show: false, // 默认显示，属性show控制显示与否
                                                                length: 50, // 属性length控制线长
                                                                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                                                    color: 'auto'
                                                                }
                                                            }
                                                            , pointer: {
                                                                width: 5
                                                                , color: '#54667a'
                                                            }
                                                            , title: {
                                                                show: false
                                                                , offsetCenter: [0, '-40%'], // x, y，单位px
                                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                    fontWeight: 'bolder'
                                                                }
                                                            }
                                                            , detail: {
                                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                    color: 'auto'
                                                                    , fontSize: '14'
                                                                    , fontWeight: 'bolder'
                                                                }
                                                            }
                                                            , data: [{
                                                                value: parseInt(dve.canbus.running_speed), 
                                                                name: 'Speed'
                                                            }]
                                                        }
                                                    ]
                                                };
                                                timeTicket = setInterval(function () {
                                                    // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                                                    gCharts[chrt].setOption(option, true);
                                                }, 2000)
                                                // use configuration item and data specified to show chart
                                                gCharts[chrt].setOption(option, true), $(function () {
                                                    function resize() {
                                                        setTimeout(function () {
                                                            gCharts[chrt].resize()
                                                        }, 100)
                                                    }
                                                    $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                                                });
                
                                                break;
                                            }
                                            case '1': {
                                                option = {
                                                    tooltip: {
                                                        formatter: "{a} <br/>{b} : {c}%"
                                                    }
                                                    , toolbox: {
                                                        show: false
                                                        , feature: {
                                                            mark: {
                                                                show: true
                                                            }
                                                            , restore: {
                                                                show: true
                                                            }
                                                            , saveAsImage: {
                                                                show: true
                                                            }
                                                        }
                                                    }
                                                    , series: [
                                                        {
                                                            name: '', 
                                                            type: 'gauge',
                                                            splitNumber: 0, // 分割段数，默认为5
                                                            axisLine: { // 坐标轴线
                                                                lineStyle: { // 属性lineStyle控制线条样式
                                                                    color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                                                    width: 20
                                                                }
                                                            }
                                                            , axisTick: { // 坐标轴小标记
                                                                splitNumber: 0, // 每份split细分多少段
                                                                length: 12, // 属性length控制线长
                                                                lineStyle: { // 属性lineStyle控制线条样式
                                                                    color: 'auto'
                                                                }
                                                            }
                                                            , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                    color: 'auto'
                                                                }
                                                            }
                                                            , splitLine: { // 分隔线
                                                                show: false, // 默认显示，属性show控制显示与否
                                                                length: 50, // 属性length控制线长
                                                                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                                                    color: 'auto'
                                                                }
                                                            }
                                                            , pointer: {
                                                                width: 5
                                                                , color: '#54667a'
                                                            }
                                                            , title: {
                                                                show: false
                                                                , offsetCenter: [0, '-40%'], // x, y，单位px
                                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                    fontWeight: 'bolder'
                                                                }
                                                            }
                                                            , detail: {
                                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                    color: 'auto'
                                                                    , fontSize: '14'
                                                                    , fontWeight: 'bolder'
                                                                }
                                                            }
                                                            , data: [{
                                                                value: parseInt(dve.canbus.driving_range), 
                                                                name: 'Range'
                                                            }]
                                                        }
                                                    ]
                                                };
                                                timeTicket = setInterval(function () {
                                                    // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                                                    gCharts[chrt].setOption(option, true);
                                                }, 2000)
                                                // use configuration item and data specified to show chart
                                                gCharts[chrt].setOption(option, true), $(function () {
                                                    function resize() {
                                                        setTimeout(function () {
                                                            gCharts[chrt].resize()
                                                        }, 100)
                                                    }
                                                    $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                                                });
                
                                                break;
                                            }
                                            case '2': {
                                                option = {
                                                    tooltip: {
                                                        formatter: "{a} <br/>{b} : {c}%"
                                                    }
                                                    , toolbox: {
                                                        show: false
                                                        , feature: {
                                                            mark: {
                                                                show: true
                                                            }
                                                            , restore: {
                                                                show: true
                                                            }
                                                            , saveAsImage: {
                                                                show: true
                                                            }
                                                        }
                                                    }
                                                    , series: [
                                                        {
                                                            name: '', 
                                                            type: 'gauge',
                                                            splitNumber: 0, // 分割段数，默认为5
                                                            axisLine: { // 坐标轴线
                                                                lineStyle: { // 属性lineStyle控制线条样式
                                                                    color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                                                    width: 20
                                                                }
                                                            }
                                                            , axisTick: { // 坐标轴小标记
                                                                splitNumber: 0, // 每份split细分多少段
                                                                length: 12, // 属性length控制线长
                                                                lineStyle: { // 属性lineStyle控制线条样式
                                                                    color: 'auto'
                                                                }
                                                            }
                                                            , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                    color: 'auto'
                                                                }
                                                            }
                                                            , splitLine: { // 分隔线
                                                                show: false, // 默认显示，属性show控制显示与否
                                                                length: 50, // 属性length控制线长
                                                                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                                                    color: 'auto'
                                                                }
                                                            }
                                                            , pointer: {
                                                                width: 5
                                                                , color: '#54667a'
                                                            }
                                                            , title: {
                                                                show: false
                                                                , offsetCenter: [0, '-40%'], // x, y，单位px
                                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                    fontWeight: 'bolder'
                                                                }
                                                            }
                                                            , detail: {
                                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                    color: 'auto'
                                                                    , fontSize: '14'
                                                                    , fontWeight: 'bolder'
                                                                }
                                                            }
                                                            , data: [{
                                                                value: parseInt(dve.canbus.total_mileage), 
                                                                name: 'Mileage'
                                                            }]
                                                        }
                                                    ]
                                                };
                                                timeTicket = setInterval(function () {
                                                    // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                                                    gCharts[chrt].setOption(option, true);
                                                }, 2000)
                                                // use configuration item and data specified to show chart
                                                gCharts[chrt].setOption(option, true), $(function () {
                                                    function resize() {
                                                        setTimeout(function () {
                                                            gCharts[chrt].resize()
                                                        }, 100)
                                                    }
                                                    $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                                                });
                
                                                break;
                                            }
                                            case '3' : {
                                                option = {
                                                    tooltip: {
                                                        formatter: "{a} <br/>{b} : {c}%"
                                                    }
                                                    , toolbox: {
                                                        show: false
                                                        , feature: {
                                                            mark: {
                                                                show: true
                                                            }
                                                            , restore: {
                                                                show: true
                                                            }
                                                            , saveAsImage: {
                                                                show: true
                                                            }
                                                        }
                                                    }
                                                    , series: [
                                                        {
                                                            name: '', 
                                                            type: 'gauge',
                                                            splitNumber: 0, // 分割段数，默认为5
                                                            axisLine: { // 坐标轴线
                                                                lineStyle: { // 属性lineStyle控制线条样式
                                                                    color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                                                    width: 20
                                                                }
                                                            }
                                                            , axisTick: { // 坐标轴小标记
                                                                splitNumber: 0, // 每份split细分多少段
                                                                length: 12, // 属性length控制线长
                                                                lineStyle: { // 属性lineStyle控制线条样式
                                                                    color: 'auto'
                                                                }
                                                            }
                                                            , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                    color: 'auto'
                                                                }
                                                            }
                                                            , splitLine: { // 分隔线
                                                                show: false, // 默认显示，属性show控制显示与否
                                                                length: 50, // 属性length控制线长
                                                                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                                                    color: 'auto'
                                                                }
                                                            }
                                                            , pointer: {
                                                                width: 5
                                                                , color: '#54667a'
                                                            }
                                                            , title: {
                                                                show: false
                                                                , offsetCenter: [0, '-40%'], // x, y，单位px
                                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                    fontWeight: 'bolder'
                                                                }
                                                            }
                                                            , detail: {
                                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                    color: 'auto'
                                                                    , fontSize: '14'
                                                                    , fontWeight: 'bolder'
                                                                }
                                                            }
                                                            , data: [{
                                                                value: parseInt(dve.canbus.engine_speed), 
                                                                name: 'Eng Speed'
                                                            }]
                                                        }
                                                    ]
                                                };
                                                timeTicket = setInterval(function () {
                                                    // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                                                    gCharts[chrt].setOption(option, true);
                                                }, 2000)
                                                // use configuration item and data specified to show chart
                                                gCharts[chrt].setOption(option, true), $(function () {
                                                    function resize() {
                                                        setTimeout(function () {
                                                            gCharts[chrt].resize()
                                                        }, 100)
                                                    }
                                                    $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                                                });
                
                                                break;
                                            }
                                            default:{
                                                break;
                                            }
                                        }
                                    }
                                    
                                }
                            }
                            
                
                            
                            
                
                            break;
                        }
                        case 'power_others': {
                            var crds = document.getElementsByClassName(canbus_cat.value);
                            for(crd in crds){
                                if(crd < crds.length){
                                    crds[crd].style.display = 'flex';
                                }
                                
                            };
                            break;
                        }
                        default: {
                            var crds = document.getElementsByClassName('canbus');
                            for(crd in crds){
                                if(crd < crds.length){
                                    crds[crd].style.display = 'flex';
                                }
                                
                            };
                            break;
                        }
                    }

                    var healthStatus = 100;
                    if(dve.carmd.decode !== undefined){
                        carmd_make.innerText = dve.carmd.decode.make;
                        carmd_model.innerText = dve.carmd.decode.model;
                        carmd_year.innerText = dve.carmd.decode.year;
                        carmd_trans.innerText = dve.carmd.decode.transmission;
                        carmd_manu.innerText = dve.carmd.decode.manufacturer;
                        carmd_engine.innerText = dve.carmd.decode.engine;
                        carmd_mkmod.innerText = dve.carmd.decode.make + " " + dve.carmd.decode.model;
                        carmd_yr.innerText = dve.carmd.decode.year;
                        carmd_mk.innerText = dve.carmd.decode.make;
                    }
                    else{
                        carmd_make.innerText = 'Not Set';
                        carmd_model.innerText = 'Not Set';
                        carmd_year.innerText = 'Not Set';
                        carmd_trans.innerText = 'Not Set';
                        carmd_manu.innerText = 'Not Set';
                        carmd_engine.innerText = 'Not Set';
                        carmd_mkmod.innerText = 'Not Set';
                        carmd_yr.innerText = 'Not Set';
                        carmd_mk.innerText = 'Not Set';
                    }
                    if(dve.carmd.repair !== undefined){
                        healthStatus -= 15;
                        recvderr.innerText = dve.carmd.repair.desc;
                        recvderrcond.innerText = "Urgency: " + dve.carmd.repair.urgency;
                        recvdsum.innerText = dve.carmd.repair.urgency_desc;
                        difficulty.innerText = "Difficulty: " + dve.carmd.repair.difficulty;
                        hours.innerText = "Hours: " + dve.carmd.repair.hours;
                        labour_cst.innerText = "Est. Labour Cost: " + dve.carmd.repair.labor_cost;
                        part_cst.innerText = "Est. Part Cost: " + dve.carmd.repair.part_cost;
                        total_cst.innerText = "Est. Total Cost: " + dve.carmd.repair.total_cost;
                        partnos.innerText = dve.carmd.repair.parts.length;
                        var html_parts = '';
                        for(var i = 0; i < dve.carmd.repair.parts.length; i++){
                            
                            html_parts += `<div class="col-lg-4"><div class="card card-body"><div class="d-flex flex-row"><div class="round round-lg align-self-center round-danger"><i class="mdi mdi-car-settings"></i></div><div class="m-l-10 align-self-center"><h3 class="m-b-0 font-light">`;
                            html_parts += dve.carmd.repair.parts[i].desc;
                            html_parts += `</h3><h5 class="text-muted m-b-0">`;
                            html_parts +=  "$" + dve.carmd.repair.parts[i].price;
                            html_parts += `</h5></div></div></div></div>`;
                        }
                        partsno.innerHTML = html_parts;
    
                    }
                    if(dve.carmd.image !== undefined){
                        for(var i = 0; i < car_imgs.length; i++){
                            car_imgs[i].src = dve.carmd.image.image;
                        }
                        
                    }


                    if(parseInt(dve.canbus.coolant_temp) > 100){
                        cooling_sys.innerText = 'Needs Checking';
                        healthStatus -= 15;
                    }
                    else{
                        cooling_sys.innerText = 'Working Fine';
                    }

                    if(parseInt(dve.canbus.current_error_code_nos) >= 1){
                        healthStatus -= 10;
                        errcodno.innerHTML = dve.canbus.current_error_code_nos;
                        var flty = document.getElementsByClassName('faulty');
                        for(var i = 0; i < flty.length; i++){
                            flty[i].style.display = 'block !important';
                        }
                        if(dve.error_code !== undefined){
                            er.innerHTML = dve.error_code.split(',')[0];
                            var elem_opti = document.createElement('option');
                            elem_opti.value = dve.error_code.split(',')[0];
                            elem_opti.innerHTML = dve.error_code.split(',')[0];
                            error_cdes.innerHTML = elem_opti.selected;
    
                            for(var i = 1; i < dve.error_code.split(',').length; i++){
                                var elem_opt = document.createElement('option');
                                elem_opt.value = dve.error_code.split(',')[i];
                                elem_opt.innerHTML = dve.error_code.split(',')[i];
                                error_cdes.innerHTML += elem_opt;
                            }
                            errecv.innerHTML = dve.canbus.date;
                            engine_health.innerText = 'Not So Great';
                            maint.innerText = 'Needed Urgently';
                        }
                        
    
                        
                        
    
                    }
                    else{
                        engine_health.innerText = 'Okay'
                        maint.innerText = ' This can wait';
                        var flty = document.getElementsByClassName('faulty');
                        for(var i = 0; i < flty.length; i++){
                            flty[i].style.display = 'none' ;
                        }
                        recvderr.innerText = 'No Errors';
                        recvderrcond.innerText = 0;
                        recvdsum.innerText = 'Your Vehicle Seems Ok';
                    }
    
                    if(parseInt(dve.canbus.battery_voltage) < 10){
                        healthStatus -= 5;
                        power.innerText = 'Needs Checking';
                    }
                    else{
                        power.innerText = 'All Good Here';
                    }

                    if(healthStatus > 70 && healthStatus <= 100){
                        healthStats.innerText = 'Healthy ' + healthStatus + '%';
                    }
                    else if(healthStatus > 50 && healthStatus <= 70){
                        healthStats.innerText = 'Not So Good ' + healthStatus + '%';
                    }
                    else if(healthStatus > 30 && healthStatus <= 50){
                        healthStats.innerText = 'Bad ' + healthStatus + '%';
                    }
                    else{
                        healthStats.innerText = 'Terrible ' + healthStatus + '%';
                    }
                    
                    
                    console.log(healthStatus);
                    new Chartist.Pie('.ct-chart', {
                        series: [healthStatus, 100-healthStatus]
                    }, {
                        donut: true
                        , donutWidth: 20
                        , startAngle: 0
                        , showLabel: false
                    });


                }
                else{
                    
                }

                if(dve["driver behavior"] !== 'Unavailable'){
                    namign.innerText = dve["driver behavior"].total_ignition_no;
                    namdrivtim.innerText = dve["driver behavior"].total_driving_time;
                    namidltim.innerText = dve["driver behavior"].total_idling_time;
                    namhotstarts.innerText = dve["driver behavior"].average_hot_start_time;
                    namavgspeed.innerText = dve["driver behavior"].average_speed;
                    namhighestspeed.innerText = dve["driver behavior"].history_highest_speed;
                    namengrotation.innerText = dve["driver behavior"].history_highest_rotation;
                    namharshaccel.innerText = dve["driver behavior"].total_harsh_acceleration_no;
                    namharshbraking.innerText = dve["driver behavior"].total_harsh_brake_no;
                    $("#namignbar").addClass("label-info");
                    $("#namdrivtimbar").addClass("label-info");
                    $("#namidltimbar").addClass("label-info");
                    $("#namhotstartsbar").addClass("label-info");
                    $("#namavgspeedbar").addClass("label-info");
                    $("#namhighestspeedbar").addClass("label-info");
                    $("#namengrotationbar").addClass("label-info");
                    $("#namharshaccelbar").addClass("label-info");
                    $("#namharshbrakingbar").addClass("label-info");
                    namignbar.innerText = "Normal";
                    namdrivtimbar.innerText = "Normal";
                    namidltimbar.innerText = "Normal";
                    namhotstartsbar.innerText = "Normal";
                    namavgspeedbar.innerText = "Normal";
                    namhighestspeedbar.innerText = "Normal";
                    namengrotationbar.innerText = "Normal";
                    namharshaccelbar.innerText = "Normal";
                    namharshbrakingbar.innerText = "Normal";

                }
                else{
                    
                }
                
                
                
                
                
                
                
                
                
                
                
          
                

                

                
                


                
                
                
                
                

                

            
              
              
              

              

                client.service('dbapi').on('value', function(dat){
                    var myData = dat[usr.user.email];
                    // snap = dat;
                    cardetails.innerHTML = dat.devices[0].reg_id;
                    clearTimeout(timer);
                    var dev = document.getElementById('pointer');
                    var stat = document.getElementById('status');
                    dev.style.background = "green";
                    console.log(dve);
                    if((dve.location.latitude !== dat.devices[0]["Device data"].location.latitude || dve.location.longitude !== dat.devices[0]["Device data"].location.longitude) == true || parseInt(dat.devices[0]["Device data"].canbus.running_speed) !== 0){
                        stat.innerText = "Online and Moving";
                    }
                    else{
                        stat.innerText = "Online and Not Moving";
                    }
                    
                    
                    timer = setTimeout(function (){
                        dev.style.background = "grey";
                        stat.innerText = "Offline";
                    }, 15000);
                    
                    
                    dve = dat.devices[0]["Device data"];
                    
                    
                    for(card in canbus_cards){
                        if(card < canbus_cards.length){
                            canbus_cards[card].style.display = 'none';
                        }
                        
                    }
                    
    
                    if(dve.canbus !== 'Unavailable'){
                        //canbus
                        runningspeed.innerText = dve.canbus.running_speed;
                        coolanttemperature.innerText = dve.canbus.coolant_temp;
                        totalfuelconsumptionvol.innerText = dve.canbus.total_fuel_consumption_vol;
                        batteryvoltage.innerText = dve.canbus.battery_voltage;
                        throttleopeningwidth.innerText = dve.canbus.throttle_opening_width;
                        engineload.innerText = dve.canbus.engine_load;
                        instantenousfuelconsumption.innerText = dve.canbus.instantenous_fuel_consumption;
                        averagefuelconsumption.innerText = dve.canbus.average_fuel_consumption;
                        drivingrange.innerText = dve.canbus.driving_range;
                        totalmileage.innerText = dve.canbus.total_mileage;
                        singlefuelconsumptionvol.innerText = dve.canbus.single_fuel_consumption_vol;
                        currenterrorcodenos.innerText = dve.canbus.current_error_code_nos;
                        harshaccelerationno.innerText = dve.canbus.harsh_acceleration_no;
                        harshbrakeno.innerText = dve.canbus.harsh_brake_no;
                        enginespeed.innerText = dve.canbus.engine_speed;
    
                        batteryvoltagebar.innerHTML = `<div data-label="${getpcnt("batteryvoltage", dve.canbus.battery_voltage, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("batteryvoltagebar", dve.canbus.battery_voltage, "bar")}"></div>`;
                        coolanttemperaturebar.innerHTML = `<div data-label="${getpcnt("coolanttemperature", dve.canbus.coolant_temp, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("coolanttemperature", dve.canbus.coolant_temp, "bar")}"></div>`;
                        totalfuelconsumptionvolbar.innerHTML = `<div data-label="${getpcnt("totalfuelconsumptionvol", dve.canbus.total_fuel_consumption_vol, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("totalfuelconsumptionvol", dve.canbus.total_fuel_consumption_vol, "bar")}"></div>`;
                        // enginespeedbar.innerHTML = `<div data-label="${getpcnt("enginespeed", dve.canbus.engine_speed, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("enginespeed", dve.canbus.engine_speed, "bar")}"></div>`;
                        throttleopeningwidthbar.innerHTML = `<div data-label="${getpcnt("throttleopeningwidth", dve.canbus.throttle_opening_width, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("throttleopeningwidth", dve.canbus.throttle_opening_width, "bar")}"></div>`;
                        engineloadbar.innerHTML = `<div data-label="${getpcnt("engineload", dve.canbus.engine_load, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("engineload", dve.canbus.engine_load, "bar")}"></div>`;
                        instantenousfuelconsumptionbar.innerHTML = `<div data-label="${getpcnt("instantenousfuelconsumption", dve.canbus.instantenous_fuel_consumption, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("instantenousfuelconsumption", dve.canbus.instantenous_fuel_consumption, "bar")}"></div>`;
                        averagefuelconsumptionbar.innerHTML = `<div data-label="${getpcnt("averagefuelconsumption", dve.canbus.average_fuel_consumption, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("averagefuelconsumption", dve.canbus.average_fuel_consumption, "bar")}"></div>`;
                        // drivingrangebar.innerHTML = `<div data-label="${getpcnt("drivingrange", dve.canbus.driving_range, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("drivingrange", dve.canbus.driving_range, "bar")}"></div>`;
                        // totalmileagebar.innerHTML = `<div data-label="${getpcnt("totalmileage", dve.canbus.total_mileage, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("totalmileage", dve.canbus.total_mileage, "bar")}"></div>`;
                        singlefuelconsumptionvolbar.innerHTML = `<div data-label="${getpcnt("singlefuelconsumptionvol", dve.canbus.single_fuel_consumption_vol, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("singlefuelconsumptionvol", dve.canbus.single_fuel_consumption_vol, "bar")}"></div>`;
                        currenterrorcodenosbar.innerHTML = `<div data-label="${getpcnt("currenterrorcodenos", dve.canbus.current_error_code_nos, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("currenterrorcodenos", dve.canbus.current_error_code_nos, "bar")}"></div>`;
                        harshaccelerationnobar.innerHTML = `<div data-label="${getpcnt("harshaccelerationno", dve.canbus.harsh_acceleration_no, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("harshaccelerationno", dve.canbus.harsh_acceleration_no, "bar")}"></div>`;
                        harshbrakenobar.innerHTML = `<div data-label="${getpcnt("harshbrakeno", dve.canbus.harsh_brake_no, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("harshbrakeno", dve.canbus.harsh_brake_no, "bar")}"></div>`;
    
                        switch(canbus_cat.value){
                            case 'fuel_con': {
                                var crds = document.getElementsByClassName(canbus_cat.value);
                                for(crd in crds){
                                    if(crd < crds.length){
                                        crds[crd].style.display = 'flex';
                                    }
                                    
                                };
                                break;
                            }
                            case 'temp_read': {
                                var crds = document.getElementsByClassName(canbus_cat.value);
                                for(crd in crds){
                                    if(crd < crds.length){
                                        crds[crd].style.display = 'flex';
                                    }
                                    
                                };
                                break;
                            }
                            case 'driv_spd': {
                                var crds = document.getElementsByClassName(canbus_cat.value);
                                for(crd in crds){
                                    if(crd < crds.length){
                                        crds[crd].style.display = 'flex';
                                    }
                                    
                                };
                                if(gCharts.length > 1){
                                    for(chrt in gCharts){
                                        if(chrt < gCharts.length){
                                            switch(chrt.toString()){
                                                case '0': {
                                                    option = {
                                                        tooltip: {
                                                            formatter: "{a} <br/>{b} : {c}%"
                                                        }
                                                        , toolbox: {
                                                            show: false
                                                            , feature: {
                                                                mark: {
                                                                    show: true
                                                                }
                                                                , restore: {
                                                                    show: true
                                                                }
                                                                , saveAsImage: {
                                                                    show: true
                                                                }
                                                            }
                                                        }
                                                        , series: [
                                                            {
                                                                name: '', 
                                                                type: 'gauge',
                                                                splitNumber: 0, // 分割段数，默认为5
                                                                axisLine: { // 坐标轴线
                                                                    lineStyle: { // 属性lineStyle控制线条样式
                                                                        color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                                                        width: 20
                                                                    }
                                                                }
                                                                , axisTick: { // 坐标轴小标记
                                                                    splitNumber: 0, // 每份split细分多少段
                                                                    length: 12, // 属性length控制线长
                                                                    lineStyle: { // 属性lineStyle控制线条样式
                                                                        color: 'auto'
                                                                    }
                                                                }
                                                                , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                        color: 'auto'
                                                                    }
                                                                }
                                                                , splitLine: { // 分隔线
                                                                    show: false, // 默认显示，属性show控制显示与否
                                                                    length: 50, // 属性length控制线长
                                                                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                                                        color: 'auto'
                                                                    }
                                                                }
                                                                , pointer: {
                                                                    width: 5
                                                                    , color: '#54667a'
                                                                }
                                                                , title: {
                                                                    show: false
                                                                    , offsetCenter: [0, '-40%'], // x, y，单位px
                                                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                        fontWeight: 'bolder'
                                                                    }
                                                                }
                                                                , detail: {
                                                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                        color: 'auto'
                                                                        , fontSize: '14'
                                                                        , fontWeight: 'bolder'
                                                                    }
                                                                }
                                                                , data: [{
                                                                    value: parseInt(dve.canbus.running_speed), 
                                                                    name: 'Speed'
                                                                }]
                                                            }
                                                        ]
                                                    };
                                                    timeTicket = setInterval(function () {
                                                        // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                                                        gCharts[chrt].setOption(option, true);
                                                    }, 2000)
                                                    // use configuration item and data specified to show chart
                                                    gCharts[chrt].setOption(option, true), $(function () {
                                                        function resize() {
                                                            setTimeout(function () {
                                                                gCharts[chrt].resize()
                                                            }, 100)
                                                        }
                                                        $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                                                    });
                    
                                                    break;
                                                }
                                                case '1': {
                                                    option = {
                                                        tooltip: {
                                                            formatter: "{a} <br/>{b} : {c}%"
                                                        }
                                                        , toolbox: {
                                                            show: false
                                                            , feature: {
                                                                mark: {
                                                                    show: true
                                                                }
                                                                , restore: {
                                                                    show: true
                                                                }
                                                                , saveAsImage: {
                                                                    show: true
                                                                }
                                                            }
                                                        }
                                                        , series: [
                                                            {
                                                                name: '', 
                                                                type: 'gauge',
                                                                splitNumber: 0, // 分割段数，默认为5
                                                                axisLine: { // 坐标轴线
                                                                    lineStyle: { // 属性lineStyle控制线条样式
                                                                        color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                                                        width: 20
                                                                    }
                                                                }
                                                                , axisTick: { // 坐标轴小标记
                                                                    splitNumber: 0, // 每份split细分多少段
                                                                    length: 12, // 属性length控制线长
                                                                    lineStyle: { // 属性lineStyle控制线条样式
                                                                        color: 'auto'
                                                                    }
                                                                }
                                                                , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                        color: 'auto'
                                                                    }
                                                                }
                                                                , splitLine: { // 分隔线
                                                                    show: false, // 默认显示，属性show控制显示与否
                                                                    length: 50, // 属性length控制线长
                                                                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                                                        color: 'auto'
                                                                    }
                                                                }
                                                                , pointer: {
                                                                    width: 5
                                                                    , color: '#54667a'
                                                                }
                                                                , title: {
                                                                    show: false
                                                                    , offsetCenter: [0, '-40%'], // x, y，单位px
                                                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                        fontWeight: 'bolder'
                                                                    }
                                                                }
                                                                , detail: {
                                                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                        color: 'auto'
                                                                        , fontSize: '14'
                                                                        , fontWeight: 'bolder'
                                                                    }
                                                                }
                                                                , data: [{
                                                                    value: parseInt(dve.canbus.driving_range), 
                                                                    name: 'Range'
                                                                }]
                                                            }
                                                        ]
                                                    };
                                                    timeTicket = setInterval(function () {
                                                        // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                                                        gCharts[chrt].setOption(option, true);
                                                    }, 2000)
                                                    // use configuration item and data specified to show chart
                                                    gCharts[chrt].setOption(option, true), $(function () {
                                                        function resize() {
                                                            setTimeout(function () {
                                                                gCharts[chrt].resize()
                                                            }, 100)
                                                        }
                                                        $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                                                    });
                    
                                                    break;
                                                }
                                                case '2': {
                                                    option = {
                                                        tooltip: {
                                                            formatter: "{a} <br/>{b} : {c}%"
                                                        }
                                                        , toolbox: {
                                                            show: false
                                                            , feature: {
                                                                mark: {
                                                                    show: true
                                                                }
                                                                , restore: {
                                                                    show: true
                                                                }
                                                                , saveAsImage: {
                                                                    show: true
                                                                }
                                                            }
                                                        }
                                                        , series: [
                                                            {
                                                                name: '', 
                                                                type: 'gauge',
                                                                splitNumber: 0, // 分割段数，默认为5
                                                                axisLine: { // 坐标轴线
                                                                    lineStyle: { // 属性lineStyle控制线条样式
                                                                        color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                                                        width: 20
                                                                    }
                                                                }
                                                                , axisTick: { // 坐标轴小标记
                                                                    splitNumber: 0, // 每份split细分多少段
                                                                    length: 12, // 属性length控制线长
                                                                    lineStyle: { // 属性lineStyle控制线条样式
                                                                        color: 'auto'
                                                                    }
                                                                }
                                                                , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                        color: 'auto'
                                                                    }
                                                                }
                                                                , splitLine: { // 分隔线
                                                                    show: false, // 默认显示，属性show控制显示与否
                                                                    length: 50, // 属性length控制线长
                                                                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                                                        color: 'auto'
                                                                    }
                                                                }
                                                                , pointer: {
                                                                    width: 5
                                                                    , color: '#54667a'
                                                                }
                                                                , title: {
                                                                    show: false
                                                                    , offsetCenter: [0, '-40%'], // x, y，单位px
                                                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                        fontWeight: 'bolder'
                                                                    }
                                                                }
                                                                , detail: {
                                                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                        color: 'auto'
                                                                        , fontSize: '14'
                                                                        , fontWeight: 'bolder'
                                                                    }
                                                                }
                                                                , data: [{
                                                                    value: parseInt(dve.canbus.total_mileage), 
                                                                    name: 'Mileage'
                                                                }]
                                                            }
                                                        ]
                                                    };
                                                    timeTicket = setInterval(function () {
                                                        // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                                                        gCharts[chrt].setOption(option, true);
                                                    }, 2000)
                                                    // use configuration item and data specified to show chart
                                                    gCharts[chrt].setOption(option, true), $(function () {
                                                        function resize() {
                                                            setTimeout(function () {
                                                                gCharts[chrt].resize()
                                                            }, 100)
                                                        }
                                                        $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                                                    });
                    
                                                    break;
                                                }
                                                case '3' : {
                                                    option = {
                                                        tooltip: {
                                                            formatter: "{a} <br/>{b} : {c}%"
                                                        }
                                                        , toolbox: {
                                                            show: false
                                                            , feature: {
                                                                mark: {
                                                                    show: true
                                                                }
                                                                , restore: {
                                                                    show: true
                                                                }
                                                                , saveAsImage: {
                                                                    show: true
                                                                }
                                                            }
                                                        }
                                                        , series: [
                                                            {
                                                                name: '', 
                                                                type: 'gauge',
                                                                splitNumber: 0, // 分割段数，默认为5
                                                                axisLine: { // 坐标轴线
                                                                    lineStyle: { // 属性lineStyle控制线条样式
                                                                        color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                                                        width: 20
                                                                    }
                                                                }
                                                                , axisTick: { // 坐标轴小标记
                                                                    splitNumber: 0, // 每份split细分多少段
                                                                    length: 12, // 属性length控制线长
                                                                    lineStyle: { // 属性lineStyle控制线条样式
                                                                        color: 'auto'
                                                                    }
                                                                }
                                                                , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                        color: 'auto'
                                                                    }
                                                                }
                                                                , splitLine: { // 分隔线
                                                                    show: false, // 默认显示，属性show控制显示与否
                                                                    length: 50, // 属性length控制线长
                                                                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                                                        color: 'auto'
                                                                    }
                                                                }
                                                                , pointer: {
                                                                    width: 5
                                                                    , color: '#54667a'
                                                                }
                                                                , title: {
                                                                    show: false
                                                                    , offsetCenter: [0, '-40%'], // x, y，单位px
                                                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                        fontWeight: 'bolder'
                                                                    }
                                                                }
                                                                , detail: {
                                                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                                        color: 'auto'
                                                                        , fontSize: '14'
                                                                        , fontWeight: 'bolder'
                                                                    }
                                                                }
                                                                , data: [{
                                                                    value: parseInt(dve.canbus.engine_speed), 
                                                                    name: 'Eng Speed'
                                                                }]
                                                            }
                                                        ]
                                                    };
                                                    timeTicket = setInterval(function () {
                                                        // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                                                        gCharts[chrt].setOption(option, true);
                                                    }, 2000)
                                                    // use configuration item and data specified to show chart
                                                    gCharts[chrt].setOption(option, true), $(function () {
                                                        function resize() {
                                                            setTimeout(function () {
                                                                gCharts[chrt].resize()
                                                            }, 100)
                                                        }
                                                        $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                                                    });
                    
                                                    break;
                                                }
                                                default:{
                                                    break;
                                                }
                                            }
                                        }
                                        
                                    }
                                }
                                
                    
                                
                                
                    
                                break;
                            }
                            case 'power_others': {
                                var crds = document.getElementsByClassName(canbus_cat.value);
                                for(crd in crds){
                                    if(crd < crds.length){
                                        crds[crd].style.display = 'flex';
                                    }
                                    
                                };
                                break;
                            }
                            default: {
                                var crds = document.getElementsByClassName('canbus');
                                for(crd in crds){
                                    if(crd < crds.length){
                                        crds[crd].style.display = 'flex';
                                    }
                                    
                                };
                                break;
                            }
                        }
    
                        var healthStatus = 100;
                        if(dve.carmd.decode !== undefined){
                            carmd_make.innerText = dve.carmd.decode.make;
                            carmd_model.innerText = dve.carmd.decode.model;
                            carmd_year.innerText = dve.carmd.decode.year;
                            carmd_trans.innerText = dve.carmd.decode.transmission;
                            carmd_manu.innerText = dve.carmd.decode.manufacturer;
                            carmd_engine.innerText = dve.carmd.decode.engine;
                            carmd_mkmod.innerText = dve.carmd.decode.make + " " + dve.carmd.decode.model;
                            carmd_yr.innerText = dve.carmd.decode.year;
                            carmd_mk.innerText = dve.carmd.decode.make;
                        }
                        else{
                            carmd_make.innerText = 'Not Set';
                            carmd_model.innerText = 'Not Set';
                            carmd_year.innerText = 'Not Set';
                            carmd_trans.innerText = 'Not Set';
                            carmd_manu.innerText = 'Not Set';
                            carmd_engine.innerText = 'Not Set';
                            carmd_mkmod.innerText = 'Not Set';
                            carmd_yr.innerText = 'Not Set';
                            carmd_mk.innerText = 'Not Set';
                        }
                        if(dve.carmd.repair !== undefined){
                            healthStatus -= 15;
                            recvderr.innerText = dve.carmd.repair.desc;
                            recvderrcond.innerText = "Urgency: " + dve.carmd.repair.urgency;
                            recvdsum.innerText = dve.carmd.repair.urgency_desc;
                            difficulty.innerText = "Difficulty: " + dve.carmd.repair.difficulty;
                            hours.innerText = "Hours: " + dve.carmd.repair.hours;
                            labour_cst.innerText = "Est. Labour Cost: " + dve.carmd.repair.labor_cost;
                            part_cst.innerText = "Est. Part Cost: " + dve.carmd.repair.part_cost;
                            total_cst.innerText = "Est. Total Cost: " + dve.carmd.repair.total_cost;
                            partnos.innerText = dve.carmd.repair.parts.length;
                            var html_parts = '';
                            for(var i = 0; i < dve.carmd.repair.parts.length; i++){
                                
                                html_parts += `<div class="col-lg-4"><div class="card card-body"><div class="d-flex flex-row"><div class="round round-lg align-self-center round-danger"><i class="mdi mdi-car-settings"></i></div><div class="m-l-10 align-self-center"><h3 class="m-b-0 font-light">`;
                                html_parts += dve.carmd.repair.parts[i].desc;
                                html_parts += `</h3><h5 class="text-muted m-b-0">`;
                                html_parts +=  "$" + dve.carmd.repair.parts[i].price;
                                html_parts += `</h5></div></div></div></div>`;
                            }
                            partsno.innerHTML = html_parts;
        
                        }
    
    
                        if(parseInt(dve.canbus.coolant_temp) > 100){
                            cooling_sys.innerText = 'Needs Checking';
                            healthStatus -= 15;
                        }
                        else{
                            cooling_sys.innerText = 'Working Fine';
                        }
    
                        if(parseInt(dve.canbus.current_error_code_nos) >= 1){
                            healthStatus -= 10;
                            errcodno.innerHTML = dve.canbus.current_error_code_nos;
                            var flty = document.getElementsByClassName('faulty');
                            for(var i = 0; i < flty.length; i++){
                                flty[i].style.display = 'block !important';
                            }
                            if(dve.error_code !== undefined){
                                er.innerHTML = dve.error_code.split(',')[0];
                                var elem_opti = document.createElement('option');
                                elem_opti.value = dve.error_code.split(',')[0];
                                elem_opti.innerHTML = dve.error_code.split(',')[0];
                                error_cdes.innerHTML = elem_opti.selected;
        
                                for(var i = 1; i < dve.error_code.split(',').length; i++){
                                    var elem_opt = document.createElement('option');
                                    elem_opt.value = dve.error_code.split(',')[i];
                                    elem_opt.innerHTML = dve.error_code.split(',')[i];
                                    error_cdes.innerHTML += elem_opt;
                                }
                                errecv.innerHTML = dve.canbus.date;
                                engine_health.innerText = 'Not So Great';
                                maint.innerText = 'Needed Urgently';
                            }
                            
        
                            
                            
        
                        }
                        else{
                            engine_health.innerText = 'Okay'
                            maint.innerText = ' This can wait';
                            var flty = document.getElementsByClassName('faulty');
                            for(var i = 0; i < flty.length; i++){
                                flty[i].style.display = 'none' ;
                            }
                            recvderr.innerText = 'No Errors';
                            recvderrcond.innerText = 0;
                            recvdsum.innerText = 'Your Vehicle Seems Ok';
                        }
        
                        if(parseInt(dve.canbus.battery_voltage) < 10){
                            healthStatus -= 5;
                            power.innerText = 'Needs Checking';
                        }
                        else{
                            power.innerText = 'All Good Here';
                        }
    
                        if(healthStatus > 70 && healthStatus <= 100){
                            healthStats.innerText = 'Healthy ' + healthStatus + '%';
                        }
                        else if(healthStatus > 50 && healthStatus <= 70){
                            healthStats.innerText = 'Not So Good ' + healthStatus + '%';
                        }
                        else if(healthStatus > 30 && healthStatus <= 50){
                            healthStats.innerText = 'Bad ' + healthStatus + '%';
                        }
                        else{
                            healthStats.innerText = 'Terrible ' + healthStatus + '%';
                        }
                        
                        
                        console.log(healthStatus);
                        new Chartist.Pie('.ct-chart', {
                            series: [healthStatus, 100-healthStatus]
                        }, {
                            donut: true
                            , donutWidth: 20
                            , startAngle: 0
                            , showLabel: false
                        });
    
    
                    }
                    else{
                        
                    }
    
                    if(dve["driver behavior"] !== 'Unavailable'){
                        namign.innerText = dve["driver behavior"].total_ignition_no;
                        namdrivtim.innerText = dve["driver behavior"].total_driving_time;
                        namidltim.innerText = dve["driver behavior"].total_idling_time;
                        namhotstarts.innerText = dve["driver behavior"].average_hot_start_time;
                        namavgspeed.innerText = dve["driver behavior"].average_speed;
                        namhighestspeed.innerText = dve["driver behavior"].history_highest_speed;
                        namengrotation.innerText = dve["driver behavior"].history_highest_rotation;
                        namharshaccel.innerText = dve["driver behavior"].total_harsh_acceleration_no;
                        namharshbraking.innerText = dve["driver behavior"].total_harsh_brake_no;
                        $("#namignbar").addClass("label-info");
                        $("#namdrivtimbar").addClass("label-info");
                        $("#namidltimbar").addClass("label-info");
                        $("#namhotstartsbar").addClass("label-info");
                        $("#namavgspeedbar").addClass("label-info");
                        $("#namhighestspeedbar").addClass("label-info");
                        $("#namengrotationbar").addClass("label-info");
                        $("#namharshaccelbar").addClass("label-info");
                        $("#namharshbrakingbar").addClass("label-info");
                        namignbar.innerText = "Normal";
                        namdrivtimbar.innerText = "Normal";
                        namidltimbar.innerText = "Normal";
                        namhotstartsbar.innerText = "Normal";
                        namavgspeedbar.innerText = "Normal";
                        namhighestspeedbar.innerText = "Normal";
                        namengrotationbar.innerText = "Normal";
                        namharshaccelbar.innerText = "Normal";
                        namharshbrakingbar.innerText = "Normal";
    
                    }
                    else{
                        
                    }

                    
                
                    
                    
                    
                
                })
            });
        })
    }
}
else{
    if (page.split(".")[0].indexOf("login") !== -1){
        login();
    }
    else{
        window.location.assign("pages-login.html.htm");
    }
    // 
}
var getpcnt = function(name, amt, typ){
    if(typ == "val"){
        amt = parseInt(amt, 10);
    }
    if(typ == "bar"){
        amt = Math.ceil(parseInt(amt, 10) / 10) * 10;
    }
    
    var pcnt;
    switch(name){
        case "runningspeed" : {
            pcnt = (amt/100) * 100;
            break;
        }
        case "batteryvoltage" : {
            pcnt = (amt/13) * 100;
            break;
        }
        case "batteryvoltagebar" : {
            pcnt = (amt/90) * 100;
            break;
        }
        
        case "throttleopeningwidth": {
            pcnt = (amt / 100) * 100;
            break;
        }
        
        case "engineload": {
            pcnt = (amt / 100) * 100;
            break;
        }
        
        case "coolanttemperature": {
            pcnt = (amt / 100) * 100;
            break;
        }
        
        case "instantenousfuelconsumption": {
            pcnt = (amt / 100) * 100;
            break;
        }
        
        case "averagefuelconsumption": {
            pcnt = (amt / 100) * 100;
            break;
        }
        
        case "singlefuelconsumptionvol": {
            pcnt = (amt / 100) * 100;
            break;
        }
        
        case "totalfuelconsumptionvol": {
            pcnt = (amt / 100) * 100;
            break;
        }
        
        
    }
    // console.log(typeof(pcnt));
    return parseInt(pcnt, 10);

};




var set_canbus = function(element){
    console.log(element);
    var gaugeCharts = document.getElementsByClassName('gauge-charts');
    var canbus_cards = document.getElementsByClassName('canbus');

    var gCharts = [];
   
    for(chart in gaugeCharts){
        if(chart < gaugeCharts.length){
            gCharts.push(echarts.init(gaugeCharts[chart]));
        }
        
        
        
    }

    for(card in canbus_cards){
        if(card < canbus_cards.length){
            canbus_cards[card].style.display = 'none';
        }
        
    }
    var canbus_cat = element;
    
    
    
    switch(canbus_cat.value){
        case 'fuel_con': {
            var crds = document.getElementsByClassName(canbus_cat.value);
            for(crd in crds){
                if(crd < crds.length){
                    crds[crd].style.display = 'flex';
                }
                
            };
            break;
        }
        case 'temp_read': {
            var crds = document.getElementsByClassName(canbus_cat.value);
            for(crd in crds){
                if(crd < crds.length){
                    crds[crd].style.display = 'flex';
                }
                
            };
            break;
        }
        case 'driv_spd': {
            var crds = document.getElementsByClassName(canbus_cat.value);
            for(crd in crds){
                if(crd < crds.length){
                    crds[crd].style.display = 'flex';
                }
                
            };
            if(gCharts.length > 1){
                for(chrt in gCharts){
                    if(chrt < gCharts.length){
                        switch(chrt.toString()){
                            case '0': {
                                option = {
                                    tooltip: {
                                        formatter: "{a} <br/>{b} : {c}%"
                                    }
                                    , toolbox: {
                                        show: false
                                        , feature: {
                                            mark: {
                                                show: true
                                            }
                                            , restore: {
                                                show: true
                                            }
                                            , saveAsImage: {
                                                show: true
                                            }
                                        }
                                    }
                                    , series: [
                                        {
                                            name: '', 
                                            type: 'gauge',
                                            splitNumber: 0, // 分割段数，默认为5
                                            axisLine: { // 坐标轴线
                                                lineStyle: { // 属性lineStyle控制线条样式
                                                    color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                                    width: 20
                                                }
                                            }
                                            , axisTick: { // 坐标轴小标记
                                                splitNumber: 0, // 每份split细分多少段
                                                length: 12, // 属性length控制线长
                                                lineStyle: { // 属性lineStyle控制线条样式
                                                    color: 'auto'
                                                }
                                            }
                                            , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    color: 'auto'
                                                }
                                            }
                                            , splitLine: { // 分隔线
                                                show: false, // 默认显示，属性show控制显示与否
                                                length: 50, // 属性length控制线长
                                                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                                    color: 'auto'
                                                }
                                            }
                                            , pointer: {
                                                width: 5
                                                , color: '#54667a'
                                            }
                                            , title: {
                                                show: false
                                                , offsetCenter: [0, '-40%'], // x, y，单位px
                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    fontWeight: 'bolder'
                                                }
                                            }
                                            , detail: {
                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    color: 'auto'
                                                    , fontSize: '14'
                                                    , fontWeight: 'bolder'
                                                }
                                            }
                                            , data: [{
                                                value: parseInt(dve.canbus.running_speed), 
                                                name: 'Speed'
                                            }]
                                        }
                                    ]
                                };
                                timeTicket = setInterval(function () {
                                    // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                                    gCharts[chrt].setOption(option, true);
                                }, 2000)
                                // use configuration item and data specified to show chart
                                gCharts[chrt].setOption(option, true), $(function () {
                                    function resize() {
                                        setTimeout(function () {
                                            gCharts[chrt].resize()
                                        }, 100)
                                    }
                                    $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                                });

                                break;
                            }
                            case '1': {
                                option = {
                                    tooltip: {
                                        formatter: "{a} <br/>{b} : {c}%"
                                    }
                                    , toolbox: {
                                        show: false
                                        , feature: {
                                            mark: {
                                                show: true
                                            }
                                            , restore: {
                                                show: true
                                            }
                                            , saveAsImage: {
                                                show: true
                                            }
                                        }
                                    }
                                    , series: [
                                        {
                                            name: '', 
                                            type: 'gauge',
                                            splitNumber: 0, // 分割段数，默认为5
                                            axisLine: { // 坐标轴线
                                                lineStyle: { // 属性lineStyle控制线条样式
                                                    color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                                    width: 20
                                                }
                                            }
                                            , axisTick: { // 坐标轴小标记
                                                splitNumber: 0, // 每份split细分多少段
                                                length: 12, // 属性length控制线长
                                                lineStyle: { // 属性lineStyle控制线条样式
                                                    color: 'auto'
                                                }
                                            }
                                            , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    color: 'auto'
                                                }
                                            }
                                            , splitLine: { // 分隔线
                                                show: false, // 默认显示，属性show控制显示与否
                                                length: 50, // 属性length控制线长
                                                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                                    color: 'auto'
                                                }
                                            }
                                            , pointer: {
                                                width: 5
                                                , color: '#54667a'
                                            }
                                            , title: {
                                                show: false
                                                , offsetCenter: [0, '-40%'], // x, y，单位px
                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    fontWeight: 'bolder'
                                                }
                                            }
                                            , detail: {
                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    color: 'auto'
                                                    , fontSize: '14'
                                                    , fontWeight: 'bolder'
                                                }
                                            }
                                            , data: [{
                                                value: parseInt(dve.canbus.driving_range), 
                                                name: 'Range'
                                            }]
                                        }
                                    ]
                                };
                                timeTicket = setInterval(function () {
                                    // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                                    gCharts[chrt].setOption(option, true);
                                }, 2000)
                                // use configuration item and data specified to show chart
                                gCharts[chrt].setOption(option, true), $(function () {
                                    function resize() {
                                        setTimeout(function () {
                                            gCharts[chrt].resize()
                                        }, 100)
                                    }
                                    $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                                });

                                break;
                            }
                            case '2': {
                                option = {
                                    tooltip: {
                                        formatter: "{a} <br/>{b} : {c}%"
                                    }
                                    , toolbox: {
                                        show: false
                                        , feature: {
                                            mark: {
                                                show: true
                                            }
                                            , restore: {
                                                show: true
                                            }
                                            , saveAsImage: {
                                                show: true
                                            }
                                        }
                                    }
                                    , series: [
                                        {
                                            name: '', 
                                            type: 'gauge',
                                            splitNumber: 0, // 分割段数，默认为5
                                            axisLine: { // 坐标轴线
                                                lineStyle: { // 属性lineStyle控制线条样式
                                                    color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                                    width: 20
                                                }
                                            }
                                            , axisTick: { // 坐标轴小标记
                                                splitNumber: 0, // 每份split细分多少段
                                                length: 12, // 属性length控制线长
                                                lineStyle: { // 属性lineStyle控制线条样式
                                                    color: 'auto'
                                                }
                                            }
                                            , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    color: 'auto'
                                                }
                                            }
                                            , splitLine: { // 分隔线
                                                show: false, // 默认显示，属性show控制显示与否
                                                length: 50, // 属性length控制线长
                                                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                                    color: 'auto'
                                                }
                                            }
                                            , pointer: {
                                                width: 5
                                                , color: '#54667a'
                                            }
                                            , title: {
                                                show: false
                                                , offsetCenter: [0, '-40%'], // x, y，单位px
                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    fontWeight: 'bolder'
                                                }
                                            }
                                            , detail: {
                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    color: 'auto'
                                                    , fontSize: '14'
                                                    , fontWeight: 'bolder'
                                                }
                                            }
                                            , data: [{
                                                value: parseInt(dve.canbus.total_mileage), 
                                                name: 'Mileage'
                                            }]
                                        }
                                    ]
                                };
                                timeTicket = setInterval(function () {
                                    // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                                    gCharts[chrt].setOption(option, true);
                                }, 2000)
                                // use configuration item and data specified to show chart
                                gCharts[chrt].setOption(option, true), $(function () {
                                    function resize() {
                                        setTimeout(function () {
                                            gCharts[chrt].resize()
                                        }, 100)
                                    }
                                    $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                                });

                                break;
                            }
                            case '3' : {
                                option = {
                                    tooltip: {
                                        formatter: "{a} <br/>{b} : {c}%"
                                    }
                                    , toolbox: {
                                        show: false
                                        , feature: {
                                            mark: {
                                                show: true
                                            }
                                            , restore: {
                                                show: true
                                            }
                                            , saveAsImage: {
                                                show: true
                                            }
                                        }
                                    }
                                    , series: [
                                        {
                                            name: '', 
                                            type: 'gauge',
                                            splitNumber: 0, // 分割段数，默认为5
                                            axisLine: { // 坐标轴线
                                                lineStyle: { // 属性lineStyle控制线条样式
                                                    color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                                    width: 20
                                                }
                                            }
                                            , axisTick: { // 坐标轴小标记
                                                splitNumber: 0, // 每份split细分多少段
                                                length: 12, // 属性length控制线长
                                                lineStyle: { // 属性lineStyle控制线条样式
                                                    color: 'auto'
                                                }
                                            }
                                            , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    color: 'auto'
                                                }
                                            }
                                            , splitLine: { // 分隔线
                                                show: false, // 默认显示，属性show控制显示与否
                                                length: 50, // 属性length控制线长
                                                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                                    color: 'auto'
                                                }
                                            }
                                            , pointer: {
                                                width: 5
                                                , color: '#54667a'
                                            }
                                            , title: {
                                                show: false
                                                , offsetCenter: [0, '-40%'], // x, y，单位px
                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    fontWeight: 'bolder'
                                                }
                                            }
                                            , detail: {
                                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    color: 'auto'
                                                    , fontSize: '14'
                                                    , fontWeight: 'bolder'
                                                }
                                            }
                                            , data: [{
                                                value: parseInt(dve.canbus.engine_speed), 
                                                name: 'Eng Speed'
                                            }]
                                        }
                                    ]
                                };
                                timeTicket = setInterval(function () {
                                    // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                                    gCharts[chrt].setOption(option, true);
                                }, 2000)
                                // use configuration item and data specified to show chart
                                gCharts[chrt].setOption(option, true), $(function () {
                                    function resize() {
                                        setTimeout(function () {
                                            gCharts[chrt].resize()
                                        }, 100)
                                    }
                                    $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                                });

                                break;
                            }
                            default:{
                                break;
                            }
                        }
                    }
                    
                }
            }
            

            
            

            break;
        }
        case 'power_others': {
            var crds = document.getElementsByClassName(canbus_cat.value);
            for(crd in crds){
                if(crd < crds.length){
                    crds[crd].style.display = 'flex';
                }
                
            };
            break;
        }
        default: {
            var crds = document.getElementsByClassName('canbus');
            for(crd in crds){
                if(crd < crds.length){
                    crds[crd].style.display = 'flex';
                }
                
            };
            break;
        }
    }
}

function addLatLng(event) {
    const path = poly.getPath();
  
    // Because path is an MVCArray, we can simply append a new coordinate
    // and it will automatically appear.
    path.push(event.latLng);
    // Add a new marker at the new plotted point on the polyline.
    new google.maps.Marker({
      position: event.latLng,
      title: "#" + path.getLength(),
      map: map,
      animation: google.maps.Animation.BOUNCE
    });
}
function geofenc(){
    
    var indc = document.getElementById('geofence');
    console.log(indc.style['background-color']);
    if(indc.style['background-color'] == 'grey'){
        indc.style['background-color'] = 'limegreen';
    }
    else{
        indc.style['background-color'] = 'grey';
    }

}

function navig(){
    
    var indc = document.getElementById('navi');
    console.log(indc.style['background-color']);
    if(indc.style['background-color'] == 'grey'){
        indc.style['background-color'] = 'limegreen';
    }
    else{
        indc.style['background-color'] = 'grey';
    }

}
