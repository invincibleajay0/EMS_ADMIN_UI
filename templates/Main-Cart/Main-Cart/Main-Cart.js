$(document).ready(function () {

    $('.js-example-basic-single').select2();
  // delete row
//   $("#datatablesSimple1").on('click','#deleteRow',function(){
//     var type =  $(this).closest('tr').find('#type').val();
//     var unit = $('#drpdownUnitName').val();
//   var deleteData =  {
//         unitName : unit,
//         type: type
//     }
//     console.log(deleteData ,'deleteData');
//     $.ajax({
//       headers: {
//           "Content-Type": "application/json",
//       },
//       method: "POST",
//       data: JSON.stringify(deleteData),
//       url: "http://localhost:8091/admin/unit/feedplant/deleteFeedPlantDetails",
     
//   }).done(function (data) {
//       console.log(data)
//       $(this).closest('tr').remove();
//       getDate();
//   })
//     $(this).closest('tr').remove();
//  });

getPageName();

  // on change
  $("#drpdownpageName").on('change', function () {
    getCardName();
    getDate();
 });
getCardName();
getColorcode();
getDeviation();
 getKPINames();
 getDate();

});

var colorDataOption;
var colorDataOptionS;
var deviationData;
var deviationDataS;
var cardNameData;
var cardNameDataS;
var kpiData;
// append option to select

function getDeviation() {
  var data=[
      {
          "devKey": "Sec-Ref",
          "devValue": "Sec-Ref"
      },
      {
          "devKey": "Ref-Sec",
          "devValue": "Ref-Sec"
      }
  ]
  $.each(data, function (i, item) {
      deviationData+='<option value="'+item.devKey+'">'+item.devValue + '</option>' ;
      deviationDataS+='<option value="'+item.devKey+'">'+item.devValue + '</option>##' ;
  });
}

function getPageName() {
  console.log("hiii");
     var data = [
       {
      pageName : "Home",
      pageValue : "HOME"
     },
     {
      pageName : "TPS",
      pageValue : "TPS"
     },
     {
      pageName : "Fuel",
      pageValue : "FUEL"
     },
     {
      pageName : "Electricity",
      pageValue : "ELECTRICITY"
     },
     {
      pageName : "Steam",
      pageValue : "STEAM"
     },
     {
       pageName:"Hydrogen",
       pageValue : "HYDROGEN"
     },
     {
      pageName:"Water",
      pageValue : "WATER"
    }
    ]
      
      $.each(data, function (i, item) {
      $('#drpdownpageName').append($('<option>', { 
          value: item.pageValue,
          text : item.pageName 
      }));
       
     
     // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
      });
      
  
       
}

function getCardName(){
  var pageName =  $('#drpdownpageName').val()
    $.ajax({
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
         
        url: "http://localhost:8091/admin/common/getCart/"+pageName,
    }).done(function (data) {
      $.each(data, function (i, item) {
        $('.cardName').append($('<option>', { 
            value: item.embedded.cartName,
            text :item.embedded.cartName 
        }));
      });
      if (cardNameData != '') {
        cardNameData = ''
      } else {
        $.each(data, function (i, item) {
          cardNameData+='<option value="'+item.embedded.cartName+'">'+item.embedded.cartName + '</option>' ;
          cardNameDataS+='<option value="'+item.embedded.cartName+'">'+item.embedded.cartName + '</option>##' ;
      });
      }
     
    })
}

function getColorcode() {
    $.ajax({
         method: "GET",
         url: "http://localhost:8091/admin/home/asec/getColor",
       
    }).done(function (data) {
      
    $.each(data, function (i, item) {
      colorDataOption+='<option value="'+item.colorKey+'">'+item.colorValue + '</option>' ;
      colorDataOptionS+='<option value="'+item.colorKey+'">'+item.colorValue + '</option>##' ;
       
    });
  });
  }
function getUserRole(callback) {
    var kpiData;
    $.ajax({
         method: "GET",
         url: "http://localhost:8091/admin/common/getKPINames",
        
       
    }).done(function (data) {
        kpiData=data;
        
        $.each(data, function (i, item) {
        $('.drpDwnKpi').append($('<option>', { 
            value: item.kpiValue,
            text : item.kpiName 
        }));
         
       
       // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
        });
        callback(kpiData);
    });
         
}
function getKPINames() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8091/admin/common/getKPINames",
       
   }).done(function (data) {
       
    
        $.each(data, function (i, item) {
            if(item.kpiValue != undefined && item.kpiValue !=""){
                kpiData+='<option value="'+item.kpiValue+'">'+item.kpiName + '</option>';
                }
    });
   
   });

}

// add row

function addRow() {
   
    const table = document.getElementById("datatablebody");
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    cell1.innerHTML = '<input class="form-control serialNo" id="serialNo" value=""/>';
    cell2.innerHTML = '<select class="form-control cardName">'+cardNameData+'</select>';
    cell3.innerHTML = '<select class="form-control js-example-basic-single drpDwnKpi deviation">'+kpiData+'</select>';
    cell4.innerHTML = '<input class="form-control uom" id="uom" value=""/>';
    cell5.innerHTML = '<select class="form-control positive">'+colorDataOption+'</select>';;
    cell6.innerHTML = '<select class="form-control negetive">'+colorDataOption+'</select>';;
    cell7.innerHTML = '<input class="form-control " id="deleteRow" type="button" value="Delete" />';
    $('.js-example-basic-single').select2();
   
}



  // save table

function saveTable() {
    var tabledata = document.getElementById("datatablebody");
    var rowsdata = [];
    for ( i =0; i <= tabledata.rows.length-1; i++) {
        const numberRow = $(tabledata).find('tr')[i];
        const dataObj = {
            type : $('#drpdownCardName').val(),
            actual : $(numberRow).find('.actual').val(),
            reference : $(numberRow).find('.reference').val(),
            deviation: $(numberRow).find(".deviation").val(),
            uom : $(numberRow).find(".uom").val(),
            positive: $(numberRow).find(".positive").val(),
            negative: $(numberRow).find(".negative").val(),
        }
        rowsdata.push(dataObj);
    }
    console.log(rowsdata,'rowsdata');
}

  // data render in table

  function getDate() {
    getUserRole(function(kpiData)
    {  
    var unitName = {unitName: $('#drpdownpageName').val()}
    console.log(unitName,'unitName');
    $.ajax({
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(unitName),
         
        url: "http://localhost:8091/admin/unit/feedplant/getFeedPlantDetails",
    }).done(function (data) {
       
        var ittrdata = '';
        var array1 = colorDataOptionS.split('##');
        ittrdata += '<tr>';
        for (const val of tabledata) {
          ittrdata += '<td><input class="form-control srNo" id="srNo" type="text" value="'+ val['serialNo'] +'"/></td>';
            ittrdata += '<td><select class="form-control cardName">'
            // for (const kpiD of kpiData) {
            //     if(kpiD['kpiValue'] == val['kpiName'])
            //      ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
            //     else 
            //      ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
            //      }
            ittrdata += '</select></td>';
            ittrdata += '<td><input class="form-control srNo" id="srNo" type="text" value="'+ val['serialNo'] +'"/></td>';
          ittrdata += '<td><select class="form-control js-example-basic-single actual" id="actual">'
          for (const kpiD of kpiData) {
              if(kpiD['kpiValue'] == val['kpiName'])
               ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
              else 
               ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
               }
          ittrdata += '</select></td>';
          ittrdata += '<td><select class="form-control js-example-basic-single reference">'
          for (const kpiD of kpiData) {
              if(kpiD['kpiValue'] == val['kpiName'])
               ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
              else 
               ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
               }
          ittrdata += '</select></td>';
          ittrdata += '<td><input class="form-control inputColumnName" id="uom" type="text" placeholder="Enter Column Name" value="'+ val['uom'] +'"/></td>';
          ittrdata += '<td><select style="width: fit-content" class="form-control deviation">'
          for(let i=0; i<array.length;i++ ){
                
              let result = array[i].substring(array[i].indexOf('"')+1,array[i].indexOf('">'));
              
              if(result == val['deviation']){
                  ittrdata+='<option selected="selected" '+array[i].substring(array[i].indexOf('value'));
              }else{
                ittrdata+= array[i];
              }
              
          }
          ittrdata += '</select></td>';
          ittrdata += '<td><select class="form-control js-example-basic-single positive">'
          for(let i=0; i<array1.length;i++ ){
                
              let result = array1[i].substring(array1[i].indexOf('"')+1,array1[i].indexOf('">'));
              
              if(result == val['labelColor']){
                  ittrdata+='<option selected="selected" '+array1[i].substring(array1[i].indexOf('value'));
              }else{
                ittrdata+= array1[i];
              }
              
          }
          ittrdata += '</select></td>';
          ittrdata += '<td><select class="form-control js-example-basic-single negetive">'
            for(let i=0; i<array1.length;i++ ){
                  
                let result = array1[i].substring(array1[i].indexOf('"')+1,array1[i].indexOf('">'));
                
                if(result == val['labelColor']){
                    ittrdata+='<option selected="selected" '+array1[i].substring(array1[i].indexOf('value'));
                }else{
                  ittrdata+= array1[i];
                }
                
            }
            ittrdata += '</select></td>';
          ittrdata += '<td><input class="form-control " id="deleteRow" type="button" value="Delete" /></td>';
          ittrdata += '</tr>';
          
        }
        $('.js-example-basic-single').select2();
        document.getElementById("datatablebody").innerHTML = ittrdata;
       });
    });
  }




