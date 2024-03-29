import JustValidate from 'just-validate';
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';
const formEl = document.querySelector("#courier-request-form")


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

    formData.append("id",uuidv4());

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
    getAllCourierDatas();

    formEl.reset()

    
})


function getAllCourierDatas(){
    // get the data from local storage
    const userData = localStorage.getItem("userDetails");

    const userDataArr = JSON.parse(userData);

    const userCount = document.querySelector("#courierCount")
   
    const tableBody = document.querySelector("#courierDataTable")

    tableBody.innerHTML = '';
    console.log(userDataArr)

    const newFinalValue = []

   if(userDataArr && userDataArr.length > 0){
    let userLength = userDataArr.length;
     userCount.innerHTML = userLength;
     // write those data in ui

     document.querySelector("#courierCard").classList.remove("hidden")

     
     
     const newTr = userDataArr.map((data,index)=>{

        const tr = document.createElement("tr")
        const tdEl = document.createElement("td")
        const td2El = document.createElement("td")
        const td3El = document.createElement("td")
        const td4El = document.createElement("td")
        const td5El = document.createElement("td")
        const td6El = document.createElement("td")
        const deleteBtn = document.createElement("button")

        tdEl.classList.add("px-2","px-1","border")
        tdEl.innerText = index+1

        td2El.classList.add("px-2","px-1","border")
        td2El.innerText = data.name

        td3El.classList.add("px-2","px-1","border")
        td3El.innerText = data.mobile

        td4El.classList.add("px-2","px-1","border")
        td4El.innerText = dayjs(data['pickup-date']).format("DD, MM - YYYY, hh:mma")

        td5El.classList.add("px-2","px-1","border")
        td5El.innerText = data['pickup-area']

        deleteBtn.classList.add("bg-red-500","hover:bg-red-700","px-2","py-1","text-white","text-sm","rounded")
        deleteBtn.innerText = "Delete"  

        td6El.classList.add("px-2","py-1","border")
        td6El.append(deleteBtn)

        td6El.addEventListener("click",(e)=>{
           let deleteConfirm =  confirm(`Do you want to delete ${data.name} record?`)
            if(deleteConfirm){
                userLength = userLength - 1
                userCount.innerHTML = userLength;

                const existingUserDetails = localStorage.getItem("userDetails")
                const existingUserArr = JSON.parse(existingUserDetails)

                const otherRecords = existingUserArr.filter(record => record.id != data.id)

                localStorage.setItem("userDetails",JSON.stringify(otherRecords))


                getAllCourierDatas();
            }

        })


        tr.append(tdEl,td2El,td3El,td4El,td5El,td6El)

        console.log(tr)

        newFinalValue.push(tr)

     })
     newFinalValue.forEach((el) => tableBody.append(el))

   }
   else{
    document.querySelector("#courierCard").classList.add("hidden")
   }

}


getAllCourierDatas()




