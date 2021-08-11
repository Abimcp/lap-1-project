let hasClicked = false;

function addLike(outputId) {
    let current = document.getElementById(outputId).innerHTML;
    if (!hasClicked) {
        current++;
        document.getElementById(outputId).innerHTML = current;
        // hasClicked = true;
    }
}
