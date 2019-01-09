'use strict';

function sendAnalytics(category, action, label, value) {
    if (value >= 0) {
        ga('send', 'event', category, action, label, value)   
    } else {
        ga('send', 'event', category, action, label)   
    }
}

jQuery(function($, undefined) {
    
    var content = []

    function usage() {
        return 'Whoops - didn\'t get that, type \'help\' to get instructions' 
    }
    function logHelp() {
        var menuOptions = ''
        for (let i = 0; i < content.length; ++i) {
            let contentItem = content[i]
            menuOptions += `
    [[;`
            menuOptions += contentItem.getColor()
            menuOptions += `;]`
            menuOptions += contentItem.getName()
            menuOptions += `]`
        }
        terminal.echo(new String(`
Type the following into the command prompt to receive more info about me!
        ` + menuOptions + `
        `))
    }

    function getGreeting() {
        return `

     _____    _     _ _      
    |  ___|  | |   | (_)     
    | |__  __| | __| |_  ___ 
    |  __|/ _' |/ _' | |/ _ \\
    | |__| (_| | (_| | |  __/
    \\____/\\__,_|\\__,_|_|\\___|                            
     _                       
    | |                      
    | |     ___  _ __   __ _ 
    | |    / _ \\| '_ \\ / _' |
    | |___| (_) | | | | (_| |
    \\_____/\\___/|_| |_|\\__, |
                        __/ |
                        |___/ 
    
    [[b;orange;]Welcome!] 
    
    You can learn about me with some very simple commands. 
    Type '[[i;;]help]' to start.
      `
    }

    function scrollToBottom() {
        setTimeout(function() {
            window.scrollTo(0,document.body.scrollHeight);
        }, 100)
        return
    }

    function getSuboptionText(contentItem) {
        var contentText = ''
        if (contentItem.hasSuboptions()) {
            let suboptions = contentItem.getSuboptions()
            contentText += suboptions.text
            for (let j = 0; j < suboptions.options.length; ++j) {
                let option = suboptions.options[j]
                contentText += `[[;`
                contentText += option.getColor()
                contentText += `;]`
                contentText += option.getName()
                contentText += `]`
            }
        }
        return contentText
    }

    class Command {
        constructor(name, content) {
            this.name = name
            this.color = 'white'
            this.content = content
            this.suboptionprompt = null
            this.suboptionpromptActive = null
            this.prompt = null
            this.suboptions = null
        }

        getCallback() {
            return this.callback
        }

        getContent() {
            return this.content
        }
        
        getName() {
            return this.name
        }

        setPrompt(prompt) {
            this.prompt = prompt
            return this
        }
        
        setSuboptionPromptActive(promptActive) {
            this.suboptionpromptActive = promptActive
            return this
        }

        getSuboptionPromptActive() {
            return this.suboptionpromptActive
        }

        isInSuboptions() {
            return this.hasSuboptions() && this.getSuboptionPromptActive()
        }

        setSuboptionPrompt(prompt) {
            this.suboptionprompt = prompt
            return this
        }

        getPrompt() {
            if (this.isInSuboptions()) return this.suboptionprompt
            return this.prompt
        }

        setColor(color) {
            this.color = color
            return this
        }

        getColor() {
            return this.color
        }

        hasSuboptions() {
            return this.suboptions !== null
        }

        getSuboptions() {
            return this.suboptions
        }

        setSuboptions(suboptions) {
            this.suboptions = suboptions
            return this
        }
    }

    let bio = new Command('bio', `
    I am an [[;white;]experienced], [[;yellow;]senior] software engineer with a wide range of skills and languages on various platforms.

    * iOS
    * Android
    * Various game engines including Unity3D
    * Windows Phone and Desktop
    * Blackberry 10
    
    Full CV: https://bit.ly/2FiJjMp
    Github: https://github.com/parrotbait
    Twitter: https://twitter.com/parrotbait
    LinkedIn: https://www.linkedin.com/in/eddie-long/

        `)
        .setColor('#AAFF99')
        .setPrompt('Do you want to see my journey? (Y/n) ')
    content.push(bio)

    let journey = new Command('journey', `
    Jan 2013 - Dec 2018 @ [[;orange;]Blippar], London (and remote from Cork, Ireland)

        [[i;;]Senior Mobile Developer
        Mobile Engineering Lead] on
        [[;orange;]Blippar SDK & App]
    
    Nov 2012 - Jan 2013 @ [[;white;]Mindshapes], London

        [[i;;]Lead Mobile Developer] on
        [[;#FF6666;]MagicTown]
    
    Sept 2010 - Nov 2012 @ [[;#FFE666;]CyberSportsWorld], London

        [[i;;]Senior Game Developer] on 
        [[;#FF6666;]Football Superstars and StrikerSuperstars]

    Dec 2009 - Sept 2010 @ [[;#80D4FF;]Singstar], Sony, London

        [[i;;]UI/Gameplay Developer] on
        [[;#FF6666;]Singstar]

    October 2008 - December 2009 @ [[;#BBFF99;]Beautiful Games Studio/Eidos], London

        [[i;;]Front End C++ Developer] on 
        [[;#FF6666;]Championship Manager 2010]

    2006 - 2008 - MSc. Computer Games Technology @ Abertay Uni, Dundee

        [[i;;]Distinction] with an average of [[;#FFE666;]95%]

    2002 - 2006 - Computer Science @ UCC.

        [[i;;]First Class Honours!] with an average of [[;#FFE666;]88.9%]

    2002 - Leaving Cert. @ Colaiste An Spioraid Naoimh

        [[i;;]600 points!]
    `)
    .setColor('yellow')
    .setPrompt(`Do you want to see my skills? (Y/n) `)
    .setSuboptionPrompt(`If you want to find out more, enter the number you're interested in or hit <enter> to skip: `)
    .setSuboptions({text: `
Choose from any of these options:

    `, options: [
        new Command(`1. Blippar
        `, `                                                                                                         
        [[;orange;]
         _______   __        ________  ______   ______   ________   ______       
       /_______/\\ /_/\\      /_______/\\/_____/\\ /_____/\\ /_______/\\ /_____/\\      
       \\::: _  \\ \\\\:\\ \\     \\__.::._\\/\\:::_ \\ \\\\:::_ \\ \\\\::: _  \\ \\\\:::_ \\ \\     
        \\::(_)  \\/_\\:\\ \\       \\::\\ \\  \\:(_) \\ \\\\:(_) \\ \\\\::(_)  \\ \\\\:(_) ) )_   
         \\::  _  \\ \\\\:\\ \\____  _\\::\\ \\__\\: ___\\/ \\: ___\\/ \\:: __  \\ \\\\: __ '\\ \\  
          \\::(_)  \\ \\\\:\\/___/\\/__\\::\\__/\\\\ \\ \\    \\ \\ \\    \\:.\\ \\  \\ \\\\ \\ '\\ \\ \\ 
           \\_______\\/ \\_____\\/\\________\\/ \\_\\/     \\_\\/     \\__\\/\\__\\/ \\_\\/ \\_\\/                                                                                                                
        ]

    [[;white;]Blippar] is an augmented-reality mobile app and advertising platform that 
    connects brands with highly targeted consumers. 
    Blippar takes everyday products and transforms them into content-rich, 
    consumer-centric interactive experiences. 
    It was available as a [[;white;]licensed SDK] to integrate into third party apps 
    or via the Blippar app.

    I co-architected the AR platform which has over 50 million downloads, had a
    developer community that created exciting AR experiences and won multiple 
    prestigious awards.
    
    I was involved in [[;#FF6666;]all aspects] of the SDK and app development, including
    building, publishing, client communications, rendering, networking, image processing, licensing, security,
    localisation, access to the camera + platform sensors and implementation of platform features. 
    The SDK had a large C++ core that interacted with various platform-level features provided by
    iOS, Android and formerly Blackberry and Windows. I was heavily involved with the creation of the 
    C++ layer and believe it was one of the reasons why our small team were able to move quickly.

    I worked heavily in many different languages while at Blippar: [[;white;]C++, Objective C, 
    Java, Swift, Kotlin, JS ES5/6, C# and QT/QML]. Performance was key, we created
    many algorithms, patterns and data structures that were both portable, 
    functional and optimal. We published several APIs via native code (iOS and Android)
    and via a public Javascript API that was used to create AR experiences. Backwards
    compatibility was a huge goal for us as a development team, early AR
    experiences created on the platform still run to this day. 
    
    I helped introduce many new processes to the dev team to improve our day to day workflow.
    I integrated, maintained our [[;#80D4FF;]Continuous Integration server with TeamCity], [[;#80D4FF;]pull requests] via
    Bitbucket and Github, [[;#80D4FF;]unit tests] for our code on iOS and Android, [[;#80D4FF;]organised
    sprint meetings] (grooming, planning and daily standup) and created various build scripts to 
    [[;#80D4FF;]drastically reduce build times] of the app & SDK.`).setColor('orange'),
        new Command(`
    2. CyberSportsWorld
        `, `
        [[;yellow;]
         _____       _                                    _       
        /  __ \\     | |                                  | |      
        | /  \\/_   _| |__   ___ _ __ ___ _ __   ___  _ __| |_ ___ 
        | |   | | | | '_ \\ / _ \\ '__/ __| '_ \\ / _ \\| '__| __/ __|
        | \\__/\\ |_| | |_) |  __/ |  \\__ \\ |_) | (_) | |  | |_\\__ \\
         \\____/\\__, |_.__/ \\___|_|  |___/ .__/ \\___/|_|   \\__|___/
                __/ |                   | |                       
               |___/                    |_|                       
         _    _            _     _ 
        | |  | |          | |   | |
        | |  | | ___  _ __| | __| |
        | |/\\| |/ _ \\| '__| |/ _' |
        \\  /\\  / (_) | |  | | (_| |
         \\/  \\/ \\___/|_|  |_|\\__,_|
        ]

    [[;white;]Football Superstars] was a Football-based MMO PC game. A user
    can explore a virtual world, interact with other players, join teams and
    play online games as part of a team against other human or AI teams. The
    language was primarily in C++, for the client and the lobby, game, world and
    match servers. The game client was completely bespoke using an in-house engine.

    The client and server were writen in C++ with the UI laid out in XML. 
    I worked on several features for the client including a shop redesign, 
    new font rendering implementation, persistent player contracts, 
    localisation of 6 MFC applications and the core game, in-game purchasing changes, 
    game-optimisation and an entire re-skin of the UI.
    
    There was some scripting using TCL to customise and rapidly develop features 
    on the client and server side.

    [[;white;]Striker Superstars] uses the same match engine as Football Superstars but
    removes the MMO open-world part of the game. It used Unity to target web
    in particular so the client was written in C#.

    I was heavily involved in all parts of the client development, notably networking code, 
    3D match components, UI, user-flow, webservice interaction & parsing and KPI logging.

    Other tasks included localisation of the client, implementing unit tests for 
    web-backend, headless client creation, chat server integration and implementation 
    on client and user acquisition and data logging. Coding was done primarily in C#, 
    C++ on the server side but I also created a Python-based headless client system 
    to allow us to test client-server protocol stability and measure server capacity under load.`).setColor('#FFE666'),
        new Command(`
    3. Sony Singstar
        `, `
        [[;#FF6666;]
           _____ _                  __            
          / ___/(_)___  ____ ______/ /_____ ______
          \\__ \\/ / __ \\/ __ '/ ___/ __/ __ '/ ___/
         ___/ / / / / / /_/ (__  ) /_/ /_/ / /    
        /____/_/_/ /_/\\__, /____/\\__/\\__,_/_/     
                     /____/    
        ]

    [[;white;]Singstar] is a karaoke game for the Playstation developed as a first-party title by Sony Computer Entertainment
    Europe (SCEE).
    During this time I worked as a gameplay programmer on the core dance gameplay from the R&D stage 
    to master submission of the disc. I developed a prototype R&D dance system evaluating the AI LiveMove 
    gesture recognition on the PS3 platform using the new PS Move technology. Once the project was greenlit 
    I integrated the prototype system into the SingStar codebase. I worked with the content creation team 
    to develop a way of marking up dance routines and score them in-game.

    I developed the system to score dances including gesture recognition, the different scoring modes and 
    the markup of the dances. As part of the content creation I developed several facilities including dance 
    recording & playback and debug UI feedback for the content creators to allow them debug their marked up dances.

    During my job at Sony I learnt all about the challenges in developing for the PS3, PS3 libraries all using 
    C++ and a bit about gesture recognition.`).setColor('#80D4FF'),
        new Command(`
    4. BGS Champ Man
        `, `
        [[;#BBFF99;]
          ___|  |                                    \\   |               
          |      __ \\    _' |  __ '__ \\   __ \\       |\\/ |   _' |  __ \\  
          |      | | |  (   |  |   |   |  |   |      |   |  (   |  |   | 
         \\____| _| |_| \\__,_| _|  _|  _|  .__/      _|  _| \\__,_| _|  _| 
                                         _|                              
        ]

    [[;white;]Championship Manager 2010] was a PC-based game client developed by BGS.
    It had bespoke game engine, database and rendering tech in it, all written in C++.

    I was key member of Front End team throughout development and release
    of Championship Manager 2010 for the PC.

    During this time I helped architect structural changes to the Front End including developing a 
    [[;yellow;]model-view controller based component system], back end bridge and optimised Front End loading and reloading. 
    I was also responsible for several crucial screens in the game (Tactics, match day, 
    player suites along with the main squad and squad fixtures screens).

    All development work was highly critical both in terms of quality and performance as the results of all work undertaken 
    had serious implications in what end-users saw and interacted with in the game.

    I was awarded [[;yellow;]Best New Signing] for best new hire in 2009.

    At this job I was primarily working with C++, STL and XML within the custom Front End system for the game.`).setColor('#BBFF99')
    ]})
    content.push(journey)

    let skills = new Command('skills', `
    [[;yellow;]Languages]

    * C & C++ 11/14 (9+ years)
    * Objective C (6+ years)
    * Java (6+ years)
    * Swift (1 year professionally, also in personal projects)
    * Kotlin (~1-2 years)
    * Bash (~4 years)
    * Python (~4 years)
    * JS, ES6 (~4 years)
    * C#
    * ActionScript, Javscript
    * HTML, XML, XSLT, XSD
    * MySQL, PHP
    * Python, TCL

    [[;#FF9999;]Source Control]

    * Git
    * Mercurial
    * SVN & CVS :)

    [[;orange;]IDEs:]

    * Xcode
    * Android Studio & Eclipse (shudder)
    * Visual Studio - been a while though
    * Unity & MonoDevelop - been a while too
    * SourceTree
    * VS Code

    [[;#80D4FF;]SDKs and Libraries:]

    * iOS SDK and Android SDK including ARKit and ARCore
    * OpenGL ES2
    * DirectX
    * OpenAL
    * OpenSL
    * AFNetworking, CocoaLumberjack, Firebase, AppsFlyer, Fabric and more
    * Google Play Services, Butterknife, Picasso, HockeyApp, LeakCanary amongst others
    `)
    .setColor('orange')
    .setPrompt('Do you want to see my interests? (Y/n) ')
    content.push(skills)

    let work = new Command('interests', `
    I have a keen interest in [[;white;]running] and have completed [[;yellow;]2 marathons], in Cork.
    Play golf, [[;red;]badly].
    Enjoy football and rugby. 
    I'm always tinkering away on some project in the background, a lot are just for learning purposes - sometimes I [[i;;]even release] something!
    `).setColor('#80D4FF')
    .setPrompt('Do you want to see some other random stuff? (Y/n) ')

    content.push(work)

    let randomstuff = new Command('random', `
    I made a Cocoapod called SWLogger that I use for logging (to be upgraded to use os_log soon!) 
    https://bit.ly/2Flpa8N
  
    I also wrote something about using C++ in a cross platform way at Blippar: 
    https://bit.ly/2sfztmX
  
    I wrote an article about the rubbishness of the Property Price Register: 
    https://bit.ly/2ReSW61`).setColor('pink')

    content.push(randomstuff)
    
    let education = new Command('education', `
    [[;#E6CCFF;]MSc in Computer Game Technology @ Abertay University, Dundee Scotland (2006 - 2008)]

        Dissertation: Enhanced NPC Behaviour using Goal Oriented Action
        Planning. The dissertation implemented a GOAP system approach to AI
        behaviour that planned actions in advance according to the agent current
        world state. The system was developed and analysed alongside a
        traditional Finite State Machine AI system to compare behaviour, ease of
        development, reusability and extensibility amongst other criteria.
        Was awarded a mark over [[;yellow;]95%] for MSc course which is a distinction.

        Core Modules: Artificial Intelligence in Games, Mathematics for Games,
        Programming for PC and XBOX, Console Game Development, Games
        Marketplace and Game Design and Development.
    
    [[;#E6CCFF;]BSc in Computer Science @ UCC, Ireland (2002 - 2006)]
        
        Overall average mark of [[;yellow;]88.9%] and received a nomination for Science
        [[;yellow;]Graduate of the Year] in 2006 for highest mark in the class. Awarded a
        [[;yellow;]Motorola scholarship] for highest mark in the year in 2005.

        Core Modules: Multimedia, Artificial Intelligence, Software Engineering,
        Databases & SQL, Operating Systems, Virtual Reality, Web Programming,
        Work Placement, Abstract Data Structures, C Programming and Final year project
        
    [[;#E6CCFF;]Leaving Cert @ Colaiste on Spioraid Naoimh, Cork (2002)]
        
        Received an [[;yellow;]entrance scholarship] from UCC due to Leaving Certificate
        results. Awarded the [[;yellow;]'Eacht an Colaiste'] award from Spioraid Naoimh and
        achieved the Cork Chamber of Commerce award for the highest Leaving
        Certificate result in Economics in the province of Munster.
    `).setColor('#BB99FF')
    content.push(education)

    var currentItem = null

    function resetPrompt() {
        currentItem = null
        terminal.set_prompt('>>> ')
    }
    var terminal = $('#term_demo').terminal(function(command) {
        command = command.toLowerCase().trim();

        // Check for <enter> when Y/n is in the prompt
        if (command === '') {
            if (currentItem && currentItem.getPrompt()) {
                // This is a 'bit' of a hack - not very robust to the change of text
                var prompt = currentItem.getPrompt().toLowerCase();
                if (prompt && prompt.indexOf('y/n') != -1) {
                    let index = content.indexOf(currentItem)
                    if (index + 1 < content.length) {
                        sendAnalytics('keystroke', 'enter', currentItem.getName(), 1)
                        // Change the command to the next command
                        command = content[index + 1].getName()
                    }
                }
            } 
        }

        if (command !== '') {
            if (currentItem && currentItem.isInSuboptions()) {
                let suboptions = currentItem.getSuboptions()
                if (!isNaN(command)) {
                    try {
                        var value = parseInt(command)
                        if (value > 0 && value <= suboptions.options.length) {
                            this.echo(suboptions.options[value - 1].getContent())
                            this.echo(new String(getSuboptionText(currentItem)))

                            sendAnalytics('keystroke', 'option', suboptions.options[value - 1].getName(), value)
                            scrollToBottom();
                            return
                        } else {
                            this.error(new String('Invalid choice, enter a number between 1 and ' + suboptions.options.length + ' or press <enter> to skip'))
                            return
                        }
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    this.error(new String('Invalid choice, enter a number between 1 and ' + suboptions.options.length + ' or press <enter> to skip'))
                    return
                }
            }
            sendAnalytics('keystroke', 'command', command, -1)
            switch (command) {
                case 'n': 
                case 'N':
                    if (currentItem && currentItem.getPrompt()) {
                        sendAnalytics('keystroke', 'yes_no', currentItem.getName(), 0)
                        resetPrompt()
                        return
                    }
                    break;
                case 'y':
                case 'Y':
                    if (currentItem && currentItem.getPrompt()) {
                        let index = content.indexOf(currentItem)
                        if (index + 1 < content.length) {
                            sendAnalytics('keystroke', 'yes_no', currentItem.getName(), 1)
                            command = content[index + 1].getName()
                        }
                        break;
                    }
                    break;
                case 'clear':

                    sendAnalytics('keystroke', 'command', 'clear', -1)
                    this.clear()
                    resetPrompt()
                    return   
                case 'help':
                case 'menu':
                    logHelp()
                    sendAnalytics('keystroke', 'command', 'help', -1)
                    return
            }

            for (let i = 0; i < content.length; ++i) {
                let contentItem = content[i]
                if (contentItem.getName() !== command) {
                    continue
                }
                var contentText = contentItem.getContent()
                contentText += getSuboptionText(contentItem)
                this.echo(new String(contentText))
                
                if (contentItem.hasSuboptions() && !contentItem.isInSuboptions()) {
                    contentItem.setSuboptionPromptActive(true)
                } 
                
                if (contentItem.getPrompt()) {
                    this.set_prompt(contentItem.getPrompt())
                } else {
                    resetPrompt()
                }

                sendAnalytics('text', 'show', contentItem.getName(), -1)
                this.scroll_to_bottom()
                scrollToBottom();
                currentItem = contentItem
                return
            }

            // Unknown command
            console.log('Unknown command ' + command)
            sendAnalytics('text', 'unknown', command, -1)
            this.error(usage());
        } else {
            if (currentItem) {
                if (currentItem.isInSuboptions()) {
                    currentItem.setSuboptionPromptActive(false)

                    sendAnalytics('keystroke', 'enter_sub', currentItem.getName(), -1)
                    if (currentItem.getPrompt()) {
                        this.set_prompt(currentItem.getPrompt())
                        return
                    }
                } 
            }
            this.echo('');
            this.scroll_to_bottom()
            scrollToBottom();
        }
    }, {
        greetings: getGreeting(),
        name: 'eddies_site',
        prompt: '>>> ',
        scrollOnEcho: true,
        onClear: function(term) {
            term.echo(getGreeting())
        }
    });
});