function _roullet(callback)
{
    var mode = 1;
    var status = 0;
    var roullet;
    var myArray = initArrayOfInt(16);
    var randomValue = -1;
    
    this.start = function(interval)
    {
        interval = (typeof(interval) !== 'undefined') ? interval : 1000;
 
        if(status == 0)
        {
            status = 1;
            roullet = setInterval(function()
            {
                if(randomValue >= 0){
                    deleteFlickerCell(randomValue-1);
                }
                
                randomValue = getRandomInt(1, myArray.length);
                generateFlickerCell(randomValue-1);

                if(typeof(callback) === 'function') callback(randomValue);
            }, interval);
        }
        document.getElementsByClassName("start-roullet")[0].style.display = 'none';
        document.getElementsByClassName("stop-roullet")[0].style.display = '';
    }
    
    this.stop =  function(select)
    {
        if(status == 1)
        {
            status = 0;
            clearInterval(roullet);
        }
        document.getElementsByClassName("stop-roullet")[0].style.display = 'none';
        document.getElementsByClassName("start-roullet")[0].style.display = '';
        if (typeof(select) === 'undefined') {
            setCellSelected(this.getCurrentCell());
        }
    }
    
    this.reset =  function()
    {
        randomValue = -1;
        this.stop('reset');
        // $('td.selecting').each(function(){
        //     $(this).removeClass("selecting");
        // });
        var elements = document.querySelectorAll('td.selecting');
        for (var i = 0; i < elements.length; i++) {
            removeClassPureJS(elements[i], "selecting");
        }
    }
    
    this.speedUp = function(interval)
    {
        this.stop();
        this.start(interval);
    }
    
    this.getCurrentCell = function()
    {
        return randomValue;
    }
    
    this.getStatus
    {
        return status;
    }
    
    function generateFlickerCell(cell)
    {
        // $('td.column-' + myArray[cell]).addClass("selecting");
        addClassPureJS(document.querySelectorAll('td.column-' + myArray[cell])[0], "selecting");
    }
    
    function deleteFlickerCell(cell)
    {
        // $('td.column-' + myArray[cell]).removeClass("selecting");
        removeClassPureJS(document.querySelectorAll('td.column-' + myArray[cell])[0], "selecting");
    }
    
    function setCellSelected(cell)
    {
        alert("You have selected the number: " + myArray[cell-1]);
        myArray.splice(cell-1, 1);
    }
    
    function initArrayOfInt(val){
        var Arr = [];
        for (var i = 0; i < val; i++) {
            Arr[i] = i + 1;
        }
        return Arr;
    }
    
    function getRandomInt(min, max) {
        return Math.floor( Math.random() * (max - min + 1) ) + min;
    }
    
    function getRandomInArray(myArray) {
        return myArray[Math.floor(Math.random() * myArray.length)];
    }
}
 
var roullet;

ready(function(e){
    roullet = new _roullet();
    roullet.reset();
    document.getElementsByClassName("stop-roullet")[0].style.display = 'none';
    document.getElementsByClassName("start-roullet")[0].style.display = '';
});

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState != 'loading')
                fn();
        });
    }
}

function removeClassPureJS(selector, className) {
    if (selector.classList)
        selector.classList.remove(className);
    else
        selector.className = selector.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function addClassPureJS(selector, className) {
    if (selector.classList)
        selector.classList.add(className);
    else
        selector.className += ' ' + className;
}
