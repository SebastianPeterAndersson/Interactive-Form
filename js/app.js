// ---------------------------------------------------|
// ---------------------------------------------------|
// ------------- | Interactive form | ----------------|
// ---------------------------------------------------|
// ---------------------------------------------------|

    // ---------------------------------------------------|
    // ------------------- | Functions | -----------------|
    // ---------------------------------------------------|

// Focusing the first input on entering page
function focusFirstInput() {
    $("input:first").focus();
    console.log("Focusing on the first input");
}

function creditCardPlaceholder() {
    $("#cc-num").attr("placeholder", "xxxxxxxxxxxxxxxx");
}

// If the 'other' option is selected, add input for
// the user to specify his or her own job role
function manageJobRole() {
    // Input to add when 'other' option is selected.
    var input = $("<input id='other-title' type='text' placeholder='Your Title'></input>");
    $("#title").change(function() {
        console.log("changed");
        //1. If the user chooses the 'other' option:
        if ($("#title").val() === "other") {
            //2. textfield is added:
            $('fieldset:first-of-type').append(input);
            //3. Adding text to allow the user to choose between entering an occupationxwx§
            input.val("Doesn't matter! But thanks for asking.").select();
            //4. And the text-field is focused on immediately:
            $("#other-title").focus();
        }
        if ($("#title").val() !== 'other') {
            input.remove();
        }
    });
}

// Function managing the t-shirt selection:
function manageTshirt() {
    //Initially hiding the color div:
    $("#colors-js-puns").toggle();

    // The Arrays for the two different styles:
    var jsPuns = jQuery.makeArray($("#color").children().slice(0, 3));
    var iLove = jQuery.makeArray($("#color").children().slice(3, 6));
    // Assign the first option (the 'select theme' option) to a variable and
    // 1. Remove it once It's no longer needed.
    var firstOption = $("#design option:first");
    // The design select clicked:
    $("#design").change(function() {
        // showing the colors:
        $("#colors-js-puns").show();
        // 2:
        firstOption.remove();
        // Remove any lingering children:
        $("#color").children().remove();
        // JS puns option selected:
        if ($("#design").val() === 'js puns') {
            // Appending the proper list:
            for (var i = 0; i < jsPuns.length; i++) {
                $("#color").append(jsPuns[i]);
            }
            // Heart js option selected:
        } else if ($("#design").val() === 'heart js') {
            // Appending the proper list:
            for (var i = 0; i < iLove.length; i++) {
                $("#color").append(iLove[i]);
            }
        }
    });
}

function preventDoubleBook() {
    // Create an array with the checkboxes to make the traversal easier:
    var activities = $(".activities").children().children().filter("input");
    var activitiesArr = $.makeArray(activities);

    // Add classes to make it easier to manipulate the checkboxes:
    $(activitiesArr).eq(1).addClass("tue-9-12");
    $(activitiesArr).eq(3).addClass("tue-9-12");
    $(activitiesArr).eq(2).addClass("tue-1-4");
    $(activitiesArr).eq(4).addClass("tue-1-4");

    // When Tuesday 9-12 days interferes with one another, add classes and disable checkbox;
    $(".tue-9-12").click(function() {
        // If the checkbox has the class of dis-checked:
        if (!$(this).hasClass("dis-checked")) {
            // Disable the other checkbox by disabling checkbox and adding gray color to make it look more disabled:
            $(".tue-9-12").not(this).attr("disabled", true);
            $(".tue-9-12").not(this).parent().toggleClass("checkColor");
            // Add class to let the program know it has been clicked before and therefore should not be changed next time:
            $(this).toggleClass("dis-checked");

        } else {
            $(".tue-9-12").not(this).removeAttr("disabled");
            $(this).toggleClass("dis-checked");
            $(this).toggleClass("checkColor");
            $(".tue-9-12").not(this).parent().toggleClass("checkColor");
        }
    });

    // When Tuesday 1-4 interferes with one another, add classes and disable checkbox
    $(".tue-1-4").click(function() {
        // If the checkbox does not have the class of dis-checked:
        if (!$(this).hasClass("dis-checked")) {
            $(".tue-1-4").not(this).attr("disabled", true);
            $(".tue-1-4").not(this).parent().toggleClass("checkColor");
            // Add class to let the program know it has been clicked before and therefore should not be changed next time:
            $(this).toggleClass("dis-checked");
            // If the checkbox is active and has been clicked before:
        } else {
            // Make the other option available again:
            $(".tue-1-4").not(this).removeAttr("disabled");
            $(this).toggleClass("dis-checked");
            $(this).toggleClass("checkColor");
            $(".tue-1-4").not(this).parent().toggleClass("checkColor");
        }
    });
}

// Function to dynamically add the current cost of the conference:
function incrementPrice() {
    // Initially start at zero:
    var priceCounter = 0;
    //1. Constructing initial price counter:
    var currentPrice = $("<div>" + "$" + priceCounter + "</div>");
    // Appending it:
    $(".activities").append(currentPrice);

    $(".activities input").click(function() {
        // Get the price from the label HTML by slicing the part where the price is shown:
        var thisPrice = $(this).parent().text().slice(-3);
        var thisPriceInt = parseInt(thisPrice);
        //If the checkbox has previously been clicked, we don't want the
        // price to go up, we want it to go down:
        if ($(this).hasClass("checked")) {
            priceCounter -= thisPriceInt;
        } else {
            priceCounter += thisPriceInt;
        }
        // Update the current price depending on what was clicked:
        currentPrice.text("$" + priceCounter);
        $(this).toggleClass("checked");
    });
}

function managePayment() {
    // Get the credit card value from the payment option:
    $("#payment").val("credit card");
    // Assign a variable to the last fieldset on the document
    var paymentContainer = $("fieldset:last-of-type");
    // function that shows every payment option
    function showEverything() {
        $(paymentContainer).find("p").eq(1).show();
        $(paymentContainer).find("p").eq(0).show();
        $("#credit-card").show();
    }

    // function to hide bitcoin
    function hideBitcoin() {
        $(paymentContainer).find("p").eq(1).hide();
    }

    // function to hide paypal
    function hidePayPal() {
        $(paymentContainer).find("p").eq(0).hide();
    }
    // function to hide the credit card
    function hideCreditCard() {
        $("#credit-card").hide();
    }
    // Initially hide the bitcoin and paypal option:
    hidePayPal();
    hideBitcoin();

    // Remove the select method since it is no longer useful:
    $("#payment option[value='select_method']").remove();

    // When the payment option is changed:
    $("#payment").change(function() {
        // initially show everything:
        showEverything();
        //1. And if the payment option is paypal, hide the rest of the options:
        if ($("#payment").val() === 'paypal') {
            hideBitcoin();
            hideCreditCard();
            // 2.
        } else if ($("#payment").val() === 'bitcoin') {
            hideCreditCard();
            hidePayPal();
            // 3.
        } else if ($("#payment").val() === 'credit card') {
            hidePayPal();
            hideBitcoin();
        }
    });

}

// ---------------------------------------------------|
// ------------------- | VALIDATION | ----------------|
// ---------------------------------------------------|
    // ---------------------------------------------------|
    // -------------- | Callback Functions | -------------|
    // ---------------------------------------------------|
// The return false / return true is crucial for the outcome of the validation in each callback function.

// This is a callback function for the 'validateForm'-function.
function validateNameFields() {
    // 1. If the name textfield is empty:
    if ($("#name").val() === "") {
        console.log("One of the namefields are not filled in.");
        //2. scroll to the top:
        window.scrollTo(0, 0);
        //3. Prompt the user to write a name and focus on the textfield:
        $("#name").attr("placeholder", "Please write your name.").focus();
        //4. When the textfield is not focused anympore, remove the attribute from the textfield:
        $("#name").blur("on", function() {
            $(this).attr("placeholder", "");
        });
        return false;
    } else {
        return true;
    }
}

// This is a callback function for the 'validateForm'-function.
function validateEmail() {
    var email = $("#mail").val();
    // I must say that I am not that familiar with regular expressions.
    // This one i snipped of the internet:
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // 1. If the email string is false:
    if (re.test(email) === false) {
        console.log("Insert a correct email");
        // 1. Scroll to the top:
        window.scrollTo(0, 0);
        $("#mail").attr("placeholder", "Please insert a correct email.").focus();
        $("#mail").blur("on", function() {
            $(this).attr("placeholder", "");
        });
    }
    return re.test(email);
}

// This is a callback function for the 'validateForm'-function.
function validateActivities() {
    // Variable to determine how many checkboxes that have been checked:
    var checkboxesChecked = 0;
    $("input[type='checkbox']").each(function() {
        if ($(this).hasClass("checked")) {
            checkboxesChecked++;
        } else {}
    });
    // If no checkbox is checked:
    if (checkboxesChecked === 0) {
        // Jumps to the job role because of the offset on the 'job-role'-id.
        location.href = "#job-role";
        $("#locate-activities").text("Please choose atleast one activity.").css("color", "red");
        console.log("No checkboxes!");
        return false; //Something is wrong
        // FALSE CALL:

    } else {
        $("#locate-activities").text("Register for Activities").css("color", "#184f68");
        return true; //All good
    }
}

// This is a callback function for the 'validateForm'-function.
function validatePayment() {
    // If the user has not choosen the credit card option,
    // there is no use for the function to move on.
    if ($("#payment").val() !== "credit card") {
        return true;
    }

    if ($("#zip").val() === "" || $("#cvv").val() === "") {
        console.log("One of the payment fields are not filled in");
        $("#zip").attr("placeholder", "Enter zip").focus().val("");
        $("#zip").blur("on", function() {
            $(this).attr("placeholder", "");
        });
        return false;
    } else {
        return true;
    }
}

// This is a callback function for the 'validateForm'-function.
function validateCreditCard() {
    // If the payment option is not credit card,
    // there is no need for the function to continue.
    if ($("#payment").val() !== "credit card") {
        return true;
    }
    // Credit card number:
    var creditCard = $("#cc-num").val();
    var creditCardInt = parseInt(creditCard);
    // I must say that I am not that familiar with regular expressions.
    // This one i snipped of the internet:
    var re = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/;
    if (re.test(creditCardInt) === false) {
        $("#cc-num").attr("placeholder", "No dashes, no spaces.").focus().val("");
        $("#cc-num").blur("on", function() {
            $(this).attr("placeholder", "");
        });
        console.log("Credit card not syntactically correct");
    }
    return re.test(creditCardInt);
}

// The function that checks with every callback ------2------
function validateForm() {
    $("button").click(function(event) {
        if (validateNameFields() === true && validateEmail() === true && validateActivities() === true && validateCreditCard() === true && validatePayment() === true) {
            console.log("Validation Passed");
        } else {
            event.preventDefault();
            console.log("You shall not pass!");
        }
    });
}



// ---------------------------------------------------|
// ---------- | When document is ready: | ------------|
// ---------------------------------------------------|

$(document).ready(function() {
    focusFirstInput();
    manageJobRole();
    manageTshirt();
    preventDoubleBook();
    incrementPrice();
    managePayment();
    validateForm();
    creditCardPlaceholder();
});
