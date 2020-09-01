var original_text_field;
var original_text;
var original_text_list;

function convert() {
  original_text_field = document.getElementById("original_text");
  original_text = original_text_field.value;
  original_text_list = original_text.split("");
  var symbol = document.getElementById("symbol").value;

  if (symbol === "") {
    symbol = "●"
  }

  const indexes_open = original_text_list.reduce(function (accumulator, currentValue, index) {
    if (currentValue === "[") {
      accumulator.push(index);
    }
    return accumulator;
  }, [])

  const indexes_close = original_text_list.reduce(function (accumulator, currentValue, index) {
    if (currentValue === "]") {
      accumulator.push(index);
    }
    return accumulator;
  }, [])

  if (indexes_close.length != indexes_open.length) {
    alert('[]の個数が合わないよ！');
  }

  var i;
  var j;
  for (i = 0; i < indexes_open.length; i++) {
    for (j = indexes_open[i] + 1; j < indexes_close[i]; j++) {
      original_text_list[j] = symbol;
    }
  }

  for (i = 0; i < indexes_open.length; i++) {
    original_text_list[indexes_open[i]] = "";
    original_text_list[indexes_close[i]] = "";
  }

  var converted_text = original_text_list.join("");
  document.getElementById("converted_text").textContent = converted_text;
}

function addBrackets() {
  original_text_field = document.getElementById("original_text");
  original_text_list = original_text_field.value.split("");
  var selected_string_start = original_text_field.selectionStart;
  var selected_string_end = original_text_field.selectionEnd;
  original_text_list.splice(selected_string_start, 0, '[');
  original_text_list.splice(selected_string_end + 1, 0, ']');
  original_text_field.value = original_text_list.join("");
}

function clearBrackets() {
  original_text_field = document.getElementById("original_text");
  original_text = original_text_field.value;
  original_text_list = original_text.split("");

  const indexes_open = original_text_list.reduce(function (accumulator, currentValue, index) {
    if (currentValue === "[") {
      accumulator.push(index);
    }
    return accumulator;
  }, [])

  const indexes_close = original_text_list.reduce(function (accumulator, currentValue, index) {
    if (currentValue === "]") {
      accumulator.push(index);
    }
    return accumulator;
  }, [])

  var i;
  for (i = 0; i < indexes_open.length; i++) {
    original_text_list[indexes_open[i]] = "";
    original_text_list[indexes_close[i]] = "";
  }

  original_text_field.value = original_text_list.join("");

}

function execCopy(string) {
  var temp = document.createElement('div');

  temp.appendChild(document.createElement('pre')).textContent = string;

  var s = temp.style;
  s.position = 'fixed';
  s.left = '-100%';

  document.body.appendChild(temp);
  document.getSelection().selectAllChildren(temp);

  var result = document.execCommand('copy');

  document.body.removeChild(temp);
  // true なら実行できている falseなら失敗か対応していないか
  return result;
}

function copy_to_clipboard() {
  if (execCopy(document.getElementById("converted_text").textContent)) {
    alert('コピーしたよ！');
  }
  else {
    alert('このブラウザじゃ対応してないみたい💦');
  }
}