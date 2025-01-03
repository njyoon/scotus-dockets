window.onload = function() {

    const vol = document.getElementById('#vol');
    const page = document.getElementById('#page');
    
    const searchResults = document.getElementById('cases');

}

function searchByCite() {
    
    document.getElementById('cases').innerHTML = '';

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

    var volume = document.getElementById('vol').value;
    var page = document.getElementById('page').value;
    var keyword = document.getElementById('case-search').value;
    var minYear = document.getElementById('min-year').value;
    var maxYear = document.getElementById('max-year').value;

    if (volume.length == 0 && page.length == 0 && keyword == 0) {
        return;
    }

    let caseList = [];

    for (let element of cases) {

        var volNum = element.cite.split(" ")[0];
        var pageNum = element.cite.split(" ")[2];
        
        if ((minYear.length == 0 || minYear <= element.year) && (maxYear.length == 0 || maxYear >= element.year)) {
            if (keyword.length == 0 || keyword.toLowerCase().split(' ').every(k => element.case.toLowerCase().includes(k))) {

                if (volume.length == 0 || volume.toString() == element.cite.split(" ")[0]) {

                        if ((page.length == 0) || (page.toString() == pageNum)) {

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