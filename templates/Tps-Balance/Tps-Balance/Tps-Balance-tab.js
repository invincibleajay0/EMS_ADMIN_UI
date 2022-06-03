$(document).ready(function () {

    $('.js-example-basic-single').select2();
  // delete row
  $("#datatablesSimple1").on('click','#deleteRow',function(){
    var lebal =  $(this).closest('tr').find('#lebal').val();
    var tablename =  $('#drpdownTableName').val();
    var type = $('#drpdownTableType').val();
    console.log(lebal,'lebal');
    var deleteData =  {
        type : type,
        tablename: tablename,
        label: lebal
    }
    console.log(deleteData ,'deleteData');
    $.ajax({
      headers: {
          "Content-Type": "application/json",
      },
      method: "POST",
      data: JSON.stringify(deleteData),
      url: "http://localhost:8091/ems/tpsbalance/delete",
     
    }).done(function (data) {
      console.log(data)
      $(this).closest('tr').remove();
      getDate();
    })

    });


 $('#typediv').show();
        $('#addRow').show();
 //onchange dropdown
 $('#drpdownTableName').on('change', function() {
    getDate();
 });

 $('#drpdownTableType').on('change', function() {
    //  alert( this.value ); // or $(this).val()
    console.log('hii');
    // if(this.value == "Tp") {
      
    //   $('#typediv').hide();
    //   $('#typedivlosses').hide();
    //   $('#tpTypeDiv').show();
    //   $('#addRow').hide();
    // } 
    // else if(this.value == "Losses") {
    //     $('#tpTypeDiv').hide();
    //   $('#typediv').hide();
    //   $('#typedivlosses').show();
    //   $('#addRow').hide();
    //   }
     if(this.value == "Generator" || this.value == "Consumer" || this.value == "Export" || this.value == "Tp") {
        $('#tpTypeDiv').hide();
        $('#typediv').show();
        $('#addRow').show();
        $('#typedivlosses').hide();
    }
    getDate();
  });
  getKPINames();
  getDropDownData();
  getColorcode();
 getDate();
 //getUserRole();
});
// append option to select

var colorDataOption;
var colorDataOptionS;
var kpiData1; 

function getKPINames() {
    $.ajax({
        method: "GET",
         url: "http://localhost:8091/admin/common/getKPINames",
       
    }).done(function (data) {
       $.each(data, function (i, item) {
           if(item.kpiValue != undefined && item.kpiValue !=""){
            kpiData1+='<option value="'+item.kpiValue+'">'+item.kpiName + '</option>';
            }
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
        $('.drpDwndatatype').append($('<option>', { 
            value: item.kpiValue,
            text : item.kpiName 
        }));
         
       
       // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
        });
        callback(kpiData);
    });
         
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

function getDropDownData() {
   

       var items= [{
           value:"VHP",
           text:"VHP",
       },
       {
        value:"HP",
        text:"HP"
    },
    {
        value:"MLP",
        text:"MLP"
    }]
    $.each(items, function (i, item) {
        $('#drpdownTableName').append($('<option>', { 
            value: item.value,
            text : item.text ,
        }));
       // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
    });

    var items1= [{
        value:"Generator",
        text:"Generator",
    },
    {
     value:"Consumer",
     text:"Consumer"
 },
 {
     value:"Export",
     text:"Export"
 },
 {
     value:"Tp",
     text:"Tp"
 }
//  {
//     value:"Losses",
//     text:"Losses"
// }
]
 $.each(items1, function (i, item) {
     $('#drpdownTableType').append($('<option>', { 
         value: item.value,
         text : item.text ,
     }));
    // $('#levelRole').val(100).trigger('change').trigger('liszt:updated');
 });
        
  //  });

}
 // save table

function saveTable() {
    
    var tabledata = document.getElementById("datatablebody");
   
    var rowsdata = [];
    for ( i =0; i <= tabledata.rows.length-1; i++) {
        const numberRow = $(tabledata).find('tr')[i];
        if ($(numberRow).find('#lebal').val()!=undefined) {
            const dataObj = {
                embedded:{
                    type : $('#drpdownTableType').val(),
                    tablename : $('#drpdownTableName').val(),
                    label: $(numberRow).find('#lebal').val(),
                },
                 
                kpiName: $(numberRow).find(".kpiName").val(),
                progressColor: $(numberRow).find(".progressColor").val()
               
    
            }
            rowsdata.push(dataObj);
        }
       
    }
    $.ajax({
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(rowsdata),
         
        url: "http://localhost:8091/ems/tpsbalance/add",
    }).done(function (data) {
      var status = data;
      if (status == "success") {
        alert("Record Save Sucessfully!");
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
        var unitName = {tablename: $('#drpdownTableName').val() ,type: $('#drpdownTableType').val()}
   
     $.ajax({
         headers: {
             "Content-Type": "application/json",
         },
       method: "POST",
         data: JSON.stringify(unitName),
         
         url: "http://localhost:8091/ems/tpsbalance/get",
     }).done(function (data) {
        var ittrdata = '';
        var array1 = colorDataOptionS.split('##');
        ittrdata += '<tr>';
        for (const val of data) {
            ittrdata += '<td><input class="form-control lebal" id="lebal" value="'+ val['embedded']['label'] +'"/></td>';
            ittrdata += '<td><select class="form-control js-example-basic-single kpiName">'
            for (const kpiD of kpiData) {
                if(kpiD['kpiValue'] == val['kpiName'])
                 ittrdata += '<option value='+kpiD['kpiValue']+' selected>'+kpiD['kpiName']+'</option>';
                else 
                 ittrdata += '<option value='+kpiD['kpiValue']+'>'+kpiD['kpiName']+'</option>';
                 }
            ittrdata += '</select></td>';
            ittrdata += '<td><select class="form-control progressColor">'
            for(let i=0; i<array1.length;i++ ){
                  
                let result = array1[i].substring(array1[i].indexOf('"')+1,array1[i].indexOf('">'));
                
                if(result == val['progressColor']){
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

  // add row

function addRow() {
    console.log(kpiData1,'kpiData');
    const table = document.getElementById("datatablebody");
   
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    
    cell1.innerHTML = '<input class="form-control" id="lebal" value=""/>';
    cell2.innerHTML = '<select class="form-control js-example-basic-single kpiName">'+kpiData1+'</select>';
    cell3.innerHTML = '<select class="form-control progressColor">'+colorDataOption+'</select>';
    cell4.innerHTML = '<input class="form-control " id="deleteRow" type="button" value="Delete" />';
    $('.js-example-basic-single').select2();
}


  




