/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    let displayOption = "";
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    } else if (person.length > 1){
        //runs if searchByTrait returns multiple results
        let output = "";
        for(let i=0;i<person.length;i++){
            output+= `${person[i].firstName} ${person[i].lastName}, `;
        }
        alert("Results " + output)
        return app(people);
    } else if(typeof person[0].firstName === 'undefined'){
        alert("Please check your search input");
        searchByTraits(people);
    }
    else{
        let displayOption = prompt(
            `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
        );
    }
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0], people);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        case undefined:
            app(people);
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()


/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person, people) {

//user facing version of display fumction//////////////////
    // let personInfo = `First Name: ${person.firstName}\n`;
    // personInfo += `Last Name: ${person.lastName}\n`;
    // personInfo += `Gender: ${person.gender}\n`;
    // personInfo += `Birth Date: ${person.dob}\n`;
    // personInfo += `Height: ${person.height} in\n`;
    // personInfo += `Weight: ${person.weight} lbs\n`;
    // personInfo += `Eye Color: ${person.eyeColor}\n`;
    // personInfo += `Occupation: ${person.occupation}\n`;
    // personInfo += `Parents: ${findParents(person, people)}\n`;
    // personInfo += `Spouse: ${findSpouse(person, people)}\n`;

// stringified version of display function///////////////
    

    let personInfo = JSON.stringify(person, null, " ");

    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function findParents(person, people){
    let parentsArray = [];
    if (!person.parents){
        return null; 
    }
    for (let key in person.parents){
        let parentId = person.parents[key];
        // let parentObject = people.filter(x => x===parentId);        //find x where x.id equals parent id
        let parentObject = people.filter(function(x){
            if (x.id === parentId){
                return true;
            }
        })
        parentsArray.push(parentObject);
    }
    return JSON.stringify(parentsArray, ["firstName", "lastName"], " ");   //stringify parent objects but only include name key and value
}

function findSpouse(person, people){
    let spouseId = person.currentSpouse;
    if (!person.currentSpouse){
        return null;
    }
    // let spouseObject = people.filter(x => x===spouseId);   
    let spouseObject = people.filter(function(x){
        if (x.id === spouseId){
            return true;
        }
    })
    return JSON.stringify(spouseObject, ["firstName", "lastName"], " ");
}

function findSiblings(person, people){
    let parentIds = person.parents;
    let siblingsArray = people.filter(function(x){
        if (x.parents === parentIds){
            return true;
        }
    }) 
    let namesString = "";
    for (let key in siblingsArray){
        let siblingObject = siblingsArray[key];
        namesString += JSON.stringify(siblingObject, ["firstName", "lastName"], " ");
    }
    return namesString;
}

function findPersonFamily(person, people){
    let familyString = "";
    //get parents
    familyString += `Parents: ${findParents(person, people)}\n`;
    //get siblings
    familyString += `Siblings: ${findSiblings(person, people)}\n `;
    //get spouse
    familyString += `Spouse: ${findSpouse(person, people)}\n `;
    return familyString;
}

function findPersonDescendants(person, people, array = []){
    //make subArray with persons children 
    let subArray = people.filter(function(x){
        if (x.parents.includes(person.id)){
            return true;
        }
    })
    array = [person]; 
    if (subArray.length === 0){
        return array; 
    }
    for (let i = 0; i < subArray.length; i++){
        array = array.concat(findPersonDescendants(subArray[i], people));
    }
    return JSON.stringify(array, ["firstName", "lastName"], " "); 
}

function searchByTraits(people){
    let inputString = prompt("You can search by last name, gender, occupation, height, weight, eye color, or birthdate\n Please format your search like \"0,male,0,0,0,0,0\" or \"Smith,0,doctor,0,0,blue,0");
    let searchInstructions = inputString.split(",");
    let searchResult = people;
    for (let i=0; i<7; i++){
        if (searchInstructions[i] != "0"){
            switch (i){
                case(0):
                    for(let x=0; x<searchResult.length; x++){
                        if (searchResult[x].lastName != searchInstructions[0]){
                            searchResult.splice(x, 1);
                            x--;
                        }
                    }
                    break;
                case(1):
                    for(let x=0; x<searchResult.length; x++){
                        if (searchResult[x].gender != searchInstructions[1]){
                            searchResult.splice(x, 1);
                            x--;
                        }
                    }
                    break;
                case(2):
                    for(let x=0; x<searchResult.length; x++){
                        if (searchResult[x].occupation != searchInstructions[2]){
                            searchResult.splice(x, 1);
                            x--;
                        }
                    }
                    break;
                case(3):
                    for(let x=0; x<searchResult.length; x++){
                        if (searchResult[x].height != searchInstructions[3]){
                            searchResult.splice(x, 1);
                            x--;
                        }
                    }
                    break;
                case(4):
                    for(let x=0; x<searchResult.length; x++){
                        if (searchResult[x].weight != searchInstructions[4]){
                            searchResult.splice(x, 1);
                            x--;
                        }
                    }
                    break;
                case(5):
                    for(let x=0; x<searchResult.length; x++){
                        if (searchResult[x].eyeColor != searchInstructions[5]){
                            searchResult.splice(x, 1);
                            x--;
                        }   
                    }
                    break;
                case(6):
                    for(let x=0; x<searchResult.length; x++){
                        if (searchResult[x].dob != searchInstructions[6]){
                            searchResult.splice(x, 1);
                            x--;
                        }
                    }
                    break;
            }
        }
    }
    if (searchResult.length === 0){
        return ["No results found"];
    }
    return searchResult;
}

app(data);