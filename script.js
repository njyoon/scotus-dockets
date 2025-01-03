window.onload = function() {

    const vol = document.getElementById('#vol');
    const page = document.getElementById('#page');
    
    const searchResults = document.getElementById('cases');

/*
    
    for (let element of cases) {

        if (element.docket.toString().includes("78-") || element.docket.toString().includes("79-") || element.docket.toString().includes("80-") || element.docket.toString().includes("81-") || element.docket.toString().includes("82-") || element.docket.toString().includes("83-") || element.docket.toString().includes("84-") || element.docket.toString().includes("85-") || element.docket.toString().includes("86-") || element.docket.toString().includes("87-") || element.docket.toString().includes("88-") || element.docket.toString().includes("89-") || element.docket.toString().includes("90-") || element.docket.toString().includes("91-") || element.docket.toString().includes("92-") || element.docket.toString().includes("93-") || element.docket.toString().includes("94-") || element.docket.toString().includes("95-")) {

            if (element.docket.slice(-1) != "-") {
                element.docket += "-";
            }


            for (let l of y1985.body.hits.hits) {
                for (let e of l._source.record.digitalObjects) {
                    if (e.extractedText.includes(element.docket)) {

                        if (element.images && !element.images.includes(e.objectUrl)) {
                            element.images.push(e.objectUrl)
                            console.log(element);
                        } else if (!element.images) {
                            element.images = [];
                            element.images.push(e.objectUrl)
                            console.log(element);
                        }


                        
                    }
                }
            }
        }
    }

    console.log(cases2);

    */
    

}

function searchByCite() {
    
    document.getElementById('cases').innerHTML = '';

    document.getElementById('case-search').value = '';

    var volume = document.getElementById('vol').value;
    var page = document.getElementById('page').value;

    if (volume.length == 0) {
        return;
    }
    
    let caseList = [];

    for (let element of cases) {
        
        if (volume.toString() == element.cite.split(" ")[0]) {

            var volNum = element.cite.split(" ")[0];
            var pageNum = element.cite.split(" ")[2];


            if ((page.length == 0) || (page.toString() == pageNum)) {

                var dkt = "<br>";

                if (element.images) {
                    dkt += 'Docket Sheet: '
                    for (let e of element.images) {
                    dkt += '<a href="'+ e + '" download target="_blank">['+ (element.images.indexOf(e)+1) + ']</a> ';
                    }
                } else {
                    dkt += '<i>Docket Sheet Unavailable</i>';
                }
            
                while (volNum.length < 3) {
                    volNum = "0" + volNum;
                }
    
                while (pageNum.length < 3) {
                    pageNum = "0" + pageNum;
                }

                caseList.push(element.case + '<br>' + element.cite + ' (' + element.year + ')' + ' <a href="https://tile.loc.gov/storage-services/service/ll/usrep/usrep'+ volNum + '/usrep' + volNum + pageNum + '/usrep' + volNum + pageNum + '.pdf" download target="_blank">[Op.]</a>' + dkt);

                if (caseList.length < 4 && element.images) {
                    var i = '';


                    for (let e of element.images) {
                        i+= '<img src="';
                        i += e;
                        i += '">';
                    }

                    caseList.push(i);
                    
                }
            }
        }

        if (caseList.length > 99) {
            break;
        }
    }


    caseList.forEach((e)=> {
        document.getElementById('cases').innerHTML += '<p>' + e + '</p>';
    });

    if (caseList.length > 99) {
        document.getElementById('cases').innerHTML += '<p>...</p>';
    }

}

function updateSearchResults(keyword) {

    document.getElementById('cases').innerHTML = '';

    if (keyword.length == 0) {
        return;
    }

    let caseList = [];

    for (let element of cases) {
        
        if (keyword.toLowerCase().split(' ').every(k => element.case.toLowerCase().includes(k))) {
            var volNum = element.cite.split(" ")[0];
            var pageNum = element.cite.split(" ")[2];
            var dkt = "<br>";

            if (element.images) {
                dkt += 'Docket Sheet: '
                for (let e of element.images) {
                dkt += '<a href="'+ e + '" download target="_blank">['+ (element.images.indexOf(e)+1) + ']</a> ';
                }
            } else {
                dkt += '[Docket Sheet Unavailable]';
            }

            while (volNum.length < 3) {
                volNum = "0" + volNum;
            }

            while (pageNum.length < 3) {
                pageNum = "0" + pageNum;
            }

            caseList.push(element.case + '<br>' + element.cite + ' (' + element.year + ')' + ' <a href="https://tile.loc.gov/storage-services/service/ll/usrep/usrep'+ volNum + '/usrep' + volNum + pageNum + '/usrep' + volNum + pageNum + '.pdf" download target="_blank">[Op.]</a>' + dkt);

            if (caseList.length < 4 && element.images) {
                var i = '';


                for (let e of element.images) {
                    i+= '<img src="';
                    i += e;
                    i += '">';
                }

                caseList.push(i);
                
            }
        }

        if (caseList.length > 99) {
            break;
        }
    }


    caseList.forEach((e)=> {
        document.getElementById('cases').innerHTML += '<p>' + e + '</p>';
    });

    if (caseList.length > 99) {
        document.getElementById('cases').innerHTML += '<p>...</p>';
    }

}