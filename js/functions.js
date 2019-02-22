'use-strict'


function calc(e) {
    var btn_value = '',
        btn_elements = document.querySelectorAll('.btn'),
        screen_papper = document.querySelector('.screen-paper')
        query_elment = document.querySelector('.query'),
        query_string = query_elment.innerText,
        query_string_last_char = query_string.charAt(query_string.length - 1),
        query_string_new = '',
        query_string_segment = '',
        response = document.querySelector('.response'),
        number = '',
        number_a = '',
        number_b = '',
        sum = 0,
        operator = '',
        char = '',
        replace = '';





    //Setting btn value
    if (e.type == 'click'){
        btn_value = e.target.innerText.trim()
    }

    //Adding .active class on .btn element
    if (e.type == 'keydown') {
        for (var i = 0; i < btn_elements.length; i++) {
            if (e.key == btn_elements[i].innerText.trim()) {
                btn_elements[i].classList.toggle('active')
            }
        }
    }

    if (e.type == 'keyup'){

        //Matching keyboards button with operators list and setting btn value
        for (var i = 0; i < operator_object.length; i ++){
            if (e.key == operator_object[i].math_op){
                btn_value = operator_object[i].name;
            }
        }
        //Setting number value to btn value
        if (e.key >= 0) {
            btn_value = e.key;
        }
        //Removing .active class from .btn ellement
        for (var i = 0; i < btn_elements.length; i++) {
            if (e.key == btn_elements[i].innerText.trim()) {
                btn_elements[i].classList.toggle('active')
            }
        }
    }

    //Starting new query line on screen
    if (query_string.length == 19){
        screen_papper.classList.add('grow-1');
        query_elment.innerHTML = query_string + ' ';
    }

    if (query_string.length == 39){
        screen_papper.classList.add('grow-2');
        query_elment.innerHTML = query_string + ' ';
    }

    //Setting total max lenght of query line
    if (query_string.length == 52){
        if (btn_value != '=' && btn_value != 'AC'){
            return;
        }
    }


    //Doesn't allow to print double zeros in beggining of query.
    if (btn_value == '0'){
        if (query_string.length == 0) {
            query_elment.innerHTML = '0.';
            comma_alowed = false;
            return;
        }
        if (operator_list.indexOf(query_string_last_char) != -1) {
            query_elment.innerHTML += '0.';
            comma_alowed = false;
            return;
        }
    }

    //Doesn't allow to print two math operators one after another
    if (operator_list.indexOf(btn_value) != -1 &&
     operator_list.indexOf(query_string_last_char) != -1) {
        return;
    }

    //Doesn't allow to print math operator as first digit
    if (query_string.length == 0 && operator_list.indexOf(btn_value) != -1) {
        return;
    }


    // //Rules for comma character
    if (btn_value == '.'){
        if (query_string.length == 0) {
            query_elment.innerHTML = '0';
        }
        if (operator_list.indexOf(query_string_last_char) != -1) {
            query_elment.innerHTML += '0.';
            comma_alowed = false;
        }
        if (comma_alowed) {
            comma_alowed = false;
        } else {
            return;
        }
    }

    //Dont allow to enter operator if last char of query string is comma ('.')
    if (query_string_last_char == '.' && operator_list.indexOf(btn_value) != -1){
        return;
    }

    //Clearing screen
    if (btn_value == 'AC') {
        number = '',
        sum = 0,
        operator = '',
        char = '';
        response.innerHTML = '';
        query_elment.innerHTML = '';
        screen_papper.classList.remove('grow-1', 'grow-2', 'grow-3')
        return;
    }

    //Prevent from adding more text when calculation is done.
    if (response.innerText.length > 0){
        return;
    }

    //Checking last character in querry string.
    //Is it an operator char?
    if (operator_list.indexOf(query_string_last_char) != -1) {
        operators_exist = true;
        comma_alowed = true;
    }

    //Printing button value in query string.
    query_elment.innerHTML += btn_value;

    ///////////////////////////////////////////////////////
    //
    //Priority operations for Division and Multiplication
    //
    ///////////////////////////////////////////////////////
    if (btn_value == '=') {
        query_string_new = query_string.replace(/\s/g, "");
        operators_exist = false;
        screen_papper.classList.add('grow-3')


        //Looping through all the characters of query string.
        for ( var i = 0; i < query_string.length; i++) {
            char = query_string[i];

            //  Checking if chararacter is number or comma symbol - making number sequence.
            if (parseInt(char) >= 0 || char == '.'){
                number += char;
            }

            // Checking if character is an operator listed in operators Array
            // Or is that character a last one in query string.
            if (operator_list.indexOf(char) != -1 || i == query_string.length - 1){

                //Checking if charachter is / or *
                if (char == '÷' || char == '×' ) {

                    //Checking if (/ or *) operator variable was set previously
                    //If yes, calling a operation function for calculations.
                    if (operator == '÷' ||  operator == '×') {
                        number_b = number;
                        replace = number_a + operator + number_b;
                        sum = operation(number_a, number_b, operator);

                        //Making a new query string with a result replaced in a calculated place.
                        query_string_new = query_string_new.replace(replace,sum);

                        //Resetting parameter variables
                        number_a = sum;
                        number_b = '';
                        number = '';

                        //Setting new operator
                        operator = char;
                        console.log(sum);
                        console.log(replace);
                        console.log(query_string_new);

                        //Setting operator and number_a parameters for a first time
                    } else {
                        operator = char;
                        number_a = number;
                        number = '';
                    }

                    // Cheking if character is other operator NOT ( / or *)
                } else {

                    // Checking if number_a parameter was allready set before
                    //If yes calling a Operation Function for calculations
                    if (number_a.length != 0){
                        number_b = number;
                        replace = number_a + operator + number_b;
                        sum = operation(number_a, number_b, operator);

                        //Making a new query string with a result replaced in a calculated place.
                        query_string_new = query_string_new.replace(replace,sum);

                        //Resetting parameter variables
                        number_a = '';
                        number_b = '';
                        number = '';
                        operator = '';
                        console.log(sum);
                        console.log(replace);
                        console.log(query_string_new);

                        //If parameter number_a was not set resetting number variable
                    } else {
                        number = '';
                    }
                }
            }
        }
        //Checking if other operators exist in a finished new query string.
        for ( var i = 0; i < query_string_new.length; i++) {
            if (operator_list.indexOf(query_string_new[i]) != -1){
                operators_exist = true;
            }
        }

        //If no operators left in a new query string - printing result.
        if (!operators_exist) {
            response.innerHTML = query_string_new;
            return;
        }
    }
    ////////////////////////////////////////////////////////
    //
    //Second priority math operations.
    //
    ////////////////////////////////////////////////////////

    //Checking if new query string is not empty.
    if (query_string_new.length != 0) {

        //Looping through all the characters of query string.
        for ( var i = 0; i < query_string_new.length; i++) {
            char = query_string_new[i];

        //  Checking if chararacter is number or comma symbol - making number sequence.
            if (parseInt(char) >= 0 || char == '.'){
                number += char;
            }

            // Checking if character is an operator listed in operators Array
            if (operator_list.indexOf(char) != -1){

                //If operator not set - setting for a first time
                if (operator.length == 0) {
                    sum = number;
                    number = '';
                    operator = char;

                    //If operator was already set before - calling Operation Function.
                } else {
                    sum = operation(sum, number, operator);
                    operator = char;
                    number = '';
                }
            }

            //If that character was last one in query string - calling a Operation Function
            if (i == query_string_new.length - 1) {                
                sum = operation(sum, number, operator);
            }
        }
        //Finishing and printing result
        query_string_new = '';
        response.innerHTML = sum;
    }

    //setting font size if result is too big
    if (response.innerText.length > 12){
        response.style = 'font-size: 30px;'
    }


}
////////////////////////////////
// Function for math operations.
////////////////////////////////
function operation(a, b, opr){
    var sum = 0;
    switch(opr){
        case '÷':
            sum = parseFloat(a) / parseFloat(b);
            break;
        case '×':
            sum = parseFloat(a) * parseFloat(b);
            break;

        case '−':
            sum = parseFloat(a) - parseFloat(b);
            break;
        case '+':
            sum = parseFloat(a) + parseFloat(b);
            break;

    }

    return sum;
}
