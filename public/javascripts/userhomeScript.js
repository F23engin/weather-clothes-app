(function(){
    $('#js-buttonHamburger').click(function() {
        $('body').toggleClass('is-drawerActive');

        if ($(this).attr('aria-expanded') == 'false') {
            $(this).attr('aria-expanded', true);
            $('.p-drawer').fadeIn(1000);
        } else {
            $(this).attr('aria-expanded', false);
        }
    });
}) ();