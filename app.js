//selectores
const cityInput = document.querySelector('#city');
const countrySelect = document.querySelector('#country');
const submitBtm = document.querySelector('#submit');
const form = document.querySelector('#form');
//variables
//eventlisteners
document.addEventListener('DOMContentLoaded',()=>{
    submitBtm.addEventListener('click',formValidation);
})
//classses
//funciones

function formValidation (e){
    e.preventDefault();
    //borrando mensajes de erros si es que existen
    if(document.querySelectorAll('.p-wrong')){
        document.querySelectorAll('.p-wrong').forEach(element => element.remove());
        cityInput.className = " ";
        countrySelect.className = " ";
    }
    //verificando si los campos solicitados son correctos
    if(cityInput.value === '' && countrySelect.value.trim() === ''){
        wrongMessage(cityInput,'Ingrese una ciudad');
        wrongMessage(countrySelect,'Seleccione un pais');
      
    }else if(cityInput.value === '' || countrySelect.value.trim() === ''){
        if(cityInput.value === '' ){
            wrongMessage(cityInput,'Ingrese una ciudad');

        }else{
            wrongMessage(countrySelect,'Seleccione un pais');
        }
    }else{
        //si los campos son correctos
        

        //consultar API
        consultAPI(cityInput.value,countrySelect.value );

    }

}

//Consultar la existencia de la ciudad en la API
function consultAPI(city, country){
    const appId = '43821f97e4c69afd6fc9cce0fb80e9a9';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`; 
    
    // console.log(url);
   

    fetch(url)
        .then(result => result.json())
        .then(data => {
            if(data.cod === '404'){
                wrongMessage(cityInput,'Ciudad no encontrada');
            }else{
                //imprimir la respuesta de la busqueda en el html
                wheaterHTML(data);
            }
        } );


}

//mensajes error al cargar el formulario
function wrongMessage(element,msg){
    const text = document.createElement('p');
    text.textContent = msg;
    text.classList.add('p-wrong')
    element.classList.add('field-wrong');
    element.parentElement.appendChild(text);

}

function wheaterHTML (data){
    const {main:{temp,temp_max, temp_min},} = data;
    const {description,icon} = data.weather[0]
    //Eliminar el mensaje de inicio
    const firstText = document.querySelector('.first-text');
    firstText.innerHTML='';
    //Insertar el resultado
    //Insertar el nombre de la ciudad
    const cityName = document.querySelector('#city-name');
    cityName.innerHTML=`
    <p class="name">${cityInput.value}</p>
    <p>now</p>
    `;
    //insertar imagen y temperatura actual  data.weather[0].icon
    const image = document.querySelector('#image');
    image.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="" width="230px">
    `;
    const currentTemp = document.querySelector('#currently-temperature');
    // const resultTemp = parseInt(temp-273.15);
    currentTemp.innerHTML = `
    <div id="temp-max">${conversion(temp)}°</div>
    <div id="temp-min">/${conversion(temp_min)}°</div>
    `;
    //Insertar la descripción y la temperatura minima y maxima
    const info = document.querySelector('#description');
    info.innerHTML = `
    <p>${description}</p>
    
    `;



}

function conversion (temp){
    const resultTemp = parseInt(temp-273.15);
    return resultTemp.toString()

}



