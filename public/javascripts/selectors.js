async function initializeFileTables() {
    try {
        const response = await fetch('/files/get_all_files_names')
        const filesListFromServer = await response.json()

        let select = document.getElementById("files_names");

        for (let i = 0; i < filesListFromServer.length; i++) {
            const opt = filesListFromServer[i];
            const el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
    } catch (err) {
        console.log(err);
    }
}

async function selectedFileTables() {
    try {
        const fileName = document.getElementById("files_names").value;
        const response = await fetch(`/files/get_file_tables_by_name?file_name=${fileName}`)

        //Get parent and remove all child elements
        const selectParent = document.getElementById("file_tables");
        selectParent.innerHTML = '';

        clearTableInformation()

        //Extract tables list from response
        const { tables } = await response.json();

        if (tables && tables.length) {
            //Create and append select list
            const selectList = document.createElement("select");
            selectList.id = "selcet_table";
            selectList.onchange = showTableInformation;
            selectParent.appendChild(selectList);

            const option = document.createElement("option");
            option.value = "";
            option.text = "Choose a table";
            selectList.appendChild(option);
            //Create and append the options
            for (let i = 0; i < tables.length; i++) {
                const option = document.createElement("option");
                option.value = JSON.stringify(tables[i]);
                option.text = tables[i].title;
                selectList.appendChild(option);
            }
        } else {
            // Create a text node with the message
            const message = document.createTextNode("Please select a file.");

            // Append the message to the container
            selectParent.appendChild(message);
        }
    } catch (error) {
        console.log(error);
    }
}

function showTableInformation() {
    try {
        let tableInformation = document.getElementById("selcet_table").value;

        //No value provided
        if(!tableInformation) {
            clearTableInformation()
            return
        }

        tableInformation = JSON.parse(tableInformation)

        const tableInformationData = Object.entries(tableInformation)

        clearTableInformation()

        const tableInfoContainer = document.getElementById("table_info");

        const listLength = tableInformationData.length;

        if (listLength > 0) {

            // Create the Unordered list if there are elements present in the array  
            const ulElement = document.createElement("ul");

            // iterate through the array 
            tableInformationData.forEach(([key, value]) => {
                // create list item for every element 
                const listItem = document.createElement("li");

                const keyCapitalized = key.charAt(0).toUpperCase() + key.slice(1)
                
                // create a text node to store value
                const listValue = document.createTextNode(`${keyCapitalized} - ${value}`);

                // append the value in the list item
                listItem.appendChild(listValue);

                // append the list item in the list
                ulElement.appendChild(listItem);
            })

            // append the list in the container
            tableInfoContainer.appendChild(ulElement);

        } else {

            // Create a text node with the message
            const message = document.createTextNode("Table have no data.");

            // Append the message to the container
            tableInfoContainer.appendChild(message);
        }


    } catch (error) {
        console.log(error);
    }
}

function clearTableInformation(){
    const tableInfoContainer = document.getElementById("table_info");
    tableInfoContainer.innerHTML = '';
}