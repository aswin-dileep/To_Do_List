function underline() {

    if (document.getElementById("dataInput").style['text-decoration'] == 'line-through') {
        window.location.reload();
    } else {
        document.getElementById("dataInput").style['text-decoration'] = 'line-through';
    }
}
