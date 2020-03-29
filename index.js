let  divs = [];
let algorithm; let array; let number;
function submitData() {
    // let size = document.getElementById("size").value;
    let data = document.getElementById("data").value;
    algorithm = document.getElementById("algorithm").value;

    array = data.split(",");
    array.sort(function(a,b) {
        return a-b;
    });
    // console.log(array)
    divs = generateElements(array);
    // console.log(divs)
}

function run() {
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
            console.log("selection");
            break;
        case 'bubble':
            console.log("bubble");
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

function delay() {  
    return new Promise(done => {
      setTimeout(() => {
        done();
      }, 1000);
    });
  }