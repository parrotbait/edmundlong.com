'use strict';

function sendAnalytics(category, action, label, value) {
    if (value >= 0) {
        ga('send', 'event', category, action, label, value)   
    } else {
        ga('send', 'event', category, action, label)   
    }
}

jQuery(function($, undefined) {
    
    var tryKeepWords = mobilecheck(); // Keep words on mobile
    var content = []
    var beepCount = 1
    
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
        `), {
            keepWords: tryKeepWords
        })
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
    
    Note: some words are truncated on mobile 
    and ascii art work can get messed up

    You can learn about me with some
    very simple commands. 

    Type '[[i;;]help]' to start.
      `
    }

    function mobilecheck() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      };

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
    2002 - Leaving Cert. @ Colaiste An Spioraid Naoimh

        [[;#FFE666;]600 points!]

    2002 - 2006 - Computer Science @ UCC.

        [[i;;]First Class Honours!] with an average of [[;#FFE666;]88.9%]

    2006 - 2008 - MSc. Computer Games Technology @ Abertay Uni, Dundee

        [[i;;]Distinction] with an average of [[;#FFE666;]95%]

    October 2008 - December 2009 @ [[;#BBFF99;]Beautiful Games Studio/Eidos], London

        [[i;;]Front End C++ Developer] on 
        [[;#FF6666;]Championship Manager 2010]


    Dec 2009 - Sept 2010 @ [[;#80D4FF;]Singstar], Sony, London

        [[i;;]UI/Gameplay Developer] on
        [[;#7B68EE;]Singstar]

    Sept 2010 - Nov 2012 @ [[;#FFE666;]CyberSportsWorld], London

        [[i;;]Senior Game Developer] on 
        [[;#3CB371;]Football Superstars and StrikerSuperstars]

    Nov 2012 - Jan 2013 @ [[;white;]Mindshapes], London

        [[i;;]Lead Mobile Developer] on
        [[;#FF6666;]MagicTown]
    
    Jan 2013 - Dec 2018 @ [[;orange;]Blippar], London (and remote from Cork, Ireland)

        [[i;;]Senior Mobile Developer
        Mobile Engineering Lead] on
        [[;orange;]Blippar SDK & App]

    Feb 2019 - March 2019 @ [[;green;]Pushfor], London (remote from Cork, Ireland)

        [[i;;]Senior iOS Developer] on the
        [[;green;]Pushfor app]
    
    April 2019 - March 2020 @ [[;orange;]Whoppah], Amsterdam (remote from Cork, Ireland)

        [[i;;]Senior Software Engineer] on the
        [[;orange;]Whoppah app]
    
    March 2020 - October 2020 @ [[;#295A9E;]PMD Solutions], Cork

        [[i;;]Senior Software Engineer] working on code, infrastructure for multiple apps and servers
    
    October 2020 - Present @ [[;#DCDCDC;]Apple], Cork

        [[i;#DCDCDC;]Senior iOS and macOS Engineer] working on the Radar IS&T team
    
    `)
    .setColor('yellow')
    .setPrompt(`Do you want to see my skills? (Y/n) `)
    .setSuboptionPrompt(`If you want to find out more, enter the number you're interested in or hit <enter> to skip: `)
    .setSuboptions({text: `
Choose from any of these options:

    `, options: [
        new Command(`1. Apple
        `, `                                                                                                         
        [[;DCDCDC;]
         _______  _______  _______  ___      _______ 
        |   _   ||       ||       ||   |    |       |
        |  |_|  ||    _  ||    _  ||   |    |    ___|
        |       ||   |_| ||   |_| ||   |    |   |___ 
        |       ||    ___||    ___||   |___ |    ___|
        |   _   ||   |    |   |    |       ||   |___ 
        |__| |__||___|    |___|    |_______||_______|                                                                                                       
        ]

    [[;DCDCDC;]Apple] is an American multinational technology company headquartered in Cupertino, California, 
    that designs, develops and sells consumer electronics, computer software, and online services.

    In this role I worked as part of the iOS and macOS Radar client teams, supporting and enhancing the Radar 
    application which is a critical part of workflows for thousands of Apple employees.
    I worked primarily as part of the iOS team as senior member of the team. 
    This involved participating in the routine agile processes, writing proposals, code review, prototyping, 
    tech talks and some mentoring of junior interns. I was a pretty prominent member of the team, which had 11 members. 
    The app itself is a large app which many different aspects to it, maybe the biggest one I've worked on. 
    It also has a lot of legacy, there is a significant amount of Objective-C code throughout and much of my time was spent
    either maintaining or modernising parts of the code. The was a large shared codebase between the iOS and macOS so a 
    great deal of thought of impacts of changes was needed, I dedicated a lot of effort to try and provide 
    consistent, expressive and functional APIs between the two platforms so behavior would remain consistent and centrally managed.
    
    I had some large projects when in the team, the biggest was probably introducing multi-window support for iPadOS. 
    It had such a huge positive impact for our customers but was technically challenging as it affected almost 
    all parts of the app. The next biggest project was a rework of the Find Problem screen. The previous implementation
    had diverged from macOS and had several functional gaps which frustrated users. This was reflected in the code
    with iOS having separate logic to macOS and so the behavior wasn't consistent. I re-wrote the screen to match 
    the macOS UI and UX, moving macOS code into our shared code. This screen is one of the most critical parts of the app, 
    so it was important that regressions and bugs were kept to a minimum. Overall, the project was a huge success and received 
    very well by customers. Other significant projects included: rewrote the entire home screen again sharing code with macOS, added a widget to the app, 
    implemented push notifications, added support for Dynamic Type and large accessibiltiy content sizes, 
    introduced xcconfig for project configuration and modernised APIs and screens throughout.

    I care deeply about code quality and in the team, I helped define and establish Swift and Objective-C code guidelines and
    formatting tools.
    `).setColor('#DCDCDC'),
    new Command(`
    2. PMD Solutions
        `, `                                                                                                         
        [[;#DCDCDC;]
         ____  __  __ ____  
        |  _ \\|  \\/  |  _ \\ 
        | |_) | |\\/| | | | |
        |  __/| |  | | |_| |
        |_|   |_|  |_|____/       

        ]

    [[;DCDCDC;]PMD Solutions] is a progressive company which is developing innovative patient friendly technologies 
    to support health providers' early prevention model of patient care in the hospital environment.

    At my time PMD my role was quite wide reaching. I was the main driver of the technical direction of the company with a hands-on focus on development on iOS.
    The company has a number of public and in-house iOS applications which interact via bluetooth and over the air with the PMD hardware.
    I managed the company's Amazon AWS setup, developed app and Bluetooth firmware protocols (and code),
    gathered requirements, wrote documentation, liaised with nursing and IT on-site to troubleshoot live issues, added real time site monitoring and alerting,
    and added robust data backup routines.

    In terms of app development, PMD had two separate apps - the RR app and the Air Dashboard. The RR app is a native app used for direct bluetooth communication with the PMD hardware.
    The Air Dashboard is an Ionic app that is used for viewing patient statuses remotely, as bluetooth signals are relayed over the air via Cassia bluetooth routers.
    I merged these apps together in to a single app (for maintenance and business reasons). In doing so, I designed all the wireframes and screens, incorporating feedback from
    stakeholders along the way. I gathered requirements both from the existing product and for the new features that were desired in the new version of the merged app. 
    In terms of implementation I moved the app towards a MVVM structure using RxSwift & RxCocoa with dependency injection. This allowed for more thorough testing and validation
    of logic that was not possible before. I also added a networking layer for subscribing to the Cassia data feeds, along with CoreData for data persistence. There are thousands of datapoints
    coming over the air so the CoreData implementation was quite challenging. 
    The company also had a manufacturing app which verifies that the produced hardware is fully functional. I ported this app over from Android, splitting out the RR app core bluetooth functionality
    into a separate library to be shared between both apps. This allowed for consistent use of Bluetooth between the production and test apps. I also added GSuite integration to allow for 
    verification of users and logging of test data to company Google Spreadsheets. 
    `).setColor('#295A9E'),
    new Command(`
    3. Whoppah
        `, `                                                                                                         
        [[;orange;]
                               
         _ _ _ _                   _   
        | | | | |_ ___ ___ ___ ___| |_ 
        | | | |   | . | . | . | .'|   |
        |_____|_|_|___|  _|  _|__,|_|_|
                      |_| |_|                                                                                                                                                                                                                                                                                                                                                                         
        ]

    [[;orange;]Whoppah] is a smart first class marketplace for second-hand design and art.

    At Whoppah my focus was entirely on the company's flagship iOS application. Initially when I arrived into the company I worked alongside 
    an external agency developers to create various screens and features eventually releasing V1 of the product with very challenging deadlines.
    
    The initial version of the product was a success but quickly it became apparent that the backend was not robust or flexible enough to grow to match the company's ambitions. 
    So the company undertook a huge undertaking to migrate from REST to GraphQL. I worked very closely with the Android developer and the backend engineer to migrate over from the 
    40-odd REST APIs to GraphQL. I contributed frequently to the backend implementation (using Apollo in JS) and refactored the iOS application to match. At the same time the company 
    required certain enhancements to the existing live app which also were implemented along the way. I cannot understate how big a job this was, it took over 6 months in all but
    now the company is in a much better position to grow and scale as a consequence. 

    I continued to develop and maintain the product since the GraphQL migration, adding features and tweaking flows to improve retention, funnels and other KPIs.

    Some of the features of the app: ARKit integration for Art previews, Firebase for pushes, realtime chat between users, a homepage driven dynamically from the server, searchable catalog, 
    complex ad creation and editing process (over 15 screens), Sign up with Apple/Google/Facebook/Email sign in and registration, multiple checkout and shipping options,
    bidding and auction logic and Stripe integration for various international payment options.
    The app was designed with RxSwift + MVVM used at scale, with core components tested via unit tests. CI was through Fastlane and CircleCI along with using Firebase's App Distribution for beta testing.
    `).setColor('orange'),
    new Command(`
    4. Blippar
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
    5. CyberSportsWorld
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
    6. Sony Singstar
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
    7. BGS Champ Man
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

    * Swift (excellent)
    * C & C++ 11/14 (excellent)
    * Objective C (excellent)
    * Java (proficient)
    * Kotlin (familiar)
    * Bash (proficient)
    * Python (proficient)
    * JS, ES6, Node (proficient)
    * Python (proficient)
    * Docker (familiar)
    * React (familiar)
    * HTML, XML, XSLT, XSD (familiar)
    * C# (familiar)
    * MySQL, PHP (familiar)
    * TCL (familiar)

    [[;#FF9999;]Source Control]

    * Git
    * Mercurial
    * SVN & CVS :)

    [[;orange;]IDEs:]

    * Xcode
    * Android Studio & Eclipse (shudder)
    * Visual Studio - been a while though
    * Unity & MonoDevelop - been a while too
    * SourceTree & Fork
    * VS Code

    [[;#80D4FF;]SDKs and Libraries:]

    * iOS SDK and Android SDK including ARKit and ARCore
    * SwiftUI, some experience.
    * Combine, RxSwift, RxCocoa
    * Fastlane, SwiftLint, SwiftFormat
    * OpenGL ES2
    * DirectX
    * OpenAL, OpenSL
    * AFNetworking, CocoaLumberjack, Firebase, AppsFlyer, Fabric and a whole host of others.
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
  
    An article about an approach to localization in storyboards
    https://bit.ly/2FjOLzw

    I wrote an article about the rubbishness of the Property Price Register: 
    https://bit.ly/2ReSW61`)
    .setColor('pink')
    .setPrompt('Want to get in touch (Y/n) ')

    content.push(randomstuff)
    
    let contact = new Command('contact', `

    You can get in touch in the following ways...
    
    Email: eddie.long.dev@gmail.com 
    Twitter: https://twitter.com/parrotbait
    LinkedIn: https://www.linkedin.com/in/eddie-long/
    Github: https://github.com/parrotbait
    `
    )
    content.push(contact)
    
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
                            this.echo(suboptions.options[value - 1].getContent(),{
                                keepWords: tryKeepWords
                            })
                            this.echo(new String(getSuboptionText(currentItem)), {
                                keepWords: tryKeepWords
                            })

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
                case 'rm -rf':
                case 'rm -rf .':
                case 'rm -rf *':
                    this.echo('Cheeky....')
                    scrollToBottom();
                    return;
                case 'beep':
                    var text = ''
                    for (let i = 0; i < beepCount; ++i) {
                        if (text.length) text += ' '
                        text += 'beep'
                    }
                    beepCount++
                    this.echo(text)
                    scrollToBottom();
                    return
                case 'ls':
                case 'ls -al':
                case 'ls -la':
                    this.echo('Nothing to list! Try entering bio instead ;)') 
                    scrollToBottom();
                    return;
                case 'parrot':
                    this.echo('<img src="assets/party-parrot-terminal.mov.gif" /><br>', {
                        raw: true
                    })
                    scrollToBottom();
                    return;
                case 'cv':
                case 'resume':
                    this.echo('Get it here: https://bit.ly/33UeKIV')
                    scrollToBottom();
                    return;
                case 'exit':
                    this.echo('There is no exit')
                    scrollToBottom();
                    return;
                case 'quit':
                    this.echo('Nobody likes a quitter')
                    scrollToBottom();
                    return;
                case 'who are you':
                case 'whoami':
                    this.echo('Eddie Long....I think')
                    scrollToBottom();
                    return;
                case 'author':
                case 'credit':
                    this.echo('Eddie Long')
                    this.echo('Get my resume/CV here: https://bit.ly/33UeKIV')
                    scrollToBottom();
                    return;
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
                case 'hi':   
                case 'hey':   
                case 'hello':   
                case 'hi': 
                case 'yo':
                    const textArray = [
                        'Yo',
                        'Hey',
                        'Ola',
                        'Hola',
                        'Hallo',
                        'Ciao',
                        'Nameste',
                        'Whats up?',
                        'Conas a ta tu?',
                        'Bonjour',
                        'Howdy',
                        'Dia duit',
                        'Whats the craic?',
                        'Story?',
                        'Howya buddy',
                        'Whats the story?',
                        'Howdy',
                    ];
                    let randomNumber = Math.floor(Math.random()*textArray.length);
                    this.echo(textArray[randomNumber])
                    scrollToBottom();
                    return;
                case '?':  
                case 'man':
                case 'help':
                case 'menu':
                    logHelp()
                    sendAnalytics('keystroke', 'command', 'help', -1)
                    scrollToBottom();
                    return
            }

            for (let i = 0; i < content.length; ++i) {
                let contentItem = content[i]
                if (contentItem.getName() !== command) {
                    continue
                }
                var contentText = contentItem.getContent()
                contentText += getSuboptionText(contentItem)
                this.echo(new String(contentText), {
                    keepWords: tryKeepWords
                })
                
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
            term.echo(getGreeting(), {
                keepWords: tryKeepWords
            })
        }
    });
});