let  divs = [];
let algorithm; let array; let number;

function dataType() {
    let dataType = document.getElementById("data-type").value;
    let dataElem = document.getElementById("data");
    let sizeElem = document.getElementById("size");
    switch(dataType) {
        case 'inputData':
            dataElem.removeAttribute("hidden");
            dataElem.setAttribute("required","true");

            sizeElem.setAttribute("hidden","true");
            sizeElem.removeAttribute("required");
            break;
        case 'generateData':
            sizeElem.removeAttribute("hidden");
            sizeElem.setAttribute("required","true");

            dataElem.setAttribute("hidden","true");
            dataElem.removeAttribute("required");
            break;
    }
}

function generateDataSet(size) {
    let elements = [];
    for (var i = 0; i < size; i++) {
        let num = Math.floor(Math.random() * 100) + 1;
        if(elements.indexOf(num) === -1) elements.push(num);
    }
    return elements;
}

function submitData(event) {
    event.preventDefault();
    let dataType = document.getElementById("data-type").value;
    switch(dataType) {
        case 'inputData':
            let data = document.getElementById("data").value;
            array = data.split(",");
            break;
        case 'generateData':
            let size = document.getElementById("size").value;
            array = generateDataSet(size);
            break;
    }

    algorithm = document.getElementById("algorithm").value;

    if(algorithm === "linear" || algorithm === "binary") {
        array.sort(function(a,b) {
            return a-b;
        });
        document.getElementById("number").classList.remove("hide");
    }
    else if(algorithm === "selection" || algorithm === "bubble") {
        document.getElementById("number").classList.add("hide");
    }
    // console.log(array)
    divs = generateElements(array);
    // console.log(divs)
}

function run(event) {
    event.preventDefault();
    if(algorithm === "linear") {
        for(let i=0;i<divs.length;i++) {
            divs.item(i).classList.remove("found");
        }
    }
    else if(algorithm === "binary") {
        for(let i=0;i<divs.length;i++) {
            divs.item(i).classList.remove("found");
            divs.item(i).classList.remove("i");
            divs.item(i).classList.remove("j");
            divs.item(i).classList.remove("m");
        }
    }
    number = document.getElementById("number").value;
    runAlgorithm(algorithm, array, number,divs);
}

async function runAlgorithm(algorithm, data, number, divs) {
    //run algorithm
    switch(algorithm) {
        case 'linear':
            for(let i=0;i<data.length;i++) {
                divs.item(i).classList.add("traverse");
                await delay();
                if(data[i]==number) {
                    divs.item(i).classList.remove("traverse");
                    await delay();
                    divs.item(i).classList.add("found");
                    return number;
                }
                divs.item(i).classList.remove("traverse");
            }
            return null;
            break;
        case 'binary':
            let lowIndex = 0;
            divs.item(lowIndex).classList.add("i");
            let highIndex = data.length - 1;
            divs.item(highIndex).classList.add("j");
            while(lowIndex <= highIndex) {
                let midIndex = Math.floor((lowIndex + highIndex)/2);
                divs.item(midIndex).classList.add("m");
                await delay();
                if(parseInt(data[midIndex]) == parseInt(number)) {
                    divs.item(midIndex).classList.remove("m");
                    divs.item(lowIndex).classList.remove("i");
                    divs.item(highIndex).classList.remove("j");
                    await delay();
                    divs.item(midIndex).classList.add("found");
                    return number;
                }
                else if(parseInt(data[midIndex]) < parseInt(number)) {
                    divs.item(lowIndex).classList.remove("i");
                    await delay();
                    lowIndex = midIndex + 1;
                    divs.item(lowIndex).classList.add("i");
                }
                else {
                    divs.item(highIndex).classList.remove("j");
                    await delay();
                    highIndex = midIndex - 1;
                    divs.item(highIndex).classList.add("j");
                }
                divs.item(midIndex).classList.remove("m");
            }
            return null;
            break;
        case 'selection':
            let length = data.length;
            for(let i=0;i<length;i++) {
                let min = i;
                for(let j = i+1; j < length; j++) {
                    if(parseInt(data[min]) > parseInt(data[j]) ) {
                        min = j;
                        await delay();
                        divs.item(min).innerHTML = divs.item(j).innerHTML;
                    }
                }
                if(min !== i) {
                    let tmp = data[i];
                    let innerHtmlTemp = divs.item(i).innerHTML;
                    data[i] = data[min];
                    await delay();
                    divs.item(i).innerHTML = divs.item(min).innerHTML;
                    data[min] = tmp;
                    await delay();
                    divs.item(min).innerHTML = innerHtmlTemp;
                }
            }
            break;
        case 'bubble':
            let len = data.length;
            let swapped;
            do {
                swapped = false;
                for (let i = 0; i < len; i++) {
                    if (parseInt(data[i]) > parseInt(data[i + 1])) {
                        let tmp = data[i];
                        let innerHtmlTemp = divs.item(i).innerHTML;
                        data[i] = data[i + 1];
                        await delay();
                        divs.item(i).innerHTML = divs.item(i+1).innerHTML;
                        data[i + 1] = tmp;
                        await delay();
                        divs.item(i+1).innerHTML = innerHtmlTemp;
                        swapped = true;
                    }
                }
            } while (swapped);
            break;
    }
}

function generateElements(array) {
    let showData = document.getElementById("show-data");
    if(showData.getElementsByClassName("box").length !== 0) {
        let childDivs = showData.getElementsByClassName("box");
        let a = childDivs.length;
        for(var k=0;k<a;k++) {
            showData.removeChild(childDivs.item(i));
        }
    }
        for(var i=0;i<array.length;i++) {
            let div = document.createElement("div")
            div.setAttribute("class", "box");
            div.innerHTML = array[i];
            showData.appendChild(div);
        }
        showData.style.display = "inline-flex";
        return showData.getElementsByTagName("div");
}

function resetVisualiser() {
    window.location.reload();
}

function delay() {  
    return new Promise(done => {
      setTimeout(() => {
        done();
      }, 1000);
    });
  }