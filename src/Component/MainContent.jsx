import React, { useEffect, useState } from 'react'
import  axios from "axios"
import Prayer from './Prayer';
import img1 from './image1.jpeg'
import img2 from './images.jpeg'
import img3 from './images2.jpeg'
import img4 from './العشاء.jpeg'
import img5 from './العصر.jpg'
import moment from 'moment';
import './logo-leaf-green.png'
import img6 from'./logo-leaf-green.png'
moment.locale("ar")

export default  function MainContent() {

    const[selectCity,setSelectCity]=useState({
        displayName:' الاسكندرية',
        apiName:' alexandria'        
    })
  const [day,setDay]= useState("")
  const[reminTime,setReminTime]=useState("")
  const [nextPryer,setNextpryer]=useState(2)
  const [timings,setTimings]=useState({
      "Fajr": "04:15",
      "Dhuhr": "12:53",
      "Asr": "4:41",
      "Maghrib": "20:05",
      "Isha": "21:33",
  });

  const avilableCity=[
         { 
                   displayName:'الاسكندرية',
                    apiName:' alexandria'},
           { 
                    displayName:'دهب',
                    apiName:'dahab'},
            { 
                    displayName:'اسوان',
                    apiName:'aswen'},
            {  
                    displayName:'سوهاج',
                    apiName:'sohaga'},
            {  
                    displayName:'المنيا',
                    apiName:'el minya'},
             {  
                    displayName:'اسيوط',
                    apiName:'asyut'},
             {  
                    displayName:'شرم الشيخ',
                    apiName:'sharm el sheikh'}  ,
             {  
                     displayName:'الاقصر',
                     apiName:'luxor'} ,
                     {  
                      displayName:'القاهرة',
                      apiName:'cairo'}             
    ] 
      const pryarArray=[
          {displayName:'الفجر',key:'Fajr'},
          {displayName:'الظهر',key:'Dhuhr'},
          {displayName:'العصر',key:'Asr'},
          {displayName:'المغرب',key:'Muaghrib'},
          {displayName:'العشاء',key:'Isha'},
       ]
      // func handlechange
   const handelChange=(event)=>{
    const cityObject=avilableCity.find((city)=>{
        return city.apiName == event.target.value
    })
    setSelectCity(cityObject)
    }

    // deal with Api
    const getTimes=async()=>{
        const  response=await axios.get(`https://api.aladhan.com/v1/timingsByCity?country=EG&city=${selectCity.apiName}`)
        setTimings(response.data.data.timings)
    }

  useEffect(() =>{
 getTimes();
},[selectCity]);


  useEffect(()=>{
    const intervel=setInterval(()=>{
        setupCountDownTimer()
     },1000);
    
     const t= moment() 
     setDay(t.format("MMM Do YYYY | h:mm"))
     return() =>{
      clearInterval(intervel)}
  },[])

const setupCountDownTimer= ()=>{
  const momentNOw= moment();
  let pryerIndex=2; 

  if(momentNOw.isAfter(moment(timings["Fajr"],"hh:mm")) && momentNOw.isBefore(moment(timings["Dhuhr"],"hh:mm"))){
    pryerIndex=1;
  }

  else if(momentNOw.isAfter(moment(timings["Dhuhr"],"hh:mm"))&& momentNOw.isBefore(moment(timings["Asr"],"hh:mm"))){
    pryerIndex=2;
  }

  else if(momentNOw.isAfter(moment(timings["Asr"],"hh:mm"))&& momentNOw.isBefore(moment(timings["Maghrib"],"hh:mm"))){
    pryerIndex=3;
  }

  else if(momentNOw.isAfter(moment(timings["Maghrib"],"hh:mm"))&& momentNOw.isBefore(moment(timings["Isha"],"hh:mm"))){
    pryerIndex=4;
  }

  else{
    pryerIndex=0; 
  }

setNextpryer(pryerIndex)

//   now after i knowing what is the next pryer  we can setup countdown timer by getting prer time
  const nextPrerObject=pryarArray[pryerIndex]
  const nextPrerTime= timings[nextPrerObject.key]
  const remineTime= moment(nextPrerTime,"hh:mm").diff(momentNOw )
  const durationTime=moment.duration(remineTime)


  setReminTime(
    `${durationTime.seconds()}:
   ${ durationTime.minutes()}:
  ${ durationTime.hours()}`)
  }
 
  return (<>

<div className="logo">
      <img alt='nonee' src={img6} style={{width:'100px',height :'40px',padding:'30px'}}/>
 </div>
   <div className="hgg ">
     <div>
          <h1> بسم اللة الرحمن الرحيم</h1>
          <h3>إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَأَقَامُوا الصَّلَاةَ وَآتَوُا الزَّكَاةَ لَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ ﴿٢٧٧ البقرة﴾</h3>
     </div>
   </div>
           <div className='sec1'>
        <div>
           <h3>{day}</h3>
           <h1> {selectCity.displayName}</h1>
        </div>
        <div>
           <h3>متبقي حتي صلاة {pryarArray[nextPryer].displayName} </h3>
           <h1>{reminTime}</h1>
        </div>
     </div>
    <hr></hr>

    <div className='paryers'>
    <Prayer image={img1}name="الفجر" time={timings.Fajr}/>
    <Prayer image={img2} name="الظهر" time={timings.Dhuhr}/>
    <Prayer image={img5} name="العصر" time={timings.Asr}/>
    <Prayer image={img3} name="المغرب" time={timings.Maghrib}/>
    <Prayer image={img4} name="العشاء" time={timings.Isha}/>
</div>

<div className='country'>
  <div>
   <label htmlFor="cars" style={{padding:"7px",fontSize:"22px"}}>المدينة:</label>

    <select style={{padding:'8px', fontSize:'22px'}} id="sel" onChange={handelChange}>
      
      {avilableCity.map((city)=>{
        return(
       <option  value={city.apiName} key={city.apiName} >
       {city.displayName}
        </option>
        )
      }
    )}
    </select>
  </div>
 </div>
 <footer>
<div>
<h3>
  اللهم انصر إخواننا في فلسطين. اللهم رد إلينا فلسطين والمسجد الأقصى ردًا جميلًا، اللهم أنصر ضعفهم فإنهم ليس لهم سواك. اللهم إني أستودعك بيت المقدس وأهل القدس وكل فلسطين. اللهم ارزق أهل فلسطين الثبات والنصر والتمكين، وبارك في إيمانهم وصبرهم
  </h3>
  <h3>©Copy Right 2024 Tamer Mohamed Azmy</h3>
</div>
 </footer>
    </>
  )
    }
  
