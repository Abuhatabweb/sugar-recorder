document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("sugarForm");
    let tableBody = document.querySelector("#recordsTable tbody");
    let storageKey = "bloodSugarRecords";


    function loadRecords() {
        let records = JSON.parse(localStorage.getItem(storageKey)) || [];
        records.forEach(addRecordToTable);
    }
    function addRecordToTable(record, index) {
        let row = document.createElement("tr");
        let color = "white"
        if(record.sugarLevel < 70){
            color = "#acace3"
        }else if(record.sugarLevel >= 70 && record.sugarLevel < 80){
            color= "#dbfde7"
        }
        else if(record.sugarLevel >= 80 && record.sugarLevel <140){
            color= "#6cf76c"
        }
        else if(record.sugarLevel >= 140 && record.sugarLevel < 230){
            color= "#f9f98e"
        }
        else if(record.sugarLevel >= 230 && record.sugarLevel < 300){
            color= "#f5b5b5"
        }
        else if(record.sugarLevel >300){
            color= "#ff5f5f"
        }
        row.innerHTML = `
            <td>${record.dateTime}</td>
            <td style="background-color:${color}">${record.sugarLevel} mg/dL</td>
            <td>${record.testType}</td>
            <td><button data-index="${index}" class="delete-btn">حذف</button></td>`
        ;

        tableBody.appendChild(row);
    }

    function saveRecord(record) {
        let records = JSON.parse(localStorage.getItem(storageKey)) || [];
        records.push(record);
        localStorage.setItem(storageKey, JSON.stringify(records));
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let sugarLevel = document.getElementById("sugarLevel").value;
        let testType = document.getElementById("testType").value;
        let dateTime = new Date().toLocaleString();

        let record = { sugarLevel, testType, dateTime };

        saveRecord(record);
        addRecordToTable(record, JSON.parse(localStorage.getItem(storageKey)).length - 1);

        form.reset();
    });

    tableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            let index = e.target.dataset.index;
            let records = JSON.parse(localStorage.getItem(storageKey)) || [];
            records.splice(index, 1);
            localStorage.setItem(storageKey, JSON.stringify(records));
            tableBody.innerHTML = "";
            loadRecords();
        }
    });

    loadRecords();
});
