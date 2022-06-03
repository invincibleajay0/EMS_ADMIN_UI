$(document).ready(function () {

    $('.js-example-basic-single').select2(
        {
            tags: true
        }
    );

    getColorcode();
    getDeviation();
    getUnitNames();
    getKPINames();
    getDate();

    //on Change dropdown
    $("#drpdownUnitName").on('change', function () {
        getDate();
    });

  // delete row
  $("#datatablesSimple1").on('click','#deleteRow',function(){
    var type =  $(this).closest('tr').find('.type').val();
    var unit = $('#drpdownUnitName').val();
    var deleteData =  {
        unitName : unit,
        type: type
    }
    console.log(deleteData ,'deleteData');
    $.ajax({
      headers: {
          "Content-Type": "application/json",
      },
      method: "POST",
      data: JSON.stringify(deleteData),
      url: "http://localhost:8091/admin/unit/sec/deleteTableDetails",
     
  }).done(function (data) {
      console.log(data)
      $(this).closest('tr').remove();
      getDate();
  })
    
 });
 
});
// append option to select

var colorDataOption;
var colorDataOptionS;
var unitNameDataS;
var unitNameData;
var deviationData;
var deviationDataS;
var kpiData;

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

function getUnitNames() {
    $.ajax({
         method: "GET",
        url: "http://localhost:8091/admin/common/getUnitNames",
       
    }).done(function (data) {
     
    $.each(data, function (i, item) {
        unitNameData+='<option value="'+item.unitValue+'">'+item.unitName + '</option>';
        unitNameDataS+='<option value="'+item.unitValue+'">'+item.unitName + '</option>##';  
        $('.unitNameData').append($('<option>', { 
            value: item.unitValue,
            text : item.unitName ,
        }));
    });
    
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
    var cell8 = row.insertCell(7);
    cell1.innerHTML = '<input class="form-control serialNo" type="text" value=""/>';
    cell2.innerHTML = '<input class="form-control type" value=""/>';
    cell3.innerHTML = '<select class="form-control js-example-basic-single sec">'+kpiData+'</select>';
    cell4.innerHTML = '<select class="form-control js-example-basic-single reference">'+kpiData+'</select>';
    cell5.innerHTML = '<select class="form-control deviationData deviation">'+deviationData+'</select>';
    cell6.innerHTML = '<select class="form-control positive">'+colorDataOption+'</select>';
    cell7.innerHTML = '<select class="form-control negative">'+colorDataOption+'</select>';
    cell8.innerHTML = '<input class="form-control " id="deleteRow" type="button" value="Delete" />';
    $('.js-example-basic-single').select2();
}


function getUserRole(callback) {
    var kpiData;
    $.ajax({
         method: "GET",
         url: "http://localhost:8091/admin/common/getKPINames",
        
       
    }).done(function (data) {
        kpiData=data;
        
        $.each(data, function (i, item) {
        $('.drpDwndatatype').append($('<option>', { 
            value: item.kpiValue,
            text : item.kpiName 
        }));
         
       
       // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
        });
        callback(kpiData);
    });
         
}

  // save table

function saveTable() {
    var tabledata = document.getElementById("datatablebody");
    var rowsdata = [];
    for ( i =0; i <= tabledata.rows.length-1; i++) {
        const numberRow = $(tabledata).find('tr')[i];
        if($(numberRow).find('.serialNo').val()!=undefined){
        const dataObj = {
            unitsectableem : {
                unitName : $('#drpdownUnitName').val(),
                type : $(numberRow).find('.type').val(),
            },
            serialNo : $(numberRow).find('.serialNo').val(),
            sec : $(numberRow).find('.sec').val(),
            reference: $(numberRow).find(".reference").val(),
            deviation: $(numberRow).find(".deviation").val(),
            positive: $(numberRow).find(".positive").val(),
            negative: $(numberRow).find(".negative").val()
        }
        rowsdata.push(dataObj);
        }
    }
    console.log(rowsdata,'rowsdata');
    $.ajax({
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(rowsdata),
         
        url: "http://localhost:8091/admin/unit/sec/addTableDetails",
    }).done(function (data) {
      var status = data;
      if (status == "success") {
        alert("Data Save Sucessfully!");
      }
      if (status == "error") {
        alert("Error occurs");
      } 
        
    })
}

  // data render in table

  function getDate() {
    getUserRole(function(kpiData)
    {  
        const dataObj = {
            unitName : $('#drpdownUnitName').val()}
    
    $.ajax({
         headers: {
            "Content-Type": "application/json",
       },
         method: "POST",
         data: JSON.stringify(dataObj),
         
         url: "http://localhost:8091/admin/unit/sec/getTableDetails",
     }).done(function (data) {
        
        var ittrdata = '';
        var array1 = colorDataOptionS.split('##');
        var array = deviationDataS.split('##');  
        for (const val of data) {
            ittrdata += '<tr>';
            ittrdata += '<td><input style="width: fit-content" class="form-control serialNo" type="text" value="'+ val['serialNo'] +'"/></td>';
            ittrdata += '<td><input style="width: fit-content" class="form-control type" value="'+ val['unitsectableem']['type'] +'"/></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single sec" >'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['sec'])
                 ittrdata += '<option value="'+kpiD['kpiValue']+'" selected>'+kpiD['kpiName']+'</option>';
                else 
                 ittrdata += '<option value="'+kpiD['kpiValue']+'">'+kpiD['kpiName']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single reference" >'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['reference'])
                 ittrdata += '<option value="'+kpiD['kpiValue']+'" selected>'+kpiD['kpiName']+'</option>';
                else 
                 ittrdata += '<option value="'+kpiD['kpiValue']+'">'+kpiD['kpiName']+'</option>';
                 }
            ittrdata += '</select></td>';
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
            ittrdata += '<td><select style="width: fit-content" class="form-control positive">'
            for(let i=0; i<array1.length;i++ ){
                  
                let result = array1[i].substring(array1[i].indexOf('"')+1,array1[i].indexOf('">'));
                
                if(result == val['positive']){
                    ittrdata+='<option selected="selected" '+array1[i].substring(array1[i].indexOf('value'));
                }else{
                  ittrdata+= array1[i];
                }
                
            }
            ittrdata += '</select></td>';
            ittrdata += '<td><select style="width: fit-content" class="form-control negative">'
            for(let i=0; i<array1.length;i++ ){
                  
                let result = array1[i].substring(array1[i].indexOf('"')+1,array1[i].indexOf('">'));
                
                if(result == val['negative']){
                    ittrdata+='<option selected="selected" '+array1[i].substring(array1[i].indexOf('value'));
                }else{
                  ittrdata+= array1[i];
                }
                
            }
            ittrdata += '</select></td>';
            ittrdata += '<td><input class="form-control " id="deleteRow" type="button" value="Delete" /></td>';
            ittrdata += '</tr>';
          
        }
       
        document.getElementById("datatablebody").innerHTML = ittrdata;
        $('.js-example-basic-single').select2();
       });
    });
  }

 


