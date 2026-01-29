"use strict";

const $ = selector => document.querySelector(selector);
 
//normal function expression, recieving 2 passed arguments
function calculate(income,deductions,credits){
    //resets the error message if there was one
    $("span").firstChild.textContent = "*";

    //are there any deductions? if not then sets the value to 0 to allow proper calculations
    if (deductions == ""){
        deductions = 0;
    }
    //parses the value that user inputs into a float, deducting any deductions

    //saves the income before any adjustments are done
    saveHist("Income",parseFloat(income).toFixed(2));
    income = parseFloat(income)-parseFloat(deductions);

    //initializes the amount of tax owing
    let total_tax = 0;

    //first tax bracket, anything below 10k does not get taxed
    //ex, if 11k is entered, it calculates 10% of only the 1k and adds it to the total owing
    if (income >= 10000){
        total_tax += (income-10000)*0.1;
    }
    //second tax bracket, calcualtes any income above 40k at 20%, because it includes the previous 10% from the first bracket
    if (income > 40000){
        total_tax += (income-40000)*0.1;
    }
    //third tax bracket, calcualtes any income above 100k at 30%, because it includes the previous 10% from the first two brackets
    if (income > 100000){
        total_tax += (income-100000)*0.1;
    }

    //are there any tax credits? if not then sets the value to 0 to allow proper calculations
    if (credits == ""){
        credits = 0;
    }
    //deduct tax credits from final owing amount
    total_tax-= credits;

    //updates the display total to fixed decimal points
    $("#total").value = total_tax.toFixed(2);


    //only adds a deductions line when there is deductions
    if (deductions !== 0){
        saveHist("Deductions",deductions);
    }
    if (credits !== 0){
        saveHist("Credits",credits);
    }
    saveHist("Owing Tax",total_tax.toFixed(2));

    //draws a linebreak for the save histroy stuff
    drawLine();

    //actually saves the html of the history section into local storage
    storeHist();
};
//draws a line in the history html, to seperate the entries
const drawLine = () =>{
    const hist = document.getElementById("history");
    const entry = document.createElement("br");
    hist.appendChild(entry);
}
//saves the inputed arguments onto the html page for display
const saveHist = (str,value) =>{
    //scopes to the history element
    const hist = document.getElementById("history");

    //creates a new article element, then sets the article text to the previous provided arguments
    const entry = document.createElement("article");
    const text = document.createTextNode(str + ": " + value );
    entry.appendChild(text);
    //applies the newly created and filled element to the history id element
    hist.appendChild(entry);
}
//saves the html data of the history element into local storage for later retrieval
const storeHist = () => {
    const calcHistory = document.getElementById("history").innerHTML;

    // Store Content
    localStorage.setItem("calcHistory", calcHistory);
}

//gets the inputs from income and deductions and spits out error message if required fields are not full, otherwise it continues
const processEntry = evt =>{
    let income = $("#income").value;
    let deductions = $("#deductions").value;
    let credits = $("#credits").value;
    
    //checks if input is only numbers
    const cleanInput = !(isNaN(income)) && !(isNaN(deductions)) && !(isNaN(credits));

    //if any inputs are Nan
    if (!cleanInput){
        $("span").firstChild.textContent = "* Please Enter numbers only";
        evt.preventDefault();
    }
    //if the income is left blank
    else if (income == ""){
        //creates red error message next to entry field
        $("span").firstChild.textContent = "* Please Enter an Income";
        evt.preventDefault();
    }
    //otherwise, continues with calculating
    else {
        calculate(income,deductions,credits);
    }
};

//function for delete calculated entry history when called
const deleteHistory = () => {
    //gets the history input area
    const hist = document.getElementById("history");
    //clears the html tag
    hist.innerHTML = "";
    //stores the html tag to local storage, effectivly deleteing it/clearing it
    storeHist();
}

//function arrow expression, no perameters
//clears the input fields and resets all to what they should be
const clearTxt = () => {
    $("#income").value = '';
    $("#deductions").value = '';
    $("#credits").value = '';
    $("#total").value = '';

    $("span").firstChild.textContent = "*";
    
    $("#income").focus();
};
//function that setsup all the buttons on the page
const btnSetup = () => {
    $("#calculate").addEventListener("click", processEntry);
    $("#clear").addEventListener("click", clearTxt);
    $("#deleteHist").addEventListener("click", deleteHistory);
};

//apply event listeners to buttons on startup
document.addEventListener("DOMContentLoaded", () =>{
    //loads the history from local storage
    document.getElementById("history").innerHTML = localStorage.getItem("calcHistory");
    //clears input on startup
    clearTxt();
    //setups all the buttons to make this eventlistener a little cleaner
    btnSetup();
});