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
    for(let i=0;i<divs.length;i++) {
        divs.item(i).classList.remove("found");
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
            console.log("binary");
            let  lowIndex = 0;
            let highIndex = data.length - 1;
            while(lowIndex <= highIndex) {
                let midIndex = Math.floor((lowIndex + highIndex)/2);
                if(data[midIndex] === number) {
                    return number;
                }
                else if(data[midIndex] < number) {
                    lowIndex = midIndex + 1;
                }
                else {
                    highIndex = midIndex - 1;
                }
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