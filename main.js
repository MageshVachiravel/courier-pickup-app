const formEl = document.querySelector("#courier-request-form")

import JustValidate from 'just-validate';

const form = new JustValidate(formEl,{
    validateBeforeSubmitting: true,
});

form.addField("#name",[
    {
        rule: "required"
    },
    {
        rule:'minLength',
        value:3
    },
    {
        rule:'maxLength',
        value:20
    }
])

form.addField("#mobile-no",[
    {
        rule: "required"
    },
    {
        rule:'minLength',
        value:10
    },
    {
        rule:'maxLength',
        value:10
    }
])

form.addField("#pickup-date",[
    {
        rule: "required"
    }
])

form.addField("#pickup-area",[
    {
        rule: "required"
    }
])


form.onSuccess((e) => {

    const formData = new FormData(formEl);

    const formValueObj = Object.fromEntries(formData.entries())

    const newUserDetails = [];
    // get existing details from localStorage
    const existingUserDetails = localStorage.getItem("userDetails");

    if(existingUserDetails){
        // parse the value into obj/arr
        const existingUserObj = JSON.parse(existingUserDetails);
    
        // push the value to created obj
        existingUserObj.push(formValueObj)

        localStorage.setItem("userDetails",JSON.stringify(existingUserObj))
    }else{
        newUserDetails.push(formValueObj)

        localStorage.setItem("userDetails",JSON.stringify(newUserDetails))
    }

    alert("courier request submitted successfully");

    formEl.reset()
})