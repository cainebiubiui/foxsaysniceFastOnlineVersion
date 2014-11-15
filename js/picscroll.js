//(function(window){

    var classnumber = {
        'right-one':'right-one',
        'right-two':'right-two',
        'left-one':'left-one',
        'left-two':'left-two',
        'first':'first',
        'last':'last'
    }

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
        OrderHandler.infoChange(index);
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
        OrderHandler.infoChange(index);
    }

    picLeft.addEventListener('click', leftClick);
    picRight.addEventListener('click', rightClick);

    var PicScroll = {
        getCenterImageIndex : getCenterImageIndex
    }

//    if (typeof define === 'function' && define.amd) {
//        define(['classie'], PicScroll);
//    } else {
//        window.PicScroll = PicScroll;
//    }
//
//})(window)