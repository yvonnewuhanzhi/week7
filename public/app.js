//get the value of the input text
//(every click on the button)
window.addEventListener('load',()=>{
    document.getElementById('button-quote').addEventListener('click',()=>{
        let quotes = document.getElementById('quote').value;
        console.log(quotes);

 //POST1. make a fetch request of type POST so that we can send the information to the server
        //make an object
        let obj={'quote':quotes};

        //make the object into a string
        let jsonData = JSON.stringify(obj);

        //fetch to route quotes,send the string in the body
        fetch('/quotes',{
            //add specification
            //sending type
            method:'POST',

            //information about the data we are sending
            //sending json data
            headers:{
                'Content-type': "application/json"
            },
            //send this data in the body
            body:jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)})

       

    })
    document.getElementById('get-tracker').addEventListener('click',()=>{
        //get info on All the quotes we've had so far
        fetch('/getQuotes')
        .then(resp=>resp.json())
        .then(data => {
            //reset
            document.getElementById('quote-info').innerHTML=''
            console.log(data.data);
            for(let i=0;i<data.data.length;i++){
                let string = data.data[i].quote;
                let elt = document.createElement('p');
               
                elt.innerHTML=string;
                document.getElementById('quote-info').appendChild(elt);
            }
        })
    })
})