// Form submit event
    var form = document.getElementById('addForm');
    form.addEventListener('submit', addItem);

// Delete event
    var itemList = document.getElementsByClassName('btn-danger');

// Edit event
    var editList = document.getElementsByClassName('btn-success');

// Maintaining a count to be used as key for entries in the database
    var count = 0;

// Maintaining a serial variable to be used as a unique key in the table and database
    var serial = 0;
    

// Add item
    function addItem(e)
    {
        e.preventDefault();

        // Storing the input values from the user in variables
            var amount = document.getElementById('amount').value;
            var date = document.getElementById('date').value;
            var area = document.getElementById('area').value;
            var table = document.getElementById("items");

        // Creating new Table row
            var row = table.insertRow(++count);

        // Creating new Columns in the newly created row
            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);
            var cell5 = row.insertCell(5);

        // Appending the data to the table
            cell0.innerHTML = amount;
            cell1.innerHTML = date;
            cell2.innerHTML = area;

        // Adding 5th Column for maintaing serial number and setting its display property to none
            cell5.innerHTML = ++serial;
            cell5.style = "display: none";

        
    
        // Creating Edit button element
            var editBtn = document.createElement('button');
    
        // Adding class to Edit button
            editBtn.className = 'btn btn-success';

        // Onclick Function Call
            editBtn.onclick = function(){editItem(this);};
    
        // Appending text node
            editBtn.appendChild(document.createTextNode('Edit'));
    
        // Appending Edit button to the column
            cell3.appendChild(editBtn);


            
        // Creating Delete button element
            var deleteBtn = document.createElement('button');

        // Adding class to Delete button
            deleteBtn.className = 'btn btn-danger';

        // Onclick Function Call
            deleteBtn.onclick = function(){removeItem(this);};
    
        // Appending text node
            deleteBtn.appendChild(document.createTextNode('Delete'));
    
        // Appending Delete button to the column
            cell4.appendChild(deleteBtn);



        // Creating an Object and storing the data
            var myObj = {
                Amount: amount,
                Date: date,
                Area: area
            };

        // Converting the data to JSON
            var myObj_serialized = JSON.stringify(myObj);

        // Adding Data to the local storage
            localStorage.setItem(serial, myObj_serialized);
        
        // Resetting the form
            form.reset();
    }


  
// Remove item
    function removeItem(deleteItem)
    {
        // Variable to store Row Number
            var rowCount = (deleteItem.parentNode.parentNode.rowIndex);
            var sn = deleteItem.parentNode.nextSibling.innerHTML;
        // Deleting from the Selected Row
            document.getElementById('items').deleteRow(rowCount);
        // Deleting from the Local Storage
            localStorage.removeItem(sn);
        // Decrementing count so that, count = the number of rows 
            count--;
    }


// Edit item
    function editItem(editItem)
    {
        // Variable to store Row Number
            var rowCount = (editItem.parentNode.parentNode.rowIndex);
            var sn = editItem.parentNode.nextSibling.nextSibling.innerHTML;
        // Parsing the data from JSON
            var obj = JSON.parse(localStorage.getItem(sn));
        // Variable to store particular data from the object 
            var amount = obj.Amount;
            var date = obj.Date;
            var area = obj.Area;
        // Deleting from the Selected Row
            document.getElementById('items').deleteRow(rowCount);
        // Deleting from the Local Storage
            localStorage.removeItem(sn);
        // Decrementing count so that, count = the number of rows 
            count--;
        // Appending the values in the form
            document.getElementById('amount').value = amount;
            document.getElementById('date').value = date;
            document.getElementById('area').value = area;
    }
