window.onload = function () {
  var select = document.getElementById("select");
  var location = document.querySelector(".location")
  var container = document.getElementById("container")
  var package1 = document.querySelector(".package1")
  var package2 = document.querySelector(".package2")
  var package3 = document.querySelector(".package3")
  var content2 = package2.querySelector("#content2")
  var pop = document.querySelector("#pop-up")
  var replace = document.querySelector(".replace")
  var add = document.querySelector(".add")
  var cancel = document.querySelector(".cancel")
  var back = document.querySelector("#back")
  var back1 = document.querySelector("#back1")
  var menu = document.querySelector(".menu")
  var menu2 = document.querySelector(".menu2")
  var more = document.querySelector(".more")

  var tempcitys = document.querySelector("#tempcitys")
  var list = document.querySelector("#list")

  var citysdata;

  // 用来存储当前城市名的变量
  // 用来存储多个数据名的数组
  var citysArr = ["安阳"]    // 第一个代表当前城市，其他代表其他城市
  var cityW = []
  
  /*
    {
      city:'成都',
      today:{
        日期
        温度
        天气
        风力
      },
      tomorrow:{
        日期+1
        温度
        天气
        风力
      },
      afterTomorrow:{
        日期+2
        温度
        天气
        风力
      },
    }
  */ 
    
    // package1.style.display = 'none'
    // package2.style.display = 'none'
    // menu.style.display = "none"
    // package3.style.display = 'block'
    // menu2.style.display = "block"


  //加载天气查询插件
  addpage()
  
  function addpage(){
    list.innerHTML = ''
    tempcitys.innerHTML = ''
     AMap.plugin("AMap.Weather", function () {
       //创建天气查询实例
       var weather = new AMap.Weather();
       // 根据城市数组获取数值
      for(let i=0;i<citysArr.length;i++){
        //执行实时天气信息查询  
        // citysArr.reverse()
        weather.getForecast(citysArr[i], (err, data)=> {
         if(err) return console.log(err)
         citysdata = data.forecasts   
         cityW[i] = data.forecasts[0].dayWeather
         console.log('--------------------')      
         console.log("cityW.length"+cityW.length)
         console.log("citysArr"+citysArr)
         console.log(cityW)
         console.log('--------------------')   
         createli(citysdata,citysArr[i])
        //  
         createopeara(citysdata[0],citysArr[i])        
         
           var mySwiper = new Swiper('.swiper-container',{    
             paginationClickable: true
           })      
           var bglis = document.querySelectorAll("#tempcitys>li")
           var listli = document.querySelectorAll("#list>li")
            for(let i=0;i<bglis.length;i++){
              bglis[i].style.background = "url('./images/bg/"+cityW[cityW.length-i-1]+".png')"
              bglis[i].style.backgroundSize = "100vw 100vh"

              listli[i].style.background = "url('./images/bg/"+cityW[cityW.length-i-1]+".png')"
              listli[i].style.backgroundSize = "80vw auto"
              listli[i].style.backgroundPosition = "0vw -50vh"
            }

          // 长按出现删除按钮
          var removeli = document.querySelectorAll("#list>li")
          for(let i=0;i<removeli.length;i++){
            removeli[i].ontouchstart = function(){
              var timer = setTimeout(() => {
                  var span = document.createElement("span")
                  span.innerHTML = "删除"
                  removeli[i].appendChild(span) 
                  // 点击删除按钮的操作
                  span.ontouchstart = function(){
                    citysArr.splice(i,1)
                    removeli[i].remove()
                    tempcitys.querySelectorAll("li")[i].remove()
                  }
              }, 1000);
              removeli[i].ontouchend = function(){
                clearTimeout(timer)
              }
            }  
          }
          
       });  
     }   
    });  
    
  }

  // package1 -----------------
 

  // 新添加温度页面
  function createli(city,mycity){
    var li = document.createElement("li")    
    // citysArr[0]记录当前定位的城市
    li.classList.add("swiper-slide")
    li.innerHTML  = `  
    <div class="title">`+mycity+`</div>   
    <div class="content">
      <div class="weatherImg">
      <img class="wtImg" src="./images/icon/`+city[0].dayWeather+`.png">
      </div>
      <div class="data">
        <div class="data-left" id="temperature">`+city[0].dayTemp+`°C</div>
        <div class="data-right">
          <p class="weather">`+city[0].dayWeather+`</p>
          <p class="windpower">风力`+city[0].dayWindPower+`</p>
        </div>
      </div>
    </div>
    `
    
    var footer = document.createElement("footer")
    // footer.style.display = "none"
    for(let j=1;j<city.length;j++){
      footer.innerHTML += `    
      <div>
        <div class="footer-top">
        <img class="wtImg" src="./images/icon/`+city[j].dayWeather+`.png">
          <p class="date">`+city[j].date+`</p>
        </div>
        <div class="footer-bottom">
          <div class="temperature">`+city[j].dayTemp+`°C</div>
          <div class="weather">`+city[j].dayWeather+`</div>
        </div>
      </div>                        
      `
    }

    li.appendChild(footer)
    tempcitys.appendChild(li)
    console.log("createli"+cityW)
  }

  // package2 -----------------

  //点击加号，页面进行数据刷新，显示选择城市页面
  location.onclick = function(){
    var footer = document.createElement("footer")
    // 显示相关定位内容
    footer.style.display = "none"
    package1.style.display = 'none'
    package2.style.display = 'block'
    menu.style.display = "block"
    package3.style.display = 'none'
    menu2.style.display = "none"
    // 获取省会以及城市，并添加到页面
    for(let i=0;i<citys.provinces.length;i++){
      // 外层添加省会到h4,内层添加内容到列表项
      var div = document.createElement("div")
      var h4 = document.createElement("h4")
      var ul = document.createElement("ul")
      h4.innerHTML = citys.provinces[i].provinceName
      div.appendChild(h4)
      for(let j=0;j<citys.provinces[i].citys.length;j++){
        var li = document.createElement("li")
        li.innerHTML = citys.provinces[i].citys[j].citysName
        ul.appendChild(li)
      }
      div.appendChild(ul)
      content2.appendChild(div)
    }
    
  var lis = document.querySelectorAll("#content2 li")
  var title = document.querySelectorAll(".title")
  for(var i=0;i<lis.length;i++){
    lis[i].onclick = function(){
      pop.style.display = "block"
      replace.onclick = ()=>{
        cityName = this.innerHTML
        citysArr[0] = cityName    
        pop.style.display = "none"
      }
      add.onclick = ()=>{
        // 获取对应城市的信息添加到cityArr中
        citysArr[citysArr.length] = this.innerHTML        
        console.log('第二次调用的位置耶~')
        pop.style.display = "none"
      }
      cancel.onclick = ()=>{        
        pop.style.display = "none"
      }
    }
  }

  }
  
  // 点击back 添加城市界面消失
  back.onclick = function(){
    package1.style.display = "block"
    package2.style.display = "none"
    menu.style.display = "none"
    package3.style.display = "none"
    menu2.style.display = "none"
    addpage()
  }

  back1.onclick = function(){
    package1.style.display = "block"
    package2.style.display = "none"
    menu.style.display = "none"
    package3.style.display = "none"
    menu2.style.display = "none"
    addpage()
  }

  // package3 -----------------
  more.onclick = function(){
    var footer = document.createElement("footer")
    footer.style.display = "none"
    package1.style.display = 'none'
    package2.style.display = 'none'
    menu.style.display = "none"
    package3.style.display = 'block'
    menu2.style.display = "block"
  }

  // 创建添加li操作的文件
  function createopeara(citysdata,citysArr){
    var li = document.createElement("li")
    li.innerHTML = `    
    <div class="left">              
    <div class="tq">
        <div class="addtemperature">`+citysdata.dayTemp+`°C</div>
        <div class="addweather">`+citysdata.dayWeather+`</div>
      </div>
      <div class="addtitle">`+citysArr+`</div>
    </div>
    <div class="right">
      <img class="addImg" src="./images/icon/`+citysdata.dayWeather+`.png" alt="">
    </div>
    `

    list.appendChild(li)
    console.log("createopeara"+cityW)
  }

};
