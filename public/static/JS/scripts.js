/**
 * @description Adds a section to add another program to the booking form. 
 * @param {Event} event 
 */
function addProgram(event){
    try{
        let program_options = document.querySelector(".activities");
        let btn = document.querySelector(".cta");
        let newActivities = program_options.cloneNode(true);
        program_options.parentNode.insertBefore(newActivities,btn);
        calculateUpfrontCost();
        // form.insertBefore(newActivities, btn);
    }catch(error){
        console.error(error);
    }
    event.preventDefault()
}

/**
 * @description Calculates the total amount based on the cost of the program selected and the amount of persons in the program.
 */
function calculateUpfrontCost(){
    try{
        let total = 0;
        
        let programs = document.querySelectorAll(".activities");
        programs.forEach((program)=>{
            let selectEl = program.querySelector("select[name ='program']");
            let cost = selectEl.querySelector(":checked").getAttribute("data-cost");
            let guests = program.querySelector(".activityNum");
            total += parseInt(guests.value) * parseInt(cost);

        })

        let displayCost = document.querySelector("#total_amount");
        displayCost.innerText = `USD ${total}`;


    }catch(error){
        console.error(error)
    }
}