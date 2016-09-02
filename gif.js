var topics = ['Penguin', 'Shark', 'Squirrel', 'Falcon', 'Rabbit', 'Donkey', 'Horse', 'Monkey', 'Eagle', 'Cat', 'Dog'];


function renderButtons(){ 

		$("#animals").empty();

			for (var i = 0; i < topics.length; i++) {
				$("#animals").append("<button class='animalButton' data-animal ="+ topics[i] +">" + topics[i] + "</button>");
			}



            $('#addAnimal').on('click', function(){

            var animal = $("#animal-input").val().trim();
        
            topics.push(animal);
        
            renderButtons();

            return false;
            });




    $('.animalButton').on('click', function() {

            $("#gifDiv").empty();

            var p = $(this).data('animal');

            console.log(p);
       
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=3";

      
            $.ajax({url: queryURL, method: 'GET'})

            
                .done(function(response) {

                    var results = response.data;

                        for (var i = 0; i < results.length; i++) {
                            var gifDiv = $('<div class="item">')

                            var rating = results[i].rating;

                            var p = $('<p>').text("Rating: " + rating);

                            var animalImages = $('<img class="animalImage col-lg-4" data-state="still">');
                            animalImages.attr('src', results[i].images.fixed_height_still.url);

                            gifDiv.append(p);
                            gifDiv.append(animalImages);

                            $('#gifDiv').prepend(gifDiv);

                           




                            $(".animalImage").on('click', function() {

                                    var state = $(this).attr('data-state');


                                    if (state == "still") {
                                        $(this).attr('src', $(this).attr('src').replace('_s.gif', '.gif'));
                                        $(this).attr('data-state', 'animate');
                    
                                    }

                                    else{
                                        $(this).attr('src', $(this).attr('src').replace('.gif', '_s.gif'));
                                        $(this).attr('data-state', 'still');
                                    }
                            });

                        };



            });


    });



 

};






$(document).ready(function() {
	renderButtons();
});
