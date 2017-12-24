function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

$(document).on('copy', function (){
    showMessage('What are you copy?', 5000);
});

$.ajax({
    cache: true,
    url: `${message_Path}message.json`,
    dataType: "json",
    success: function (result){
        $.each(result.mouseover, function (index, tips){
            $(tips.selector).mouseover(function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.renderTip({text: $(this).text()});
                showMessage(text, 3000);
            });
        });
        $.each(result.click, function (index, tips){
            $(tips.selector).click(function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.renderTip({text: $(this).text()});
                showMessage(text, 3000);
            });
        });
    }
});

(function (){
    var text;
    if(document.referrer !== ''){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = 'Hi！You are from <span style="color:#0099cc;">' + referrer.hostname + '</span>！';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = '嗨！ 来自 百度搜索 的朋友，<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
        }else if (domain == 'so') {
            text = '嗨！ 来自 360搜索 的朋友，<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
        }else if (domain == 'google') {
            text = 'Hi someone from Google，<br>Welcome to <span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }else {
        if (window.location.href == `${home_Path}`) { //如果是主页
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = "Are you a night owl? It's not too late to go to bed, so come tomorrow?";
            } else if (now > 5 && now <= 7) {
                text = 'Good morning! What a beautiful day today right?';
            } else if (now > 7 && now <= 11) {
                text = 'Good morning! Work well!!';
            } else if (now > 11 && now <= 14) {
                text = 'Lunch time XD！';
            } else if (now > 14 && now <= 17) {
                text = "I'm kind of sleepy right now？";
            } else if (now > 17 && now <= 19) {
                text = 'Good Evening~~';
            } else if (now > 19 && now <= 21) {
                text = 'Good evening, how are you doing today?？';
            } else if (now > 21 && now <= 23) {
                text = "It's so late, rest early, good night"
            } else {
                text = 'Hi ~ Come and play with me';
            }
        }else {
            text = 'Welcome to <span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }
    showMessage(text, 12000);
})();

window.setInterval(showHitokoto,30000);

function showHitokoto(){
    
    $.getJSON('https://aq.khursani.win/',function(result){
        showAnimeQuote(result, 5000);
    });
}

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    console.log('showMessage', text);
    message = $('.message')    
    message.stop();
    message.html(text).fadeTo(200, 1);
    message.css('top',-message.height()+50);
    
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function showAnimeQuote(text, timeout){
    quotesentence = text.quotesentence
    quotecharacter = text.quotecharacter
    quoteanime = text.quoteanime
    if(Array.isArray(quotesentence)) quotesentence = quotesentence[Math.floor(Math.random() * quotesentence.length + 1)-1];
    console.log('showMessage', quotesentence);
    $('.message').stop();
    quote = [
        `<span style="color:#0099cc;">${quoteanime}</span> Quote<br/>`,
        `${quotesentence}<br/>`,
        `-<span style="color:#0099cc;">${quotecharacter}</span>`
    ].join('')
    message = $('.message')
    message.html(quote).fadeTo(200, 1);
    message.css('top',-message.height()+50);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout){
    $('.message').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeTo(200, 0);
}