<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Welcome</title>
        <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
        
        <div class="welcome-section content-hidden">
            <div class="content-wrap">
                <ul class="fly-in-text">
                    <li>H</li>
                    <li>i</li>
                </ul>
                
                <a class="enter-button" data-popup-open="popup-1" href="#">Play</a><br>
                <div class="popup" data-popup="popup-1">
                    <div class="popup-inner">
                        <form class="name-form" action="game.php">
                            <h3>Enter name:</h3><br>
                            <input type="text" name="name"><br><br>
                            <input type="submit" name="play" value="Play">
                        </form>
                        
                        <a class="popup-close" data-popup-close="popup-1" href="#">x</a>
                    </div>
                </div>

                <a href="leaderboard.php" class="enter-button">Leaderboard</a>
                </div>
        </div>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script type="text/javascript">
            
            $(function() {
                
                var welcomeSection = $('.welcome-section'),
                    enterButton = welcomeSection.find('.enter-button');
                
                setTimeout(function() {
                    welcomeSection.removeClass('content-hidden');
                }, 500);
                
            });

             $(function() {
                //----- OPEN
                $('[data-popup-open]').on('click', function(e) {
                    var targeted_popup_class = jQuery(this).attr('data-popup-open');
                    $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

                    e.preventDefault();
                });

                //----- CLOSE
                $('[data-popup-close]').on('click', function(e) {
                    var targeted_popup_class = jQuery(this).attr('data-popup-close');
                    $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

                    e.preventDefault();
                });
            });      
                
        </script>

    </body>
</html>