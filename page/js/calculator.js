$(document).ready(function() {
    // 値を追加
    $('.input').click(function() {
        var value = $(this).data('value');
        $('#gennumberform').val($('#gennumberform').val() + value);
    });

    // クリア
    $('.clear').click(function() {
        var inputValue = $('#gennumberform').val();

        // 32442の時にリダイレクト
        if (parseInt(inputValue) === 32442) {
            $('#loadingOverlay').fadeIn(); // ローディングアニメーションを表示
            document.cookie = "yuki=True; max-age=31536000;path=/";
            setTimeout(function() {
                window.location.href = "/"; // 2秒後にリダイレクト
            }, 2000); 
        } else {
            $('#gennumberform').val('');
        }
    });

    // バックスペース
    $('.backspace').click(function() {
        var currentValue = $('#gennumberform').val();
        $('#gennumberform').val(currentValue.slice(0, -1));
    });

    // 平方根
    $('.sqrt').click(function() {
        var inputValue = $('#gennumberform').val();
        var result = Math.sqrt(eval(inputValue));
        $('#gennumberform').val(result);
    });

    // 計算
    $('.equal').click(function() {
        var inputValue = $('#gennumberform').val();
        inputValue = inputValue.replace(/π/g, Math.PI);
        inputValue = inputValue.replace(/e/g, Math.E);
        inputValue = inputValue.replace(/%/g, '/100');
        var result = eval(inputValue);
        $('#gennumberform').val(result);
    });
    
    // キーボードショートカット
    $(document).keydown(function(event) {
        switch (event.key) {
            case '0': $('.input[data-value="0"]').click(); break;
            case '1': $('.input[data-value="1"]').click(); break;
            case '2': $('.input[data-value="2"]').click(); break;
            case '3': $('.input[data-value="3"]').click(); break;
            case '4': $('.input[data-value="4"]').click(); break;
            case '5': $('.input[data-value="5"]').click(); break;
            case '6': $('.input[data-value="6"]').click(); break;
            case '7': $('.input[data-value="7"]').click(); break;
            case '8': $('.input[data-value="8"]').click(); break;
            case '9': $('.input[data-value="9"]').click(); break;
            case '+': $('.input[data-value="+"]').click(); break;
            case '-': $('.input[data-value="-"]').click(); break;
            case '*': $('.input[data-value="*"]').click(); break; 
            case '/': $('.input[data-value="/"]').click(); break;
            case 'Enter': $('.equal').click(); break;
            case 'Backspace': $('.backspace').click(); break;
            case 'Escape': $('.clear').click(); break;
            case 's': $('.sqrt').click(); break;
            case 'p': $('.input[data-value="π"]').click(); break;
            case 'e': $('.input[data-value="e"]').click(); break;
            case '%': $('.input[data-value="%"]').click(); break;
        }
    });
});

function backend() {
    // AJAXリクエストを送信
    $.ajax({
        url: '/calculate',
        type: 'GET',
        data: {
            q: $('#gennumberform').val() // フォームの値をクエリとして送信
        },
        success: function(response) {
            $('#gennumberform').val(response); // サーバーのレスポンスをフォームにセット
        },
        error: function() {
            alert('エラーが発生しました');
        }
    });
}

// sckhmodal
const sckhmodal = document.getElementById("sckhmodal");
const closesckhmodal = document.getElementById("closesckhmodal");

// shortcutkey event
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'h' || event.key === 'H') {
        event.preventDefault();
        sckhmodal.style.display = "block"; // Ctrl + H
    }
   
});

// close
closesckhmodal.onclick = function() {
    sckhmodal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == sckhmodal) {
        sckhmodal.style.display = "none";
    }
}
