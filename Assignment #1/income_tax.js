/* Assignment #1
Andrew Stannix
Hayden Plishka */

const $ = selector => document.querySelector(selector);

const calcTax = () => {
    const income = parseFloat($("#income").value);
    const donations = parseFloat($("#donations").value);
    const old_age = parseInt($("#old_age").value);
    const taxes = parseFloat($("#taxes").value);
    let isValid = true;
    let deduct_donations = 0;
    deduct_donations = parseFloat(deduct_donations);
    let deduct_age = 0;
    deduct_age = parseFloat(deduct_age);
    tax_bracket1 = 0;
    tax_bracket2 = 0;
    tax_bracket3 = 0;
    tax_bracket4 = 0;

    if (isNaN(income) || income < 0) {
        alert("Income must be a positive number.")
    }
    else if (isNaN(donations) || donations < 0) {
        alert("Donations must be a positive number, enter 0 if none.")
    }
    else if (isNaN(old_age) || old_age <= 0) {
        alert("Age must be a positive number above zero.")
    } //donations capped at 75% of income, not calculating advantages
    else if (donations >= 0 && donations > (income * 0.75)) {
        let max_donation = income * 0.75;
        max_donation = parseFloat(max_donation);
        deduct_donations = max_donation;
    }
    else if (donations >= 0 && donations <= (income * 0.75)) {
        deduct_donations = donations;
    }

    // Old age deduction if over 65, using a flat $10k reduction
    if (old_age >= 65 && income <= 105709) {
        deduct_age = 10000;
        deduct_age = parseFloat(deduct_age);
    }
    else {
        deduct_age = 0;
        deduct_age = parseFloat(deduct_age);
    }

    // Using example tax brackets
    if ((income - deduct_donations - deduct_age) <= 10000) {
        tax_bracket1 = 0;
        tax_bracket1 = parseFloat(tax_bracket1.toFixed(2));
        let taxBracketTotal = tax_bracket1;
        const taxes = taxBracketTotal;
        $("#taxes").value = taxes.toFixed(2);
    }
    else if ((income - deduct_donations - deduct_age) > 10000 && (income - deduct_donations - deduct_age) <= 40000) {
        tax_bracket1 = 0;
        tax_bracket1 = parseFloat(tax_bracket1.toFixed(2));
        tax_bracket2 = (income - deduct_donations - deduct_age - 10000)*(10/100);
        tax_bracket2 = parseFloat(tax_bracket2.toFixed(2));
        let taxBracketTotal = tax_bracket1 + tax_bracket2;
        const taxes = taxBracketTotal;
        $("#taxes").value = taxes.toFixed(2);
    }
    else if ((income - deduct_donations - deduct_age) > 40000 && (income - deduct_donations - deduct_age) <= 100000) {
        tax_bracket1 = 0;
        tax_bracket1 = parseFloat(tax_bracket1.toFixed(2));
        tax_bracket2 = (40000-10000)*(10/100);
        tax_bracket2 = parseFloat(tax_bracket2.toFixed(2));
        tax_bracket3 = (income - deduct_donations - deduct_age - 40000)*(20/100);
        tax_bracket3 = parseFloat(tax_bracket3.toFixed(2));
        let taxBracketTotal = tax_bracket1 + tax_bracket2 + tax_bracket3;
        const taxes = taxBracketTotal;
        $("#taxes").value = taxes.toFixed(2);
    }
    else {
        tax_bracket1 = 0;
        tax_bracket1 = parseFloat(tax_bracket1.toFixed(2));
        tax_bracket2 = (40000-10000)*(10/100);
        tax_bracket2 = parseFloat(tax_bracket2.toFixed(2));
        tax_bracket3 = (100000-40000)*(20/100);
        tax_bracket3 = parseFloat(tax_bracket3.toFixed(2));
        tax_bracket4 = (income - deduct_donations - deduct_age - 100000)*(30/100);
        tax_bracket4 = parseFloat(tax_bracket4.toFixed(2));
        let taxBracketTotal = tax_bracket1 + tax_bracket2 + tax_bracket3 + tax_bracket4;
        const taxes = taxBracketTotal;
        $("#taxes").value = taxes.toFixed(2);
    }
}

const clearAll = () => {
    $("#income").value = "";
    $("#donations").value = "";
    $("#old_age").value = "";
    $("#taxes").value = "";
};

document.addEventListener("DOMContentLoaded", () => {
	$("#calculate").addEventListener("click", calcTax);
	$("#clear").addEventListener("click", clearAll);
});