function _timer(callback) 
{ 
    var time = 0;
    var mode = 1;
    var status = 0;
    var timer_id;
    
    this.start = function(interval)
    {
        interval = (typeof(interval) !== 'undefined') ? interval : 1000;
    
        if(status == 0)
        {
            status = 1;
            timer_id = setInterval(function()
            {
                switch(mode)
                {
                    default:
                    if(time)
                    {
                        time--;
                        generateTime();
                        if(typeof(callback) === 'function') callback(time);
                    }
                    break;
                    
                    case 1:
                    if(time < 86400)
                    {
                        time++;
                        generateTime();
                        if(typeof(callback) === 'function') callback(time);
                    }
                    break;
                }
            }, interval);
        }
        document.getElementsByClassName("stop-timer")[0].style.display = '';
        document.getElementsByClassName("start-timer")[0].style.display = 'none';
    }
    
    this.stop =  function()
    {
        if(status == 1)
        {
            status = 0;
        clearInterval(timer_id);
        }
        document.getElementsByClassName("stop-timer")[0].style.display = 'none';
        document.getElementsByClassName("start-timer")[0].style.display = '';
    }
    
    this.reset =  function(sec)
    {
        this.stop();
        sec = (typeof(sec) !== 'undefined') ? sec : 0;
        time = sec;
        generateTime(time);
    }
    
    this.speedUp = function(interval)
    {
        this.stop();
        this.start(interval);
    }
    
    this.mode = function(tmode)
    {
        mode = tmode;
    }
    
    this.getTime = function()
    {
        return time;
    }
    
    this.getMode = function()
    {
        return mode;
    }
    
    this.getStatus
    {
        return status;
    }
    
    function generateTime()
    {
        var second = time % 60;
        var minute = Math.floor(time / 60) % 60;
        var hour = Math.floor(time / 3600) % 60;
        
        second = (second < 10) ? '0'+second : second;
        minute = (minute < 10) ? '0'+minute : minute;
        hour = (hour < 10) ? '0'+hour : hour;
        
        document.querySelectorAll('div.timer span.second')[0].innerHTML = second;
        document.querySelectorAll('div.timer span.minute')[0].innerHTML = minute;
        document.querySelectorAll('div.timer span.hour')[0].innerHTML = hour;
    }
} 

var timer;

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

ready(function(e){
    timer = new _timer
    (
        function(time)
        {
            if(time == 0)
            {
                timer.stop();
                alert('time out');
            }
        }
    );
    timer.reset(180);
    timer.mode(0);
    document.getElementsByClassName("stop-timer")[0].style.display = 'none';
    document.getElementsByClassName("start-timer")[0].style.display = '';
});