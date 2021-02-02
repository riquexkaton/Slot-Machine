//id de las imagenes
const slot = [
    { id: 1, img: "./img/cereza.png" },
    { id: 2, img: "./img/naranja.png" },
    { id: 3, img: "./img/numero7.png" }
];

//contador de clicks
var contadorClick = 0;
var losPuntos=parseInt(document.querySelector(".coins").textContent);
//audios de la maquina
function Sound() {
    const audio = document.querySelector(".audio");
    const audio2 = document.querySelector(".audio2");

    audio.play();
    audio2.play();
};

//estado del button apretado()
function animacionInicial() {
    gsap.from(".slot img", {
        y: "-100%"
    });
}
//sonido continuo
function soundLoop() {
    const audio = document.querySelector(".audio");

    if (audio.hasAttribute("loop") == false) {
        audio.setAttribute("loop", "");
    }
    else {
        audio.removeAttribute("loop");
        audio.pause();
        audio.currentTime = 0;
    }
};

//generar un numeroAleatorio
function numeroAleatorio() {
    return parseInt(Math.random() * (4 - 1) + 1);
};


//animacion de la maquina
function machineAnimation() {
    let tl = gsap.timeline();
    tl.from(".slot img", {
        y: "-100%",
        duration: 0.22
    });
    tl.from(".slot img", {
        y: "120%",
        duration: 0.22,
        ease:"ease-in-out"
    });
};


//contador Click
function stop(timerID, results) {
    clearInterval(timerID);
    gsap.to(".slot img", {
        y: 0
    });
};

//aumentar y reducir puntuaje

function puntuaje(arr) {
    let results = [
        { jugada: "333", points: 300 },
        { jugada: "222", points: 200 },
        { jugada: "111", points: 10 },
        { jugada: "11", points: 10 },
        { jugada: "22", points: 20 },
        { jugada: "33", points: 30 }

    ];


    let coins = document.querySelector(".coins");

    for(let i=0; i<=arr.length-1; i++)
    {
        var arreglo=[];
        var check=false;
        arr.forEach(x=>{
            if(arr[i]==x)
            {
                arreglo.push(x);
            }
        });
        
        console.log("este es el arreglo que se formo"+" "+arreglo);
        for(let i=0; i<=results.length-1;i++)
        {
            let objeto=results[i];
            console.log(objeto);
            if(arreglo.join("")==objeto.jugada)
            {
                coins.textContent=parseInt(coins.textContent,10)+parseInt(objeto.points);
                check=true;
                gsap.from(".coins",{
                    scale:2.5,
                    backgroundColor:"yellow",
                    duration:0.14
                });
                const audio3=document.querySelector(".audio3");
                audio3.play();
                losPuntos=parseInt(coins.textContent,10)+parseInt(objeto.points);
                break;
            }
        }
        
        
        if(check==true)
        {
            break;
        }
        else if(check==false && i==arr.length-1)
        {
            coins.textContent=parseInt(coins.textContent,10)-100<=0?0:parseInt(coins.textContent,10)-100;
            gsap.from(".coins",{
                scale:2.5,
                backgroundColor:"red",
                duration:0.14
            });  
            const audio4=document.querySelector(".audio4");
            losPuntos=parseInt(coins.textContent,10)-100<=0?0:parseInt(coins.textContent,10)-100;
            audio4.play();
        
        }
    }
      

};

//boton para iniciar y detener la maquina
const button = document.querySelector(".button");

//evento click para el button de la maquina
animacionInicial();
button.addEventListener("click", async function hola() {
var timer;
    if(losPuntos!=0 && losPuntos>0)
    {
    let tl = gsap.timeline({ repeat: -1 });
    tl.from(".button", {
        backgroundColor: "yellow",
        duration: 0.30
    });
    contadorClick++;
    Sound();
    soundLoop();
    const Slost = document.querySelectorAll(".slot-img");
    var resultado = [];
     timer = await setInterval(() => {

        machineAnimation();
        Slost.forEach(item => {
            item.id = numeroAleatorio();
            item.src = slot[item.id - 1].img;
            resultado.push(item.id)
        });
        if (contadorClick % 2 == 0) {
            stop(timer, resultado);
            tl.from(".button", {
                backgroundColor: "white"
            }).kill();
        }
    }, 220);

    if (contadorClick % 2 == 0) {
        setTimeout(async () => {
            clearInterval(timer);
            await puntuaje(resultado);
        }, 220)
    };

}
else{
    losPuntos=0;
    document.querySelector(".coins").textContent=losPuntos;
    clearInterval(timer);
}
});

// seccion de ayuda

const buttonHelp= document.querySelector(".help-button");
const quitHelp= document.querySelector(".help-quit");

buttonHelp.addEventListener("click", ()=>{

    gsap.to(".help-container",{
        transform:"translateX(0)",
        ease:"elastic",
        duration:1
})

});

quitHelp.addEventListener("click", ()=>{
    gsap.to(".help-container",{
        x:"100%",
        ease:"elastic"
    })
});



//eventos para la seccion de recarga

const chargeButton= document.querySelector(".charge-button");
const quitCharge= document.querySelector(".quit-charge");

chargeButton.addEventListener("click", ()=>{

    gsap.to(".charge-container",{
        transform:"translateX(0)",
        ease:"elastic",
        duration:1
})

});

quitCharge.addEventListener("click", ()=>{
    gsap.to(".charge-container",{
        x:"100%",
        ease:"elastic"
    })
});

const chargeInputButton= document.querySelector(".charge-inputButton");

chargeInputButton.addEventListener("click", ()=>{
    const montoRecarga= document.querySelector(".charge-inputText input").value;

    if(montoRecarga.trim()<=10000 && montoRecarga>=100 && losPuntos==0)
    {
        document.querySelector(".coins").textContent=parseInt(montoRecarga,10);
        losPuntos=parseInt(montoRecarga,10);
        document.querySelector(".charge-inputText input").value="";
        alert("la recarga se ha realizado de forma satisfacotria");
        
    }
    else{
        alert("coloque un valor valodo en 100 o 10000. Ademas, para recargar su saldo debe ser igual a 0");
        document.querySelector(".charge-inputText input").value="";
    }
});



window.addEventListener("load", ()=>{
    const loader= document.querySelector(".loader");
    loader.classList.toggle("no-loader");
});
