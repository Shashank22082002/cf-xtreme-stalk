console.log("Starting")

// document.getElementById("bid").addEventListener('click', (e)=>{

//     e.preventDefault()
//     // method 1
//     console.log('userName = ', document.getElementById("userid").value, ' PASSWORD = ', document.getElementById("pwd").value)

//     // method 2
//     console.log(document.getElementsByTagName("input")[1].value)
// })

// http://jsfiddle.net/db8Lp/105/
// http://jsfiddle.net/db8Lp/110/
// https://stackoverflow.com/questions/19206919/how-to-create-checkbox-inside-dropdown


// jquery to have multiple select functionality in select list
$("select").mousedown(function(e){
    e.preventDefault();
	var select = this;
    var scroll = select.scrollTop;
    
    e.target.selected = !e.target.selected;
    
    setTimeout(function(){select.scrollTop = scroll;}, 0);
    
    $(select).focus();
}).mousemove(function(e){e.preventDefault()});

const createLink = (id, number) => {
    link = 'https://codeforces.com/problemset/problem/'+id+'/'+number+'';
    return link;
}

// tags that I am selecting
$(document).ready(function () {
    $("#bid").click(function () {
        const opts = $(
          "#tags option:selected"
        ).map(function () {
            return this.value;
        }).get().join(",");
        const userhand = document.getElementById("userid").value
        const frhand = document.getElementById("friendid").value
        const divError = document.getElementById("error")
        const divTable = document.getElementById("dvTableFS")
        const divTable2 = document.getElementById("dvTableFNS")
        const url = '/search?user=' + userhand + '&friend=' + frhand + '&tags=' + encodeURIComponent(JSON.stringify(opts)) + ''
        fetch(url).then((response) => {
            response.json().then((data) => {
                // console.log(JSON.stringify(data.solved))
                // messageOne.textContent = JSON.stringify(arr)
                var results = new Array()
                results.push(["Problem Name", "Rating", "Tags", "Link"])
                data.solved.forEach(rec => {
                    var url = createLink(rec.contestId, rec.index)
                    results.push([rec.name, rec.rating, rec.tags, url])
                });

                divTable.style.display = "block"
                divTable2.style.display = "block"
                divError.style.display = "none"
                var table = document.createElement("TABLE")

                var columnCount = results[0].length;

                //Add the header row.
                var row = table.insertRow(-1);
                for (var i = 0; i < columnCount; i++) {
                    var headerCell = document.createElement("TH");
                    headerCell.innerHTML = results[0][i];
                    row.appendChild(headerCell);
                }

                //Add the data rows.
                for (var i = 1; i < results.length; i++) {
                    row = table.insertRow(-1);
                    for (var j = 0; j < columnCount-1; j++) {
                        var cell = row.insertCell(-1);
                        cell.innerHTML = results[i][j];
                    }
                    var cell = row.insertCell(-1);
                    var a = document.createElement('a');
                    a.href = results[i][columnCount - 1];
                    a.innerHTML = "link";
                    cell.appendChild(a)
                }

                divTable.innerHTML = "";

                var head1 = document.createElement("H2")
                head1.innerHTML = "Solved: "

                divTable.appendChild(head1)
                divTable.appendChild(table);


                // unsolved table...
                var table2 = document.createElement("TABLE")
                var results2 = new Array()
                results2.push(["Problem Name", "Rating", "Tags", "Link"])

                data.unsolved.forEach(rec => {
                    var url = createLink(rec.contestId, rec.index)
                    results2.push([rec.name, rec.rating, rec.tags, url])
                });

                var columnCount2 = results2[0].length;


                //Add the header row.
                var row2 = table2.insertRow(-1);
                for (var i = 0; i < columnCount2; i++) {
                    var headerCell2 = document.createElement("TH");
                    headerCell2.innerHTML = results2[0][i];
                    row2.appendChild(headerCell2);
                }

                //Add the data rows.
                for (var i = 1; i < results2.length; i++) {
                    row2 = table2.insertRow(-1);
                    for (var j = 0; j < columnCount2-1; j++) {
                        var cell2 = row2.insertCell(-1);
                        cell2.innerHTML = results2[i][j];
                    }
                    var cell2 = row2.insertCell(-1);
                    var a = document.createElement('a');
                    a.href = results2[i][columnCount2 - 1];
                    a.innerHTML = "link";
                    cell2.appendChild(a)
                }

                divTable2.innerHTML = "";
                var head2 = document.createElement("H2")
                head2.innerHTML = "Not Solved(but Attempted): "

                divTable2.appendChild(head2)
                divTable2.appendChild(table2);

            })
        })
        // alert("Selected options are: " + opts);
    });
});