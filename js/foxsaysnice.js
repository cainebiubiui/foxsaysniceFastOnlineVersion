
window.foxsaysnicedata = testData;

var addressJSON = {
    "location":[
        "0001",
        "0010"
    ]
}

var addressSelectInit = function(){
    for(var locationName in addressJSON.location){
        var addSelect = '<option>'+addressJSON.location[locationName]+'</option>';
        $('.addressLocation').innerHTML += addSelect;
    }
}

addressSelectInit();

var contentTestData = window.foxsaysnicedata;

var fuck = [].slice.call(document.querySelectorAll('.pic img'));
fuck.forEach(function(obj, i){
    var index = obj.getAttribute('data-index');
    var imgPath = contentTestData.content[index].imagePath;
    obj.src = imgPath;
})

var judge = $('.btnJudge');
judge.onclick = function(){
    var index = PicScroll.getCenterImageIndex();
    alert(index);
}

var orderBox = $('.order-box'),
    orderBtn = $('.btn-order'),
    orderCloseTag = $('.cloes-tag'),
    priceAdd = $('#priceAdd'),
    orderSubmit = $('.orderSubmit'),
    waringBox = $('.windowsStyleWaringBox'),
    waringConfirm = $('.waringConfirm'),
    touchableLock = $('.touchableLock');

var lockTouch = function(){
    touchableLock.style.display = 'block';
}

var unlockTouch = function(){
    touchableLock.style.display = 'none';
}


var orderHandler = function(){
    require(['orderHandler'], function(OrderHandler){
        Caine.add_listener()
    })
}

var showWaringBoxWithError = function(err){
    var isWaringBoxShow = classie.has(waringBox, 'windowsStyleWaringBoxShow');

    if(!isWaringBoxShow){
        $('#waringError').innerHTML = err;
        classie.add(waringBox, 'windowsStyleWaringBoxShow');
        lockTouch();
    }
}

var hideWaringBox = function(){
    var isWaringBoxShow = classie.has(waringBox, 'windowsStyleWaringBoxShow');

    if(isWaringBoxShow){
        classie.remove(waringBox, 'windowsStyleWaringBoxShow');
        unlockTouch();
    }
}

Caine.add_listener(waringConfirm, 'click', hideWaringBox);

var priceAddClick = function(){
    var totalPrice = $('#totalPrice');
    if(this.checked){
        var oldPrice = totalPrice.innerText;
        var newPrice = parseInt(oldPrice)+1;
        totalPrice.innerText = newPrice;
    }else if(!this.checked){
        var oldPrice = totalPrice.innerText;
        var newPrice = parseInt(oldPrice)-1;
        totalPrice.innerText = newPrice;
    }
}

Caine.add_listener(priceAdd, 'change',priceAddClick);

change_segmented_index('.color', function(index){
    alert(index);
})

var getOrderInfo = function(){
    var Location = $('.addressLocation'),
        number = $('.addressNumber'),
        phonenumber = $('#phonenumber'),
        isRightNumber = /\d{0,4}/,
        isRightPhonenumber = /^1[3|4|5|7|8|9][0-9]\d{4,8}$/;

    if(!isRightNumber.test(number.value)){
        showWaringBoxWithError('请输入正确的宿舍号码');
        return false;
    }

    if(!isRightPhonenumber.test(phonenumber.value)){
        showWaringBoxWithError('请输入正确的手机号码');
        return false;
    }
}

Caine.add_listener(orderSubmit, 'click', getOrderInfo);

var foxsaysnice = function(json){
    this.content = json;
}
foxsaysnice.prototype.getImageByIndex = function(index, code){
    var arr = this.content.content;

    for(var key in arr){
        if(arr[key].index == index){
            code(arr[key].imgPath);
        }
    }
}
foxsaysnice.prototype.getTitleByIndex = function(index, code){
    var arr = this.content.content;

    for(var key in arr){
        if(arr[key].index == index){
            code(arr[key].title);
        }
    }
}
//************************************************

var showOrderBox = function(){
    var isOrderShow = classie.has(orderBox, 'order-box-show');

    if(isOrderShow){
        classie.remove(orderBox, 'order-box-show');
    }else{
        classie.add(orderBox, 'order-box-show');
    }
}

var hideOrderBox = function(){

    var isOrderShow = classie.has(orderBox, 'order-box-show');

    if(isOrderShow){
        classie.remove(orderBox, 'order-box-show');
    }
}

var infoChange = function(index){
    var data = window.foxsaysnicedata;

    var title = data.content[index].title,
        price = data.content[index].price,
        promotionPrice = data.content[index].promotionPrice,
        description = data.content[index].description,
        lastNumber = data.content[index].lastNumber;

    io("title:"+title);
    io("price:"+price);
    io("promotionPrice:"+promotionPrice);
    io("description:"+description);
    io("lastnumber:"+lastNumber);

    var etitle = $('#title'),
        eprice = $('#price'),
        epromotionPrice = $('#promotionPrice'),
        esellable = $('.sellable');

    etitle.innerText = title;
    eprice.innerText = price;
    epromotionPrice.innerText = promotionPrice;
    if(lastNumber > 0){
        esellable.innerText = '目前有货';
    }else{
        esellable.innerText = '目前无货';
    }
}

//************************************************

var pic_position = 0;

var getclasshas = function(obj, cla){
    return classie.has(obj, cla);
}

var getCenterImageIndex = function(){
    switch (pic_position){
        case 0:
            return 2
            break;
        case 1:
            return 1;
            break;
        case 2:
            return 0;
            break;
        case -1:
            return 3;
            break;
        case -2:
            return 4;
            break;
        default:
            return -1;
            break;
    }
}

var box = $('.pic-box'),
    picRight = $('.picRight'),
    picLeft = $('.picLeft');

var rightClick = function(){
    switch (pic_position){
        case 0:
            classie.add(box, 'move-right-one');
            pic_position = 1;
            break;
        case -1:
            classie.remove(box, 'move-left-one');
            pic_position = 0;
            break;
        case -2:
            classie.remove(box, 'move-left-two');
            pic_position = -1;
            break;
        case 1:
            classie.add(box, 'move-right-two');
            pic_position = 2;
            break;
        case 2:
            classie.add(box, 'move-right-last');

            setTimeout(function(){
                classie.remove(box, 'move-right-last');
            },1000)
            break;
        default:
            return false;
            break;
    }

    var index = getCenterImageIndex();
    io(index);
    infoChange(index);
}

var leftClick = function(){

    switch (pic_position){
        case 0:
            classie.add(box, 'move-left-one');
            pic_position = -1;
            break;
        case -1:
            classie.add(box, 'move-left-two');
            pic_position = -2;
            break;
        case -2:
            classie.add(box, 'move-left-last');

            setTimeout(function(){
                classie.remove(box, 'move-left-last');
            },1000)
            break;
        case 1:
            classie.remove(box, 'move-right-one');
            pic_position = 0;
            break;
        case 2:
            classie.remove(box, 'move-right-two');
            pic_position = 1;
            break;
        default:
            return false;
            break;
    }

    var index = getCenterImageIndex();
    io(index);
    infoChange(index);
}

picLeft.addEventListener('click', leftClick);
picRight.addEventListener('click', rightClick);

