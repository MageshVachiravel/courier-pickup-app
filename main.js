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

        const existingUserArr = JSON.parse(existingUserDetails);
    
        existingUserArr.push(formValueObj)

        localStorage.setItem("userDetails",JSON.stringify(existingUserArr))

    }else{
        newUserDetails.push(formValueObj)

        localStorage.setItem("userDetails",JSON.stringify(newUserDetails))
    }

    alert("courier request submitted successfully");

    formEl.reset()

    

getAllCourierDatas()
})


function getAllCourierDatas(){
    // get the data from local storage
    const userData = localStorage.getItem("userDetails");
    const userDataArr = JSON.parse(userData);

    const userCount = document.querySelector("#courierCount")
   

    console.log(userDataArr)

   if(userDataArr){
     userCount.innerHTML = userDataArr.length;
     // write those data in ui
     const tableBody = document.querySelector("#courierDataTable")

     userDataArr.map((data,index)=>{
         const newTr = `
             <tr>
             <td class="px-2 py-1 border">${index+1}</td>
             <td class="px-2 py-1 border">${data.name}</td>
             <td class="px-2 py-1 border">${data.mobile}</td>
             <td class="px-2 py-1 border">${data['pickup-date']}</td>
             <td class="px-2 py-1 border">${data['pickup-area']}</td>
             <td class="px-2 py-1 border"><button class="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Delete</button></td>
             </tr>
     `
 
     tableBody.innerHTML += newTr;
     })
   }
    
}