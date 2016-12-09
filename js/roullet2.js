/*global $*/
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
                    console.log(randomValue);
                    deleteFlickerCell(randomValue-1);
                }
                
                randomValue = getRandomInt(1, myArray.length);
                generateFlickerCell(randomValue-1);

                if(typeof(callback) === 'function') callback(randomValue);
            }, interval);
        }
        $('.start-roullet').hide();
        $('.stop-roullet').show();
    }
    
    this.stop =  function(select)
    {
        if(status == 1)
        {
            status = 0;
            clearInterval(roullet);
        }
        $('.start-roullet').show();
        $('.stop-roullet').hide();
        if (typeof(select) === 'undefined') {
            setCellSelected(this.getCurrentCell());
        }
    }
    
    this.reset =  function()
    {
        randomValue = -1;
        this.stop('reset');
        $('td.selecting').each(function(){
            $(this).removeClass("selecting");
        });
        
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
        $('td.column-' + myArray[cell]).addClass("selecting");
    }
    
    function deleteFlickerCell(cell)
    {
        $('td.column-' + myArray[cell]).removeClass("selecting");
    }
    
    function setCellSelected(cell)
    {
        alert("You selected the number:" + myArray[cell-1]);
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

$(document).ready(function(e) 
{
    roullet = new _roullet();
    roullet.reset();
    $('.start-roullet').show();
    $('.stop-roullet').hide();
});