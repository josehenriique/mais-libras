const image = document.querySelector(".video")
const btnDelete = document.querySelector(".delete")
const boxWord = document.querySelector(".words-container p")
const frameLetter = document.querySelector(".letter")
let letter = ""

async function startStream() {
    try{
        const response = await fetch('/video_feed')
        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')

        let buffer = "" // Acumulador para os dados recebidos

        while (true) {
            const {done, value} = await reader.read()
            
            // Para quando não houver mais dados para serem enviador/recebidos
            if (done) {
                console.log("Streaming Encerrado")
                break
            }

            // Decodificar so bytes recebidos em texto
            buffer += decoder.decode(value, {stream: true})
            let chunks = buffer.split("\n")
            buffer = chunks.pop()

            for (let chunk of chunks){
                try{
                    const data = JSON.parse(chunk)
                    let letter = data.letter.toUpperCase()

                    collectSignal(letter)

                    // Imagem decodificada
                    if (data.image) {
                        image.src = "data:image/jpeg;base64," + data.image
                    }

                } catch (error) {
                    console.log("Error em analisar o JSON: ", error)
                }
            }
        }


    } catch (error) {
        console.error("Error do Streaming: ", error)
    }
}

startStream()

// Formação de palavras

let currentSignal = null
let timer = null
let timerThreshold = 1000 //1 seg

function collectSignal(newSignal){
    
    frameLetter.textContent = newSignal

    if (frameLetter.textContent == ""){
        frameLetter.textContent = "-"
    }
    
    function processSignal(){
        if (newSignal === currentSignal){

            if (!timer){
                timer = setTimeout(() => {
                    addNewSignal(newSignal)
                    timer = null    
                }, timerThreshold)
            }

        } else {
            currentSignal = newSignal
            clearTimeout(timer)
            timer = null
        }   
    }

    processSignal()
}

function addNewSignal(content){
    boxWord.textContent += content
}

btnDelete.addEventListener("click", () => {
    boxWord.textContent = ""
})

// Eventos com o teclado

document.addEventListener("keydown", (e) => {
    
    
    if (e.ctrlKey && e.code === "KeyQ"){
        boxWord.textContent = ""
    }
    
    if (e.code === "Backspace"){
        content = boxWord.textContent
        boxWord.textContent = content.slice(0, -1)
    }
    
    if (e.code === "Space"){
        content = boxWord.textContent
        boxWord.textContent = content + " "
    } 
})