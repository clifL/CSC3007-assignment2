var year_list = []
var categories = []
var total_number = {};



function fetchData() {
    fetch('https://data.gov.sg/api/action/datastore_search?resource_id=83c21090-bd19-4b54-ab6b-d999c251edcf', { method: 'GET' })
        .then(res => {
            if (res.ok) {
                console.log("Success")
                return res.json()
            }
            else {
                console.log("Not successful")
            }
        })
        .then(data => {
            records = data["result"]["records"]
            for (variable in records) {
                if (year_list.includes(records[variable]["year"]) == false) {
                    year_list.push(records[variable]["year"])
                }

                if (categories.includes(records[variable]["level_2"]) == false) {
                    categories.push(records[variable]["level_2"])
                }

                var unique_value = (records[variable]["level_2"] + records[variable]["year"]).replace(/ /g, '')
                total_number[unique_value] = records[variable]["value"]
            }
            // ['Murder', 'Serious Hurt', 'Rape', 'Outrage Of Modesty', 'Rioting', 'Robbery', 'Housebreaking', 'Theft Of Motor Vehicle', 'Snatch Theft', 'Cheating Related Offences']

            var dataset_2020 = []
            for (variable in categories) {
                key = (categories[variable] + "2020").replace(/ /g, '')
                dataset_2020.push(total_number[key])
            }

            let myChart = document.getElementById('myChart').getContext('2d')
            let massPopChart = new Chart(myChart, {
                type: 'bar',
                data: {
                    labels: categories,
                    datasets: [{
                        label: 'Hide/Unhide',
                        data: dataset_2020,
                        backgroundColor: [
                            'rgba(255,99,132,0.6)',
                            'rgba(255,199,132,0.6)',
                            'rgba(255,99,32,0.6)',
                            'rgba(100,99,132,0.6)',
                            'rgba(50,99,132,0.6)',
                            'rgba(5,49,132,0.6)',
                            'rgba(5,9,1,0.6)',
                            'rgba(25,9,32,0.6)',
                            'rgba(75,19,2,0.6)',
                            'rgba(25,99,132,0.6)',
                        ],
                        borderWidth: 1,
                        borderColor: '#777',
                        barPercentage: 0.5,
                        minBarLength: 20,

                    }]
                },
                
                options: {

                }
            });
            

        })
        .catch(error => console.log(error));
}




fetchData();

// <script>
// let myChart = document.getElementById('myChart').getContext('2d')
// let massPopChart = new Chart(myChart, {
//     type: 'bar',
//     data: {
//         labels: ['Town A','Town B','Town C','Town D'],
//         datasets: [{
//             label:'Population',
//             data: [1,2,3,4]
//         }]
//     },
//     options: {}

// });

// </script>