let sliders = document.getElementsByClassName("slider");
let sliderSpanIst = document.querySelector("span.timerText-ist");
let sliderSpanUtc = document.querySelector("span.timerText-utc");
let sliderIst = document.querySelector(".range-ist");
let sliderUtc = document.querySelector(".range-utc");


function updateSliderSpan(slider){
    let sliderInput = String(slider.value);
    if (sliderInput.slice(2) == '.5') {
        let updatedSliderInput = `${sliderInput.slice(0, 2)}.30`;
        slider.nextElementSibling.textContent = updatedSliderInput;
    }else if(sliderInput.slice(1)=='.5'){
        let updatedSliderInput = `${sliderInput.slice(0, 1)}.30`;
        slider.nextElementSibling.textContent = updatedSliderInput;
    } 
    else {
        slider.nextElementSibling.textContent = slider.value;
    }
}

function updateTimeDisplay(slider){
    slider.parentNode.previousElementSibling.children[1].children[0].textContent = slider.nextElementSibling.innerText;
}

sliders = [...sliders];
sliders.forEach((slider)=>{
    slider.addEventListener("input",function(){
        updateSliderSpan(slider);
    });
    slider.addEventListener("change",function(){
        updateSliderSpan(slider);
    });  
});

function setDefault(){
    // new Date(year,month,day,hours,minutes)
    // testing 0-5 hours
    // const ist = new Date(2023,10,8,0,0);
    const ist = new Date();
    const ist2 = new Date();
    
    const utcSeconds = ist.setMinutes(ist.getMinutes() + ist.getTimezoneOffset());
    const utc = new Date(utcSeconds);
    

    // slider nu logic 
    // 30+ min hoy to .5 ma batavavu value ne
   
    sliderIst.value = `${ist2.getHours()}${ist2.getMinutes()>=30?'.5':''}`;
    updateSliderSpan(sliderIst);
    updateTimeDisplay(sliderIst);

    sliderUtc.value = `${utc.getHours()}${utc.getMinutes()>=30?'.5':''}`;
    updateSliderSpan(sliderUtc);
    updateTimeDisplay(sliderUtc);
}
setDefault();

function sliderInputToOutput(time){
    if(time.length==1||time.length==2){
        return Number(time)*60;
    }else{
        return Number(time.split('.')[0])*60 + 30;
    }
}
sliderIst.addEventListener("input",function(){
    let istTime = this.nextElementSibling.textContent;
    let istTimeMinutes = sliderInputToOutput(String(istTime));
    // console.log(istTimeMinutes - 330);
    let utcTimeMinutes = (istTimeMinutes - 330) < 330  ? ((istTimeMinutes - 330) + 1440) : (istTimeMinutes - 330);
    sliderUtc.value = utcTimeMinutes/60;

    const bstAll = document.querySelectorAll(".range-bst");
    const cestAll = document.querySelectorAll(".range-cest");
    const cvtAll = document.querySelectorAll(".range-cvt");
    const edtAll = document.querySelectorAll(".range-edt");

   

    bstAll.forEach((bst)=>{
        let bstOffset = 1;
        let bstTimeMinutes =  (utcTimeMinutes + bstOffset*60)%1440;
        bst.value=bstTimeMinutes/60;
        updateSliderSpan(bst);
        updateTimeDisplay(bst);

    });

    cestAll.forEach((cest)=>{
        let cestOffset= 2;
        let cestTimeMinutes =  (utcTimeMinutes + cestOffset*60)%1440;
        cest.value=cestTimeMinutes/60;
        updateSliderSpan(cest);
        updateTimeDisplay(cest);
    });

    cvtAll.forEach((cvt)=>{
        let cvtoffset = 1 //minus;
        let cvtTimeMinutes = (utcTimeMinutes - cvtoffset * 60 ) < cvtoffset*60 ? ((utcTimeMinutes - cvtoffset * 60 )+1440) : (utcTimeMinutes - cvtoffset * 60 );
        cvt.value=cvtTimeMinutes/60;
        updateSliderSpan(cvt);
        updateTimeDisplay(cvt);
    });


    edtAll.forEach((edt)=>{
        let edtoffset = 5 //minus;
        let edtTimeMinutes = (utcTimeMinutes - edtoffset * 60 ) < edtoffset*60 ? ((utcTimeMinutes - edtoffset * 60 )+1440) : (utcTimeMinutes - edtoffset * 60 );
        edt.value=edtTimeMinutes/60;
        updateSliderSpan(edt);
        updateTimeDisplay(edt);
    });
    updateSliderSpan(sliderUtc);
    updateTimeDisplay(sliderUtc);
    updateTimeDisplay(sliderIst);
});

sliderIst.addEventListener("change",function(){
    let istTime = this.nextElementSibling.textContent;
    let istTimeMinutes = sliderInputToOutput(String(istTime));
    // console.log(istTimeMinutes - 330);
    let utcTimeMinutes = (istTimeMinutes - 330) < 330  ? ((istTimeMinutes - 330) + 1440) : (istTimeMinutes - 330);
    sliderUtc.value = utcTimeMinutes/60;
    updateSliderSpan(sliderUtc);
    updateTimeDisplay(sliderUtc);
    updateTimeDisplay(sliderIst);
});
sliderUtc.addEventListener("input",function(){
    let utcTime = this.nextElementSibling.textContent;
    let utcTimeMinutes = sliderInputToOutput(String(utcTime));
    // console.log("UTC :",utcTimeMinutes);
    // console.log("IST :",((utcTimeMinutes + 330)%1440));
    let istTimeMinutes = (utcTimeMinutes+330)%1440;
    sliderIst.value = istTimeMinutes / 60; 

    const bstAll = document.querySelectorAll(".range-bst");
    const cestAll = document.querySelectorAll(".range-cest");
    const cvtAll = document.querySelectorAll(".range-cvt");
    const edtAll = document.querySelectorAll(".range-edt");

    bstAll.forEach((bst)=>{
        let bstOffset = 1;
        let bstTimeMinutes =  (utcTimeMinutes + bstOffset*60)%1440;
        bst.value=bstTimeMinutes/60;
        updateSliderSpan(bst);
        updateTimeDisplay(bst);

    });

    cestAll.forEach((cest)=>{
        let cestOffset= 2;
        let cestTimeMinutes =  (utcTimeMinutes + cestOffset*60)%1440;
        cest.value=cestTimeMinutes/60;
        updateSliderSpan(cest);
        updateTimeDisplay(cest);
    });

    cvtAll.forEach((cvt)=>{
        let cvtoffset = 1 //minus;
        let cvtTimeMinutes = (utcTimeMinutes - cvtoffset * 60 ) < cvtoffset*60 ? ((utcTimeMinutes - cvtoffset * 60 )+1440) : (utcTimeMinutes - cvtoffset * 60 );
        cvt.value=cvtTimeMinutes/60;
        updateSliderSpan(cvt);
        updateTimeDisplay(cvt);
    });


    edtAll.forEach((edt)=>{
        let edtoffset = 5 //minus;
        let edtTimeMinutes = (utcTimeMinutes - edtoffset * 60 ) < edtoffset*60 ? ((utcTimeMinutes - edtoffset * 60 )+1440) : (utcTimeMinutes - edtoffset * 60 );
        edt.value=edtTimeMinutes/60;
        updateSliderSpan(edt);
        updateTimeDisplay(edt);
    });

    updateSliderSpan(sliderIst);
    updateTimeDisplay(sliderUtc);
    updateTimeDisplay(sliderIst);
});

sliderUtc.addEventListener("change",function(){
    let utcTime = this.nextElementSibling.textContent;
    let utcTimeMinutes = sliderInputToOutput(String(utcTime));
    // console.log("UTC :",utcTimeMinutes);
    // console.log("IST :",((utcTimeMinutes + 330)%1440));
    let istTimeMinutes = (utcTimeMinutes+330)%1440;
    sliderIst.value = istTimeMinutes / 60; 
    updateSliderSpan(sliderIst);
    
    updateTimeDisplay(sliderUtc);
    updateTimeDisplay(sliderIst);
});



let object = [
    {offset:'+1',name:'BST',fullform:'British Summer Time'},
    {offset:'+2',name:'CEST',fullform:'Central European Summer Time '},
    {offset:'-1',name:'CVT',fullform:'Cape Verde Time'},
    {offset:'-5',name:'EDT',fullform:'Eastern Daylight Time'},
    {offset:'+5.5',name:'IST',fullform:'India Standard Time'},
    {offset:'+0',name:'UTC',fullform:'Universal Time Coordinated'}
];

const ul = document.querySelector(".ul-section");
const searchInput = document.querySelector('.search-input');

function inputValidation(){
    let input = document.querySelector('.search-input');
    let arr = [];
    object.forEach((object)=>{
        arr.push(object.name);
    });
    if(!arr.includes(input.value.toUpperCase())){
        alert("Please enter valid timezones");
    }
    
}

searchInput.addEventListener('change',function(){
    inputValidation();
    let inputValue = this.value;
    let Obj;
    object.forEach((obj)=>{
        if(obj.name === inputValue){
            Obj = obj;
        }
     });
    
    const newLi = document.createElement("li");
    newLi.innerHTML = `
    <div class="upper-section">

                        <div class="left-sub-section">
                            <h2>${Obj.name}</h2>
                            <h4>${Obj.fullform}</h4>
                        </div>
                        <div class="right-sub-section">
                            <span id="${Obj.name.toLowerCase()}">|--Time--|</span>
                            <h4>GMT ${Obj.offset}</h4>
                            
                        </div>
                         <div class="cross-section">
                            <button class="xB">x</button>
                            <i class="fas fa-arrows-alt handle"></i>
                         </div>
                    </div>
                    <div class="slider-sub-section">
                        <input type="range" min="0" max="24" step="0.5" class="range-${Obj.name.toLowerCase()} slider" list="values" data-name="${Obj.name}">
                            <span class="timerText-ist">30</span>

                                <datalist id="values">
                                    <option value="0" label="0"></option>
                                    <option value="1" label="1"></option>
                                    <option value="2" label="2"></option>
                                    <option value="3" label="3"></option>
                                    <option value="4" label="4"></option>
                                    <option value="5" label="5"></option>
                                    <option value="6" label="6"></option>
                                    <option value="7" label="7"></option>
                                    <option value="8" label="8"></option>
                                    <option value="9" label="9"></option>
                                    <option value="10" label="10"></option>
                                    <option value="11" label="11"></option>
                                    <option value="12" label="12"></option>
                                    <option value="13" label="13"></option>
                                    <option value="14" label="14"></option>
                                    <option value="15" label="15"></option>
                                    <option value="16" label="16"></option>
                                    <option value="17" label="17"></option>
                                    <option value="18" label="18"></option>
                                    <option value="19" label="19"></option>
                                    <option value="20" label="20"></option>
                                    <option value="21" label="21"></option>
                                    <option value="22" label="22"></option>
                                    <option value="23" label="23"></option>
                                    <option value="24" label="24"></option>
                                </datalist>

                    </div>
    `;
    newSlider = newLi.querySelector('.slider');

    if(Obj.offset[0]=='+'){
        offset = Number(Obj.offset.split('+')[1]);
        // local time is ahead of utc
        // localtime > utc
        // utc + offset = localtime
        utcTimeMinutes = sliderUtc.value * 60;
        let localTimeMinutes = (utcTimeMinutes + offset*60)%1440;
        newSlider.value = localTimeMinutes / 60;
    } else {
        offset = Number(Obj.offset.split('-')[1]);
        // local time is behind utc
        // utc > local
        // local + offset = utc
        // local = utc - offset
        utcTimeMinutes = sliderUtc.value * 60;
        localTimeMinutes = (utcTimeMinutes - offset*60) < offset*60 ? ((utcTimeMinutes - offset*60)+1440) : (utcTimeMinutes - offset*60);
        newSlider.value = localTimeMinutes / 60;
    }
    updateSliderSpan(newSlider);
    updateTimeDisplay(newSlider);

    document.querySelector(".drag").append(newLi);
    let xButtons = ul.getElementsByClassName("xB");
    xButtons = Array.from(xButtons);
    xButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.target.parentNode.parentNode.parentNode.remove();

        });
    });

    sliders = document.getElementsByClassName("slider");
    sliders = [...sliders];
    sliders.forEach((slider)=>{
        slider.addEventListener("input",function(){
            updateSliderSpan(slider);
        });
        slider.addEventListener("change",function(){
            updateSliderSpan(slider);
        });  
    });


    this.value = "";

    liveBstAll = document.querySelectorAll(".range-bst");
    liveBstAll.forEach((bst)=>{
        bst.addEventListener("input",function(){
            let bstTimeMinutes = bst.value * 60;
            let utcTimeMinutes = (bstTimeMinutes - 60)<60 ? ((bstTimeMinutes - 60)+1440) : (bstTimeMinutes - 60);
            sliderUtc.value = utcTimeMinutes / 60;
            updateSliderSpan(sliderUtc);
            updateTimeDisplay(sliderUtc);
            let istTimeMinutes = (utcTimeMinutes+330)%1440;
            sliderIst.value = istTimeMinutes / 60; 
            updateSliderSpan(sliderIst);
            updateTimeDisplay(sliderIst);
            const cestAll = document.querySelectorAll(".range-cest");
            const cvtAll = document.querySelectorAll(".range-cvt");
            const edtAll = document.querySelectorAll(".range-edt");
            const bstAll = document.querySelectorAll(".range-bst");

            bstAll.forEach((bst) => {
                let bstOffset = 1;
                let bstTimeMinutes = (utcTimeMinutes + bstOffset * 60) % 1440;
                bst.value = bstTimeMinutes / 60;
                updateSliderSpan(bst);
                updateTimeDisplay(bst);

            });
            cestAll.forEach((cest) => {
                let cestOffset = 2;
                let cestTimeMinutes = (utcTimeMinutes + cestOffset * 60) % 1440;
                cest.value = cestTimeMinutes / 60;
                updateSliderSpan(cest);
                updateTimeDisplay(cest);
            });

            cvtAll.forEach((cvt) => {
                let cvtoffset = 1 //minus;
                let cvtTimeMinutes = (utcTimeMinutes - cvtoffset * 60) < cvtoffset * 60 ? ((utcTimeMinutes - cvtoffset * 60) + 1440) : (utcTimeMinutes - cvtoffset * 60);
                cvt.value = cvtTimeMinutes / 60;
                updateSliderSpan(cvt);
                updateTimeDisplay(cvt);
            });


            edtAll.forEach((edt) => {
                let edtoffset = 5 //minus;
                let edtTimeMinutes = (utcTimeMinutes - edtoffset * 60) < edtoffset * 60 ? ((utcTimeMinutes - edtoffset * 60) + 1440) : (utcTimeMinutes - edtoffset * 60);
                edt.value = edtTimeMinutes / 60;
                updateSliderSpan(edt);
                updateTimeDisplay(edt);
            });

        });
    });

    liveCestAll = document.querySelectorAll(".range-cest");
    liveCestAll.forEach((cest)=>{
        cest.addEventListener("input",function(){
            let cestTimeMinutes = cest.value * 60;
            let utcTimeMinutes = (cestTimeMinutes - 60)<60 ? ((cestTimeMinutes - 60)+1440) : (cestTimeMinutes - 60);
            sliderUtc.value = utcTimeMinutes / 60;
            updateSliderSpan(sliderUtc);
            updateTimeDisplay(sliderUtc);
            let istTimeMinutes = (utcTimeMinutes+330)%1440;
            sliderIst.value = istTimeMinutes / 60; 
            updateSliderSpan(sliderIst);
            updateTimeDisplay(sliderIst);
            const cestAll = document.querySelectorAll(".range-cest");
            const cvtAll = document.querySelectorAll(".range-cvt");
            const edtAll = document.querySelectorAll(".range-edt");
            const bstAll = document.querySelectorAll(".range-bst");

            bstAll.forEach((bst) => {
                let bstOffset = 1;
                let bstTimeMinutes = (utcTimeMinutes + bstOffset * 60) % 1440;
                bst.value = bstTimeMinutes / 60;
                updateSliderSpan(bst);
                updateTimeDisplay(bst);

            });
            cestAll.forEach((cest) => {
                let cestOffset = 2;
                let cestTimeMinutes = (utcTimeMinutes + cestOffset * 60) % 1440;
                cest.value = cestTimeMinutes / 60;
                updateSliderSpan(cest);
                updateTimeDisplay(cest);
            });

            cvtAll.forEach((cvt) => {
                let cvtoffset = 1 //minus;
                let cvtTimeMinutes = (utcTimeMinutes - cvtoffset * 60) < cvtoffset * 60 ? ((utcTimeMinutes - cvtoffset * 60) + 1440) : (utcTimeMinutes - cvtoffset * 60);
                cvt.value = cvtTimeMinutes / 60;
                updateSliderSpan(cvt);
                updateTimeDisplay(cvt);
            });


            edtAll.forEach((edt) => {
                let edtoffset = 5 //minus;
                let edtTimeMinutes = (utcTimeMinutes - edtoffset * 60) < edtoffset * 60 ? ((utcTimeMinutes - edtoffset * 60) + 1440) : (utcTimeMinutes - edtoffset * 60);
                edt.value = edtTimeMinutes / 60;
                updateSliderSpan(edt);
                updateTimeDisplay(edt);
            });

        })
    });

    liveCvtAll = document.querySelectorAll(".range-cvt");
    liveCvtAll.forEach((cvt)=>{
        cvt.addEventListener("input",function(){

        let cvtTimeMinutes = cvt.value * 60;
        let utcTimeMinutes = (cvtTimeMinutes + 60)%1440;
        console.log(utcTimeMinutes,cvtTimeMinutes);
        sliderUtc.value = utcTimeMinutes / 60;
        updateSliderSpan(sliderUtc);
        updateTimeDisplay(sliderUtc);
        let istTimeMinutes = (utcTimeMinutes+330)%1440;
        sliderIst.value = istTimeMinutes / 60; 
        updateSliderSpan(sliderIst);
        updateTimeDisplay(sliderIst);
        const cestAll = document.querySelectorAll(".range-cest");
        const cvtAll = document.querySelectorAll(".range-cvt");
        const edtAll = document.querySelectorAll(".range-edt");
        const bstAll = document.querySelectorAll(".range-bst");

        bstAll.forEach((bst) => {
            let bstOffset = 1;
            let bstTimeMinutes = (utcTimeMinutes + bstOffset * 60) % 1440;
            bst.value = bstTimeMinutes / 60;
            updateSliderSpan(bst);
            updateTimeDisplay(bst);

        });
        cestAll.forEach((cest) => {
            let cestOffset = 2;
            let cestTimeMinutes = (utcTimeMinutes + cestOffset * 60) % 1440;
            cest.value = cestTimeMinutes / 60;
            updateSliderSpan(cest);
            updateTimeDisplay(cest);
        });

        cvtAll.forEach((cvt) => {
            let cvtoffset = 1 //minus;
            let cvtTimeMinutes = (utcTimeMinutes - cvtoffset * 60) < cvtoffset * 60 ? ((utcTimeMinutes - cvtoffset * 60) + 1440) : (utcTimeMinutes - cvtoffset * 60);
            cvt.value = cvtTimeMinutes / 60;
            updateSliderSpan(cvt);
            updateTimeDisplay(cvt);
        });


        edtAll.forEach((edt) => {
            let edtoffset = 5 //minus;
            let edtTimeMinutes = (utcTimeMinutes - edtoffset * 60) < edtoffset * 60 ? ((utcTimeMinutes - edtoffset * 60) + 1440) : (utcTimeMinutes - edtoffset * 60);
            edt.value = edtTimeMinutes / 60;
            updateSliderSpan(edt);
            updateTimeDisplay(edt);
        });
        });
    });
    
    liveEdtAll = document.querySelectorAll(".range-edt");
    liveEdtAll.forEach((edt)=>{
        edt.addEventListener("input",function(){
            let edtTimeMinutes = edt.value * 60;
        let utcTimeMinutes = (edtTimeMinutes + 5*60)%1440;
        sliderUtc.value = utcTimeMinutes / 60;
        updateSliderSpan(sliderUtc);
        updateTimeDisplay(sliderUtc);
        let istTimeMinutes = (utcTimeMinutes+330)%1440;
        sliderIst.value = istTimeMinutes / 60; 
        updateSliderSpan(sliderIst);
        updateTimeDisplay(sliderIst);
        const cestAll = document.querySelectorAll(".range-cest");
        const cvtAll = document.querySelectorAll(".range-cvt");
        const edtAll = document.querySelectorAll(".range-edt");
        const bstAll = document.querySelectorAll(".range-bst");

        bstAll.forEach((bst) => {
            let bstOffset = 1;
            let bstTimeMinutes = (utcTimeMinutes + bstOffset * 60) % 1440;
            bst.value = bstTimeMinutes / 60;
            updateSliderSpan(bst);
            updateTimeDisplay(bst);

        });
        cestAll.forEach((cest) => {
            let cestOffset = 2;
            let cestTimeMinutes = (utcTimeMinutes + cestOffset * 60) % 1440;
            cest.value = cestTimeMinutes / 60;
            updateSliderSpan(cest);
            updateTimeDisplay(cest);
        });

        cvtAll.forEach((cvt) => {
            let cvtoffset = 1 //minus;
            let cvtTimeMinutes = (utcTimeMinutes - cvtoffset * 60) < cvtoffset * 60 ? ((utcTimeMinutes - cvtoffset * 60) + 1440) : (utcTimeMinutes - cvtoffset * 60);
            cvt.value = cvtTimeMinutes / 60;
            updateSliderSpan(cvt);
            updateTimeDisplay(cvt);
        });


        edtAll.forEach((edt) => {
            let edtoffset = 5 //minus;
            let edtTimeMinutes = (utcTimeMinutes - edtoffset * 60) < edtoffset * 60 ? ((utcTimeMinutes - edtoffset * 60) + 1440) : (utcTimeMinutes - edtoffset * 60);
            edt.value = edtTimeMinutes / 60;
            updateSliderSpan(edt);
            updateTimeDisplay(edt);
        });
        });
    });
});


const dragArea = ul.querySelector("ul");

new Sortable(dragArea,{
    handle: '.handle',
    animation:350
})


function swap(){
    console.log("Hello");
    const ul = document.querySelector(".drag");
    let list = ul.getElementsByTagName("li");
    for(let i = list.length-1;i>=0;i--){
        ul.appendChild(list[i]);
    }
}

function dark(){

    const t = document.querySelector(".darkBtn");
    console.log(t);
    if(t.value=="ON"){
        t.value="OFF";
        document.body.classList.remove('dark');
    }
    else if(t.value=="OFF"){
        t.value="ON";
        document.body.classList.add('dark');
    }
}