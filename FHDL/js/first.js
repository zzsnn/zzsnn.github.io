mydate = localStorage.getItem('mydata')
if (!mydate) {
    $('.first').slideDown(800)
    localStorage.setItem('mydata', 123)
}
$('.mianfeiban').click(function() {
    $('.first').slideUp(800)

})