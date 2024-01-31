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

    for (let value of formData.values()){
        console.log(value)
    }
})