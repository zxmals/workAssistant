

/*全局控制*/
$(document).ready(function(){
    /*页面切换*/
    $("li[role='presentation']").click(function (){
        $(this).addClass('active').siblings().removeClass('active');
        $('#'+$(this).attr("title")).removeClass("hidden").siblings().addClass('hidden');
    })
});



/*设备信息页*/
let locator = new ActiveXObject ("WbemScripting.SWbemLocator");
let service = locator.ConnectServer(".");

/*CPU 信息*/
function cpuInfo() {
    let properties = service.ExecQuery("SELECT * FROM Win32_Processor");
    let e = new Enumerator (properties);
    let info = "";
    for (;!e.atEnd();e.moveNext ()) {
        let p = e.item ();
        info+='<li class="list-group-item">CPU型号：' + p.Name + '</li>';
        info+='<li class="list-group-item">主机名称：' + p.SystemName + '</li>';
    }
    return info;
}

/*操作系统*/
function osInfo(){
    let properties = service.ExecQuery("SELECT * FROM Win32_OperatingSystem");
    let e = new Enumerator (properties);
    let info="";
    for (;!e.atEnd();e.moveNext ()){
        let p = e.item ();
        info+='<li class="list-group-item">操作系统：' + p.Caption + '</li>';
    }
    return info;
}

/*主板信息*/
function mainBoard() {
    let properties = service.ExecQuery("SELECT * FROM Win32_BaseBoard");
    let e = new Enumerator (properties);
    let info="";
    for (;!e.atEnd();e.moveNext ()) {
        let p = e.item ();
        info+='<li class="list-group-item">制造商：' + p.Manufacturer + '</li>';
        info+='<li class="list-group-item">型号：' + p.Product + '</li>';
    }
    return info;
}

//获取网络连接信息
function ipInfo(){
    let properties = service.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration Where IPEnabled=TRUE");
    let e = new Enumerator (properties);
    let info="";
    for (;!e.atEnd();e.moveNext ()){
        let p = e.item ();
        info+='<li class="list-group-item">MAC地址：' + p.MACAddress + '</li>';
        info+='<li class="list-group-item">IP地址：' + p.IPAddress(0) + '</li>';
    }
    return info;
}

function getDeviceInfo(){
    /*let info = '<img src="../img/dl-pc.jpg" class="img-thumbnail" alt="Responsive image">';*/
    let info = '';
    info += osInfo();
    info += cpuInfo();
    info += mainBoard();
    info += ipInfo();

    return info;

}

$(function() {
    let info = getDeviceInfo();
    $('#deviceuse ul').html(info)
});