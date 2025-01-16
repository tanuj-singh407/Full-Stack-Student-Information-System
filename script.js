let student_form = document.querySelector(".student-form");
let First_name = document.querySelector("#first-name");
let Second_name = document.querySelector("#second-name");
let Roll_no = document.querySelector(".Roll-no");
let mobile_no = document.querySelector(".mobile-no");
let classes = document.querySelector(".classes");
let submit_button = document.querySelector(".submit-button");
let save_button = document.querySelector(".save-button");


let first = "";
let second = "";
let roll = "";
let mobile = "";
let Class = "";

let student_data = {};

let arr_of_students = [];

const base_url ="http://192.168.43.254:20201/"

function mysqlinsertion() {

    const postrequest = {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(student_data)
    };

    fetch(`${base_url}`, postrequest)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Data: ", data);
            gettingsqldata();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        })
}

function gettingsqldata() {

   fetch(`${base_url}`)
        .then(response => {
            if (!response.ok) { return ("error, plz check") }
            else { return response.json() }
        })
        .then(data => {
            tableinsertion(data);
            return {data};
        })
        .catch(error => {
            console.log("here comes the error:", error);
        })
}


function tableinsertion(data) {

    let l_student = data;
    for (let i = 0; i < l_student.length; i++) {
        let new_tr = document.createElement("tr");
        new_tr.setAttribute("id", i);

        new_tr.innerHTML = `<td>${l_student[i].userid}</td>
            <td>${l_student[i].Sfirstname}</td>
                            <td>${l_student[i].Ssecondname}</td>
                            <td>${l_student[i].Srollno}</td>
                            <td>${l_student[i].Smobile}</td>
                            <td>${l_student[i].Sclass}</td>
                            <td>
                            <button class="edit-button"
                                onclick='edit("${l_student[i].Sfirstname}",                                
                                "${l_student[i].Ssecondname}",
                                "${l_student[i].Srollno}",
                                "${l_student[i].Smobile}",
                                "${l_student[i].Sclass}", 
                                "${l_student[i].userid}")'>
                                Edit</button>
                            <button class="delete-button" onclick="deletion(event,${l_student[i].userid})">Delete</button>
                            </td>`

        document.getElementsByClassName("table-class")[0].appendChild(new_tr);
    }
    l_student = [];

    First_name.value = "";
    Second_name.value = "";
    Roll_no.value = "";
    mobile_no.value = "";
    classes.value = "";
}

function table_data_remover(){
    let tr_array = [...document.getElementsByTagName("tr")];
    for (let i = 1; i <= tr_array.length - 1; i++) {
        tr_array[i].parentNode.removeChild(tr_array[i])
    }
}

function submitted(e) {
    e.preventDefault();

    table_data_remover();

    first = First_name.value;
    second = Second_name.value;
    roll = Roll_no.value;
    mobile = mobile_no.value;
    Class = classes.value;

    student_data = {
        Sfirstname: first,
        Ssecondname: second,
        Srollno: roll,
        Smobile: mobile,
        Sclass: Class
    };
    arr_of_students.push(student_data);

    mysqlinsertion();

}

student_form.addEventListener("submit", submitted);

function automatic_data_insertion(){
    table_data_remover();

    fetch(`${base_url}`)
    .then(response => {
        if (!response.ok) { return ("error, plz check") }
        else { return response.json() }
    })
    .then(data => {
        tableinsertion(data);
    })
    .catch(error => {
        console.log("here comes the error:", error);
    })

}


automatic_data_insertion();


function deletion(e, sn) {
    // console.log(sn);
    table_data_remover();

    fetch(`${base_url}` + sn, {
        method: "DELETE",
    })
    .then(resp => {
        if(!resp.ok){ return console.log("deletion error:")}      
        else {return resp.json();}
    })
    .then(result => {
        automatic_data_insertion();
        console.log("deletion result:", result)
    })
}

let saveButtonClickHandler; 

function saving(i) {
    console.log("dsbhdw",i)

    first = First_name.value;
    second = Second_name.value;
    roll = Roll_no.value;
    mobile = mobile_no.value;
    Class = classes.value;

    let student_data_2 = {
        Sfirstname: first,
        Ssecondname: second,
        Srollno: roll,
        Smobile: mobile,
        Sclass: Class
    };


const putmethod = {
    method: "PUT",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(student_data_2)
}

fetch(`${base_url}${i}`, putmethod)
.then(response => {
    if(!response.ok) {return console.log("putting error:")}
    else {return response.json();}
})
.then(data => {
    console.log("put data:", data);
})
.catch(error => {
    console.log("put-catched error:", error);
})

    submit_button.style.display = "block";
    save_button.style.display = "none";

    First_name.value = "";
    Second_name.value = "";
    Roll_no.value = "";
    mobile_no.value = "";
    classes.value = "";

    setTimeout("automatic_data_insertion()", 8);

    save_button.removeEventListener("click", saveButtonClickHandler);
}


function edit(fname, sname, r, m, cl, inx) {
    fetch(`${base_url}`)
    .then(response => {
        if (!response.ok) { return ("error, plz check") }
        else { return response.json() }
    })
    .then(data => {
        input_insertion(data);
        return {data};
    })
    .catch(error => {
        console.log("here comes the error:", error);
    })

function input_insertion(data){
    let filtered_data =  data.filter((d) => {
        if(d.userid == inx){ return d}
    })

 fname = filtered_data[0].Sfirstname;
    sname = filtered_data[0].Ssecondname;
    r = filtered_data[0].Srollno;
    m = filtered_data[0].Smobile;
    cl = filtered_data[0].Sclass;

    First_name.value = fname;
    Second_name.value = sname;
    Roll_no.value = r;
    mobile_no.value = m;
    classes.value = cl;

    
    submit_button.style.display = "none";
    save_button.style.display = "block";

}
 
saveButtonClickHandler = (e) => { saving(inx); };
save_button.addEventListener("click", saveButtonClickHandler);
}