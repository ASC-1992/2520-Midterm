$(document).ready(function(){
    console.log("jquery is ready!");
    
    document.getElementById("save").addEventListener("click", function(){
        $.ajax({
            url:"/room/roomId",
            type:"post",
            data:{
                name: document.getElementById("name").value,
                race: document.getElementById("race").value,
                class: document.getElementById("class").value,
                avatar: document.createElement("img").src =  "/pictures/"+document.getElementById("class").value+".png",
                type:"create"
            }
            
            
        
                        
        });
        //location.href = "/topics";
        alert("Your Character has been Saved!");
        
    });
    
    document.getElementById("menu").addEventListener("click", function(){
        
        location.href = "/"

    });    
    
    document.getElementById("logo").addEventListener("click", function(){
        location.href = "/";

    });
    
        //Array of images which you want to show: Use path you want.
    var images=new Array('/pictures/art/bg1.jpg','/pictures/art/bg2.jpg','/pictures/art/bg3.jpg', '/pictures/art/bg4.jpg', '/pictures/art/bg5.jpg','/pictures/art/bg6.jpg','/pictures/art/bg7.jpg', '/pictures/art/bg8.jpg');
    var nextimage=0;
    doSlideshow();

    function doSlideshow(){
        if(nextimage>=images.length){nextimage=0;}
        $('.global')
        .css('background-image','url("'+images[nextimage++]+'")')
        .fadeIn(500,function(){
            setTimeout(doSlideshow,10000);
        });
    }
    
    //This is so when the user selects a race or class a breif description of either will appear
    var raceSelect = document.getElementById("race");
    var classSelect = document.getElementById("class");
    var raceD = document.getElementById("raceDesc");
    var classD = document.getElementById("classDesc");
    
    raceSelect.onclick = function () {
        if(raceSelect.value == "Dwarf"){
            raceD.innerHTML = "Kingdoms rich in ancient grandeur, halls carved into the roots of mountains, the echoing of picks and hammers in deep mines and blazing forges, a commitment to clan and tradition, and a burning hatred of goblins and orcs—these common threads unite dwarves across the multiverse, the heritage of every dwarf character."
        } else if(raceSelect.value == "Elf") {
            raceD.innerHTML = "Elves live in places of ethereal beauty, in the midst of ancient forests or in silvery spires glittering with faerie light, where soft music drifts through the air and gentle fragrances waft on the breeze. Elves love nature and magic, art and artistry, music and poetry, and the good things of the world."
        } else if(raceSelect.value == "Halfling") {
            raceD.innerHTML = "Halflings are an affable and cheerful people. They cherish the bonds of family and friendship as well as the comforts of hearth and home, harboring few dreams of gold or glory. Even adventurers among them usually venture into the world for reasons of community, friendship, wanderlust, or curiosity. They love discovering new things, even simple things, such as an exotic food or an unfamiliar style of clothing."
        } else if(raceSelect.value == "Human") {
            raceD.innerHTML = "In the reckonings of most worlds, humans are the youngest of the common races, late to arrive on the world scene and short-lived in comparison to dwarves, elves, and dragons. Perhaps it is because of their shorter lives that they strive to achieve as much as they can in the years they are given. Perhaps they feel they have something to prove to the elder races, and that’s why they build their mighty empires on the foundation of conquest and trade."
        } else if(raceSelect.value == "Dragonborn") {
            raceD.innerHTML = "Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension. Shaped by draconic gods or the dragons themselves, dragonborn originally hatched from dragon eggs as a unique race, combining the best attributes of dragons and humanoids. Some dragonborn are faithful servants to true dragons, toher form the ranks of soldiers in great wars."
        } else if(raceSelect.value == "Gnome") {
            raceD.innerHTML = "A constant hum of busy activity pervades the warrens and neighborhoods where gnomes form their close-knit communities. Louder sounds punctuate the hum: a crunch of grinding gears here, a minor explosion there, a yelp of surprise or triumph, and especially bursts of laughter."
        } else if(raceSelect.value == "Half-Elf") {
            raceD.innerHTML = "Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents: human curiosity, inventiveness, and ambition tempered by the refined senses, love of nature, and artistic states of the elves."
        } else if(raceSelect.value == "Half-Orc") {
            raceD.innerHTML = "Some half-orcs are proud chiefs of orc tribes, whose human blood gives them an edge over their full-blooded orc rivals. Some are children of the frontiers, in places where orcs and human barbarians live in uneasy balance, fighting in some seasons and trading in others. Some are desperate outcasts doing whatever it takes to get by in a world that shuns them, making a living by strength and violence"
        } else if(raceSelect.value == "Tiefling") {
            raceD.innerHTML = "To be greed with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling. And to twist the knife, tieflings know that this is because a pact struct generations ago infused the essence of Asmodeu = overlord of the Nine Hells - into their bloodline. Their appearance and their nature are not their fault but the result of an ancient sin."
        }  
    }
    
    classSelect.onclick = function () {
        if(classSelect.value == "Barbarian"){
            classD.innerHTML = "Barbarians, different as they might e are difined by their rage: unbridled, unquenchable, and unthinking fury. More than a mere emotion, their anger is the ferocity of a cornered predator, the unrelenting assult of a storm, the churning turmoil of the sea."
        } else if(classSelect.value == "Bard"){
            classD.innerHTML = "Whether scholar, skald, or scoundrel, a bard weaves magic through words and music to inspire allies, demoralize foes, manipulate minds, create illusions, and even heal wounds."
        } else if(classSelect.value == "Cleric"){
            classD.innerHTML = "When a cleric takes up an adventuring life, it is usually because his or her god demands it. The goals of the deities require that they have mortal agents in the world, and pursuing those goals often involves braving the dangers beyond the walls of civilization and security, smiting evil or seeking holy relics in ancient tombs."
        } else if(classSelect.value == "Druid"){
            classD.innerHTML = "Whether calling on the elemental forces of nature or emulating the creatures of the animal world, druids are an embodiment of nature's resilience, cunning, and fury. They claim no mastery over nature. Instead they see themselves as extensions of nautre's indomitable will."
        } else if(classSelect.value == "Fighter"){
            classD.innerHTML = "Perhaps the most diverse class of characters in the worlds of Dungeons & Dragons: Questing knights, conquering overlords, royal champions, elite foot soldiers, hardened mercenaries, and bandit kings—as fighters, they all share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat."
        } else if(classSelect.value == "Monk"){
            classD.innerHTML = "Whatever their discipline, monks are united in their ability to magically harness the energy that flows in their bodies. Whether channeled as a striking display of combat prowess or a subtler focus of defensive ability and speed, this energy infuses all that a monk does."
        } else if(classSelect.value == "Paladin"){
            classD.innerHTML = "Whatever their origin and their mission, paladins are united by their oaths to stand against the forces of evil. Whether sworn before a god's altar and the witness of a priest, in a sacred glade before nature spirits and fey beings, or in a moment of desperation and grief with the dead as only witness, a paladin's oath is a powerful bond. It is a source of power that turns a devout warrior into a blessed champion."
        } else if(classSelect.value == "Ranger"){
            classD.innerHTML = "Though a ranger might make a living as a hunter, a guide, or a tracker, a ranger’s true calling is to defend the outskirts of civilization from the ravages of monsters and humanoid hordes that press in from the wild."
        } else if(classSelect.value == "Rogue"){
            classD.innerHTML = "Plenty of rogues operate independently, but even they sometimes recruit apprentices to help them in their scams and heists. A few rogues make an honest living as locksmiths, investigators, or exterminators, which can be a dangerous job in a world where dire rats—and wererats—haunt the sewers."
        } else if(classSelect.value == "Sorcerer"){
            classD.innerHTML = "Sorcerers carry a magical birthright conferred upon them by an exotic bloodline, some otherwordly influence, or exposure to unknown cosmic forces. One can't study sorcery as one learns a language, any more than one can learn to live a legendary life. No one chooses sorcery; the power chooses the sorcerer."
        } else if(classSelect.value == "Warlock"){
            classD.innerHTML = "Warlocks are seekers of the knowledge that lies hidden in the fabric of the multiverse. Through pacts made with mysterious beings of supernatural pwer, warlocks unlock magical effects both subtle and spectacular. Drawing on the ancient knowledge of beings such as fey nobles, demons, devils, hags, and alien entities of the Far Realm, warlocks peice together arcane secrets to bolster their own power."
        } else if(classSelect.value == "Wizard"){
            classD.innerHTML = "Wizards are supreme magic-users, defined and united as a class by the spells they cast. Their magic conjures elementals from other planes of existence, glimpses the future, or turns slain foes into shambling zombies. Their mightiest spells change one substance into another or alter a creature’s form, open pathways to other planes of existence, or even kill with a single word."
        }
    }

})
