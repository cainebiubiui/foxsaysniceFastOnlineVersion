//(function(window){

    var index = PicScroll.getCenterImageIndex();

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

        var title = $('#title'),
            price = $('#price'),
            promotionPrice = $('#promotionPrice'),
            sellable = $('.sellable');

        title.innerText = title;
        price.innerText = price;
        promotionPrice.innerText = promotionPrice;
        if(lastNumber > 0){
            sellable.innerText = '目前有货';
        }else{
            sellable.innerText = '目前无货';
        }
    }



    var OrderHandler = {
        showOrderBox: showOrderBox,
        hideOrderBox: hideOrderBox,
        infoChange: infoChange
    }

//    if (typeof define === 'function' && define.amd) {
//        define(OrderHandler);
//    } else {
//        window.OrderHandler = OrderHandler;
//    }
//
//})(window)