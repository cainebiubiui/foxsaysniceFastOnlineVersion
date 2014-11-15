
    var change_segmented_index = function (obj, code) {

        var obj_index = [].slice.call(document.querySelectorAll(obj));

        obj_index.forEach(function (obj, i) {
            obj.addEventListener('click', function () {
                var index = this.getAttribute('data-index');
                obj_index.forEach(function (obj, i) {
                    if (obj.getAttribute('data-index') == index) {
                        obj.classList.add('light');
                    } else {
                        if (obj.classList.contains('light')) {
                            obj.classList.remove('light');
                        }
                    }
                })

                code(index);
            })
        })

    }
